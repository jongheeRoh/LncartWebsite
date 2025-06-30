import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Download, FileText, ChevronLeft, ChevronRight, List } from "lucide-react";
import { Link } from "wouter";
import type { Notice } from "@shared/schema";
import { convertYouTubeUrlsToIframes } from "@/lib/video-converter";
interface FileAttachment {
  id: string;
  originalName: string;
  filename: string;
  mimetype: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

export default function NoticeDetail() {
  const [match, params] = useRoute("/notices/:id");
  const noticeId = params?.id;

  const { data: notice, isLoading } = useQuery<Notice>({
    queryKey: ["/api/notices", noticeId],
    queryFn: async () => {
      const response = await fetch(`/api/notices/${noticeId}`);
      if (!response.ok) throw new Error("Failed to fetch notice");
      return response.json();
    },
    enabled: !!noticeId,
  });

  const { data: allNotices } = useQuery({
    queryKey: ['/api/notices'],
    queryFn: async () => {
      const response = await fetch('/api/notices?page=1&limit=100');
      if (!response.ok) throw new Error("Failed to fetch notices");
      return response.json();
    },
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "긴급":
        return "destructive";
      case "이벤트":
        return "secondary";
      default:
        return "default";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-slate-600">공지사항을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">공지사항을 찾을 수 없습니다</h1>
          <Link href="/notices">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              공지사항 목록으로
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/notices">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              목록으로 돌아가기
            </Button>
          </Link>
        </div>

        {/* Notice Content */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <CardTitle className="text-2xl">{notice.title}</CardTitle>
                  <Badge variant={getCategoryColor(notice.category)}>
                    {notice.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(notice.createdAt).toLocaleDateString('ko-KR')}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {notice.content && (
              <div 
                className="prose max-w-none video-content"
                dangerouslySetInnerHTML={{ 
                  __html: convertYouTubeUrlsToIframes(notice.content) 
                }}
              />
            )}
            
            {/* File Attachments */}
            {notice.attachments && Array.isArray(notice.attachments) && notice.attachments.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  첨부 파일
                </h3>
                <div className="space-y-3">
                  {(notice.attachments as FileAttachment[]).map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-slate-600" />
                        <div>
                          <p className="font-medium text-slate-900">{file.originalName}</p>
                          <p className="text-sm text-slate-600">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(file.url, '_blank')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        다운로드
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Footer */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex justify-center items-center gap-4">
                {(() => {
                  if (!allNotices?.notices) return null;
                  
                  const notices = allNotices.notices;
                  const currentIndex = notices.findIndex((n: Notice) => n.id === parseInt(noticeId!));
                  const prevNotice = currentIndex > 0 ? notices[currentIndex - 1] : null;
                  const nextNotice = currentIndex < notices.length - 1 ? notices[currentIndex + 1] : null;
                  
                  return (
                    <>
                      {prevNotice ? (
                        <Link href={`/notices/${prevNotice.id}`}>
                          <Button
                            variant="outline"
                            className="flex items-center gap-2 px-4 py-2"
                          >
                            <ChevronLeft className="h-4 w-4" />
                            이전글
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          variant="outline"
                          disabled
                          className="flex items-center gap-2 px-4 py-2 opacity-50"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          이전글
                        </Button>
                      )}
                      
                      <Link href="/notices">
                        <Button
                          variant="outline"
                          className="flex items-center gap-2 px-6 py-2"
                        >
                          <List className="h-4 w-4" />
                          리스트
                        </Button>
                      </Link>
                      
                      {nextNotice ? (
                        <Link href={`/notices/${nextNotice.id}`}>
                          <Button
                            variant="outline"
                            className="flex items-center gap-2 px-4 py-2"
                          >
                            다음글
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          variant="outline"
                          disabled
                          className="flex items-center gap-2 px-4 py-2 opacity-50"
                        >
                          다음글
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}