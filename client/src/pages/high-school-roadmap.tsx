import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/스크린샷 2025-06-25 222106_1750857872681.png";
import type { Roadmap } from "@shared/schema";
import type { FileAttachment } from "@/components/ui/file-upload";

export default function HighSchoolRoadmap() {
  const { data: roadmap, isLoading } = useQuery<Roadmap>({
    queryKey: ["/api/roadmaps/high_school"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-lg text-slate-600">로딩 중...</div>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-slate-50">
        <section className="relative text-white py-16 overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="선과색 미술학원 간판" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">예고 입시로드맵</h1>
              <p className="text-xl text-orange-100 max-w-3xl mx-auto drop-shadow-lg">
                로드맵을 준비 중입니다
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative text-white py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="선과색 미술학원 간판" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">{roadmap.title}</h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto drop-shadow-lg">
              예술고등학교 입시를 위한 전문적이고 체계적인 준비과정
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              홈으로 돌아가기
            </Button>
          </Link>
        </div>

        {/* Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{roadmap.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: roadmap.content }}
            />
          </CardContent>
        </Card>

        {/* Attachments */}
        {roadmap.attachments && roadmap.attachments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Download className="h-5 w-5" />
                첨부파일
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {(roadmap.attachments as FileAttachment[]).map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-medium">{file.originalName}</div>
                      <div className="text-sm text-slate-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(file.url, '_blank')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      다운로드
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}