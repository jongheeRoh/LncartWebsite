import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Notice, InsertNotice } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Edit2, Trash2, ArrowLeft, Save, X, Plus, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EnhancedRichTextEditor from "@/components/ui/enhanced-rich-text-editor";
import NoticeForm from "@/components/notices/notice-form";
import { apiRequest, getQueryFn } from "@/lib/queryClient";
import AdminLogin from "./admin-login";
import type { GalleryItem, Roadmap } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@assets/스크린샷 2025-06-25 222106_1750857872681.png";

// 입시정보 리스트 컴포넌트
function EntranceInfoList({ category, onNoticeClick }: { category: string, onNoticeClick: (notice: Notice) => void }) {
  const { data: notices, isLoading } = useQuery({
    queryKey: ['/api/notices', { category }],
    queryFn: async () => {
      const response = await fetch(`/api/notices?category=${encodeURIComponent(category)}`);
      if (!response.ok) throw new Error('Failed to fetch notices');
      return response.json();
    },
  });

  if (isLoading) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  if (!notices?.notices?.length) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">등록된 {category === '예중입시정보' ? '예중' : '예고'} 입시정보가 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {notices.notices.map((notice: Notice) => (
        <Card key={notice.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNoticeClick(notice)}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{notice.title}</CardTitle>
              <Badge variant={notice.category === '긴급' ? 'destructive' : 'secondary'}>
                {notice.category}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              작성일: {format(new Date(notice.createdAt), 'yyyy년 MM월 dd일', { locale: ko })}
            </p>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

function AdminNoticeManager() {
  const [viewMode, setViewMode] = useState<'list' | 'view' | 'edit' | 'create' | 'middle_entrance' | 'high_entrance'>('list');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
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
    mutationFn: async ({ id, title, content, category }: { id: number, title: string, content: string, category: string }) => {
      const response = await authenticatedFetch(`/api/notices/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, category }),
      });
      if (!response.ok) throw new Error('공지사항 수정 실패');
      return response.json();
    },
    onSuccess: (updatedNotice) => {
      toast({ title: "공지사항이 수정되었습니다" });
      setSelectedNotice(updatedNotice);
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
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('공지사항을 찾을 수 없습니다');
        }
        throw new Error('삭제 실패');
      }
      return true;
    },
    onSuccess: () => {
      toast({ title: "공지사항이 삭제되었습니다" });
      queryClient.invalidateQueries({ queryKey: ['/api/notices'] });
      setViewMode('list');
      setSelectedNotice(null);
    },
    onError: (error: Error) => {
      toast({ 
        title: "삭제 실패", 
        description: error.message,
        variant: "destructive" 
      });
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
    if (selectedNotice && !deleteNotice.isPending && confirm('정말 삭제하시겠습니까?')) {
      deleteNotice.mutate(selectedNotice.id);
    }
  };

  // View mode - individual notice view
  if (viewMode === 'view' && selectedNotice) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBackToList}>
            <ArrowLeft className="h-4 w-4 mr-2" />
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
              <CardTitle className="text-xl">{selectedNotice?.title}</CardTitle>
              <Badge variant={selectedNotice?.category === '긴급' ? 'destructive' : 'secondary'}>
                {selectedNotice?.category}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              작성일: {selectedNotice?.createdAt && format(new Date(selectedNotice.createdAt), 'yyyy년 MM월 dd일 HH:mm', { locale: ko })}
            </p>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedNotice?.content || '' }}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Edit mode
  if (viewMode === 'edit' && selectedNotice) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setViewMode('view')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            돌아가기
          </Button>
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
                  <SelectItem value="예중입시정보">예중입시정보</SelectItem>
                  <SelectItem value="예고입시정보">예고입시정보</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">내용</label>
              <EnhancedRichTextEditor
                value={editContent}
                onChange={setEditContent}
                placeholder="공지사항 내용을 입력하세요..."
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center gap-4 py-6">
          <Button variant="outline" onClick={() => setViewMode('view')} className="min-w-[100px]">
            취소
          </Button>
          <Button onClick={handleSaveEdit} disabled={updateNotice.isPending} className="min-w-[100px]">
            <Save className="h-4 w-4 mr-2" />
            {updateNotice.isPending ? '저장중...' : '저장'}
          </Button>
        </div>
      </div>
    );
  }

  // Create mode
  if (viewMode === 'create') {
    return (
      <div className="space-y-6">
        <div className="flex gap-2 mb-4 flex-wrap">
          <Button
            variant='outline'
            onClick={() => {
              if (selectedCategory === '예중입시정보') {
                setViewMode('middle_entrance');
              } else if (selectedCategory === '예고입시정보') {
                setViewMode('high_entrance');
              } else {
                setViewMode('list');
              }
              setSelectedCategory('');
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            돌아가기
          </Button>
        </div>
        <NoticeForm 
          onSuccess={() => {
            if (selectedCategory === '예중입시정보') {
              setViewMode('middle_entrance');
            } else if (selectedCategory === '예고입시정보') {
              setViewMode('high_entrance');
            } else {
              setViewMode('list');
            }
            queryClient.invalidateQueries({ queryKey: ['/api/notices'] });
            setSelectedCategory('');
          }}
          notice={selectedCategory ? { category: selectedCategory } : undefined}
        />
      </div>
    );
  }

  // Middle entrance info mode
  if (viewMode === 'middle_entrance') {
    return (
      <div className="space-y-6">
        <div className="flex gap-2 mb-4 flex-wrap">
          <Button
            variant='outline'
            onClick={() => setViewMode('list')}
          >
            공지사항 목록
          </Button>
          <Button
            variant='default'
          >
            예중 입시정보
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              setViewMode('high_entrance');
              setSelectedCategory('예고입시정보');
            }}
          >
            예고 입시정보
          </Button>
        </div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">예중 입시정보 관리</h2>
          <Button onClick={() => {
            setViewMode('create');
            setSelectedCategory('예중입시정보');
          }}>
            새 입시정보 추가
          </Button>
        </div>
        <EntranceInfoList category="예중입시정보" onNoticeClick={handleNoticeClick} />
      </div>
    );
  }

  // High school entrance info mode
  if (viewMode === 'high_entrance') {
    return (
      <div className="space-y-6">
        <div className="flex gap-2 mb-4 flex-wrap">
          <Button
            variant='outline'
            onClick={() => setViewMode('list')}
          >
            공지사항 목록
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              setViewMode('middle_entrance');
              setSelectedCategory('예중입시정보');
            }}
          >
            예중 입시정보
          </Button>
          <Button
            variant='default'
          >
            예고 입시정보
          </Button>
        </div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">예고 입시정보 관리</h2>
          <Button onClick={() => {
            setViewMode('create');
            setSelectedCategory('예고입시정보');
          }}>
            새 입시정보 추가
          </Button>
        </div>
        <EntranceInfoList category="예고입시정보" onNoticeClick={handleNoticeClick} />
      </div>
    );
  }

  // List view (default)
  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-4 flex-wrap">
        <Button
          variant='default'
        >
          공지사항 목록
        </Button>
        <Button
          variant='outline'
          onClick={() => setViewMode('create')}
        >
          새 공지사항
        </Button>
        <Button
          variant='outline'
          onClick={() => {
            setViewMode('middle_entrance');
            setSelectedCategory('예중입시정보');
          }}
        >
          예중 입시정보
        </Button>
        <Button
          variant='outline'
          onClick={() => {
            setViewMode('high_entrance');
            setSelectedCategory('예고입시정보');
          }}
        >
          예고 입시정보
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
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
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = (newSessionId: string) => {
    setSessionId(newSessionId);
    setIsLoggedIn(true);
    localStorage.setItem('adminSessionId', newSessionId);
  };

  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10">
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">관리자 패널</h1>
        <Button 
          variant="outline" 
          onClick={() => {
            setIsLoggedIn(false);
            setSessionId(null);
            localStorage.removeItem('adminSessionId');
          }}
        >
          로그아웃
        </Button>
      </div>

      <div className="space-y-8">
        <AdminNoticeManager />
      </div>
    </div>
  );
}