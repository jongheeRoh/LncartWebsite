import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
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

export const middleSchoolAdmission = pgTable("middle_school_admission", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  category: text("category").notNull().default("예중입시정보"),
  attachments: jsonb("attachments").default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const highSchoolAdmission = pgTable("high_school_admission", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  category: text("category").notNull().default("예고입시정보"),
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

export const insertMiddleSchoolAdmissionSchema = createInsertSchema(middleSchoolAdmission).pick({
  title: true,
  content: true,
  excerpt: true,
  category: true,
  attachments: true,
});

export const updateMiddleSchoolAdmissionSchema = insertMiddleSchoolAdmissionSchema.partial();

export const insertHighSchoolAdmissionSchema = createInsertSchema(highSchoolAdmission).pick({
  title: true,
  content: true,
  excerpt: true,
  category: true,
  attachments: true,
});

export const updateHighSchoolAdmissionSchema = insertHighSchoolAdmissionSchema.partial();

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
export type InsertMiddleSchoolAdmission = z.infer<typeof insertMiddleSchoolAdmissionSchema>;
export type UpdateMiddleSchoolAdmission = z.infer<typeof updateMiddleSchoolAdmissionSchema>;
export type MiddleSchoolAdmission = typeof middleSchoolAdmission.$inferSelect;
export type InsertHighSchoolAdmission = z.infer<typeof insertHighSchoolAdmissionSchema>;
export type UpdateHighSchoolAdmission = z.infer<typeof updateHighSchoolAdmissionSchema>;
export type HighSchoolAdmission = typeof highSchoolAdmission.$inferSelect;
export type InsertGalleryItem = z.infer<typeof insertGalleryItemSchema>;
export type UpdateGalleryItem = z.infer<typeof updateGalleryItemSchema>;
export type GalleryItem = typeof galleryItems.$inferSelect;
export type InsertRoadmap = z.infer<typeof insertRoadmapSchema>;
export type UpdateRoadmap = z.infer<typeof updateRoadmapSchema>;
export type Roadmap = typeof roadmaps.$inferSelect;

// Comments table for notices and admissions
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  type: varchar("type").notNull(), // 'notice', 'middle_school', 'high_school'
  postId: integer("post_id").notNull(),
  author: varchar("author").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  notice: one(notices, { fields: [comments.postId], references: [notices.id] }),
  middleSchoolAdmission: one(middleSchoolAdmission, { fields: [comments.postId], references: [middleSchoolAdmission.id] }),
  highSchoolAdmission: one(highSchoolAdmission, { fields: [comments.postId], references: [highSchoolAdmission.id] }),
}));

export const insertCommentSchema = createInsertSchema(comments);
export const updateCommentSchema = insertCommentSchema.partial();

export type Comment = typeof comments.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type UpdateComment = z.infer<typeof updateCommentSchema>;
