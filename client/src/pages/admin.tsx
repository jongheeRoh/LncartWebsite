import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Image, BarChart3, LogOut, Edit2, Route, ArrowLeft, Save, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import AdminStats from "@/components/admin/admin-stats";
import NoticeForm from "@/components/notices/notice-form";
import NoticeList from "@/components/notices/notice-list";
import ImageUpload from "@/components/gallery/image-upload";
import GalleryGrid from "@/components/gallery/gallery-grid";
import RoadmapForm from "@/components/roadmap/roadmap-form";
import EnhancedRichTextEditor from "@/components/ui/enhanced-rich-text-editor";
import AdminLogin from "./admin-login";
import type { Notice, GalleryItem, Roadmap } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@assets/스크린샷 2025-06-25 222106_1750857872681.png";

// Admin Notice Manager Component
function AdminNoticeManager() {
  const [viewMode, setViewMode] = useState<'list' | 'view' | 'edit' | 'create'>('list');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const { toast } = useToast();

  const { data: notices, isLoading } = useQuery({
    queryKey: ['/api/notices'],
    retry: false,
  });

  const queryClient = useQueryClient();

  const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
    const sessionId = localStorage.getItem('adminSessionId');
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${sessionId}`,
      },
    });
  };

  const updateNotice = useMutation({
    mutationFn: async (data: { id: number; title: string; content: string; category: string }) => {
      const response = await authenticatedFetch(`/api/notices/${data.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          content: data.content,
          category: data.category,
        }),
      });
      if (!response.ok) throw new Error('공지사항 수정 실패');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "공지사항이 수정되었습니다" });
      queryClient.invalidateQueries({ queryKey: ['/api/notices'] });
      setViewMode('view');
    },
    onError: () => {
      toast({ title: "수정 실패", variant: "destructive" });
    },
  });

  const deleteNotice = useMutation({
    mutationFn: async (id: number) => {
      const response = await authenticatedFetch(`/api/notices/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('삭제 실패');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "공지사항이 삭제되었습니다" });
      queryClient.invalidateQueries({ queryKey: ['/api/notices'] });
      setViewMode('list');
      setSelectedNotice(null);
    },
    onError: () => {
      toast({ title: "삭제 실패", variant: "destructive" });
    },
  });

  const handleNoticeClick = (notice: Notice) => {
    setSelectedNotice(notice);
    setEditContent(notice.content);
    setEditTitle(notice.title);
    setEditCategory(notice.category);
    setViewMode('view');
  };

  const handleEditClick = () => {
    setViewMode('edit');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedNotice(null);
  };

  const handleSaveEdit = () => {
    if (selectedNotice && editTitle.trim() && editContent.trim()) {
      updateNotice.mutate({
        id: selectedNotice.id,
        title: editTitle,
        content: editContent,
        category: editCategory,
      });
    }
  };

  const handleDelete = () => {
    if (selectedNotice && confirm('정말 삭제하시겠습니까?')) {
      deleteNotice.mutate(selectedNotice.id);
    }
  };

  if (viewMode === 'create') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => setViewMode('list')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            목록으로
          </Button>
        </div>
        <NoticeForm
          onSuccess={() => {
            setViewMode('list');
            queryClient.invalidateQueries({ queryKey: ['/api/notices'] });
          }}
          onCancel={() => setViewMode('list')}
        />
      </div>
    );
  }

  if (viewMode === 'view' && selectedNotice) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={handleBackToList}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            목록으로
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDelete} disabled={deleteNotice.isPending}>
              <Trash2 className="h-4 w-4 mr-2" />
              삭제
            </Button>
            <Button onClick={handleEditClick}>
              <Edit2 className="h-4 w-4 mr-2" />
              수정
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{selectedNotice.title}</CardTitle>
              <Badge variant={selectedNotice.category === '긴급' ? 'destructive' : 'secondary'}>
                {selectedNotice.category}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              작성일: {format(new Date(selectedNotice.createdAt), 'yyyy년 MM월 dd일 HH:mm', { locale: ko })}
            </p>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedNotice.content }}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (viewMode === 'edit' && selectedNotice) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => setViewMode('view')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            뒤로
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setViewMode('view')}>
              취소
            </Button>
            <Button onClick={handleSaveEdit} disabled={updateNotice.isPending}>
              <Save className="h-4 w-4 mr-2" />
              {updateNotice.isPending ? '저장중...' : '저장'}
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>공지사항 수정</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">제목</label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="공지사항 제목"
              />
            </div>
            <div>
              <label className="text-sm font-medium">카테고리</label>
              <Select value={editCategory} onValueChange={setEditCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="일반">일반</SelectItem>
                  <SelectItem value="긴급">긴급</SelectItem>
                  <SelectItem value="이벤트">이벤트</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">내용</label>
              <EnhancedRichTextEditor
                value={editContent}
                onChange={setEditContent}
                placeholder="공지사항 내용을 입력하세요..."
                minHeight="400px"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // List view
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">공지사항 관리</h2>
        <Button onClick={() => setViewMode('create')}>
          <Plus className="h-4 w-4 mr-2" />
          새 공지사항
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">로딩 중...</div>
      ) : (
        <div className="grid gap-4">
          {notices?.notices?.map((notice: Notice) => (
            <Card key={notice.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4" onClick={() => handleNoticeClick(notice)}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{notice.title}</h3>
                      <Badge variant={notice.category === '긴급' ? 'destructive' : 'secondary'} className="text-xs">
                        {notice.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(notice.createdAt), 'yyyy년 MM월 dd일', { locale: ko })}
                    </p>
                  </div>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

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

  const { data: middleRoadmap, isLoading: middleRoadmapLoading } = useQuery<Roadmap>({
    queryKey: ["/api/roadmaps/middle_school"],
    enabled: isLoggedIn,
  });

  const { data: highRoadmap, isLoading: highRoadmapLoading } = useQuery<Roadmap>({
    queryKey: ["/api/roadmaps/high_school"], 
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