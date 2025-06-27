import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CKEditorRichTextEditor from "@/components/ui/ckeditor-rich-text-editor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Save, Plus } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import type { Roadmap } from "@shared/schema";

const roadmapFormSchema = z.object({
  type: z.string().min(1, "로드맵 타입을 선택해주세요"),
  title: z.string().min(1, "제목을 입력해주세요"),
  content: z.string().min(1, "내용을 입력해주세요"),
});

type RoadmapFormData = z.infer<typeof roadmapFormSchema>;

export default function AdminRoadmap() {
  const [selectedType, setSelectedType] = useState<string>("middle_school");
  const queryClient = useQueryClient();

  const { data: roadmap, isLoading } = useQuery<Roadmap>({
    queryKey: [`/api/roadmap/${selectedType}`],
    enabled: !!selectedType,
  });

  const form = useForm<RoadmapFormData>({
    resolver: zodResolver(roadmapFormSchema),
    defaultValues: {
      type: selectedType,
      title: "",
      content: "",
    },
  });

  // Reset form when roadmap data changes
  useEffect(() => {
    if (roadmap) {
      form.reset({
        type: roadmap.type,
        title: roadmap.title,
        content: roadmap.content,
      });
    }
  }, [roadmap, form]);

  const updateRoadmapMutation = useMutation({
    mutationFn: async (data: RoadmapFormData) => {
      const response = await fetch(`/api/roadmap/${data.type}`, {
        method: roadmap ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to save roadmap");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/roadmap/${selectedType}`] });
      alert("로드맵이 성공적으로 저장되었습니다.");
    },
    onError: (error) => {
      console.error("Error saving roadmap:", error);
      alert("로드맵 저장 중 오류가 발생했습니다.");
    },
  });

  const onSubmit = (data: RoadmapFormData) => {
    updateRoadmapMutation.mutate(data);
  };

  const handleTypeChange = (newType: string) => {
    setSelectedType(newType);
    form.setValue("type", newType);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <p className="text-gray-600">로드맵 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/admin">
            <Button variant="ghost" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              관리자 패널로 돌아가기
            </Button>
          </Link>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">
              로드맵 관리
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                로드맵 타입 선택
              </label>
              <Select value={selectedType} onValueChange={handleTypeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="로드맵 타입을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="middle_school">예중 입시로드맵</SelectItem>
                  <SelectItem value="high_school">예고 입시로드맵</SelectItem>
                </SelectContent>
              </Select>
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
                          placeholder="로드맵 상세 내용을 입력하세요"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button
                    type="submit"
                    disabled={updateRoadmapMutation.isPending}
                    className="flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {updateRoadmapMutation.isPending ? "저장 중..." : "저장"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}