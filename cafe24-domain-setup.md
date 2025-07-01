# Cafe24 도메인을 Vercel에 연결하는 방법

## 1단계: Vercel에서 도메인 추가
1. Vercel 프로젝트 대시보드 → "Settings" → "Domains"
2. 도메인 입력 (예: yourdomain.co.kr)
3. "Add" 클릭

## 2단계: Vercel DNS 설정 확인
Vercel에서 제공하는 네임서버 또는 DNS 레코드 확인:

### 옵션 1: 네임서버 방식 (권장)
Vercel 네임서버:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### 옵션 2: DNS 레코드 방식
A 레코드:
```
76.76.19.61
```

CNAME 레코드:
```
cname.vercel-dns.com
```

## 3단계: Cafe24에서 네임서버 변경
1. Cafe24 도메인 관리 페이지 접속
2. "네임서버 설정" 또는 "DNS 설정" 메뉴
3. 네임서버를 다음으로 변경:
   - 주 네임서버: ns1.vercel-dns.com
   - 보조 네임서버: ns2.vercel-dns.com

## 4단계: 전파 대기
- DNS 전파에 24-48시간 소요
- 확인 방법: nslookup yourdomain.co.kr

## 주의사항
- 네임서버 변경 시 기존 이메일, 서브도메인 설정이 초기화될 수 있습니다
- 백업 또는 확인 후 진행하세요