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