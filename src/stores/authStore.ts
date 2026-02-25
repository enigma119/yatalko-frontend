import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";
import type { User } from "@/types";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  ACCESS_TOKEN_EXPIRY,
} from "@/lib/constants";

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (tokens: AuthTokens, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  updatePoints: (points: number) => void;
  setLoading: (isLoading: boolean) => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      login: (tokens: AuthTokens, user: User) => {
        // Store tokens in cookies (httpOnly not possible client-side)
        Cookies.set(ACCESS_TOKEN_KEY, tokens.accessToken, {
          expires: ACCESS_TOKEN_EXPIRY,
          sameSite: "strict",
        });
        Cookies.set(REFRESH_TOKEN_KEY, tokens.refreshToken, {
          expires: 7, // 7 days
          sameSite: "strict",
        });

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        // Clear tokens
        Cookies.remove(ACCESS_TOKEN_KEY);
        Cookies.remove(REFRESH_TOKEN_KEY);

        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });

        // Redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      },

      setUser: (user: User) => {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates },
          });
        }
      },

      updatePoints: (points: number) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, points },
          });
        }
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      hydrate: () => {
        // Check if token exists on mount
        const hasToken = !!Cookies.get(ACCESS_TOKEN_KEY);
        if (!hasToken) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } else {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "yatalko-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Helper hooks
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useIsAdmin = () =>
  useAuthStore((state) => state.user?.role === "ADMIN");
export const useIsAmbassador = () =>
  useAuthStore(
    (state) =>
      state.user?.role === "AMBASSADOR" ||
      state.user?.role === "CAMPUS_LEAD" ||
      state.user?.role === "ADMIN"
  );
export const useIsCampusLead = () =>
  useAuthStore(
    (state) =>
      state.user?.role === "CAMPUS_LEAD" || state.user?.role === "ADMIN"
  );
