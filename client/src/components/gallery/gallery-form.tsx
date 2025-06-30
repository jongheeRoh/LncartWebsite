import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import CKEditorRichTextEditor from "@/components/ui/ckeditor-rich-text-editor";
import type { GalleryItem, InsertGalleryItem } from "@shared/schema";

interface GalleryFormProps {
  item?: GalleryItem | null;
  onSuccess?: () => void;
}

export default function GalleryForm({ item, onSuccess }: GalleryFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description || "");
      setCategory(item.category);
      setImageUrl(item.imageUrl || "");
    } else {
      setTitle("");
      setDescription("");
      setCategory("");
      setImageUrl("");
    }
  }, [item]);

  const mutation = useMutation({
    mutationFn: async (data: InsertGalleryItem) => {
      if (item) {
        return await apiRequest(`/api/gallery/${item.id}`, "PATCH", data);
      } else {
        return await apiRequest("/api/gallery", "POST", data);
      }
    },
    onSuccess: () => {
      toast({
        title: "성공",
        description: item ? "갤러리 항목이 수정되었습니다." : "갤러리 항목이 생성되었습니다.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: "오류",
        description: "저장에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !category) return;

    const data: InsertGalleryItem = {
      title: title.trim(),
      description: description.trim() || "",
      category,
      imageUrl: imageUrl.trim() || "",
    };

    mutation.mutate(data);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="갤러리 제목을 입력하세요"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">카테고리</Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger>
            <SelectValue placeholder="카테고리를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="수채화">수채화</SelectItem>
            <SelectItem value="유화">유화</SelectItem>
            <SelectItem value="소묘">소묘</SelectItem>
            <SelectItem value="아크릴화">아크릴화</SelectItem>
            <SelectItem value="기타">기타</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">이미지 URL</Label>
        <Input
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="이미지 URL을 입력하세요"
          type="url"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">설명</Label>
        <CKEditorRichTextEditor
          value={description}
          onChange={setDescription}
          placeholder="작품에 대한 설명을 작성하세요..."
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "저장 중..." : item ? "수정" : "생성"}
        </Button>
      </div>
    </form>
  );
}