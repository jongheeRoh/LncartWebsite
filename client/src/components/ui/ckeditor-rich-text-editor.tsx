import { useEffect, useRef } from "react";

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
            'uploadImage',
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

        // Custom upload adapter for image uploads
        editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
          return {
            upload: () => {
              return new Promise((resolve, reject) => {
                const body = new FormData();
                loader.file.then((file: any) => {
                  body.append('file', file);
                  fetch('/api/upload', {
                    method: 'POST',
                    body: body
                  })
                  .then(res => res.json())
                  .then(res => {
                    resolve({
                      default: res.url
                    });
                  })
                  .catch(err => {
                    reject(err);
                  });
                });
              });
            }
          };
        };

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

  return (
    <div className={`ckeditor-container ${className}`}>
      <div ref={editorRef} />
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
            position: static !important;
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