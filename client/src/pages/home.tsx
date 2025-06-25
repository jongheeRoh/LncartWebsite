import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Rocket, Play, Megaphone, Images, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Video */}
      <section className="relative text-white overflow-hidden min-h-screen flex items-center">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src="https://www.youtube.com/embed/wcq3v3sydzA?autoplay=1&mute=1&loop=1&playlist=wcq3v3sydzA&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&playsinline=1&enablejsapi=0"
            className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-h-full min-w-full transform -translate-x-1/2 -translate-y-1/2"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            style={{
              border: 'none',
              pointerEvents: 'none',
            }}
            title="Background Video"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl fade-in">
              선과색미술학원
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-4 drop-shadow-lg fade-in">
              지난 30년간 선화 예중, 예고 입시를 전문적으로 운영하였습니다.
            </p>
            <p className="text-lg md:text-xl text-orange-200 mb-8 drop-shadow-lg fade-in">
              대한민국을 대표하는 실기력이라 자신합니다!
            </p>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">학원 특징</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              체계적인 교육과 전문적인 지도로 학생들의 예술적 재능을 키워나갑니다.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-slate-50 card-hover">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Megaphone className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">예중/예고 입시</h4>
              <p className="text-slate-600">체계적인 커리큘럼과 개인별 맞춤 지도로 높은 합격률 달성</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-slate-50 card-hover">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Images className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">작품 갤러리</h4>
              <p className="text-slate-600">학생들의 우수한 작품과 성과를 확인해보세요</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-slate-50 card-hover">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">전문 강사진</h4>
              <p className="text-slate-600">미대 출신 전문 강사진의 체계적이고 전문적인 교육</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
