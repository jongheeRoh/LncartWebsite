import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, ChevronLeft, ChevronRight, List } from "lucide-react";
import { useLocation, Link } from "wouter";
import type { GalleryItem } from "@shared/schema";

export default function GalleryDetail() {
  const [location] = useLocation();
  const [, setLocation] = useLocation();
  const itemId = location.split('/')[2]; // Extract ID from /gallery/123

  const { data: item, isLoading } = useQuery<GalleryItem>({
    queryKey: ["/api/gallery", itemId],
    queryFn: async () => {
      const response = await fetch(`/api/gallery/${itemId}`);
      if (!response.ok) throw new Error("Failed to fetch gallery item");
      return response.json();
    },
    enabled: !!itemId,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  };

  const handlePrevious = () => {
    // Navigate to previous item - in a real app, you'd have logic to get the actual previous ID
    console.log("Navigate to previous item");
  };

  const handleNext = () => {
    // Navigate to next item - in a real app, you'd have logic to get the actual next ID
    console.log("Navigate to next item");
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded mb-4 w-1/3"></div>
            <div className="h-6 bg-slate-200 rounded mb-8 w-1/4"></div>
            <div className="h-64 bg-slate-200 rounded mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!item) {
    return (
      <section className="py-16 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">작품을 찾을 수 없습니다</h2>
          <Link href="/gallery">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              갤러리로 돌아가기
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/gallery">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              갤러리 목록으로
            </Button>
          </Link>
        </div>

        {/* Content */}
        <Card className="bg-white shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b p-6">
            <div className="flex items-center justify-between mb-4">
              <Badge 
                variant="outline" 
                className="text-sm font-medium text-blue-600 border-blue-200 bg-blue-50"
              >
                {item.category}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(item.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'short'
                  })}
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  관리자
                </div>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {item.title}
            </h1>
          </div>
          
          <CardContent className="p-8">
            {/* Main Image */}
            {item.imageUrl && (
              <div className="mb-8">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Sample Content - Based on the attached gallery content */}
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                {item.description}
              </p>

              {/* Sample detailed content similar to the museum visit article */}
              <div className="space-y-6 text-slate-700">
                <p>
                  선과색미술학원에서는 학생들의 창의적 사고와 예술적 감성을 기르기 위해 
                  다양한 교육 프로그램을 운영하고 있습니다.
                </p>

                <p>
                  이번 작품은 학생들이 기초적인 미술 기법을 익히면서도 
                  자신만의 독창적인 표현 방식을 찾아가는 과정에서 탄생했습니다.
                </p>

                {/* Sample additional images */}
                <div className="grid md:grid-cols-2 gap-4 my-8">
                  <div className="bg-slate-100 h-48 rounded-lg flex items-center justify-center">
                    <span className="text-slate-400">작품 과정 이미지 1</span>
                  </div>
                  <div className="bg-slate-100 h-48 rounded-lg flex items-center justify-center">
                    <span className="text-slate-400">작품 과정 이미지 2</span>
                  </div>
                </div>

                <p>
                  미술 교육을 통해 학생들은 단순히 기술적인 면만을 배우는 것이 아니라, 
                  창의적 사고력과 문제 해결 능력을 기르게 됩니다.
                </p>

                <p>
                  특히 이 작품에서는 전통적인 기법과 현대적인 감각을 조화롭게 
                  결합하려는 시도를 볼 수 있습니다.
                </p>

                <div className="bg-blue-50 p-6 rounded-lg my-8">
                  <h4 className="font-semibold text-slate-900 mb-3">작품 제작 과정</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• 주제 선정 및 스케치 단계</li>
                    <li>• 색채 계획 및 구성 연구</li>
                    <li>• 본 작업 진행</li>
                    <li>• 마무리 및 완성</li>
                  </ul>
                </div>

                <p>
                  학생들의 작품 활동을 통해 우리는 미래의 예술가들이 
                  어떤 방향으로 성장해 나갈지 기대해 볼 수 있습니다.
                </p>

                <p>
                  선과색미술학원은 앞으로도 학생들의 무한한 가능성을 발견하고 
                  키워나가는 교육기관이 되도록 최선을 다하겠습니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="mt-8">
          <div className="flex justify-center items-center gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="flex items-center gap-2 px-4 py-2"
            >
              <ChevronLeft className="h-4 w-4" />
              이전글
            </Button>
            
            <Link href="/gallery">
              <Button
                variant="outline"
                className="flex items-center gap-2 px-6 py-2"
              >
                <List className="h-4 w-4" />
                리스트
              </Button>
            </Link>
            
            <Button
              variant="outline"
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2"
            >
              다음글
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}