"use client";

import { ProtectedRoute } from "@/components/auth";
import { AppHeader } from "@/components/app";

interface AppLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout for authenticated app routes
 * Wraps all protected routes with authentication check
 */
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <ProtectedRoute requireVerified={false}>
      <div className="min-h-screen bg-gray-50">
        <AppHeader />
        <main>{children}</main>
      </div>
    </ProtectedRoute>
  );
}
