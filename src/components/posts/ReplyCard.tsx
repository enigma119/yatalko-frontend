"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import {
  ChevronUp,
  ChevronDown,
  CheckCircle,
  MoreHorizontal,
  Edit,
  Trash2,
  Check,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import {
  useUpvoteReply,
  useDownvoteReply,
  useAcceptReply,
  useUnacceptReply,
  useDeleteReply,
} from "@/hooks";
import type { Reply } from "@/types/entities";

interface ReplyCardProps {
  reply: Reply;
  postId: string;
  postAuthorId: string;
  isPostResolved?: boolean;
  depth?: number;
  onReply?: (replyId: string) => void;
}

export default function ReplyCard({
  reply,
  postId,
  postAuthorId,
  isPostResolved,
  depth = 0,
  onReply,
}: ReplyCardProps) {
  const { user } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);

  const upvoteMutation = useUpvoteReply(postId);
  const downvoteMutation = useDownvoteReply(postId);
  const acceptMutation = useAcceptReply(postId);
  const unacceptMutation = useUnacceptReply(postId);
  const deleteMutation = useDeleteReply(postId);

  const score = reply.upvotesCount - reply.downvotesCount;
  const isAuthor = user?.id === reply.authorId;
  const isPostAuthor = user?.id === postAuthorId;
  const isAmbassador =
    user?.role === "AMBASSADOR" ||
    user?.role === "CAMPUS_LEAD" ||
    user?.role === "ADMIN";

  const canAccept = isPostAuthor && !isPostResolved;
  const canDelete = isAuthor || isAmbassador;

  const handleUpvote = () => {
    upvoteMutation.mutate(reply.id);
  };

  const handleDownvote = () => {
    downvoteMutation.mutate(reply.id);
  };

  const handleAccept = () => {
    if (reply.isAccepted) {
      unacceptMutation.mutate(reply.id);
    } else {
      acceptMutation.mutate(reply.id);
    }
    setShowMenu(false);
  };

  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette réponse ?")) {
      deleteMutation.mutate(reply.id);
    }
    setShowMenu(false);
  };

  return (
    <div
      className={cn(
        "relative",
        depth > 0 && "ml-8 border-l-2 border-gray-100 pl-4"
      )}
    >
      <div
        className={cn(
          "bg-white rounded-xl border p-4",
          reply.isAccepted
            ? "border-green-200 bg-green-50/30"
            : "border-gray-100"
        )}
      >
        <div className="flex gap-3">
          {/* Vote Column */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleUpvote}
              disabled={upvoteMutation.isPending}
              className={cn(
                "p-1 rounded hover:bg-primary-100 transition-colors disabled:opacity-50",
                reply.userVote === "UPVOTE" && "text-primary-600 bg-primary-50"
              )}
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <span
              className={cn(
                "text-sm font-semibold",
                score > 0 && "text-primary-600",
                score < 0 && "text-red-600",
                score === 0 && "text-gray-500"
              )}
            >
              {score}
            </span>
            <button
              onClick={handleDownvote}
              disabled={downvoteMutation.isPending}
              className={cn(
                "p-1 rounded hover:bg-red-100 transition-colors disabled:opacity-50",
                reply.userVote === "DOWNVOTE" && "text-red-600 bg-red-50"
              )}
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {reply.author.avatarUrl ? (
                  <img
                    src={reply.author.avatarUrl}
                    alt={`${reply.author.firstName} ${reply.author.lastName}`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-medium">
                    {reply.author.firstName.charAt(0)}
                    {reply.author.lastName.charAt(0)}
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-900 text-sm">
                    {reply.author.firstName} {reply.author.lastName}
                  </span>
                  <span className="text-gray-400 mx-2">·</span>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(reply.createdAt), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </span>
                </div>
                {reply.isAccepted && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    <CheckCircle className="w-3 h-3" />
                    Meilleure réponse
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                {canAccept && (
                  <button
                    onClick={handleAccept}
                    className={cn(
                      "p-1.5 rounded-lg transition-colors text-sm",
                      reply.isAccepted
                        ? "text-green-600 bg-green-100 hover:bg-green-200"
                        : "text-gray-400 hover:text-green-600 hover:bg-green-50"
                    )}
                    title={
                      reply.isAccepted
                        ? "Retirer comme meilleure réponse"
                        : "Marquer comme meilleure réponse"
                    }
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}

                {onReply && (
                  <button
                    onClick={() => onReply(reply.id)}
                    className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Répondre"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                )}

                {canDelete && (
                  <div className="relative">
                    <button
                      onClick={() => setShowMenu(!showMenu)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {showMenu && (
                      <>
                        <div
                          className="fixed inset-0"
                          onClick={() => setShowMenu(false)}
                        />
                        <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                          {isAuthor && (
                            <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Edit className="w-4 h-4" />
                              Modifier
                            </button>
                          )}
                          <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                            Supprimer
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Reply Content */}
            <div className="text-sm text-gray-700 whitespace-pre-wrap">
              {reply.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
