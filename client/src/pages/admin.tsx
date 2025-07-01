import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Plus, Calendar, BarChart3, Bell, Image, School, GraduationCap, Map, Pin } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

import NoticeForm from "@/components/notices/notice-form";
import GalleryForm from "@/components/gallery/gallery-form";
import RoadmapForm from "@/components/roadmap/roadmap-form";
import { MiddleSchoolAdmissionForm } from "@/components/admission/middle-school-form";
import { HighSchoolAdmissionForm } from "@/components/admission/high-school-form";
import type { Notice, GalleryItem, MiddleSchoolAdmission, HighSchoolAdmission } from "@shared/schema";
import AdminLogin from "./admin-login";

function AdminDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeSection, setActiveSection] = useState<"dashboard" | "notices" | "gallery" | "middle-admission" | "high-admission" | "roadmap">("dashboard");
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [showMiddleAdmissionForm, setShowMiddleAdmissionForm] = useState(false);
  const [showHighAdmissionForm, setShowHighAdmissionForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [editingMiddleAdmission, setEditingMiddleAdmission] = useState<MiddleSchoolAdmission | null>(null);
  const [editingHighAdmission, setEditingHighAdmission] = useState<HighSchoolAdmission | null>(null);

  // Fetch stats for dashboard
  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
    enabled: activeSection === "dashboard",
  });

  // Fetch data based on active section
  const { data: noticesData } = useQuery({
    queryKey: ["/api/notices", { limit: 100 }],
    enabled: activeSection === "notices",
  });



  const { data: middleAdmissionsData } = useQuery({
    queryKey: ["/api/middle-school-admission", { limit: 100 }],
    enabled: activeSection === "middle-admission",
  });

  const { data: galleryData } = useQuery({
    queryKey: ["/api/gallery", { limit: 100 }],
    enabled: activeSection === "gallery",
  });

  const { data: highAdmissionsData } = useQuery({
    queryKey: ["/api/high-school-admission", { limit: 100 }],
    enabled: activeSection === "high-admission",
  });

  // Fetch roadmaps
  const { data: middleRoadmap } = useQuery({
    queryKey: ["/api/roadmap", "middle"],
    enabled: activeSection === "roadmap",
  });

  const { data: highRoadmap } = useQuery({
    queryKey: ["/api/roadmap", "high"],
    enabled: activeSection === "roadmap",
  });

  const notices = (noticesData as any)?.notices || [];
  const galleryItems = (galleryData as any)?.items || [];
  const middleAdmissions = (middleAdmissionsData as any)?.items || [];
  const highAdmissions = (highAdmissionsData as any)?.items || [];

  // Delete mutations
  const deleteNoticeMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest(`/api/notices/${id}`, "DELETE");
    },
    onSuccess: () => {
      toast({ title: "성공", description: "공지사항이 삭제되었습니다." });
      queryClient.invalidateQueries({ queryKey: ["/api/notices"] });
    },
    onError: () => {
      toast({ title: "오류", description: "삭제에 실패했습니다.", variant: "destructive" });
    },
  });

  const togglePinNoticeMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest(`/api/notices/${id}/toggle-pin`, "PATCH");
    },
    onSuccess: () => {
      toast({ title: "성공", description: "공지사항 고정 상태가 변경되었습니다." });
      queryClient.invalidateQueries({ queryKey: ["/api/notices"] });
    },
    onError: () => {
      toast({ title: "오류", description: "고정 상태 변경에 실패했습니다.", variant: "destructive" });
    },
  });

  const deleteMiddleAdmissionMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest(`/api/middle-school-admission/${id}`, "DELETE");
    },
    onSuccess: () => {
      toast({ title: "성공", description: "예중 입시정보가 삭제되었습니다." });
      queryClient.invalidateQueries({ queryKey: ["/api/middle-school-admission"] });
    },
    onError: () => {
      toast({ title: "오류", description: "삭제에 실패했습니다.", variant: "destructive" });
    },
  });

  const deleteGalleryMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest(`/api/gallery/${id}`, "DELETE");
    },
    onSuccess: () => {
      toast({ title: "성공", description: "갤러리 항목이 삭제되었습니다." });
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
    },
    onError: () => {
      toast({ title: "오류", description: "삭제에 실패했습니다.", variant: "destructive" });
    },
  });

  const deleteHighAdmissionMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest(`/api/high-school-admission/${id}`, "DELETE");
    },
    onSuccess: () => {
      toast({ title: "성공", description: "예고 입시정보가 삭제되었습니다." });
      queryClient.invalidateQueries({ queryKey: ["/api/high-school-admission"] });
    },
    onError: () => {
      toast({ title: "오류", description: "삭제에 실패했습니다.", variant: "destructive" });
    },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">관리자 패널</h1>
          <Button 
            variant="outline" 
            onClick={() => {
              localStorage.removeItem('adminSessionId');
              window.location.reload();
            }}
          >
            로그아웃
          </Button>
        </div>

        {/* Dashboard Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card 
            className={`cursor-pointer transition-all ${activeSection === "dashboard" ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => setActiveSection("dashboard")}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <BarChart3 className="h-8 w-8 mb-2 text-blue-600" />
              <span className="text-sm font-medium">대시보드</span>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all ${activeSection === "notices" ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => setActiveSection("notices")}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Bell className="h-8 w-8 mb-2 text-green-600" />
              <span className="text-sm font-medium">공지사항</span>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all ${activeSection === "gallery" ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => setActiveSection("gallery")}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Image className="h-8 w-8 mb-2 text-purple-600" />
              <span className="text-sm font-medium">갤러리</span>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all ${activeSection === "middle-admission" ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => setActiveSection("middle-admission")}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <School className="h-8 w-8 mb-2 text-orange-600" />
              <span className="text-sm font-medium">예중입시</span>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all ${activeSection === "high-admission" ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => setActiveSection("high-admission")}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <GraduationCap className="h-8 w-8 mb-2 text-red-600" />
              <span className="text-sm font-medium">예고입시</span>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all ${activeSection === "roadmap" ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => setActiveSection("roadmap")}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Map className="h-8 w-8 mb-2 text-indigo-600" />
              <span className="text-sm font-medium">로드맵</span>
            </CardContent>
          </Card>
        </div>



        {/* Dashboard Overview */}
        {activeSection === "dashboard" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">대시보드 개요</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-700">등록된 공지사항</CardTitle>
                  <Bell className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900">{(stats as any)?.totalNotices || 0}개</div>
                  <p className="text-xs text-blue-600 mt-1">데이터베이스 실제 카운트</p>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 border-green-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-700">갤러리 이미지</CardTitle>
                  <Image className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-900">{(stats as any)?.totalImages || 0}개</div>
                  <p className="text-xs text-green-600 mt-1">업로드된 이미지 수</p>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50 border-purple-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-700">총 조회수</CardTitle>
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-900">{(stats as any)?.totalViews?.toLocaleString() || 0}회</div>
                  <p className="text-xs text-purple-600 mt-1">전체 페이지 조회 합계</p>
                </CardContent>
              </Card>
              
              <Card className="bg-orange-50 border-orange-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-700">실제 성장률</CardTitle>
                  <BarChart3 className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-900">{(stats as any)?.viewsGrowth || "+0%"}</div>
                  <p className="text-xs text-orange-600 mt-1">조회수 기반 계산</p>
                </CardContent>
              </Card>
            </div>

            {/* 통계 설명 */}
            <Card className="bg-slate-50 border-slate-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-slate-900 mb-2">통계 정보 안내</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
                  <div>
                    <span className="font-medium">공지사항 & 갤러리:</span> 데이터베이스에서 실시간으로 계산된 정확한 수치입니다.
                  </div>
                  <div>
                    <span className="font-medium">총 조회수:</span> 모든 페이지의 실제 조회수를 합산한 정확한 데이터입니다.
                  </div>
                  <div>
                    <span className="font-medium">성장률:</span> 실제 조회수와 콘텐츠 비율을 기반으로 계산된 성장률입니다.
                  </div>
                  <div>
                    <span className="font-medium">업데이트:</span> 새로운 콘텐츠 추가 및 조회수 증가 시 실시간으로 반영됩니다.
                  </div>
                </div>
              </CardContent>
            </Card>


          </div>
        )}

        {/* Notices Management */}
        {activeSection === "notices" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">공지사항 관리</h2>
              <Button onClick={() => {
                setEditingNotice(null);
                setShowNoticeForm(true);
              }}>
                <Plus className="w-4 h-4 mr-2" />
                새 공지사항
              </Button>
            </div>

            <div className="grid gap-4">
              {notices.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">등록된 공지사항이 없습니다.</p>
                  </CardContent>
                </Card>
              ) : (
                notices.map((notice: Notice) => (
                  <Card key={notice.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {notice.pinned && (
                              <Pin className="h-4 w-4 text-red-500" fill="currentColor" />
                            )}
                            <h3 className="text-lg font-semibold">{notice.title}</h3>
                            <Badge variant="outline">{notice.category}</Badge>
                            {notice.pinned && (
                              <Badge variant="destructive" className="text-xs">
                                고정
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-2">{notice.excerpt}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(notice.createdAt).toLocaleDateString('ko-KR')}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant={notice.pinned ? "default" : "outline"}
                            size="sm"
                            onClick={() => togglePinNoticeMutation.mutate(notice.id)}
                            title={notice.pinned ? "고정 해제" : "상단 고정"}
                          >
                            <Pin className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingNotice(notice);
                              setShowNoticeForm(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteNoticeMutation.mutate(notice.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}



        {/* Middle School Admission Management */}
        {activeSection === "middle-admission" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">예중 입시정보 관리</h2>
              <Button onClick={() => {
                setEditingMiddleAdmission(null);
                setShowMiddleAdmissionForm(true);
              }}>
                <Plus className="w-4 h-4 mr-2" />
                새 예중 입시정보
              </Button>
            </div>

            <div className="bg-white border rounded-lg">
              {middleAdmissions.length === 0 ? (
                <div className="p-8 text-center">
                  <School className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">등록된 예중 입시정보가 없습니다.</p>
                </div>
              ) : (
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">번호</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">글제목</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성일</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {middleAdmissions.map((admission: MiddleSchoolAdmission, index: number) => (
                        <tr key={admission.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {middleAdmissions.length - index}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{admission.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline" className="text-xs">{admission.category}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(admission.createdAt).toLocaleDateString('ko-KR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditingMiddleAdmission(admission);
                                  setShowMiddleAdmissionForm(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteMiddleAdmissionMutation.mutate(admission.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Gallery Management */}
        {activeSection === "gallery" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">갤러리 관리</h2>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={async () => {
                    try {
                      const response = await apiRequest("/api/update-gallery-thumbnails", "POST", {}) as { message: string; updated: number };
                      toast({
                        title: "성공",
                        description: response.message,
                      });
                      queryClient.invalidateQueries({ queryKey: ['/api/gallery'] });
                    } catch (error: any) {
                      toast({
                        title: "오류",
                        description: error.message || "썸네일 업데이트에 실패했습니다.",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  <Image className="w-4 h-4 mr-2" />
                  썸네일 업데이트
                </Button>
                <Button onClick={() => {
                  setEditingGallery(null);
                  setShowGalleryForm(true);
                }}>
                  <Plus className="w-4 h-4 mr-2" />
                  새 갤러리 항목
                </Button>
              </div>
            </div>

            <div className="bg-white border rounded-lg">
              {galleryItems.length === 0 ? (
                <div className="p-8 text-center">
                  <Image className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">등록된 갤러리 항목이 없습니다.</p>
                </div>
              ) : (
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">번호</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이미지</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성일</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {galleryItems.map((item: GalleryItem, index: number) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {galleryItems.length - index}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="h-12 w-12 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                <Image className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {item.description?.replace(/<[^>]*>/g, '') || ''}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline" className="text-xs">{item.category}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(item.createdAt).toLocaleDateString('ko-KR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditingGallery(item);
                                  setShowGalleryForm(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteGalleryMutation.mutate(item.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* High School Admission Management */}
        {activeSection === "high-admission" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">예고 입시정보 관리</h2>
              <Button onClick={() => {
                setEditingHighAdmission(null);
                setShowHighAdmissionForm(true);
              }}>
                <Plus className="w-4 h-4 mr-2" />
                새 예고 입시정보
              </Button>
            </div>

            <div className="bg-white border rounded-lg">
              {highAdmissions.length === 0 ? (
                <div className="p-8 text-center">
                  <GraduationCap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">등록된 예고 입시정보가 없습니다.</p>
                </div>
              ) : (
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">번호</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">글제목</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성일</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {highAdmissions.map((admission: HighSchoolAdmission, index: number) => (
                        <tr key={admission.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {highAdmissions.length - index}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{admission.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline" className="text-xs">{admission.category}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(admission.createdAt).toLocaleDateString('ko-KR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditingHighAdmission(admission);
                                  setShowHighAdmissionForm(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteHighAdmissionMutation.mutate(admission.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Roadmap Management Section */}
        {activeSection === "roadmap" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-900">로드맵 관리</h2>
              <div className="text-sm text-gray-600">
                홈페이지 로드맵 버튼과 연결된 콘텐츠를 관리합니다
              </div>
            </div>

            {/* Roadmap Forms Section */}
            <div className="space-y-8">
              <Card className="border-orange-200 shadow-lg">
                <CardHeader className="bg-orange-50 border-b border-orange-200">
                  <CardTitle className="flex items-center gap-2">
                    <School className="h-5 w-5 text-orange-600" />
                    예중 입시 로드맵 편집
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    홈페이지 "예중 입시로드맵 보기" 버튼과 연결된 페이지의 콘텐츠를 편집합니다
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <RoadmapForm type="middle_school" />
                </CardContent>
              </Card>

              <Card className="border-blue-200 shadow-lg">
                <CardHeader className="bg-blue-50 border-b border-blue-200">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    예고 입시 로드맵 편집
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    홈페이지 "예고 입시로드맵 보기" 버튼과 연결된 페이지의 콘텐츠를 편집합니다
                  </p>
                </CardHeader>
                <CardContent className="p-6">
                  <RoadmapForm type="high_school" />
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Dialogs */}
        <Dialog open={showNoticeForm} onOpenChange={(open) => {
          setShowNoticeForm(open);
          if (!open) {
            setEditingNotice(null);
          }
        }}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingNotice ? "공지사항 수정" : "새 공지사항"}
              </DialogTitle>
            </DialogHeader>
            <NoticeForm
              notice={editingNotice}
              onSuccess={() => {
                setShowNoticeForm(false);
                setEditingNotice(null);
              }}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={showGalleryForm} onOpenChange={(open) => {
          setShowGalleryForm(open);
          if (!open) {
            setEditingGallery(null);
          }
        }}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingGallery ? "갤러리 수정" : "새 갤러리 항목"}
              </DialogTitle>
            </DialogHeader>
            <GalleryForm
              item={editingGallery}
              onSuccess={() => {
                setShowGalleryForm(false);
                setEditingGallery(null);
              }}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={showMiddleAdmissionForm} onOpenChange={(open) => {
          setShowMiddleAdmissionForm(open);
          if (!open) {
            setEditingMiddleAdmission(null);
          }
        }}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingMiddleAdmission ? "예중 입시정보 수정" : "새 예중 입시정보"}
              </DialogTitle>
            </DialogHeader>
            <MiddleSchoolAdmissionForm
              admission={editingMiddleAdmission || undefined}
              onSuccess={() => {
                setShowMiddleAdmissionForm(false);
                setEditingMiddleAdmission(null);
              }}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={showHighAdmissionForm} onOpenChange={(open) => {
          setShowHighAdmissionForm(open);
          if (!open) {
            setEditingHighAdmission(null);
          }
        }}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingHighAdmission ? "예고 입시정보 수정" : "새 예고 입시정보"}
              </DialogTitle>
            </DialogHeader>
            <HighSchoolAdmissionForm
              admission={editingHighAdmission || undefined}
              onSuccess={() => {
                setShowHighAdmissionForm(false);
                setEditingHighAdmission(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          credentials: 'include'
        });
        setIsLoggedIn(response.ok);
      } catch {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLoginSuccess = (sessionId: string) => {
    setIsLoggedIn(true);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>;
  }

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return <AdminDashboard />;
}