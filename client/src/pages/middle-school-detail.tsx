import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, List, Calendar } from "lucide-react";
import type { MiddleSchoolAdmission } from "@shared/schema";
import CommentSection from "@/components/comments/comment-section";
import { convertYouTubeUrlsToIframes } from "@/lib/video-converter";

export default function MiddleSchoolDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const { data: admission, isLoading } = useQuery<MiddleSchoolAdmission>({
    queryKey: [`/api/middle-school-admission/${id}`],
    queryFn: async () => {
      const response = await fetch(`/api/middle-school-admission/${id}`);
      if (!response.ok) throw new Error('Failed to fetch admission');
      return response.json();
    },
    enabled: !!id,
  });

  // 전체 목록을 가져와서 이전글/다음글 찾기
  const { data: allAdmissions } = useQuery<{ items: MiddleSchoolAdmission[], total: number }>({
    queryKey: ["/api/middle-school-admission"],
    queryFn: () => fetch("/api/middle-school-admission?limit=100").then(res => res.json()),
  });

  const formatDate = (date: string | Date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('ko-KR', {
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

  if (!admission) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-slate-500 text-lg mb-4">입시정보를 찾을 수 없습니다.</p>
          <Button onClick={() => setLocation("/middle-school")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            목록으로 돌아가기
          </Button>
        </Card>
      </div>
    );
  }

  const currentIndex = allAdmissions?.items?.findIndex((item: any) => item.id === admission.id) ?? -1;
  const prevAdmission = currentIndex > 0 && allAdmissions?.items ? allAdmissions.items[currentIndex - 1] : null;
  const nextAdmission = currentIndex >= 0 && currentIndex < ((allAdmissions?.items?.length ?? 0) - 1) && allAdmissions?.items ? allAdmissions.items[currentIndex + 1] : null;

  // Process video content
  const processedContent = admission.content ? convertYouTubeUrlsToIframes(admission.content) : '';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Bar */}
      <section className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setLocation("/middle-school")}
              className="flex items-center gap-2"
            >
              <List className="h-4 w-4" />
              목록보기
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => prevAdmission && setLocation(`/middle-school/${prevAdmission.id}`)}
                disabled={!prevAdmission}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                이전글
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => nextAdmission && setLocation(`/middle-school/${nextAdmission.id}`)}
                disabled={!nextAdmission}
                className="flex items-center gap-1"
              >
                다음글
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge 
                  variant="secondary" 
                  className="bg-white/20 text-white backdrop-blur-sm"
                >
                  {admission.category}
                </Badge>
                <div className="flex items-center text-sm opacity-90">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(admission.createdAt)}
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
                {admission.title}
              </h1>
            </div>

            {/* Content */}
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none video-content"
                style={{
                  lineHeight: '1.8',
                  fontSize: '16px',
                  color: '#334155'
                }}
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            </CardContent>
          </Card>

          {/* Navigation Footer */}
          <div className="mt-8 space-y-4">
            {nextAdmission && (
              <Card 
                className="p-4 cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-blue-500"
                onClick={() => setLocation(`/middle-school/${nextAdmission.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">다음글</p>
                    <p className="font-medium text-slate-900">{nextAdmission.title}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
              </Card>
            )}
            
            {prevAdmission && (
              <Card 
                className="p-4 cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-slate-300"
                onClick={() => setLocation(`/middle-school/${prevAdmission.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">이전글</p>
                    <p className="font-medium text-slate-900">{prevAdmission.title}</p>
                  </div>
                  <ChevronLeft className="h-5 w-5 text-slate-400" />
                </div>
              </Card>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="mt-8 text-center">
            <Button
              onClick={() => setLocation("/middle-school")}
              className="bg-primary hover:bg-primary/90"
            >
              <List className="h-4 w-4 mr-2" />
              목록으로 돌아가기
            </Button>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <CommentSection type="middle_school" postId={parseInt(id || "0")} />
        </div>
      </section>
    </div>
  );
}