import api from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import type { University, Program } from "@/types";

/**
 * Get all universities
 */
export async function getUniversities(): Promise<University[]> {
  const response = await api.get<University[]>(API_ENDPOINTS.UNIVERSITIES);
  return response.data;
}

/**
 * Get programs for a university
 */
export async function getPrograms(universityId: number): Promise<Program[]> {
  const response = await api.get<Program[]>(API_ENDPOINTS.PROGRAMS(universityId));
  return response.data;
}
