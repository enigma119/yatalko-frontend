import api from "@/lib/api";
import type { Subject, Post, Document } from "@/types/entities";

export interface SearchResults {
  subjects: Subject[];
  posts: Post[];
  documents: Document[];
}

export interface SearchParams {
  query: string;
  limit?: number;
}

/**
 * Global search across subjects, posts, and documents
 */
export async function globalSearch(params: SearchParams): Promise<SearchResults> {
  const { query, limit = 5 } = params;

  const response = await api.get<SearchResults>("/search", {
    params: { q: query, limit },
  });

  return response.data;
}

/**
 * Search subjects only
 */
export async function searchSubjects(query: string, limit: number = 10): Promise<Subject[]> {
  const response = await api.get<Subject[]>("/search/subjects", {
    params: { q: query, limit },
  });
  return response.data;
}

/**
 * Search posts only
 */
export async function searchPosts(query: string, limit: number = 10): Promise<Post[]> {
  const response = await api.get<Post[]>("/search/posts", {
    params: { q: query, limit },
  });
  return response.data;
}

/**
 * Search documents only
 */
export async function searchDocuments(query: string, limit: number = 10): Promise<Document[]> {
  const response = await api.get<Document[]>("/search/documents", {
    params: { q: query, limit },
  });
  return response.data;
}
