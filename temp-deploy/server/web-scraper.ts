import axios from 'axios';
import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';
import path from 'path';
import { storage } from './storage';
import type { InsertMiddleSchoolAdmission, InsertHighSchoolAdmission } from '@shared/schema';

interface ScrapedArticle {
  title: string;
  content: string;
  category: string;
  imageUrls: string[];
  originalUrl?: string;
}

export class WebScraper {
  private baseUrl = 'https://lncart.modoo.at';
  private delay = 1000; // 1 second delay between requests
  private targetCategory = '예중입시정보';
  private baseUrls: string[] = [];

  setTargetCategory(category: string): void {
    this.targetCategory = category;
  }

  setBaseUrls(urls: string[]): void {
    this.baseUrls = urls;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async downloadImage(imageUrl: string, filename: string): Promise<string> {
    try {
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const uploadsDir = path.join(process.cwd(), 'uploads');
      
      // Ensure uploads directory exists
      await fs.mkdir(uploadsDir, { recursive: true });
      
      const filePath = path.join(uploadsDir, filename);
      await fs.writeFile(filePath, response.data);
      
      return `/uploads/${filename}`;
    } catch (error) {
      console.error(`Failed to download image ${imageUrl}:`, error);
      return imageUrl; // Return original URL if download fails
    }
  }

  private extractImages($: cheerio.CheerioAPI, content: cheerio.Cheerio<any>): string[] {
    const images: string[] = [];
    
    content.find('img').each((_, img) => {
      const src = $(img).attr('src');
      if (src) {
        // Convert relative URLs to absolute URLs
        const absoluteUrl = src.startsWith('http') ? src : `${this.baseUrl}${src}`;
        images.push(absoluteUrl);
      }
    });
    
    return images;
  }

  private async scrapeArticleList(pageUrl: string): Promise<{ title: string; url: string }[]> {
    try {
      console.log(`Fetching article list from: ${pageUrl}`);
      const response = await axios.get(pageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      const articles: { title: string; url: string }[] = [];

      // Look for article links in various possible selectors
      const selectors = [
        '.board_list a',
        '.article_list a',
        '.list_item a',
        '.board_item a',
        'a[href*="link"]',
        '.title a'
      ];

      for (const selector of selectors) {
        $(selector).each((_, element) => {
          const $link = $(element);
          const href = $link.attr('href');
          const title = $link.text().trim() || $link.find('.title').text().trim();
          
          if (href && title && href.includes('link=')) {
            const absoluteUrl = href.startsWith('http') ? href : `${this.baseUrl}${href}`;
            articles.push({ title, url: absoluteUrl });
          }
        });
        
        if (articles.length > 0) break;
      }

      return articles;
    } catch (error) {
      console.error(`Failed to scrape article list from ${pageUrl}:`, error);
      return [];
    }
  }

  private async scrapeArticleContent(articleUrl: string): Promise<ScrapedArticle | null> {
    try {
      console.log(`Scraping article: ${articleUrl}`);
      await this.sleep(this.delay);

      const response = await axios.get(articleUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      
      // Extract title from various possible selectors
      const title = $('.board_view .title').text().trim() ||
                   $('.article_title').text().trim() ||
                   $('.view_title').text().trim() ||
                   $('h1').first().text().trim() ||
                   $('title').text().replace(' | 선과색미술학원', '').trim();

      // Extract content from various possible selectors
      const contentSelectors = [
        '.board_view .content',
        '.article_content',
        '.view_content',
        '.board_content',
        '.content_area'
      ];

      let contentElement: cheerio.Cheerio<any> | null = null;
      for (const selector of contentSelectors) {
        const element = $(selector);
        if (element.length > 0) {
          contentElement = element;
          break;
        }
      }

      if (!contentElement || contentElement.length === 0) {
        console.error(`No content found for article: ${articleUrl}`);
        return null;
      }

      // Extract images
      const imageUrls = this.extractImages($, contentElement);

      // Get clean text content and HTML content
      const textContent = contentElement.text().trim();
      const htmlContent = contentElement.html() || '';

      if (!title || !textContent) {
        console.error(`Invalid article data for: ${articleUrl}`);
        return null;
      }

      return {
        title,
        content: htmlContent,
        category: this.targetCategory,
        imageUrls,
        originalUrl: articleUrl
      };

    } catch (error) {
      console.error(`Failed to scrape article ${articleUrl}:`, error);
      return null;
    }
  }

  private async getAllPages(): Promise<string[]> {
    const pages: string[] = [];
    
    if (this.baseUrls.length === 0) {
      // Default URLs for different categories
      const basePageUrl = 'https://lncart.modoo.at/?link=0stkad99';
      
      // Start with the provided page
      pages.push('https://lncart.modoo.at/?link=0stkad99&page=3');
      
      // Try to find other pages by checking common pagination patterns
      for (let page = 1; page <= 10; page++) {
        if (page !== 3) { // We already have page 3
          pages.push(`${basePageUrl}&page=${page}`);
        }
      }
    } else {
      // Use configured base URLs
      for (const baseUrl of this.baseUrls) {
        pages.push(baseUrl);
        // Try multiple pages for each base URL
        for (let page = 1; page <= 10; page++) {
          pages.push(`${baseUrl}&page=${page}`);
        }
      }
    }
    
    return pages;
  }

  public async scrapeAllArticles(): Promise<ScrapedArticle[]> {
    console.log('Starting web scraping process...');
    
    const allArticles: ScrapedArticle[] = [];
    const pages = await this.getAllPages();
    
    for (const pageUrl of pages) {
      console.log(`Processing page: ${pageUrl}`);
      
      // Get article list from this page
      const articleLinks = await this.scrapeArticleList(pageUrl);
      console.log(`Found ${articleLinks.length} articles on this page`);
      
      if (articleLinks.length === 0) {
        console.log(`No articles found on page: ${pageUrl}`);
        continue;
      }
      
      // Scrape each article
      for (const articleLink of articleLinks) {
        const article = await this.scrapeArticleContent(articleLink.url);
        if (article) {
          allArticles.push(article);
          console.log(`Successfully scraped: ${article.title}`);
        }
      }
      
      // Add delay between pages
      await this.sleep(this.delay * 2);
    }
    
    console.log(`Total articles scraped: ${allArticles.length}`);
    return allArticles;
  }

  public async importToMiddleSchoolDatabase(articles: ScrapedArticle[]): Promise<void> {
    console.log(`Importing ${articles.length} articles to middle school admission database...`);
    
    for (const article of articles) {
      try {
        // Download images and update URLs
        const localImageUrls: string[] = [];
        for (let i = 0; i < article.imageUrls.length; i++) {
          const imageUrl = article.imageUrls[i];
          const extension = path.extname(imageUrl).split('?')[0] || '.jpg';
          const filename = `middle_school_${Date.now()}_${i}${extension}`;
          const localUrl = await this.downloadImage(imageUrl, filename);
          localImageUrls.push(localUrl);
        }
        
        // Update content to use local image URLs
        let updatedContent = article.content;
        for (let i = 0; i < article.imageUrls.length; i++) {
          updatedContent = updatedContent.replace(article.imageUrls[i], localImageUrls[i]);
        }
        
        // Create database entry
        const admissionData: InsertMiddleSchoolAdmission = {
          title: article.title,
          content: updatedContent,
          category: article.category,
          attachments: JSON.stringify({
            images: localImageUrls,
            originalUrl: article.originalUrl
          })
        };
        
        await storage.createMiddleSchoolAdmission(admissionData);
        console.log(`Imported middle school article: ${article.title}`);
        
      } catch (error) {
        console.error(`Failed to import middle school article "${article.title}":`, error);
      }
    }
    
    console.log('Middle school import process completed!');
  }

  public async importToHighSchoolDatabase(articles: ScrapedArticle[]): Promise<void> {
    console.log(`Importing ${articles.length} articles to high school admission database...`);
    
    for (const article of articles) {
      try {
        // Download images and update URLs
        const localImageUrls: string[] = [];
        for (let i = 0; i < article.imageUrls.length; i++) {
          const imageUrl = article.imageUrls[i];
          const extension = path.extname(imageUrl).split('?')[0] || '.jpg';
          const filename = `high_school_${Date.now()}_${i}${extension}`;
          const localUrl = await this.downloadImage(imageUrl, filename);
          localImageUrls.push(localUrl);
        }
        
        // Update content to use local image URLs
        let updatedContent = article.content;
        for (let i = 0; i < article.imageUrls.length; i++) {
          updatedContent = updatedContent.replace(article.imageUrls[i], localImageUrls[i]);
        }
        
        // Create database entry
        const admissionData: InsertHighSchoolAdmission = {
          title: article.title,
          content: updatedContent,
          category: article.category,
          attachments: JSON.stringify({
            images: localImageUrls,
            originalUrl: article.originalUrl
          })
        };
        
        await storage.createHighSchoolAdmission(admissionData);
        console.log(`Imported high school article: ${article.title}`);
        
      } catch (error) {
        console.error(`Failed to import high school article "${article.title}":`, error);
      }
    }
    
    console.log('High school import process completed!');
  }
}

export async function scrapeAndImportMiddleSchoolData(): Promise<{ success: boolean; message: string; count: number }> {
  try {
    const scraper = new WebScraper();
    scraper.setTargetCategory('예중입시정보');
    scraper.setBaseUrls(['https://lncart.modoo.at/?link=0stkad99']);
    
    // Scrape all articles
    const articles = await scraper.scrapeAllArticles();
    
    if (articles.length === 0) {
      return {
        success: false,
        message: '크롤링된 데이터가 없습니다. 웹사이트 구조가 변경되었을 수 있습니다.',
        count: 0
      };
    }
    
    // Import to database
    await scraper.importToMiddleSchoolDatabase(articles);
    
    return {
      success: true,
      message: `${articles.length}개의 예중 입시정보 글을 성공적으로 가져왔습니다.`,
      count: articles.length
    };
    
  } catch (error) {
    console.error('Middle school scraping process failed:', error);
    return {
      success: false,
      message: `크롤링 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      count: 0
    };
  }
}

export async function scrapeAndImportHighSchoolData(): Promise<{ success: boolean; message: string; count: number }> {
  try {
    const scraper = new WebScraper();
    scraper.setTargetCategory('예고입시정보');
    scraper.setBaseUrls(['https://lncart.modoo.at/?link=0stkad99']); // Need to find the correct high school URL
    
    // Scrape all articles
    const articles = await scraper.scrapeAllArticles();
    
    if (articles.length === 0) {
      return {
        success: false,
        message: '크롤링된 데이터가 없습니다. 웹사이트 구조가 변경되었을 수 있습니다.',
        count: 0
      };
    }
    
    // Import to database
    await scraper.importToHighSchoolDatabase(articles);
    
    return {
      success: true,
      message: `${articles.length}개의 예고 입시정보 글을 성공적으로 가져왔습니다.`,
      count: articles.length
    };
    
  } catch (error) {
    console.error('High school scraping process failed:', error);
    return {
      success: false,
      message: `크롤링 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      count: 0
    };
  }
}