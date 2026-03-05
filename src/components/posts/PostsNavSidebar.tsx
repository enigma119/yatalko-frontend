"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  TrendingUp,
  HelpCircle,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useMySubjects } from "@/hooks";
import type { Subject } from "@/types/entities";

type FeedType = "home" | "popular" | "unanswered";

interface PostsNavSidebarProps {
  currentFeed: FeedType;
  onFeedChange: (feed: FeedType) => void;
}

const feedOptions = [
  {
    value: "home" as FeedType,
    label: "Mon Feed",
    icon: Home,
    description: "Posts de mes matières",
  },
  {
    value: "popular" as FeedType,
    label: "Populaire",
    icon: TrendingUp,
    description: "Posts tendances",
  },
  {
    value: "unanswered" as FeedType,
    label: "Sans réponse",
    icon: HelpCircle,
    description: "Questions en attente",
  },
];

function SubjectItem({ subject }: { subject: Subject }) {
  return (
    <Link
      href={ROUTES.SUBJECT_DETAIL(subject.id)}
      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-medium">
        {subject.name.charAt(0)}
      </span>
      <span className="truncate">{subject.name}</span>
    </Link>
  );
}

export default function PostsNavSidebar({
  currentFeed,
  onFeedChange,
}: PostsNavSidebarProps) {
  const [showAllSubjects, setShowAllSubjects] = useState(false);
  const { data: subjects, isLoading } = useMySubjects();

  const displayedSubjects = showAllSubjects
    ? subjects
    : subjects?.slice(0, 5);

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <div className="sticky top-20 space-y-6">
        {/* Feed Navigation */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-2">
            {feedOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onFeedChange(option.value)}
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-colors text-left",
                  currentFeed === option.value
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <option.icon
                  className={cn(
                    "w-5 h-5",
                    currentFeed === option.value
                      ? "text-primary-600"
                      : "text-gray-400"
                  )}
                />
                <div>
                  <p className="font-medium text-sm">{option.label}</p>
                  <p className="text-xs text-gray-400">{option.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* My Subjects */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-400" />
              <h3 className="font-semibold text-gray-900 text-sm">
                Mes matières
              </h3>
            </div>
          </div>

          <div className="p-2">
            {isLoading ? (
              <div className="space-y-2 px-3 py-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-100 rounded animate-pulse"
                  />
                ))}
              </div>
            ) : subjects && subjects.length > 0 ? (
              <>
                {displayedSubjects?.map((subject) => (
                  <SubjectItem key={subject.id} subject={subject} />
                ))}
                {subjects.length > 5 && (
                  <button
                    onClick={() => setShowAllSubjects(!showAllSubjects)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    {showAllSubjects ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Voir moins
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Voir {subjects.length - 5} de plus
                      </>
                    )}
                  </button>
                )}
              </>
            ) : (
              <div className="px-3 py-4 text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Aucune matière rejointe
                </p>
                <Link
                  href={ROUTES.SUBJECTS}
                  className="text-sm text-primary-600 hover:underline"
                >
                  Explorer les matières
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            <Link href="#" className="hover:underline">
              À propos
            </Link>
            <span>•</span>
            <Link href="#" className="hover:underline">
              Aide
            </Link>
            <span>•</span>
            <Link href="#" className="hover:underline">
              Conditions
            </Link>
            <span>•</span>
            <Link href="#" className="hover:underline">
              Confidentialité
            </Link>
          </div>
          <p className="text-xs text-gray-400 mt-2">© 2024 Yatalko</p>
        </div>
      </div>
    </aside>
  );
}
