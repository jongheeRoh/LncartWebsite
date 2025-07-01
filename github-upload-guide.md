# GitHub을 통한 Vercel 자동 배포 가이드

## 현재 상태
- ✅ 공지사항 고정 기능 완료 
- ✅ PostgreSQL 데이터베이스 연결 정상
- ✅ 관리자 CMS 시스템 완성
- ✅ Vercel 배포 설정 최적화 완료

## 배포 방법

### 1단계: GitHub 저장소 준비
1. https://github.com/jongheeRoh/LncartWebsite 접속
2. 기존 파일들 백업 후 새 버전으로 교체

### 2단계: Vercel 자동 배포 설정
1. https://vercel.com 접속 → GitHub로 로그인
2. "Import Project" → GitHub 저장소 선택
3. 프레임워크 프리셋: "Other" 선택
4. Build Command: `npm run build`
5. Output Directory: `dist/public`

### 3단계: 환경 변수 설정
Vercel 대시보드 → Settings → Environment Variables:
```
NODE_ENV=production
SESSION_SECRET=line2024-art-academy-secret-key
DATABASE_URL=(PostgreSQL 연결 문자열)
```

### 4단계: 배포 실행
"Deploy" 클릭하면 GitHub 연동을 통해 자동 빌드 및 배포

## 데이터 지속성 보장
- PostgreSQL 데이터베이스는 독립적으로 운영
- 기존 데이터 (공지사항, 갤러리, 입시정보) 모두 유지
- 관리자 계정 (admin/line2024!) 그대로 사용 가능

## 주요 기능 확인 리스트
- [ ] 홈페이지 로딩
- [ ] 관리자 로그인 (admin/line2024!)
- [ ] 공지사항 고정 기능
- [ ] CKEditor 글 작성
- [ ] 이미지 업로드
- [ ] 데이터베이스 저장 확인