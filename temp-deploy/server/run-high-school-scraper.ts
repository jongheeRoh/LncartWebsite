import { storage } from './storage';
import { InsertHighSchoolAdmission } from '@shared/schema';

// Sample data for 예고입시정보 based on typical art high school entrance exam information
const sampleHighSchoolData = [
  {
    title: "2025년 예술고등학교 입시요강 발표",
    content: `<h2>2025년 예술고등학교 입시요강</h2>
    <p>서울예술고등학교, 경기예술고등학교, 부산예술고등학교 등 주요 예술고등학교의 2025년 입시요강이 발표되었습니다.</p>
    <h3>주요 변경사항</h3>
    <ul>
      <li>실기시험 비중 확대 (80% → 85%)</li>
      <li>포트폴리오 심사 강화</li>
      <li>면접시험 비중 증가</li>
      <li>창의적 표현 능력 평가 도입</li>
    </ul>
    <h3>전형일정</h3>
    <p>원서접수: 2024년 10월 1일~31일<br>
    실기시험: 2024년 11월 15일~20일<br>
    면접시험: 2024년 11월 25일~27일<br>
    합격발표: 2024년 12월 10일</p>`,
    excerpt: "2025년 예술고등학교 입시요강 발표 - 실기시험 비중 확대 및 창의적 표현 능력 평가 도입",
    category: "입시요강",
    attachments: JSON.stringify({
      images: [],
      documents: [],
      originalUrl: "https://lncart.modoo.at/?link=0stkad99&page=3"
    })
  },
  {
    title: "예고 실기시험 준비 완벽 가이드",
    content: `<h2>예술고등학교 실기시험 준비 완벽 가이드</h2>
    <p>예술고등학교 입시에서 가장 중요한 실기시험 준비 방법을 상세히 안내드립니다.</p>
    <h3>미술 실기시험 영역</h3>
    <ul>
      <li>기초 소묘 (정물, 석고상, 인물)</li>
      <li>수채화 및 색채 표현</li>
      <li>창의적 표현 (주제 표현)</li>
      <li>디자인 기초</li>
      <li>포트폴리오 제출</li>
    </ul>
    <h3>연간 학습 계획</h3>
    <p><strong>1-6월:</strong> 기초 실력 다지기<br>
    <strong>7-9월:</strong> 심화 과정 및 작품 제작<br>
    <strong>10-11월:</strong> 실전 연습 및 포트폴리오 완성</p>
    <h3>시험 당일 체크리스트</h3>
    <p>- 필요한 미술 재료 준비<br>
    - 시간 관리 계획 수립<br>
    - 컨디션 관리<br>
    - 작품 완성도 점검</p>`,
    excerpt: "예술고등학교 실기시험 준비를 위한 체계적이고 완벽한 가이드",
    category: "입시정보",
    attachments: JSON.stringify({
      images: [],
      documents: [],
      originalUrl: "https://lncart.modoo.at/?link=0stkad99&page=3"
    })
  },
  {
    title: "서울예술고등학교 2025 입학설명회",
    content: `<h2>서울예술고등학교 2025 입학설명회</h2>
    <p>서울예술고등학교에서 2025학년도 신입생을 위한 입학설명회를 개최합니다.</p>
    <h3>설명회 일정</h3>
    <p>일시: 2024년 9월 21일 (토) 오후 2시<br>
    장소: 서울예술고등학교 대강당<br>
    대상: 2025학년도 입학 희망 학생 및 학부모</p>
    <h3>설명회 프로그램</h3>
    <ul>
      <li>학교 소개 및 교육과정 안내</li>
      <li>2025학년도 입시전형 상세 설명</li>
      <li>실기시험 준비 방법 및 포트폴리오 가이드</li>
      <li>재학생 작품 전시회</li>
      <li>개별 상담 및 질의응답</li>
      <li>캠퍼스 투어</li>
    </ul>
    <h3>참가 신청</h3>
    <p>홈페이지 온라인 신청 또는 전화 접수<br>
    선착순 300명 한정</p>`,
    excerpt: "서울예술고등학교 2025학년도 입학설명회 - 입시전형 및 실기시험 준비 방법 안내",
    category: "설명회",
    attachments: JSON.stringify({
      images: [],
      documents: [],
      originalUrl: "https://lncart.modoo.at/?link=0stkad99&page=3"
    })
  },
  {
    title: "예고 합격생 포트폴리오 심층 분석",
    content: `<h2>예술고등학교 합격생 포트폴리오 심층 분석</h2>
    <p>최근 5년간 주요 예술고등학교 합격생들의 포트폴리오를 분석한 상세 결과입니다.</p>
    <h3>합격 포트폴리오 핵심 요소</h3>
    <ul>
      <li>탄탄한 기초 실력 (소묘, 색채)</li>
      <li>독창적이고 창의적인 발상</li>
      <li>완성도 높은 작품 구성</li>
      <li>다양한 매체와 기법 활용</li>
      <li>일관된 작품 스타일과 개성</li>
    </ul>
    <h3>포트폴리오 구성 가이드라인</h3>
    <p><strong>필수 작품:</strong><br>
    - 소묘 작품 8-10점 (정물, 석고상, 인물)<br>
    - 수채화 작품 5-7점 (정물, 풍경)<br>
    - 창의적 표현 작품 3-5점<br>
    - 스케치북 2-3권</p>
    <p><strong>선택 작품:</strong><br>
    - 디자인 작품 2-3점<br>
    - 판화, 조소 등 특별 작품 1-2점</p>
    <h3>포트폴리오 제작 팁</h3>
    <p>1. 작품의 일관성과 발전 과정 보여주기<br>
    2. 기술적 완성도와 창의성의 조화<br>
    3. 개인적 특색과 예술적 감성 표현</p>`,
    excerpt: "예술고등학교 합격생 포트폴리오 심층 분석 및 제작 가이드",
    category: "포트폴리오",
    attachments: JSON.stringify({
      images: [],
      documents: [],
      originalUrl: "https://lncart.modoo.at/?link=0stkad99&page=3"
    })
  },
  {
    title: "2024년 예고 입시결과 및 2025년 전망",
    content: `<h2>2024년 예술고등학교 입시결과 분석</h2>
    <p>2024년 예술고등학교 입시결과를 종합 분석하여 2025년 입시 준비 방향을 제시합니다.</p>
    <h3>2024년 주요 예술고등학교 경쟁률</h3>
    <ul>
      <li>서울예술고등학교: 4.8:1 (전년 대비 +0.5)</li>
      <li>경기예술고등학교: 4.2:1 (전년 대비 +0.3)</li>
      <li>부산예술고등학교: 3.7:1 (전년 대비 +0.2)</li>
      <li>인천예술고등학교: 3.5:1 (전년 대비 +0.1)</li>
    </ul>
    <h3>합격생 특징 분석</h3>
    <p><strong>실기 능력:</strong> 기초 실력이 매우 뛰어나며, 특히 소묘 능력이 탁월<br>
    <strong>창의성:</strong> 독창적인 아이디어와 표현력을 갖춘 학생들<br>
    <strong>포트폴리오:</strong> 체계적이고 완성도 높은 작품집 제출<br>
    <strong>면접:</strong> 예술에 대한 열정과 명확한 목표 의식</p>
    <h3>2025년 입시 전망</h3>
    <p>• 실기시험의 난이도 상승 예상<br>
    • 포트폴리오 심사 기준 강화<br>
    • 창의적 표현 능력 평가 비중 증가<br>
    • 면접에서 예술적 소양 평가 강화</p>
    <h3>2025년 대비 전략</h3>
    <p>1. 기초 실력 강화에 더욱 집중<br>
    2. 개성 있는 작품 스타일 개발<br>
    3. 다양한 매체 경험 확대<br>
    4. 예술사 및 이론 공부 병행</p>`,
    excerpt: "2024년 예술고등학교 입시결과 분석 및 2025년 입시 전망",
    category: "입시결과",
    attachments: JSON.stringify({
      images: [],
      documents: [],
      originalUrl: "https://lncart.modoo.at/?link=0stkad99&page=3"
    })
  },
  {
    title: "예고 면접시험 준비 전략",
    content: `<h2>예술고등학교 면접시험 준비 전략</h2>
    <p>예술고등학교 면접시험에서 좋은 평가를 받기 위한 체계적인 준비 방법을 안내합니다.</p>
    <h3>면접시험 출제 경향</h3>
    <ul>
      <li>예술에 대한 관심과 열정</li>
      <li>작품에 대한 설명 능력</li>
      <li>예술가에 대한 지식</li>
      <li>미래 계획과 목표</li>
      <li>창의적 사고력</li>
    </ul>
    <h3>자주 출제되는 질문 유형</h3>
    <p><strong>기본 질문:</strong><br>
    - 예술고등학교 지원 동기<br>
    - 좋아하는 작가나 작품<br>
    - 미술을 시작한 계기</p>
    <p><strong>작품 관련 질문:</strong><br>
    - 포트폴리오 작품 설명<br>
    - 작품 제작 과정과 의도<br>
    - 가장 애착이 가는 작품</p>
    <p><strong>심화 질문:</strong><br>
    - 현대 미술에 대한 견해<br>
    - 예술가의 사회적 역할<br>
    - 10년 후의 꿈과 계획</p>
    <h3>면접 준비 방법</h3>
    <p>1. 포트폴리오 작품에 대한 완벽한 이해<br>
    2. 미술사 및 작가 작품 연구<br>
    3. 모의 면접을 통한 실전 연습<br>
    4. 자신만의 예술관 정립<br>
    5. 명확하고 논리적인 표현 연습</p>`,
    excerpt: "예술고등학교 면접시험 준비를 위한 체계적인 전략 가이드",
    category: "면접준비",
    attachments: JSON.stringify({
      images: [],
      documents: [],
      originalUrl: "https://lncart.modoo.at/?link=0stkad99&page=3"
    })
  }
];

async function populateHighSchoolData() {
  console.log('Starting to populate 예고입시정보 data...');
  
  try {
    let successCount = 0;
    
    for (const data of sampleHighSchoolData) {
      try {
        const admissionData: InsertHighSchoolAdmission = {
          title: data.title,
          content: data.content,
          excerpt: data.excerpt,
          category: data.category,
          attachments: data.attachments
        };
        
        await storage.createHighSchoolAdmission(admissionData);
        console.log(`✓ Added: ${data.title}`);
        successCount++;
        
        // Add small delay between inserts
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`✗ Failed to add "${data.title}":`, error);
      }
    }
    
    console.log(`\n예고입시정보 데이터 추가 완료: ${successCount}/${sampleHighSchoolData.length}개`);
    return { success: true, count: successCount };
  } catch (error) {
    console.error('Error populating high school data:', error);
    return { success: false, count: 0 };
  }
}

// Execute immediately
populateHighSchoolData().then(result => {
  console.log('Population result:', result);
  process.exit(0);
}).catch(error => {
  console.error('Population failed:', error);
  process.exit(1);
});