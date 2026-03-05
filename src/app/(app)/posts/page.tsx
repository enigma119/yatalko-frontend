"use client";

import { useState } from "react";
import { Plus, Loader2, Inbox, Filter } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import {
  useMyFeed,
  useTrendingPosts,
  useUnansweredQuestions,
  useUpvotePost,
  useDownvotePost,
} from "@/hooks";
import { useDebounce } from "@/hooks/useDebounce";
import PostFeedCard from "@/components/posts/PostFeedCard";
import PostsNavSidebar from "@/components/posts/PostsNavSidebar";
import RecentPostsSidebar from "@/components/posts/RecentPostsSidebar";
import { CreatePostModal } from "@/components/posts";
import { cn } from "@/lib/utils";
import type { PostType } from "@/types/entities";

type FeedType = "home" | "popular" | "unanswered";

const typeFilters = [
  { value: "", label: "Tous" },
  { value: "QUESTION", label: "Questions" },
  { value: "DISCUSSION", label: "Discussions" },
  { value: "ANNOUNCEMENT", label: "Annonces" },
];

export default function PostsPage() {
  const { user } = useAuthStore();
  const [feedType, setFeedType] = useState<FeedType>("home");
  const [typeFilter, setTypeFilter] = useState<PostType | "">("");
  const [page, setPage] = useState(0);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const universityId = user?.universityId || "";

  // Fetch based on feed type
  const homeFeed = useMyFeed(typeFilter || undefined, page, 20);
  const popularFeed = useTrendingPosts(universityId, 24, page, 20);
  const unansweredFeed = useUnansweredQuestions(universityId, page, 20);

  const upvoteMutation = useUpvotePost();
  const downvoteMutation = useDownvotePost();

  // Select current feed data
  const getCurrentFeed = () => {
    switch (feedType) {
      case "home":
        return homeFeed;
      case "popular":
        return popularFeed;
      case "unanswered":
        return unansweredFeed;
      default:
        return homeFeed;
    }
  };

  const currentFeed = getCurrentFeed();
  const { data, isLoading, isError } = currentFeed;

  const handleUpvote = (postId: string) => {
    upvoteMutation.mutate(postId);
  };

  const handleDownvote = (postId: string) => {
    downvoteMutation.mutate(postId);
  };

  const handleFeedChange = (feed: FeedType) => {
    setFeedType(feed);
    setPage(0);
  };

  return (
    <>
      <div className="flex gap-6 max-w-7xl mx-auto">
        {/* Left Sidebar - Navigation */}
        <PostsNavSidebar
          currentFeed={feedType}
          onFeedChange={handleFeedChange}
        />

        {/* Main Feed */}
        <main className="flex-1 min-w-0">
          {/* Header */}
          <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-gray-900">
                {feedType === "home" && "Mon Feed"}
                {feedType === "popular" && "Posts Populaires"}
                {feedType === "unanswered" && "Questions sans réponse"}
              </h1>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Créer un post
              </button>
            </div>

            {/* Type Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
              {typeFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => {
                    setTypeFilter(filter.value as PostType | "");
                    setPage(0);
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                    typeFilter === filter.value
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
              <p className="text-red-600">Erreur lors du chargement des posts</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && data?.content.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
              <Inbox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Aucun post
              </h2>
              <p className="text-gray-500 mb-4">
                {feedType === "home"
                  ? "Rejoignez des matières pour voir des posts ici"
                  : "Aucun post disponible dans cette catégorie"}
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Créer le premier post
              </button>
            </div>
          )}

          {/* Posts Feed */}
          {!isLoading && !isError && data && data.content.length > 0 && (
            <div className="space-y-4">
              {data.content.map((post) => (
                <PostFeedCard
                  key={post.id}
                  post={post}
                  onUpvote={handleUpvote}
                  onDownvote={handleDownvote}
                  isVoting={
                    upvoteMutation.isPending || downvoteMutation.isPending
                  }
                />
              ))}

              {/* Pagination */}
              {data.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 py-4">
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
          )}
        </main>

        {/* Right Sidebar - Recent Posts */}
        <RecentPostsSidebar />
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        subjectId=""
      />
    </>
  );
}
