"use client";

import { use } from "react";
import { Loader2 } from "lucide-react";
import { usePost } from "@/hooks";
import { PostDetail, RepliesList } from "@/components/posts";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PostPage({ params }: PostPageProps) {
  const { id } = use(params);
  const { data: post, isLoading, isError, error } = usePost(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Post non trouvé
        </h1>
        <p className="text-gray-600">
          Ce post n&apos;existe pas ou a été supprimé.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Post Content */}
      <PostDetail post={post} />

      {/* Replies Section */}
      <RepliesList
        postId={post.id}
        postAuthorId={post.authorId}
        isPostResolved={post.isResolved}
      />
    </div>
  );
}
