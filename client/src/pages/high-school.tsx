import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Users, Target, CheckCircle, Clock, Award, Palette, FileText, Trophy, Brush, PaintBucket } from "lucide-react";

export default function HighSchool() {
  const announcements = [
    { id: 30, title: "[합격자] 2025선화예고 합격자 발표", author: "관리자" },
    { id: 29, title: "[출제문제] 2025 선화예고 실기고사 출제문제", author: "관리자" },
    { id: 28, title: "[재현작] 2025 선화예고 재현작 전시", author: "관리자" },
    { id: 27, title: "[입시요강] 2025 선화예술고등학교 입시요강", author: "관리자" },
    { id: 26, title: "[방학특강] 예고대비 겨울방학특강 모집", author: "관리자" },
    { id: 25, title: "[포트폴리오] 예고반 포트폴리오 심사 일정", author: "관리자" },
    { id: 24, title: "[실기대회] 2024 선화예고 실기대회 결과", author: "관리자" },
    { id: 23, title: "[특강] 예고입시 전공별 특화 수업 안내", author: "관리자" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">예고 입시정보</h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              선화예술고등학교 입시를 위한 전문적이고 심화된 교육과정
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 예고 입시 개요 */}
        <section className="mb-16">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">예고 입시 개요</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center max-w-4xl mx-auto">
                <p className="text-lg text-slate-700 mb-6">
                  선화예술고등학교 입시는 보다 전문적이고 심화된 미술 실기 능력을 요구합니다.
                </p>
                <p className="text-slate-600 mb-4">
                  정밀한 기법과 창의적 표현력, 예술적 사고력을 종합적으로 평가하며,
                  체계적이고 집중적인 준비가 필요합니다.
                </p>
                <p className="text-slate-600">
                  선과색미술학원의 예고반에서는 고급 기법 습득부터 개성 있는 작품 세계 구축까지
                  전문적인 교육을 제공합니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 전형 방법 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">전형 방법</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center card-hover">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">서류전형</h4>
                <p className="text-slate-600 text-sm mb-4">
                  학교생활기록부, 자기소개서, 포트폴리오
                </p>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">20%</Badge>
              </CardContent>
            </Card>

            <Card className="text-center card-hover">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">실기전형</h4>
                <p className="text-slate-600 text-sm mb-4">
                  소묘, 채색, 조소 중 전공 선택
                </p>
                <Badge variant="outline" className="bg-green-50 text-green-700">60%</Badge>
              </CardContent>
            </Card>

            <Card className="text-center card-hover">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">면접전형</h4>
                <p className="text-slate-600 text-sm mb-4">
                  전공 적성 및 예술관 평가
                </p>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">20%</Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 전공별 실기 과목 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">전공별 실기 과목</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="mr-3 text-blue-600" />
                  회화전공 (소묘)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-600 text-sm">
                    정밀한 관찰력과 표현력을 바탕으로 한 고급 소묘 기법
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">인물소묘 (석고상, 인체)</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">정물소묘 (복합구성)</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">창작소묘</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-sm text-slate-700">
                      <strong>시험시간:</strong> 4시간<br/>
                      <strong>준비물:</strong> 2절지, 연필, 목탄 등
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PaintBucket className="mr-3 text-purple-600" />
                  회화전공 (채색)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-600 text-sm">
                    색채 감각과 조형 능력, 창의적 표현력 종합 평가
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">수채화 (정물, 풍경)</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">아크릴화</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">창작표현</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-sm text-slate-700">
                      <strong>시험시간:</strong> 4시간<br/>
                      <strong>준비물:</strong> 2절지, 채색도구 일체
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brush className="mr-3 text-orange-600" />
                  조소전공
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-600 text-sm">
                    입체 조형 감각과 공간 구성 능력 평가
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">소조 (인물, 두상)</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">조형 구성</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">입체 표현</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-sm text-slate-700">
                      <strong>시험시간:</strong> 4시간<br/>
                      <strong>준비물:</strong> 조소용 점토, 조각도 등
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 수업 시간표 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">예고반 수업 시간표</h3>
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">시간</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900">월</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900">화</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900">수</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900">목</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900">금</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-900">토</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-4 font-medium">09:00-13:00</td>
                      <td className="py-3 px-4 text-center bg-blue-50">소묘 전공</td>
                      <td className="py-3 px-4 text-center bg-purple-50">채색 전공</td>
                      <td className="py-3 px-4 text-center bg-blue-50">소묘 전공</td>
                      <td className="py-3 px-4 text-center bg-purple-50">채색 전공</td>
                      <td className="py-3 px-4 text-center bg-blue-50">소묘 전공</td>
                      <td className="py-3 px-4 text-center bg-orange-50">조소 전공</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-4 font-medium">14:00-18:00</td>
                      <td className="py-3 px-4 text-center bg-purple-50">채색 전공</td>
                      <td className="py-3 px-4 text-center bg-orange-50">조소 전공</td>
                      <td className="py-3 px-4 text-center bg-purple-50">채색 전공</td>
                      <td className="py-3 px-4 text-center bg-orange-50">조소 전공</td>
                      <td className="py-3 px-4 text-center bg-purple-50">채색 전공</td>
                      <td className="py-3 px-4 text-center bg-green-50">포트폴리오</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-4 font-medium">19:00-22:00</td>
                      <td className="py-3 px-4 text-center bg-green-50">개별지도</td>
                      <td className="py-3 px-4 text-center bg-green-50">개별지도</td>
                      <td className="py-3 px-4 text-center bg-green-50">개별지도</td>
                      <td className="py-3 px-4 text-center bg-green-50">개별지도</td>
                      <td className="py-3 px-4 text-center bg-green-50">개별지도</td>
                      <td className="py-3 px-4 text-center">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                  ※ 전공별 집중 수업과 개별 맞춤 지도를 병행합니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 단계별 학습 과정 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">단계별 학습 과정</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center bg-white shadow-lg card-hover">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">1단계: 기초심화</h4>
                <p className="text-sm text-slate-600 mb-4">
                  전공별 기초 실력 점검 및 보완
                </p>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">2-3개월</Badge>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg card-hover">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">2단계: 전공심화</h4>
                <p className="text-sm text-slate-600 mb-4">
                  전공별 고급 기법 및 표현력 향상
                </p>
                <Badge variant="outline" className="bg-green-50 text-green-700">4-5개월</Badge>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg card-hover">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">3단계: 개성개발</h4>
                <p className="text-sm text-slate-600 mb-4">
                  창의적 표현력 및 개성 있는 작품 세계
                </p>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">3-4개월</Badge>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg card-hover">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">4단계: 실전완성</h4>
                <p className="text-sm text-slate-600 mb-4">
                  모의고사 및 최종 입시 완벽 대비
                </p>
                <Badge variant="outline" className="bg-orange-50 text-orange-700">2-3개월</Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 최신 공지사항 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">예고 입시 최신 정보</h3>
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-3 text-primary" />
                공지사항
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg cursor-pointer">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-3 text-xs">{announcement.id}</Badge>
                      <span className="text-slate-900 hover:text-primary transition-colors">
                        {announcement.title}
                      </span>
                    </div>
                    <span className="text-sm text-slate-500">{announcement.author}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline">더 많은 공지사항 보기</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 입시 일정 */}
        <section className="mb-16">
          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-slate-50">
              <CardTitle className="text-center text-2xl flex items-center justify-center">
                <Clock className="mr-3 text-primary" />
                2025년 선화예고 입시 일정
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-slate-900 mb-4">주요 일정</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium">원서 접수</span>
                      <Badge className="bg-blue-100 text-blue-800">10월 말</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium">실기 고사</span>
                      <Badge className="bg-green-100 text-green-800">11월 중순</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium">면접 고사</span>
                      <Badge className="bg-purple-100 text-purple-800">11월 말</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium">합격 발표</span>
                      <Badge className="bg-orange-100 text-orange-800">12월 초</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-slate-900 mb-4">준비 사항</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-slate-700">학교생활기록부 및 자기소개서</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-slate-700">포트폴리오 (15-20점)</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-slate-700">전공별 실기 도구 준비</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-slate-700">면접 준비 (전공 관련 지식, 진로 계획)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-primary text-white">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4">예고 입시 전문 상담</h3>
              <p className="text-xl text-orange-100 mb-8">
                전공별 맞춤 상담과 체계적인 입시 전략을 제공합니다
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
                  전공별 상담 신청
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
                  포트폴리오 첨삭 상담
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}