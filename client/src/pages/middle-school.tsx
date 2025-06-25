import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Users, Target, CheckCircle, Clock, Award, Palette, FileText, Trophy } from "lucide-react";

export default function MiddleSchool() {
  const announcements = [
    { id: 23, title: "[실기대회] 2025선화미술실기대회 수상자", author: "관리자" },
    { id: 22, title: "[재현작] 2025 선화예중 재현작", author: "관리자" },
    { id: 21, title: "[합격자] 2025선화예중 합격자", author: "관리자" },
    { id: 20, title: "[출제문제] 2025 선화예중 출제문제", author: "관리자" },
    { id: 19, title: "[방학특강] 예중대비 여름방학특강 선과색미술학원", author: "관리자" },
    { id: 18, title: "[입시요강]2025 선화예술중학교 입시요강", author: "관리자" },
    { id: 17, title: "[방학특강] 2024 선화예중 입시 안내", author: "관리자" },
    { id: 16, title: "[실기대회] 2023 선화 미술대회 시상식", author: "관리자" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">예중 입시정보</h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              선화예술중학교 입시를 위한 체계적이고 전문적인 교육과정
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 예중 입시 개요 */}
        <section className="mb-16">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">예중 입시 개요</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center max-w-4xl mx-auto">
                <p className="text-lg text-slate-700 mb-6">
                  선화예술중학교 입시는 학생의 예술적 재능과 잠재력을 평가하는 전형입니다.
                </p>
                <p className="text-slate-600 mb-4">
                  기초적인 미술 실기 능력과 창의성, 표현력을 종합적으로 평가하며, 
                  체계적인 준비를 통해 충분히 도전할 수 있습니다.
                </p>
                <p className="text-slate-600">
                  선과색미술학원에서는 예중 입시를 위한 전문적인 교육과정을 통해 
                  학생들의 성공적인 입시를 지원합니다.
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
                  학교생활기록부 및 자기소개서
                </p>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">30%</Badge>
              </CardContent>
            </Card>

            <Card className="text-center card-hover">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">실기전형</h4>
                <p className="text-slate-600 text-sm mb-4">
                  기초소묘 및 수채화 실기고사
                </p>
                <Badge variant="outline" className="bg-green-50 text-green-700">50%</Badge>
              </CardContent>
            </Card>

            <Card className="text-center card-hover">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">면접전형</h4>
                <p className="text-slate-600 text-sm mb-4">
                  예술적 소양 및 학습의지 평가
                </p>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">20%</Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 실기 과목 상세 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">실기 과목</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="mr-3 text-blue-600" />
                  기초소묘
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-600">
                    정물화를 중심으로 한 기초적인 소묘 능력을 평가합니다.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">형태 관찰력과 표현력</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">명암과 질감 표현</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">비례와 구성력</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-sm text-slate-700">
                      <strong>시험시간:</strong> 3시간<br/>
                      <strong>준비물:</strong> 4절지, 연필(2H~6B), 지우개
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="mr-3 text-purple-600" />
                  수채화
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-600">
                    색채 감각과 조형 능력을 종합적으로 평가합니다.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">색채 감각과 조화</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">수채화 기법 활용</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">창의적 표현력</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-sm text-slate-700">
                      <strong>시험시간:</strong> 3시간<br/>
                      <strong>준비물:</strong> 4절지, 수채화 도구 일체
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 수업 시간표 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">예중반 수업 시간표</h3>
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
                      <td className="py-3 px-4 font-medium">09:00-12:00</td>
                      <td className="py-3 px-4 text-center bg-blue-50">기초소묘</td>
                      <td className="py-3 px-4 text-center">-</td>
                      <td className="py-3 px-4 text-center bg-blue-50">기초소묘</td>
                      <td className="py-3 px-4 text-center">-</td>
                      <td className="py-3 px-4 text-center bg-blue-50">기초소묘</td>
                      <td className="py-3 px-4 text-center bg-purple-50">포트폴리오</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-4 font-medium">13:00-16:00</td>
                      <td className="py-3 px-4 text-center bg-purple-50">수채화</td>
                      <td className="py-3 px-4 text-center">-</td>
                      <td className="py-3 px-4 text-center bg-purple-50">수채화</td>
                      <td className="py-3 px-4 text-center">-</td>
                      <td className="py-3 px-4 text-center bg-purple-50">수채화</td>
                      <td className="py-3 px-4 text-center bg-green-50">개별지도</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-4 font-medium">17:00-20:00</td>
                      <td className="py-3 px-4 text-center bg-green-50">개별지도</td>
                      <td className="py-3 px-4 text-center">-</td>
                      <td className="py-3 px-4 text-center bg-green-50">개별지도</td>
                      <td className="py-3 px-4 text-center">-</td>
                      <td className="py-3 px-4 text-center bg-green-50">개별지도</td>
                      <td className="py-3 px-4 text-center">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                  ※ 수업 시간은 학생 개별 상황에 따라 조정 가능합니다.
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
                <h4 className="text-lg font-semibold text-slate-900 mb-2">1단계: 기초</h4>
                <p className="text-sm text-slate-600 mb-4">
                  기초 소묘 및 관찰력 향상
                </p>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">1-2개월</Badge>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg card-hover">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">2단계: 발전</h4>
                <p className="text-sm text-slate-600 mb-4">
                  수채화 기법 및 색채 감각 개발
                </p>
                <Badge variant="outline" className="bg-green-50 text-green-700">2-3개월</Badge>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg card-hover">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">3단계: 완성</h4>
                <p className="text-sm text-slate-600 mb-4">
                  포트폴리오 제작 및 개성 표현
                </p>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">2-3개월</Badge>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg card-hover">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">4단계: 실전</h4>
                <p className="text-sm text-slate-600 mb-4">
                  모의고사 및 입시 최종 준비
                </p>
                <Badge variant="outline" className="bg-orange-50 text-orange-700">1-2개월</Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 최신 공지사항 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">예중 입시 최신 정보</h3>
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
                2025년 선화예중 입시 일정
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-slate-900 mb-4">주요 일정</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium">원서 접수</span>
                      <Badge className="bg-blue-100 text-blue-800">12월 중순</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium">실기 고사</span>
                      <Badge className="bg-green-100 text-green-800">1월 초</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium">면접 고사</span>
                      <Badge className="bg-purple-100 text-purple-800">1월 중순</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium">합격 발표</span>
                      <Badge className="bg-orange-100 text-orange-800">1월 말</Badge>
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
                      <span className="text-slate-700">포트폴리오 (10점 내외)</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-slate-700">실기 도구 일체</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-slate-700">면접 준비 (예술관, 진로 계획)</span>
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
              <h3 className="text-3xl font-bold mb-4">예중 입시 상담 받아보세요</h3>
              <p className="text-xl text-orange-100 mb-8">
                30년 노하우로 학생 개별 맞춤 상담을 제공합니다
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
                  상담 신청하기
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
                  작품 포트폴리오 상담
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}