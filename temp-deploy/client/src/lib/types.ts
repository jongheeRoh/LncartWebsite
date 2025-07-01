export interface PaginationInfo {
  current: number;
  total: number;
  limit: number;
}

export interface NoticeFilters {
  category?: string;
  search?: string;
}

export interface GalleryFilters {
  category?: string;
}

export const NOTICE_CATEGORIES = ["전체", "일반", "긴급", "이벤트"] as const;
export const GALLERY_CATEGORIES = ["전체", "소묘", "수채화", "디자인", "조소", "입시작품"] as const;

export type NoticeCategory = typeof NOTICE_CATEGORIES[number];
export type GalleryCategory = typeof GALLERY_CATEGORIES[number];
