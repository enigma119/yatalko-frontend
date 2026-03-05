"use client";

import { useState, useEffect } from "react";
import { Search, X, Filter } from "lucide-react";
import { useUniversities, usePrograms } from "@/hooks/useUniversities";
import { ACADEMIC_LEVELS, SEMESTERS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface FiltersState {
  search: string;
  universityId: string;
  programId: string;
  level: string;
  semester: string;
}

interface SubjectsFiltersProps {
  filters: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
}

export default function SubjectsFilters({
  filters,
  onFiltersChange,
}: SubjectsFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { data: universities, isLoading: loadingUniversities } = useUniversities();
  const { data: programs, isLoading: loadingPrograms } = usePrograms(
    filters.universityId || undefined
  );

  // Reset programId when universityId changes
  useEffect(() => {
    if (filters.programId && programs) {
      const programExists = programs.some((p) => p.id === filters.programId);
      if (!programExists) {
        onFiltersChange({ ...filters, programId: "" });
      }
    }
  }, [filters.universityId, programs]);

  const handleChange = (key: keyof FiltersState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      universityId: "",
      programId: "",
      level: "",
      semester: "",
    });
  };

  const hasActiveFilters =
    filters.universityId ||
    filters.programId ||
    filters.level ||
    filters.semester;

  return (
    <div className="space-y-4">
      {/* Search + Mobile Filter Toggle */}
      <div className="flex gap-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une matière..."
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {filters.search && (
            <button
              onClick={() => handleChange("search", "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className={cn(
            "lg:hidden flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-colors",
            hasActiveFilters
              ? "bg-primary-50 border-primary-200 text-primary-700"
              : "bg-white border-gray-200 text-gray-700"
          )}
        >
          <Filter className="w-5 h-5" />
          <span className="sr-only sm:not-sr-only">Filtres</span>
          {hasActiveFilters && (
            <span className="w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
              {[filters.universityId, filters.programId, filters.level, filters.semester].filter(Boolean).length}
            </span>
          )}
        </button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:flex items-center gap-3 flex-wrap">
        {/* University */}
        <select
          value={filters.universityId}
          onChange={(e) => handleChange("universityId", e.target.value)}
          disabled={loadingUniversities}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
        >
          <option value="">Toutes les universités</option>
          {universities?.map((uni) => (
            <option key={uni.id} value={uni.id}>
              {uni.name}
            </option>
          ))}
        </select>

        {/* Program */}
        <select
          value={filters.programId}
          onChange={(e) => handleChange("programId", e.target.value)}
          disabled={!filters.universityId || loadingPrograms}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm disabled:opacity-50"
        >
          <option value="">Toutes les filières</option>
          {programs?.map((prog) => (
            <option key={prog.id} value={prog.id}>
              {prog.name}
            </option>
          ))}
        </select>

        {/* Level */}
        <select
          value={filters.level}
          onChange={(e) => handleChange("level", e.target.value)}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
        >
          <option value="">Tous les niveaux</option>
          {ACADEMIC_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>

        {/* Semester */}
        <select
          value={filters.semester}
          onChange={(e) => handleChange("semester", e.target.value)}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
        >
          <option value="">Tous les semestres</option>
          {SEMESTERS.map((sem) => (
            <option key={sem} value={sem}>
              {sem}
            </option>
          ))}
        </select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <X className="w-4 h-4" />
            Effacer
          </button>
        )}
      </div>

      {/* Mobile Filters Panel */}
      {showMobileFilters && (
        <div className="lg:hidden bg-white border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Filtres</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Tout effacer
              </button>
            )}
          </div>

          <div className="space-y-3">
            {/* University */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Université
              </label>
              <select
                value={filters.universityId}
                onChange={(e) => handleChange("universityId", e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              >
                <option value="">Toutes les universités</option>
                {universities?.map((uni) => (
                  <option key={uni.id} value={uni.id}>
                    {uni.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Program */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filière
              </label>
              <select
                value={filters.programId}
                onChange={(e) => handleChange("programId", e.target.value)}
                disabled={!filters.universityId}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm disabled:opacity-50"
              >
                <option value="">Toutes les filières</option>
                {programs?.map((prog) => (
                  <option key={prog.id} value={prog.id}>
                    {prog.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Level & Semester Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Niveau
                </label>
                <select
                  value={filters.level}
                  onChange={(e) => handleChange("level", e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                >
                  <option value="">Tous</option>
                  {ACADEMIC_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Semestre
                </label>
                <select
                  value={filters.semester}
                  onChange={(e) => handleChange("semester", e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                >
                  <option value="">Tous</option>
                  {SEMESTERS.map((sem) => (
                    <option key={sem} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowMobileFilters(false)}
            className="w-full py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
          >
            Appliquer
          </button>
        </div>
      )}
    </div>
  );
}
