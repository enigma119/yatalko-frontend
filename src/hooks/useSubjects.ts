import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSubjects,
  getMySubjects,
  getSubject,
  joinSubject,
  leaveSubject,
  type SubjectsFilters,
} from "@/services/subjects";

/**
 * Hook to fetch subjects with filters
 */
export function useSubjects(filters?: SubjectsFilters) {
  return useQuery({
    queryKey: ["subjects", filters],
    queryFn: () => getSubjects(filters),
  });
}

/**
 * Hook to fetch current user's joined subjects
 */
export function useMySubjects() {
  return useQuery({
    queryKey: ["subjects", "my-subjects"],
    queryFn: getMySubjects,
  });
}

/**
 * Hook to fetch a single subject
 */
export function useSubject(id: string) {
  return useQuery({
    queryKey: ["subjects", id],
    queryFn: () => getSubject(id),
    enabled: !!id,
  });
}

/**
 * Hook to join a subject
 */
export function useJoinSubject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinSubject,
    onSuccess: () => {
      // Invalidate subjects queries to refetch data
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
}

/**
 * Hook to leave a subject
 */
export function useLeaveSubject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
}
