import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Users, Award, Target, GraduationCap, Star } from "lucide-react";
import heroImage from "/academy-hero-bg.png";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative text-white py-16 overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">학원 소개</h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto drop-shadow-lg">
              지난 30년간 선화 예중, 예고 입시를 전문적으로 운영하였습니다.
            </p>
            <p className="text-lg text-orange-100 mt-4 drop-shadow-lg">
              대한민국을 대표하는 실기력이라 자신합니다!
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 학원 소개 */}
        <section className="mb-16">
          <Card className="bg-white shadow-lg">
            <CardContent className="text-center py-12">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold text-slate-900 mb-8">
                  학생들의 미래를 만들어 가는 학원!
                </h3>
                <p className="text-2xl text-primary font-semibold mb-6">
                  아트 일번지, 선과색미술학원 입니다.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  지난 30년간 축적된 노하우와 전문적인 교육 시스템으로 
                  학생들의 예술적 재능을 최대한 발휘할 수 있도록 지도하고 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 원장 및 부원장 소개 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">원장 및 부원장 소개</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* 원장 */}
            <Card className="bg-white shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-slate-900">원장 노종성</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="max-w-3xl mx-auto space-y-4">
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                      <GraduationCap className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-3 text-slate-700">
                    <div className="font-semibold text-lg">
                      <span className="inline-block bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs mr-2">1990</span>
                      홍익대학교 서양학과 졸업, 동대학원 졸업
                    </div>
                    <div>
                      <span className="inline-block bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs mr-2">1990~현재</span>
                      전) 다나미술학원 원장(홍대앞, 중랑)
                    </div>
                    <div className="font-semibold text-primary">
                      현) 선과색미술학원 원장
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 부원장 */}
            <Card className="bg-white shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-slate-900">부원장 이도영</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="max-w-3xl mx-auto space-y-4">
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                      <Star className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-3 text-slate-700">
                    <div className="font-semibold text-lg">
                      <span className="inline-block bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs mr-2">2002</span>
                      홍익대학교 서양학과 졸업
                    </div>
                    <div>
                      <span className="inline-block bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs mr-2">경력</span>
                      입시반 지도 15년 경력
                    </div>
                    <div>전) 다나미술학원 부원장</div>
                    <div className="font-semibold text-primary">
                      현) 선과색미술학원 부원장
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 전임 강사진 소개 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">전임 강사진</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* 윤준식 선생님 */}
            <Card className="bg-white shadow-lg card-hover">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-slate-900">윤준식 선생님</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-slate-600 font-medium">
                    현, 선과색미술학원 예중, 예고반 지도
                  </p>
                  <div className="space-y-2 text-sm text-slate-700">
                    <p>성균관대학교 회화과 졸업</p>
                    <p>선화예고 졸업</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 송윤주 선생님 */}
            <Card className="bg-white shadow-lg card-hover">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-slate-900">송윤주 선생님</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-slate-600 font-medium">
                    현, 선과색미술학원 근무
                  </p>
                  <div className="space-y-2 text-sm text-slate-700">
                    <p>이화여자대학교 대학원 예술학 전공</p>
                    <p>세종대학교 회화과 졸업</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 이정빈 선생님 */}
            <Card className="bg-white shadow-lg card-hover">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-slate-900">이정빈 선생님</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-slate-600 font-medium">
                    현, 선과색미술학원 근무
                  </p>
                  <div className="space-y-2 text-sm text-slate-700">
                    <p>이화여자대학교 졸업, 동대학원 재학</p>
                    <p>선화예중, 예고 졸업</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 학원 특징 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">학원 특징</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center card-hover">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">30년 전통</h4>
                <p className="text-slate-600">
                  지난 30년간 축적된 입시 노하우와 전문적인 교육 시스템
                </p>
              </CardContent>
            </Card>

            <Card className="text-center card-hover">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">전문 교육</h4>
                <p className="text-slate-600">
                  선화 예중, 예고 입시 전문으로 체계적인 맞춤형 교육
                </p>
              </CardContent>
            </Card>

            <Card className="text-center card-hover">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">전문 강사진</h4>
                <p className="text-slate-600">
                  풍부한 경험과 실력을 갖춘 전임 강사진의 개별 맞춤 지도
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Creative Talent Education Video Section */}
        <section className="py-24 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">창의적</span>
                <br />
                <span className="text-gray-900">재능교육</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                학생들의 창의적 재능을 발굴하고 키워주는 선과색미술학원의 특별한 교육 과정을 확인해보세요.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <Card className="card-hover bg-white border-0 shadow-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-900 rounded-t-xl overflow-hidden relative">
                    <iframe
                      src="https://www.youtube.com/embed/p_r6sLXDuJs?rel=0&modestbranding=1&showinfo=0"
                      className="absolute inset-0 w-full h-full object-cover"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="창의적 재능교육 영상"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        border: 'none',
                        display: 'block'
                      }}
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">창의적 재능교육</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      개별 학생의 특성과 재능을 파악하여 맞춤형 교육을 제공하며,
                      창의적 사고력과 예술적 감성을 동시에 키워나가는 교육 과정입니다.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">창의성 개발</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">개별 맞춤 교육</span>
                      <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">재능 발굴</span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">예술적 감성</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}