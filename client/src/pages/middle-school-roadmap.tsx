import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Download, FileText, BookOpen, Target, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { convertYouTubeUrlsToIframes } from "@/lib/video-converter";
import heroImage from "/academy-hero-bg.png";

interface FileAttachment {
  id: string;
  originalName: string;
  filename: string;
  mimetype: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

export default function MiddleSchoolRoadmap() {
  const { data: roadmap, isLoading, error } = useQuery({
    queryKey: ["/api/roadmap", "middle_school"],
    queryFn: async () => {
      const response = await fetch("/api/roadmap/middle_school");
      if (!response.ok) throw new Error("Failed to fetch roadmap");
      return response.json();
    },
  });

  if (isLoading) {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">예중 입시로드맵</h1>
              <p className="text-xl text-orange-100 max-w-3xl mx-auto drop-shadow-lg">
                예술중학교 입시 준비 가이드
              </p>
            </div>
          </div>
        </section>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded mb-4"></div>
            <div className="h-64 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !roadmap) {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">예중 입시로드맵</h1>
              <p className="text-xl text-orange-100 max-w-3xl mx-auto drop-shadow-lg">
                예술중학교 입시 준비 가이드
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <div className="text-center py-8">
                <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 mb-4">로드맵을 준비 중입니다</h2>
                <p className="text-slate-600 mb-6">
                  예중 입시로드맵 자료를 곧 업데이트할 예정입니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <Button variant="outline">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      홈으로 돌아가기
                    </Button>
                  </Link>
                  <Link href="/middle-school">
                    <Button>
                      <Target className="mr-2 h-4 w-4" />
                      예중 입시정보 보기
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">예중 입시로드맵</h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto drop-shadow-lg">
              체계적인 예술중학교 입시 준비 가이드
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              홈으로 돌아가기
            </Button>
          </Link>
        </div>

        {/* Roadmap Content */}
        <Card className="bg-white shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b p-6">
            <div className="flex items-center justify-between mb-4">
              <Badge 
                variant="outline" 
                className="text-sm font-medium text-purple-600 border-purple-200 bg-purple-50"
              >
                예중 입시 가이드
              </Badge>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(roadmap.updatedAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  최신 업데이트
                </div>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {roadmap.title}
            </h1>
          </div>
          
          <CardContent className="p-8">
            {/* Content */}
            <div 
              className="prose max-w-none video-content"
              dangerouslySetInnerHTML={{ 
                __html: convertYouTubeUrlsToIframes(roadmap.content) 
              }}
            />
            
            {/* File Attachments */}
            {roadmap.attachments && Array.isArray(roadmap.attachments) && roadmap.attachments.length > 0 && (
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  첨부 자료
                </h3>
                <div className="space-y-3">
                  {(roadmap.attachments as FileAttachment[]).map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-slate-600" />
                        <div>
                          <p className="font-medium text-slate-900">{file.originalName}</p>
                          <p className="text-sm text-slate-600">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
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
              </div>
            )}

            {/* Navigation Links */}
            <div className="mt-8 pt-6 border-t">
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/middle-school">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start p-4 h-auto"
                  >
                    <div className="text-left">
                      <div className="font-semibold">예중 입시정보</div>
                      <div className="text-sm text-gray-600">최신 입시 소식 확인</div>
                    </div>
                  </Button>
                </Link>
                <Link href="/high-school-roadmap">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start p-4 h-auto"
                  >
                    <div className="text-left">
                      <div className="font-semibold">예고 입시로드맵</div>
                      <div className="text-sm text-gray-600">예고 입시 준비 가이드</div>
                    </div>
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}