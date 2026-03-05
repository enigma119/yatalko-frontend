"use client";

import { useAuthStore } from "@/stores/authStore";

/**
 * Dashboard page - placeholder pour Phase 3 T3.2
 */
export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Bienvenue, {user?.firstName} !
        </h1>
        <p className="text-gray-600">
          Ton tableau de bord Yatalko. Cette page sera complétée dans le ticket T3.2.
        </p>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Tes informations
        </h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-gray-500">Nom complet</dt>
            <dd className="font-medium text-gray-900">
              {user?.firstName} {user?.lastName}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500">Email</dt>
            <dd className="font-medium text-gray-900">{user?.email}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Université</dt>
            <dd className="font-medium text-gray-900">
              {user?.universityName || "Non défini"}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500">Filière</dt>
            <dd className="font-medium text-gray-900">
              {user?.programName || "Non défini"}
            </dd>
          </div>
          <div>
            <dt className="text-gray-500">Niveau</dt>
            <dd className="font-medium text-gray-900">{user?.level}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Points</dt>
            <dd className="font-medium text-primary-600">{user?.points || 0} pts</dd>
          </div>
          <div>
            <dt className="text-gray-500">Rôle</dt>
            <dd className="font-medium text-gray-900">{user?.role}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Email vérifié</dt>
            <dd className="font-medium">
              {user?.isVerified ? (
                <span className="text-green-600">Oui</span>
              ) : (
                <span className="text-amber-600">Non</span>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
