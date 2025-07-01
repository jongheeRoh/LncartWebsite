# Vercel 환경 변수 설정 가이드

## 1단계: Vercel 대시보드 접속
1. https://vercel.com 접속 후 GitHub로 로그인
2. 프로젝트 목록에서 `LncartWebsite` 선택
3. "Settings" 탭 클릭

## 2단계: 환경 변수 추가
"Settings" → "Environment Variables"에서 다음 변수들을 추가:

### 필수 환경 변수:
```
NODE_ENV = production
SESSION_SECRET = line2024-art-academy-secret-key
```

### 데이터베이스 변수 (PostgreSQL 필요):
```
DATABASE_URL = postgresql://username:password@host:port/database
PGHOST = your-postgres-host
PGPORT = 5432
PGUSER = your-username  
PGPASSWORD = your-password
PGDATABASE = your-database-name
```

## 3단계: 배포 확인
1. 환경 변수 설정 후 "Redeploy" 클릭
2. 배포 로그에서 오류 확인
3. 배포 완료 후 도메인 접속 테스트

## 중요사항
- PostgreSQL 데이터베이스가 반드시 필요합니다
- 관리자 계정: admin / line2024!
- 첫 접속 시 샘플 데이터가 자동 생성됩니다

## 무료 PostgreSQL 옵션
1. **Neon** (추천): https://neon.tech
2. **Supabase**: https://supabase.com  
3. **Railway**: https://railway.app