import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import heroImage from "@assets/스크린샷 2025-06-25 222106_1750857872681.png";

interface Notice {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function HighSchoolEntrance() {
  const { data: noticesData, isLoading } = useQuery({
    queryKey: ['/api/notices', { category: '예고입시정보' }],
    queryFn: async () => {
      const response = await fetch(`/api/notices?category=${encodeURIComponent('예고입시정보')}`);
      if (!response.ok) throw new Error('Failed to fetch notices');
      return response.json();
    },
  });

  const notices = noticesData?.notices || [];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative text-white py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="선과색 미술학원 간판" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">예고 입시정보</h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto drop-shadow-lg">
              예술고등학교 입시를 위한 전문적이고 체계적인 준비과정
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 최신 입시정보 섹션 */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">최신 입시정보</h2>
            <p className="text-lg text-gray-600">
              예술고등학교 입시에 대한 최신 정보를 확인하세요
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">로딩 중...</p>
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">아직 등록된 입시정보가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notices.map((notice: Notice) => (
                <Card key={notice.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{notice.title}</CardTitle>
                    <CardDescription className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(notice.createdAt).toLocaleDateString('ko-KR')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {notice.viewCount || 0}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {notice.excerpt || notice.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...'}
                    </p>
                    <Link href={`/notice/${notice.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        자세히 보기
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}