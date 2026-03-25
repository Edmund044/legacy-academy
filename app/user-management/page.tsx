"use client";

import { useState } from "react";
import { UserPlus, Pencil, PersonStanding, Briefcase, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserTable, User } from "@/components/user-management/user-table";
import {
  RolePermissionCard,
  CreateRoleCard,
  Permission,
} from "@/components/user-management/role-permission-card";

// ─── Seed data ────────────────────────────────────────────────────────────────
const INITIAL_USERS: User[] = [
  {
    id: "1",
    name: "Marcus Kane",
    email: "m.kane@strikers.com",
    role: "Super Admin",
    status: "ACTIVE",
    initials: "MK",
    avatarColor: "bg-violet-500",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "s.chen@strikers.com",
    role: "Coach",
    status: "ACTIVE",
    initials: "SC",
    avatarColor: "bg-blue-500",
  },
  {
    id: "3",
    name: "Julian Ross",
    email: "j.ross@strikers.com",
    role: "Manager",
    status: "INACTIVE",
    initials: "JR",
    avatarColor: "bg-rose-400",
  },
  {
    id: "4",
    name: "Elena Gomez",
    email: "e.gomez@mail.com",
    role: "Parent",
    status: "ACTIVE",
    initials: "EG",
    avatarColor: "bg-emerald-400",
  },
];

const COACH_PERMS: Permission[] = [
  { key: "edit_roster", label: "Edit Roster", enabled: true },
  { key: "manage_finances", label: "Manage Finances", enabled: false },
  { key: "schedule_matches", label: "Schedule Matches", enabled: true },
  { key: "view_analytics", label: "View Analytics", enabled: true },
];

const MANAGER_PERMS: Permission[] = [
  { key: "edit_roster", label: "Edit Roster", enabled: true },
  { key: "manage_finances", label: "Manage Finances", enabled: true },
  { key: "schedule_matches", label: "Schedule Matches", enabled: true },
  { key: "view_analytics", label: "View Analytics", enabled: true },
];

const PARENT_PERMS: Permission[] = [
  { key: "view_roster", label: "View Roster", enabled: true },
  { key: "make_payments", label: "Make Payments", enabled: true },
  { key: "schedule_matches", label: "Schedule Matches", enabled: false },
  { key: "view_feedback", label: "View Feedback", enabled: true },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function UserManagementPage() {
  const [users] = useState<User[]>(INITIAL_USERS);

  return (
    <>
      {/* ── Page header ── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            User Management
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Control access for staff, coaches, and parents across the academy.
          </p>
        </div>
        <Button className="bg-red-500 hover:bg-red-600 text-white h-11 px-5 rounded-xl font-semibold gap-2 shadow-sm">
          <UserPlus className="w-4 h-4" />
          Add New User
        </Button>
      </div>

      {/* ── Users table ── */}
      <UserTable users={users} onEdit={(user) => console.log("Edit", user)} />

      {/* ── Roles & Permissions ── */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Roles & Permissions Settings</h2>
          <button className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
            <Pencil className="w-4 h-4" />
            Edit Roles
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <RolePermissionCard
            role="Coach"
            icon={PersonStanding}
            permissions={COACH_PERMS}
            highlighted
          />
          <RolePermissionCard
            role="Manager"
            icon={Briefcase}
            permissions={MANAGER_PERMS}
          />
          <RolePermissionCard
            role="Parent"
            icon={Users2}
            permissions={PARENT_PERMS}
          />
          <CreateRoleCard onClick={() => console.log("Create new role")} />
        </div>
      </section>
    </>
  );
}
