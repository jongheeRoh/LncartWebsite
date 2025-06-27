import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function HighSchoolDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const { data: admission, isLoading, error } = useQuery({
    queryKey: [`/api/high-school-admission/${id}`],
  });

  // 전체 목록을 가져와서 이전글/다음글 찾기
  const { data: allAdmissions } = useQuery({
    queryKey: ["/api/high-school-admission"],
    queryFn: () => fetch("/api/high-school-admission?limit=100").then(res => res.json()),
  });

  const currentIndex = allAdmissions?.items?.findIndex((item: any) => item.id === parseInt(id || "0"));
  const prevAdmission = currentIndex > 0 ? allAdmissions?.items[currentIndex - 1] : null;
  const nextAdmission = currentIndex >= 0 && currentIndex < (allAdmissions?.items?.length - 1) ? allAdmissions?.items[currentIndex + 1] : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <div className="text-center py-8">
                <p className="text-gray-600">입시정보를 불러오는 중...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !admission) {
    return (
      <div className="min-h-screen bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <div className="text-center py-8">
                <p className="text-red-600">입시정보를 찾을 수 없습니다.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setLocation("/high-school")}
                >
                  목록으로 돌아가기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/high-school">
            <Button variant="ghost" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              목록으로 돌아가기
            </Button>
          </Link>
        </div>

        <Card className="bg-white shadow-lg">
          <CardContent className="p-8">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4">
                {admission.category}
              </Badge>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">
                {admission.title}
              </h1>
              <p className="text-sm text-gray-500">
                작성일: {new Date(admission.createdAt).toLocaleDateString('ko-KR')}
              </p>
            </div>
            
            <div 
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: admission.content }}
            />

            {/* 네비게이션 영역 */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 이전글 */}
                <div className="text-left">
                  {prevAdmission ? (
                    <Link href={`/high-school/${prevAdmission.id}`}>
                      <Button variant="outline" className="w-full text-left justify-start">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">이전글</div>
                          <div className="text-sm truncate">{prevAdmission.title}</div>
                        </div>
                      </Button>
                    </Link>
                  ) : (
                    <div className="h-16"></div>
                  )}
                </div>

                {/* 목록으로 */}
                <div className="text-center">
                  <Link href="/high-school">
                    <Button variant="default" className="w-full">
                      목록으로
                    </Button>
                  </Link>
                </div>

                {/* 다음글 */}
                <div className="text-right">
                  {nextAdmission ? (
                    <Link href={`/high-school/${nextAdmission.id}`}>
                      <Button variant="outline" className="w-full text-right justify-end">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">다음글</div>
                          <div className="text-sm truncate">{nextAdmission.title}</div>
                        </div>
                      </Button>
                    </Link>
                  ) : (
                    <div className="h-16"></div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}