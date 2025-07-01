import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertNoticeSchema, type InsertNotice } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import CKEditorRichTextEditor from "@/components/ui/ckeditor-rich-text-editor";
import FileUpload, { type FileAttachment } from "@/components/ui/file-upload";
// Dialog components removed - using Card layout instead
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { NOTICE_CATEGORIES } from "@/lib/types";

interface NoticeFormProps {
  onSuccess?: () => void;
  notice?: any;
}

export default function NoticeForm({ onSuccess, notice }: NoticeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<FileAttachment[]>(notice?.attachments || []);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertNotice>({
    resolver: zodResolver(insertNoticeSchema),
    defaultValues: {
      title: notice?.title || "",
      content: notice?.content || "",
      excerpt: notice?.excerpt || "",
      category: notice?.category || "일반",
    },
  });

  const createNoticeMutation = useMutation({
    mutationFn: async (data: InsertNotice) => {
      const sessionId = localStorage.getItem('adminSessionId');
      const response = await fetch("/api/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionId}`
        },
        body: JSON.stringify({ ...data, attachments }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${response.status}: ${errorText}`);
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notices"] });
      toast({
        title: "성공",
        description: "공지사항이 성공적으로 작성되었습니다.",
      });
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "오류",
        description: "공지사항 작성에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const updateNoticeMutation = useMutation({
    mutationFn: async (data: InsertNotice) => {
      if (!notice?.id) {
        throw new Error('Notice ID is required for update');
      }
      
      const sessionId = localStorage.getItem('adminSessionId');
      const response = await fetch(`/api/notices/${notice.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionId}`
        },
        body: JSON.stringify({ ...data, attachments }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${response.status}: ${errorText}`);
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notices"] });
      toast({
        title: "성공",
        description: "공지사항이 성공적으로 수정되었습니다.",
      });
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "오류",
        description: "공지사항 수정에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: InsertNotice) => {
    setIsSubmitting(true);
    try {
      const noticeData = {
        ...data,
        attachments
      };
      
      if (notice?.id && typeof notice.id === 'number') {
        await updateNoticeMutation.mutateAsync(noticeData);
      } else {
        await createNoticeMutation.mutateAsync(noticeData);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    {NOTICE_CATEGORIES.slice(1).map((category) => (
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
                  <Input placeholder="공지사항 제목을 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>요약</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="공지사항 요약을 입력하세요"
                    className="resize-none"
                    rows={2}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>내용</FormLabel>
                <FormControl>
                  <CKEditorRichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="공지사항 내용을 입력하세요. 이미지와 링크를 추가할 수 있습니다."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              첨부파일
            </label>
            <FileUpload
              files={attachments}
              onChange={setAttachments}
              maxFiles={5}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onSuccess}>
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "저장 중..." : "저장"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
