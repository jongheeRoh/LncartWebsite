import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Users, Target, CheckCircle, Clock, Award, Palette, FileText, Trophy, Brush, PaintBucket } from "lucide-react";

export default function HighSchool() {
  const announcements = [
    { id: 30, title: "[합격자] 2025선화예고 합격자 발표", author: "관리자" },
    { id: 29, title: "[출제문제] 2025 선화예고 실기고사 출제문제", author: "관리자" },
    { id: 28, title: "[재현작] 2025 선화예고 재현작 전시", author: "관리자" },
    { id: 27, title: "[입시요강] 2025 선화예술고등학교 입시요강", author: "관리자" },
    { id: 26, title: "[방학특강] 예고대비 겨울방학특강 모집", author: "관리자" },
    { id: 25, title: "[포트폴리오] 예고반 포트폴리오 심사 일정", author: "관리자" },
    { id: 24, title: "[실기대회] 2024 선화예고 실기대회 결과", author: "관리자" },
    { id: 23, title: "[특강] 예고입시 전공별 특화 수업 안내", author: "관리자" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative text-white py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="@assets/스크린샷 2025-06-25 222106_1750857872681.png" 
            alt="선과색 미술학원 간판" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">예고 입시정보</h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto drop-shadow-lg">
              선화예술고등학교 입시를 위한 전문적이고 심화된 교육과정
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">


        {/* 예고 입시정보 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">예고 입시정보</h3>
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
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
                <div className="flex justify-center space-x-2">
                  <Button variant="outline" size="sm">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}