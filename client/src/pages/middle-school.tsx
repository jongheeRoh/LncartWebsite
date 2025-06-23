import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Users, Target, CheckCircle, Clock } from "lucide-react";

export default function MiddleSchool() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">예중 입시정보</h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              예술중학교 입시를 위한 체계적이고 전문적인 교육과정
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
                  예술중학교 입시는 학생의 예술적 재능과 잠재력을 평가하는 전형입니다.
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
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">실기고사</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">기초소묘, 수채화, 상상화 등</p>
                <Badge variant="outline">배점: 60%</Badge>
              </CardContent>
            </Card>

            <Card className="text-center card-hover">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">포트폴리오</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">개인 작품집 평가</p>
                <Badge variant="outline">배점: 30%</Badge>
              </CardContent>
            </Card>

            <Card className="text-center card-hover">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">면접</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">예술적 소양 및 의지</p>
                <Badge variant="outline">배점: 10%</Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 실기 과목별 안내 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">실기 과목별 안내</h3>
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-3 text-primary" />
                  기초소묘
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">주요 내용</h4>
                    <ul className="space-y-2 text-slate-600">
                      <li>• 정물 소묘 (기본 도형, 정물 조합)</li>
                      <li>• 명암 표현과 질감 묘사</li>
                      <li>• 비례와 형태 정확성</li>
                      <li>• 구도와 화면 구성</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">평가 요소</h4>
                    <ul className="space-y-2 text-slate-600">
                      <li>• 관찰력과 표현력</li>
                      <li>• 비례의 정확성</li>
                      <li>• 명암 처리 능력</li>
                      <li>• 완성도</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-3 text-primary" />
                  수채화
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">주요 내용</h4>
                    <ul className="space-y-2 text-slate-600">
                      <li>• 정물 수채화</li>
                      <li>• 색채 조화와 대비</li>
                      <li>• 수채화 기법 활용</li>
                      <li>• 색감과 톤 표현</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">평가 요소</h4>
                    <ul className="space-y-2 text-slate-600">
                      <li>• 색채 감각</li>
                      <li>• 수채화 기법 숙련도</li>
                      <li>• 조형 감각</li>
                      <li>• 창의적 표현</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-3 text-primary" />
                  상상화
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">주요 내용</h4>
                    <ul className="space-y-2 text-slate-600">
                      <li>• 주제 표현</li>
                      <li>• 창의적 구성</li>
                      <li>• 상상력 발휘</li>
                      <li>• 자유로운 표현</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">평가 요소</h4>
                    <ul className="space-y-2 text-slate-600">
                      <li>• 창의성과 독창성</li>
                      <li>• 주제 이해도</li>
                      <li>• 표현 능력</li>
                      <li>• 화면 구성력</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 준비 일정 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">연간 준비 일정</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">3-6월</CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-2">기초 다지기</h4>
                <p className="text-sm text-slate-600">기본 소묘, 수채화 기초 기법 습득</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">7-9월</CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-2">실력 향상</h4>
                <p className="text-sm text-slate-600">다양한 주제 연습, 포트폴리오 제작</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">10-11월</CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-2">심화 과정</h4>
                <p className="text-sm text-slate-600">고난도 작품 연습, 개인별 집중 지도</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">12-2월</CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-2">입시 실전</h4>
                <p className="text-sm text-slate-600">모의고사, 실전 연습, 최종 점검</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 수업 시간표 */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center">
                <Clock className="mr-3" />
                예중반 수업 시간표
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-300 p-3 text-left">시간</th>
                      <th className="border border-slate-300 p-3 text-center">월</th>
                      <th className="border border-slate-300 p-3 text-center">화</th>
                      <th className="border border-slate-300 p-3 text-center">수</th>
                      <th className="border border-slate-300 p-3 text-center">목</th>
                      <th className="border border-slate-300 p-3 text-center">금</th>
                      <th className="border border-slate-300 p-3 text-center">토</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 p-3 font-semibold">09:00-12:00</td>
                      <td className="border border-slate-300 p-3 text-center">기초소묘</td>
                      <td className="border border-slate-300 p-3 text-center">수채화</td>
                      <td className="border border-slate-300 p-3 text-center">기초소묘</td>
                      <td className="border border-slate-300 p-3 text-center">상상화</td>
                      <td className="border border-slate-300 p-3 text-center">포트폴리오</td>
                      <td className="border border-slate-300 p-3 text-center">종합실기</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3 font-semibold">14:00-17:00</td>
                      <td className="border border-slate-300 p-3 text-center">수채화</td>
                      <td className="border border-slate-300 p-3 text-center">기초소묘</td>
                      <td className="border border-slate-300 p-3 text-center">수채화</td>
                      <td className="border border-slate-300 p-3 text-center">기초소묘</td>
                      <td className="border border-slate-300 p-3 text-center">상상화</td>
                      <td className="border border-slate-300 p-3 text-center">개별지도</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3 font-semibold">18:00-21:00</td>
                      <td className="border border-slate-300 p-3 text-center">상상화</td>
                      <td className="border border-slate-300 p-3 text-center">포트폴리오</td>
                      <td className="border border-slate-300 p-3 text-center">개별지도</td>
                      <td className="border border-slate-300 p-3 text-center">수채화</td>
                      <td className="border border-slate-300 p-3 text-center">개별지도</td>
                      <td className="border border-slate-300 p-3 text-center bg-slate-100">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 상담 신청 */}
        <section>
          <Card className="bg-primary text-white text-center">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">예중 입시 상담 신청</h3>
              <p className="text-orange-100 mb-6">
                개인별 맞춤 상담을 통해 체계적인 입시 준비 계획을 세워보세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
                  전화 상담 신청
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
                  방문 상담 예약
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}