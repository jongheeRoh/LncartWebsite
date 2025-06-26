import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Users, Target, CheckCircle, Clock, Award, Palette, FileText, Trophy, Brush, PaintBucket } from "lucide-react";
import heroImage from "@assets/스크린샷 2025-06-25 222106_1750857872681.png";

export default function HighSchool() {
  // Removed static data

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
              <div className="text-center py-8">
                <p className="text-gray-600">아직 등록된 입시정보가 없습니다.</p>
                <p className="text-sm text-gray-500 mt-2">관리자 패널에서 입시정보를 추가해주세요.</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}