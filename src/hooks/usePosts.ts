import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  searchPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPinnedPosts,
  getTopPosts,
  getUnansweredQuestions,
  getMyPosts,
  getMyFeed,
  getTrendingPosts,
  upvotePost,
  downvotePost,
  togglePinPost,
  toggleClosePost,
  type PostSearchParams,
} from "@/services/posts";
import type { CreatePostRequest, UpdatePostRequest } from "@/types/api";
import type { Post, PostType } from "@/types/entities";

// ==================== Query Keys ====================

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (params: PostSearchParams) => [...postKeys.lists(), params] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
  pinned: (universityId: string) =>
    [...postKeys.all, "pinned", universityId] as const,
  top: (universityId: string) => [...postKeys.all, "top", universityId] as const,
  unanswered: (universityId: string) =>
    [...postKeys.all, "unanswered", universityId] as const,
  myPosts: () => [...postKeys.all, "my-posts"] as const,
  feed: (type?: PostType) => [...postKeys.all, "feed", type] as const,
  trending: (universityId: string) =>
    [...postKeys.all, "trending", universityId] as const,
};

// ==================== Query Hooks ====================

/**
 * Search posts with filters and pagination
 */
export function usePosts(params: PostSearchParams) {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => searchPosts(params),
    enabled: !!params.universityId,
  });
}

/**
 * Get a single post by ID
 */
export function usePost(id: string) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => getPostById(id),
    enabled: !!id,
  });
}

/**
 * Get pinned posts for a university
 */
export function usePinnedPosts(universityId: string) {
  return useQuery({
    queryKey: postKeys.pinned(universityId),
    queryFn: () => getPinnedPosts(universityId),
    enabled: !!universityId,
  });
}

/**
 * Get top posts for a university
 */
export function useTopPosts(universityId: string, page = 0, size = 20) {
  return useQuery({
    queryKey: [...postKeys.top(universityId), page, size],
    queryFn: () => getTopPosts(universityId, page, size),
    enabled: !!universityId,
  });
}

/**
 * Get unanswered questions
 */
export function useUnansweredQuestions(
  universityId: string,
  page = 0,
  size = 20
) {
  return useQuery({
    queryKey: [...postKeys.unanswered(universityId), page, size],
    queryFn: () => getUnansweredQuestions(universityId, page, size),
    enabled: !!universityId,
  });
}

/**
 * Get current user's posts
 */
export function useMyPosts() {
  return useQuery({
    queryKey: postKeys.myPosts(),
    queryFn: getMyPosts,
  });
}

/**
 * Get personalized feed
 */
export function useMyFeed(type?: PostType, page = 0, size = 20) {
  return useQuery({
    queryKey: [...postKeys.feed(type), page, size],
    queryFn: () => getMyFeed(type, page, size),
  });
}

/**
 * Get trending posts
 */
export function useTrendingPosts(
  universityId: string,
  hours = 24,
  page = 0,
  size = 20
) {
  return useQuery({
    queryKey: [...postKeys.trending(universityId), hours, page, size],
    queryFn: () => getTrendingPosts(universityId, hours, page, size),
    enabled: !!universityId,
  });
}

// ==================== Mutation Hooks ====================

/**
 * Create a new post
 */
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreatePostRequest) => createPost(request),
    onSuccess: (newPost) => {
      // Invalidate posts lists
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postKeys.feed() });
      queryClient.invalidateQueries({ queryKey: postKeys.myPosts() });

      // Add to cache
      queryClient.setQueryData(postKeys.detail(newPost.id), newPost);
    },
  });
}

/**
 * Update a post
 */
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: UpdatePostRequest }) =>
      updatePost(id, request),
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(postKeys.detail(updatedPost.id), updatedPost);
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}

/**
 * Delete a post
 */
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: postKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postKeys.feed() });
      queryClient.invalidateQueries({ queryKey: postKeys.myPosts() });
    },
  });
}

/**
 * Upvote a post (optimistic update)
 */
export function useUpvotePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => upvotePost(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: postKeys.detail(id) });

      const previousPost = queryClient.getQueryData<Post>(postKeys.detail(id));

      if (previousPost) {
        const wasUpvoted = previousPost.userVote === "UPVOTE";
        const wasDownvoted = previousPost.userVote === "DOWNVOTE";

        queryClient.setQueryData<Post>(postKeys.detail(id), {
          ...previousPost,
          userVote: wasUpvoted ? null : "UPVOTE",
          upvotesCount: previousPost.upvotesCount + (wasUpvoted ? -1 : 1),
          downvotesCount:
            previousPost.downvotesCount + (wasDownvoted ? -1 : 0),
        });
      }

      return { previousPost };
    },
    onError: (_, id, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(postKeys.detail(id), context.previousPost);
      }
    },
    onSettled: (_, __, id) => {
      queryClient.invalidateQueries({ queryKey: postKeys.detail(id) });
    },
  });
}

/**
 * Downvote a post (optimistic update)
 */
export function useDownvotePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => downvotePost(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: postKeys.detail(id) });

      const previousPost = queryClient.getQueryData<Post>(postKeys.detail(id));

      if (previousPost) {
        const wasUpvoted = previousPost.userVote === "UPVOTE";
        const wasDownvoted = previousPost.userVote === "DOWNVOTE";

        queryClient.setQueryData<Post>(postKeys.detail(id), {
          ...previousPost,
          userVote: wasDownvoted ? null : "DOWNVOTE",
          downvotesCount: previousPost.downvotesCount + (wasDownvoted ? -1 : 1),
          upvotesCount: previousPost.upvotesCount + (wasUpvoted ? -1 : 0),
        });
      }

      return { previousPost };
    },
    onError: (_, id, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(postKeys.detail(id), context.previousPost);
      }
    },
    onSettled: (_, __, id) => {
      queryClient.invalidateQueries({ queryKey: postKeys.detail(id) });
    },
  });
}

/**
 * Toggle pin post (admin/ambassador only)
 */
export function useTogglePinPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => togglePinPost(id),
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(postKeys.detail(updatedPost.id), updatedPost);
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });
}

/**
 * Toggle close post (author only)
 */
export function useToggleClosePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleClosePost(id),
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(postKeys.detail(updatedPost.id), updatedPost);
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}
