"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import {
  ChevronUp,
  ChevronDown,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
  Pin,
  CheckCircle,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Post } from "@/types/entities";

interface PostFeedCardProps {
  post: Post;
  onUpvote?: (id: string) => void;
  onDownvote?: (id: string) => void;
  isVoting?: boolean;
}

export default function PostFeedCard({
  post,
  onUpvote,
  onDownvote,
  isVoting,
}: PostFeedCardProps) {
  const score = post.upvotesCount - post.downvotesCount;

  return (
    <article className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-200 overflow-hidden">
      <div className="p-4">
        {/* Header: Author & Subject */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm">
            {/* Subject Badge */}
            <Link
              href={ROUTES.SUBJECT_DETAIL(post.subjectId)}
              className="flex items-center gap-1.5 px-2 py-1 bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors font-medium"
            >
              <span className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs">
                {post.subjectName?.charAt(0) || "M"}
              </span>
              {post.subjectName || "Matière"}
            </Link>

            <span className="text-gray-400">•</span>

            {/* Author */}
            <div className="flex items-center gap-1.5">
              {post.author.avatarUrl ? (
                <img
                  src={post.author.avatarUrl}
                  alt={post.author.firstName}
                  className="w-5 h-5 rounded-full object-cover"
                />
              ) : (
                <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-600">
                  {post.author.firstName.charAt(0)}
                </div>
              )}
              <span className="text-gray-600">
                {post.author.firstName} {post.author.lastName}
              </span>
            </div>

            <span className="text-gray-400">•</span>

            {/* Time */}
            <span className="text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: false,
                locale: fr,
              })}
            </span>
          </div>

          {/* Badges & More */}
          <div className="flex items-center gap-2">
            {post.isPinned && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-medium">
                <Pin className="w-3 h-3" />
                Épinglé
              </span>
            )}
            {post.isResolved && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                <CheckCircle className="w-3 h-3" />
                Résolu
              </span>
            )}
            <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Title */}
        <Link href={ROUTES.POST_DETAIL(post.id)} className="group block">
          <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
            {post.title}
          </h2>
        </Link>

        {/* Content Preview */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
          {post.content}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer: Actions */}
        <div className="flex items-center gap-1 pt-2 border-t border-gray-50">
          {/* Votes */}
          <div className="flex items-center bg-gray-50 rounded-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                onUpvote?.(post.id);
              }}
              disabled={isVoting}
              className={cn(
                "p-1.5 rounded-l-full hover:bg-primary-100 transition-colors disabled:opacity-50",
                post.userVote === "UPVOTE" && "text-primary-600 bg-primary-100"
              )}
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <span
              className={cn(
                "px-1 text-sm font-semibold min-w-[2rem] text-center",
                score > 0 && "text-primary-600",
                score < 0 && "text-red-600",
                score === 0 && "text-gray-600"
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
                "p-1.5 rounded-r-full hover:bg-red-100 transition-colors disabled:opacity-50",
                post.userVote === "DOWNVOTE" && "text-red-600 bg-red-100"
              )}
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Comments */}
          <Link
            href={ROUTES.POST_DETAIL(post.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors text-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{post.repliesCount}</span>
          </Link>

          {/* Share */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors text-sm">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Partager</span>
          </button>

          {/* Bookmark */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors text-sm">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
