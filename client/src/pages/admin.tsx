import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, FileText, Image, BarChart3, LogOut, Edit2, Route } from "lucide-react";
import AdminStats from "@/components/admin/admin-stats";
import NoticeForm from "@/components/notices/notice-form";
import NoticeList from "@/components/notices/notice-list";
import ImageUpload from "@/components/gallery/image-upload";
import GalleryGrid from "@/components/gallery/gallery-grid";
import RoadmapForm from "@/components/roadmap/roadmap-form";
import AdminLogin from "./admin-login";
import type { Notice, GalleryItem, Roadmap } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@assets/스크린샷 2025-06-25 222106_1750857872681.png";

export default function Admin() {
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showMiddleRoadmapForm, setShowMiddleRoadmapForm] = useState(false);
  const [showHighRoadmapForm, setShowHighRoadmapForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if already logged in
    const savedSessionId = localStorage.getItem('adminSessionId');
    if (savedSessionId) {
      verifySession(savedSessionId);
    }
  }, []);

  const verifySession = async (sessionId: string) => {
    try {
      console.log("Verifying session:", sessionId);
      const response = await fetch('/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${sessionId}`
        }
      });
      
      console.log("Verify response status:", response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log("Session verified:", result);
        setSessionId(sessionId);
        setIsLoggedIn(true);
      } else {
        console.log("Session verification failed");
        localStorage.removeItem('adminSessionId');
      }
    } catch (error) {
      console.error("Session verification error:", error);
      localStorage.removeItem('adminSessionId');
    }
  };

  const handleLoginSuccess = (newSessionId: string) => {
    console.log("Login success callback:", newSessionId);
    setSessionId(newSessionId);
    setIsLoggedIn(true);
    localStorage.setItem('adminSessionId', newSessionId);
  };

  const handleLogout = async () => {
    try {
      if (sessionId) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sessionId}`
          }
        });
      }
      
      setIsLoggedIn(false);
      setSessionId(null);
      localStorage.removeItem('adminSessionId');
      
      toast({
        title: "로그아웃 완료",
        description: "관리자 페이지에서 로그아웃되었습니다.",
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Create authenticated fetch function
  const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${sessionId}`
      }
    });
  };

  // Always call hooks before any early returns
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
    enabled: isLoggedIn,
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
    enabled: isLoggedIn,
  });

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

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
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">관리자 페이지</h1>
                <p className="text-xl text-orange-100 max-w-3xl mx-auto drop-shadow-lg mt-4">
                  공지사항과 갤러리를 관리하고 통계를 확인하세요
                </p>
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <LogOut className="mr-2 h-4 w-4" />
                로그아웃
              </Button>
            </div>
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

          {/* Roadmaps Tab */}
          <TabsContent value="roadmaps">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">로드맵 관리</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Middle School Roadmap */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      예중 입시로드맵
                      <Dialog open={showMiddleRoadmapForm} onOpenChange={setShowMiddleRoadmapForm}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit2 className="h-4 w-4 mr-2" />
                            {middleRoadmap ? "수정" : "작성"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>
                              {middleRoadmap ? "예중 로드맵 수정" : "예중 로드맵 작성"}
                            </DialogTitle>
                          </DialogHeader>
                          <RoadmapForm
                            type="middle_school"
                            roadmap={middleRoadmap}
                            onSuccess={() => setShowMiddleRoadmapForm(false)}
                          />
                        </DialogContent>
                      </Dialog>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {middleRoadmapLoading ? (
                      <div className="text-slate-500">로딩 중...</div>
                    ) : middleRoadmap ? (
                      <div>
                        <h3 className="font-semibold mb-2">{middleRoadmap.title}</h3>
                        <div 
                          className="text-slate-600 text-sm line-clamp-3"
                          dangerouslySetInnerHTML={{ 
                            __html: middleRoadmap.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...' 
                          }}
                        />
                        <div className="mt-4 text-xs text-slate-500">
                          마지막 수정: {new Date(middleRoadmap.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    ) : (
                      <div className="text-slate-500">로드맵이 아직 작성되지 않았습니다.</div>
                    )}
                  </CardContent>
                </Card>

                {/* High School Roadmap */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      예고 입시로드맵
                      <Dialog open={showHighRoadmapForm} onOpenChange={setShowHighRoadmapForm}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit2 className="h-4 w-4 mr-2" />
                            {highRoadmap ? "수정" : "작성"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>
                              {highRoadmap ? "예고 로드맵 수정" : "예고 로드맵 작성"}
                            </DialogTitle>
                          </DialogHeader>
                          <RoadmapForm
                            type="high_school"
                            roadmap={highRoadmap}
                            onSuccess={() => setShowHighRoadmapForm(false)}
                          />
                        </DialogContent>
                      </Dialog>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {highRoadmapLoading ? (
                      <div className="text-slate-500">로딩 중...</div>
                    ) : highRoadmap ? (
                      <div>
                        <h3 className="font-semibold mb-2">{highRoadmap.title}</h3>
                        <div 
                          className="text-slate-600 text-sm line-clamp-3"
                          dangerouslySetInnerHTML={{ 
                            __html: highRoadmap.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...' 
                          }}
                        />
                        <div className="mt-4 text-xs text-slate-500">
                          마지막 수정: {new Date(highRoadmap.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    ) : (
                      <div className="text-slate-500">로드맵이 아직 작성되지 않았습니다.</div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}