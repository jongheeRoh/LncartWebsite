import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileText, Image, BarChart3 } from "lucide-react";
import AdminStats from "@/components/admin/admin-stats";
import NoticeForm from "@/components/notices/notice-form";
import NoticeList from "@/components/notices/notice-list";
import ImageUpload from "@/components/gallery/image-upload";
import GalleryGrid from "@/components/gallery/gallery-grid";
import type { Notice, GalleryItem } from "@shared/schema";
import heroImage from "@assets/스크린샷 2025-06-25 222106_1750857872681.png";

export default function Admin() {
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const { data: noticesData, isLoading: noticesLoading, refetch: refetchNotices } = useQuery<{
    notices: Notice[];
    total: number;
  }>({
    queryKey: ["/api/notices"],
    queryFn: async () => {
      const response = await fetch("/api/notices?limit=50");
      if (!response.ok) throw new Error("Failed to fetch notices");
      return response.json();
    },
  });

  const { data: galleryData, isLoading: galleryLoading, refetch: refetchGallery } = useQuery<{
    items: GalleryItem[];
    total: number;
  }>({
    queryKey: ["/api/gallery"],
    queryFn: async () => {
      const response = await fetch("/api/gallery?limit=50");
      if (!response.ok) throw new Error("Failed to fetch gallery items");
      return response.json();
    },
  });

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">관리자 페이지</h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto drop-shadow-lg">
              공지사항과 갤러리를 관리하고 통계를 확인하세요
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="stats">
              <BarChart3 className="mr-2 h-4 w-4" />
              통계
            </TabsTrigger>
            <TabsTrigger value="notices">
              <FileText className="mr-2 h-4 w-4" />
              공지사항
            </TabsTrigger>
            <TabsTrigger value="gallery">
              <Image className="mr-2 h-4 w-4" />
              갤러리
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <AdminStats />
          </TabsContent>

          <TabsContent value="notices">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">공지사항 관리</h2>
                <Button onClick={() => setShowNoticeForm(!showNoticeForm)}>
                  <Plus className="mr-2 h-4 w-4" />
                  새 공지사항
                </Button>
              </div>
              
              {showNoticeForm && (
                <Card>
                  <CardHeader>
                    <CardTitle>새 공지사항 작성</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <NoticeForm onSuccess={() => {
                      setShowNoticeForm(false);
                      refetchNotices();
                    }} />
                  </CardContent>
                </Card>
              )}

              <NoticeList 
                notices={noticesData?.notices || []} 
                isLoading={noticesLoading}
                onNoticeUpdated={refetchNotices}
                onNoticeDeleted={refetchNotices}
              />
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">갤러리 관리</h2>
                <Button onClick={() => setShowImageUpload(!showImageUpload)}>
                  <Plus className="mr-2 h-4 w-4" />
                  새 작품
                </Button>
              </div>
              
              {showImageUpload && (
                <Card>
                  <CardHeader>
                    <CardTitle>새 작품 업로드</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ImageUpload onSuccess={() => {
                      setShowImageUpload(false);
                      refetchGallery();
                    }} />
                  </CardContent>
                </Card>
              )}

              <GalleryGrid 
                items={galleryData?.items || []} 
                isLoading={galleryLoading}
                onImageUpdated={refetchGallery}
                onImageDeleted={refetchGallery}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}