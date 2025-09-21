import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const documents = pgTable("documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename").notNull(),
  originalText: text("original_text"),
  fileType: text("file_type").notNull(),
  fileSize: varchar("file_size"), // in bytes as string for large files
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const documentAnalyses = pgTable("document_analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  documentId: varchar("document_id").notNull().references(() => documents.id),
  summary: text("summary").notNull(),
  overallRisk: text("overall_risk").notNull(),
  keyInsights: jsonb("key_insights").$type<KeyInsight[]>().notNull(),
  recommendations: jsonb("recommendations").$type<string[]>().notNull(),
  clauses: jsonb("clauses").$type<Clause[]>().notNull(),
  riskStats: jsonb("risk_stats").$type<RiskStats>().notNull(),
  analyzedAt: timestamp("analyzed_at").defaultNow(),
});

// Zod schemas for validation
export const riskLevelSchema = z.enum(["safe", "moderate", "high"]);

export const clauseSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  riskLevel: riskLevelSchema,
  explanation: z.string(),
  recommendation: z.string().optional(),
  section: z.string().optional(),
});

export const keyInsightSchema = z.object({
  title: z.string(),
  description: z.string(),
  riskLevel: riskLevelSchema,
});

export const riskStatsSchema = z.object({
  safe: z.number(),
  moderate: z.number(),
  high: z.number(),
  total: z.number(),
});

export const analysisResultSchema = z.object({
  summary: z.string(),
  overallRisk: riskLevelSchema,
  keyInsights: z.array(keyInsightSchema),
  recommendations: z.array(z.string()),
  clauses: z.array(clauseSchema),
  riskStats: riskStatsSchema,
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  uploadedAt: true,
});

export const insertDocumentAnalysisSchema = createInsertSchema(documentAnalyses).omit({
  id: true,
  analyzedAt: true,
}).extend({
  overallRisk: riskLevelSchema,
  keyInsights: z.array(keyInsightSchema),
  recommendations: z.array(z.string()),
  clauses: z.array(clauseSchema),
  riskStats: riskStatsSchema,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type DocumentAnalysis = typeof documentAnalyses.$inferSelect;
export type InsertDocumentAnalysis = z.infer<typeof insertDocumentAnalysisSchema>;
export type RiskLevel = z.infer<typeof riskLevelSchema>;
export type Clause = z.infer<typeof clauseSchema>;
export type KeyInsight = z.infer<typeof keyInsightSchema>;
export type RiskStats = z.infer<typeof riskStatsSchema>;
export type AnalysisResult = z.infer<typeof analysisResultSchema>;
