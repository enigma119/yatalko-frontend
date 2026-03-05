"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuthStore } from "@/stores/authStore";
import { getCurrentUser } from "@/services/users";
import { hasAccessToken } from "@/lib/api";
import type { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Auth Provider - Handles user session initialization and refresh
 * Wraps the app to provide authentication state
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const {
    user,
    isAuthenticated,
    setUser,
    setLoading,
    logout,
    hydrate,
  } = useAuthStore();

  const [isInitialized, setIsInitialized] = useState(false);

  /**
   * Fetch current user from API and update store
   */
  const refreshUser = useCallback(async () => {
    if (!hasAccessToken()) {
      setLoading(false);
      return;
    }

    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      // If fetching user fails (e.g., token expired and refresh failed),
      // logout the user
      console.error("Failed to fetch user:", error);
      logout();
    }
  }, [setUser, setLoading, logout]);

  /**
   * Initialize auth state on mount
   */
  useEffect(() => {
    async function initAuth() {
      // First, hydrate from localStorage
      hydrate();

      // If we have a token, fetch fresh user data
      if (hasAccessToken()) {
        await refreshUser();
      } else {
        setLoading(false);
      }

      setIsInitialized(true);
    }

    initAuth();
  }, [hydrate, refreshUser, setLoading]);

  // Show nothing until initialized to prevent flash
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading: !isInitialized,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
