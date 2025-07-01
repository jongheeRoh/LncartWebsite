import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { convertYouTubeUrlsToIframes } from "@/lib/video-converter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Palette, 
  Video, 
  Type, 
  AlignJustify,
  Heading1,
  Heading2,
  Heading3
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface EnhancedRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function EnhancedRichTextEditor({
  value,
  onChange,
  placeholder = "내용을 입력하세요...",
  minHeight = "300px"
}: EnhancedRichTextEditorProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [videoUrl, setVideoUrl] = useState("");
  const [fontSize, setFontSize] = useState("16");
  const [lineHeight, setLineHeight] = useState("1.6");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        codeBlock: {
          HTMLAttributes: {
            class: 'rounded-lg bg-gray-100 p-4',
          },
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg shadow-sm my-4',
        },
        allowBase64: true,
        inline: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      TextStyle,
      Color,

    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    parseOptions: {
      preserveWhitespace: 'full',
    },
    enableInputRules: true,
    enablePasteRules: true,
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none p-6 video-content rich-editor`,
        style: `min-height: ${minHeight}; font-size: ${fontSize}px; line-height: ${lineHeight};`,
      },
      transformPastedHTML: (html) => {
        // iframe이 제거되지 않도록 보호
        return html;
      },
    },
  });

  // Function to process pasted video URLs
  const processVideoUrls = (text: string) => {
    if (!editor) return;
    
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/g;
    let match;
    
    while ((match = youtubeRegex.exec(text)) !== null) {
      const videoId = match[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      const iframe = `<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; margin: 24px 0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"><iframe src="${embedUrl}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe></div>`;
      
      editor.commands.insertContent(iframe);
      
      // Force immediate rendering
      setTimeout(() => {
        const editorElement = editor.view.dom;
        const newIframes = editorElement.querySelectorAll('iframe:not([data-video-rendered])');
        newIframes.forEach(iframe => {
          const htmlIframe = iframe as HTMLIFrameElement;
          htmlIframe.style.display = 'block';
          htmlIframe.style.visibility = 'visible';
          htmlIframe.setAttribute('data-video-rendered', 'true');
        });
      }, 50);
    }
  };

  // Add real-time video rendering with CSS styling
  useEffect(() => {
    if (!editor) return;

    // Add comprehensive CSS for real-time video rendering
    const style = document.createElement('style');
    style.textContent = `
      .ProseMirror iframe[src*="youtube.com/embed"],
      .ProseMirror iframe[src*="player.vimeo.com"] {
        max-width: 100% !important;
        width: 100% !important;
        height: auto !important;
        aspect-ratio: 16/9 !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
        margin: 12px 0 !important;
        display: block !important;
        border: 0 !important;
      }
      .ProseMirror div[style*="position: relative"] {
        position: relative !important;
        width: 100% !important;
        height: 0 !important;
        padding-bottom: 56.25% !important;
        margin: 24px 0 !important;
        border-radius: 8px !important;
        overflow: hidden !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
      }
      .ProseMirror div[style*="position: relative"] iframe {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        border: 0 !important;
      }
      .video-content iframe {
        pointer-events: auto !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(style);

    // Set up mutation observer to ensure videos render immediately
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              // Find any newly added iframes and ensure they render
              const iframes = element.querySelectorAll('iframe[src*="youtube.com/embed"], iframe[src*="player.vimeo.com"]');
              iframes.forEach((iframe) => {
                iframe.setAttribute('loading', 'eager');
                iframe.setAttribute('data-rendered', 'true');
              });
            }
          });
        }
      });
    });

    observer.observe(editor.view.dom, {
      childList: true,
      subtree: true
    });

    return () => {
      document.head.removeChild(style);
      observer.disconnect();
    };
  }, [editor]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const sessionId = localStorage.getItem('adminSessionId');
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionId}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const imageUrl = `/uploads/${data.filename}`;
        editor?.chain().focus().setImage({ src: imageUrl }).run();
      }
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };

  const addImage = () => {
    if (imageUrl) {
      editor?.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
    }
  };

  const addLink = () => {
    if (linkUrl && linkText) {
      editor?.chain().focus().insertContent(`<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`).run();
      setLinkUrl("");
      setLinkText("");
    }
  };

  const addVideo = () => {
    if (!videoUrl || !editor) return;
    
    // YouTube 비디오 ID 추출
    let videoId = '';
    if (videoUrl.includes('youtube.com/watch?v=')) {
      videoId = videoUrl.split('v=')[1]?.split('&')[0] || '';
    } else if (videoUrl.includes('youtu.be/')) {
      videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0] || '';
    }
    
    if (videoId) {
      // 특수 마커 형태로 삽입하여 나중에 변환 가능하도록 함
      const videoMarker = `[YOUTUBE_VIDEO:${videoId}]`;
      editor.commands.insertContent(`<p>${videoMarker}</p>`);
    } else {
      // 일반 URL
      editor.commands.insertContent(`<p>${videoUrl}</p>`);
    }
    
    setVideoUrl("");
  };

  const setTextColor = () => {
    editor?.chain().focus().setColor(selectedColor).run();
  };

  const updateFontSize = (size: string) => {
    setFontSize(size);
    if (editor?.view?.dom) {
      (editor.view.dom as HTMLElement).style.fontSize = `${size}px`;
    }
  };

  const updateLineHeight = (height: string) => {
    setLineHeight(height);
    if (editor) {
      // Apply line height to the entire content using CSS
      const content = editor.getHTML();
      const wrappedContent = `<div style="line-height: ${height};">${content}</div>`;
      editor.commands.setContent(wrappedContent);
      
      // Also update the editor's DOM element
      if (editor.view?.dom) {
        (editor.view.dom as HTMLElement).style.lineHeight = height;
      }
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Toolbar */}
      <div className="border-b bg-slate-50 p-3">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Headings */}
          <div className="flex gap-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive('heading', { level: 1 }) ? 'bg-slate-200' : ''}
            >
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive('heading', { level: 2 }) ? 'bg-slate-200' : ''}
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editor.isActive('heading', { level: 3 }) ? 'bg-slate-200' : ''}
            >
              <Heading3 className="h-4 w-4" />
            </Button>
          </div>

          <div className="w-px h-6 bg-slate-300"></div>

          {/* Text Formatting */}
          <div className="flex gap-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'bg-slate-200' : ''}
            >
              <Bold className="h-4 w-4" />
            </Button>
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'bg-slate-200' : ''}
            >
              <Italic className="h-4 w-4" />
            </Button>
          </div>

          <div className="w-px h-6 bg-slate-300"></div>

          {/* Font Size */}
          <Select value={fontSize} onValueChange={updateFontSize}>
            <SelectTrigger className="w-24">
              <Type className="h-4 w-4 mr-1" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12px</SelectItem>
              <SelectItem value="14">14px</SelectItem>
              <SelectItem value="16">16px</SelectItem>
              <SelectItem value="18">18px</SelectItem>
              <SelectItem value="20">20px</SelectItem>
              <SelectItem value="24">24px</SelectItem>
              <SelectItem value="28">28px</SelectItem>
              <SelectItem value="32">32px</SelectItem>
            </SelectContent>
          </Select>

          {/* Line Height */}
          <Select value={lineHeight} onValueChange={updateLineHeight}>
            <SelectTrigger className="w-28">
              <AlignJustify className="h-4 w-4 mr-1" />
              <SelectValue placeholder="줄간격" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1.0">아주좁게</SelectItem>
              <SelectItem value="1.2">좁게</SelectItem>
              <SelectItem value="1.4">기본</SelectItem>
              <SelectItem value="1.6">보통</SelectItem>
              <SelectItem value="1.8">넓게</SelectItem>
              <SelectItem value="2.0">매우넓게</SelectItem>
              <SelectItem value="2.5">극넓게</SelectItem>
            </SelectContent>
          </Select>

          <div className="w-px h-6 bg-slate-300"></div>

          {/* Lists */}
          <div className="flex gap-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'bg-slate-200' : ''}
            >
              <List className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'bg-slate-200' : ''}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>

          <div className="w-px h-6 bg-slate-300"></div>

          {/* Media & Links */}
          <div className="flex gap-1">
            {/* Image Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" variant="outline" size="sm">
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>이미지 추가</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>이미지 URL</Label>
                    <Input
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <Label>또는 파일 업로드</Label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    />
                  </div>
                  <Button onClick={addImage} className="w-full">이미지 추가</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Video Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" variant="outline" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>동영상 추가</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>동영상 URL</Label>
                    <Input
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="YouTube, Vimeo URL을 입력하세요"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      지원 형식: YouTube (youtube.com, youtu.be), Vimeo (vimeo.com)
                    </p>
                  </div>
                  <Button onClick={addVideo} className="w-full">동영상 추가</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Link Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" variant="outline" size="sm">
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>링크 추가</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>링크 텍스트</Label>
                    <Input
                      value={linkText}
                      onChange={(e) => setLinkText(e.target.value)}
                      placeholder="링크에 표시될 텍스트"
                    />
                  </div>
                  <div>
                    <Label>URL</Label>
                    <Input
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                  <Button onClick={addLink} className="w-full">링크 추가</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Color Picker */}
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" variant="outline" size="sm">
                  <Palette className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>텍스트 색상</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>색상 선택</Label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-12 h-8 rounded border"
                      />
                      <Input
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                  <Button onClick={setTextColor} className="w-full">색상 적용</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div 
        className="prose prose-sm max-w-none focus-within:outline-none"
        style={{ 
          fontSize: `${fontSize}px`,
          lineHeight: lineHeight,
          minHeight: minHeight
        }}
      >
        <EditorContent editor={editor} />
      </div>
      
      {/* Status Bar */}
      <div className="border-t bg-slate-50 px-3 py-2 text-xs text-slate-500 flex justify-between">
        <span>글자 크기: {fontSize}px | 줄 간격: {lineHeight}</span>
        <span>글자 수: {editor.storage.characterCount?.characters() || 0}자</span>
      </div>
    </div>
  );
}