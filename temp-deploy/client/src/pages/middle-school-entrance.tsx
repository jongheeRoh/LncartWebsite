import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Eye } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/스크린샷 2025-06-25 222106_1750857872681.png";

interface Notice {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  viewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export default function MiddleSchoolEntrance() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">예중 입시정보</h1>
          <p className="text-lg">
            예술중학교 입시에 대한 최신 정보를 확인하세요
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-8">
            <p className="text-gray-600">아직 등록된 입시정보가 없습니다.</p>
            <p className="text-sm text-gray-500 mt-2">관리자 패널에서 입시정보를 추가해주세요.</p>
          </div>
        </div>
      </div>
    </div>
  );
}