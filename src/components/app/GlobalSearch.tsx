"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  BookOpen,
  MessageSquare,
  FileText,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useGlobalSearch } from "@/hooks/useSearch";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function GlobalSearch() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);
  const { data, isLoading } = useGlobalSearch(debouncedQuery, isOpen);

  const hasResults =
    data &&
    (data.subjects.length > 0 ||
      data.posts.length > 0 ||
      data.documents.length > 0);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Rechercher..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className={cn(
            "w-full sm:w-64 lg:w-80 pl-9 pr-8 py-2 text-sm",
            "bg-gray-100 border border-transparent rounded-lg",
            "focus:bg-white focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20",
            "placeholder:text-gray-500 transition-all"
          )}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {/* Keyboard shortcut hint */}
        <span className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 items-center gap-0.5 text-xs text-gray-400 pointer-events-none">
          {!query && (
            <>
              <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-500 font-mono">
                ⌘
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-500 font-mono">
                K
              </kbd>
            </>
          )}
        </span>
      </div>

      {/* Results Dropdown */}
      {isOpen && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50 max-h-[70vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-primary-500 animate-spin" />
            </div>
          ) : hasResults ? (
            <div className="divide-y divide-gray-100">
              {/* Subjects */}
              {data.subjects.length > 0 && (
                <div className="p-2">
                  <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase">
                    Matières
                  </p>
                  {data.subjects.map((subject) => (
                    <Link
                      key={subject.id}
                      href={ROUTES.SUBJECT_DETAIL(subject.id)}
                      onClick={handleResultClick}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {subject.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {subject.code} • {subject.level}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Posts */}
              {data.posts.length > 0 && (
                <div className="p-2">
                  <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase">
                    Discussions
                  </p>
                  {data.posts.map((post) => (
                    <Link
                      key={post.id}
                      href={ROUTES.POST_DETAIL(post.id)}
                      onClick={handleResultClick}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {post.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {post.subjectName}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Documents */}
              {data.documents.length > 0 && (
                <div className="p-2">
                  <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase">
                    Documents
                  </p>
                  {data.documents.map((doc) => (
                    <Link
                      key={doc.id}
                      href={ROUTES.DOCUMENT_DETAIL(doc.id)}
                      onClick={handleResultClick}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {doc.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {doc.subjectName}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* View all link */}
              <div className="p-2">
                <button
                  onClick={() => {
                    router.push(`/search?q=${encodeURIComponent(query)}`);
                    handleResultClick();
                  }}
                  className="flex items-center justify-center gap-2 w-full px-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  Voir tous les résultats
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500">Aucun résultat pour "{query}"</p>
              <p className="text-sm text-gray-400 mt-1">
                Essaie avec d'autres mots-clés
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
