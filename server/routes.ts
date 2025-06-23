import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNoticeSchema, updateNoticeSchema, insertGalleryItemSchema, updateGalleryItemSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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

  app.post("/api/notices", async (req, res) => {
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

  app.put("/api/notices/:id", async (req, res) => {
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

  app.delete("/api/notices/:id", async (req, res) => {
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

  app.put("/api/gallery/:id", async (req, res) => {
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

  app.delete("/api/gallery/:id", async (req, res) => {
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

  // Stats route
  app.get("/api/stats", async (req, res) => {
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
