import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { storage } from './storage';

interface ImportData {
  notices?: any[];
  galleryItems?: any[];
}

export async function importDataFromFile(filePath: string, fileType: string): Promise<{ success: boolean, message: string, imported: any }> {
  try {
    let data: ImportData = {};

    if (fileType === 'application/json' || path.extname(filePath) === '.json') {
      // JSON 파일 처리
      const fileContent = fs.readFileSync(filePath, 'utf8');
      data = JSON.parse(fileContent);
    } else if (fileType === 'text/csv' || path.extname(filePath) === '.csv') {
      // CSV 파일 처리
      data = await parseCSV(filePath);
    } else {
      return { success: false, message: '지원하지 않는 파일 형식입니다. JSON 또는 CSV 파일만 업로드 가능합니다.', imported: null };
    }

    const imported = {
      notices: 0,
      galleryItems: 0
    };

    // 공지사항 가져오기
    if (data.notices && Array.isArray(data.notices)) {
      for (const notice of data.notices) {
        try {
          await storage.createNotice({
            title: notice.title || notice.제목,
            content: notice.content || notice.내용,
            excerpt: notice.excerpt || notice.요약 || '',
            category: notice.category || notice.카테고리 || '일반',
            attachments: notice.attachments || []
          });
          imported.notices++;
        } catch (error) {
          console.error('Notice import error:', error);
        }
      }
    }

    // 갤러리 아이템 가져오기
    if (data.galleryItems && Array.isArray(data.galleryItems)) {
      for (const item of data.galleryItems) {
        try {
          await storage.createGalleryItem({
            title: item.title || item.제목,
            description: item.description || item.설명,
            imageUrl: item.imageUrl || item.이미지주소,
            category: item.category || item.카테고리 || '소묘',
            attachments: item.attachments || []
          });
          imported.galleryItems++;
        } catch (error) {
          console.error('Gallery item import error:', error);
        }
      }
    }

    // 임시 파일 삭제
    fs.unlinkSync(filePath);

    return {
      success: true,
      message: `데이터 가져오기 완료: 공지사항 ${imported.notices}개, 갤러리 ${imported.galleryItems}개`,
      imported
    };

  } catch (error) {
    console.error('Data import error:', error);
    // 오류 발생 시 임시 파일 삭제
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return { success: false, message: '데이터 가져오기 중 오류가 발생했습니다: ' + error.message, imported: null };
  }
}

function parseCSV(filePath: string): Promise<ImportData> {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        // CSV 데이터를 적절한 형태로 변환
        const notices = results.filter(row => row.type === 'notice' || row.타입 === '공지사항');
        const galleryItems = results.filter(row => row.type === 'gallery' || row.타입 === '갤러리');
        
        resolve({ notices, galleryItems });
      })
      .on('error', reject);
  });
}

// 샘플 데이터 생성 함수
export function generateSampleDataFile(): string {
  const sampleData = {
    notices: [
      {
        title: "2025년 신규 입시 정보",
        content: "<p>2025년 신규 입시 정보를 안내드립니다.</p>",
        excerpt: "2025년 신규 입시 정보 안내",
        category: "예중입시정보",
        attachments: []
      },
      {
        title: "학원 행사 안내",
        content: "<p>학원 행사를 안내드립니다.</p>",
        excerpt: "학원 행사 안내",
        category: "일반",
        attachments: []
      }
    ],
    galleryItems: [
      {
        title: "학생 작품 - 정물 소묘",
        description: "중학생이 그린 정물 소묘 작품입니다.",
        imageUrl: "https://example.com/image1.jpg",
        category: "소묘",
        attachments: []
      },
      {
        title: "학생 작품 - 수채화",
        description: "고등학생이 그린 수채화 작품입니다.",
        imageUrl: "https://example.com/image2.jpg",
        category: "수채화",
        attachments: []
      }
    ]
  };

  const filePath = path.join(process.cwd(), 'uploads', 'sample-data.json');
  fs.writeFileSync(filePath, JSON.stringify(sampleData, null, 2), 'utf8');
  return filePath;
}