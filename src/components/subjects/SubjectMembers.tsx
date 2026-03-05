"use client";

import Link from "next/link";
import { Users, Trophy, Shield, Star } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { UserSummary, UserRole } from "@/types/entities";

interface SubjectMembersProps {
  subjectId: string;
  members?: UserSummary[];
  isLoading?: boolean;
}

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

function MemberItem({ member }: { member: UserSummary }) {
  const roleBadge = getRoleBadge(member.role);

  return (
    <Link
      href={ROUTES.PROFILE_DETAIL(member.id)}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
    >
      {/* Avatar */}
      {member.avatarUrl ? (
        <img
          src={member.avatarUrl}
          alt={`${member.firstName} ${member.lastName}`}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-medium">
          {member.firstName.charAt(0)}
          {member.lastName.charAt(0)}
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900 truncate">
            {member.firstName} {member.lastName}
          </span>
          {roleBadge && (
            <span
              className={cn(
                "flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full",
                roleBadge.color
              )}
            >
              {roleBadge.icon}
              {roleBadge.label}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Trophy className="w-3 h-3 text-accent-500" />
          {member.points} pts
        </div>
      </div>
    </Link>
  );
}

function MemberSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 animate-pulse">
      <div className="w-10 h-10 bg-gray-200 rounded-full" />
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-16" />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Users className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="font-medium text-gray-900 mb-1">Aucun membre</h3>
      <p className="text-sm text-gray-500">
        Sois le premier à rejoindre cette matière !
      </p>
    </div>
  );
}

export default function SubjectMembers({
  subjectId,
  members = [],
  isLoading,
}: SubjectMembersProps) {
  // Sort: ambassadors first, then by points
  const sortedMembers = [...members].sort((a, b) => {
    const roleOrder: Record<UserRole, number> = {
      ADMIN: 0,
      CAMPUS_LEAD: 1,
      AMBASSADOR: 2,
      STUDENT: 3,
    };
    const roleCompare = roleOrder[a.role] - roleOrder[b.role];
    if (roleCompare !== 0) return roleCompare;
    return b.points - a.points;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">
          Membres ({members.length})
        </h2>
      </div>

      {/* Content */}
      <div className="p-3">
        {isLoading ? (
          <div className="space-y-1">
            <MemberSkeleton />
            <MemberSkeleton />
            <MemberSkeleton />
            <MemberSkeleton />
          </div>
        ) : sortedMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {sortedMembers.map((member) => (
              <MemberItem key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
