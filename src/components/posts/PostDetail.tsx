"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import {
  ChevronUp,
  ChevronDown,
  Eye,
  MessageSquare,
  Pin,
  CheckCircle,
  HelpCircle,
  MessageCircle,
  Megaphone,
  MoreHorizontal,
  Edit,
  Trash2,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import {
  useUpvotePost,
  useDownvotePost,
  useTogglePinPost,
  useToggleClosePost,
  useDeletePost,
} from "@/hooks";
import type { Post, PostType } from "@/types/entities";

interface PostDetailProps {
  post: Post;
}

const postTypeConfig: Record<
  PostType,
  { label: string; color: string; icon: React.ReactNode }
> = {
  QUESTION: {
    label: "Question",
    color: "bg-blue-100 text-blue-700",
    icon: <HelpCircle className="w-4 h-4" />,
  },
  DISCUSSION: {
    label: "Discussion",
    color: "bg-green-100 text-green-700",
    icon: <MessageCircle className="w-4 h-4" />,
  },
  ANNOUNCEMENT: {
    label: "Annonce",
    color: "bg-amber-100 text-amber-700",
    icon: <Megaphone className="w-4 h-4" />,
  },
};

export default function PostDetail({ post }: PostDetailProps) {
  const { user } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);

  const upvoteMutation = useUpvotePost();
  const downvoteMutation = useDownvotePost();
  const pinMutation = useTogglePinPost();
  const closeMutation = useToggleClosePost();
  const deleteMutation = useDeletePost();

  const typeConfig = postTypeConfig[post.type];
  const score = post.upvotesCount - post.downvotesCount;

  const isAuthor = user?.id === post.authorId;
  const isAmbassador =
    user?.role === "AMBASSADOR" ||
    user?.role === "CAMPUS_LEAD" ||
    user?.role === "ADMIN";
  const canPin = isAmbassador;
  const canEdit = isAuthor;
  const canDelete = isAuthor || isAmbassador;
  const canClose = isAuthor;

  const handleUpvote = () => {
    upvoteMutation.mutate(post.id);
  };

  const handleDownvote = () => {
    downvoteMutation.mutate(post.id);
  };

  const handlePin = () => {
    pinMutation.mutate(post.id);
    setShowMenu(false);
  };

  const handleClose = () => {
    closeMutation.mutate(post.id);
    setShowMenu(false);
  };

  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
      deleteMutation.mutate(post.id);
    }
    setShowMenu(false);
  };

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Back Link */}
      <div className="px-6 py-3 border-b border-gray-100">
        <Link
          href={ROUTES.SUBJECT_DETAIL(post.subjectId)}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à {post.subjectName || "la matière"}
        </Link>
      </div>

      <div className="flex">
        {/* Vote Column */}
        <div className="flex flex-col items-center p-4 border-r border-gray-100 bg-gray-50/50">
          <button
            onClick={handleUpvote}
            disabled={upvoteMutation.isPending}
            className={cn(
              "p-2 rounded-lg hover:bg-primary-100 transition-colors disabled:opacity-50",
              post.userVote === "UPVOTE" && "text-primary-600 bg-primary-50"
            )}
          >
            <ChevronUp className="w-6 h-6" />
          </button>
          <span
            className={cn(
              "text-lg font-bold my-1",
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
              "p-2 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50",
              post.userVote === "DOWNVOTE" && "text-red-600 bg-red-50"
            )}
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              {post.isPinned && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                  <Pin className="w-3 h-3" />
                  Épinglé
                </span>
              )}
              {post.isResolved && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  <CheckCircle className="w-3 h-3" />
                  Résolu
                </span>
              )}
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                  typeConfig.color
                )}
              >
                {typeConfig.icon}
                {typeConfig.label}
              </span>
            </div>

            {/* Actions Menu */}
            {(canEdit || canDelete || canPin || canClose) && (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>

                {showMenu && (
                  <>
                    <div
                      className="fixed inset-0"
                      onClick={() => setShowMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                      {canPin && (
                        <button
                          onClick={handlePin}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Pin className="w-4 h-4" />
                          {post.isPinned ? "Désépingler" : "Épingler"}
                        </button>
                      )}
                      {canClose && (
                        <button
                          onClick={handleClose}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Lock className="w-4 h-4" />
                          {post.isResolved ? "Rouvrir" : "Marquer résolu"}
                        </button>
                      )}
                      {canEdit && (
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <Edit className="w-4 h-4" />
                          Modifier
                        </button>
                      )}
                      {canDelete && (
                        <button
                          onClick={handleDelete}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          Supprimer
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>

          {/* Author & Date */}
          <div className="flex items-center gap-3 mb-6">
            {post.author.avatarUrl ? (
              <img
                src={post.author.avatarUrl}
                alt={`${post.author.firstName} ${post.author.lastName}`}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-medium">
                {post.author.firstName.charAt(0)}
                {post.author.lastName.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-medium text-gray-900">
                {post.author.firstName} {post.author.lastName}
              </p>
              <p className="text-sm text-gray-500">
                Publié{" "}
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                  locale: fr,
                })}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-sm max-w-none text-gray-700 mb-6">
            {post.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-6 pt-4 border-t border-gray-100 text-gray-500">
            <span className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {post.viewsCount} vues
            </span>
            <span className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              {post.repliesCount} réponses
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
