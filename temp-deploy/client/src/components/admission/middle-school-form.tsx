import { useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CKEditorRichTextEditor from "@/components/ui/ckeditor-rich-text-editor";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Upload, X, FileText } from "lucide-react";
import type { MiddleSchoolAdmission, InsertMiddleSchoolAdmission } from "@shared/schema";

interface MiddleSchoolFormProps {
  admission?: MiddleSchoolAdmission;
  onSuccess?: () => void;
}

export function MiddleSchoolAdmissionForm({ admission, onSuccess }: MiddleSchoolFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [content, setContent] = useState(admission?.content || "");
  const [attachments, setAttachments] = useState<any[]>(() => 
    Array.isArray(admission?.attachments) ? admission.attachments : []
  );
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<InsertMiddleSchoolAdmission>({
    defaultValues: {
      title: admission?.title || "",
      excerpt: admission?.excerpt || "",
      category: admission?.category || "예중입시정보",
      attachments: Array.isArray(admission?.attachments) ? admission.attachments : [],
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertMiddleSchoolAdmission) => {
      try {
        return await apiRequest("/api/middle-school-admission", "POST", { ...data, content });
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
        return await apiRequest(`/api/middle-school-admission/${admission!.id}`, "PUT", { ...data, content });
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

  // 파일 업로드 핸들러
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('파일 업로드에 실패했습니다.');
        }

        return await response.json();
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      const newAttachments = [...attachments, ...uploadedFiles];
      setAttachments(newAttachments);
      setValue('attachments', newAttachments);

      toast({
        title: "성공",
        description: `${uploadedFiles.length}개 파일이 업로드되었습니다.`,
      });
    } catch (error) {
      console.error('File upload error:', error);
      toast({
        title: "오류",
        description: "파일 업로드에 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [attachments, setValue, toast]);

  // 첨부파일 제거 핸들러
  const removeAttachment = useCallback((index: number) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
    setValue('attachments', newAttachments);
  }, [attachments, setValue]);

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

      {/* 첨부파일 업로드 */}
      <div className="space-y-2">
        <Label>첨부파일</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.doc,.docx,.hwp,.jpg,.jpeg,.png,.gif"
          />
          
          <div className="text-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="mb-2"
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? "업로드 중..." : "파일 선택"}
            </Button>
            <p className="text-sm text-gray-500">
              PDF, DOC, HWP, 이미지 파일을 선택하세요
            </p>
          </div>

          {/* 첨부파일 목록 */}
          {attachments.length > 0 && (
            <div className="mt-4 space-y-2">
              <Label className="text-sm font-medium">첨부된 파일:</Label>
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-sm">{file.originalName}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAttachment(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
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