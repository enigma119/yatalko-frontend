import api from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import type { User } from "@/types";
import type { UpdateProfileRequest, UserActivity, UserStats } from "@/types/api";

/**
 * Get current user profile
 */
export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>(API_ENDPOINTS.ME);
  return response.data;
}

/**
 * Get user by ID
 */
export async function getUserById(id: string): Promise<User> {
  const response = await api.get<User>(API_ENDPOINTS.USER(id));
  return response.data;
}

/**
 * Update current user profile
 */
export async function updateProfile(data: UpdateProfileRequest): Promise<User> {
  const response = await api.patch<User>(API_ENDPOINTS.ME, data);
  return response.data;
}

/**
 * Upload avatar
 */
export async function uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await api.post<{ avatarUrl: string }>(
    `${API_ENDPOINTS.ME}/avatar`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

/**
 * Get user activity (recent actions)
 */
export async function getUserActivity(limit: number = 10): Promise<UserActivity[]> {
  const response = await api.get<UserActivity[]>(
    `${API_ENDPOINTS.USER_ACTIVITY}?limit=${limit}`
  );
  return response.data;
}

/**
 * Get user stats for dashboard
 */
export async function getUserStats(): Promise<UserStats> {
  const response = await api.get<UserStats>(`${API_ENDPOINTS.ME}/stats`);
  return response.data;
}
