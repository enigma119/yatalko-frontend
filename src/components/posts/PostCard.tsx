"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import {
  MessageSquare,
  Eye,
  ChevronUp,
  ChevronDown,
  Pin,
  CheckCircle,
  HelpCircle,
  Megaphone,
  MessageCircle,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Post, PostType } from "@/types/entities";

interface PostCardProps {
  post: Post;
  onUpvote?: (id: string) => void;
  onDownvote?: (id: string) => void;
  isVoting?: boolean;
}

const postTypeConfig: Record<
  PostType,
  { label: string; color: string; icon: React.ReactNode }
> = {
  QUESTION: {
    label: "Question",
    color: "bg-blue-100 text-blue-700",
    icon: <HelpCircle className="w-3 h-3" />,
  },
  DISCUSSION: {
    label: "Discussion",
    color: "bg-green-100 text-green-700",
    icon: <MessageCircle className="w-3 h-3" />,
  },
  ANNOUNCEMENT: {
    label: "Annonce",
    color: "bg-amber-100 text-amber-700",
    icon: <Megaphone className="w-3 h-3" />,
  },
};

export default function PostCard({
  post,
  onUpvote,
  onDownvote,
  isVoting,
}: PostCardProps) {
  const typeConfig = postTypeConfig[post.type];
  const score = post.upvotesCount - post.downvotesCount;

  return (
    <article className="bg-white rounded-xl border border-gray-200 hover:border-primary-200 hover:shadow-md transition-all duration-200">
      <div className="flex">
        {/* Vote Column */}
        <div className="flex flex-col items-center p-3 border-r border-gray-100 bg-gray-50/50 rounded-l-xl">
          <button
            onClick={(e) => {
              e.preventDefault();
              onUpvote?.(post.id);
            }}
            disabled={isVoting}
            className={cn(
              "p-1 rounded hover:bg-primary-100 transition-colors disabled:opacity-50",
              post.userVote === "UPVOTE" && "text-primary-600 bg-primary-50"
            )}
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <span
            className={cn(
              "text-sm font-semibold my-1",
              score > 0 && "text-primary-600",
              score < 0 && "text-red-600",
              score === 0 && "text-gray-500"
            )}
          >
            {score}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              onDownvote?.(post.id);
            }}
            disabled={isVoting}
            className={cn(
              "p-1 rounded hover:bg-red-100 transition-colors disabled:opacity-50",
              post.userVote === "DOWNVOTE" && "text-red-600 bg-red-50"
            )}
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          {/* Header with badges */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {post.isPinned && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                <Pin className="w-3 h-3" />
                Épinglé
              </span>
            )}
            {post.isResolved && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                <CheckCircle className="w-3 h-3" />
                Résolu
              </span>
            )}
            <span
              className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                typeConfig.color
              )}
            >
              {typeConfig.icon}
              {typeConfig.label}
            </span>
            {post.subjectName && (
              <span className="text-xs text-gray-500">{post.subjectName}</span>
            )}
          </div>

          {/* Title */}
          <Link href={ROUTES.POST_DETAIL(post.id)} className="group">
            <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>

          {/* Content preview */}
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {post.content}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 4 && (
                <span className="text-xs text-gray-400">
                  +{post.tags.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            {/* Author */}
            <div className="flex items-center gap-2">
              {post.author.avatarUrl ? (
                <img
                  src={post.author.avatarUrl}
                  alt={`${post.author.firstName} ${post.author.lastName}`}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-medium">
                  {post.author.firstName.charAt(0)}
                  {post.author.lastName.charAt(0)}
                </div>
              )}
              <span className="text-sm text-gray-600">
                {post.author.firstName} {post.author.lastName}
              </span>
              <span className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                  locale: fr,
                })}
              </span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 text-gray-500">
              <span className="flex items-center gap-1 text-sm">
                <MessageSquare className="w-4 h-4" />
                {post.repliesCount}
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Eye className="w-4 h-4" />
                {post.viewsCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
