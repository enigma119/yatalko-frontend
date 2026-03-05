"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { TrendingUp, Loader2 } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { useTrendingPosts } from "@/hooks";
import { useAuthStore } from "@/stores/authStore";
import type { Post } from "@/types/entities";

function RecentPostItem({ post }: { post: Post }) {
  return (
    <Link
      href={ROUTES.POST_DETAIL(post.id)}
      className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
    >
      {/* Subject Icon */}
      <div className="flex-shrink-0">
        <span className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium">
          {post.subjectName?.charAt(0) || "M"}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 mb-0.5">
          {post.subjectName}
          <span className="mx-1">•</span>
          {formatDistanceToNow(new Date(post.createdAt), {
            addSuffix: false,
            locale: fr,
          })}
        </p>
        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {post.title}
        </h4>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {post.content}
        </p>
      </div>
    </Link>
  );
}

export default function RecentPostsSidebar() {
  const { user } = useAuthStore();
  const { data, isLoading } = useTrendingPosts(
    user?.universityId || "",
    24,
    0,
    5
  );

  return (
    <aside className="w-80 flex-shrink-0 hidden xl:block">
      <div className="sticky top-20 space-y-4">
        {/* Trending Posts */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <h3 className="font-semibold text-gray-900 text-sm">
                Posts tendances
              </h3>
            </div>
            <Link
              href="#"
              className="text-xs text-primary-600 hover:underline"
            >
              Voir tout
            </Link>
          </div>

          <div className="divide-y divide-gray-50">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
              </div>
            ) : data && data.content.length > 0 ? (
              data.content.map((post) => (
                <RecentPostItem key={post.id} post={post} />
              ))
            ) : (
              <div className="p-4 text-center">
                <p className="text-sm text-gray-500">
                  Aucun post tendance
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Yatalko Info Card */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-4 text-white">
          <h3 className="font-bold mb-2">Rejoins la communauté</h3>
          <p className="text-sm text-white/80 mb-3">
            Pose tes questions, partage tes documents et aide les autres
            étudiants.
          </p>
          <Link
            href={ROUTES.SUBJECTS}
            className="inline-block px-4 py-2 bg-white text-primary-600 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Explorer les matières
          </Link>
        </div>
      </div>
    </aside>
  );
}
