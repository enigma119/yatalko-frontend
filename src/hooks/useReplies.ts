import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getReplies,
  createReply,
  updateReply,
  deleteReply,
  acceptReply,
  unacceptReply,
  upvoteReply,
  downvoteReply,
} from "@/services/replies";
import type { CreateReplyRequest } from "@/types/api";
import type { Reply } from "@/types/entities";
import { postKeys } from "./usePosts";

// ==================== Query Keys ====================

export const replyKeys = {
  all: ["replies"] as const,
  lists: () => [...replyKeys.all, "list"] as const,
  list: (postId: string) => [...replyKeys.lists(), postId] as const,
  details: () => [...replyKeys.all, "detail"] as const,
  detail: (postId: string, replyId: string) =>
    [...replyKeys.details(), postId, replyId] as const,
};

// ==================== Query Hooks ====================

/**
 * Get all replies for a post
 */
export function useReplies(postId: string) {
  return useQuery({
    queryKey: replyKeys.list(postId),
    queryFn: () => getReplies(postId),
    enabled: !!postId,
  });
}

// ==================== Mutation Hooks ====================

/**
 * Create a reply (optimistic update)
 */
export function useCreateReply(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateReplyRequest & { parentId?: string }) =>
      createReply(postId, request),
    onSuccess: () => {
      // Invalidate replies list
      queryClient.invalidateQueries({ queryKey: replyKeys.list(postId) });
      // Invalidate post to update reply count
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
    },
  });
}

/**
 * Update a reply
 */
export function useUpdateReply(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ replyId, content }: { replyId: string; content: string }) =>
      updateReply(postId, replyId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: replyKeys.list(postId) });
    },
  });
}

/**
 * Delete a reply
 */
export function useDeleteReply(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (replyId: string) => deleteReply(postId, replyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: replyKeys.list(postId) });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
    },
  });
}

/**
 * Accept a reply as the answer (optimistic update)
 */
export function useAcceptReply(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (replyId: string) => acceptReply(postId, replyId),
    onMutate: async (replyId) => {
      await queryClient.cancelQueries({ queryKey: replyKeys.list(postId) });

      const previousReplies = queryClient.getQueryData<Reply[]>(
        replyKeys.list(postId)
      );

      if (previousReplies) {
        // Update the replies list optimistically
        const updatedReplies = previousReplies.map((reply) => ({
          ...reply,
          isAccepted: reply.id === replyId,
        }));
        queryClient.setQueryData(replyKeys.list(postId), updatedReplies);
      }

      return { previousReplies };
    },
    onError: (_, __, context) => {
      if (context?.previousReplies) {
        queryClient.setQueryData(
          replyKeys.list(postId),
          context.previousReplies
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: replyKeys.list(postId) });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
    },
  });
}

/**
 * Unaccept a reply
 */
export function useUnacceptReply(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (replyId: string) => unacceptReply(postId, replyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: replyKeys.list(postId) });
      queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) });
    },
  });
}

/**
 * Upvote a reply (optimistic update)
 */
export function useUpvoteReply(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (replyId: string) => upvoteReply(postId, replyId),
    onMutate: async (replyId) => {
      await queryClient.cancelQueries({ queryKey: replyKeys.list(postId) });

      const previousReplies = queryClient.getQueryData<Reply[]>(
        replyKeys.list(postId)
      );

      if (previousReplies) {
        const updateReplyVotes = (replies: Reply[]): Reply[] =>
          replies.map((reply) => {
            if (reply.id === replyId) {
              const wasUpvoted = reply.userVote === "UPVOTE";
              const wasDownvoted = reply.userVote === "DOWNVOTE";
              return {
                ...reply,
                userVote: wasUpvoted ? null : ("UPVOTE" as const),
                upvotesCount: reply.upvotesCount + (wasUpvoted ? -1 : 1),
                downvotesCount: reply.downvotesCount + (wasDownvoted ? -1 : 0),
              };
            }
            return reply;
          });

        queryClient.setQueryData(
          replyKeys.list(postId),
          updateReplyVotes(previousReplies)
        );
      }

      return { previousReplies };
    },
    onError: (_, __, context) => {
      if (context?.previousReplies) {
        queryClient.setQueryData(
          replyKeys.list(postId),
          context.previousReplies
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: replyKeys.list(postId) });
    },
  });
}

/**
 * Downvote a reply (optimistic update)
 */
export function useDownvoteReply(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (replyId: string) => downvoteReply(postId, replyId),
    onMutate: async (replyId) => {
      await queryClient.cancelQueries({ queryKey: replyKeys.list(postId) });

      const previousReplies = queryClient.getQueryData<Reply[]>(
        replyKeys.list(postId)
      );

      if (previousReplies) {
        const updateReplyVotes = (replies: Reply[]): Reply[] =>
          replies.map((reply) => {
            if (reply.id === replyId) {
              const wasUpvoted = reply.userVote === "UPVOTE";
              const wasDownvoted = reply.userVote === "DOWNVOTE";
              return {
                ...reply,
                userVote: wasDownvoted ? null : ("DOWNVOTE" as const),
                downvotesCount: reply.downvotesCount + (wasDownvoted ? -1 : 1),
                upvotesCount: reply.upvotesCount + (wasUpvoted ? -1 : 0),
              };
            }
            return reply;
          });

        queryClient.setQueryData(
          replyKeys.list(postId),
          updateReplyVotes(previousReplies)
        );
      }

      return { previousReplies };
    },
    onError: (_, __, context) => {
      if (context?.previousReplies) {
        queryClient.setQueryData(
          replyKeys.list(postId),
          context.previousReplies
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: replyKeys.list(postId) });
    },
  });
}
