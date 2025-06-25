import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Users, Target, CheckCircle, Clock, Award, Palette, FileText, Trophy } from "lucide-react";
import heroImage from "@assets/스크린샷 2025-06-25 222106_1750857872681.png";

export default function MiddleSchool() {
  const announcements = [
    { id: 23, title: "[실기대회] 2025선화미술실기대회 수상자", author: "관리자" },
    { id: 22, title: "[재현작] 2025 선화예중 재현작", author: "관리자" },
    { id: 21, title: "[합격자] 2025선화예중 합격자", author: "관리자" },
    { id: 20, title: "[출제문제] 2025 선화예중 출제문제", author: "관리자" },
    { id: 19, title: "[방학특강] 예중대비 여름방학특강 선과색미술학원", author: "관리자" },
    { id: 18, title: "[입시요강]2025 선화예술중학교 입시요강", author: "관리자" },
    { id: 17, title: "[방학특강] 2024 선화예중 입시 안내", author: "관리자" },
    { id: 16, title: "[실기대회] 2023 선화 미술대회 시상식", author: "관리자" }
  ];

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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">예중 입시정보</h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto drop-shadow-lg">
              선화예술중학교 입시를 위한 체계적이고 전문적인 교육과정
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">


        {/* 예중 입시정보 */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">예중 입시정보</h3>
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