"use client";

import { ProtectedRoute } from "@/components/auth";
import { AppHeader, Sidebar, BottomNav } from "@/components/app";

interface AppLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout for authenticated app routes
 * - Header fixe en haut
 * - Sidebar desktop (gauche, hidden mobile)
 * - BottomNav mobile (fixe en bas, hidden desktop)
 * - Contenu principal avec padding adaptatif
 */
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <ProtectedRoute requireVerified={false}>
      <div className="min-h-screen bg-gray-50">
        {/* Header fixe */}
        <AppHeader />

        {/* Sidebar desktop */}
        <Sidebar />

        {/* Main content - décalé pour sidebar sur desktop */}
        <main className="lg:pl-64 pt-0 pb-20 lg:pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>

        {/* Bottom navigation mobile */}
        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}
