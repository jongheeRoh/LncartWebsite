import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage, authStorage } from "./storage";
import { insertNoticeSchema, updateNoticeSchema, insertGalleryItemSchema, updateGalleryItemSchema, insertRoadmapSchema, updateRoadmapSchema, insertMiddleSchoolAdmissionSchema, updateMiddleSchoolAdmissionSchema, insertHighSchoolAdmissionSchema, updateHighSchoolAdmissionSchema, insertCommentSchema } from "@shared/schema";
import { ZodError } from "zod";
import { upload, createFileAttachment } from "./upload";
import { scrapeAndImportMiddleSchoolData, scrapeAndImportHighSchoolData } from "./web-scraper";
import { errorMonitor } from "./error-monitor";
import path from "path";
import fs from "fs";

// Simple session middleware
interface AdminSession {
  isLoggedIn: boolean;
  loginTime: number;
}

declare global {
  namespace Express {
    interface Request {
      adminSession?: AdminSession;
    }
  }
}

// Session storage in memory (use Redis in production)
const adminSessions = new Map<string, AdminSession>();

// Create session ID
function createSessionId(): string {
  return Math.random().toString(36).substr(2, 15) + Math.random().toString(36).substr(2, 15);
}

// Auth middleware
function requireAuth(req: Request, res: Response, next: NextFunction) {
  // Try to get session ID from cookie or authorization header
  const sessionId = req.cookies?.adminSession || req.headers.authorization?.replace('Bearer ', '');
  
  console.log('Auth middleware - sessionId:', sessionId);
  console.log('Auth middleware - cookies:', req.cookies);
  console.log('Auth middleware - available sessions:', Array.from(adminSessions.keys()));
  
  if (!sessionId) {
    console.log('Auth middleware - No session ID found');
    return res.status(401).json({ error: "Unauthorized" });
  }

  const session = adminSessions.get(sessionId);
  if (!session || !session.isLoggedIn) {
    console.log('Auth middleware - Session not found or not logged in');
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Check if session is expired (24 hours)
  if (Date.now() - session.loginTime > 24 * 60 * 60 * 1000) {
    adminSessions.delete(sessionId);
    console.log('Auth middleware - Session expired');
    return res.status(401).json({ error: "Session expired" });
  }

  console.log('Auth middleware - Success');
  req.adminSession = session;
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Error monitoring API
  app.get("/api/errors", requireAuth, (req, res) => {
    const stats = errorMonitor.getErrorStats();
    const recent = errorMonitor.getRecentErrors(20);
    res.json({ stats, recent });
  });

  // Middle School Admission routes (moved to top priority)
  app.get("/api/middle-school-admission", async (req, res) => {
    try {
      console.log("Middle school admission API called");
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50; // 기본값을 50으로 증가
      const category = req.query.category as string;
      const search = req.query.search as string;

      const result = await storage.getAllMiddleSchoolAdmission(page, limit, category, search);
      console.log(`Returning ${result.items.length} middle school admission items`);
      res.json(result);
    } catch (error) {
      console.error("Middle school admission API Error:", error);
      res.status(500).json({ error: "Failed to fetch middle school admission data" });
    }
  });

  app.get("/api/middle-school-admission/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const admission = await storage.getMiddleSchoolAdmission(id);
      
      if (!admission) {
        return res.status(404).json({ error: "Middle school admission not found" });
      }
      
      res.json(admission);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch middle school admission" });
    }
  });

  // High School Admission routes 
  app.get("/api/high-school-admission", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const category = req.query.category as string;
      const search = req.query.search as string;

      const result = await storage.getAllHighSchoolAdmission(page, limit, category, search);
      res.json(result);
    } catch (error) {
      console.error("High school admission API Error:", error);
      res.status(500).json({ error: "Failed to fetch high school admission data" });
    }
  });

  app.get("/api/high-school-admission/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const admission = await storage.getHighSchoolAdmission(id);
      
      if (!admission) {
        return res.status(404).json({ error: "High school admission not found" });
      }
      
      res.json(admission);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch high school admission" });
    }
  });

  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      console.log("Login request received:", req.body);
      const { username, password } = req.body;
      
      if (!username || !password) {
        console.log("Missing credentials");
        return res.status(400).json({ error: "Username and password required" });
      }

      const isValid = await authStorage.validateAdmin(username, password);
      
      if (!isValid) {
        console.log("Invalid credentials");
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const sessionId = createSessionId();
      adminSessions.set(sessionId, {
        isLoggedIn: true,
        loginTime: Date.now()
      });

      console.log("Login successful, sessionId:", sessionId);
      
      // Set cookie for session
      res.cookie('adminSession', sessionId, {
        httpOnly: true,
        secure: false, // Set to true in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: 'lax'
      });
      
      res.json({ 
        message: "Login successful",
        sessionId,
        username: "관리자"
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/logout", requireAuth, (req, res) => {
    const sessionId = req.cookies?.adminSession || req.headers.authorization?.replace('Bearer ', '');
    if (sessionId) {
      adminSessions.delete(sessionId);
    }
    
    // Clear cookie
    res.clearCookie('adminSession');
    res.json({ message: "Logged out successfully" });
  });

  app.get("/api/auth/verify", requireAuth, (req, res) => {
    res.json({ 
      isLoggedIn: true,
      username: "관리자"
    });
  });

  // File upload endpoint - simplified auth check
  app.post("/api/upload", upload.single('file'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const fileAttachment = createFileAttachment(req.file);
      res.json(fileAttachment);
    } catch (error) {
      console.error("File upload error:", error);
      res.status(500).json({ error: "File upload failed" });
    }
  });



  // Serve uploaded files
  const uploadsPath = path.join(process.cwd(), 'uploads');
  app.use('/uploads', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  
  // Create uploads directory if it doesn't exist
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
  }
  
  // Serve static files from uploads directory
  const express = await import('express');
  app.use('/uploads', express.static(uploadsPath));

  // Notices routes
  app.get("/api/notices", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const category = req.query.category as string;
      const search = req.query.search as string;

      // Fix URL encoding issue for Korean characters
      let decodedCategory = category;
      if (category) {
        try {
          decodedCategory = decodeURIComponent(category);
        } catch (e) {
          decodedCategory = category;
        }
      }
      
      const result = await storage.getAllNotices(page, limit, decodedCategory, search);

      res.json(result);
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "Failed to fetch notices" });
    }
  });

  app.get("/api/notices/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const notice = await storage.getNotice(id);
      
      if (!notice) {
        return res.status(404).json({ error: "Notice not found" });
      }
      
      // 조회수 증가
      await storage.incrementNoticeViews(id);
      
      // 증가된 조회수로 다시 조회
      const updatedNotice = await storage.getNotice(id);
      
      res.json(updatedNotice);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notice" });
    }
  });

  app.post("/api/notices", requireAuth, async (req, res) => {
    try {
      const validatedData = insertNoticeSchema.parse(req.body);
      const notice = await storage.createNotice(validatedData);
      res.status(201).json(notice);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create notice" });
    }
  });

  app.patch("/api/notices/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateNoticeSchema.parse(req.body);
      const notice = await storage.updateNotice(id, validatedData);
      
      if (!notice) {
        return res.status(404).json({ error: "Notice not found" });
      }
      
      res.json(notice);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update notice" });
    }
  });

  app.delete("/api/notices/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteNotice(id);
      
      if (!success) {
        return res.status(404).json({ error: "Notice not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete notice" });
    }
  });

  // Gallery routes
  app.get("/api/gallery", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 12;
      const category = req.query.category as string;

      const result = await storage.getAllGalleryItems(page, limit, category);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery items" });
    }
  });

  app.get("/api/gallery/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const item = await storage.getGalleryItem(id);
      
      if (!item) {
        return res.status(404).json({ error: "Gallery item not found" });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery item" });
    }
  });

  app.post("/api/gallery", async (req, res) => {
    try {
      const validatedData = insertGalleryItemSchema.parse(req.body);
      const item = await storage.createGalleryItem(validatedData);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create gallery item" });
    }
  });

  app.patch("/api/gallery/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateGalleryItemSchema.parse(req.body);
      const item = await storage.updateGalleryItem(id, validatedData);
      
      if (!item) {
        return res.status(404).json({ error: "Gallery item not found" });
      }
      
      res.json(item);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update gallery item" });
    }
  });

  app.delete("/api/gallery/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteGalleryItem(id);
      
      if (!success) {
        return res.status(404).json({ error: "Gallery item not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete gallery item" });
    }
  });

  // Roadmap routes
  app.get("/api/roadmaps/:type", async (req, res) => {
    try {
      const type = req.params.type;
      const roadmap = await storage.getRoadmap(type);
      
      if (!roadmap) {
        return res.status(404).json({ error: "Roadmap not found" });
      }
      
      res.json(roadmap);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch roadmap" });
    }
  });

  app.post("/api/roadmaps", requireAuth, async (req, res) => {
    try {
      const validatedData = insertRoadmapSchema.parse(req.body);
      const roadmap = await storage.createRoadmap(validatedData);
      res.status(201).json(roadmap);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create roadmap" });
    }
  });

  app.patch("/api/roadmaps/:type", requireAuth, async (req, res) => {
    try {
      const type = req.params.type;
      const validatedData = updateRoadmapSchema.parse(req.body);
      const roadmap = await storage.updateRoadmap(type, validatedData);
      
      if (!roadmap) {
        return res.status(404).json({ error: "Roadmap not found" });
      }
      
      res.json(roadmap);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update roadmap" });
    }
  });

  // Stats route (admin only)
  app.get("/api/stats", requireAuth, async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Comment routes
  app.get("/api/comments/:type/:postId", async (req, res) => {
    try {
      const { type, postId } = req.params;
      const comments = await storage.getComments(type, parseInt(postId));
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  });

  app.post("/api/comments", async (req, res) => {
    try {
      const validatedData = insertCommentSchema.parse(req.body);
      const comment = await storage.createComment(validatedData);
      res.status(201).json(comment);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create comment" });
    }
  });

  app.delete("/api/comments/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteComment(id);
      
      if (!success) {
        return res.status(404).json({ error: "Comment not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete comment" });
    }
  });

  // Web scraping endpoints
  app.post("/api/admin/scrape-middle-school", requireAuth, async (req, res) => {
    try {
      console.log("Starting web scraping for middle school admission data...");
      const result = await scrapeAndImportMiddleSchoolData();
      res.json(result);
    } catch (error) {
      console.error("Web scraping error:", error);
      res.status(500).json({ 
        success: false, 
        message: "웹 크롤링 중 오류가 발생했습니다.",
        count: 0
      });
    }
  });

  app.post("/api/admin/scrape-high-school", requireAuth, async (req, res) => {
    try {
      console.log("Starting web scraping for high school admission data...");
      const result = await scrapeAndImportHighSchoolData();
      res.json(result);
    } catch (error) {
      console.error("High school web scraping error:", error);
      res.status(500).json({ 
        success: false, 
        message: "예고 입시정보 크롤링 중 오류가 발생했습니다.",
        count: 0
      });
    }
  });

  // Direct scraping endpoint (immediate execution)
  app.post("/api/direct-scrape", async (req, res) => {
    try {
      console.log("Starting direct scraping for 예중입시정보...");
      const { runDirectScraping } = await import('./direct-scraper');
      const result = await runDirectScraping();
      res.json(result);
    } catch (error) {
      console.error("Direct scraping error:", error);
      res.status(500).json({ 
        success: false, 
        message: `직접 크롤링 중 오류: ${error instanceof Error ? error.message : String(error)}`,
        count: 0
      });
    }
  });

  // Middle School Admission routes
  app.get("/api/middle-school-admission", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const category = req.query.category as string;
      const search = req.query.search as string;

      const result = await storage.getAllMiddleSchoolAdmission(page, limit, category, search);
      res.json(result);
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "Failed to fetch middle school admission data" });
    }
  });

  app.get("/api/middle-school-admission/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const admission = await storage.getMiddleSchoolAdmission(id);
      
      if (!admission) {
        return res.status(404).json({ error: "Middle school admission not found" });
      }
      
      res.json(admission);
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "Failed to fetch middle school admission" });
    }
  });

  app.post("/api/middle-school-admission/:id/increment-views", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.incrementMiddleSchoolAdmissionViews(id);
      res.json({ success: true });
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "Failed to increment views" });
    }
  });



  app.post("/api/middle-school-admission", async (req, res) => {
    try {
      console.log("Creating middle school admission with data:", JSON.stringify(req.body, null, 2));
      
      // Validate data
      const validatedData = insertMiddleSchoolAdmissionSchema.parse(req.body);
      console.log("Validated data:", JSON.stringify(validatedData, null, 2));
      
      const admission = await storage.createMiddleSchoolAdmission(validatedData);
      console.log("Created admission:", JSON.stringify(admission, null, 2));
      
      res.status(201).json(admission);
    } catch (error) {
      console.error("Middle school admission creation error:", error);
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create middle school admission" });
    }
  });

  // Handle both PATCH and PUT for compatibility
  const updateMiddleSchoolHandler = async (req: Request, res: Response) => {
    try {
      console.log("Updating middle school admission with data:", JSON.stringify(req.body, null, 2));
      
      const id = parseInt(req.params.id);
      
      // Validate data - allow partial updates for PATCH, full updates for PUT
      const validatedData = updateMiddleSchoolAdmissionSchema.partial().parse(req.body);
      console.log("Validated update data:", JSON.stringify(validatedData, null, 2));
      
      const admission = await storage.updateMiddleSchoolAdmission(id, validatedData);
      
      if (!admission) {
        return res.status(404).json({ error: "Middle school admission not found" });
      }
      
      console.log("Updated admission:", JSON.stringify(admission, null, 2));
      res.json(admission);
    } catch (error) {
      console.error("Middle school admission update error:", error);
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update middle school admission" });
    }
  };

  app.patch("/api/middle-school-admission/:id", updateMiddleSchoolHandler);
  app.put("/api/middle-school-admission/:id", updateMiddleSchoolHandler);

  app.delete("/api/middle-school-admission/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteMiddleSchoolAdmission(id);
      
      if (!success) {
        return res.status(404).json({ error: "Middle school admission not found" });
      }
      
      res.json({ message: "Middle school admission deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete middle school admission" });
    }
  });

  // High School Admission routes
  app.get("/api/high-school-admission", async (req, res) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const category = req.query.category as string;
      const search = req.query.search as string;

      const result = await storage.getAllHighSchoolAdmission(page, limit, category, search);
      res.json(result);
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "Failed to fetch high school admission data" });
    }
  });

  app.get("/api/high-school-admission/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const admission = await storage.getHighSchoolAdmission(id);
      
      if (!admission) {
        return res.status(404).json({ error: "High school admission not found" });
      }
      
      res.json(admission);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch high school admission" });
    }
  });

  app.post("/api/high-school-admission/:id/increment-views", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.incrementHighSchoolAdmissionViews(id);
      res.json({ success: true });
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "Failed to increment views" });
    }
  });

  app.post("/api/high-school-admission", requireAuth, async (req, res) => {
    try {
      const admission = await storage.createHighSchoolAdmission(req.body);
      res.status(201).json(admission);
    } catch (error) {
      res.status(500).json({ error: "Failed to create high school admission" });
    }
  });

  app.patch("/api/high-school-admission/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const admission = await storage.updateHighSchoolAdmission(id, req.body);
      
      if (!admission) {
        return res.status(404).json({ error: "High school admission not found" });
      }
      
      res.json(admission);
    } catch (error) {
      res.status(500).json({ error: "Failed to update high school admission" });
    }
  });

  app.delete("/api/high-school-admission/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteHighSchoolAdmission(id);
      
      if (!success) {
        return res.status(404).json({ error: "High school admission not found" });
      }
      
      res.json({ message: "High school admission deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete high school admission" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
