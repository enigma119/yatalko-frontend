"use client";

import Link from "next/link";
import {
  BookOpen,
  Users,
  FileText,
  MessageSquare,
  ArrowLeft,
  CheckCircle,
  LogOut,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Subject } from "@/types/entities";

interface SubjectHeaderProps {
  subject: Subject;
  onJoin?: () => void;
  onLeave?: () => void;
  isJoining?: boolean;
  isLeaving?: boolean;
}

export default function SubjectHeader({
  subject,
  onJoin,
  onLeave,
  isJoining,
  isLeaving,
}: SubjectHeaderProps) {
  const isLoading = isJoining || isLeaving;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Top gradient bar */}
      <div className="h-2 bg-gradient-to-r from-primary-500 to-primary-600" />

      <div className="p-6">
        {/* Back link */}
        <Link
          href={ROUTES.SUBJECTS}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux matières
        </Link>

        {/* Main info */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
            <BookOpen className="w-8 h-8 text-primary-600" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h1 className="text-2xl font-bold text-gray-900">{subject.name}</h1>
              <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full w-fit">
                {subject.code}
              </span>
            </div>

            <p className="text-gray-600 mt-1">
              {subject.programName} • {subject.level} • {subject.semester} • {subject.credits} crédits
            </p>

            {subject.description && (
              <p className="text-gray-600 mt-3">{subject.description}</p>
            )}

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 text-sm">
              <span className="flex items-center gap-1.5 text-gray-600">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <span className="font-medium">{subject.postsCount}</span> posts
              </span>
              <span className="flex items-center gap-1.5 text-gray-600">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="font-medium">{subject.documentsCount}</span> documents
              </span>
              <span className="flex items-center gap-1.5 text-gray-600">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="font-medium">{subject.membersCount}</span> membres
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="shrink-0">
            {subject.isJoined ? (
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Membre
                </span>
                {onLeave && (
                  <button
                    onClick={onLeave}
                    disabled={isLoading}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                      "border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    <LogOut className="w-4 h-4" />
                    {isLeaving ? "..." : "Quitter"}
                  </button>
                )}
              </div>
            ) : (
              onJoin && (
                <button
                  onClick={onJoin}
                  disabled={isLoading}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    "bg-primary-500 text-white hover:bg-primary-600",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {isJoining ? "..." : "Rejoindre cette matière"}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
