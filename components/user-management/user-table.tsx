"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type UserRole = "Super Admin" | "Coach" | "Manager" | "Parent";
export type UserStatus = "ACTIVE" | "INACTIVE";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  initials: string;
  avatarColor: string;
}

const roleStyles: Record<UserRole, string> = {
  "Super Admin": "bg-purple-100 text-purple-700 border-purple-200",
  Coach: "bg-blue-100 text-blue-700 border-blue-200",
  Manager: "bg-orange-100 text-orange-700 border-orange-200",
  Parent: "bg-teal-100 text-teal-700 border-teal-200",
};

interface UserTableProps {
  users: User[];
  onEdit?: (user: User) => void;
}

export function UserTable({ users, onEdit }: UserTableProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1fr] gap-4 px-6 py-3 border-b border-slate-100">
        {["Name", "Email Address", "Assigned Role", "Status", "Actions"].map((col) => (
          <span key={col} className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {col}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-slate-100">
        {users.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1fr] gap-4 items-center px-6 py-4 hover:bg-slate-50 transition-colors"
          >
            {/* Name + avatar */}
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0",
                  user.avatarColor
                )}
              >
                {user.initials}
              </div>
              <span className="text-sm font-semibold text-slate-900">{user.name}</span>
            </div>

            {/* Email */}
            <span className="text-sm text-slate-500 truncate">{user.email}</span>

            {/* Role badge */}
            <div>
              <Badge
                variant="outline"
                className={cn("text-xs font-medium border", roleStyles[user.role])}
              >
                {user.role}
              </Badge>
            </div>

            {/* Status */}
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "w-2 h-2 rounded-full flex-shrink-0",
                  user.status === "ACTIVE" ? "bg-green-500" : "bg-slate-400"
                )}
              />
              <span
                className={cn(
                  "text-xs font-semibold tracking-wide",
                  user.status === "ACTIVE" ? "text-green-600" : "text-slate-400"
                )}
              >
                {user.status}
              </span>
            </div>

            {/* Actions */}
            <button
              onClick={() => onEdit?.(user)}
              className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors text-left"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
