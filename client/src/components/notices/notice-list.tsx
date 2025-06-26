import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import NoticeForm from "./notice-form";
import { Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Notice } from "@shared/schema";

interface NoticeListProps {
  notices: Notice[];
  isLoading: boolean;
  onNoticeUpdated?: () => void;
  onNoticeDeleted?: () => void;
}

export default function NoticeList({ notices, isLoading, onNoticeUpdated, onNoticeDeleted }: NoticeListProps) {
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteNoticeMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/notices/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notices"] });
      toast({
        title: "성공",
        description: "공지사항이 삭제되었습니다.",
      });
      onNoticeDeleted?.();
    },
    onError: () => {
      toast({
        title: "오류",
        description: "공지사항 삭제에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "긴급":
        return "bg-red-100 text-red-800";
      case "이벤트":
        return "bg-green-100 text-green-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('ko-KR');
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (notices.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-slate-500 text-lg">등록된 공지사항이 없습니다.</p>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {notices.map((notice) => (
          <Card key={notice.id} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getCategoryColor(notice.category)}>
                      {notice.category}
                    </Badge>
                    <span className="text-slate-500 text-sm">
                      {formatDate(notice.createdAt)}
                    </span>
                  </div>
                  <div 
                    onClick={async () => {
                      try {
                        const response = await fetch(`/api/notices/${notice.id}`);
                        if (!response.ok) throw new Error('Failed to fetch notice');
                        const fullNotice = await response.json();
                        
                        const popup = window.open('', '_blank', 'width=900,height=700,scrollbars=yes,resizable=yes');
                        if (popup) {
                          const content = fullNotice.content || '내용이 없습니다.';
                          const title = fullNotice.title || '제목 없음';
                          const category = fullNotice.category || '일반';
                          const date = new Date(fullNotice.createdAt).toLocaleDateString('ko-KR');
                          
                          popup.document.write(`
                            <!DOCTYPE html>
                            <html lang="ko">
                              <head>
                                <meta charset="utf-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1">
                                <title>${title} - 선과색미술학원</title>
                                <style>
                                  body { 
                                    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                                    max-width: 800px;
                                    margin: 0 auto;
                                    padding: 20px;
                                    line-height: 1.6;
                                    color: #333;
                                    background: #f9f9f9;
                                  }
                                  .container {
                                    background: white;
                                    border-radius: 8px;
                                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                                    overflow: hidden;
                                  }
                                  .header {
                                    background: linear-gradient(135deg, #ff6b35, #f7931e);
                                    color: white;
                                    padding: 30px;
                                    text-align: center;
                                  }
                                  .title {
                                    font-size: 24px;
                                    font-weight: bold;
                                    margin-bottom: 10px;
                                  }
                                  .meta {
                                    font-size: 14px;
                                    opacity: 0.9;
                                  }
                                  .category {
                                    background: rgba(255,255,255,0.2);
                                    padding: 4px 8px;
                                    border-radius: 12px;
                                    font-size: 12px;
                                    margin-right: 10px;
                                  }
                                  .content {
                                    padding: 30px;
                                    font-size: 16px;
                                    line-height: 1.7;
                                  }
                                  .content p { margin-bottom: 16px; }
                                  .content h1, .content h2, .content h3 { 
                                    color: #2d3748; 
                                    margin: 20px 0 10px 0;
                                  }
                                  .content img { 
                                    max-width: 100%; 
                                    height: auto; 
                                    margin: 20px 0;
                                    border-radius: 4px;
                                  }
                                  .footer {
                                    padding: 20px;
                                    background: #f8f9fa;
                                    text-align: center;
                                    color: #666;
                                    font-size: 14px;
                                    border-top: 1px solid #eee;
                                  }
                                </style>
                              </head>
                              <body>
                                <div class="container">
                                  <div class="header">
                                    <div class="title">${title}</div>
                                    <div class="meta">
                                      <span class="category">${category}</span>
                                      ${date}
                                    </div>
                                  </div>
                                  <div class="content">
                                    ${content}
                                  </div>
                                  <div class="footer">
                                    선과색미술학원 | 서울특별시 광진구 천호대로 677 | 02-453-2379
                                  </div>
                                </div>
                              </body>
                            </html>
                          `);
                          popup.document.close();
                          popup.focus();
                        }
                      } catch (error) {
                        console.error('Error loading notice:', error);
                        alert('공지사항을 불러오는데 실패했습니다.');
                      }
                    }}
                    className="text-lg font-semibold text-slate-900 mb-2 hover:text-primary cursor-pointer block transition-colors"
                  >
                    {notice.title}
                  </div>
                  <p className="text-slate-600 line-clamp-2">
                    {notice.content ? notice.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : '내용 없음'}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingNotice(notice)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>공지사항 삭제</AlertDialogTitle>
                        <AlertDialogDescription>
                          이 공지사항을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>취소</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteNoticeMutation.mutate(notice.id)}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          삭제
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!editingNotice} onOpenChange={() => setEditingNotice(null)}>
        <DialogContent className="max-w-2xl">
          {editingNotice && (
            <NoticeForm
              notice={editingNotice}
              onSuccess={() => {
                setEditingNotice(null);
                onNoticeUpdated?.();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
