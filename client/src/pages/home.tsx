import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Rocket, Play, Megaphone, Images, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 fade-in">
              통합 콘텐츠 관리 시스템
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto fade-in">
              공지사항과 갤러리를 효율적으로 관리하고 공유할 수 있는 현대적인 플랫폼입니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in">
              <Link href="/notices">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
                  <Rocket className="mr-2 h-5 w-5" />
                  시작하기
                </Button>
              </Link>
              <Link href="/gallery">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
                  <Play className="mr-2 h-5 w-5" />
                  둘러보기
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
            <h3 className="text-3xl font-bold text-slate-900 mb-4">주요 기능</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              직관적인 인터페이스와 강력한 관리 도구로 콘텐츠를 효과적으로 운영하세요.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-slate-50 card-hover">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Megaphone className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">공지사항 관리</h4>
              <p className="text-slate-600">실시간 공지사항 게시 및 관리, 검색 및 분류 기능</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-slate-50 card-hover">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Images className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">갤러리 시스템</h4>
              <p className="text-slate-600">이미지 업로드, 편집 및 카테고리별 관리 시스템</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-slate-50 card-hover">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">반응형 디자인</h4>
              <p className="text-slate-600">모든 디바이스에서 최적화된 사용자 경험 제공</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
