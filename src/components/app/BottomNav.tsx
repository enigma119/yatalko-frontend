"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, FileText, Trophy, User } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Accueil", href: ROUTES.DASHBOARD, icon: Home },
  { name: "Matières", href: ROUTES.SUBJECTS, icon: BookOpen },
  { name: "Documents", href: ROUTES.DOCUMENTS, icon: FileText },
  { name: "Classement", href: ROUTES.LEADERBOARD, icon: Trophy },
  { name: "Profil", href: ROUTES.PROFILE, icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === ROUTES.DASHBOARD) {
      return pathname === href || pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
      <div className="flex items-center justify-around h-16 px-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors",
              isActive(item.href)
                ? "text-primary-600"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <item.icon
              className={cn(
                "w-5 h-5",
                isActive(item.href) && "text-primary-600"
              )}
            />
            <span
              className={cn(
                "text-xs font-medium",
                isActive(item.href) ? "text-primary-600" : "text-gray-500"
              )}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
