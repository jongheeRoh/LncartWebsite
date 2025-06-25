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