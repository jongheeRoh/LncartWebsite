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

export class ComprehensiveScraper {
  private baseUrl = 'https://lncart.modoo.at';
  private delay = 2000; // 2 second delay between requests
  private targetPages = [
    'https://lncart.modoo.at/?link=0stkad99&page=1',
    'https://lncart.modoo.at/?link=0stkad99&page=2', 
    'https://lncart.modoo.at/?link=0stkad99&page=3',
    'https://lncart.modoo.at/?link=0stkad99&page=4',
    'https://lncart.modoo.at/?link=0stkad99&page=5'
  ];

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async downloadImage(imageUrl: string, filename: string): Promise<string> {
    try {
      console.log(`Downloading image: ${imageUrl}`);
      const response = await axios.get(imageUrl, { 
        responseType: 'arraybuffer',
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
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
      return imageUrl;
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

  private async scrapeArticleListFromPage(pageUrl: string): Promise<{ title: string; url: string }[]> {
    try {
      console.log(`Scraping page: ${pageUrl}`);
      await this.sleep(this.delay);
      
      const response = await axios.get(pageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'none'
        },
        timeout: 15000
      });

      const $ = cheerio.load(response.data);
      const articles: { title: string; url: string }[] = [];

      // Try multiple selectors to find article links
      const selectors = [
        'a[href*="link="]',
        'a[href*="?"]',
        '.list a',
        '.item a',
        '.post a',
        '.article a',
        'li a',
        'div a',
        'td a',
        'tr a'
      ];

      console.log(`Page content length: ${response.data.length} characters`);

      for (const selector of selectors) {
        $(selector).each((i, element) => {
          const href = $(element).attr('href');
          let title = $(element).text().trim();
          
          // Also check for title in child elements
          if (!title || title.length < 3) {
            title = $(element).find('*').text().trim();
          }
          
          if (href && title && title.length > 2) {
            let fullUrl = href;
            if (href.startsWith('/')) {
              fullUrl = this.baseUrl + href;
            } else if (!href.startsWith('http')) {
              fullUrl = this.baseUrl + '/' + href;
            }
            
            // Filter for relevant links
            if (title.length > 2 && 
                title.length < 200 &&
                !title.includes('홈페이지') && 
                !title.includes('메인') &&
                !title.includes('로그인') &&
                !title.includes('회원') &&
                !title.includes('관리') &&
                href.includes('link=') &&
                !articles.some(article => article.title === title || article.url === fullUrl)) {
              articles.push({ title, url: fullUrl });
              console.log(`Found article: "${title}" -> ${fullUrl}`);
            }
          }
        });
      }

      console.log(`Found ${articles.length} articles on page ${pageUrl}`);
      return articles;
    } catch (error) {
      console.error(`Error scraping page ${pageUrl}:`, error);
      return [];
    }
  }

  private async scrapeArticleContent(articleUrl: string, title: string): Promise<ScrapedArticle | null> {
    try {
      console.log(`Scraping article content: ${title}`);
      await this.sleep(this.delay);

      const response = await axios.get(articleUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Referer': this.baseUrl
        },
        timeout: 15000
      });

      const $ = cheerio.load(response.data);
      
      // Extract content from various possible containers
      let content = '';
      const contentSelectors = [
        '.content',
        '.article-content',
        '.post-content',
        '.entry-content',
        '.main-content',
        'main',
        'article',
        '.text',
        '.body',
        '#content',
        '.article',
        '.post'
      ];
      
      for (const selector of contentSelectors) {
        const contentElement = $(selector);
        if (contentElement.length > 0 && contentElement.text().trim().length > 50) {
          content = contentElement.html() || contentElement.text();
          break;
        }
      }
      
      // If no specific content container found, try body content
      if (!content || content.length < 50) {
        const bodyContent = $('body').html() || '';
        // Remove script and style tags
        const cleanBody = bodyContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                                    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                                    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
                                    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
                                    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
        content = cleanBody.substring(0, 8000);
      }

      // Extract images
      const imageUrls = this.extractImages($, $('body'));

      // Determine category based on content or URL
      let category = '예중입시정보';
      if (title.includes('입시요강') || title.includes('모집요강')) {
        category = '입시요강';
      } else if (title.includes('실기') || title.includes('시험')) {
        category = '실기시험';
      } else if (title.includes('설명회') || title.includes('안내')) {
        category = '설명회';
      } else if (title.includes('포트폴리오') || title.includes('작품')) {
        category = '포트폴리오';
      } else if (title.includes('결과') || title.includes('분석')) {
        category = '입시결과';
      }

      return {
        title,
        content: content.substring(0, 10000), // Limit content length
        category,
        imageUrls: imageUrls.slice(0, 5), // Limit to 5 images per article
        originalUrl: articleUrl
      };
    } catch (error) {
      console.error(`Error scraping article ${articleUrl}:`, error);
      return null;
    }
  }

