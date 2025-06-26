import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/ui/rich-text-editor";
import FileUpload, { type FileAttachment } from "@/components/ui/file-upload";
import { useToast } from "@/hooks/use-toast";
import { insertRoadmapSchema, type InsertRoadmap, type Roadmap } from "@shared/schema";

interface RoadmapFormProps {
  onSuccess?: () => void;
  roadmap?: Roadmap;
  type: "middle_school" | "high_school";
}

export default function RoadmapForm({ onSuccess, roadmap, type }: RoadmapFormProps) {
  const [attachments, setAttachments] = useState<FileAttachment[]>((roadmap?.attachments as FileAttachment[]) || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertRoadmap>({
    resolver: zodResolver(insertRoadmapSchema),
    defaultValues: {
      type,
      title: roadmap?.title || "",
      content: roadmap?.content || "",
      attachments: (roadmap?.attachments as FileAttachment[]) || [],
    },
  });

  const createRoadmapMutation = useMutation({
    mutationFn: async (data: InsertRoadmap) => {
      const sessionId = localStorage.getItem('adminSessionId');
      const response = await fetch("/api/roadmaps", {
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
      queryClient.invalidateQueries({ queryKey: ["/api/roadmaps", type] });
      toast({
        title: "성공",
        description: "로드맵이 성공적으로 작성되었습니다.",
      });
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "오류",
        description: "로드맵 작성에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const updateRoadmapMutation = useMutation({
    mutationFn: async (data: InsertRoadmap) => {
      const sessionId = localStorage.getItem('adminSessionId');
      const response = await fetch(`/api/roadmaps/${type}`, {
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
      queryClient.invalidateQueries({ queryKey: ["/api/roadmaps", type] });
      toast({
        title: "성공",
        description: "로드맵이 성공적으로 수정되었습니다.",
      });
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "오류",
        description: "로드맵 수정에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: InsertRoadmap) => {
    setIsSubmitting(true);
    try {
      const roadmapData = {
        ...data,
        attachments
      };
      
      if (roadmap) {
        await updateRoadmapMutation.mutateAsync(roadmapData);
      } else {
        await createRoadmapMutation.mutateAsync(roadmapData);
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>제목</FormLabel>
                <FormControl>
                  <Input placeholder="로드맵 제목을 입력하세요" {...field} />
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
                  <RichTextEditor
                    content={field.value}
                    onChange={field.onChange}
                    placeholder="로드맵 내용을 입력하세요. 이미지와 링크를 추가할 수 있습니다."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>첨부파일</FormLabel>
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