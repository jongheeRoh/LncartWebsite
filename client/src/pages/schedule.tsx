import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, BookOpen, Calendar, Star } from "lucide-react";
import heroImage from "/academy-hero-bg.png";

export default function Schedule() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white py-16 overflow-hidden mb-12">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="선과색 미술학원 간판" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">학원 시간표</h2>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto drop-shadow-lg">
            선과색미술학원의 체계적인 수업 시간표를 확인하세요
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 초등 4, 5학년 */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">초등 4, 5학년</h3>
            <div className="flex items-center justify-center mb-6">
              <Users className="h-5 w-5 text-primary mr-2" />
              <span className="text-slate-600">주 2회 집중 수업</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* 수업 내용 */}
            <Card className="bg-white shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                <CardTitle className="flex items-center text-blue-800">
                  <BookOpen className="mr-3 h-5 w-5" />
                  수업 내용
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-slate-900 mb-2">주 수업 내용</h4>
                    <p className="text-sm text-slate-600 mb-3">
                      선필부터 물감 활용까지 다양한 교재 사용을 전반적으로 다룹니다
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-slate-900 mb-2">미술 활동</h4>
                    <p className="text-sm text-slate-600 mb-1">수업료: 기본 교과 시간, 놀이력 시간 포함 수업</p>
                    <p className="text-sm text-slate-600">소요: 시간 구성에 따라, 변경 가능 시간 놀이</p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-slate-900 mb-2">수업 내용</h4>
                    <p className="text-sm text-slate-600 mb-2">미술 활동의 학습 과정 안내</p>
                    <div className="space-y-1 text-xs text-slate-600">
                      <p>A. 표정 연결 기법</p>
                      <p>B. 행동 흐름 어휘</p>
                    </div>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-slate-900 mb-2">4세반 조형</h4>
                    <p className="text-sm text-slate-600">감정의 표현, 시각적 표현 교육의 역할 시간</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 수업 시간표 */}
            <Card className="bg-white shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                <CardTitle className="flex items-center text-green-800">
                  <Calendar className="mr-3 h-5 w-5" />
                  수업 시간표
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-hidden rounded-lg border border-slate-200">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-slate-900">구분</th>
                        <th className="px-4 py-3 text-center font-semibold text-slate-900">수업시간</th>
                        <th className="px-4 py-3 text-center font-semibold text-slate-900">비고</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-900">화,목</td>
                        <td className="px-4 py-3 text-center">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            16시-22시(초등 4년이상 수업)
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-center text-slate-600">-</td>
                      </tr>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-900">토</td>
                        <td className="px-4 py-3 text-center">
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            10시-18시(초등 3-4년이상 수업)
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-center text-slate-600">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-xs text-slate-600 text-center">
                    * 시간표는 학원의 개인교습 시스템으로 인해 변동될 수 있습니다
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 초등 6학년 */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">초등 6학년</h3>
            <div className="flex items-center justify-center mb-6">
              <Star className="h-5 w-5 text-primary mr-2" />
              <span className="text-slate-600">개별 집중 맞춤 수업</span>
            </div>
          </div>

          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
              <CardTitle className="flex items-center text-purple-800">
                <Clock className="mr-3 h-5 w-5" />
                6학년 수업 시간표
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <p className="text-slate-700 mb-4">
                  다년간의 입시 경험을 바탕으로 학생을 체계적으로 성장시켜 안정적인 교육 노하우를 전문적으로 진행합니다.
                </p>
                <p className="text-slate-700 mb-4">
                  학생들의 이해 수준에 맞춰 원활하게 수업을 진행하며 다양한 작품들을 체험할 수 있도록 합니다.
                </p>
                <p className="text-slate-700">
                  학생들은 어떤 유형의 문제든 익숙해 질 수 있도록 학습 환경을 조성하고 개인별 맞춤형 지도를 진행합니다.
                </p>
              </div>

              <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900">구분</th>
                      <th className="px-4 py-3 text-center font-semibold text-slate-900">수업시간</th>
                      <th className="px-4 py-3 text-center font-semibold text-slate-900">비고</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-900">월,수</td>
                      <td className="px-4 py-3 text-center">
                        <div className="space-y-1">
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 block">
                            1회기 개별2시간
                          </Badge>
                          <div className="text-xs text-slate-600">
                            <p>- 금, 토: 16시-22시(초등 4년이상 수업)</p>
                            <p>- 목, 일: 10시-18시(초등 3-4년이상 수업)</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="text-xs text-slate-600">
                          개인별 수업시간은 담임과 조율하여 수업시간을 조정하시면 됩니다
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 중등 1, 2학년 */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">중등 1, 2학년</h3>
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="h-5 w-5 text-primary mr-2" />
              <span className="text-slate-600">체계적인 기초 교육</span>
            </div>
          </div>

          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
              <CardTitle className="flex items-center text-indigo-800">
                <Users className="mr-3 h-5 w-5" />
                중등 1,2학년 시간표
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <p className="text-slate-700 mb-4">
                  최근 입시 경향의 변화에 맞춰 더욱 체계적인 수업 진행을 전문적으로 다룹니다.
                </p>
                <p className="text-slate-700 mb-4">
                  실기 유형의 변화에 대응하여 수업 진행 전략을 세웁니다.
                </p>
                <p className="text-slate-700">
                  • 능력별 반편성 학습법 수업 시 시용중포함: 수업 진행, 출제문 효과, 세부 실기법 준비를 충분히 하는 것 실기 능력 향상 수업 전 오늘은 교체 교육을 완벽하게 전반적으로 합니다.
                </p>
              </div>

              <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900">구분</th>
                      <th className="px-4 py-3 text-center font-semibold text-slate-900">수업시간</th>
                      <th className="px-4 py-3 text-center font-semibold text-slate-900">비고</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-900">화,목</td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-700">
                          16시-22시(초등 4년이상 수업)
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center text-slate-600">-</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-900">토</td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          10시-18시(초등 3-4년이상 수업)
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center text-slate-600">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-slate-600 text-center">
                  시간표는 학원의 개인교습 시스템으로 인해 변동될 수 있습니다
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 중등 3학년 */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">중등 3학년</h3>
            <div className="flex items-center justify-center mb-6">
              <Star className="h-5 w-5 text-primary mr-2" />
              <span className="text-slate-600">입시 준비 집중 과정</span>
            </div>
          </div>

          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-gradient-to-r from-rose-50 to-rose-100">
              <CardTitle className="flex items-center text-rose-800">
                <Calendar className="mr-3 h-5 w-5" />
                중등 3학년 시간표
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <p className="text-slate-700 mb-4">
                  다년간의 입시 경험을 바탕으로 학생을 체계적으로 성장시켜 안정적인 교육 노하우를 전문적으로 진행합니다.
                </p>
                <p className="text-slate-700">
                  학생들의 이해 수준에 맞춰 원활하게 수업을 진행하며 다양한 작품들을 체험할 수 있도록 합니다.
                </p>
              </div>

              <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-900">구분</th>
                      <th className="px-4 py-3 text-center font-semibold text-slate-900">수업시간</th>
                      <th className="px-4 py-3 text-center font-semibold text-slate-900">비고</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-900">월,수</td>
                      <td className="px-4 py-3 text-center">
                        <div className="space-y-1">
                          <Badge variant="outline" className="bg-rose-50 text-rose-700 block">
                            1회기 개별2시간
                          </Badge>
                          <div className="text-xs text-slate-600">
                            <p>- 금, 토: 16시-22시(초등 4년이상 수업)</p>
                            <p>- 목, 일: 10시-18시(초등 3-4년이상 수업)</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="text-xs text-slate-600">
                          개인별 수업시간은 담임과 조율하여 수업시간을 조정하시면 됩니다
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-900">수,금</td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant="outline" className="bg-orange-50 text-orange-700">
                          예술점학과 서류 심사 (1월 학기 기준)
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="text-xs text-slate-600">
                          입시 준비생은 담임과 조율하여 수업시간을 조정하시면 됩니다
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 안내사항 */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-primary to-orange-500 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">수업 시간 안내</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold mb-2">📞 수업 문의</h4>
                  <p className="text-orange-100 text-sm mb-4">
                    개별 상담을 통해 학생에게 맞는 최적의 수업 시간을 조정해드립니다.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">⏰ 시간표 변경</h4>
                  <p className="text-orange-100 text-sm">
                    학원의 개인교습 시스템으로 인해 시간표가 변동될 수 있습니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </section>
  );
}