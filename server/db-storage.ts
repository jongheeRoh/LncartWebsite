import { eq, desc, like, and } from "drizzle-orm";
import { db } from "./db";
import { users, notices, galleryItems, roadmaps, middleSchoolAdmission, highSchoolAdmission } from "@shared/schema";
import type { 
  User, InsertUser, 
  Notice, InsertNotice, UpdateNotice,
  GalleryItem, InsertGalleryItem, UpdateGalleryItem,
  Roadmap, InsertRoadmap, UpdateRoadmap,
  MiddleSchoolAdmission, InsertMiddleSchoolAdmission, UpdateMiddleSchoolAdmission,
  HighSchoolAdmission, InsertHighSchoolAdmission, UpdateHighSchoolAdmission
} from "@shared/schema";
import type { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  constructor() {
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    try {
      // Check if roadmaps exist, if not create them
      const existingMiddleSchool = await db.select().from(roadmaps).where(eq(roadmaps.type, "middle_school")).limit(1);
      const existingHighSchool = await db.select().from(roadmaps).where(eq(roadmaps.type, "high_school")).limit(1);

      if (existingMiddleSchool.length === 0) {
        await this.createRoadmap({
          type: "middle_school",
          title: "예술중학교 입시 로드맵",
          content: `
            <h2>예술중학교 입시 준비 과정</h2>
            <p>예술중학교 입시는 체계적인 준비가 필요합니다. 우리 학원의 전문적인 커리큘럼을 통해 합격의 꿈을 이루어보세요.</p>
            
            <h3>주요 준비 과정</h3>
            <ul>
              <li><strong>기초 소묘</strong> - 정확한 형태 파악과 명암 표현</li>
              <li><strong>수채화</strong> - 색감과 농도 조절 기법</li>
              <li><strong>디자인</strong> - 창의적 발상과 표현 능력</li>
              <li><strong>조소</strong> - 입체적 조형 감각 개발</li>
            </ul>
            
            <h3>시기별 준비 전략</h3>
            <p><strong>6학년 1학기:</strong> 기초 실기 능력 배양</p>
            <p><strong>6학년 2학기:</strong> 집중 실기 훈련 및 포트폴리오 완성</p>
          `,
          attachments: []
        });
      }

      if (existingHighSchool.length === 0) {
        await this.createRoadmap({
          type: "high_school",
          title: "예술고등학교 입시 로드맵",
          content: `
            <h2>예술고등학교 입시 준비 과정</h2>
            <p>예술고등학교 입시는 더욱 전문적이고 심화된 준비가 필요합니다. 체계적인 커리큘럼으로 목표 달성을 도와드립니다.</p>
            
            <h3>주요 준비 과정</h3>
            <ul>
              <li><strong>심화 소묘</strong> - 정밀 묘사와 창의적 표현</li>
              <li><strong>전문 수채화</strong> - 고급 기법과 개성적 표현</li>
              <li><strong>창의 디자인</strong> - 독창적 발상과 완성도</li>
              <li><strong>포트폴리오</strong> - 개인 작품집 완성</li>
            </ul>
            
            <h3>시기별 준비 전략</h3>
            <p><strong>중학교 3학년 1학기:</strong> 기초 실력 점검 및 보완</p>
            <p><strong>중학교 3학년 2학기:</strong> 집중 훈련 및 실전 대비</p>
          `,
          attachments: []
        });
      }

      // Sample gallery items
      const existingGallery = await db.select().from(galleryItems).limit(1);
      if (existingGallery.length === 0) {
        await this.createGalleryItem({
          title: "수채화 풍경화",
          description: "학생 작품 - 자연의 아름다움을 수채화로 표현한 작품입니다.",
          imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=400&fit=crop",
          category: "수채화",
          attachments: []
        });

        await this.createGalleryItem({
          title: "정물 소묘",
          description: "기초 소묘 연습 - 정확한 형태와 명암을 표현한 작품입니다.",
          imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop",
          category: "소묘",
          attachments: []
        });
      }

      console.log("Database sample data initialized");
    } catch (error) {
      console.error("Error initializing sample data:", error);
    }
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Notice operations
  async getAllNotices(page: number = 1, limit: number = 10, category?: string, search?: string): Promise<{ notices: Notice[], total: number }> {
    console.log(`DB: getAllNotices called with category: "${category}", page: ${page}, limit: ${limit}`);
    
    const allNotices = await db.select().from(notices);
    console.log(`DB: Total notices in database: ${allNotices.length}`);
    
    let filteredNotices = allNotices;

    if (category && category !== "전체") {
      console.log(`DB: Filtering by category: "${category}"`);
      const beforeFilter = filteredNotices.length;
      filteredNotices = filteredNotices.filter((notice: Notice) => {
        console.log(`DB: Checking notice "${notice.title}" with category "${notice.category}" against filter "${category}"`);
        const matches = notice.category === category;
        console.log(`DB: Match result: ${matches}`);
        return matches;
      });
      console.log(`DB: Filtered from ${beforeFilter} to ${filteredNotices.length} notices`);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredNotices = filteredNotices.filter((notice: Notice) => 
        notice.title.toLowerCase().includes(searchLower) ||
        notice.content.toLowerCase().includes(searchLower)
      );
    }

    // Sort by createdAt descending
    filteredNotices.sort((a: Notice, b: Notice) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const total = filteredNotices.length;
    const startIndex = (page - 1) * limit;
    const paginatedNotices = filteredNotices.slice(startIndex, startIndex + limit);

    console.log(`Database: Returning ${paginatedNotices.length} notices out of ${total} total`);
    console.log(`Database: Final result structure:`, { 
      totalFiltered: total, 
      returnedCount: paginatedNotices.length, 
      firstNotice: paginatedNotices[0] ? paginatedNotices[0].title : 'none' 
    });
    
    return { notices: paginatedNotices, total };
  }

  async getNotice(id: number): Promise<Notice | undefined> {
    const [notice] = await db.select().from(notices).where(eq(notices.id, id));
    return notice;
  }

  async createNotice(insertNotice: InsertNotice): Promise<Notice> {
    const [notice] = await db.insert(notices).values(insertNotice).returning();
    console.log(`Database: Notice created - ${notice.title} (ID: ${notice.id})`);
    return notice;
  }

  async updateNotice(id: number, updates: UpdateNotice): Promise<Notice | undefined> {
    const [notice] = await db.update(notices).set(updates).where(eq(notices.id, id)).returning();
    return notice;
  }

  async deleteNotice(id: number): Promise<boolean> {
    const result = await db.delete(notices).where(eq(notices.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Gallery operations
  async getAllGalleryItems(page: number = 1, limit: number = 12, category?: string): Promise<{ items: GalleryItem[], total: number }> {
    let query = db.select().from(galleryItems);
    
    const allItems = await query;
    let filteredItems = allItems;

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
    const [item] = await db.select().from(galleryItems).where(eq(galleryItems.id, id));
    return item;
  }

  async createGalleryItem(insertItem: InsertGalleryItem): Promise<GalleryItem> {
    const [item] = await db.insert(galleryItems).values(insertItem).returning();
    return item;
  }

  async updateGalleryItem(id: number, updates: UpdateGalleryItem): Promise<GalleryItem | undefined> {
    const [item] = await db.update(galleryItems).set(updates).where(eq(galleryItems.id, id)).returning();
    return item;
  }

  async deleteGalleryItem(id: number): Promise<boolean> {
    const result = await db.delete(galleryItems).where(eq(galleryItems.id, id));
    return (result.rowCount || 0) > 0;
  }

  // Roadmap operations
  async getRoadmap(type: string): Promise<Roadmap | undefined> {
    const [roadmap] = await db.select().from(roadmaps).where(eq(roadmaps.type, type));
    return roadmap;
  }

  async createRoadmap(insertRoadmap: InsertRoadmap): Promise<Roadmap> {
    const [roadmap] = await db.insert(roadmaps).values(insertRoadmap).returning();
    return roadmap;
  }

  async updateRoadmap(type: string, updates: UpdateRoadmap): Promise<Roadmap | undefined> {
    const [roadmap] = await db.update(roadmaps).set(updates).where(eq(roadmaps.type, type)).returning();
    return roadmap;
  }

  // Stats
  async getStats(): Promise<{ totalNotices: number, totalImages: number, monthlyVisitors: number, viewsGrowth: string }> {
    const noticesCount = await db.select().from(notices);
    const imagesCount = await db.select().from(galleryItems);
    
    return {
      totalNotices: noticesCount.length,
      totalImages: imagesCount.length,
      monthlyVisitors: 1250,
      viewsGrowth: "+12.5%"
    };
  }
}