import { users, notices, galleryItems, roadmaps, middleSchoolAdmission, highSchoolAdmission, comments, type User, type InsertUser, type InsertNotice, type UpdateNotice, type Notice, type InsertGalleryItem, type UpdateGalleryItem, type GalleryItem, type Roadmap, type InsertRoadmap, type UpdateRoadmap, type MiddleSchoolAdmission, type InsertMiddleSchoolAdmission, type UpdateMiddleSchoolAdmission, type HighSchoolAdmission, type InsertHighSchoolAdmission, type UpdateHighSchoolAdmission, type Comment, type InsertComment } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Notice methods
  getAllNotices(page?: number, limit?: number, category?: string, search?: string): Promise<{ notices: Notice[], total: number }>;
  getNotice(id: number): Promise<Notice | undefined>;
  createNotice(notice: InsertNotice): Promise<Notice>;
  updateNotice(id: number, updates: UpdateNotice): Promise<Notice | undefined>;
  deleteNotice(id: number): Promise<boolean>;
  incrementNoticeViews(id: number): Promise<void>;

  // Middle School Admission methods
  getAllMiddleSchoolAdmission(page?: number, limit?: number, category?: string, search?: string): Promise<{ items: MiddleSchoolAdmission[], total: number }>;
  getMiddleSchoolAdmission(id: number): Promise<MiddleSchoolAdmission | undefined>;
  createMiddleSchoolAdmission(info: InsertMiddleSchoolAdmission): Promise<MiddleSchoolAdmission>;
  updateMiddleSchoolAdmission(id: number, updates: UpdateMiddleSchoolAdmission): Promise<MiddleSchoolAdmission | undefined>;
  deleteMiddleSchoolAdmission(id: number): Promise<boolean>;

  // High School Admission methods
  getAllHighSchoolAdmission(page?: number, limit?: number, category?: string, search?: string): Promise<{ items: HighSchoolAdmission[], total: number }>;
  getHighSchoolAdmission(id: number): Promise<HighSchoolAdmission | undefined>;
  createHighSchoolAdmission(info: InsertHighSchoolAdmission): Promise<HighSchoolAdmission>;
  updateHighSchoolAdmission(id: number, updates: UpdateHighSchoolAdmission): Promise<HighSchoolAdmission | undefined>;
  deleteHighSchoolAdmission(id: number): Promise<boolean>;

  // Gallery methods
  getAllGalleryItems(page?: number, limit?: number, category?: string): Promise<{ items: GalleryItem[], total: number }>;
  getGalleryItem(id: number): Promise<GalleryItem | undefined>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  updateGalleryItem(id: number, updates: UpdateGalleryItem): Promise<GalleryItem | undefined>;
  deleteGalleryItem(id: number): Promise<boolean>;

  // Roadmap methods
  getRoadmap(type: string): Promise<Roadmap | undefined>;
  createRoadmap(roadmap: InsertRoadmap): Promise<Roadmap>;
  updateRoadmap(type: string, updates: UpdateRoadmap): Promise<Roadmap | undefined>;

  // Stats
  getStats(): Promise<{ totalNotices: number, totalImages: number, totalViews: number, viewsGrowth: string }>;

  // Comment methods
  getComments(type: string, postId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  deleteComment(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private middleSchoolAdmissions: Map<number, MiddleSchoolAdmission>;
  private highSchoolAdmissions: Map<number, HighSchoolAdmission>;
  private currentMiddleSchoolAdmissionId: number;
  private currentHighSchoolAdmissionId: number;
  private users: Map<number, User>;
  private notices: Map<number, Notice>;
  private galleryItems: Map<number, GalleryItem>;
  private roadmaps: Map<string, Roadmap>;
  private currentUserId: number;
  private currentNoticeId: number;
  private currentGalleryItemId: number;
  private currentRoadmapId: number;

  constructor() {
    this.users = new Map();
    this.notices = new Map();
    this.galleryItems = new Map();
    this.roadmaps = new Map();
    this.middleSchoolAdmissions = new Map();
    this.highSchoolAdmissions = new Map();
    this.currentUserId = 1;
    this.currentMiddleSchoolAdmissionId = 1;
    this.currentHighSchoolAdmissionId = 1;
    this.currentNoticeId = 1;
    this.currentGalleryItemId = 1;
    this.currentRoadmapId = 1;

    // Create default admin user
    this.createUser({ username: "admin", password: "admin123" }).then(user => {
      this.users.set(user.id, { ...user, isAdmin: true });
    });

    // Add sample notices
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    // No sample notices - they will be created through admin panel

    // Sample gallery items
    const sampleGalleryItems = [
      {
        title: "기초소묘 - 정물화",
        description: "예중 입시반 학생의 정물 소묘 작품입니다. 형태의 정확성과 명암 표현이 뛰어납니다.",
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop",
        category: "소묘"
      },
      {
        title: "수채화 풍경화",
        description: "자연을 주제로 한 수채화 작품으로, 색채의 조화가 아름답게 표현되었습니다.",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
        category: "수채화"
      },
      {
        title: "디자인 포스터 작품",
        description: "창의적인 아이디어와 디자인 감각이 돋보이는 포스터 작품입니다.",
        imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop",
        category: "디자인"
      },
      {
        title: "예고 입시 자화상",
        description: "예술고등학교 입시를 위한 자화상 작품으로 뛰어난 관찰력을 보여줍니다.",
        imageUrl: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=500&h=500&fit=crop",
        category: "입시작품"
      },
      {
        title: "조소 작품 - 인체",
        description: "점토를 이용한 인체 조소 작품으로 입체감이 잘 표현되었습니다.",
        imageUrl: "https://images.unsplash.com/photo-1594736797933-d0d2ee4e7bf3?w=500&h=500&fit=crop",
        category: "조소"
      },
      {
        title: "연필 소묘 - 인물화",
        description: "섬세한 터치와 정확한 비례로 완성된 인물 소묘 작품입니다.",
        imageUrl: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500&h=500&fit=crop",
        category: "소묘"
      }
    ];

    for (const item of sampleGalleryItems) {
      await this.createGalleryItem(item);
    }

    // Initialize roadmaps
    const middleSchoolRoadmap: Roadmap = {
      id: 1,
      type: "middle_school",
      title: "예중 입시로드맵",
      content: `<h2>예술중학교 입시 로드맵</h2>
<h3>📅 시기별 준비 과정</h3>
<ul>
<li><strong>초등학교 5학년 (기초 다지기)</strong>
  <ul>
    <li>기본 소묘 연습 시작</li>
    <li>관찰력과 표현력 기초 훈련</li>
    <li>다양한 재료 체험 (연필, 수채화 등)</li>
  </ul>
</li>
<li><strong>초등학교 6학년 (본격 준비)</strong>
  <ul>
    <li>실기 시험 유형별 집중 연습</li>
    <li>포트폴리오 제작 시작</li>
    <li>학교별 입시 정보 수집</li>
  </ul>
</li>
</ul>

<h3>🎨 주요 실기 과목</h3>
<ul>
<li><strong>소묘</strong> - 기본기의 핵심, 정확한 관찰과 표현</li>
<li><strong>수채화</strong> - 색채 감각과 기법 습득</li>
<li><strong>디자인</strong> - 창의적 사고와 구성력</li>
</ul>

<h3>🏆 선과색 예중반 특징</h3>
<ul>
<li>30년간 축적된 예중 입시 노하우</li>
<li>개별 맞춤형 지도</li>
<li>체계적인 단계별 커리큘럼</li>
<li>정기적인 모의고사 및 평가</li>
</ul>`,
      attachments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const highSchoolRoadmap: Roadmap = {
      id: 2,
      type: "high_school", 
      title: "예고 입시로드맵",
      content: `<h2>예술고등학교 입시 로드맵</h2>
<h3>📅 시기별 준비 과정</h3>
<ul>
<li><strong>중학교 1-2학년 (기초 실력 향상)</strong>
  <ul>
    <li>탄탄한 기초 실기 실력 구축</li>
    <li>다양한 표현 기법 습득</li>
    <li>작품의 완성도 높이기</li>
  </ul>
</li>
<li><strong>중학교 3학년 (입시 집중)</strong>
  <ul>
    <li>지원 학교별 맞춤 준비</li>
    <li>실전 모의고사 반복 연습</li>
    <li>포트폴리오 완성</li>
  </ul>
</li>
</ul>

<h3>🎨 심화 실기 과목</h3>
<ul>
<li><strong>고급 소묘</strong> - 정밀한 관찰력과 표현 기법</li>
<li><strong>채색화</strong> - 수채화, 아크릴 등 다양한 채색 기법</li>
<li><strong>디자인</strong> - 창의적 발상과 완성도 높은 구성</li>
<li><strong>조소</strong> - 입체적 사고와 조형 감각</li>
</ul>

<h3>🎯 주요 지원 학교</h3>
<ul>
<li>선화예술고등학교</li>
<li>계원예술고등학교</li>
<li>서울예술고등학교</li>
<li>국립전통예술고등학교</li>
</ul>

<h3>🏆 선과색 예고반 특징</h3>
<ul>
<li>선화예고 특화 프로그램</li>
<li>입시 전담 전문 강사진</li>
<li>개인별 약점 보완 시스템</li>
<li>실전과 동일한 모의고사</li>
</ul>`,
      attachments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.roadmaps.set("middle_school", middleSchoolRoadmap);
    this.roadmaps.set("high_school", highSchoolRoadmap);
    this.currentRoadmapId = 3;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      isAdmin: false 
    };
    this.users.set(id, user);
    return user;
  }

  async getAllNotices(page: number = 1, limit: number = 10, category?: string, search?: string): Promise<{ notices: Notice[], total: number }> {
    let filteredNotices = Array.from(this.notices.values());

    if (category && category !== "전체") {
      filteredNotices = filteredNotices.filter(notice => notice.category === category);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredNotices = filteredNotices.filter(notice => 
        notice.title.toLowerCase().includes(searchLower) ||
        notice.content.toLowerCase().includes(searchLower) ||
        notice.excerpt.toLowerCase().includes(searchLower)
      );
    }

    // Sort by createdAt descending
    filteredNotices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const total = filteredNotices.length;
    const startIndex = (page - 1) * limit;
    const notices = filteredNotices.slice(startIndex, startIndex + limit);

    return { notices, total };
  }

  async getNotice(id: number): Promise<Notice | undefined> {
    return this.notices.get(id);
  }

  async createNotice(insertNotice: InsertNotice): Promise<Notice> {
    const id = this.currentNoticeId++;
    const now = new Date();
    const notice: Notice = {
      id,
      title: insertNotice.title,
      content: insertNotice.content,
      excerpt: insertNotice.excerpt,
      category: insertNotice.category || "일반",
      attachments: insertNotice.attachments || [],
      views: 0,
      createdAt: now,
      updatedAt: now,
    };
    this.notices.set(id, notice);
    return notice;
  }

  async updateNotice(id: number, updates: UpdateNotice): Promise<Notice | undefined> {
    const notice = this.notices.get(id);
    if (!notice) return undefined;

    const updatedNotice: Notice = {
      ...notice,
      ...updates,
      views: notice.views || 0,
      updatedAt: new Date(),
    };
    this.notices.set(id, updatedNotice);
    return updatedNotice;
  }

  async deleteNotice(id: number): Promise<boolean> {
    return this.notices.delete(id);
  }

  async incrementNoticeViews(id: number): Promise<void> {
    const notice = this.notices.get(id);
    if (notice) {
      const updatedNotice = { ...notice, views: (notice.views || 0) + 1 };
      this.notices.set(id, updatedNotice);
    }
  }

  async getAllGalleryItems(page: number = 1, limit: number = 12, category?: string): Promise<{ items: GalleryItem[], total: number }> {
    let filteredItems = Array.from(this.galleryItems.values());

    if (category && category !== "전체") {
      filteredItems = filteredItems.filter(item => item.category === category);
    }

    // Sort by createdAt descending
    filteredItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const total = filteredItems.length;
    const startIndex = (page - 1) * limit;
    const items = filteredItems.slice(startIndex, startIndex + limit);

    return { items, total };
  }

  async getGalleryItem(id: number): Promise<GalleryItem | undefined> {
    return this.galleryItems.get(id);
  }

  async createGalleryItem(insertItem: InsertGalleryItem): Promise<GalleryItem> {
    const id = this.currentGalleryItemId++;
    const item: GalleryItem = {
      id,
      title: insertItem.title,
      description: insertItem.description,
      imageUrl: insertItem.imageUrl,
      category: insertItem.category || "전체",
      attachments: insertItem.attachments || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.galleryItems.set(id, item);
    return item;
  }

  async updateGalleryItem(id: number, updates: UpdateGalleryItem): Promise<GalleryItem | undefined> {
    const item = this.galleryItems.get(id);
    if (!item) return undefined;

    const updatedItem: GalleryItem = {
      ...item,
      ...updates,
      updatedAt: new Date(),
    };
    this.galleryItems.set(id, updatedItem);
    return updatedItem;
  }

  async deleteGalleryItem(id: number): Promise<boolean> {
    return this.galleryItems.delete(id);
  }

  async getRoadmap(type: string): Promise<Roadmap | undefined> {
    return this.roadmaps.get(type);
  }

  async createRoadmap(insertRoadmap: InsertRoadmap): Promise<Roadmap> {
    const roadmap: Roadmap = {
      id: this.currentRoadmapId++,
      type: insertRoadmap.type,
      title: insertRoadmap.title,
      content: insertRoadmap.content,
      attachments: insertRoadmap.attachments || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.roadmaps.set(roadmap.type, roadmap);
    return roadmap;
  }

  async updateRoadmap(type: string, updates: UpdateRoadmap): Promise<Roadmap | undefined> {
    const existing = this.roadmaps.get(type);
    if (!existing) {
      return undefined;
    }

    const updatedRoadmap: Roadmap = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    
    this.roadmaps.set(type, updatedRoadmap);
    return updatedRoadmap;
  }

  async getStats(): Promise<{ totalNotices: number, totalImages: number, totalViews: number, viewsGrowth: string }> {
    return {
      totalNotices: this.notices.size,
      totalImages: this.galleryItems.size,
      totalViews: 0,
      viewsGrowth: "0%"
    };
  }

  // Middle School Admission methods
  async getAllMiddleSchoolAdmission(page: number = 1, limit: number = 10, category?: string, search?: string): Promise<{ items: MiddleSchoolAdmission[], total: number }> {
    const allItems = Array.from(this.middleSchoolAdmissions.values());
    let filteredItems = allItems;

    if (category) {
      filteredItems = filteredItems.filter(item => item.category === category);
    }

    if (search) {
      filteredItems = filteredItems.filter(item => 
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    const startIndex = (page - 1) * limit;
    const items = filteredItems.slice(startIndex, startIndex + limit);

    return { items, total: filteredItems.length };
  }

  async getMiddleSchoolAdmission(id: number): Promise<MiddleSchoolAdmission | undefined> {
    return this.middleSchoolAdmissions.get(id);
  }

  async createMiddleSchoolAdmission(insertAdmission: InsertMiddleSchoolAdmission): Promise<MiddleSchoolAdmission> {
    const id = this.currentMiddleSchoolAdmissionId++;
    const admission: MiddleSchoolAdmission = {
      id,
      title: insertAdmission.title,
      content: insertAdmission.content,
      excerpt: insertAdmission.excerpt || null,
      category: insertAdmission.category || "일반",
      attachments: insertAdmission.attachments || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.middleSchoolAdmissions.set(id, admission);
    return admission;
  }

  async updateMiddleSchoolAdmission(id: number, updates: UpdateMiddleSchoolAdmission): Promise<MiddleSchoolAdmission | undefined> {
    const existing = this.middleSchoolAdmissions.get(id);
    if (!existing) return undefined;

    const updated: MiddleSchoolAdmission = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    this.middleSchoolAdmissions.set(id, updated);
    return updated;
  }

  async deleteMiddleSchoolAdmission(id: number): Promise<boolean> {
    return this.middleSchoolAdmissions.delete(id);
  }

  // High School Admission methods
  async getAllHighSchoolAdmission(page: number = 1, limit: number = 10, category?: string, search?: string): Promise<{ items: HighSchoolAdmission[], total: number }> {
    const allItems = Array.from(this.highSchoolAdmissions.values());
    let filteredItems = allItems;

    if (category) {
      filteredItems = filteredItems.filter(item => item.category === category);
    }

    if (search) {
      filteredItems = filteredItems.filter(item => 
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    const startIndex = (page - 1) * limit;
    const items = filteredItems.slice(startIndex, startIndex + limit);

    return { items, total: filteredItems.length };
  }

  async getHighSchoolAdmission(id: number): Promise<HighSchoolAdmission | undefined> {
    return this.highSchoolAdmissions.get(id);
  }

  async createHighSchoolAdmission(insertAdmission: InsertHighSchoolAdmission): Promise<HighSchoolAdmission> {
    const id = this.currentHighSchoolAdmissionId++;
    const admission: HighSchoolAdmission = {
      id,
      title: insertAdmission.title,
      content: insertAdmission.content,
      excerpt: insertAdmission.excerpt || null,
      category: insertAdmission.category || "일반",
      attachments: insertAdmission.attachments || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.highSchoolAdmissions.set(id, admission);
    return admission;
  }

  async updateHighSchoolAdmission(id: number, updates: UpdateHighSchoolAdmission): Promise<HighSchoolAdmission | undefined> {
    const existing = this.highSchoolAdmissions.get(id);
    if (!existing) return undefined;

    const updated: HighSchoolAdmission = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    this.highSchoolAdmissions.set(id, updated);
    return updated;
  }

  async deleteHighSchoolAdmission(id: number): Promise<boolean> {
    return this.highSchoolAdmissions.delete(id);
  }

  // Comment methods
  async getComments(type: string, postId: number): Promise<Comment[]> {
    // Simple in-memory implementation
    return [];
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    // Simple in-memory implementation
    const comment: Comment = {
      ...insertComment,
      id: Date.now(),
      createdAt: new Date(),
    };
    return comment;
  }

  async deleteComment(id: number): Promise<boolean> {
    // Simple in-memory implementation
    return true;
  }
}

// Simple admin authentication storage
export interface IAuthStorage {
  validateAdmin(username: string, password: string): Promise<boolean>;
}

export class AuthStorage implements IAuthStorage {
  // Single admin credentials - in production, use proper hashing
  private readonly ADMIN_USERNAME = "admin";
  private readonly ADMIN_PASSWORD = "line2024!"; // Change this in production

  async validateAdmin(username: string, password: string): Promise<boolean> {
    console.log("Auth validation:", { username, password: "***" });
    const isValid = username === this.ADMIN_USERNAME && password === this.ADMIN_PASSWORD;
    console.log("Auth result:", isValid);
    return isValid;
  }
}

export const authStorage = new AuthStorage();

import { DatabaseStorage } from "./db-storage";

export const storage = new DatabaseStorage();
