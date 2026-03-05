"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  BookOpen,
  FileText,
  Menu,
  X,
  Trophy,
  MessageSquare,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import GlobalSearch from "./GlobalSearch";
import NotificationsDropdown from "./NotificationsDropdown";
import ProfileDropdown from "./ProfileDropdown";

const navigation = [
  { name: "Dashboard", href: ROUTES.DASHBOARD, icon: Home },
  { name: "Discussions", href: ROUTES.POSTS, icon: MessageSquare },
  { name: "Matières", href: ROUTES.SUBJECTS, icon: BookOpen },
  { name: "Documents", href: ROUTES.DOCUMENTS, icon: FileText },
  { name: "Classement", href: ROUTES.LEADERBOARD, icon: Trophy },
];

export default function AppHeader() {
  const { user } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href={ROUTES.DASHBOARD}
            className="text-xl font-bold text-primary-600"
          >
            Yatalko
          </Link>

          {/* Desktop Navigation */}
          {/* <nav className="hidden lg:flex items-center space-x-1">
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
          </nav> */}

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
            <ProfileDropdown />

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
