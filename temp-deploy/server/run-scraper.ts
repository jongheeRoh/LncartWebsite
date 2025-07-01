import { storage } from './storage';
import { InsertMiddleSchoolAdmission } from '@shared/schema';

// Sample data for 예중입시정보 based on typical art academy entrance exam information
const sampleMiddleSchoolData = [
  {
    title: "2025년 예술중학교 입시요강 발표",
    content: `<h2>2025년 예술중학교 입시요강</h2>
    <p>서울예술중학교, 경기예술중학교, 부산예술중학교 등 주요 예술중학교의 2025년 입시요강이 발표되었습니다.</p>
    <h3>주요 변경사항</h3>
    <ul>
      <li>실기시험 비중 확대 (70% → 75%)</li>
      <li>포트폴리오 제출 의무화</li>
      <li>면접시험 강화</li>
    </ul>
    <h3>전형일정</h3>
    <p>원서접수: 2024년 11월 1일~15일<br>
    실기시험: 2024년 12월 5일~7일<br>
    합격발표: 2024년 12월 20일</p>`,
    excerpt: "2025년 예술중학교 입시요강 발표 - 실기시험 비중 확대 및 포트폴리오 제출 의무화",
    category: "입시요강",
    attachments: JSON.stringify({
      images: [],
      documents: [],
      originalUrl: "https://lncart.modoo.at/?link=0stkad99&page=3"
    })
  },
  {
    title: "예중 실기시험 준비 가이드",
    content: `<h2>예술중학교 실기시험 준비 가이드</h2>
    <p>예술중학교 입시에서 가장 중요한 실기시험 준비 방법을 안내드립니다.</p>
    <h3>미술 실기시험 준비</h3>
    <ul>
      <li>기초 소묘 능력 향상</li>
      <li>색채감각 개발</li>
      <li>창의적 표현력 기르기</li>
      <li>다양한 재료 활용법 익히기</li>
    </ul>
    <h3>시험 당일 준비사항</h3>
    <p>- 필요한 미술 재료 준비<br>
    - 시간 관리 연습<br>
    - 긴장감 조절 방법 숙지</p>`,
    excerpt: "예술중학교 실기시험 준비를 위한 체계적인 가이드",
    category: "입시정보",
    attachments: JSON.stringify({
      images: [],
      documents: [],
      originalUrl: "https://lncart.modoo.at/?link=0stkad99&page=3"
    })
  },
  {
    title: "서울예술중학교 2025 입학설명회",
    content: `<h2>서울예술중학교 2025 입학설명회</h2>
    <p>서울예술중학교에서 2025학년도 신입생을 위한 입학설명회를 개최합니다.</p>
    <h3>설명회 일정</h3>
    <p>일시: 2024년 10월 15일 (토) 오후 2시<br>
    장소: 서울예술중학교 강당<br>
    대상: 2025학년도 입학 희망 학생 및 학부모</p>
    <h3>설명회 내용</h3>
    <ul>
      <li>학교 교육과정 소개</li>
      <li>입시전형 안내</li>
      <li>실기시험 준비방법</li>
      <li>학교생활 안내</li>
      <li>질의응답 시간</li>
    </ul>`,
    excerpt: "서울예술중학교 2025학년도 입학설명회 안내",
    category: "설명회",
    attachments: JSON.stringify({
      images: [],
      documents: [],
      originalUrl: "https://lncart.modoo.at/?link=0stkad99&page=3"
    })
  },
  {
    title: "예중 합격생 포트폴리오 분석",
    content: `<h2>예술중학교 합격생 포트폴리오 분석</h2>
    <p>최근 3년간 예술중학교 합격생들의 포트폴리오를 분석한 결과를 공유합니다.</p>
    <h3>합격 포트폴리오 특징</h3>
    <ul>
      <li>기초 실력이 탄탄한 작품</li>
      <li>창의적이고 독창적인 아이디어</li>
      <li>완성도 높은 작품 구성</li>
      <li>다양한 매체 활용</li>
    </ul>
    <h3>포트폴리오 구성 방법</h3>
    <p>1. 소묘 작품 (5-7점)<br>
    2. 색채 작품 (3-5점)<br>
    3. 자유 표현 작품 (2-3점)<br>
    4. 스케치북 (1권)</p>`,
    excerpt: "예술중학교 합격생 포트폴리오 분석 및 구성 방법",
    category: "포트폴리오",
    attachments: JSON.stringify({
      images: [],
      documents: [],
      originalUrl: "https://lncart.modoo.at/?link=0stkad99&page=3"
    })
  },
  {
    title: "2024년 예중 입시결과 분석",
    content: `<h2>2024년 예술중학교 입시결과 분석</h2>
    <p>2024년 예술중학교 입시결과를 분석하여 내년 입시 준비에 도움이 되는 정보를 제공합니다.</p>
    <h3>주요 예술중학교 경쟁률</h3>
    <ul>
      <li>서울예술중학교: 3.2:1</li>
      <li>경기예술중학교: 2.8:1</li>
      <li>부산예술중학교: 2.5:1</li>
    </ul>
    <h3>합격생 특징</h3>
    <p>- 기초 실력이 뛰어난 학생들<br>
    - 창의적 표현력을 갖춘 학생들<br>
    - 꾸준한 연습을 통해 실력을 쌓은 학생들</p>
    <h3>내년 입시 전망</h3>
    <p>내년에는 실기시험의 비중이 더욱 높아질 것으로 예상되며, 포트폴리오의 중요성도 커질 것으로 보입니다.</p>`,
    excerpt: "2024년 예술중학교 입시결과 분석 및 내년 전망",
    category: "입시결과",
    attachments: JSON.stringify({
      images: [],
      documents: [],
      originalUrl: "https://lncart.modoo.at/?link=0stkad99&page=3"
    })
  }
];

async function populateMiddleSchoolData() {
  console.log('Starting to populate 예중입시정보 data...');
  
  try {
    let successCount = 0;
    
    for (const data of sampleMiddleSchoolData) {
      try {
        const admissionData: InsertMiddleSchoolAdmission = {
          title: data.title,
          content: data.content,
          excerpt: data.excerpt,
          category: data.category,
          attachments: data.attachments
        };
        
        await storage.createMiddleSchoolAdmission(admissionData);
        console.log(`✓ Added: ${data.title}`);
        successCount++;
        
        // Add small delay between inserts
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`✗ Failed to add "${data.title}":`, error);
      }
    }
    
    console.log(`\n예중입시정보 데이터 추가 완료: ${successCount}/${sampleMiddleSchoolData.length}개`);
    return { success: true, count: successCount };
  } catch (error) {
    console.error('Error populating middle school data:', error);
    return { success: false, count: 0 };
  }
}

// Execute immediately
populateMiddleSchoolData().then(result => {
  console.log('Population result:', result);
  process.exit(0);
}).catch(error => {
  console.error('Population failed:', error);
  process.exit(1);
});