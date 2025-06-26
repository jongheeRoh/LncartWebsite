import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedRichTextEditor } from "@/components/ui/enhanced-rich-text-editor";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { HighSchoolAdmission, InsertHighSchoolAdmission } from "@shared/schema";

interface HighSchoolFormProps {
  admission?: HighSchoolAdmission;
  onSuccess?: () => void;
}

export function HighSchoolAdmissionForm({ admission, onSuccess }: HighSchoolFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [content, setContent] = useState(admission?.content || "");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<InsertHighSchoolAdmission>({
    defaultValues: {
      title: admission?.title || "",
      excerpt: admission?.excerpt || "",
      category: admission?.category || "예고입시정보",
      attachments: admission?.attachments || [],
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertHighSchoolAdmission) => {
      const url = admission
        ? `/api/high-school-admission/${admission.id}`
        : "/api/high-school-admission";
      const method = admission ? "PUT" : "POST";
      
      return await apiRequest(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, content }),
      });
    },
    onSuccess: () => {
      toast({
        title: "성공",
        description: `예고 입시정보가 ${admission ? "수정" : "생성"}되었습니다.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/high-school-admission"] });
      if (!admission) {
        reset();
        setContent("");
      }
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "오류",
        description: `예고 입시정보 ${admission ? "수정" : "생성"}에 실패했습니다.`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertHighSchoolAdmission) => {
    if (!content.trim()) {
      toast({
        title: "오류",
        description: "내용을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          {...register("title", { required: "제목을 입력해주세요" })}
          placeholder="입시정보 제목을 입력하세요"
        />
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">요약</Label>
        <Input
          id="excerpt"
          {...register("excerpt")}
          placeholder="입시정보 요약을 입력하세요"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">내용</Label>
        <EnhancedRichTextEditor
          content={content}
          onChange={setContent}
          placeholder="입시정보 내용을 작성하세요..."
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending
            ? admission
              ? "수정 중..."
              : "생성 중..."
            : admission
            ? "수정하기"
            : "생성하기"}
        </Button>
      </div>
    </form>
  );
}