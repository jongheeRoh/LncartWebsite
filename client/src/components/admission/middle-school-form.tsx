import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CKEditorRichTextEditor from "@/components/ui/ckeditor-rich-text-editor";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { MiddleSchoolAdmission, InsertMiddleSchoolAdmission } from "@shared/schema";

interface MiddleSchoolFormProps {
  admission?: MiddleSchoolAdmission;
  onSuccess?: () => void;
}

export function MiddleSchoolAdmissionForm({ admission, onSuccess }: MiddleSchoolFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [content, setContent] = useState(admission?.content || "");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<InsertMiddleSchoolAdmission>({
    defaultValues: {
      title: admission?.title || "",
      excerpt: admission?.excerpt || "",
      category: admission?.category || "예중입시정보",
      attachments: admission?.attachments || [],
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertMiddleSchoolAdmission) => {
      try {
        const response = await apiRequest("/api/middle-school-admission", "POST", { ...data, content });
        return await response.json();
      } catch (error) {
        console.error("API request failed:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      try {
        toast({
          title: "성공",
          description: "예중 입시정보가 생성되었습니다.",
        });
        queryClient.invalidateQueries({ queryKey: ["/api/middle-school-admission"] });
        reset();
        setContent("");
        // 안전한 콜백 호출
        if (onSuccess && typeof onSuccess === 'function') {
          setTimeout(() => {
            try {
              onSuccess();
            } catch (callbackError) {
              console.error("Callback error:", callbackError);
            }
          }, 100);
        }
      } catch (error) {
        console.error("Success handler error:", error);
      }
    },
    onError: (error: any) => {
      try {
        console.error("Middle school admission creation error:", error);
        const errorMessage = error?.message || "예중 입시정보 생성에 실패했습니다.";
        toast({
          title: "오류",
          description: errorMessage,
          variant: "destructive",
        });
      } catch (toastError) {
        console.error("Toast error:", toastError);
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: InsertMiddleSchoolAdmission) => {
      try {
        const response = await apiRequest(`/api/middle-school-admission/${admission!.id}`, "PUT", { ...data, content });
        return await response.json();
      } catch (error) {
        console.error("API update request failed:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      try {
        toast({
          title: "성공",
          description: `예중 입시정보가 ${admission ? "수정" : "생성"}되었습니다.`,
        });
        queryClient.invalidateQueries({ queryKey: ["/api/middle-school-admission"] });
        if (!admission) {
          reset();
          setContent("");
        }
        // 안전한 콜백 호출
        if (onSuccess && typeof onSuccess === 'function') {
          setTimeout(() => {
            try {
              onSuccess();
            } catch (callbackError) {
              console.error("Update callback error:", callbackError);
            }
          }, 100);
        }
      } catch (error) {
        console.error("Update success handler error:", error);
      }
    },
    onError: (error: any) => {
      try {
        console.error("Middle school admission update error:", error);
        const errorMessage = error?.message || `예중 입시정보 ${admission ? "수정" : "생성"}에 실패했습니다.`;
        toast({
          title: "오류", 
          description: errorMessage,
          variant: "destructive",
        });
      } catch (toastError) {
        console.error("Update toast error:", toastError);
      }
    },
  });

  const onSubmit = useCallback((data: InsertMiddleSchoolAdmission) => {
    try {
      if (!content.trim()) {
        toast({
          title: "오류",
          description: "내용을 입력해주세요.",
          variant: "destructive",
        });
        return;
      }
      
      if (admission) {
        updateMutation.mutate(data);
      } else {
        createMutation.mutate(data);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "오류",
        description: "폼 제출 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  }, [content, admission, updateMutation, createMutation, toast]);

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
        <CKEditorRichTextEditor
          value={content}
          onChange={setContent}
          placeholder="입시정보 내용을 작성하세요..."
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
          {(createMutation.isPending || updateMutation.isPending)
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