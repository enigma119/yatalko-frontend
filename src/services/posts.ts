import api from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import type {
  ApiResponse,
  PaginatedResponse,
  CreatePostRequest,
  UpdatePostRequest,
} from "@/types/api";
import type { Post, PostType, VoteType } from "@/types/entities";

// Search params for posts
export interface PostSearchParams {
  universityId: string;
  subjectId?: string;
  type?: PostType;
  search?: string;
  page?: number;
  size?: number;
  sort?: string;
  direction?: "asc" | "desc";
}

// Vote result from API
export interface VoteResult {
  currentVote: VoteType;
  upvoteCount: number;
  downvoteCount: number;
}

// ==================== Posts CRUD ====================

/**
 * Search and filter posts with pagination
 */
export async function searchPosts(
  params: PostSearchParams
): Promise<PaginatedResponse<Post>> {
  const { data } = await api.get<ApiResponse<PaginatedResponse<Post>>>(
    API_ENDPOINTS.POSTS,
    { params }
  );
  return data.data;
}

/**
 * Get a single post by ID
 */
export async function getPostById(id: string): Promise<Post> {
  const { data } = await api.get<ApiResponse<Post>>(API_ENDPOINTS.POST(id));
  return data.data;
}

/**
 * Create a new post
 */
export async function createPost(request: CreatePostRequest): Promise<Post> {
  const { data } = await api.post<ApiResponse<Post>>(
    API_ENDPOINTS.POSTS,
    request
  );
  return data.data;
}

/**
 * Update a post
 */
export async function updatePost(
  id: string,
  request: UpdatePostRequest
): Promise<Post> {
  const { data } = await api.put<ApiResponse<Post>>(
    API_ENDPOINTS.POST(id),
    request
  );
  return data.data;
}

/**
 * Delete a post
 */
export async function deletePost(id: string): Promise<void> {
  await api.delete(API_ENDPOINTS.POST(id));
}

// ==================== Posts by Category ====================

/**
 * Get pinned posts for a university
 */
export async function getPinnedPosts(universityId: string): Promise<Post[]> {
  const { data } = await api.get<ApiResponse<Post[]>>(
    `${API_ENDPOINTS.POSTS}/pinned`,
    { params: { universityId } }
  );
  return data.data;
}

/**
 * Get top posts (by score)
 */
export async function getTopPosts(
  universityId: string,
  page = 0,
  size = 20
): Promise<PaginatedResponse<Post>> {
  const { data } = await api.get<ApiResponse<PaginatedResponse<Post>>>(
    `${API_ENDPOINTS.POSTS}/top`,
    { params: { universityId, page, size } }
  );
  return data.data;
}

/**
 * Get unanswered questions
 */
export async function getUnansweredQuestions(
  universityId: string,
  page = 0,
  size = 20
): Promise<PaginatedResponse<Post>> {
  const { data } = await api.get<ApiResponse<PaginatedResponse<Post>>>(
    `${API_ENDPOINTS.POSTS}/unanswered`,
    { params: { universityId, page, size } }
  );
  return data.data;
}

/**
 * Get current user's posts
 */
export async function getMyPosts(): Promise<Post[]> {
  const { data } = await api.get<ApiResponse<Post[]>>(
    `${API_ENDPOINTS.POSTS}/my-posts`
  );
  return data.data;
}

// ==================== Feed ====================

/**
 * Get personalized feed (posts from joined subjects)
 */
export async function getMyFeed(
  type?: PostType,
  page = 0,
  size = 20
): Promise<PaginatedResponse<Post>> {
  const { data } = await api.get<ApiResponse<PaginatedResponse<Post>>>(
    "/feed",
    { params: { type, page, size } }
  );
  return data.data;
}

/**
 * Get trending posts
 */
export async function getTrendingPosts(
  universityId: string,
  hours = 24,
  page = 0,
  size = 20
): Promise<PaginatedResponse<Post>> {
  const { data } = await api.get<ApiResponse<PaginatedResponse<Post>>>(
    "/feed/trending",
    { params: { universityId, hours, page, size } }
  );
  return data.data;
}

/**
 * Get discovery feed
 */
export async function getDiscoveryFeed(
  universityId: string,
  page = 0,
  size = 20
): Promise<PaginatedResponse<Post>> {
  const { data } = await api.get<ApiResponse<PaginatedResponse<Post>>>(
    "/feed/discover",
    { params: { universityId, page, size } }
  );
  return data.data;
}

// ==================== Votes ====================

/**
 * Upvote a post (toggle)
 */
export async function upvotePost(id: string): Promise<VoteResult> {
  const { data } = await api.post<ApiResponse<VoteResult>>(
    API_ENDPOINTS.POST_UPVOTE(id)
  );
  return data.data;
}

/**
 * Downvote a post (toggle)
 */
export async function downvotePost(id: string): Promise<VoteResult> {
  const { data } = await api.post<ApiResponse<VoteResult>>(
    API_ENDPOINTS.POST_DOWNVOTE(id)
  );
  return data.data;
}

/**
 * Get current user's vote on a post
 */
export async function getMyVoteOnPost(id: string): Promise<VoteType> {
  const { data } = await api.get<ApiResponse<VoteType>>(
    `${API_ENDPOINTS.POST(id)}/my-vote`
  );
  return data.data;
}

// ==================== Post Actions ====================

/**
 * Toggle pin status (admin/ambassador only)
 */
export async function togglePinPost(id: string): Promise<Post> {
  const { data } = await api.patch<ApiResponse<Post>>(
    API_ENDPOINTS.POST_PIN(id)
  );
  return data.data;
}

/**
 * Toggle close status (author only)
 */
export async function toggleClosePost(id: string): Promise<Post> {
  const { data } = await api.patch<ApiResponse<Post>>(
    `${API_ENDPOINTS.POST(id)}/close`
  );
  return data.data;
}
