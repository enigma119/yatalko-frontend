"use client";

import Link from "next/link";
import {
  BookOpen,
  Users,
  FileText,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Subject } from "@/types/entities";

interface SubjectCardProps {
  subject: Subject;
  onJoin?: (id: string) => void;
  onLeave?: (id: string) => void;
  isJoining?: boolean;
  isLeaving?: boolean;
}

export default function SubjectCard({
  subject,
  onJoin,
  onLeave,
  isJoining,
  isLeaving,
}: SubjectCardProps) {
  const isLoading = isJoining || isLeaving;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6 text-primary-600" />
          </div>
          <div className="flex-1 min-w-0">
            <Link
              href={ROUTES.SUBJECT_DETAIL(subject.id)}
              className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-1"
            >
              {subject.name}
            </Link>
            <p className="text-sm text-gray-500 mt-0.5">
              {subject.code} • {subject.level} • {subject.semester}
            </p>
            {subject.description && (
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {subject.description}
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4" />
            {subject.postsCount} posts
          </span>
          <span className="flex items-center gap-1.5">
            <FileText className="w-4 h-4" />
            {subject.documentsCount} docs
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            {subject.membersCount}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {subject.credits} crédits
        </span>

        {subject.isJoined ? (
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-sm text-green-600">
              <CheckCircle className="w-4 h-4" />
              Rejoint
            </span>
            {onLeave && (
              <button
                onClick={() => onLeave(subject.id)}
                disabled={isLoading}
                className="text-sm text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50"
              >
                Quitter
              </button>
            )}
          </div>
        ) : (
          onJoin && (
            <button
              onClick={() => onJoin(subject.id)}
              disabled={isLoading}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-lg transition-colors",
                "bg-primary-500 text-white hover:bg-primary-600",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isJoining ? "..." : "Rejoindre"}
            </button>
          )
        )}
      </div>
    </div>
  );
}
