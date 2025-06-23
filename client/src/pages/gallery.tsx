import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GalleryGrid from "@/components/gallery/gallery-grid";
import ImageUpload from "@/components/gallery/image-upload";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { GALLERY_CATEGORIES, type GalleryCategory } from "@/lib/types";
import type { GalleryItem } from "@shared/schema";

export default function Gallery() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<GalleryCategory>("전체");
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery<{
    items: GalleryItem[];
    total: number;
  }>({
    queryKey: ["/api/gallery", page, category],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", "12");
      if (category !== "전체") params.append("category", category);
      
      const response = await fetch(`/api/gallery?${params}`);
      if (!response.ok) throw new Error("Failed to fetch gallery items");
      return response.json();
    },
  });

  const handleImageUploaded = () => {
    setIsUploadOpen(false);
    refetch();
  };

  const handleImageUpdated = () => {
    refetch();
  };

  const handleImageDeleted = () => {
    refetch();
  };

  const totalPages = data ? Math.ceil(data.total / 12) : 0;

  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-2">작품 갤러리</h3>
            <p className="text-slate-600">학생들의 우수한 작품과 성과를 확인해보세요.</p>
          </div>
          
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Upload className="mr-2 h-4 w-4" />
                이미지 업로드
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <ImageUpload onSuccess={handleImageUploaded} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Gallery Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
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

        {/* Gallery Grid */}
        <GalleryGrid
          items={data?.items || []}
          isLoading={isLoading}
          onImageUpdated={handleImageUpdated}
          onImageDeleted={handleImageDeleted}
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
