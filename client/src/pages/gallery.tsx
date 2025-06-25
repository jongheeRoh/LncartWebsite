import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Calendar, User } from "lucide-react";
import { Link } from "wouter";
import { GALLERY_CATEGORIES, type GalleryCategory } from "@/lib/types";
import type { GalleryItem } from "@shared/schema";

export default function Gallery() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<GalleryCategory>("전체");
  const [search, setSearch] = useState("");

  const { data, isLoading, refetch } = useQuery<{
    items: GalleryItem[];
    total: number;
  }>({
    queryKey: ["/api/gallery", page, category, search],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", "9");
      if (category !== "전체") params.append("category", category);
      if (search) params.append("search", search);
      
      const response = await fetch(`/api/gallery?${params}`);
      if (!response.ok) throw new Error("Failed to fetch gallery items");
      return response.json();
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    refetch();
  };

  const totalPages = data ? Math.ceil(data.total / 9) : 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">갤러리</h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            학생들의 창의적이고 아름다운 작품들을 감상해보세요.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 justify-center mb-6">
            <div className="relative max-w-md w-full">
              <Input
                type="text"
                placeholder="검색어를 입력하세요"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            </div>
            <Button type="submit">검색</Button>
          </form>

          <div className="flex flex-wrap justify-center gap-2">
            {GALLERY_CATEGORIES.map((cat) => (
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

        {/* Gallery List */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i} className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-48 bg-slate-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded mb-2"></div>
                    <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.items.map((item) => (
              <Link key={item.id} href={`/gallery/${item.id}`}>
                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      ) : (
                        <div className="w-full h-48 bg-slate-200 rounded-t-lg flex items-center justify-center">
                          <span className="text-slate-400">이미지 없음</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-primary/90 text-white text-xs">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h4 className="font-bold text-lg text-slate-900 mb-3 line-clamp-2">
                        {item.title}
                      </h4>
                      
                      <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          <span>관리자</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{formatDate(item.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {data?.items.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">검색 결과가 없습니다.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
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
    </section>
  );
}