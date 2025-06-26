import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import heroImage from "@assets/스크린샷 2025-06-25 222106_1750857872681.png";

export default function MiddleSchoolEntrance() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">예중 입시정보</h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto drop-shadow-lg">
              예술중학교 입시를 위한 체계적이고 전문적인 준비과정
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                예술중학교 입시 개요
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-slate-700">
                예술중학교 입시는 일반 중학교와 달리 실기시험과 면접을 통해 학생을 선발합니다. 
                선과색미술학원은 30년간 축적된 노하우로 체계적인 예중 입시 준비 과정을 제공합니다.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">실기시험</h3>
                  <p className="text-blue-700 text-sm">소묘, 수채화, 디자인 등 기초 실기능력 평가</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">면접</h3>
                  <p className="text-green-700 text-sm">예술에 대한 관심과 열정, 기본 소양 평가</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-2">포트폴리오</h3>
                  <p className="text-orange-700 text-sm">개인 작품집을 통한 예술적 감성 평가</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Curriculum */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">예중 입시 커리큘럼</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  기초과정 (6개월)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>소묘 기초:</strong> 선긋기, 명암표현, 기본 도형 그리기
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>수채화 기초:</strong> 색채 이론, 붓 다루기, 물조절법
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>관찰력 향상:</strong> 정물 스케치, 자연물 관찰 그리기
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>예술 감상:</strong> 미술사 기초, 작품 감상 및 토론
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  심화과정 (6개월)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>실기 완성:</strong> 입시 유형별 실기 연습, 시간 단축 훈련
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>포트폴리오:</strong> 개인 작품집 제작, 작품 선별 및 편집
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>모의고사:</strong> 실제 시험과 동일한 조건의 실기 연습
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>면접 준비:</strong> 예상 질문 연습, 작품 설명 훈련
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Schedule */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">입시 일정</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                  <CalendarDays className="h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold">원서 접수</h3>
                    <p className="text-slate-600">매년 11월 중순 ~ 11월 말</p>
                  </div>
                  <Badge variant="outline">필수</Badge>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold">실기시험</h3>
                    <p className="text-slate-600">매년 12월 초 ~ 12월 중순</p>
                  </div>
                  <Badge variant="outline">실기</Badge>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold">면접</h3>
                    <p className="text-slate-600">실기시험 합격자 대상 (12월 말)</p>
                  </div>
                  <Badge variant="outline">면접</Badge>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                  <Award className="h-6 w-6 text-green-600" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-900">합격 발표</h3>
                    <p className="text-green-700">매년 1월 초</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">최종</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                예중 입시 상담
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">상담 안내</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li>• 개인별 맞춤 상담 진행</li>
                    <li>• 학생 실력 진단 및 커리큘럼 설계</li>
                    <li>• 입시 전략 수립 및 일정 관리</li>
                    <li>• 포트폴리오 작성 지도</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">연락처</h3>
                  <div className="space-y-2 text-slate-600">
                    <p><strong>전화:</strong> 02-453-2379</p>
                    <p><strong>주소:</strong> 서울특별시 광진구 천호대로 677</p>
                    <p><strong>상담시간:</strong> 평일 09:00 - 18:00</p>
                    <p><strong>휴무:</strong> 일요일, 공휴일</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}