# GitHub 업로드 및 Vercel 배포 가이드

## 1단계: 압축 파일 다운로드
파일 탐색기에서 `lncart-website-complete.tar.gz` 파일을 오른쪽 클릭 → Download

## 2단계: 압축 파일 해제
다운로드한 파일을 압축 해제하여 프로젝트 폴더 생성

## 3단계: GitHub 저장소에 업로드
1. https://github.com/jongheeRoh/LncartWebsite 접속
2. "Add file" → "Upload files" 클릭
3. 압축 해제한 모든 파일과 폴더를 드래그 앤 드롭
4. Commit message: "Complete art academy website deployment"
5. "Commit changes" 클릭

## 4단계: Vercel에서 자동 배포
1. https://vercel.com 접속 후 GitHub로 로그인
2. "Import Project" → GitHub 저장소 선택
3. 환경 변수 설정:
   - `NODE_ENV`: production
   - `SESSION_SECRET`: line2024-art-academy-secret-key
   - `DATABASE_URL`: (PostgreSQL 연결 문자열)
4. "Deploy" 클릭

## 5단계: 도메인 확인
배포 완료 후 Vercel에서 제공하는 `.vercel.app` 도메인으로 사이트 접속

## 중요사항
- PostgreSQL 데이터베이스 연결이 필요합니다
- 모든 환경 변수가 올바로 설정되어야 합니다
- 첫 배포 후 관리자 계정으로 로그인하여 데이터 확인