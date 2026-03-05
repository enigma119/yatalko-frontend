import api from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import type { Notification } from "@/types/entities";
import type { UnreadCountResponse } from "@/types/api";

/**
 * Get all notifications for current user
 */
export async function getNotifications(limit: number = 20): Promise<Notification[]> {
  const response = await api.get<Notification[]>(API_ENDPOINTS.NOTIFICATIONS, {
    params: { limit },
  });
  return response.data;
}

/**
 * Get unread notifications count
 */
export async function getUnreadCount(): Promise<number> {
  const response = await api.get<UnreadCountResponse>(
    API_ENDPOINTS.NOTIFICATIONS_UNREAD_COUNT
  );
  return response.data.count;
}

/**
 * Mark a notification as read
 */
export async function markAsRead(notificationId: string): Promise<void> {
  await api.post(API_ENDPOINTS.NOTIFICATION_READ(notificationId));
}

/**
 * Mark all notifications as read
 */
export async function markAllAsRead(): Promise<void> {
  await api.post(API_ENDPOINTS.NOTIFICATIONS_READ_ALL);
}
