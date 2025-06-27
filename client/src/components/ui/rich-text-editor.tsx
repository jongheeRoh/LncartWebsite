import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Button } from './button';
import { Input } from './input';
import { useState, useRef } from 'react';
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo,
  Image as ImageIcon,
  Link as LinkIcon,
  Upload
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  maxImages?: number;
}

export default function RichTextEditor({ content, onChange, placeholder, maxImages = 5 }: RichTextEditorProps) {
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable duplicate extensions that come with StarterKit
        listItem: false,
        bulletList: false,
        orderedList: false,
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    // Check image count limit
    const currentImageCount = getImageCount();
    if (currentImageCount >= maxImages) {
      toast({
        title: "이미지 개수 초과",
        description: `최대 ${maxImages}개의 이미지만 추가할 수 있습니다.`,
        variant: "destructive",
      });
      return;
    }

    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setShowImageDialog(false); // Auto-close dialog
      
      toast({
        title: "이미지 추가 완료",
        description: "이미지가 성공적으로 추가되었습니다.",
      });
    }
  };

  // Count images in current editor content
  const getImageCount = () => {
    const html = editor.getHTML();
    const imageMatches = html.match(/<img[^>]*>/g);
    return imageMatches ? imageMatches.length : 0;
  };

  const handleImageUpload = async (file: File) => {
    // Check image count limit
    const currentImageCount = getImageCount();
    if (currentImageCount >= maxImages) {
      toast({
        title: "이미지 개수 초과",
        description: `최대 ${maxImages}개의 이미지만 추가할 수 있습니다.`,
        variant: "destructive",
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: "오류",
        description: "이미지 파일만 업로드할 수 있습니다.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "파일 크기 초과",
        description: "이미지 크기는 5MB 이하여야 합니다.",
        variant: "destructive",
      });
      return;
    }

    setUploadingImage(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const uploadedFile = await response.json();
      
      // Insert the uploaded image into the editor
      editor.chain().focus().setImage({ src: uploadedFile.url }).run();
      
      // Auto-close the image dialog
      setShowImageDialog(false);
      
      toast({
        title: "업로드 완료",
        description: "이미지가 성공적으로 업로드되었습니다.",
      });
    } catch (error) {
      toast({
        title: "업로드 실패",
        description: "이미지 업로드에 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const addLink = () => {
    if (linkUrl) {
      if (linkText) {
        editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkText}</a>`).run();
      } else {
        editor.chain().focus().setLink({ href: linkUrl }).run();
      }
      setLinkUrl('');
      setLinkText('');
      setShowLinkDialog(false);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg">
      {/* Toolbar */}
      <div className="border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-gray-200' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-gray-200' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'bg-gray-200' : ''}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
        >
          <List className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'bg-gray-200' : ''}
        >
          <Quote className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowImageDialog(!showImageDialog)}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadingImage}
        >
          <Upload className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowLinkDialog(!showLinkDialog)}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageFileSelect}
        className="hidden"
      />

      {/* Image Dialog */}
      {showImageDialog && (
        <div className="p-4 border-b border-gray-300 bg-gray-50">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">이미지 추가</div>
              <div className="text-xs text-gray-500">
                {getImageCount()}/{maxImages} 이미지 사용중
              </div>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="이미지 URL을 입력하세요"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1"
                disabled={getImageCount() >= maxImages}
              />
              <Button 
                type="button" 
                onClick={addImage} 
                size="sm"
                disabled={getImageCount() >= maxImages || !imageUrl}
              >
                URL 추가
              </Button>
            </div>
            <div className="text-center text-sm text-gray-500">또는</div>
            <div className="flex gap-2">
              <Button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage || getImageCount() >= maxImages}
                size="sm"
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                {uploadingImage ? '업로드 중...' : getImageCount() >= maxImages ? '이미지 제한 초과' : '파일 업로드'}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setShowImageDialog(false)}
                size="sm"
              >
                취소
              </Button>
            </div>
            {getImageCount() >= maxImages && (
              <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                최대 {maxImages}개의 이미지까지만 추가할 수 있습니다.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="p-4 border-b border-gray-300 bg-gray-50">
          <div className="space-y-2">
            <Input
              placeholder="링크 URL을 입력하세요"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
            <Input
              placeholder="링크 텍스트 (선택사항)"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
            />
            <div className="flex gap-2">
              <Button type="button" onClick={addLink} size="sm">
                추가
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setShowLinkDialog(false)}
                size="sm"
              >
                취소
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Editor */}
      <EditorContent 
        editor={editor} 
        className="min-h-[200px]"
        placeholder={placeholder}
      />
    </div>
  );
}