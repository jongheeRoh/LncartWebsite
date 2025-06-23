import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Calendar, BookOpen, Users, Star, Clock } from "lucide-react";

export default function Entrance() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">입시정보</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              예중/예고, 미대입시 전문 교육으로 학생들의 꿈을 실현합니다
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 입시 과정 소개 */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="mr-3 text-primary" />
                예중 입시과정
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-slate-600">
                  예술중학교 진학을 위한 체계적인 입시 준비 과정입니다.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">기초소묘</Badge>
                    <span className="text-sm text-slate-600">형태 관찰력과 표현력 향상</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">수채화</Badge>
                    <span className="text-sm text-slate-600">색채 감각과 조형 능력 개발</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">포트폴리오</Badge>
                    <span className="text-sm text-slate-600">개성 있는 작품집 제작</span>
                  </div>
                </div>
                <Button className="w-full mt-4">자세히 보기</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-3 text-primary" />
                예고 입시과정
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-slate-600">
                  예술고등학교 진학을 위한 전문적인 입시 준비 과정입니다.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">정밀소묘</Badge>
                    <span className="text-sm text-slate-600">고급 표현 기법 습득</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">디자인</Badge>
                    <span className="text-sm text-slate-600">창의적 사고와 표현력</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">전공별 심화</Badge>
                    <span className="text-sm text-slate-600">진로별 맞춤 교육</span>
                  </div>
                </div>
                <Button className="w-full mt-4">자세히 보기</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 입시 일정 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">입시 일정</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="mr-2 text-primary" />
                  3월 ~ 6월
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-2">기초 과정</h4>
                <p className="text-slate-600 text-sm">
                  기본기 다지기 및 입시 준비 시작
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="mr-2 text-primary" />
                  7월 ~ 10월
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-2">심화 과정</h4>
                <p className="text-slate-600 text-sm">
                  전공별 심화 학습 및 포트폴리오 제작
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="mr-2 text-primary" />
                  11월 ~ 2월
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-2">실전 과정</h4>
                <p className="text-slate-600 text-sm">
                  입시 실전 연습 및 최종 점검
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 학원 특징 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">학원 특징</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-xl bg-white card-hover">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">소수정예</h4>
              <p className="text-slate-600 text-sm">개인별 맞춤 지도로 실력 향상</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white card-hover">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">전문 강사진</h4>
              <p className="text-slate-600 text-sm">미대 출신 전문 강사진</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white card-hover">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">체계적 커리큘럼</h4>
              <p className="text-slate-600 text-sm">단계별 체계적 교육 과정</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white card-hover">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">높은 합격률</h4>
              <p className="text-slate-600 text-sm">검증된 입시 노하우</p>
            </div>
          </div>
        </section>

        {/* 학원 정보 */}
        <section>
          <Card className="bg-primary text-white">
            <CardHeader>
              <CardTitle className="text-center text-2xl">학원 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-lg">학원등록번호: 제2030호</p>
                <p className="text-blue-100">
                  예중/예고, 미대입시 전문학원으로 체계적인 교육을 통해<br />
                  학생들의 꿈을 실현해드립니다.
                </p>
                <div className="flex justify-center space-x-4 mt-6">
                  <Button variant="outline" className="bg-white text-primary hover:bg-slate-100">
                    상담 신청
                  </Button>
                  <Button variant="outline" className="bg-white text-primary hover:bg-slate-100">
                    오시는 길
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}