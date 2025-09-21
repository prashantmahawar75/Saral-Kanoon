import { 
  type User, 
  type InsertUser,
  type Document,
  type InsertDocument,
  type DocumentAnalysis,
  type InsertDocumentAnalysis
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Document methods
  createDocument(document: InsertDocument): Promise<Document>;
  getDocument(id: string): Promise<Document | undefined>;
  getDocuments(): Promise<Document[]>;
  
  // Document analysis methods
  createDocumentAnalysis(analysis: InsertDocumentAnalysis): Promise<DocumentAnalysis>;
  getDocumentAnalysis(documentId: string): Promise<DocumentAnalysis | undefined>;
  getDocumentAnalysisById(id: string): Promise<DocumentAnalysis | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private documents: Map<string, Document>;
  private documentAnalyses: Map<string, DocumentAnalysis>;

  constructor() {
    this.users = new Map();
    this.documents = new Map();
    this.documentAnalyses = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Document methods
  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = randomUUID();
    const document: Document = { 
      ...insertDocument,
      fileSize: insertDocument.fileSize || null,
      originalText: insertDocument.originalText || null,
      id,
      uploadedAt: new Date()
    };
    this.documents.set(id, document);
    return document;
  }

  async getDocument(id: string): Promise<Document | undefined> {
    return this.documents.get(id);
  }

  async getDocuments(): Promise<Document[]> {
    return Array.from(this.documents.values());
  }

  // Document analysis methods
  async createDocumentAnalysis(insertAnalysis: InsertDocumentAnalysis): Promise<DocumentAnalysis> {
    const id = randomUUID();
    const analysis: DocumentAnalysis = {
      ...insertAnalysis,
      id,
      analyzedAt: new Date()
    };
    this.documentAnalyses.set(id, analysis);
    return analysis;
  }

  async getDocumentAnalysis(documentId: string): Promise<DocumentAnalysis | undefined> {
    return Array.from(this.documentAnalyses.values()).find(
      (analysis) => analysis.documentId === documentId
    );
  }

  async getDocumentAnalysisById(id: string): Promise<DocumentAnalysis | undefined> {
    return this.documentAnalyses.get(id);
  }
}

export const storage = new MemStorage();
