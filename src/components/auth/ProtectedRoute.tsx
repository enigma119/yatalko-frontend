"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { ROUTES } from "@/lib/constants";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireVerified?: boolean;
}

/**
 * Client-side route protection wrapper
 * Use this as a backup to middleware for client-side navigation
 */
export default function ProtectedRoute({
  children,
  requireVerified = false,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuthStore();

  useEffect(() => {
    if (!isLoading) {
      // Redirect to login if not authenticated
      if (!isAuthenticated) {
        const currentPath = window.location.pathname;
        router.push(`${ROUTES.LOGIN}?redirect=${encodeURIComponent(currentPath)}`);
        return;
      }

      // Redirect to verify email if email not verified (when required)
      if (requireVerified && user && !user.isVerified) {
        router.push(ROUTES.VERIFY_EMAIL);
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, requireVerified, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Don't render if verification required but not verified
  if (requireVerified && user && !user.isVerified) {
    return null;
  }

  return <>{children}</>;
}
