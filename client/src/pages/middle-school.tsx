import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Users, Target, CheckCircle, Clock, Award, Palette, FileText, Trophy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import heroImage from "@assets/스크린샷 2025-06-25 222106_1750857872681.png";

export default function MiddleSchool() {
  const { data: admissionData, isLoading, error } = useQuery({
    queryKey: ["/api/middle-school-admission"],
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">예중 입시정보</h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto drop-shadow-lg">
              선화예술중학교 입시를 위한 체계적이고 전문적인 교육과정
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">


        {/* 예중 입시정보 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">예중 입시정보</h3>
          
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
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {admissions.map((admission: any) => (
                <Card key={admission.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {admission.category}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {new Date(admission.createdAt).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-900 line-clamp-2">
                      {admission.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="text-sm text-gray-600 line-clamp-3 mb-4"
                      dangerouslySetInnerHTML={{ 
                        __html: admission.excerpt || admission.content.substring(0, 100) + '...' 
                      }}
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        // 상세 내용을 새 창에서 보여주기
                        const newWindow = window.open('', '_blank');
                        if (newWindow) {
                          newWindow.document.write(`
                            <html>
                              <head>
                                <title>${admission.title}</title>
                                <meta charset="utf-8">
                                <style>
                                  body { font-family: 'Noto Sans KR', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
                                  h1 { color: #1a202c; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
                                  .category { background: #f7fafc; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #4a5568; }
                                  .date { color: #718096; font-size: 14px; }
                                  .content { margin-top: 20px; }
                                  img { max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0; }
                                </style>
                              </head>
                              <body>
                                <div class="category">${admission.category}</div>
                                <h1>${admission.title}</h1>
                                <div class="date">작성일: ${new Date(admission.createdAt).toLocaleDateString('ko-KR')}</div>
                                <div class="content">${admission.content}</div>
                              </body>
                            </html>
                          `);
                        }
                      }}
                    >
                      자세히 보기
                    </Button>
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