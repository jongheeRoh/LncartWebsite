import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertGalleryItemSchema, type InsertGalleryItem } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// Removed Dialog imports since we're using Card instead
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { GALLERY_CATEGORIES } from "@/lib/types";

interface ImageUploadProps {
  onSuccess?: () => void;
  item?: any;
}

export default function ImageUpload({ onSuccess, item }: ImageUploadProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertGalleryItem>({
    resolver: zodResolver(insertGalleryItemSchema),
    defaultValues: {
      title: item?.title || "",
      description: item?.description || "",
      imageUrl: item?.imageUrl || "",
      category: item?.category || "전체",
    },
  });

  const createItemMutation = useMutation({
    mutationFn: async (data: InsertGalleryItem) => {
      const response = await apiRequest("POST", "/api/gallery", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({
        title: "성공",
        description: "이미지가 성공적으로 업로드되었습니다.",
      });
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "오류",
        description: "이미지 업로드에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: async (data: InsertGalleryItem) => {
      const response = await apiRequest("PUT", `/api/gallery/${item.id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({
        title: "성공",
        description: "이미지가 성공적으로 수정되었습니다.",
      });
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "오류",
        description: "이미지 수정에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: InsertGalleryItem) => {
    setIsSubmitting(true);
    try {
      if (item) {
        await updateItemMutation.mutateAsync(data);
      } else {
        await createItemMutation.mutateAsync(data);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const imageUrl = form.watch("imageUrl");

  return (
    <div className="space-y-6">
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이미지 URL</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://example.com/image.jpg" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {imageUrl && (
            <div className="aspect-video overflow-hidden rounded-lg border">
              <img
                src={imageUrl}
                alt="미리보기"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>카테고리</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리를 선택하세요" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GALLERY_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>제목</FormLabel>
                <FormControl>
                  <Input placeholder="이미지 제목을 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>설명</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="이미지 설명을 입력하세요"
                    className="resize-none"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onSuccess}>
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "처리 중..." : item ? "수정" : "업로드"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
