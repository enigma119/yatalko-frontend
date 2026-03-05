"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Bell,
  MessageSquare,
  FileText,
  Award,
  Trophy,
  CheckCircle,
  Pin,
  ArrowUp,
  Check,
  Loader2,
} from "lucide-react";
import {
  useNotifications,
  useUnreadCount,
  useMarkAsRead,
  useMarkAllAsRead,
} from "@/hooks/useNotifications";
import { ROUTES } from "@/lib/constants";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import type { Notification, NotificationType } from "@/types/entities";

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "NEW_REPLY":
      return <MessageSquare className="w-4 h-4" />;
    case "REPLY_ACCEPTED":
      return <CheckCircle className="w-4 h-4" />;
    case "NEW_DOCUMENT":
      return <FileText className="w-4 h-4" />;
    case "DOCUMENT_VERIFIED":
      return <CheckCircle className="w-4 h-4" />;
    case "POST_PINNED":
      return <Pin className="w-4 h-4" />;
    case "BADGE_EARNED":
      return <Award className="w-4 h-4" />;
    case "UPVOTE_RECEIVED":
      return <ArrowUp className="w-4 h-4" />;
    case "POINTS_EARNED":
      return <Trophy className="w-4 h-4" />;
    default:
      return <Bell className="w-4 h-4" />;
  }
}

function getNotificationColor(type: NotificationType) {
  switch (type) {
    case "NEW_REPLY":
    case "REPLY_ACCEPTED":
      return "bg-blue-100 text-blue-600";
    case "NEW_DOCUMENT":
    case "DOCUMENT_VERIFIED":
      return "bg-primary-100 text-primary-600";
    case "POST_PINNED":
      return "bg-amber-100 text-amber-600";
    case "BADGE_EARNED":
      return "bg-purple-100 text-purple-600";
    case "UPVOTE_RECEIVED":
    case "POINTS_EARNED":
      return "bg-accent-100 text-accent-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

function getNotificationLink(notification: Notification): string | null {
  const data = notification.data as Record<string, string> | undefined;

  switch (notification.type) {
    case "NEW_REPLY":
    case "REPLY_ACCEPTED":
    case "POST_PINNED":
      return data?.postId ? ROUTES.POST_DETAIL(data.postId) : null;
    case "NEW_DOCUMENT":
    case "DOCUMENT_VERIFIED":
      return data?.documentId ? ROUTES.DOCUMENT_DETAIL(data.documentId) : null;
    case "BADGE_EARNED":
      return ROUTES.PROFILE;
    default:
      return null;
  }
}

function NotificationItem({
  notification,
  onRead,
}: {
  notification: Notification;
  onRead: (id: string) => void;
}) {
  const link = getNotificationLink(notification);
  const timeAgo = formatDistanceToNow(new Date(notification.createdAt), {
    addSuffix: true,
    locale: fr,
  });

  const handleClick = () => {
    if (!notification.isRead) {
      onRead(notification.id);
    }
  };

  const Content = (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer",
        notification.isRead
          ? "hover:bg-gray-50"
          : "bg-primary-50/50 hover:bg-primary-50"
      )}
      onClick={handleClick}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
          getNotificationColor(notification.type)
        )}
      >
        {getNotificationIcon(notification.type)}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm line-clamp-2",
            notification.isRead ? "text-gray-600" : "text-gray-900 font-medium"
          )}
        >
          {notification.message}
        </p>
        <p className="text-xs text-gray-400 mt-1">{timeAgo}</p>
      </div>
      {!notification.isRead && (
        <div className="w-2 h-2 bg-primary-500 rounded-full shrink-0 mt-2" />
      )}
    </div>
  );

  if (link) {
    return <Link href={link}>{Content}</Link>;
  }

  return Content;
}

function NotificationSkeleton() {
  return (
    <div className="flex items-start gap-3 p-3 animate-pulse">
      <div className="w-8 h-8 bg-gray-200 rounded-full" />
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
        <div className="h-3 bg-gray-200 rounded w-20" />
      </div>
    </div>
  );
}

export default function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: notifications, isLoading } = useNotifications(10);
  const { data: unreadCount = 0 } = useUnreadCount();
  const markAsReadMutation = useMarkAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();

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

  const handleMarkAsRead = (id: string) => {
    markAsReadMutation.mutate(id);
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center px-1">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                disabled={markAllAsReadMutation.isPending}
                className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 disabled:opacity-50"
              >
                {markAllAsReadMutation.isPending ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Check className="w-3 h-3" />
                )}
                Tout marquer lu
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-[400px] overflow-y-auto">
            {isLoading ? (
              <div className="p-2">
                <NotificationSkeleton />
                <NotificationSkeleton />
                <NotificationSkeleton />
              </div>
            ) : notifications && notifications.length > 0 ? (
              <div className="p-2 space-y-1">
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={handleMarkAsRead}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bell className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-500">Aucune notification</p>
                <p className="text-sm text-gray-400 mt-1">
                  Tu seras notifié des nouvelles activités ici
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications && notifications.length > 0 && (
            <div className="border-t border-gray-100 p-2">
              <Link
                href={ROUTES.NOTIFICATIONS}
                onClick={() => setIsOpen(false)}
                className="block text-center py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                Voir toutes les notifications
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
