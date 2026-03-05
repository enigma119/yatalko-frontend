"use client";

import { useState, useMemo } from "react";
import { BookOpen, Loader2 } from "lucide-react";
import { useSubjects, useJoinSubject, useLeaveSubject } from "@/hooks";
import { SubjectCard, SubjectsFilters, type FiltersState } from "@/components/subjects";
import { useDebounce } from "@/hooks/useDebounce";

function SubjectCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-lg" />
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="h-4 bg-gray-200 rounded w-16" />
        <div className="h-4 bg-gray-200 rounded w-16" />
        <div className="h-4 bg-gray-200 rounded w-12" />
      </div>
    </div>
  );
}

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <BookOpen className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {hasFilters ? "Aucune matière trouvée" : "Aucune matière disponible"}
      </h3>
      <p className="text-gray-500 max-w-sm mx-auto">
        {hasFilters
          ? "Essaie de modifier tes filtres pour trouver d'autres matières."
          : "Les matières seront bientôt disponibles."}
      </p>
    </div>
  );
}

export default function SubjectsPage() {
  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    universityId: "",
    programId: "",
    level: "",
    semester: "",
  });

  // Debounce search to avoid too many API calls
  const debouncedSearch = useDebounce(filters.search, 300);

  // Build API filters
  const apiFilters = useMemo(
    () => ({
      search: debouncedSearch || undefined,
      universityId: filters.universityId || undefined,
      programId: filters.programId || undefined,
      level: filters.level || undefined,
      semester: filters.semester || undefined,
    }),
    [debouncedSearch, filters.universityId, filters.programId, filters.level, filters.semester]
  );

  const { data, isLoading, error } = useSubjects(apiFilters);
  const joinMutation = useJoinSubject();
  const leaveMutation = useLeaveSubject();

  const subjects = data?.content || [];
  const hasFilters = !!(
    filters.search ||
    filters.universityId ||
    filters.programId ||
    filters.level ||
    filters.semester
  );

  const handleJoin = (id: string) => {
    joinMutation.mutate(id);
  };

  const handleLeave = (id: string) => {
    leaveMutation.mutate(id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Matières</h1>
        <p className="text-gray-600 mt-1">
          Explore et rejoins les matières de ton programme
        </p>
      </div>

      {/* Filters */}
      <SubjectsFilters filters={filters} onFiltersChange={setFilters} />

      {/* Results Info */}
      {!isLoading && subjects.length > 0 && (
        <p className="text-sm text-gray-500">
          {data?.totalElements || subjects.length} matière{subjects.length > 1 ? "s" : ""} trouvée{subjects.length > 1 ? "s" : ""}
        </p>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600">
            Une erreur est survenue lors du chargement des matières.
          </p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <SubjectCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Subjects Grid */}
      {!isLoading && !error && subjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onJoin={handleJoin}
              onLeave={handleLeave}
              isJoining={joinMutation.isPending && joinMutation.variables === subject.id}
              isLeaving={leaveMutation.isPending && leaveMutation.variables === subject.id}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && subjects.length === 0 && (
        <EmptyState hasFilters={hasFilters} />
      )}

      {/* Pagination Info */}
      {data && data.totalPages > 1 && (
        <div className="flex justify-center">
          <p className="text-sm text-gray-500">
            Page {data.page + 1} sur {data.totalPages}
          </p>
        </div>
      )}
    </div>
  );
}
