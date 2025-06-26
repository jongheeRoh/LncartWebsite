import axios from 'axios';
import * as cheerio from 'cheerio';
import { storage } from './storage';
import { InsertMiddleSchoolAdmission } from '@shared/schema';
import fs from 'fs';
import path from 'path';

interface ScrapedArticle {
  title: string;
  content: string;
  category: string;
  imageUrls: string[];
  originalUrl?: string;
}

export class DirectScraper {
  private baseUrl = 'https://lncart.modoo.at';
  private delay = 1000; // 1 second delay between requests
  private targetUrl = 'https://lncart.modoo.at/?link=0stkad99&page=3';

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async downloadImage(imageUrl: string, filename: string): Promise<string> {
    try {
      console.log(`Downloading image: ${imageUrl}`);
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      
      const uploadsDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      
      const filePath = path.join(uploadsDir, filename);
      fs.writeFileSync(filePath, response.data);
      
      const publicUrl = `/uploads/${filename}`;
      console.log(`Image saved: ${publicUrl}`);
      return publicUrl;
    } catch (error) {
      console.error(`Failed to download image ${imageUrl}:`, error);
      return imageUrl; // Return original URL if download fails
    }
  }

  private extractImages($: cheerio.CheerioAPI, content: cheerio.Cheerio<any>): string[] {
    const images: string[] = [];
    content.find('img').each((i, img) => {
      const src = $(img).attr('src');
      if (src) {
        if (src.startsWith('http')) {
          images.push(src);
        } else if (src.startsWith('/')) {
          images.push(this.baseUrl + src);
        } else {
          images.push(this.baseUrl + '/' + src);
        }
      }
    });
    return images;
  }

  private async scrapeArticleList(): Promise<{ title: string; url: string }[]> {
    try {
      console.log(`Scraping article list from: ${this.targetUrl}`);
      const response = await axios.get(this.targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      const articles: { title: string; url: string }[] = [];

      // Look for article links - adjust selectors based on actual HTML structure
      $('a').each((i, element) => {
        const href = $(element).attr('href');
        const title = $(element).text().trim();
        
        if (href && title && title.length > 0) {
          let fullUrl = href;
          if (href.startsWith('/')) {
            fullUrl = this.baseUrl + href;
          } else if (!href.startsWith('http')) {
            fullUrl = this.baseUrl + '/' + href;
          }
          
          // Filter for likely article links
          if (title.length > 5 && !title.includes('홈') && !title.includes('메뉴')) {
            articles.push({ title, url: fullUrl });
          }
        }
      });

      console.log(`Found ${articles.length} potential articles`);
      return articles.slice(0, 20); // Limit to first 20 articles
    } catch (error) {
      console.error('Error scraping article list:', error);
      return [];
    }
  }

  private async scrapeArticleContent(articleUrl: string, title: string): Promise<ScrapedArticle | null> {
    try {
      console.log(`Scraping article: ${title}`);
      await this.sleep(this.delay);

      const response = await axios.get(articleUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const $ = cheerio.load(response.data);
      
      // Extract content from various possible containers
      let content = '';
      const contentSelectors = [
        '.article-content',
        '.content',
        '.post-content',
        'main',
        '.main-content',
        'article',
        '.entry-content'
      ];
      
      for (const selector of contentSelectors) {
        const contentElement = $(selector);
        if (contentElement.length > 0) {
          content = contentElement.html() || contentElement.text();
          break;
        }
      }
      
      // If no specific content container found, get body content
      if (!content) {
        content = $('body').html() || '';
      }

      // Extract images
      const imageUrls = this.extractImages($, $('body'));

      return {
        title,
        content: content.substring(0, 5000), // Limit content length
        category: '예중입시정보',
        imageUrls,
        originalUrl: articleUrl
      };
    } catch (error) {
      console.error(`Error scraping article ${articleUrl}:`, error);
      return null;
    }
  }

  public async scrapeAllArticles(): Promise<ScrapedArticle[]> {
    console.log('Starting web scraping for 예중입시정보...');
    
    const articleList = await this.scrapeArticleList();
    const articles: ScrapedArticle[] = [];

    for (const { title, url } of articleList) {
      const article = await this.scrapeArticleContent(url, title);
      if (article) {
        articles.push(article);
      }
    }

    console.log(`Scraped ${articles.length} articles successfully`);
    return articles;
  }

  public async importToDatabase(articles: ScrapedArticle[]): Promise<void> {
    console.log(`Importing ${articles.length} articles to database...`);
    
    for (const article of articles) {
      try {
        // Download images and get local URLs
        const localImageUrls: string[] = [];
        for (let i = 0; i < Math.min(article.imageUrls.length, 3); i++) { // Limit to 3 images per article
          const imageUrl = article.imageUrls[i];
          const filename = `scraped_${Date.now()}_${i + 1}.jpg`;
          const localUrl = await this.downloadImage(imageUrl, filename);
          localImageUrls.push(localUrl);
        }

        const admissionData: InsertMiddleSchoolAdmission = {
          title: article.title,
          content: article.content,
          excerpt: article.title,
          category: article.category,
          attachments: JSON.stringify({
            images: localImageUrls,
            originalUrl: article.originalUrl
          })
        };

        await storage.createMiddleSchoolAdmission(admissionData);
        console.log(`Imported: ${article.title}`);
        
        // Add delay between database operations
        await this.sleep(500);
      } catch (error) {
        console.error(`Error importing article "${article.title}":`, error);
      }
    }
    
    console.log('Database import completed');
  }
}

export async function runDirectScraping(): Promise<{ success: boolean; message: string; count: number }> {
  try {
    const scraper = new DirectScraper();
    const articles = await scraper.scrapeAllArticles();
    
    if (articles.length === 0) {
      return { success: false, message: '스크래핑된 데이터가 없습니다.', count: 0 };
    }
    
    await scraper.importToDatabase(articles);
    
    return {
      success: true,
      message: `${articles.length}개의 예중입시정보 데이터를 성공적으로 가져왔습니다.`,
      count: articles.length
    };
  } catch (error) {
    console.error('Direct scraping error:', error);
    return {
      success: false,
      message: `스크래핑 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`,
      count: 0
    };
  }
}