"use client";

import { useAuthStore } from "@/stores/authStore";
import {
  DashboardStats,
  MySubjectsCard,
  RecentActivityCard,
} from "@/components/dashboard";

/**
 * Dashboard page - Vue d'ensemble pour l'utilisateur connecté
 */
export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bonjour, {user?.firstName} !
          </h1>
          <p className="text-gray-600 mt-1">
            Bienvenue sur ton tableau de bord Yatalko
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">
            {user?.universityName} • {user?.programName} • {user?.level}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <DashboardStats />

      {/* Two Column Layout for Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Subjects - Takes 2 columns on desktop */}
        <div className="lg:col-span-2">
          <MySubjectsCard />
        </div>

        {/* Recent Activity - Takes 1 column on desktop */}
        <div className="lg:col-span-1">
          <RecentActivityCard />
        </div>
      </div>
    </div>
  );
}
