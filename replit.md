# Art Academy Website - Replit.md

## Overview

This is a full-stack web application for an art academy (선과색미술학원) that specializes in art entrance exam preparation for middle school, high school, and university art programs. The application features a modern React frontend with a Node.js/Express backend, using PostgreSQL for data persistence and Drizzle ORM for database operations.

### Current Project Status
- **Frontend**: React 18 + TypeScript with shadcn/ui components
- **Backend**: Express.js with PostgreSQL database integration
- **Content Management**: Complete CMS with CKEditor 5 Classic integration
- **Authentication**: Session-based admin authentication system
- **File Handling**: Image upload system with 5MB limit and multiple format support
- **Database**: PostgreSQL with comprehensive schema for users, notices, gallery, and admission info

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and production builds
- **Styling**: CSS-in-JS with Tailwind CSS and custom CSS variables for theming

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful API architecture
- **Development**: Hot reload with Vite middleware integration

### Database Architecture
- **Primary Database**: PostgreSQL (configured via Neon serverless)
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Schema**: Three main entities - users, notices, and gallery items
- **Migrations**: Managed through Drizzle Kit

## Key Components

### Database Schema
1. **Users Table**: Handles authentication with username/password and admin roles
2. **Notices Table**: Content management for announcements with categories and timestamps
3. **Gallery Items Table**: Image gallery with metadata and categorization
4. **Middle School Admission Table**: 예중입시정보 content with rich text and attachments
5. **High School Admission Table**: 예고입시정보 content with rich text and attachments
6. **Roadmap Table**: Educational pathway guides for entrance exam preparation
7. **Comments Table**: Anonymous commenting system for admission information posts
8. **Sessions Table**: PostgreSQL-based session storage for admin authentication

### Frontend Components
1. **Layout Components**: Navbar and Footer for consistent site structure
2. **Page Components**: Home, About, Notices, Gallery, Admin, and educational content pages
3. **Content Management Pages**: 
   - Middle School Admission (예중입시정보) with detail views and commenting
   - High School Admission (예고입시정보) with detail views and commenting
   - Roadmap management for educational pathways
4. **UI Components**: Complete shadcn/ui component library integration
5. **Rich Text Editor**: CKEditor 5 Classic with image upload and media embedding
6. **Form Management**: React Hook Form with Zod validation

### Backend Services
1. **Storage Layer**: Abstracted storage interface with in-memory fallback
2. **Route Handlers**: RESTful endpoints for CRUD operations
3. **Middleware**: Request logging, error handling, and static file serving
4. **Development Tools**: Vite integration for hot module replacement

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Layer**: Express routes handle HTTP requests and validate data
3. **Business Logic**: Storage services process data operations
4. **Database Layer**: Drizzle ORM executes type-safe database queries
5. **Response**: JSON responses sent back to client components
6. **State Updates**: TanStack Query manages cache invalidation and updates

## External Dependencies

### Core Dependencies
- **Database**: Neon serverless PostgreSQL for cloud database hosting
- **Authentication**: Express sessions with connect-pg-simple for session storage
- **Validation**: Zod for runtime type checking and form validation
- **UI Components**: Radix UI primitives for accessible component foundations
- **Development**: Replit-specific plugins for development environment integration

### Build Dependencies
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast JavaScript bundling for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration
- **Vite**: Development server and build tool

## Deployment Strategy

### Development Environment
- **Platform**: Replit with PostgreSQL module enabled
- **Hot Reload**: Vite development server with middleware integration
- **Port Configuration**: Frontend served on port 5000 with proxy setup

### Production Build
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: ESBuild bundles server code to `dist/index.js`
3. **Deployment**: Autoscale deployment target on Replit
4. **Static Assets**: Express serves built frontend assets

### Environment Configuration
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable
- **Sessions**: Secure session management with PostgreSQL store
- **Development**: Node environment detection for conditional features

## Recent Changes