  public async scrapeAllArticles(): Promise<ScrapedArticle[]> {
    console.log('Starting comprehensive scraping for all 예중입시정보 articles...');
    
    const allArticles: { title: string; url: string }[] = [];
    
    // Scrape all pages
    for (const pageUrl of this.targetPages) {
      const pageArticles = await this.scrapeArticleListFromPage(pageUrl);
      allArticles.push(...pageArticles);
    }

    console.log(`Total articles found: ${allArticles.length}`);
    
    const scrapedArticles: ScrapedArticle[] = [];

    // Scrape content for each article
    for (let i = 0; i < allArticles.length && i < 30; i++) {
      const { title, url } = allArticles[i];
      const article = await this.scrapeArticleContent(url, title);
      if (article) {
        scrapedArticles.push(article);
        console.log(`✓ Scraped ${i + 1}/${Math.min(allArticles.length, 30)}: ${article.title}`);
      } else {
        console.log(`✗ Failed to scrape: ${title}`);
      }
    }

    console.log(`Successfully scraped ${scrapedArticles.length} articles`);
    return scrapedArticles;
  }

  public async clearExistingData(): Promise<void> {
    console.log('Clearing existing middle school admission data...');
    try {
      // Get all existing records and delete them
      const existingData = await storage.getAllMiddleSchoolAdmission(1, 100);
      for (const item of existingData.items) {
        await storage.deleteMiddleSchoolAdmission(item.id);
      }
      console.log(`Cleared ${existingData.items.length} existing records`);
    } catch (error) {
      console.error('Error clearing existing data:', error);
    }
  }

  public async importToDatabase(articles: ScrapedArticle[]): Promise<void> {
    console.log(`Importing ${articles.length} articles to database...`);
    
    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      try {
        // Download images and get local URLs
        const localImageUrls: string[] = [];
        for (let j = 0; j < Math.min(article.imageUrls.length, 3); j++) {
          const imageUrl = article.imageUrls[j];
          const filename = `scraped_middle_${Date.now()}_${i}_${j}.jpg`;
          const localUrl = await this.downloadImage(imageUrl, filename);
          localImageUrls.push(localUrl);
        }

        const admissionData: InsertMiddleSchoolAdmission = {
          title: article.title,
          content: article.content,
          excerpt: article.title.length > 100 ? article.title.substring(0, 100) + '...' : article.title,
          category: article.category,
          attachments: JSON.stringify({
            images: localImageUrls,
            originalUrl: article.originalUrl
          })
        };

        await storage.createMiddleSchoolAdmission(admissionData);
        console.log(`✓ Imported ${i + 1}/${articles.length}: ${article.title}`);
        
        // Add delay between database operations
        await this.sleep(300);
      } catch (error) {
        console.error(`✗ Error importing article "${article.title}":`, error);
      }
    }
    
    console.log('Database import completed');
  }
}

export async function runComprehensiveScraping(): Promise<{ success: boolean; message: string; count: number }> {
  try {
    const scraper = new ComprehensiveScraper();
    
    // Clear existing data first
    await scraper.clearExistingData();
    
    // Scrape all articles
    const articles = await scraper.scrapeAllArticles();
    
    if (articles.length === 0) {
      return { success: false, message: '스크래핑된 데이터가 없습니다.', count: 0 };
    }
    
    // Import to database
    await scraper.importToDatabase(articles);
    
    return {
      success: true,
      message: `${articles.length}개의 예중입시정보 데이터를 성공적으로 가져왔습니다.`,
      count: articles.length
    };
  } catch (error) {
    console.error('Comprehensive scraping error:', error);
    return {
      success: false,
      message: `스크래핑 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`,
      count: 0
    };
  }
}