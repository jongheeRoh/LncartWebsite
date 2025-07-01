import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { NOTICE_CATEGORIES } from "@/lib/types";
import type { Notice } from "@shared/schema";
import heroImage from "/academy-hero-bg.png";

export default function Notices() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string>("전체");
  const [search, setSearch] = useState("");
  const [, setLocation] = useLocation();

  const { data, isLoading } = useQuery({
    queryKey: ["/api/notices", page, category, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(category !== "전체" && { category }),
        ...(search && { search }),
      });
      const response = await fetch(`/api/notices?${params}`);
      if (!response.ok) throw new Error("Failed to fetch notices");
      return response.json();
    },
  });



  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  };

  const totalPages = data ? Math.ceil(data.total / 10) : 0;

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
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              공지사항
            </h1>
            <p className="text-xl sm:text-2xl opacity-90">
              학원의 새로운 소식과 중요한 공지를 확인하세요
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="공지사항 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              onClick={() => setPage(1)}
              className="bg-primary hover:bg-primary/90"
            >
              검색
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {NOTICE_CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setCategory(cat);
                  setPage(1);
                }}
                className="text-sm"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Notice List */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            공지사항
          </h2>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-slate-200 rounded w-1/4 mb-2"></div>
                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : data?.notices.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-slate-500 text-lg">등록된 공지사항이 없습니다.</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {data?.notices.map((notice: Notice) => (
                <Card key={notice.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6" onClick={() => setLocation(`/notices/${notice.id}`)}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${
                              notice.category === '긴급' ? 'bg-red-100 text-red-800' :
                              notice.category === '이벤트' ? 'bg-blue-100 text-blue-800' :
                              'bg-slate-100 text-slate-800'
                            }`}
                          >
                            {notice.category}
                          </Badge>
                          <span className="text-slate-500 text-sm">
                            {formatDate(new Date(notice.createdAt).toISOString())}
                          </span>
                          <div className="flex items-center gap-1 text-slate-500 text-sm">
                            <Eye className="h-3 w-3" />
                            <span>{notice.views || 0}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2 hover:text-primary transition-colors">
                          {notice.title}
                        </h3>
                        <p className="text-slate-600 line-clamp-2">
                          {notice.content ? notice.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : '내용 없음'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                이전
              </Button>
              
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
                  return (
                    <Button
                      key={pageNum}
                      variant={page === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(pageNum)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
              >
                다음
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}