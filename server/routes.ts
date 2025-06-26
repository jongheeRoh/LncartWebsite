import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage, authStorage } from "./storage";
import { insertNoticeSchema, updateNoticeSchema, insertGalleryItemSchema, updateGalleryItemSchema } from "@shared/schema";
import { ZodError } from "zod";
import { upload, createFileAttachment } from "./upload";
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
  const sessionId = req.headers.authorization?.replace('Bearer ', '');
  
  if (!sessionId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const session = adminSessions.get(sessionId);
  if (!session || !session.isLoggedIn) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Check if session is expired (24 hours)
  if (Date.now() - session.loginTime > 24 * 60 * 60 * 1000) {
    adminSessions.delete(sessionId);
    return res.status(401).json({ error: "Session expired" });
  }

  req.adminSession = session;
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
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
    const sessionId = req.headers.authorization?.replace('Bearer ', '');
    if (sessionId) {
      adminSessions.delete(sessionId);
    }
    res.json({ message: "Logged out successfully" });
  });

  app.get("/api/auth/verify", requireAuth, (req, res) => {
    res.json({ 
      isLoggedIn: true,
      username: "관리자"
    });
  });

  // File upload endpoint
  app.post("/api/upload", requireAuth, upload.single('file'), (req, res) => {
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

      const result = await storage.getAllNotices(page, limit, category, search);
      res.json(result);
    } catch (error) {
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
      
      res.json(notice);
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

  app.post("/api/gallery", requireAuth, async (req, res) => {
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

  // Stats route (admin only)
  app.get("/api/stats", requireAuth, async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
