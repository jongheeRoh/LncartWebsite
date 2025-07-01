import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Users, Target, CheckCircle, Clock, Award, Palette, FileText, Trophy, Brush, PaintBucket, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import heroImage from "/academy-hero-bg.png";
import type { HighSchoolAdmission } from "@shared/schema";

// HTML 태그와 이미지를 제거하고 순수 텍스트만 추출하는 함수
function extractPlainText(html: string): string {
  if (!html) return '';
  
  // HTML 엔티티 디코딩
  const decoded = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
  
  // 임시 div 생성해서 HTML 파싱
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = decoded;
  
  // 이미지, 동영상 등 미디어 태그 제거
  const mediaElements = tempDiv.querySelectorAll('img, iframe, video, audio, div[style*="position: relative"]');
  mediaElements.forEach(el => el.remove());
  
  // 텍스트만 추출
  let text = tempDiv.textContent || tempDiv.innerText || '';
  
  // 여러 공백을 하나로 통합하고 줄바꿈 정리
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
}

export default function HighSchool() {
  const { data: admissionData, isLoading, error } = useQuery<{ items: HighSchoolAdmission[], total: number }>({
    queryKey: ["/api/high-school-admission"],
  });

  const admissions = admissionData?.items || [];

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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">예고 입시정보</h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto drop-shadow-lg">
              선화예술고등학교 입시를 위한 전문적이고 심화된 교육과정
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">




        {/* 예고 입시정보 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">예고 입시정보</h3>
          
          {isLoading ? (
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="text-center py-8">
                  <p className="text-gray-600">입시정보를 불러오는 중...</p>
                </div>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="text-center py-8">
                  <p className="text-red-600">입시정보를 불러오는데 실패했습니다.</p>
                </div>
              </CardContent>
            </Card>
          ) : admissions.length === 0 ? (
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="text-center py-8">
                  <p className="text-gray-600">아직 등록된 입시정보가 없습니다.</p>
                  <p className="text-sm text-gray-500 mt-2">관리자 패널에서 입시정보를 추가해주세요.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {admissions.map((admission: any) => (
                <Card key={admission.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow h-[320px] flex flex-col">
                  <CardHeader className="flex-shrink-0">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {admission.category}
                      </Badge>
                      <div className="text-xs text-gray-500 flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{admission.views || 0}</span>
                        </div>
                        <span>{new Date(admission.createdAt).toLocaleDateString('ko-KR')}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-900 line-clamp-2 h-[56px]">
                      {admission.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="text-sm text-gray-600 line-clamp-4 mb-4 flex-1 h-[80px] overflow-hidden">
                      {extractPlainText(admission.content || '').substring(0, 120)}
                      {extractPlainText(admission.content || '').length > 120 ? '...' : ''}
                    </div>
                    <Link href={`/high-school/${admission.id}`} className="mt-auto">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                      >
                        자세히 보기
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}