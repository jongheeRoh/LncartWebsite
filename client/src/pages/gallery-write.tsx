import { useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CKEditorRichTextEditor from "@/components/ui/ckeditor-rich-text-editor";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, Upload, X, FileText } from "lucide-react";
import { Link, useLocation } from "wouter";
import { GALLERY_CATEGORIES } from "@/lib/types";
import type { InsertGalleryItem } from "@shared/schema";

export default function GalleryWrite() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<InsertGalleryItem>({
    defaultValues: {
      title: "",
      description: "",
      category: "학생작품",
      imageUrl: "",
      attachments: [],
    }
  });

  const selectedCategory = watch("category");

  const mutation = useMutation({
    mutationFn: async (data: InsertGalleryItem) => {
      return await apiRequest("/api/gallery", "POST", {
        ...data,
        description,
        attachments
      });
    },
    onSuccess: () => {
      toast({
        title: "성공",
        description: "작품이 성공적으로 등록되었습니다.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      reset();
      setDescription("");
      setAttachments([]);
      setLocation("/gallery");
    },
    onError: (error: any) => {
      console.error('Gallery creation error:', error);
      toast({
        title: "오류",
        description: error?.message || "작품 등록에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertGalleryItem) => {
    if (!description.trim()) {
      toast({
        title: "오류",
        description: "작품 설명을 입력해주세요.",
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

      // 첫 번째 이미지를 대표 이미지로 설정
      if (uploadedFiles.length > 0 && !watch("imageUrl")) {
        const firstImage = uploadedFiles.find(file => 
          file.originalName?.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/i)
        );
        if (firstImage) {
          setValue('imageUrl', firstImage.url);
        }
      }

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
  }, [attachments, setValue, watch, toast]);

  // 첨부파일 제거 핸들러
  const removeAttachment = useCallback((index: number) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
    setValue('attachments', newAttachments);
  }, [attachments, setValue]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/gallery">
            <Button variant="ghost" className="flex items-center text-gray-600 hover:text-purple-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              갤러리로 돌아가기
            </Button>
          </Link>
        </div>

        <Card className="bg-white shadow-xl border-0 rounded-2xl">
          <CardHeader className="text-center py-8">
            <CardTitle className="text-3xl font-bold gradient-text mb-2">작품 등록</CardTitle>
            <p className="text-gray-600">여러분의 창의적인 작품을 다른 사람들과 공유해보세요</p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-semibold text-gray-700">작품 제목 *</Label>
                <Input
                  id="title"
                  {...register("title", { required: "작품 제목을 입력해주세요" })}
                  placeholder="작품의 제목을 입력하세요"
                  className="rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                />
                {errors.title && (
                  <p className="text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-semibold text-gray-700">카테고리 *</Label>
                <Select value={selectedCategory} onValueChange={(value) => setValue("category", value)}>
                  <SelectTrigger className="rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200">
                    <SelectValue placeholder="카테고리를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {GALLERY_CATEGORIES.filter(cat => cat !== "전체").map((category) => (
                      <SelectItem key={category} value={category} className="rounded-lg">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-sm font-semibold text-gray-700">대표 이미지 URL (선택사항)</Label>
                <Input
                  id="imageUrl"
                  {...register("imageUrl")}
                  placeholder="작품의 대표 이미지 URL을 입력하세요"
                  className="rounded-xl border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold text-gray-700">작품 설명 *</Label>
                <CKEditorRichTextEditor
                  value={description}
                  onChange={setDescription}
                  placeholder="작품에 대한 설명을 작성하세요..."
                />
              </div>

              {/* 첨부파일 업로드 섹션 */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">작품 이미지 및 파일</Label>
                <div className="border-2 border-dashed border-purple-200 rounded-xl p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-purple-400 mb-4" />
                    <div className="text-sm text-gray-600 mb-4">
                      이미지 파일을 업로드하거나 드래그하여 추가하세요
                      <br />
                      <span className="text-xs text-gray-500">JPG, PNG, GIF 파일 지원</span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="border-purple-200 hover:border-purple-300 text-purple-600 hover:bg-purple-50 rounded-xl"
                    >
                      {isUploading ? "업로드 중..." : "파일 선택"}
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png,.gif,.webp"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* 업로드된 파일 목록 */}
                {attachments.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">업로드된 파일</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-xl border border-purple-100">
                          <div className="flex items-center space-x-3">
                            {file.originalName?.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                              <img 
                                src={file.url} 
                                alt={file.originalName}
                                className="w-10 h-10 object-cover rounded-lg"
                              />
                            ) : (
                              <FileText className="h-8 w-8 text-purple-500" />
                            )}
                            <div>
                              <span className="text-sm font-medium text-gray-900">{file.originalName}</span>
                              <p className="text-xs text-gray-500">
                                {(file.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAttachment(index)}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Link href="/gallery">
                  <Button variant="outline" className="px-8 py-3 rounded-xl border-gray-200 hover:bg-gray-50">
                    취소
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="gradient-bg text-white border-0 px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg"
                >
                  {mutation.isPending ? "등록 중..." : "작품 등록"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}