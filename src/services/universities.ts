import api from "@/lib/api";
import { API_ENDPOINTS, API_URL } from "@/lib/constants";
import type { University, Program } from "@/types";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

/**
 * Get all universities
 */
export async function getUniversities(): Promise<University[]> {
  const response = await api.get<ApiResponse<University[]>>(API_ENDPOINTS.UNIVERSITIES);
  return response.data.data;
}

/**
 * Get programs for a university
 */
export async function getPrograms(universityId: string): Promise<Program[]> {
  const response = await api.get<ApiResponse<Program[]>>(API_ENDPOINTS.PROGRAMS(universityId));
  return response.data.data;
}
