import api from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import type { User } from "@/types";
import type { UpdateProfileRequest } from "@/types/api";

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
export async function getUserById(id: number): Promise<User> {
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
