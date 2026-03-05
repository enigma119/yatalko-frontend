import { useQuery } from "@tanstack/react-query";
import { globalSearch, type SearchResults } from "@/services/search";

/**
 * Hook for global search with debounced query
 */
export function useGlobalSearch(query: string, enabled: boolean = true) {
  return useQuery<SearchResults>({
    queryKey: ["search", query],
    queryFn: () => globalSearch({ query, limit: 5 }),
    enabled: enabled && query.length >= 2,
    staleTime: 30 * 1000, // 30 seconds
  });
}
