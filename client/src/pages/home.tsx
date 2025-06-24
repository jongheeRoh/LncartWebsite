import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Rocket, Play, Megaphone, Images, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 fade-in">
              선과색미술학원
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto fade-in">
              예중/예고, 미대입시 전문학원으로 학생들의 꿈을 실현합니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in">
              <Link href="/entrance">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
                  <Rocket className="mr-2 h-5 w-5" />
                  입시정보 보기
                </Button>
              </Link>
              <Link href="/gallery">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
                  <Play className="mr-2 h-5 w-5" />
                  작품갤러리
                </Button>
              </Link>
            </div>
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
