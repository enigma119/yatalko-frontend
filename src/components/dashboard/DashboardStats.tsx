"use client";

import {
  Trophy,
  Award,
  MessageSquare,
  FileText,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  trend?: string;
  color: "primary" | "accent" | "blue" | "purple" | "green" | "rose";
}

function StatCard({ icon, label, value, trend, color }: StatCardProps) {
  const colorClasses = {
    primary: "bg-primary-50 text-primary-600",
    accent: "bg-accent-50 text-accent-600",
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-green-50 text-green-600",
    rose: "bg-rose-50 text-rose-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex items-start gap-4">
      <div
        className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center shrink-0",
          colorClasses[color]
        )}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 truncate">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </p>
        )}
      </div>
    </div>
  );
}

export default function DashboardStats() {
  const { user } = useAuthStore();

  // On utilise les données du user en attendant l'API stats
  const stats = [
    {
      icon: <Trophy className="w-6 h-6" />,
      label: "Points totaux",
      value: user?.points || 0,
      trend: "+12 cette semaine",
      color: "accent" as const,
    },
    {
      icon: <Award className="w-6 h-6" />,
      label: "Badges obtenus",
      value: user?.badges?.length || 0,
      color: "purple" as const,
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      label: "Posts créés",
      value: 0, // Sera rempli par l'API
      color: "blue" as const,
    },
    {
      icon: <FileText className="w-6 h-6" />,
      label: "Documents partagés",
      value: 0, // Sera rempli par l'API
      color: "primary" as const,
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      label: "Réponses acceptées",
      value: 0, // Sera rempli par l'API
      color: "green" as const,
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: "Classement",
      value: "-", // Sera rempli par l'API
      color: "rose" as const,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
