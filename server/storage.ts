import { users, notices, galleryItems, type User, type InsertUser, type InsertNotice, type UpdateNotice, type Notice, type InsertGalleryItem, type UpdateGalleryItem, type GalleryItem } from "@shared/schema";

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

  // Gallery methods
  getAllGalleryItems(page?: number, limit?: number, category?: string): Promise<{ items: GalleryItem[], total: number }>;
  getGalleryItem(id: number): Promise<GalleryItem | undefined>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  updateGalleryItem(id: number, updates: UpdateGalleryItem): Promise<GalleryItem | undefined>;
  deleteGalleryItem(id: number): Promise<boolean>;

  // Stats
  getStats(): Promise<{ totalNotices: number, totalImages: number, monthlyVisitors: number, viewsGrowth: string }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private notices: Map<number, Notice>;
  private galleryItems: Map<number, GalleryItem>;
  private currentUserId: number;
  private currentNoticeId: number;
  private currentGalleryItemId: number;

  constructor() {
    this.users = new Map();
    this.notices = new Map();
    this.galleryItems = new Map();
    this.currentUserId = 1;
    this.currentNoticeId = 1;
    this.currentGalleryItemId = 1;

    // Create default admin user
    this.createUser({ username: "admin", password: "admin123" }).then(user => {
      this.users.set(user.id, { ...user, isAdmin: true });
    });
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
      ...insertNotice,
      id,
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
      updatedAt: new Date(),
    };
    this.notices.set(id, updatedNotice);
    return updatedNotice;
  }

  async deleteNotice(id: number): Promise<boolean> {
    return this.notices.delete(id);
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
      ...insertItem,
      id,
      createdAt: new Date(),
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
    };
    this.galleryItems.set(id, updatedItem);
    return updatedItem;
  }

  async deleteGalleryItem(id: number): Promise<boolean> {
    return this.galleryItems.delete(id);
  }

  async getStats(): Promise<{ totalNotices: number, totalImages: number, monthlyVisitors: number, viewsGrowth: string }> {
    return {
      totalNotices: this.notices.size,
      totalImages: this.galleryItems.size,
      monthlyVisitors: 3247,
      viewsGrowth: "+12%"
    };
  }
}

export const storage = new MemStorage();
