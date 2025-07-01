import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { GraduationCap, Calendar, BookOpen, Users, Star, Clock, ArrowRight, Target, Award, Phone } from "lucide-react";
import heroImage from "@assets/스크린샷 2025-06-25 222106_1750857872681.png";

export default function Entrance() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden">
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
            <h2 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">입시정보</h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-4 drop-shadow-lg">
              30년 전통의 선화 예중/예고 입시 전문 교육
            </p>
            <p className="text-lg text-orange-100 drop-shadow-lg">
              대한민국을 대표하는 실기력으로 학생들의 꿈을 실현합니다
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 입시 과정 메인 카드 */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* 예중 입시 */}
          <Card className="bg-white shadow-xl border-0 overflow-hidden card-hover">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-1">
              <div className="bg-white p-6">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <GraduationCap className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-slate-900">예중 입시과정</CardTitle>
                        <p className="text-slate-600 text-sm">Art Middle School Entrance</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">중학교</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-slate-700 leading-relaxed">
                      예술중학교 진학을 위한 체계적인 입시 준비 과정입니다. 
                      기초부터 탄탄하게 실력을 쌓아 올립니다.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3 my-6">
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="text-xs text-slate-500 mb-1">주요 과목</div>
                        <div className="text-sm font-medium text-slate-900">기초소묘, 수채화</div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="text-xs text-slate-500 mb-1">준비기간</div>
                        <div className="text-sm font-medium text-slate-900">6개월~1년</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-slate-600">개인별 맞춤 포트폴리오 제작</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-slate-600">실기 기초부터 완성까지 체계적 교육</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-slate-600">선화예중 입시 전문 커리큘럼</span>
                      </div>
                    </div>

                    <Link href="/middle-school">
                      <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                        예중 입시정보 자세히 보기
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>

          {/* 예고 입시 */}
          <Card className="bg-white shadow-xl border-0 overflow-hidden card-hover">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-1">
              <div className="bg-white p-6">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                        <Star className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-slate-900">예고 입시과정</CardTitle>
                        <p className="text-slate-600 text-sm">Art High School Entrance</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">고등학교</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-slate-700 leading-relaxed">
                      예술고등학교 진학을 위한 전문적이고 심화된 입시 준비 과정입니다. 
                      고급 기법과 창의적 표현력을 키웁니다.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3 my-6">
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="text-xs text-slate-500 mb-1">주요 과목</div>
                        <div className="text-sm font-medium text-slate-900">소묘, 채색, 조소</div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="text-xs text-slate-500 mb-1">준비기간</div>
                        <div className="text-sm font-medium text-slate-900">1년~2년</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        <span className="text-slate-600">전공별 세분화된 실기 교육</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        <span className="text-slate-600">개성 있는 작품 세계 구축</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        <span className="text-slate-600">선화예고 합격 전문 프로그램</span>
                      </div>
                    </div>

                    <Link href="/high-school">
                      <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                        예고 입시정보 자세히 보기
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>

        {/* 선과색미술학원의 강점 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">선과색미술학원의 강점</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              30년 전통과 노하우로 학생들의 성공적인 입시를 책임집니다
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center bg-white shadow-lg card-hover border-0">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">30년 전통</h4>
                <p className="text-sm text-slate-600">
                  오랜 경험과 축적된 노하우로 검증된 교육 시스템
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg card-hover border-0">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">전문 교육</h4>
                <p className="text-sm text-slate-600">
                  선화 예중/예고 입시만을 위한 특화된 맞춤 교육
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg card-hover border-0">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">전문 강사진</h4>
                <p className="text-sm text-slate-600">
                  홍익대 출신의 전문 강사진과 개별 맞춤 지도
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg card-hover border-0">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">체계적 커리큘럼</h4>
                <p className="text-sm text-slate-600">
                  기초부터 완성까지 단계별 체계적인 교육 과정
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 입시 일정 안내 */}
        <section className="mb-16">
          <Card className="bg-white shadow-lg border-0">
            <CardHeader className="bg-slate-50">
              <CardTitle className="text-center text-2xl flex items-center justify-center">
                <Calendar className="mr-3 text-primary" />
                입시 일정 안내
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    예중 입시 일정
                  </h4>
                  <div className="space-y-3 text-slate-700">
                    <div className="flex justify-between">
                      <span>원서접수</span>
                      <span className="font-medium">12월 중순</span>
                    </div>
                    <div className="flex justify-between">
                      <span>실기고사</span>
                      <span className="font-medium">1월 초</span>
                    </div>
                    <div className="flex justify-between">
                      <span>합격발표</span>
                      <span className="font-medium">1월 중순</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    예고 입시 일정
                  </h4>
                  <div className="space-y-3 text-slate-700">
                    <div className="flex justify-between">
                      <span>원서접수</span>
                      <span className="font-medium">10월 말</span>
                    </div>
                    <div className="flex justify-between">
                      <span>실기고사</span>
                      <span className="font-medium">11월 중순</span>
                    </div>
                    <div className="flex justify-between">
                      <span>합격발표</span>
                      <span className="font-medium">12월 초</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-800 text-center">
                  <strong>※ 주의사항:</strong> 입시 일정은 해당 학교 사정에 따라 변경될 수 있으니, 정확한 일정은 각 학교 홈페이지를 확인해주세요.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-primary text-white border-0 shadow-xl">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4">입시 상담 받아보세요</h3>
              <p className="text-xl text-orange-100 mb-8">
                30년 노하우로 학생 개별 맞춤 상담을 제공합니다
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
                  <Phone className="mr-2 h-5 w-5" />
                  전화 상담 신청
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
                  <Clock className="mr-2 h-5 w-5" />
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