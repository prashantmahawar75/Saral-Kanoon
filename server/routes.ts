import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import fs from "fs";
// Import pdf-parse dynamically to avoid startup issues
// import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { storage } from "./storage";
import { analyzeLegalDocument } from "./gemini";
import { 
  insertDocumentSchema, 
  insertDocumentAnalysisSchema,
  type AnalysisResult 
} from "@shared/schema";

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOCX, and TXT files are allowed. Legacy DOC files are not supported.'));
    }
  }
});

// Extract text from different file types
async function extractTextFromFile(filePath: string, mimetype: string): Promise<string> {
  try {
    switch (mimetype) {
      case 'application/pdf':
        const pdfParse = (await import('pdf-parse')).default;
        const pdfBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(pdfBuffer);
        return pdfData.text;
        
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        const docResult = await mammoth.extractRawText({ path: filePath });
        return docResult.value;
        
      case 'text/plain':
        return fs.readFileSync(filePath, 'utf-8');
        
      default:
        throw new Error(`Unsupported file type: ${mimetype}`);
    }
  } finally {
    // Clean up uploaded file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Multer error handling middleware
  app.use((error: any, req: any, res: any, next: any) => {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
      }
      return res.status(400).json({ error: error.message });
    }
    if (error.message && error.message.includes('Invalid file type')) {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  });
  
  // Upload and analyze document
  app.post('/api/documents/upload', upload.single('document'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const { originalname, filename, mimetype, size, path: filePath } = req.file;
      
      // Extract text from the uploaded file
      const extractedText = await extractTextFromFile(filePath, mimetype);
      
      if (!extractedText.trim()) {
        return res.status(400).json({ error: 'No text could be extracted from the document' });
      }

      // Create document record
      const documentData = insertDocumentSchema.parse({
        filename: originalname,
        originalText: extractedText,
        fileType: mimetype,
        fileSize: size.toString()
      });

      const document = await storage.createDocument(documentData);

      // Analyze document with Gemini
      const analysis = await analyzeLegalDocument(extractedText, originalname);
      
      // Create analysis record
      const analysisData = insertDocumentAnalysisSchema.parse({
        documentId: document.id,
        ...analysis
      });

      const documentAnalysis = await storage.createDocumentAnalysis(analysisData);

      res.json({
        document,
        analysis: documentAnalysis
      });

    } catch (error) {
      console.error('Document upload error:', error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : 'Failed to process document'
      });
    }
  });

  // Get document by ID
  app.get('/api/documents/:id', async (req, res) => {
    try {
      const document = await storage.getDocument(req.params.id);
      if (!document) {
        return res.status(404).json({ error: 'Document not found' });
      }
      res.json(document);
    } catch (error) {
      console.error('Get document error:', error);
      res.status(500).json({ error: 'Failed to retrieve document' });
    }
  });

  // Get document analysis by document ID
  app.get('/api/documents/:id/analysis', async (req, res) => {
    try {
      const analysis = await storage.getDocumentAnalysis(req.params.id);
      if (!analysis) {
        return res.status(404).json({ error: 'Analysis not found' });
      }
      res.json(analysis);
    } catch (error) {
      console.error('Get analysis error:', error);
      res.status(500).json({ error: 'Failed to retrieve analysis' });
    }
  });

  // List all documents
  app.get('/api/documents', async (req, res) => {
    try {
      const documents = await storage.getDocuments();
      res.json(documents);
    } catch (error) {
      console.error('List documents error:', error);
      res.status(500).json({ error: 'Failed to retrieve documents' });
    }
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);

  return httpServer;
}
