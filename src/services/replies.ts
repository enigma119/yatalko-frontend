import api from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import type { ApiResponse, CreateReplyRequest } from "@/types/api";
import type { Reply } from "@/types/entities";
import type { VoteResult } from "./posts";

// ==================== Replies CRUD ====================

/**
 * Get all replies for a post (with nested children)
 */
export async function getReplies(postId: string): Promise<Reply[]> {
  const { data } = await api.get<ApiResponse<Reply[]>>(
    API_ENDPOINTS.REPLIES(postId)
  );
  return data.data;
}

/**
 * Get a single reply by ID
 */
export async function getReplyById(
  postId: string,
  replyId: string
): Promise<Reply> {
  const { data } = await api.get<ApiResponse<Reply>>(
    API_ENDPOINTS.REPLY(postId, replyId)
  );
  return data.data;
}

/**
 * Create a reply to a post
 */
export async function createReply(
  postId: string,
  request: CreateReplyRequest & { parentId?: string }
): Promise<Reply> {
  const { data } = await api.post<ApiResponse<Reply>>(
    API_ENDPOINTS.REPLIES(postId),
    request
  );
  return data.data;
}

/**
 * Update a reply
 */
export async function updateReply(
  postId: string,
  replyId: string,
  content: string
): Promise<Reply> {
  const { data } = await api.put<ApiResponse<Reply>>(
    API_ENDPOINTS.REPLY(postId, replyId),
    { content }
  );
  return data.data;
}

/**
 * Delete a reply
 */
export async function deleteReply(
  postId: string,
  replyId: string
): Promise<void> {
  await api.delete(API_ENDPOINTS.REPLY(postId, replyId));
}

// ==================== Reply Actions ====================

/**
 * Accept a reply as the answer (post author only)
 */
export async function acceptReply(
  postId: string,
  replyId: string
): Promise<Reply> {
  const { data } = await api.post<ApiResponse<Reply>>(
    `${API_ENDPOINTS.REPLIES(postId)}/${replyId}/accept`
  );
  return data.data;
}

/**
 * Unaccept a reply (post author only)
 */
export async function unacceptReply(
  postId: string,
  replyId: string
): Promise<Reply> {
  const { data } = await api.delete<ApiResponse<Reply>>(
    `${API_ENDPOINTS.REPLIES(postId)}/${replyId}/accept`
  );
  return data.data;
}

// ==================== Reply Votes ====================

/**
 * Upvote a reply (toggle)
 */
export async function upvoteReply(
  postId: string,
  replyId: string
): Promise<VoteResult> {
  const { data } = await api.post<ApiResponse<VoteResult>>(
    `${API_ENDPOINTS.REPLIES(postId)}/${replyId}/upvote`
  );
  return data.data;
}

/**
 * Downvote a reply (toggle)
 */
export async function downvoteReply(
  postId: string,
  replyId: string
): Promise<VoteResult> {
  const { data } = await api.post<ApiResponse<VoteResult>>(
    `${API_ENDPOINTS.REPLIES(postId)}/${replyId}/downvote`
  );
  return data.data;
}
