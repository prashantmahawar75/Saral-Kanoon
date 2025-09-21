import type { Document, DocumentAnalysis } from "@shared/schema";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
    throw new ApiError(response.status, errorData.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Upload and analyze document
  uploadDocument: async (file: File): Promise<{ document: Document; analysis: DocumentAnalysis }> => {
    const formData = new FormData();
    formData.append('document', file);

    const response = await fetch('/api/documents/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
      throw new ApiError(response.status, errorData.error || `HTTP ${response.status}`);
    }

    return response.json();
  },

  // Get document by ID
  getDocument: async (id: string): Promise<Document> => {
    return apiRequest<Document>(`/api/documents/${id}`);
  },

  // Get document analysis by document ID
  getDocumentAnalysis: async (documentId: string): Promise<DocumentAnalysis> => {
    return apiRequest<DocumentAnalysis>(`/api/documents/${documentId}/analysis`);
  },

  // List all documents
  getDocuments: async (): Promise<Document[]> => {
    return apiRequest<Document[]>('/api/documents');
  },

  // Health check
  healthCheck: async (): Promise<{ status: string; timestamp: string }> => {
    return apiRequest<{ status: string; timestamp: string }>('/api/health');
  },
};