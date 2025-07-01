import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Car, 
  Train, 
  Bus, 
  Navigation
} from "lucide-react";
import heroImage from "/academy-hero-bg.png";

export default function Directions() {
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">오시는길</h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto drop-shadow-lg">
              선과색미술학원 위치 안내 및 교통편 정보
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 대형 지도 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">위치 안내</h3>
          <Card className="bg-white shadow-lg">
            <CardContent className="p-0">
              <div className="w-full h-96 lg:h-[500px] rounded-lg overflow-hidden">
                <iframe
                  src="https://map.naver.com/p/entry/place/18020989?c=16.78,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202506262101&locale=ko&svcName=map_pcv5"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="선과색미술학원 위치"
                />
              </div>
              <div className="p-4 bg-gradient-to-r from-primary/5 to-primary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">선과색미술학원</p>
                    <p className="text-sm text-slate-600">서울특별시 광진구 천호대로 677</p>
                  </div>
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => window.open('https://map.naver.com/p/entry/place/18020989?c=16.78,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202506262101&locale=ko&svcName=map_pcv5', '_blank')}
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    네이버 지도에서 보기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 상세 위치 정보 */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center justify-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  주소
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <p className="font-semibold text-slate-900">서울특별시 광진구 천호대로 677</p>
                <p className="text-slate-600">아차산역 인근</p>
                <p className="text-sm text-slate-500">지하철 5호선 아차산역 하차</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center justify-center">
                  <Phone className="mr-2 h-5 w-5 text-primary" />
                  연락처
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <p className="font-semibold text-slate-900 text-lg">02-453-2379</p>
                <p className="text-slate-600">언제든지 문의하세요</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('tel:02-453-2379')}
                >
                  <Phone className="mr-2 h-3 w-3" />
                  전화걸기
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center justify-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  운영시간
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <p className="font-semibold text-slate-900">평일 09:00 - 22:00</p>
                <p className="text-slate-600">토요일 09:00 - 18:00</p>
                <p className="text-sm text-slate-500">일요일 휴무</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 교통편 안내 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">교통편 안내</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* 지하철 */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center justify-center">
                  <Train className="mr-2 h-5 w-5 text-blue-600" />
                  지하철
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-semibold text-blue-800">5호선 아차산역</p>
                  <p className="text-sm text-blue-600">2번 출구 도보 1분</p>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <p>• 2번 출구로 나와서 천호대로 방향</p>
                  <p>• 아차산역 바로 앞</p>
                  <p>• 도보 약 1분 소요</p>
                </div>
              </CardContent>
            </Card>

            {/* 버스 */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center justify-center">
                  <Bus className="mr-2 h-5 w-5 text-green-600" />
                  버스
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="font-semibold text-green-800">아차산역 정류장</p>
                  <p className="text-sm text-green-600">다양한 노선 이용 가능</p>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <p>• 간선버스: 240, 241, 2224</p>
                  <p>• 지선버스: 3217, 3318, 3412</p>
                  <p>• 정류장에서 도보 1분</p>
                </div>
              </CardContent>
            </Card>

            {/* 자가용 */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-slate-900 flex items-center justify-center">
                  <Car className="mr-2 h-5 w-5 text-purple-600" />
                  자가용
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="font-semibold text-purple-800">주차 가능</p>
                  <p className="text-sm text-purple-600">건물 주차장 이용</p>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <p>• 천호대로 677번지</p>
                  <p>• 아차산역 바로 앞</p>
                  <p>• 주차 공간 확보</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 주차안내 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">주차안내</h3>
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <div className="flex justify-center">
                <img 
                  src="/parking-guide.jpeg" 
                  alt="선과색미술학원 주차안내" 
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 사업자 정보 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">사업자 정보</h3>
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <div>
                      <span className="text-sm text-slate-600">상호명</span>
                      <p className="font-semibold text-slate-900">선과색미술학원</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <div>
                      <span className="text-sm text-slate-600">대표자</span>
                      <p className="font-semibold text-slate-900">노종성</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <div>
                      <span className="text-sm text-slate-600">사업자번호</span>
                      <p className="font-semibold text-slate-900">829-96-00011</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <div>
                      <span className="text-sm text-slate-600">이메일</span>
                      <p className="font-semibold text-slate-900">danaya1003@naver.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 상담 예약 안내 */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-primary to-orange-500 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">방문 전 상담 예약</h3>
              <p className="text-xl text-orange-100 mb-6">
                개별 상담을 통해 학생에게 맞는 최적의 교육 과정을 안내해드립니다
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-slate-100"
                  onClick={() => window.open('tel:02-453-2379')}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  전화 상담 예약
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white bg-white/10 text-white hover:bg-white hover:text-primary transition-all duration-200"
                  onClick={() => window.open('https://map.naver.com/p/directions/-/-,/-/walk?c=16.78,0,0,0,dh&isCorrectAnswer=true', '_blank')}
                >
                  <Navigation className="mr-2 h-4 w-4" />
                  길찾기
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}