"use client";

import { useAuthStore } from "@/stores/authStore";

/**
 * Dashboard page - placeholder for Phase 3
 */
export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Bienvenue, {user?.firstName} !
        </h1>
        <p className="text-gray-600 mb-6">
          Ton tableau de bord Yatalko. Cette page sera complétée dans la Phase 3.
        </p>

        {/* User Info Card */}
        <div className="bg-gray-50 rounded-lg p-6">
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
    </div>
  );
}
