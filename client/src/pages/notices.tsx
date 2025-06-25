import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import NoticeList from "@/components/notices/notice-list";
import { Search } from "lucide-react";
import { NOTICE_CATEGORIES, type NoticeCategory } from "@/lib/types";
import type { Notice } from "@shared/schema";

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

  const handleNoticeUpdated = () => {
    refetch();
  };

  const handleNoticeDeleted = () => {
    refetch();
  };

  const totalPages = data ? Math.ceil(data.total / 10) : 0;

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-slate-900 mb-2">공지사항</h3>
          <p className="text-slate-600">최신 소식과 중요한 공지사항을 확인하세요.</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1 max-w-md">
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

          <div className="flex flex-wrap gap-2">
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
        <NoticeList
          notices={data?.notices || []}
          isLoading={isLoading}
          onNoticeUpdated={handleNoticeUpdated}
          onNoticeDeleted={handleNoticeDeleted}
        />

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
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Button
                  key={pageNum}
                  variant={page === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPage(pageNum)}
                  className={page === pageNum ? "bg-primary" : ""}
                >
                  {pageNum}
                </Button>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                다음
              </Button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
}
