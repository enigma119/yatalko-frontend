"use client";

import { useState } from "react";
import { Loader2, MessageSquarePlus, Inbox } from "lucide-react";
import { usePosts, useUpvotePost, useDownvotePost } from "@/hooks";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuthStore } from "@/stores/authStore";
import PostCard from "./PostCard";
import PostsFilters from "./PostsFilters";
import type { PostType } from "@/types/entities";

interface PostsListProps {
  subjectId?: string;
  showFilters?: boolean;
  showCreateButton?: boolean;
  onCreateClick?: () => void;
  emptyMessage?: string;
}

export default function PostsList({
  subjectId,
  showFilters = true,
  showCreateButton = true,
  onCreateClick,
  emptyMessage = "Aucune discussion pour le moment",
}: PostsListProps) {
  const { user } = useAuthStore();
  const [search, setSearch] = useState("");
  const [type, setType] = useState<PostType | "">("");
  const [sort, setSort] = useState("createdAt");
  const [page, setPage] = useState(0);

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isError } = usePosts({
    universityId: user?.universityId || "",
    subjectId,
    type: type || undefined,
    search: debouncedSearch || undefined,
    sort,
    direction: "desc",
    page,
    size: 20,
  });

  const upvoteMutation = useUpvotePost();
  const downvoteMutation = useDownvotePost();

  const handleUpvote = (postId: string) => {
    upvoteMutation.mutate(postId);
  };

  const handleDownvote = (postId: string) => {
    downvoteMutation.mutate(postId);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Discussions</h2>
        {showCreateButton && (
          <button
            onClick={onCreateClick}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
          >
            <MessageSquarePlus className="w-4 h-4" />
            Nouvelle discussion
          </button>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <PostsFilters
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(0);
          }}
          type={type}
          onTypeChange={(value) => {
            setType(value);
            setPage(0);
          }}
          sort={sort}
          onSortChange={(value) => {
            setSort(value);
            setPage(0);
          }}
        />
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-center py-12">
          <p className="text-red-600">
            Erreur lors du chargement des discussions
          </p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && data?.content.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">{emptyMessage}</p>
          {showCreateButton && (
            <button
              onClick={onCreateClick}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
            >
              <MessageSquarePlus className="w-4 h-4" />
              Créer la première discussion
            </button>
          )}
        </div>
      )}

      {/* Posts List */}
      {!isLoading && !isError && data && data.content.length > 0 && (
        <div className="space-y-3">
          {data.content.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onUpvote={handleUpvote}
              onDownvote={handleDownvote}
              isVoting={
                upvoteMutation.isPending || downvoteMutation.isPending
              }
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && data && data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={data.first}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Précédent
          </button>
          <span className="text-sm text-gray-600">
            Page {data.page + 1} sur {data.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={data.last}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}
