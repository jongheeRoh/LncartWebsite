import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
});

export const notices = pgTable("notices", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  category: text("category").notNull().default("일반"),
  attachments: jsonb("attachments").default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull().default("전체"),
  attachments: jsonb("attachments").default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const roadmaps = pgTable("roadmaps", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 50 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  attachments: jsonb("attachments").default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const admissionInfo = pgTable("admission_info", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  type: varchar("type", { length: 50 }).notNull(), // "middle" or "high"
  category: text("category").notNull().default("입시정보"),
  attachments: jsonb("attachments").default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertNoticeSchema = createInsertSchema(notices).pick({
  title: true,
  content: true,
  excerpt: true,
  category: true,
  attachments: true,
});

export const updateNoticeSchema = insertNoticeSchema.partial();

export const insertAdmissionInfoSchema = createInsertSchema(admissionInfo).pick({
  title: true,
  content: true,
  excerpt: true,
  type: true,
  category: true,
  attachments: true,
});

export const updateAdmissionInfoSchema = insertAdmissionInfoSchema.partial();

export const insertGalleryItemSchema = createInsertSchema(galleryItems).pick({
  title: true,
  description: true,
  imageUrl: true,
  category: true,
  attachments: true,
});

export const updateGalleryItemSchema = insertGalleryItemSchema.partial();

export const insertRoadmapSchema = createInsertSchema(roadmaps).pick({
  type: true,
  title: true,
  content: true,
  attachments: true,
});

export const updateRoadmapSchema = insertRoadmapSchema.partial();

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertNotice = z.infer<typeof insertNoticeSchema>;
export type UpdateNotice = z.infer<typeof updateNoticeSchema>;
export type Notice = typeof notices.$inferSelect;
export type InsertAdmissionInfo = z.infer<typeof insertAdmissionInfoSchema>;
export type UpdateAdmissionInfo = z.infer<typeof updateAdmissionInfoSchema>;
export type AdmissionInfo = typeof admissionInfo.$inferSelect;
export type InsertGalleryItem = z.infer<typeof insertGalleryItemSchema>;
export type UpdateGalleryItem = z.infer<typeof updateGalleryItemSchema>;
export type GalleryItem = typeof galleryItems.$inferSelect;
export type InsertRoadmap = z.infer<typeof insertRoadmapSchema>;
export type UpdateRoadmap = z.infer<typeof updateRoadmapSchema>;
export type Roadmap = typeof roadmaps.$inferSelect;
