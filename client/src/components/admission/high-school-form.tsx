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
import type { HighSchoolAdmission, InsertHighSchoolAdmission } from "@shared/schema";

interface HighSchoolFormProps {
  admission?: HighSchoolAdmission;
  onSuccess?: () => void;
}

export function HighSchoolAdmissionForm({ admission, onSuccess }: HighSchoolFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [content, setContent] = useState(admission?.content || "");
  const [attachments, setAttachments] = useState<any[]>(() => 
    Array.isArray(admission?.attachments) ? admission.attachments : []
  );
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<InsertHighSchoolAdmission>({
    defaultValues: {
      title: admission?.title || "",
      excerpt: admission?.excerpt || "",
      category: admission?.category || "예고입시정보",
      attachments: Array.isArray(admission?.attachments) ? admission.attachments : [],
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertHighSchoolAdmission) => {
      const url = admission
        ? `/api/high-school-admission/${admission.id}`
        : "/api/high-school-admission";
      const method = admission ? "PUT" : "POST";
      
      const response = await apiRequest(url, method, { ...data, content });
      return await response.json();
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

      {/* 첨부파일 업로드 섹션 */}
      <div className="space-y-2">
        <Label>첨부파일</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div className="text-center">
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <div className="text-sm text-gray-600 mb-2">
              파일을 선택하거나 드래그하여 업로드하세요
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? "업로드 중..." : "파일 선택"}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.hwp,.jpg,.jpeg,.png,.gif"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* 업로드된 파일 목록 */}
        {attachments.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">업로드된 파일</Label>
            <div className="space-y-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{file.originalName}</span>
                    <span className="text-xs text-gray-500">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAttachment(index)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
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