"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Plus,
  CheckCircle,
  Pin,
  ArrowUp,
  Clock,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import type { Post } from "@/types/entities";

interface SubjectDiscussionsProps {
  subjectId: string;
  posts?: Post[];
  isLoading?: boolean;
  canCreatePost?: boolean;
  onCreatePost?: () => void;
}

function PostTypeIcon({ type }: { type: Post["type"] }) {
  switch (type) {
    case "QUESTION":
      return <MessageSquare className="w-4 h-4 text-blue-500" />;
    case "ANNOUNCEMENT":
      return <Pin className="w-4 h-4 text-amber-500" />;
    default:
      return <MessageSquare className="w-4 h-4 text-gray-400" />;
  }
}

function PostItem({ post }: { post: Post }) {
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: fr,
  });

  return (
    <Link
      href={ROUTES.POST_DETAIL(post.id)}
      className="block p-4 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-start gap-3">
        {/* Vote count */}
        <div className="flex flex-col items-center gap-1 text-center min-w-[40px]">
          <ArrowUp className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">
            {post.upvotesCount - post.downvotesCount}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <PostTypeIcon type={post.type} />
            {post.isPinned && (
              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                Épinglé
              </span>
            )}
            {post.isResolved && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                <CheckCircle className="w-3 h-3" />
                Résolu
              </span>
            )}
          </div>

          <h3 className="font-medium text-gray-900 line-clamp-1 hover:text-primary-600">
            {post.title}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-1 mt-1">
            {post.content}
          </p>

          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
            <span>
              {post.author.firstName} {post.author.lastName}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {timeAgo}
            </span>
            <span>{post.repliesCount} réponses</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function PostSkeleton() {
  return (
    <div className="p-4 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-full mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}

function EmptyState({ canCreate, onCreate }: { canCreate?: boolean; onCreate?: () => void }) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <MessageSquare className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="font-medium text-gray-900 mb-1">Aucune discussion</h3>
      <p className="text-sm text-gray-500 mb-4">
        Sois le premier à lancer une discussion !
      </p>
      {canCreate && onCreate && (
        <button
          onClick={onCreate}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Nouvelle discussion
        </button>
      )}
    </div>
  );
}

export default function SubjectDiscussions({
  subjectId,
  posts = [],
  isLoading,
  canCreatePost = true,
  onCreatePost,
}: SubjectDiscussionsProps) {
  // Sort: pinned first, then by date
  const sortedPosts = [...posts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">Discussions</h2>
        {canCreatePost && onCreatePost && (
          <button
            onClick={onCreatePost}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Nouveau post
          </button>
        )}
      </div>

      {/* Content */}
      <div className="divide-y divide-gray-100">
        {isLoading ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : sortedPosts.length > 0 ? (
          sortedPosts.map((post) => <PostItem key={post.id} post={post} />)
        ) : (
          <EmptyState canCreate={canCreatePost} onCreate={onCreatePost} />
        )}
      </div>
    </div>
  );
}
