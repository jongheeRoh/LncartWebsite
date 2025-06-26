import axios from 'axios';
import * as cheerio from 'cheerio';
import { storage } from './storage';
import { InsertMiddleSchoolAdmission } from '@shared/schema';

async function extractRealContent() {
  try {
    console.log('Fetching real content from https://lncart.modoo.at/?link=0stkad99...');
    
    const response = await axios.get('https://lncart.modoo.at/?link=0stkad99', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      timeout: 30000,
    });

    const $ = cheerio.load(response.data);
    
    console.log('Page title:', $('title').text());
    console.log('Meta description:', $('meta[name="description"]').attr('content'));
    
    // 본문 내용 찾기
    const mainContent = $('#main, .main, .content, .board_content, .post_content, .article_content').first();
    
    if (mainContent.length > 0) {
      console.log('Found main content area');
      const contentText = mainContent.text().trim();
      console.log('Content preview:', contentText.substring(0, 500));
      
      if (contentText.length > 100) {
        // 실제 콘텐츠가 있는 경우 데이터베이스에 저장
        const admissionData: InsertMiddleSchoolAdmission = {
          title: "예중입시정보",
          content: `<h2>예중입시정보</h2><p>${contentText}</p>`,
          excerpt: contentText.substring(0, 150) + '...',
          category: "예중입시정보",
          attachments: {
            images: [],
            documents: []
          }
        };

        await storage.createMiddleSchoolAdmission(admissionData);
        console.log('✓ Real content saved to database');
        return { success: true, hasContent: true, content: contentText };
      }
    }
    
    // 전체 페이지에서 텍스트 추출
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
    console.log('Full body text preview:', bodyText.substring(0, 1000));
    
    // 의미있는 콘텐츠 찾기
    const meaningfulSections = $('p, div, article, section').filter((i, el) => {
      const text = $(el).text().trim();
      return text.length > 50 && 
             (text.includes('예중') || text.includes('입시') || text.includes('미술') || text.includes('학원'));
    });
    
    if (meaningfulSections.length > 0) {
      console.log(`Found ${meaningfulSections.length} meaningful sections`);
      meaningfulSections.each((i, el) => {
        console.log(`Section ${i + 1}:`, $(el).text().substring(0, 200));
      });
    } else {
      console.log('No meaningful content found - page appears to be empty');
    }
    
    return { success: true, hasContent: false, content: bodyText };

  } catch (error) {
    console.error('Error extracting real content:', error);
    return { success: false, hasContent: false, content: null };
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