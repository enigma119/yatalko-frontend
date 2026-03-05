"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, FileText, Users, Loader2 } from "lucide-react";
import { useSubject, useJoinSubject, useLeaveSubject } from "@/hooks";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import {
  SubjectHeader,
  SubjectDiscussions,
  SubjectDocuments,
  SubjectMembers,
} from "@/components/subjects";
import { ROUTES } from "@/lib/constants";

interface SubjectDetailPageProps {
  params: Promise<{ id: string }>;
}

function SubjectSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-24 mb-4" />
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-xl" />
          <div className="flex-1">
            <div className="h-6 bg-gray-200 rounded w-48 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-64 mb-4" />
            <div className="flex gap-4">
              <div className="h-4 bg-gray-200 rounded w-20" />
              <div className="h-4 bg-gray-200 rounded w-20" />
              <div className="h-4 bg-gray-200 rounded w-20" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />

      {/* Content Skeleton */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
        <div className="space-y-4">
          <div className="h-20 bg-gray-200 rounded" />
          <div className="h-20 bg-gray-200 rounded" />
          <div className="h-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  const router = useRouter();

  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-4xl">!</span>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Erreur</h2>
      <p className="text-gray-600 mb-6">{message}</p>
      <button
        onClick={() => router.push(ROUTES.SUBJECTS)}
        className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
      >
        Retour aux matières
      </button>
    </div>
  );
}

export default function SubjectDetailPage({ params }: SubjectDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const { data: subject, isLoading, error } = useSubject(id);
  const joinMutation = useJoinSubject();
  const leaveMutation = useLeaveSubject();

  const handleJoin = () => {
    joinMutation.mutate(id);
  };

  const handleLeave = () => {
    leaveMutation.mutate(id);
  };

  const handleCreatePost = () => {
    // TODO: Ouvrir modal création post (Phase 4)
    console.log("Create post for subject:", id);
  };

  const handleUploadDocument = () => {
    // TODO: Ouvrir modal upload document (Phase 5)
    console.log("Upload document for subject:", id);
  };

  if (isLoading) {
    return <SubjectSkeleton />;
  }

  if (error || !subject) {
    return <ErrorState message="Cette matière n'existe pas ou n'est plus disponible." />;
  }

  return (
    <div className="space-y-6">
      {/* Subject Header */}
      <SubjectHeader
        subject={subject}
        onJoin={handleJoin}
        onLeave={handleLeave}
        isJoining={joinMutation.isPending}
        isLeaving={leaveMutation.isPending}
      />

      {/* Tabs */}
      <Tabs defaultValue="discussions">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger
            value="discussions"
            icon={<MessageSquare className="w-4 h-4" />}
          >
            Discussions
            <span className="ml-1.5 text-xs text-gray-500">
              ({subject.postsCount})
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            icon={<FileText className="w-4 h-4" />}
          >
            Documents
            <span className="ml-1.5 text-xs text-gray-500">
              ({subject.documentsCount})
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="members"
            icon={<Users className="w-4 h-4" />}
          >
            Membres
            <span className="ml-1.5 text-xs text-gray-500">
              ({subject.membersCount})
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="mt-6">
          <SubjectDiscussions
            subjectId={id}
            posts={[]} // TODO: Fetch posts (Phase 4)
            isLoading={false}
            canCreatePost={subject.isJoined}
            onCreatePost={handleCreatePost}
          />
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <SubjectDocuments
            subjectId={id}
            documents={[]} // TODO: Fetch documents (Phase 5)
            isLoading={false}
            canUpload={subject.isJoined}
            onUpload={handleUploadDocument}
          />
        </TabsContent>

        <TabsContent value="members" className="mt-6">
          <SubjectMembers
            subjectId={id}
            members={[]} // TODO: Fetch members
            isLoading={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
