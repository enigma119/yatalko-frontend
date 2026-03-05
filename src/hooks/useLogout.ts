"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { logout as logoutApi } from "@/services/auth";
import { clearAuthTokens } from "@/lib/api";
import { ROUTES } from "@/lib/constants";

/**
 * Hook for handling user logout
 * Provides logout function and loading state
 */
export function useLogout() {
  const router = useRouter();
  const { logout: clearStore } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = useCallback(async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      // Call backend to invalidate token (optional - fire and forget)
      await logoutApi();
    } catch {
      // Ignore errors - we'll clear local state anyway
    } finally {
      // Clear tokens from cookies
      clearAuthTokens();

      // Clear auth store (this also redirects to login)
      clearStore();

      // Ensure redirect happens
      router.push(ROUTES.LOGIN);

      setIsLoggingOut(false);
    }
  }, [isLoggingOut, clearStore, router]);

  return { logout, isLoggingOut };
}
