import axios from 'axios';
import * as cheerio from 'cheerio';
import { storage } from './storage';
import { InsertMiddleSchoolAdmission } from '@shared/schema';

async function extractRealContent() {
  try {
    // Clear existing data first
    await clearExistingData();
    
    console.log('Fetching real content from https://lncart.modoo.at/?link=0stkad99&page=3...');
    
    const response = await axios.get('https://lncart.modoo.at/?link=0stkad99&page=3', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 30000,
    });

    const $ = cheerio.load(response.data);
    
    console.log('Page title:', $('title').text());
    console.log('Meta description:', $('meta[name="description"]').attr('content'));
    
    // Find article links or content items
    const articles: Array<{title: string, content: string, excerpt: string}> = [];
    
    // Look for various content selectors
    const contentSelectors = [
      '.board_list li',
      '.post_list li', 
      '.article_list li',
      '.content_list li',
      'article',
      '.post',
      '.board_item',
      '.list_item'
    ];
    
    for (const selector of contentSelectors) {
      const items = $(selector);
      console.log(`Found ${items.length} items with selector: ${selector}`);
      
      if (items.length > 0) {
        items.each((index, element) => {
          const $element = $(element);
          const title = $element.find('h1, h2, h3, h4, .title, .subject').first().text().trim() ||
                       $element.find('a').first().text().trim() ||
                       `예중입시정보 ${index + 1}`;
          
          const content = $element.text().trim();
          
          if (content.length > 50 && title.length > 0) {
            articles.push({
              title: title,
              content: `<h2>${title}</h2><p>${content}</p>`,
              excerpt: content.substring(0, 150) + '...'
            });
            console.log(`Article ${articles.length}: ${title.substring(0, 50)}...`);
          }
        });
        
        if (articles.length > 0) break; // Found content, stop looking
      }
    }
    
    // If no articles found, try to extract from main content area
    if (articles.length === 0) {
      const mainSelectors = [
        '#main', '.main', '.content', '.board_content', 
        '.post_content', '.article_content', '.container',
        '.wrapper', '.inner'
      ];
      
      for (const selector of mainSelectors) {
        const mainContent = $(selector).first();
        if (mainContent.length > 0) {
          const contentText = mainContent.text().trim();
          console.log(`Main content found with ${selector}: ${contentText.length} characters`);
          
          if (contentText.length > 100) {
            // Split content into meaningful sections
            const paragraphs = contentText.split(/\n\s*\n/).filter(p => p.trim().length > 30);
            
            paragraphs.forEach((paragraph, index) => {
              const title = `예중입시정보 ${index + 1}`;
              articles.push({
                title: title,
                content: `<h2>${title}</h2><p>${paragraph.trim()}</p>`,
                excerpt: paragraph.trim().substring(0, 150) + '...'
              });
            });
            
            break;
          }
        }
      }
    }
    
    // Save articles to database
    let savedCount = 0;
    for (const article of articles) {
      try {
        const admissionData: InsertMiddleSchoolAdmission = {
          title: article.title,
          content: article.content,
          excerpt: article.excerpt,
          category: "예중입시정보",
          attachments: {
            images: [],
            documents: []
          }
        };

        await storage.createMiddleSchoolAdmission(admissionData);
        savedCount++;
        console.log(`✓ Saved article: ${article.title}`);
      } catch (error) {
        console.error(`Error saving article "${article.title}":`, error);
      }
    }
    
    console.log(`\n✅ Successfully saved ${savedCount} articles from real website`);
    
    // If still no meaningful content, extract everything we can
    if (savedCount === 0) {
      const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
      console.log('Full page text length:', bodyText.length);
      
      if (bodyText.length > 200) {
        const admissionData: InsertMiddleSchoolAdmission = {
          title: "예중입시정보 - 전체 페이지 내용",
          content: `<h2>예중입시정보</h2><p>${bodyText}</p>`,
          excerpt: bodyText.substring(0, 150) + '...',
          category: "예중입시정보",
          attachments: {
            images: [],
            documents: []
          }
        };

        await storage.createMiddleSchoolAdmission(admissionData);
        savedCount = 1;
        console.log('✓ Saved full page content as fallback');
      }
    }
    
    return { success: true, hasContent: savedCount > 0, count: savedCount };

  } catch (error) {
    console.error('Error extracting real content:', error);
    return { success: false, hasContent: false, count: 0 };
  }
}

async function clearExistingData() {
  try {
    // Use raw SQL to clear existing data
    const { db } = await import('./db');
    await db.execute(`DELETE FROM middle_school_admission`);
    console.log('✓ Cleared existing middle school admission data');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
}

extractRealContent().then(result => {
  if (result.success) {
    if (result.hasContent) {
      console.log('\n✅ Real content found and saved');
    } else {
      console.log('\n⚠️  Page exists but contains no meaningful content');
    }
  } else {
    console.log('\n❌ Failed to extract content');
  }
  process.exit(0);
}).catch(console.error);