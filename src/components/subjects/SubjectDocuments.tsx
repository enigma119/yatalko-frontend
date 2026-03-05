"use client";

import Link from "next/link";
import {
  FileText,
  Download,
  CheckCircle,
  Upload,
  ArrowUp,
  Calendar,
  User,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import type { Document } from "@/types/entities";

interface SubjectDocumentsProps {
  subjectId: string;
  documents?: Document[];
  isLoading?: boolean;
  canUpload?: boolean;
  onUpload?: () => void;
}

function getCategoryLabel(category: Document["category"]) {
  const labels: Record<Document["category"], string> = {
    EXAM: "Examen",
    COURSE: "Cours",
    EXERCISE: "Exercice",
    PROJECT: "Projet",
    OTHER: "Autre",
  };
  return labels[category];
}

function getCategoryColor(category: Document["category"]) {
  const colors: Record<Document["category"], string> = {
    EXAM: "bg-red-100 text-red-700",
    COURSE: "bg-blue-100 text-blue-700",
    EXERCISE: "bg-green-100 text-green-700",
    PROJECT: "bg-purple-100 text-purple-700",
    OTHER: "bg-gray-100 text-gray-700",
  };
  return colors[category];
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function DocumentItem({ document }: { document: Document }) {
  const timeAgo = formatDistanceToNow(new Date(document.createdAt), {
    addSuffix: true,
    locale: fr,
  });

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
          <FileText className="w-6 h-6 text-gray-500" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={cn(
                "px-2 py-0.5 text-xs font-medium rounded",
                getCategoryColor(document.category)
              )}
            >
              {getCategoryLabel(document.category)}
            </span>
            {document.isVerified && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                <CheckCircle className="w-3 h-3" />
                Vérifié
              </span>
            )}
            {document.year && (
              <span className="text-xs text-gray-500">{document.year}</span>
            )}
          </div>

          <h3 className="font-medium text-gray-900 line-clamp-1">
            {document.title}
          </h3>

          {document.description && (
            <p className="text-sm text-gray-500 line-clamp-1 mt-1">
              {document.description}
            </p>
          )}

          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {document.uploader.firstName}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {timeAgo}
            </span>
            <span>{formatFileSize(document.fileSize)}</span>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <ArrowUp className="w-4 h-4" />
            {document.upvotesCount}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Download className="w-4 h-4" />
            {document.downloadsCount}
          </div>
          <a
            href={document.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <Download className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function DocumentSkeleton() {
  return (
    <div className="p-4 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-lg" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}

function EmptyState({ canUpload, onUpload }: { canUpload?: boolean; onUpload?: () => void }) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FileText className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="font-medium text-gray-900 mb-1">Aucun document</h3>
      <p className="text-sm text-gray-500 mb-4">
        Partage tes cours, anciens sujets ou exercices !
      </p>
      {canUpload && onUpload && (
        <button
          onClick={onUpload}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
        >
          <Upload className="w-4 h-4" />
          Partager un document
        </button>
      )}
    </div>
  );
}

export default function SubjectDocuments({
  subjectId,
  documents = [],
  isLoading,
  canUpload = true,
  onUpload,
}: SubjectDocumentsProps) {
  // Sort by date, verified first
  const sortedDocs = [...documents].sort((a, b) => {
    if (a.isVerified && !b.isVerified) return -1;
    if (!a.isVerified && b.isVerified) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">Documents</h2>
        {canUpload && onUpload && (
          <button
            onClick={onUpload}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
          >
            <Upload className="w-4 h-4" />
            Partager
          </button>
        )}
      </div>

      {/* Content */}
      <div className="divide-y divide-gray-100">
        {isLoading ? (
          <>
            <DocumentSkeleton />
            <DocumentSkeleton />
            <DocumentSkeleton />
          </>
        ) : sortedDocs.length > 0 ? (
          sortedDocs.map((doc) => <DocumentItem key={doc.id} document={doc} />)
        ) : (
          <EmptyState canUpload={canUpload} onUpload={onUpload} />
        )}
      </div>
    </div>
  );
}
