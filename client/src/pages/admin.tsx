import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminStats from "@/components/admin/admin-stats";
import NoticeForm from "@/components/notices/notice-form";
import ImageUpload from "@/components/gallery/image-upload";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  PlusCircle,
  Upload,
  Edit,
  CheckSquare,
  Users,
  BarChart3,
  Database,
  Settings,
  Plus,
  Image,
  Download,
  PieChart,
  ChevronRight,
} from "lucide-react";

export default function Admin() {
  const [isNoticeFormOpen, setIsNoticeFormOpen] = useState(false);
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);

  const handleNoticeCreated = () => {
    setIsNoticeFormOpen(false);
  };

  const handleImageUploaded = () => {
    setIsImageUploadOpen(false);
  };

  return (
    <section className="py-16 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">관리자 패널</h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            콘텐츠를 효율적으로 관리하고 시스템을 모니터링하세요.
          </p>
        </div>

        {/* Admin Stats */}
        <AdminStats />

        {/* Admin Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Content Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">콘텐츠 관리</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Dialog open={isNoticeFormOpen} onOpenChange={setIsNoticeFormOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-4 bg-slate-50 hover:bg-slate-100 h-auto"
                    >
                      <div className="flex items-center">
                        <PlusCircle className="text-primary mr-3 h-5 w-5" />
                        <span className="font-medium">새 공지사항 작성</span>
                      </div>
                      <ChevronRight className="text-slate-400 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <NoticeForm onSuccess={handleNoticeCreated} />
                  </DialogContent>
                </Dialog>

                <Dialog open={isImageUploadOpen} onOpenChange={setIsImageUploadOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-4 bg-slate-50 hover:bg-slate-100 h-auto"
                    >
                      <div className="flex items-center">
                        <Upload className="text-primary mr-3 h-5 w-5" />
                        <span className="font-medium">갤러리 이미지 업로드</span>
                      </div>
                      <ChevronRight className="text-slate-400 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <ImageUpload onSuccess={handleImageUploaded} />
                  </DialogContent>
                </Dialog>

                <Button
                  variant="ghost"
                  className="w-full justify-between p-4 bg-slate-50 hover:bg-slate-100 h-auto"
                >
                  <div className="flex items-center">
                    <Edit className="text-primary mr-3 h-5 w-5" />
                    <span className="font-medium">콘텐츠 수정 및 관리</span>
                  </div>
                  <ChevronRight className="text-slate-400 h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-between p-4 bg-slate-50 hover:bg-slate-100 h-auto"
                >
                  <div className="flex items-center">
                    <CheckSquare className="text-primary mr-3 h-5 w-5" />
                    <span className="font-medium">일괄 처리 작업</span>
                  </div>
                  <ChevronRight className="text-slate-400 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">시스템 관리</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  className="w-full justify-between p-4 bg-slate-50 hover:bg-slate-100 h-auto"
                >
                  <div className="flex items-center">
                    <Users className="text-primary mr-3 h-5 w-5" />
                    <span className="font-medium">사용자 권한 관리</span>
                  </div>
                  <ChevronRight className="text-slate-400 h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-between p-4 bg-slate-50 hover:bg-slate-100 h-auto"
                >
                  <div className="flex items-center">
                    <BarChart3 className="text-primary mr-3 h-5 w-5" />
                    <span className="font-medium">통계 및 분석</span>
                  </div>
                  <ChevronRight className="text-slate-400 h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-between p-4 bg-slate-50 hover:bg-slate-100 h-auto"
                >
                  <div className="flex items-center">
                    <Database className="text-primary mr-3 h-5 w-5" />
                    <span className="font-medium">데이터베이스 백업</span>
                  </div>
                  <ChevronRight className="text-slate-400 h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-between p-4 bg-slate-50 hover:bg-slate-100 h-auto"
                >
                  <div className="flex items-center">
                    <Settings className="text-primary mr-3 h-5 w-5" />
                    <span className="font-medium">시스템 설정</span>
                  </div>
                  <ChevronRight className="text-slate-400 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Toolbar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">빠른 작업</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Dialog open={isNoticeFormOpen} onOpenChange={setIsNoticeFormOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    공지 작성
                  </Button>
                </DialogTrigger>
              </Dialog>

              <Dialog open={isImageUploadOpen} onOpenChange={setIsImageUploadOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Image className="mr-2 h-4 w-4" />
                    이미지 추가
                  </Button>
                </DialogTrigger>
              </Dialog>

              <Button className="bg-orange-600 hover:bg-orange-700">
                <Download className="mr-2 h-4 w-4" />
                데이터 내보내기
              </Button>

              <Button className="bg-purple-600 hover:bg-purple-700">
                <PieChart className="mr-2 h-4 w-4" />
                보고서 보기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
