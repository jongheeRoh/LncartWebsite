import { useState, useRef } from 'react';
import { Button } from './button';
import { Badge } from './badge';
import { Upload, X, FileText, Image, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface FileAttachment {
  id: string;
  originalName: string;
  filename: string;
  mimetype: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

interface FileUploadProps {
  files: FileAttachment[];
  onChange: (files: FileAttachment[]) => void;
  maxFiles?: number;
  accept?: string;
}

export default function FileUpload({ files, onChange, maxFiles = 5, accept }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (selectedFiles: FileList) => {
    if (files.length + selectedFiles.length > maxFiles) {
      toast({
        title: "파일 업로드 제한",
        description: `최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`,
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    const newFiles: FileAttachment[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "파일 크기 초과",
          description: `${file.name}은(는) 10MB를 초과합니다.`,
          variant: "destructive",
        });
        continue;
      }

      try {
        const formData = new FormData();
        formData.append('file', file);

        const sessionId = localStorage.getItem('adminSessionId');
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sessionId}`
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const uploadedFile = await response.json();
        newFiles.push(uploadedFile);
      } catch (error) {
        toast({
          title: "업로드 실패",
          description: `${file.name} 업로드에 실패했습니다.`,
          variant: "destructive",
        });
      }
    }

    onChange([...files, ...newFiles]);
    setUploading(false);

    if (newFiles.length > 0) {
      toast({
        title: "업로드 완료",
        description: `${newFiles.length}개의 파일이 업로드되었습니다.`,
      });
    }
  };

  const removeFile = (fileId: string) => {
    onChange(files.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (mimetype: string) => {
    if (mimetype.startsWith('image/')) {
      return <Image className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || files.length >= maxFiles}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          {uploading ? '업로드 중...' : '파일 선택'}
        </Button>
        <span className="text-sm text-gray-500">
          {files.length}/{maxFiles} 파일
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept || ".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.hwp,.zip,.rar"}
        onChange={(e) => {
          if (e.target.files) {
            handleFileSelect(e.target.files);
          }
        }}
        className="hidden"
      />

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">첨부파일</h4>
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  {getFileIcon(file.mimetype)}
                  <div>
                    <p className="text-sm font-medium">{file.originalName}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(file.url, '_blank')}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-xs text-gray-500">
        지원 형식: PDF, JPG, PNG, DOC, XLS, PPT, TXT, HWP, ZIP (최대 10MB)
      </div>
    </div>
  );
}