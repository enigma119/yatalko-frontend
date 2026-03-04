import api from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants";
import type { Subject } from "@/types/entities";
import type { PaginatedResponse, PaginationParams } from "@/types/api";

export interface SubjectsFilters extends PaginationParams {
  universityId?: string;
  programId?: string;
  level?: string;
  semester?: string;
  search?: string;
}

/**
 * Get all subjects with optional filters
 */
export async function getSubjects(
  filters?: SubjectsFilters
): Promise<PaginatedResponse<Subject>> {
  const params = new URLSearchParams();

  if (filters?.universityId) params.append("universityId", filters.universityId);
  if (filters?.programId) params.append("programId", filters.programId);
  if (filters?.level) params.append("level", filters.level);
  if (filters?.semester) params.append("semester", filters.semester);
  if (filters?.search) params.append("search", filters.search);
  if (filters?.page) params.append("page", String(filters.page));
  if (filters?.size) params.append("size", String(filters.size));

  const response = await api.get<PaginatedResponse<Subject>>(
    `${API_ENDPOINTS.SUBJECTS}?${params.toString()}`
  );
  return response.data;
}

/**
 * Get subjects joined by current user
 */
export async function getMySubjects(): Promise<Subject[]> {
  const response = await api.get<Subject[]>(API_ENDPOINTS.MY_SUBJECTS);
  return response.data;
}

/**
 * Get a single subject by ID
 */
export async function getSubject(id: string): Promise<Subject> {
  const response = await api.get<Subject>(API_ENDPOINTS.SUBJECT(id));
  return response.data;
}

/**
 * Join a subject
 */
export async function joinSubject(id: string): Promise<void> {
  await api.post(API_ENDPOINTS.JOIN_SUBJECT(id));
}

/**
 * Leave a subject
 */
export async function leaveSubject(id: string): Promise<void> {
  await api.post(API_ENDPOINTS.LEAVE_SUBJECT(id));
}
