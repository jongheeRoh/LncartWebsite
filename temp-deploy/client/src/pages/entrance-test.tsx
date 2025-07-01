import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface Notice {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export default function EntranceTest() {
  const { data: middleSchoolData, isLoading: middleLoading } = useQuery({
    queryKey: ['/api/notices', { category: '예중입시정보' }],
    queryFn: async () => {
      console.log('Fetching 예중입시정보...');
      const response = await fetch(`/api/notices?category=${encodeURIComponent('예중입시정보')}`);
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      if (!response.ok) throw new Error('Failed to fetch notices');
      return data;
    },
  });

  const { data: highSchoolData, isLoading: highLoading } = useQuery({
    queryKey: ['/api/notices', { category: '예고입시정보' }],
    queryFn: async () => {
      console.log('Fetching 예고입시정보...');
      const response = await fetch(`/api/notices?category=${encodeURIComponent('예고입시정보')}`);
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      if (!response.ok) throw new Error('Failed to fetch notices');
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">입시정보 테스트</h1>
        
        {/* 예중입시정보 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">예중입시정보</h2>
          {middleLoading ? (
            <div>로딩 중...</div>
          ) : (
            <div>
              <p className="mb-4">총 {middleSchoolData?.total || 0}개의 글</p>
              <div className="grid gap-4">
                {middleSchoolData?.notices?.map((notice: Notice) => (
                  <Card key={notice.id}>
                    <CardHeader>
                      <CardTitle>{notice.title}</CardTitle>
                      <CardDescription>
                        카테고리: {notice.category} | 작성일: {new Date(notice.createdAt).toLocaleDateString('ko-KR')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{notice.excerpt || notice.content.replace(/<[^>]*>/g, '').substring(0, 100)}...</p>
                      <Link href={`/notice/${notice.id}`}>
                        <Button className="mt-2">상세보기</Button>
                      </Link>
                    </CardContent>
                  </Card>
                )) || <p>데이터가 없습니다.</p>}
              </div>
            </div>
          )}
        </div>

        {/* 예고입시정보 */}
        <div>
          <h2 className="text-2xl font-bold mb-6">예고입시정보</h2>
          {highLoading ? (
            <div>로딩 중...</div>
          ) : (
            <div>
              <p className="mb-4">총 {highSchoolData?.total || 0}개의 글</p>
              <div className="grid gap-4">
                {highSchoolData?.notices?.map((notice: Notice) => (
                  <Card key={notice.id}>
                    <CardHeader>
                      <CardTitle>{notice.title}</CardTitle>
                      <CardDescription>
                        카테고리: {notice.category} | 작성일: {new Date(notice.createdAt).toLocaleDateString('ko-KR')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{notice.excerpt || notice.content.replace(/<[^>]*>/g, '').substring(0, 100)}...</p>
                      <Link href={`/notice/${notice.id}`}>
                        <Button className="mt-2">상세보기</Button>
                      </Link>
                    </CardContent>
                  </Card>
                )) || <p>데이터가 없습니다.</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}