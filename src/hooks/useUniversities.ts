import { useQuery } from "@tanstack/react-query";
import { getUniversities, getPrograms } from "@/services/universities";

/**
 * Hook to fetch all universities
 */
export function useUniversities() {
  return useQuery({
    queryKey: ["universities"],
    queryFn: getUniversities,
    staleTime: 5 * 60 * 1000, // 5 minutes - universities don't change often
  });
}

/**
 * Hook to fetch programs for a university
 */
export function usePrograms(universityId?: string) {
  return useQuery({
    queryKey: ["programs", universityId],
    queryFn: () => getPrograms(universityId!),
    enabled: !!universityId,
    staleTime: 5 * 60 * 1000,
  });
}
