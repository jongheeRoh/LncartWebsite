import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import ImageUpload from "./image-upload";
import { Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { GalleryItem } from "@shared/schema";

interface GalleryGridProps {
  items: GalleryItem[];
  isLoading: boolean;
  onImageUpdated?: () => void;
  onImageDeleted?: () => void;
}

export default function GalleryGrid({ items, isLoading, onImageUpdated, onImageDeleted }: GalleryGridProps) {
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [viewingItem, setViewingItem] = useState<GalleryItem | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteItemMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/gallery/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({
        title: "성공",
        description: "이미지가 삭제되었습니다.",
      });
      onImageDeleted?.();
    },
    onError: () => {
      toast({
        title: "오류",
        description: "이미지 삭제에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('ko-KR');
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <div className="aspect-square">
              <Skeleton className="w-full h-full rounded-t-lg" />
            </div>
            <CardContent className="p-4">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-3" />
              <div className="flex justify-between">
                <Skeleton className="h-3 w-16" />
                <div className="flex gap-1">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-slate-500 text-lg">등록된 이미지가 없습니다.</p>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="group relative overflow-hidden card-hover">
            <div className="aspect-square overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=500&fit=crop`;
                }}
              />
            </div>
            <CardContent className="p-4">
              <h4 className="font-semibold text-slate-900 mb-1 truncate">
                {item.title}
              </h4>
              <p className="text-sm text-slate-600 line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-slate-500">
                  {formatDate(item.createdAt)}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingItem(item)}
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
                        <AlertDialogTitle>이미지 삭제</AlertDialogTitle>
                        <AlertDialogDescription>
                          이 이미지를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>취소</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteItemMutation.mutate(item.id)}
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
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button
                onClick={() => setViewingItem(item)}
                className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform"
              >
                <Eye className="mr-2 h-4 w-4" />
                보기
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent className="max-w-2xl">
          {editingItem && (
            <ImageUpload
              item={editingItem}
              onSuccess={() => {
                setEditingItem(null);
                onImageUpdated?.();
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={!!viewingItem} onOpenChange={() => setViewingItem(null)}>
        <DialogContent className="max-w-4xl">
          {viewingItem && (
            <div className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={viewingItem.imageUrl}
                  alt={viewingItem.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{viewingItem.title}</h3>
                <p className="text-slate-600 mb-4">{viewingItem.description}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span>카테고리: {viewingItem.category}</span>
                  <span>업로드일: {formatDate(viewingItem.createdAt)}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
