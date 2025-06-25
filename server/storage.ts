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

    // Add sample notices
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    // Sample notices
    const sampleNotices = [
      {
        title: "2024년 예중 입시 설명회 안내",
        content: "2024년 예술중학교 입시를 준비하는 학생과 학부모님들을 위한 설명회를 개최합니다. 입시 전형 방법, 준비 과정, 포트폴리오 작성법 등에 대해 자세히 안내해드리겠습니다.",
        excerpt: "예중 입시 설명회가 3월 15일 오후 2시에 개최됩니다.",
        category: "긴급"
      },
      {
        title: "신학기 수업 시간표 안내",
        content: "새 학기가 시작됨에 따라 수업 시간표를 안내해드립니다. 기초소묘반, 수채화반, 디자인반 등 각 반별 시간표를 확인하시기 바랍니다.",
        excerpt: "신학기 수업 시간표가 업데이트되었습니다.",
        category: "일반"
      },
      {
        title: "학생 작품 전시회 개최",
        content: "우리 학원 학생들의 우수한 작품들을 선보이는 전시회를 개최합니다. 한 학기 동안 열심히 작업한 학생들의 성과를 확인하실 수 있습니다.",
        excerpt: "학생 작품 전시회가 4월 중 개최될 예정입니다.",
        category: "이벤트"
      }
    ];

    for (const notice of sampleNotices) {
      await this.createNotice(notice);
    }

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
      id,
      title: insertItem.title,
      description: insertItem.description,
      imageUrl: insertItem.imageUrl,
      category: insertItem.category || "전체",
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

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllNotices(page: number = 1, limit: number = 10, category?: string, search?: string): Promise<{ notices: Notice[], total: number }> {
    let whereConditions = [];
    
    if (category && category !== "전체") {
      whereConditions.push(eq(notices.category, category));
    }
    
    if (search) {
      whereConditions.push(like(notices.title, `%${search}%`));
    }

    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;

    const [totalResult] = await db
      .select({ count: count() })
      .from(notices)
      .where(whereClause);

    const noticesList = await db
      .select()
      .from(notices)
      .where(whereClause)
      .orderBy(desc(notices.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    return {
      notices: noticesList,
      total: totalResult.count
    };
  }

  async getNotice(id: number): Promise<Notice | undefined> {
    const [notice] = await db.select().from(notices).where(eq(notices.id, id));
    return notice || undefined;
  }

  async createNotice(insertNotice: InsertNotice): Promise<Notice> {
    const [notice] = await db
      .insert(notices)
      .values(insertNotice)
      .returning();
    return notice;
  }

  async updateNotice(id: number, updates: UpdateNotice): Promise<Notice | undefined> {
    const [notice] = await db
      .update(notices)
      .set(updates)
      .where(eq(notices.id, id))
      .returning();
    return notice || undefined;
  }

  async deleteNotice(id: number): Promise<boolean> {
    const result = await db.delete(notices).where(eq(notices.id, id));
    return result.rowCount > 0;
  }

  async getAllGalleryItems(page: number = 1, limit: number = 12, category?: string): Promise<{ items: GalleryItem[], total: number }> {
    let whereConditions = [];
    
    if (category && category !== "전체") {
      whereConditions.push(eq(galleryItems.category, category));
    }

    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;

    const [totalResult] = await db
      .select({ count: count() })
      .from(galleryItems)
      .where(whereClause);

    const items = await db
      .select()
      .from(galleryItems)
      .where(whereClause)
      .orderBy(desc(galleryItems.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    return {
      items: items,
      total: totalResult.count
    };
  }

  async getGalleryItem(id: number): Promise<GalleryItem | undefined> {
    const [item] = await db.select().from(galleryItems).where(eq(galleryItems.id, id));
    return item || undefined;
  }

  async createGalleryItem(insertItem: InsertGalleryItem): Promise<GalleryItem> {
    const [item] = await db
      .insert(galleryItems)
      .values(insertItem)
      .returning();
    return item;
  }

  async updateGalleryItem(id: number, updates: UpdateGalleryItem): Promise<GalleryItem | undefined> {
    const [item] = await db
      .update(galleryItems)
      .set(updates)
      .where(eq(galleryItems.id, id))
      .returning();
    return item || undefined;
  }

  async deleteGalleryItem(id: number): Promise<boolean> {
    const result = await db.delete(galleryItems).where(eq(galleryItems.id, id));
    return result.rowCount > 0;
  }

  async getStats(): Promise<{ totalNotices: number, totalImages: number, monthlyVisitors: number, viewsGrowth: string }> {
    const [noticesCount] = await db.select({ count: count() }).from(notices);
    const [imagesCount] = await db.select({ count: count() }).from(galleryItems);
    
    return {
      totalNotices: noticesCount.count,
      totalImages: imagesCount.count,
      monthlyVisitors: 1250,
      viewsGrowth: "+12.5%"
    };
  }
}

export const storage = new DatabaseStorage();
