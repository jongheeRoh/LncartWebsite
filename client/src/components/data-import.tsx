import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, Download, FileText, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function DataImportDialog() {
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 형식 검증
    const allowedTypes = ['application/json', 'text/csv'];
    if (!allowedTypes.includes(file.type) && !file.name.endsWith('.json') && !file.name.endsWith('.csv')) {
      toast({
        title: "파일 형식 오류",
        description: "JSON 또는 CSV 파일만 업로드 가능합니다.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('dataFile', file);

      const sessionId = localStorage.getItem('adminSessionId');
      const response = await fetch('/api/import-data', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionId}`
        },
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "데이터 가져오기 성공",
          description: result.message,
        });
        setIsOpen(false);
        // 페이지 새로고침 또는 데이터 다시 불러오기
        window.location.reload();
      } else {
        toast({
          title: "데이터 가져오기 실패",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "오류 발생",
        description: "데이터 가져오기 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // 파일 input 초기화
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const downloadSampleData = async () => {
    try {
      const sessionId = localStorage.getItem('adminSessionId');
      const response = await fetch('/api/sample-data', {
        headers: {
          'Authorization': `Bearer ${sessionId}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sample-data.json';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        toast({
          title: "샘플 파일 다운로드",
          description: "샘플 데이터 파일이 다운로드되었습니다.",
        });
      }
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "다운로드 실패",
        description: "샘플 파일 다운로드 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Database className="h-4 w-4" />
          데이터 가져오기
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>데이터 가져오기</DialogTitle>
          <DialogDescription>
            JSON 또는 CSV 파일을 업로드하여 공지사항과 갤러리 데이터를 가져올 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Upload className="h-4 w-4" />
                파일 업로드
              </CardTitle>
              <CardDescription className="text-xs">
                JSON 또는 CSV 파일을 선택하여 데이터를 가져오세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <input
                  type="file"
                  accept=".json,.csv"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                <Button 
                  variant="outline" 
                  className="w-full gap-2" 
                  disabled={isUploading}
                >
                  <FileText className="h-4 w-4" />
                  {isUploading ? '업로드 중...' : '파일 선택'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Download className="h-4 w-4" />
                샘플 파일
              </CardTitle>
              <CardDescription className="text-xs">
                데이터 형식을 참고할 수 있는 샘플 파일을 다운로드하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full gap-2"
                onClick={downloadSampleData}
              >
                <Download className="h-4 w-4" />
                샘플 데이터 다운로드
              </Button>
            </CardContent>
          </Card>

          <div className="text-xs text-gray-500 space-y-1">
            <p><strong>지원 형식:</strong></p>
            <ul className="list-disc list-inside space-y-0.5 ml-2">
              <li>JSON: notices, galleryItems 배열 포함</li>
              <li>CSV: type 컬럼으로 데이터 타입 구분</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}