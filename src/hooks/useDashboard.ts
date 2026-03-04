import { useQuery } from "@tanstack/react-query";
import { getUserActivity, getUserStats } from "@/services/users";

/**
 * Hook to fetch user's recent activity
 */
export function useUserActivity(limit: number = 5) {
  return useQuery({
    queryKey: ["user", "activity", limit],
    queryFn: () => getUserActivity(limit),
  });
}

/**
 * Hook to fetch user stats for dashboard
 */
export function useUserStats() {
  return useQuery({
    queryKey: ["user", "stats"],
    queryFn: getUserStats,
  });
}
