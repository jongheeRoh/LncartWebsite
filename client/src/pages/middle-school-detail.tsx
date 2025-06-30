import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, List, Calendar, Eye, Paperclip } from "lucide-react";
import type { MiddleSchoolAdmission } from "@shared/schema";
import CommentSection from "@/components/comments/comment-section";
import { convertYouTubeUrlsToIframes } from "@/lib/video-converter";
import { useEffect } from "react";

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

  // 조회수 증가
  useEffect(() => {
    if (admission?.id) {
      fetch(`/api/middle-school-admission/${admission.id}/increment-views`, {
        method: 'POST',
      }).catch(error => {
        console.error('Failed to increment views:', error);
      });
    }
  }, [admission?.id]);

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
                <div className="flex items-center gap-4 text-sm opacity-90">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(admission.createdAt)}
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    {admission.views || 0}
                  </div>
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

              {/* 첨부파일 */}
              {admission.attachments && Array.isArray(admission.attachments) && admission.attachments.length > 0 ? (
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Paperclip className="h-5 w-5 mr-2" />
                    첨부파일
                  </h3>
                  <div className="space-y-2">
                    {(admission.attachments as any[]).map((file: any, index: number) => (
                      <div key={index} className="flex items-center p-3 bg-white rounded border">
                        <div className="flex items-center flex-1">
                          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                            <Paperclip className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.originalName}</p>
                            <p className="text-xs text-gray-500">
                              {file.size ? `${(file.size / 1024).toFixed(1)} KB` : ''}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(file.url || `/uploads/${file.id}`, '_blank')}
                          className="ml-4"
                        >
                          다운로드
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Navigation Footer */}
          <div className="mt-8">
            <div className="flex justify-center items-center gap-4">
              <Button
                variant="outline"
                onClick={() => prevAdmission ? setLocation(`/middle-school/${prevAdmission.id}`) : undefined}
                disabled={!prevAdmission}
                className="flex items-center gap-2 px-4 py-2"
              >
                <ChevronLeft className="h-4 w-4" />
                이전글
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setLocation("/middle-school")}
                className="flex items-center gap-2 px-6 py-2"
              >
                <List className="h-4 w-4" />
                리스트
              </Button>
              
              <Button
                variant="outline"
                onClick={() => nextAdmission ? setLocation(`/middle-school/${nextAdmission.id}`) : undefined}
                disabled={!nextAdmission}
                className="flex items-center gap-2 px-4 py-2"
              >
                다음글
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
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