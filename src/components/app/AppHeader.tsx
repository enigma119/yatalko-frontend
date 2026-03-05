"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  BookOpen,
  FileText,
  User,
  LogOut,
  Menu,
  X,
  Trophy,
  Settings,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useLogout } from "@/hooks";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import GlobalSearch from "./GlobalSearch";
import NotificationsDropdown from "./NotificationsDropdown";

const navigation = [
  { name: "Dashboard", href: ROUTES.DASHBOARD, icon: Home },
  { name: "Matières", href: ROUTES.SUBJECTS, icon: BookOpen },
  { name: "Documents", href: ROUTES.DOCUMENTS, icon: FileText },
  { name: "Classement", href: ROUTES.LEADERBOARD, icon: Trophy },
];

export default function AppHeader() {
  const { user } = useAuthStore();
  const { logout, isLoggingOut } = useLogout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const userInitials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    : "?";

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href={ROUTES.DASHBOARD}
            className="text-xl font-bold text-primary-600"
          >
            Yatalko
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Global Search */}
          <div className="hidden sm:block flex-1 max-w-md mx-4">
            <GlobalSearch />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Points Badge */}
            <div className="hidden sm:flex items-center gap-1 px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium">
              <Trophy className="w-4 h-4" />
              {user?.points || 0} pts
            </div>

            {/* Notifications */}
            <NotificationsDropdown />

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {userInitials}
                </div>
              </button>

              {/* Dropdown Menu */}
              {profileMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setProfileMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <Link
                        href={ROUTES.PROFILE}
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <User className="w-4 h-4" />
                        Mon profil
                      </Link>
                      <Link
                        href={ROUTES.SETTINGS}
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="w-4 h-4" />
                        Paramètres
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                          logout();
                        }}
                        disabled={isLoggingOut}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        <LogOut className="w-4 h-4" />
                        {isLoggingOut ? "Déconnexion..." : "Se déconnecter"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden border-t border-gray-100 overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-64 py-4" : "max-h-0"
          )}
        >
          <nav className="flex flex-col space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
