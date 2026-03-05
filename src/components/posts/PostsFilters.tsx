"use client";

import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { POST_TYPES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { PostType } from "@/types/entities";

interface PostsFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  type: PostType | "";
  onTypeChange: (value: PostType | "") => void;
  sort: string;
  onSortChange: (value: string) => void;
  className?: string;
}

const postTypeOptions = [
  { value: "", label: "Tous les types" },
  { value: POST_TYPES.QUESTION, label: "Questions" },
  { value: POST_TYPES.DISCUSSION, label: "Discussions" },
  { value: POST_TYPES.ANNOUNCEMENT, label: "Annonces" },
];

const sortOptions = [
  { value: "createdAt", label: "Plus récents" },
  { value: "upvotesCount", label: "Plus votés" },
  { value: "repliesCount", label: "Plus discutés" },
  { value: "viewsCount", label: "Plus vus" },
];

export default function PostsFilters({
  search,
  onSearchChange,
  type,
  onTypeChange,
  sort,
  onSortChange,
  className,
}: PostsFiltersProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher dans les discussions..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Type Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={type}
            onChange={(e) => onTypeChange(e.target.value as PostType | "")}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          >
            {postTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-400" />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Type Tabs (mobile-friendly) */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {postTypeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onTypeChange(option.value as PostType | "")}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
              type === option.value
                ? "bg-primary-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
