import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, List, Calendar } from "lucide-react";
import type { Notice } from "@shared/schema";
import heroImage from "@assets/스크린샷 2025-06-25 222106_1750857872681.png";

export default function NoticeDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [prevNotice, setPrevNotice] = useState<Notice | null>(null);
  const [nextNotice, setNextNotice] = useState<Notice | null>(null);

  // Fetch current notice
  const { data: notice, isLoading } = useQuery<Notice>({
    queryKey: ["/api/notices", id],
    queryFn: async () => {
      const response = await fetch(`/api/notices/${id}`);
      if (!response.ok) throw new Error("Failed to fetch notice");
      return response.json();
    },
    enabled: !!id,
  });

  // Fetch all notices for navigation
  const { data: allNotices } = useQuery({
    queryKey: ["/api/notices/all"],
    queryFn: async () => {
      const response = await fetch("/api/notices?limit=100");
      if (!response.ok) throw new Error("Failed to fetch notices");
      return response.json();
    },
  });

  // Set prev/next notices
  useEffect(() => {
    if (allNotices?.notices && notice) {
      const currentIndex = allNotices.notices.findIndex((n: Notice) => n.id === notice.id);
      if (currentIndex > 0) {
        setNextNotice(allNotices.notices[currentIndex - 1]); // newer post
      } else {
        setNextNotice(null);
      }
      if (currentIndex < allNotices.notices.length - 1) {
        setPrevNotice(allNotices.notices[currentIndex + 1]); // older post
      } else {
        setPrevNotice(null);
      }
    }
  }, [allNotices, notice]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-slate-500 text-lg mb-4">공지사항을 찾을 수 없습니다.</p>
          <Button onClick={() => setLocation("/notices")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            목록으로 돌아가기
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative text-white py-12 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="선과색 미술학원 간판" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              공지사항
            </h1>
            <p className="text-lg opacity-90">
              {notice.title}
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Bar */}
      <section className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setLocation("/notices")}
              className="flex items-center gap-2"
            >
              <List className="h-4 w-4" />
              목록보기
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => prevNotice && setLocation(`/notices/${prevNotice.id}`)}
                disabled={!prevNotice}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                이전글
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => nextNotice && setLocation(`/notices/${nextNotice.id}`)}
                disabled={!nextNotice}
                className="flex items-center gap-1"
              >
                다음글
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge 
                  variant="secondary" 
                  className={`${
                    notice.category === '긴급' ? 'bg-red-500 text-white' :
                    notice.category === '이벤트' ? 'bg-blue-500 text-white' :
                    'bg-white/20 text-white backdrop-blur-sm'
                  }`}
                >
                  {notice.category}
                </Badge>
                <div className="flex items-center text-sm opacity-90">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(notice.createdAt)}
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
                {notice.title}
              </h1>
            </div>

            {/* Content */}
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: notice.content }}
                style={{
                  lineHeight: '1.8',
                  fontSize: '16px',
                  color: '#334155'
                }}
              />
            </CardContent>
          </Card>

          {/* Navigation Footer */}
          <div className="mt-8 space-y-4">
            {nextNotice && (
              <Card 
                className="p-4 cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-blue-500"
                onClick={() => setLocation(`/notices/${nextNotice.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">다음글</p>
                    <p className="font-medium text-slate-900">{nextNotice.title}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
              </Card>
            )}
            
            {prevNotice && (
              <Card 
                className="p-4 cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-slate-300"
                onClick={() => setLocation(`/notices/${prevNotice.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">이전글</p>
                    <p className="font-medium text-slate-900">{prevNotice.title}</p>
                  </div>
                  <ChevronLeft className="h-5 w-5 text-slate-400" />
                </div>
              </Card>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="mt-8 text-center">
            <Button
              onClick={() => setLocation("/notices")}
              className="bg-primary hover:bg-primary/90"
            >
              <List className="h-4 w-4 mr-2" />
              목록으로 돌아가기
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}