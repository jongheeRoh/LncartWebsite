import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import type { Notice } from "@shared/schema";

interface NoticeModalProps {
  notice: Notice | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function NoticeModal({ notice, isOpen, onClose }: NoticeModalProps) {
  if (!notice) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <DialogTitle className="text-2xl font-bold text-slate-900">
              {notice.title}
            </DialogTitle>
            <Badge variant="secondary" className="ml-2">
              {notice.category}
            </Badge>
          </div>
          <div className="flex items-center text-sm text-slate-600 mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(notice.createdAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'short'
            })}
          </div>
        </DialogHeader>
        
        <div className="prose max-w-none">
          <div 
            className="notice-content"
            dangerouslySetInnerHTML={{ __html: notice.content }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}