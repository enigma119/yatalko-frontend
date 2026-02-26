"use client";

import { ProtectedRoute } from "@/components/auth";

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
        {/* TODO: Add app header/navigation in Phase 3 */}
        <main>{children}</main>
      </div>
    </ProtectedRoute>
  );
}