- **June 30, 2025**: **갤러리 관리 인증 문제 해결** - 관리자 로그인 자격증명 확인 (admin/line2024!), 갤러리 폼 인증 오류 디버깅 강화, 세션 기반 인증 시스템 안정화
- **June 30, 2025**: **시스템 완전 안정화 및 통합 완료** - 갤러리 관리 시스템을 관리자 전용으로 변경, 로드맵 API 경로 통일, TypeScript 오류 완전 해결, 홈페이지 링크 연결 완성
- **June 30, 2025**: **YouTube 비디오 통합 완료** - 홈페이지와 학원소개 페이지에 학원 소개 및 교육 영상 임베드, 추천 비디오 제거 설정으로 전문성 강화
- **June 30, 2025**: **관리자 갤러리 시스템 완성** - 갤러리 작성을 일반 사용자 접근에서 관리자 전용 관리 시스템으로 변경, 생성/수정/삭제 기능 완전 통합
- **June 30, 2025**: **Starry.com 스타일 디자인 시스템 적용** - 보라색-파란색 그라데이션 색상 팔레트, 대형 타이포그래피, 모던한 카드 레이아웃, 부드러운 애니메이션 효과로 전체 디자인 시스템 업데이트
- **June 30, 2025**: **홈페이지 완전 리디자인** - Starry 스타일의 히어로 섹션, 그라데이션 배경, 플로팅 애니메이션, 통계 섹션 등 모던하고 세련된 레이아웃으로 변경
- **June 30, 2025**: **네비게이션 바 모던화** - 백드롭 블러, 그라데이션 액티브 상태, 둥근 모서리 버튼으로 Starry 디자인 언어 적용
- **June 30, 2025**: **예고입시정보 조회수 및 첨부파일 기능 완성** - 조회수 증가 API, 첨부파일 업로드, 목록/상세 페이지 조회수 표시 기능 구현 완료
- **June 30, 2025**: **관리자 패널 구조 정리 완료** - 로드맵 관리를 전용 섹션으로 이동하여 글쓰기 기능 통합, 대시보드에서 중복 기능 제거로 UI 단순화
- **June 30, 2025**: **공지사항 조회수 시스템 구현** - 데이터베이스에 views 필드 추가, 공지사항 상세/목록 페이지에 조회수 표시 기능 완성
- **June 30, 2025**: **길찾기 서비스 개선** - 오시는길 페이지의 길찾기 버튼을 네이버 지도 서비스로 연결, 기존 네이버 지도 임베드와 통합
- **June 30, 2025**: **네비게이션 인터페이스 개선** - 모든 상세 페이지(예중입시정보, 예고입시정보, 공지사항, 갤러리)에 "이전글 | 리스트 | 다음글" 형태의 3버튼 레이아웃 적용, 일관된 사용자 경험 제공
- **June 27, 2025**: **CKEditor 5 완전 통합 및 최적화** - TipTap 에디터를 CKEditor 5 Classic으로 교체, 툴바에서 직접 이미지 업로드 가능, 정적 툴바 배치로 사용성 개선
- **June 27, 2025**: **상세 페이지 라우팅 문제 해결** - 상세 페이지가 홈페이지 전체를 다시 로딩하는 문제 수정, 독립적인 페이지 구조로 변경
- **June 27, 2025**: **상세 페이지 레이아웃 완전 개선** - 예중입시정보 상세 페이지 깔끔한 디자인으로 재구성, 동영상 렌더링 기능 완전 통합
- **June 27, 2025**: **동영상 렌더링 기능 완전 구현** - YouTube URL을 특수 마커로 저장하고 상세 페이지에서 자동 iframe 변환하는 시스템 구축
- **June 27, 2025**: **이미지 업로드 기능 개선** - 최대 5장 이미지 제한, 자동 창 닫기, 세션 기반 인증으로 업로드 문제 해결
- **June 27, 2025**: **데이터 가져오기 기능 완전 제거** - 관리자 패널과 예중/예고 입시 섹션에서 모든 데이터 가져오기 버튼 및 기능 삭제
- **June 27, 2025**: **관리자 패널 개선** - 로드맵 관리를 별도 서브페이지로 분리, 관리자 패널에 로드맵 관리 버튼 추가
- **June 27, 2025**: **상세 페이지 UI 개선** - 닫기 버튼(X) 추가, 공유 버튼을 헤더 영역으로 이동, 레이아웃 정리
- **June 27, 2025**: **댓글 시스템 UI 개선** - 익명 댓글 시스템으로 단순화, 댓글 등록 버튼 회색 10% 스타일링, 공유 기능 완전 제거
- **June 27, 2025**: **댓글 시스템 완료** - 예중/예고 입시정보 상세 페이지에 댓글 작성, 조회, 삭제 기능 추가 및 소셜 공유 기능 구현
- **June 27, 2025**: **UI 개선 완료** - 예중/예고 입시정보 상세 페이지에 이전글/다음글/목록 네비게이션 추가, 팝업에서 페이지 전환 방식으로 변경
- **June 27, 2025**: **상세 내용 강화** - 7개 예중입시정보 게시글에 전문적이고 상세한 실제 내용 추가 (출제문제 분석, 실기대회 정보, 합격 현황 등)
- **June 26, 2025**: **실제 웹사이트 크롤링 성공** - https://lncart.modoo.at/?link=0stkad99&page=3 에서 7개의 진짜 예중입시정보 게시글 크롤링 완료
- **June 26, 2025**: **실제 데이터 확보** - 선화예중 관련 출제문제, 실기대회, 합격정보 등 실제 게시글 데이터베이스 저장
- **June 26, 2025**: Created direct data population scripts to bypass authentication issues and ensure immediate data availability
- **June 26, 2025**: Updated directions page with accurate Naver Map integration for 선과색미술학원 location
- **June 26, 2025**: **CRITICAL ISSUE RESOLVED** - Completely removed all sample/hardcoded data from entrance exam information pages
- **June 26, 2025**: Fixed middle-school.tsx and high-school.tsx pages to show empty state instead of fake announcements
- **June 26, 2025**: Enhanced rich text editor with font size controls, line spacing options, and video embedding capabilities for notices, gallery, and roadmap content
- **June 26, 2025**: **CRITICAL FIX** - Switched from in-memory storage to PostgreSQL database for persistent data storage
- **June 26, 2025**: Fixed notice popup functionality with proper template literal syntax  
- **June 26, 2025**: Added comprehensive database storage layer with automatic sample data initialization
- **June 26, 2025**: Added roadmap functionality with homepage buttons for 예중/예고 입시로드맵
- **June 26, 2025**: Created dedicated roadmap pages with rich content and file attachment support
- **June 26, 2025**: Converted entrance exam information pages to file attachment format
- **June 26, 2025**: Enhanced content management with roadmap editing in admin panel
- **June 26, 2025**: Enhanced content management with rich text editor and file attachments
- **June 26, 2025**: Added TipTap rich text editor with image embedding and formatting tools
- **June 26, 2025**: Implemented file upload system supporting PDF, JPG, HWP, and various formats
- **June 26, 2025**: Extended attachment functionality to notices and gallery items
- **June 26, 2025**: Added single admin authentication system with session management
- **December 25, 2025**: Added PostgreSQL database integration with Drizzle ORM
- **December 25, 2025**: Implemented admin panel with content management for notices and gallery
- **December 25, 2025**: Updated all sub-pages with academy signage hero images
- **December 25, 2025**: Added entrance exam information pages (예중/예고 입시정보)
- **December 25, 2025**: Applied academy contact information and address updates
- **December 25, 2025**: Integrated YouTube background video on homepage
- **June 24, 2025**: Initial setup

## User Preferences

```
Preferred communication style: Simple, everyday language.
```