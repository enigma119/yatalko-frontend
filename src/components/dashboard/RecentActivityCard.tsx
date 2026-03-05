"use client";

import Link from "next/link";
import {
  MessageSquare,
  FileText,
  Award,
  Trophy,
  CheckCircle,
  ArrowRight,
  Activity,
} from "lucide-react";
import { useUserActivity } from "@/hooks";
import { ROUTES } from "@/lib/constants";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import type { UserActivity } from "@/types/api";

function getActivityIcon(type: UserActivity["type"]) {
  switch (type) {
    case "POST_CREATED":
      return <MessageSquare className="w-4 h-4" />;
    case "REPLY_CREATED":
      return <CheckCircle className="w-4 h-4" />;
    case "DOCUMENT_UPLOADED":
      return <FileText className="w-4 h-4" />;
    case "BADGE_EARNED":
      return <Award className="w-4 h-4" />;
    case "POINTS_EARNED":
      return <Trophy className="w-4 h-4" />;
    default:
      return <Activity className="w-4 h-4" />;
  }
}

function getActivityColor(type: UserActivity["type"]) {
  switch (type) {
    case "POST_CREATED":
      return "bg-blue-100 text-blue-600";
    case "REPLY_CREATED":
      return "bg-green-100 text-green-600";
    case "DOCUMENT_UPLOADED":
      return "bg-primary-100 text-primary-600";
    case "BADGE_EARNED":
      return "bg-purple-100 text-purple-600";
    case "POINTS_EARNED":
      return "bg-accent-100 text-accent-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

function getActivityLink(activity: UserActivity): string | null {
  if (!activity.resourceId) return null;

  switch (activity.resourceType) {
    case "POST":
      return ROUTES.POST_DETAIL(activity.resourceId);
    case "DOCUMENT":
      return ROUTES.DOCUMENT_DETAIL(activity.resourceId);
    default:
      return null;
  }
}

function ActivityItem({ activity }: { activity: UserActivity }) {
  const link = getActivityLink(activity);
  const timeAgo = formatDistanceToNow(new Date(activity.createdAt), {
    addSuffix: true,
    locale: fr,
  });

  const Content = (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
          getActivityColor(activity.type)
        )}
      >
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 font-medium truncate">
          {activity.title}
        </p>
        {activity.description && (
          <p className="text-xs text-gray-500 truncate">{activity.description}</p>
        )}
        <p className="text-xs text-gray-400 mt-1">{timeAgo}</p>
      </div>
      {activity.points && activity.points > 0 && (
        <span className="text-xs font-medium text-accent-600 bg-accent-50 px-2 py-1 rounded-full">
          +{activity.points} pts
        </span>
      )}
    </div>
  );

  if (link) {
    return <Link href={link}>{Content}</Link>;
  }

  return Content;
}

function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-3 p-3 animate-pulse">
      <div className="w-8 h-8 bg-gray-200 rounded-full" />
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-48 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-24" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-8">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <Activity className="w-6 h-6 text-gray-400" />
      </div>
      <p className="text-sm text-gray-500">
        Aucune activité récente
      </p>
      <p className="text-xs text-gray-400 mt-1">
        Commence à participer pour voir ton activité ici !
      </p>
    </div>
  );
}

export default function RecentActivityCard() {
  const { data: activities, isLoading, error } = useUserActivity(5);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">Activité récente</h2>
        <Link
          href={ROUTES.PROFILE}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
        >
          Historique
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Content */}
      <div className="p-3">
        {isLoading ? (
          <div className="space-y-2">
            <ActivitySkeleton />
            <ActivitySkeleton />
            <ActivitySkeleton />
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-500 text-sm">
            Erreur lors du chargement
          </div>
        ) : activities && activities.length > 0 ? (
          <div className="space-y-1">
            {activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
