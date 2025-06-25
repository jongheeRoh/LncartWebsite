import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Car, 
  Train, 
  Bus, 
  Navigation,
  Mail,
  User,
  Building,
  CreditCard
} from "lucide-react";

export default function Directions() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="bg-primary text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">오시는길</h2>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            선과색미술학원 위치 안내 및 교통편 정보
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* 지도 영역 */}
          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardTitle className="flex items-center text-blue-800">
                <MapPin className="mr-3 h-5 w-5" />
                위치 안내
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full h-96 bg-slate-100 relative overflow-hidden rounded-b-lg">
                {/* Naver Map Embed */}
                <iframe
                  src="https://map.naver.com/v5/search/%EC%84%A0%EA%B3%BC%EC%83%89%EB%AF%B8%EC%88%A0%ED%95%99%EC%9B%90?c=14138481.9658790,4516979.9101479,15,0,0,0,dh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="선과색미술학원 위치"
                ></iframe>
                <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md">
                  <p className="text-sm font-medium text-slate-900">선과색미술학원</p>
                  <p className="text-xs text-slate-600">서울특별시 광진구 천호대로 677</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 기본 정보 */}
          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
              <CardTitle className="flex items-center text-green-800">
                <Navigation className="mr-3 h-5 w-5" />
                기본 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* 주소 */}
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">주소</h4>
                    <p className="text-slate-700">서울특별시 광진구 천호대로 677</p>
                  </div>
                </div>

                {/* 운영시간 */}
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">이용시간</h4>
                    <div className="space-y-1">
                      <p className="text-slate-700">매일 08:00 ~ 22:00</p>
                    </div>
                  </div>
                </div>

                {/* 전화번호 */}
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">전화번호</h4>
                    <p className="text-slate-700">02-453-2379</p>
                  </div>
                </div>

                {/* 주차 정보 */}
                <div className="flex items-start space-x-3">
                  <Car className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">주차 정보</h4>
                    <p className="text-slate-700">주차장 있습니다</p>
                  </div>
                </div>

                {/* 길찾기 버튼 */}
                <div className="pt-4">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => window.open('https://map.naver.com/v5/directions/-/-/-/transit?c=14138481.9658790,4516979.9101479,15,0,0,0,dh', '_blank')}
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    네이버 지도에서 길찾기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 교통편 안내 */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">교통편 안내</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {/* 지하철 */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                <CardTitle className="flex items-center text-blue-800">
                  <Train className="mr-3 h-5 w-5" />
                  지하철
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <Badge className="bg-blue-600 text-white mb-3 px-4 py-1">
                      5호선 아차산역
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-sm text-slate-700">2번 출구 이용</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-sm text-slate-700">출구 반대방향으로 도보 50미터</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                      <span className="text-sm text-slate-700">좌측 건물 위치</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 버스 */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                <CardTitle className="flex items-center text-green-800">
                  <Bus className="mr-3 h-5 w-5" />
                  버스
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <Badge className="bg-green-600 text-white mb-3 px-4 py-1">
                      주변 버스 정류장
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-sm text-slate-700">학원에서 최대 3분 거리</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-sm text-slate-700">아차산역 인근 정류장 이용</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                      <span className="text-sm text-slate-700">다양한 노선 접근 가능</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 자가용 */}
            <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                <CardTitle className="flex items-center text-purple-800">
                  <Car className="mr-3 h-5 w-5" />
                  자가용
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <Badge className="bg-purple-600 text-white mb-3 px-4 py-1">
                      주차 가능
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                      <span className="text-sm text-slate-700">학원 전용 주차장 운영</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-sm text-slate-700">천호대로 접근 용이</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                      <span className="text-sm text-slate-700">주변 도로 교통 편리</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 사업자 정보 */}
        <section className="mb-12">
          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100">
              <CardTitle className="flex items-center text-slate-800">
                <Building className="mr-3 h-5 w-5" />
                사업자 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-slate-600" />
                    <div>
                      <span className="text-sm text-slate-600">상호명</span>
                      <p className="font-semibold text-slate-900">선과색미술학원</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-slate-600" />
                    <div>
                      <span className="text-sm text-slate-600">대표자</span>
                      <p className="font-semibold text-slate-900">노종성</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-slate-600" />
                    <div>
                      <span className="text-sm text-slate-600">사업자번호</span>
                      <p className="font-semibold text-slate-900">829-96-00011</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-slate-600" />
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

        {/* CTA Section */}
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
                  className="border-2 border-white text-white hover:bg-white hover:text-primary"
                  onClick={() => window.open('https://map.naver.com/v5/directions/-/-/-/transit?c=14138481.9658790,4516979.9101479,15,0,0,0,dh', '_blank')}
                >
                  <Navigation className="mr-2 h-4 w-4" />
                  길찾기
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </section>
  );
}