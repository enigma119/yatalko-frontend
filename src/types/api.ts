import type { User } from "./entities";

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  universityId: number;
  programId: number;
  level: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
}

// Pagination Types
export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
  direction?: "ASC" | "DESC";
}

// Search & Filter Types
export interface SearchParams {
  search?: string;
  universityId?: number;
  programId?: number;
  level?: string;
  subjectId?: number;
  type?: string;
  category?: string;
  year?: number;
  semester?: string;
  verified?: boolean;
}

// Create/Update Types
export interface CreatePostRequest {
  title: string;
  content: string;
  type: string;
  subjectId: number;
  tags?: string[];
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  tags?: string[];
}

export interface CreateReplyRequest {
  content: string;
}

export interface UpdateReplyRequest {
  content: string;
}

export interface CreateDocumentRequest {
  title: string;
  description?: string;
  category: string;
  subjectId: number;
  year?: number;
  semester?: string;
  professorName?: string;
}

export interface UpdateDocumentRequest {
  title?: string;
  description?: string;
  category?: string;
  year?: number;
  semester?: string;
  professorName?: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatarUrl?: string;
}

// Vote Types
export interface VoteRequest {
  type: "UPVOTE" | "DOWNVOTE";
}

// Notification Types
export interface UnreadCountResponse {
  count: number;
}
