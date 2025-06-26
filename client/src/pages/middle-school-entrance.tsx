import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import heroImage from "@assets/스크린샷 2025-06-25 222106_1750857872681.png";

interface Notice {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function MiddleSchoolEntrance() {
  const { data: noticesData, isLoading, error } = useQuery({
    queryKey: ['/api/notices', { category: '예중입시정보', timestamp: Date.now() }],
    queryFn: async () => {
      const url = `/api/notices?category=${encodeURIComponent('예중입시정보')}`;
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error('Failed to fetch notices');
      return data;
    },
  });

  const notices = noticesData?.notices || [];

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">예중 입시정보</h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto drop-shadow-lg">
              예술중학교 입시를 위한 체계적이고 전문적인 준비과정
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 최신 입시정보 섹션 */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">최신 입시정보</h2>
            <p className="text-lg text-gray-600">
              예술중학교 입시에 대한 최신 정보를 확인하세요
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">로딩 중...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">데이터를 불러오는 중 오류가 발생했습니다.</p>
              <p className="text-sm text-gray-500 mt-2">{error.message}</p>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">아직 등록된 입시정보가 없습니다.</p>
              <p className="text-sm text-gray-500 mt-2">관리자 패널에서 입시정보를 추가해주세요.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}