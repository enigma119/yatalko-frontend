"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Settings,
  LogOut,
  Trophy,
  Award,
  ChevronDown,
  Shield,
  Star,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useLogout } from "@/hooks";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/entities";

function getRoleBadge(role: UserRole) {
  switch (role) {
    case "AMBASSADOR":
      return {
        label: "Ambassadeur",
        color: "bg-purple-100 text-purple-700",
        icon: <Star className="w-3 h-3" />,
      };
    case "CAMPUS_LEAD":
      return {
        label: "Campus Lead",
        color: "bg-amber-100 text-amber-700",
        icon: <Shield className="w-3 h-3" />,
      };
    case "ADMIN":
      return {
        label: "Admin",
        color: "bg-red-100 text-red-700",
        icon: <Shield className="w-3 h-3" />,
      };
    default:
      return null;
  }
}

export default function ProfileDropdown() {
  const { user } = useAuthStore();
  const { logout, isLoggingOut } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const userInitials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    : "?";

  const roleBadge = user ? getRoleBadge(user.role) : null;

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleClose = () => setIsOpen(false);

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {userInitials}
          </div>
        )}
        <ChevronDown
          className={cn(
            "w-4 h-4 text-gray-400 transition-transform hidden sm:block",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
          {/* User Info Header */}
          <div className="p-4 bg-gradient-to-br from-primary-500 to-primary-600 text-white">
            <div className="flex items-center gap-3">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                />
              ) : (
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">
                  {userInitials}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm text-white/80 truncate">{user?.email}</p>
              </div>
            </div>

            {/* Role Badge */}
            {roleBadge && (
              <div className="mt-3">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                    "bg-white/20 text-white"
                  )}
                >
                  {roleBadge.icon}
                  {roleBadge.label}
                </span>
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/20">
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-accent-300" />
                <span className="font-semibold">{user?.points || 0}</span>
                <span className="text-sm text-white/80">pts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-purple-300" />
                <span className="font-semibold">{user?.badges?.length || 0}</span>
                <span className="text-sm text-white/80">badges</span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href={ROUTES.PROFILE}
              onClick={handleClose}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <User className="w-4 h-4 text-gray-400" />
              Mon profil
            </Link>
            <Link
              href={ROUTES.LEADERBOARD}
              onClick={handleClose}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Trophy className="w-4 h-4 text-gray-400" />
              Classement
            </Link>
            <Link
              href={ROUTES.SETTINGS}
              onClick={handleClose}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-4 h-4 text-gray-400" />
              Paramètres
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 py-2">
            <button
              onClick={() => {
                handleClose();
                logout();
              }}
              disabled={isLoggingOut}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              {isLoggingOut ? "Déconnexion..." : "Se déconnecter"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
