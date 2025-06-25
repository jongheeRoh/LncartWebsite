import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Calendar } from "lucide-react";
import { NOTICE_CATEGORIES, type NoticeCategory } from "@/lib/types";
import type { Notice } from "@shared/schema";
import heroImage from "@assets/스크린샷 2025-06-25 222106_1750857872681.png";

export default function Notices() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<NoticeCategory>("전체");
  const [search, setSearch] = useState("");

  const { data, isLoading, refetch } = useQuery<{
    notices: Notice[];
    total: number;
  }>({
    queryKey: ["/api/notices", page, category, search],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", "10");
      if (category !== "전체") params.append("category", category);
      if (search) params.append("search", search);
      
      const response = await fetch(`/api/notices?${params}`);
      if (!response.ok) throw new Error("Failed to fetch notices");
      return response.json();
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    refetch();
  };

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
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">공지사항</h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto drop-shadow-lg">
              최신 소식과 중요한 공지사항을 확인하세요
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2 justify-center">
            <div className="relative max-w-md w-full">
              <Input
                type="text"
                placeholder="공지사항 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            </div>
            <Button type="submit">검색</Button>
          </form>

          <div className="flex flex-wrap justify-center gap-2">
            {NOTICE_CATEGORIES.map((cat) => (
              <Badge
                key={cat}
                variant={category === cat ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  category === cat
                    ? "bg-primary text-white"
                    : "hover:bg-slate-100"
                }`}
                onClick={() => {
                  setCategory(cat);
                  setPage(1);
                }}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* Notice List */}
        <section>
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">공지사항</h3>
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              {isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 animate-pulse">
                      <div className="flex items-center">
                        <div className="w-8 h-5 bg-slate-200 rounded mr-3"></div>
                        <div className="h-4 bg-slate-200 rounded w-64"></div>
                      </div>
                      <div className="h-4 bg-slate-200 rounded w-20"></div>
                    </div>
                  ))}
                </div>
              ) : data?.notices.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-500 text-lg">공지사항이 없습니다.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data?.notices.map((notice) => (
                    <div key={notice.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg cursor-pointer">
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-3 text-xs">{notice.id}</Badge>
                        <div className="flex flex-col">
                          <span className="text-slate-900 hover:text-primary transition-colors">
                            {notice.title}
                          </span>
                          <div className="flex items-center mt-1">
                            <Badge 
                              variant="secondary" 
                              className="text-xs mr-2"
                              style={{ 
                                backgroundColor: notice.category === '긴급' ? '#fee2e2' : 
                                                notice.category === '이벤트' ? '#fef3c7' : '#f1f5f9',
                                color: notice.category === '긴급' ? '#dc2626' : 
                                       notice.category === '이벤트' ? '#d97706' : '#64748b'
                              }}
                            >
                              {notice.category}
                            </Badge>
                            <div className="flex items-center text-xs text-slate-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{formatDate(notice.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-slate-500">관리자</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                이전
              </Button>
              
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPage(pageNum)}
                    className={page === pageNum ? "bg-primary" : ""}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                다음
              </Button>
              
              <div className="ml-4 text-sm text-slate-500">
                {Math.min(page, totalPages)}/{totalPages}
              </div>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}