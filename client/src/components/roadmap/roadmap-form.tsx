import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CKEditorRichTextEditor from "@/components/ui/ckeditor-rich-text-editor";
import FileUpload, { type FileAttachment } from "@/components/ui/file-upload";
import { useToast } from "@/hooks/use-toast";
import { insertRoadmapSchema, type InsertRoadmap, type Roadmap } from "@shared/schema";
import { Save, Plus, FileText } from "lucide-react";

interface RoadmapFormProps {
  onSuccess?: () => void;
  type: "middle_school" | "high_school";
}

export default function RoadmapForm({ onSuccess, type }: RoadmapFormProps) {
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // 기존 로드맵 데이터 조회
  const { data: roadmap, isLoading } = useQuery<Roadmap>({
    queryKey: [`/api/roadmap/${type}`],
  });

  const form = useForm<InsertRoadmap>({
    resolver: zodResolver(insertRoadmapSchema),
    defaultValues: {
      type,
      title: "",
      content: "",
      attachments: [],
    },
  });

  // 로드맵 데이터가 로딩되면 폼 초기화
  useEffect(() => {
    if (roadmap) {
      form.reset({
        type: roadmap.type,
        title: roadmap.title,
        content: roadmap.content,
        attachments: (roadmap.attachments as FileAttachment[]) || [],
      });
      setAttachments((roadmap.attachments as FileAttachment[]) || []);
    }
  }, [roadmap, form]);

  const createRoadmapMutation = useMutation({
    mutationFn: async (data: InsertRoadmap) => {
      const sessionId = localStorage.getItem('adminSessionId');
      const response = await fetch("/api/roadmap", {
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
      queryClient.invalidateQueries({ queryKey: ["/api/roadmap", type] });
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
      const response = await fetch(`/api/roadmap/${type}`, {
        method: "PUT",
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
      queryClient.invalidateQueries({ queryKey: ["/api/roadmap", type] });
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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-4 bg-slate-200 rounded w-1/4 mb-2"></div>
          <div className="h-10 bg-slate-200 rounded mb-4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4 mb-2"></div>
          <div className="h-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 현재 상태 표시 */}
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-slate-600" />
          <span className="font-medium text-slate-900">
            {roadmap ? "기존 로드맵 수정" : "새 로드맵 작성"}
          </span>
        </div>
        {roadmap && (
          <div className="text-sm text-slate-600">
            마지막 수정: {new Date(roadmap.updatedAt).toLocaleDateString('ko-KR')}
          </div>
        )}
      </div>

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
                  <CKEditorRichTextEditor
                    value={field.value}
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

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isSubmitting ? "저장 중..." : roadmap ? "수정 완료" : "저장"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}