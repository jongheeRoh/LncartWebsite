import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image } from "lucide-react";

interface CKEditorRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

declare global {
  interface Window {
    ClassicEditor: any;
  }
}

export default function CKEditorRichTextEditor({
  value,
  onChange,
  placeholder = "내용을 입력하세요...",
  className = ""
}: CKEditorRichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<any>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editorRef.current || !window.ClassicEditor) return;

    const initEditor = async () => {
      try {
        const editor = await window.ClassicEditor.create(editorRef.current, {
          placeholder,
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            '|',
            'link',
            'blockQuote',
            'insertTable',

            'mediaEmbed',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'undo',
            'redo'
          ],
          heading: {
            options: [
              { model: 'paragraph', title: '본문', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: '제목 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: '제목 2', class: 'ck-heading_heading2' },
              { model: 'heading3', view: 'h3', title: '제목 3', class: 'ck-heading_heading3' }
            ]
          },

          table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
          },
          mediaEmbed: {
            previewsInData: true
          }
        });

        // Set initial content
        if (value) {
          editor.setData(value);
        }

        // Listen for changes
        editor.model.document.on('change:data', () => {
          const data = editor.getData();
          onChange(data);
        });

        editorInstanceRef.current = editor;

      } catch (error) {
        console.error('CKEditor initialization error:', error);
      }
    };

    // Wait for CKEditor to load
    if (window.ClassicEditor) {
      initEditor();
    } else {
      const checkEditor = setInterval(() => {
        if (window.ClassicEditor) {
          clearInterval(checkEditor);
          initEditor();
        }
      }, 100);

      return () => clearInterval(checkEditor);
    }

    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.destroy().catch(console.error);
        editorInstanceRef.current = null;
      }
    };
  }, []);

  // Update editor content when value prop changes
  useEffect(() => {
    if (editorInstanceRef.current && value !== editorInstanceRef.current.getData()) {
      editorInstanceRef.current.setData(value);
    }
  }, [value]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.url;
        
        // Insert image into editor
        if (editorInstanceRef.current) {
          editorInstanceRef.current.execute('insertImage', { source: imageUrl });
        }
        setIsImageDialogOpen(false);
      }
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const handleImageUrlInsert = () => {
    if (imageUrl && editorInstanceRef.current) {
      editorInstanceRef.current.execute('insertImage', { source: imageUrl });
      setImageUrl("");
      setIsImageDialogOpen(false);
    }
  };

  return (
    <div className={`ckeditor-container ${className}`}>
      <div ref={editorRef} />
      
      {/* Image Upload Controls */}
      <div className="mt-3 flex gap-2 items-center">
        <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="sm" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              이미지 삽입
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>이미지 삽입</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>파일 업로드</Label>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>또는 이미지 URL 입력</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  <Button onClick={handleImageUrlInsert} disabled={!imageUrl}>
                    삽입
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .ckeditor-container .ck-editor__editable {
            min-height: 300px !important;
            font-family: 'Pretendard', 'Noto Sans KR', sans-serif !important;
          }
          .ckeditor-container .ck-content {
            font-family: 'Pretendard', 'Noto Sans KR', sans-serif !important;
            padding: 16px !important;
          }
          .ckeditor-container .ck-toolbar {
            position: sticky !important;
            top: 0 !important;
            z-index: 10 !important;
            background: white !important;
            border-bottom: 1px solid #eee !important;
            border-top: 1px solid #e2e8f0 !important;
            border-left: 1px solid #e2e8f0 !important;
            border-right: 1px solid #e2e8f0 !important;
          }
          .ckeditor-container .ck-editor__editable {
            border-left: 1px solid #e2e8f0 !important;
            border-right: 1px solid #e2e8f0 !important;
            border-bottom: 1px solid #e2e8f0 !important;
          }
          .ckeditor-container .ck-focused {
            border-color: #3b82f6 !important;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1) !important;
          }
          .ckeditor-container .ck-content img,
          .ckeditor-container .ck-content iframe {
            max-width: 800px !important;
            width: 100% !important;
            height: auto !important;
            display: block !important;
            margin: 0 auto !important;
          }
          .ckeditor-container .ck-content .media {
            margin: 16px 0 !important;
          }
          .ckeditor-container .ck-content .media iframe {
            border-radius: 8px !important;
          }
        `
      }} />
    </div>
  );
}