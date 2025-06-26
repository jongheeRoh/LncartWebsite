import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import heroImage from "@assets/스크린샷 2025-06-25 222106_1750857872681.png";

export default function HighSchoolEntrance() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">예고 입시정보</h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto drop-shadow-lg">
              예술고등학교 입시를 위한 전문적이고 체계적인 준비과정
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
                <Target className="h-6 w-6 text-primary" />
                예술고등학교 입시 개요
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-slate-700">
                예술고등학교 입시는 예술 전문 교육을 받기 위한 관문으로, 높은 수준의 실기 능력과 예술적 소양을 요구합니다. 
                선과색미술학원은 30년간의 입시 지도 경험을 바탕으로 체계적인 예고 입시 준비 과정을 제공합니다.
              </p>
              <div className="grid md:grid-cols-4 gap-4 mt-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">실기시험</h3>
                  <p className="text-blue-700 text-sm">고난도 소묘, 수채화, 디자인 실기</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">내신성적</h3>
                  <p className="text-green-700 text-sm">중학교 내신 성적 반영</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-2">포트폴리오</h3>
                  <p className="text-orange-700 text-sm">개인 작품집 및 창작 능력</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">면접</h3>
                  <p className="text-purple-700 text-sm">예술적 사고력 및 표현능력</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Major Schools */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">주요 예술고등학교</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">선화예술고등학교</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-3">서울 강남구 위치</p>
                <ul className="text-sm space-y-1">
                  <li>• 미술과 (회화, 조소, 디자인)</li>
                  <li>• 높은 입시 경쟁률</li>
                  <li>• 우수한 대학 진학률</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">서울예술고등학교</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-3">서울 종로구 위치</p>
                <ul className="text-sm space-y-1">
                  <li>• 미술과 (동양화, 서양화, 조소)</li>
                  <li>• 전통과 현대 조화</li>
                  <li>• 체계적 전공 교육</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">계원예술고등학교</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-3">경기 의왕시 위치</p>
                <ul className="text-sm space-y-1">
                  <li>• 미술과 (회화, 디자인, 조소)</li>
                  <li>• 현대적 교육시설</li>
                  <li>• 실기 중심 교육</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Curriculum */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">예고 입시 커리큘럼</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  1단계: 기초 실력 완성 (6개월)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>기초 소묘:</strong> 정확한 관찰력, 명암 표현, 질감 표현
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>기초 수채화:</strong> 색채 이론, 물감 조색, 기법 익히기
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>기초 디자인:</strong> 조형 원리, 구성 능력, 발상법
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>미술사:</strong> 서양미술사, 한국미술사 기초
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  2단계: 입시 실전 훈련 (6개월)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>학교별 실기:</strong> 각 학교 출제 경향 분석 및 대비
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>시간 단축:</strong> 제한 시간 내 완성도 높이기
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>포트폴리오:</strong> 개성 있는 작품집 제작
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong>모의고사:</strong> 실제 시험 환경 모의 실기
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Test Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">실기시험 유형</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-center">소묘</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-center text-slate-600">4~6시간</p>
                  <ul className="text-sm space-y-2">
                    <li>• 정물 소묘</li>
                    <li>• 석고 소묘</li>
                    <li>• 인물 소묘</li>
                    <li>• 풍경 소묘</li>
                  </ul>
                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <p className="text-xs text-blue-800">
                      정확한 관찰력과 표현력이 핵심
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-center">수채화</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-center text-slate-600">3~4시간</p>
                  <ul className="text-sm space-y-2">
                    <li>• 정물 수채화</li>
                    <li>• 풍경 수채화</li>
                    <li>• 상상화</li>
                    <li>• 주제 표현</li>
                  </ul>
                  <div className="mt-4 p-3 bg-green-50 rounded">
                    <p className="text-xs text-green-800">
                      색채 감각과 물감 조절 능력 중요
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-center">디자인</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-center text-slate-600">3~4시간</p>
                  <ul className="text-sm space-y-2">
                    <li>• 평면 구성</li>
                    <li>• 입체 구성</li>
                    <li>• 발상과 표현</li>
                    <li>• 포스터 디자인</li>
                  </ul>
                  <div className="mt-4 p-3 bg-orange-50 rounded">
                    <p className="text-xs text-orange-800">
                      창의적 사고와 구성 능력 평가
                    </p>
                  </div>
                </div>
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
                    <p className="text-slate-600">매년 10월 말 ~ 11월 초</p>
                  </div>
                  <Badge variant="outline">필수</Badge>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold">실기시험</h3>
                    <p className="text-slate-600">매년 11월 중순 ~ 11월 말</p>
                  </div>
                  <Badge variant="outline">실기</Badge>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold">면접</h3>
                    <p className="text-slate-600">실기시험 합격자 대상 (12월 초)</p>
                  </div>
                  <Badge variant="outline">면접</Badge>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                  <Award className="h-6 w-6 text-green-600" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-900">합격 발표</h3>
                    <p className="text-green-700">매년 12월 중순</p>
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
                예고 입시 상담
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">전문 상담 서비스</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li>• 학교별 맞춤 입시 전략 수립</li>
                    <li>• 개인별 실력 진단 및 학습 계획</li>
                    <li>• 포트폴리오 제작 완전 지도</li>
                    <li>• 면접 준비 및 모의면접 진행</li>
                    <li>• 지원 학교 선택 컨설팅</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">연락처 및 방문</h3>
                  <div className="space-y-2 text-slate-600">
                    <p><strong>전화:</strong> 02-453-2379</p>
                    <p><strong>주소:</strong> 서울특별시 광진구 천호대로 677</p>
                    <p><strong>상담시간:</strong> 평일 09:00 - 20:00</p>
                    <p><strong>토요일:</strong> 09:00 - 17:00</p>
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