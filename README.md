# 선과색미술학원 웹사이트

30년 전통의 예술교육 전문기관 선과색미술학원의 공식 웹사이트입니다.

## 🎨 주요 기능

- **홈페이지**: 학원 소개 및 주요 정보
- **학원소개**: 학원 역사와 교육철학
- **공지사항**: 학원 소식 및 중요 안내사항
- **갤러리**: 학생 작품 및 학원 활동 사진
- **예중입시정보**: 예술중학교 입시 정보 및 준비 가이드
- **예고입시정보**: 예술고등학교 입시 정보 및 준비 가이드
- **오시는길**: 학원 위치 및 교통편 안내
- **관리자 시스템**: 콘텐츠 관리 및 업데이트

## 🛠 기술 스택

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** + shadcn/ui components
- **Wouter** for routing
- **TanStack Query** for server state management
- **Vite** for build tool

### Backend
- **Node.js** + **Express.js**
- **PostgreSQL** database
- **Drizzle ORM** for database operations
- **Session-based authentication**

### 배포
- **Vercel** hosting platform
- **PostgreSQL** cloud database

## 🚀 배포 가이드 (Vercel)

### 1. GitHub 연결
1. 프로젝트를 GitHub 리포지토리에 업로드
2. Vercel 계정 생성 및 GitHub 연결

### 2. Vercel 프로젝트 생성
1. Vercel 대시보드에서 "New Project" 클릭
2. GitHub 리포지토리 선택
3. 프레임워크 감지: Vite 자동 선택됨

### 3. 환경 변수 설정
Vercel 프로젝트 설정에서 다음 환경 변수 추가:

```bash
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_secure_random_string
NODE_ENV=production
```

### 4. PostgreSQL 데이터베이스 설정
**추천 서비스:**
- **Neon** (무료 PostgreSQL)
- **Supabase** (무료 PostgreSQL)
- **PlanetScale** (MySQL 대안)

### 5. 도메인 연결 (www.lncart.kr)
1. Vercel 프로젝트 > Settings > Domains
2. 도메인 추가: `www.lncart.kr`
3. Cafe24 네임서버에서 CNAME 설정:
   ```
   Type: CNAME
   Name: www
   Value: your-project.vercel.app
   ```

## 📱 로컬 개발 환경

### 설치 및 실행
```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일에 실제 값 입력

# 데이터베이스 스키마 적용
npm run db:push

# 개발 서버 실행
npm run dev
```

### 빌드
```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 🔧 관리자 기능

- **공지사항 관리**: 생성, 수정, 삭제
- **갤러리 관리**: 이미지 업로드 및 관리
- **입시정보 관리**: 예중/예고 입시 정보 업데이트
- **파일 첨부**: PDF, 이미지 등 파일 업로드 지원
- **조회수 통계**: 게시글별 조회수 확인

## 📞 문의

- **전화**: 02-453-2379
- **주소**: 서울특별시 광진구 천호대로 677 (구의동)
- **이메일**: danaya1003@naver.com

---

**선과색미술학원** - 꿈을 현실로 만드는 30년 전통의 예술교육