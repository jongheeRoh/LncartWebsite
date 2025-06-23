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
                  <h4 className="text-lg font-semibold text-slate-900 mb-2 hover:text-primary cursor-pointer">
                    {notice.title}
                  </h4>
                  <p className="text-slate-600 line-clamp-2">
                    {notice.excerpt}
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
