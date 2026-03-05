"use client";

import { useState } from "react";
import { Loader2, MessageSquare } from "lucide-react";
import { useReplies } from "@/hooks";
import ReplyCard from "./ReplyCard";
import CreateReplyForm from "./CreateReplyForm";
import type { Reply } from "@/types/entities";

interface RepliesListProps {
  postId: string;
  postAuthorId: string;
  isPostResolved?: boolean;
}

export default function RepliesList({
  postId,
  postAuthorId,
  isPostResolved,
}: RepliesListProps) {
  const { data: replies, isLoading, isError } = useReplies(postId);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // Sort: accepted first, then by score, then by date
  const sortedReplies = replies
    ? [...replies].sort((a, b) => {
        // Accepted replies first
        if (a.isAccepted && !b.isAccepted) return -1;
        if (!a.isAccepted && b.isAccepted) return 1;
        // Then by score
        const scoreA = a.upvotesCount - a.downvotesCount;
        const scoreB = b.upvotesCount - b.downvotesCount;
        if (scoreA !== scoreB) return scoreB - scoreA;
        // Then by date
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
    : [];

  const handleReply = (replyId: string) => {
    setReplyingTo(replyId);
  };

  return (
    <div className="space-y-4">
      {/* Replies Header */}
      <div className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-gray-400" />
        <h2 className="font-semibold text-gray-900">
          {replies?.length || 0} réponse{(replies?.length || 0) > 1 ? "s" : ""}
        </h2>
      </div>

      {/* Create Reply Form */}
      <CreateReplyForm postId={postId} />

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 text-primary-500 animate-spin" />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-8">
          <p className="text-red-600">
            Erreur lors du chargement des réponses
          </p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && sortedReplies.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-xl">
          <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">
            Aucune réponse pour le moment. Soyez le premier à répondre !
          </p>
        </div>
      )}

      {/* Replies List */}
      {!isLoading && !isError && sortedReplies.length > 0 && (
        <div className="space-y-4">
          {sortedReplies.map((reply) => (
            <div key={reply.id}>
              <ReplyCard
                reply={reply}
                postId={postId}
                postAuthorId={postAuthorId}
                isPostResolved={isPostResolved}
                onReply={handleReply}
              />
              {replyingTo === reply.id && (
                <div className="ml-12 mt-2">
                  <CreateReplyForm
                    postId={postId}
                    parentId={reply.id}
                    onCancel={() => setReplyingTo(null)}
                    placeholder={`Répondre à ${reply.author.firstName}...`}
                    autoFocus
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
