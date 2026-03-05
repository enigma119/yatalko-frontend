"use client";

import Link from "next/link";
import { BookOpen, Users, FileText, MessageSquare, ArrowRight, Plus } from "lucide-react";
import { useMySubjects } from "@/hooks";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Subject } from "@/types/entities";

function SubjectItem({ subject }: { subject: Subject }) {
  return (
    <Link
      href={ROUTES.SUBJECT_DETAIL(subject.id)}
      className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
    >
      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
        <BookOpen className="w-6 h-6 text-primary-600" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate group-hover:text-primary-600 transition-colors">
          {subject.name}
        </h3>
        <p className="text-sm text-gray-500">
          {subject.code} • {subject.level}
        </p>
      </div>
      <div className="hidden sm:flex items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <MessageSquare className="w-4 h-4" />
          {subject.postsCount}
        </span>
        <span className="flex items-center gap-1">
          <FileText className="w-4 h-4" />
          {subject.documentsCount}
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          {subject.membersCount}
        </span>
      </div>
      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
    </Link>
  );
}

function SubjectSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 animate-pulse">
      <div className="w-12 h-12 bg-gray-200 rounded-lg" />
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-24" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <BookOpen className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="font-medium text-gray-900 mb-1">Aucune matière rejointe</h3>
      <p className="text-sm text-gray-500 mb-4">
        Rejoins des matières pour accéder aux discussions et documents.
      </p>
      <Link
        href={ROUTES.SUBJECTS}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
      >
        <Plus className="w-4 h-4" />
        Explorer les matières
      </Link>
    </div>
  );
}

export default function MySubjectsCard() {
  const { data: subjects, isLoading, error } = useMySubjects();

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">Mes matières</h2>
        <Link
          href={ROUTES.SUBJECTS}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
        >
          Voir tout
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Content */}
      <div className="divide-y divide-gray-100">
        {isLoading ? (
          <>
            <SubjectSkeleton />
            <SubjectSkeleton />
            <SubjectSkeleton />
          </>
        ) : error ? (
          <div className="p-6 text-center text-red-500">
            Erreur lors du chargement des matières
          </div>
        ) : subjects && subjects.length > 0 ? (
          subjects.slice(0, 5).map((subject) => (
            <SubjectItem key={subject.id} subject={subject} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Footer - Show more link if more than 5 subjects */}
      {subjects && subjects.length > 5 && (
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl">
          <Link
            href={ROUTES.SUBJECTS}
            className="text-sm text-gray-600 hover:text-primary-600 font-medium"
          >
            +{subjects.length - 5} autres matières
          </Link>
        </div>
      )}
    </div>
  );
}
