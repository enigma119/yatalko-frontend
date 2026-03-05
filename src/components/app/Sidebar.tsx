"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  FileText,
  Trophy,
  Bell,
  User,
  Settings,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const mainNavigation = [
  { name: "Dashboard", href: ROUTES.DASHBOARD, icon: Home },
  { name: "Discussions", href: ROUTES.POSTS, icon: MessageSquare },
  { name: "Matières", href: ROUTES.SUBJECTS, icon: BookOpen },
  { name: "Documents", href: ROUTES.DOCUMENTS, icon: FileText },
  { name: "Classement", href: ROUTES.LEADERBOARD, icon: Trophy },
];

const secondaryNavigation = [
  { name: "Notifications", href: ROUTES.NOTIFICATIONS, icon: Bell },
  { name: "Mon profil", href: ROUTES.PROFILE, icon: User },
  { name: "Paramètres", href: ROUTES.SETTINGS, icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const isActive = (href: string) => {
    if (href === ROUTES.DASHBOARD) {
      return pathname === href || pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white lg:pt-16">
      <div className="flex flex-col flex-1 overflow-y-auto pt-6 pb-4">
        {/* User Info Card */}
        <div className="px-4 mb-6">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm text-white/80 truncate">{user?.level}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-accent-400" />
                <span className="font-bold">{user?.points || 0}</span>
                <span className="text-sm text-white/80">pts</span>
              </div>
              <div className="text-sm text-white/80">
                {user?.badges?.length || 0} badges
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Navigation
          </p>
          {mainNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                isActive(item.href)
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5",
                  isActive(item.href) ? "text-primary-600" : "text-gray-400"
                )}
              />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Secondary Navigation */}
        <nav className="px-3 mt-auto space-y-1 border-t border-gray-100 pt-4">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Mon compte
          </p>
          {secondaryNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                isActive(item.href)
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5",
                  isActive(item.href) ? "text-primary-600" : "text-gray-400"
                )}
              />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Help Link */}
        <div className="px-3 mt-4 pb-2">
          <Link
            href="/help"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
            Aide & Support
          </Link>
        </div>
      </div>
    </aside>
  );
}
