import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Users, Award, Target } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">학원 소개</h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              선과색미술학원은 예중/예고, 미대입시 전문학원으로 체계적인 교육을 통해 학생들의 꿈을 실현합니다
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 원장 인사말 */}
        <section className="mb-16">
          <Card className="bg-white shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-slate-900 mb-4">원장 인사말</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  안녕하십니까. 선과색미술학원 원장입니다.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  저희 선과색미술학원은 예술을 꿈꾸는 학생들의 소중한 꿈을 현실로 만들어가는 곳입니다. 
                  20여 년간 미술 교육에 몸담아 온 경험을 바탕으로, 학생 한 명 한 명의 개성과 재능을 
                  발견하고 키워나가는 것이 저희의 사명입니다.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  예중, 예고, 미대 입시는 단순히 시험을 통과하는 것이 아닙니다. 
                  학생 개개인의 예술적 감성과 창의력을 기르고, 체계적인 기법을 익혀 
                  진정한 예술가로 성장해 나가는 과정입니다.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  저희는 소수정예 맞춤형 교육을 통해 학생들이 자신만의 독창적인 작품 세계를 
                  구축할 수 있도록 최선을 다하겠습니다. 학생들의 밝은 미래를 위해 
                  항상 노력하는 선과색미술학원이 되겠습니다.
                </p>
                <div className="mt-8">
                  <p className="text-right text-lg font-semibold text-primary">
                    선과색미술학원 원장 <span className="ml-2">김○○</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 학원 특징 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">학원 특징</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center card-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-3">소수정예 교육</h4>
                <p className="text-slate-600">
                  개인별 맞춤 지도를 통해 학생 개개인의 특성과 장점을 살려나가는 체계적 교육시스템
                </p>
              </CardContent>
            </Card>

            <Card className="text-center card-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-3">우수한 입시 성과</h4>
                <p className="text-slate-600">
                  매년 높은 예중·예고·미대 합격률을 자랑하며 학생들의 꿈을 현실로 만들어가고 있습니다
                </p>
              </CardContent>
            </Card>

            <Card className="text-center card-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-3">체계적 커리큘럼</h4>
                <p className="text-slate-600">
                  기초부터 심화까지 단계별 교육과정을 통해 탄탄한 실력 향상을 보장합니다
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 교육 과정 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">교육 과정</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">예중 입시반</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-3">기초소묘</Badge>
                    <span className="text-sm text-slate-600">형태 관찰력과 표현력</span>
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-3">수채화</Badge>
                    <span className="text-sm text-slate-600">색채 감각과 조형 능력</span>
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-3">상상화</Badge>
                    <span className="text-sm text-slate-600">창의력과 표현력</span>
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-3">포트폴리오</Badge>
                    <span className="text-sm text-slate-600">개성 있는 작품집</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">예고 입시반</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-3">정밀소묘</Badge>
                    <span className="text-sm text-slate-600">고급 표현 기법</span>
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-3">디자인</Badge>
                    <span className="text-sm text-slate-600">창의적 사고 표현</span>
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-3">전공별 심화</Badge>
                    <span className="text-sm text-slate-600">진로별 맞춤 교육</span>
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-3">실기 집중</Badge>
                    <span className="text-sm text-slate-600">입시 실전 연습</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 학원 정보 */}
        <section>
          <Card className="bg-primary text-white">
            <CardHeader>
              <CardTitle className="text-center text-2xl">학원 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <MapPin className="mr-2" />
                    위치 및 연락처
                  </h4>
                  <div className="space-y-2 text-orange-100">
                    <p>서울특별시 강남구 테헤란로 123</p>
                    <p className="flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      02-1234-5678
                    </p>
                    <p>학원등록번호: 제2030호</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <Clock className="mr-2" />
                    운영 시간
                  </h4>
                  <div className="space-y-2 text-orange-100">
                    <p>평일: 오전 9시 ~ 오후 10시</p>
                    <p>토요일: 오전 9시 ~ 오후 6시</p>
                    <p>일요일: 휴무</p>
                    <p>공휴일: 별도 안내</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}