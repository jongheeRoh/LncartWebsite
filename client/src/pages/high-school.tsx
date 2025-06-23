import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Users, Target, CheckCircle, Clock, Palette } from "lucide-react";

export default function HighSchool() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">예고 입시정보</h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              예술고등학교 입시를 위한 전문적이고 심화된 교육과정
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
                  예술고등학교 입시는 보다 전문적이고 심화된 미술 실기 능력을 요구합니다.
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
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">실기고사</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">정밀소묘, 디자인, 전공실기</p>
                <Badge variant="outline">배점: 70%</Badge>
              </CardContent>
            </Card>

            <Card className="text-center card-hover">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">포트폴리오</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">전문성 있는 작품집</p>
                <Badge variant="outline">배점: 20%</Badge>
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
                <p className="text-slate-600 mb-4">전공 이해도 및 의지</p>
                <Badge variant="outline">배점: 10%</Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 전공별 실기 과목 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">전공별 실기 과목</h3>
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-3 text-primary" />
                  회화과
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">주요 실기</h4>
                    <ul className="space-y-2 text-slate-600">
                      <li>• 정밀소묘 (석고상, 인물)</li>
                      <li>• 수채화 (정물, 풍경)</li>
                      <li>• 유화 기초</li>
                      <li>• 창작 표현</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">평가 포인트</h4>
                    <ul className="space-y-2 text-slate-600">
                      <li>• 정확한 형태 묘사</li>
                      <li>• 색채 감각과 조화</li>
                      <li>• 회화적 표현력</li>
                      <li>• 개성과 창의성</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-3 text-primary" />
                  디자인과
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">주요 실기</h4>
                    <ul className="space-y-2 text-slate-600">
                      <li>• 기초디자인</li>
                      <li>• 발상과 표현</li>
                      <li>• 평면구성</li>
                      <li>• 색채구성</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">평가 포인트</h4>
                    <ul className="space-y-2 text-slate-600">
                      <li>• 창의적 발상력</li>
                      <li>• 조형 감각</li>
                      <li>• 색채 활용 능력</li>
                      <li>• 완성도와 정확성</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-3 text-primary" />
                  조소과
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">주요 실기</h4>
                    <ul className="space-y-2 text-slate-600">
                      <li>• 소묘 (석고상, 인물)</li>
                      <li>• 조소 실기 (점토)</li>
                      <li>• 입체 표현</li>
                      <li>• 공간 감각</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">평가 포인트</h4>
                    <ul className="space-y-2 text-slate-600">
                      <li>• 입체적 표현력</li>
                      <li>• 공간 이해도</li>
                      <li>• 조형 감각</li>
                      <li>• 기법 숙련도</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 학습 단계 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">단계별 학습 과정</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <CardTitle className="text-lg">기초 다지기</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  기본 소묘 기법과 조형 원리 습득
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <CardTitle className="text-lg">기법 향상</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  전공별 전문 기법과 표현력 개발
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <CardTitle className="text-lg">창작 역량</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  개성 있는 작품 세계 구축
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">4</span>
                </div>
                <CardTitle className="text-lg">입시 완성</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  실전 대비와 최종 완성도 향상
                </p>
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
                예고반 수업 시간표
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
                      <td className="border border-slate-300 p-3 text-center">정밀소묘</td>
                      <td className="border border-slate-300 p-3 text-center">디자인</td>
                      <td className="border border-slate-300 p-3 text-center">회화실기</td>
                      <td className="border border-slate-300 p-3 text-center">조소실기</td>
                      <td className="border border-slate-300 p-3 text-center">포트폴리오</td>
                      <td className="border border-slate-300 p-3 text-center">종합실기</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3 font-semibold">14:00-17:00</td>
                      <td className="border border-slate-300 p-3 text-center">디자인</td>
                      <td className="border border-slate-300 p-3 text-center">정밀소묘</td>
                      <td className="border border-slate-300 p-3 text-center">색채구성</td>
                      <td className="border border-slate-300 p-3 text-center">회화실기</td>
                      <td className="border border-slate-300 p-3 text-center">전공심화</td>
                      <td className="border border-slate-300 p-3 text-center">개별지도</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3 font-semibold">18:00-21:00</td>
                      <td className="border border-slate-300 p-3 text-center">회화실기</td>
                      <td className="border border-slate-300 p-3 text-center">조소실기</td>
                      <td className="border border-slate-300 p-3 text-center">개별지도</td>
                      <td className="border border-slate-300 p-3 text-center">디자인</td>
                      <td className="border border-slate-300 p-3 text-center">창작활동</td>
                      <td className="border border-slate-300 p-3 text-center bg-slate-100">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 입시 준비 팁 */}
        <section className="mb-16">
          <Card className="bg-slate-100">
            <CardHeader>
              <CardTitle className="text-2xl text-center">예고 입시 준비 팁</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-lg mb-4 text-primary">실기 준비</h4>
                  <ul className="space-y-3 text-slate-600">
                    <li>• 기초 실력을 탄탄히 쌓은 후 전공별 특화 기법 습득</li>
                    <li>• 꾸준한 연습을 통한 안정적인 실력 유지</li>
                    <li>• 다양한 주제와 재료에 대한 경험 쌓기</li>
                    <li>• 시간 내 완성할 수 있는 속도감 기르기</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-4 text-primary">포트폴리오</h4>
                  <ul className="space-y-3 text-slate-600">
                    <li>• 개성과 창의성이 돋보이는 작품 선별</li>
                    <li>• 전공 분야의 전문성 어필</li>
                    <li>• 작품의 완성도와 통일성 유지</li>
                    <li>• 작품에 대한 명확한 설명 준비</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 상담 신청 */}
        <section>
          <Card className="bg-primary text-white text-center">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">예고 입시 전문 상담</h3>
              <p className="text-orange-100 mb-6">
                전공별 맞춤 상담을 통해 체계적인 예고 입시 전략을 수립하세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
                  전화 상담 신청
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
                  포트폴리오 진단
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}