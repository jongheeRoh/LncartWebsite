import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Palette, Trophy, Target, GraduationCap, Star, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section - Starry Style */}
      <section className="relative overflow-hidden">
        <div className="gradient-bg-alt absolute inset-0 opacity-10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <div className="mb-8">
              <Badge className="gradient-bg text-white border-0 px-6 py-2 text-sm font-medium mb-6 floating-animation">
                30년 전통의 예술 교육
              </Badge>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
              <span className="gradient-text">예술적 재능을</span>
              <br />
              <span className="text-gray-900">현실로 만들다</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              선과색미술학원은 지난 30년간 선화 예중, 예고 입시를 전문적으로 운영하며 
              <br className="hidden md:block" />
              대한민국을 대표하는 실기력으로 학생들의 꿈을 실현시켜왔습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/middle-school">
                <Button 
                  size="lg" 
                  className="gradient-bg hover:opacity-90 text-white border-0 px-8 py-6 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  예중 입시정보 보기
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/high-school">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-purple-200 hover:border-purple-300 px-8 py-6 text-lg font-semibold rounded-2xl hover:bg-purple-50 transition-all duration-300"
                >
                  예고 입시정보 보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview - Starry Style */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">예술 교육,</span>
              <br />
              <span className="text-gray-900">새로운 차원으로</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              체계적인 커리큘럼과 전문적인 지도로 학생들의 무한한 잠재력을 발굴합니다.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-hover bg-white border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="mx-auto w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6 floating-animation">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">입시 성과</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">30년간 쌓아온 노하우로 매년 우수한 입시 성과를 자랑합니다.</p>
                <Link href="/notices">
                  <Button 
                    className="gradient-bg text-white border-0 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
                  >
                    성과 보기
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="card-hover bg-white border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="mx-auto w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6 floating-animation" style={{animationDelay: '1s'}}>
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">작품 갤러리</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">학생들의 창의적이고 우수한 작품들을 만나보세요.</p>
                <Link href="/gallery">
                  <Button 
                    variant="outline"
                    className="border-2 border-purple-200 hover:border-purple-300 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all"
                  >
                    갤러리 보기
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="card-hover bg-white border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="mx-auto w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mb-6 floating-animation" style={{animationDelay: '2s'}}>
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">찾아오기</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">학원 위치와 교통편 정보를 상세히 안내해드립니다.</p>
                <Link href="/directions">
                  <Button 
                    variant="outline"
                    className="border-2 border-purple-200 hover:border-purple-300 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all"
                  >
                    위치 보기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Academy Video Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-blue-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">학원을</span>
              <br />
              <span className="text-gray-900">직접 만나보세요</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              선과색미술학원의 생생한 교육 현장과 학생들의 열정적인 작품 활동을 영상으로 확인하세요.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <Card className="card-hover bg-white border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-900 rounded-t-xl overflow-hidden relative">
                  <iframe
                    src="https://www.youtube.com/embed/wcq3v3sydzA"
                    className="absolute inset-0 w-full h-full object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="선과색미술학원 소개 영상"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      border: 'none',
                      display: 'block'
                    }}
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">선과색미술학원 소개영상</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    30년 전통의 선과색미술학원에서 이루어지는 체계적인 교육과정과 
                    학생들의 꿈을 현실로 만드는 과정을 영상으로 만나보세요.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">예중입시</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">예고입시</span>
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">실기교육</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">포트폴리오</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Entrance Exam Section */}
      <section className="py-24 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              입시 준비,
              <br />
              완벽하게 지원합니다
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              예중, 예고 입시의 모든 과정을 체계적으로 관리하고 최적의 결과를 만들어냅니다.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-hover bg-white/95 backdrop-blur border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                    <GraduationCap className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">예중 입시정보</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  선화예중을 중심으로 한 중학교 예술 특기자 전형 정보와 준비 방법을 제공합니다.
                </p>
                <Link href="/middle-school-roadmap">
                  <Button 
                    className="w-full gradient-bg text-white border-0 py-3 rounded-xl font-semibold hover:opacity-90 transition-all mb-3"
                  >
                    예중 입시로드맵 보기
                  </Button>
                </Link>
                <Link href="/middle-school">
                  <Button 
                    variant="outline"
                    className="w-full border-2 border-purple-200 hover:border-purple-300 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all"
                  >
                    예중 입시정보 보기
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="card-hover bg-white/95 backdrop-blur border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">예고 입시정보</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  선화예고를 비롯한 고등학교 예술 특기자 전형 정보와 실기 준비 가이드를 제공합니다.
                </p>
                <Link href="/high-school-roadmap">
                  <Button 
                    className="w-full gradient-bg text-white border-0 py-3 rounded-xl font-semibold hover:opacity-90 transition-all mb-3"
                  >
                    예고 입시로드맵 보기
                  </Button>
                </Link>
                <Link href="/high-school">
                  <Button 
                    variant="outline"
                    className="w-full border-2 border-purple-200 hover:border-purple-300 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all"
                  >
                    예고 입시정보 보기
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">숫자로 보는</span>
              <br />
              <span className="text-gray-900">선과색의 성과</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">30+</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">년의 전통</div>
              <div className="text-gray-600">축적된 입시 노하우</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">100+</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">합격생 배출</div>
              <div className="text-gray-600">매년 우수한 성과</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">95%</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">만족도</div>
              <div className="text-gray-600">학생 및 학부모</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">학습 지원</div>
              <div className="text-gray-600">언제나 함께</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">지금 시작하세요</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            꿈을 현실로 만드는 첫 걸음을 선과색미술학원과 함께하세요.
          </p>
          <Link href="/about">
            <Button 
              size="lg"
              className="gradient-bg text-white border-0 px-12 py-6 text-xl font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              학원 소개 보기
              <ChevronRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}