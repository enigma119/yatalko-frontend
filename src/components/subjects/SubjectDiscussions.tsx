"use client";

import { useState } from "react";
import { PostsList } from "@/components/posts";
import CreatePostModal from "@/components/posts/CreatePostModal";

interface SubjectDiscussionsProps {
  subjectId: string;
  canCreatePost?: boolean;
}

export default function SubjectDiscussions({
  subjectId,
  canCreatePost = true,
}: SubjectDiscussionsProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <PostsList
        subjectId={subjectId}
        showFilters={true}
        showCreateButton={canCreatePost}
        onCreateClick={() => setIsCreateModalOpen(true)}
        emptyMessage="Aucune discussion dans cette matière"
      />

      {canCreatePost && (
        <CreatePostModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          subjectId={subjectId}
        />
      )}
    </>
  );
}
