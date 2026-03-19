"use client";

import { useState } from "react";
import { LucideIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export interface Permission {
  key: string;
  label: string;
  enabled: boolean;
}

export interface RoleCardProps {
  role: string;
  icon: LucideIcon;
  permissions: Permission[];
  highlighted?: boolean;
  onPermissionChange?: (key: string, value: boolean) => void;
}

export function RolePermissionCard({
  role,
  icon: Icon,
  permissions,
  highlighted = false,
  onPermissionChange,
}: RoleCardProps) {
  const [perms, setPerms] = useState(permissions);

  const toggle = (key: string) => {
    const updated = perms.map((p) =>
      p.key === key ? { ...p, enabled: !p.enabled } : p
    );
    setPerms(updated);
    const perm = updated.find((p) => p.key === key);
    if (perm) onPermissionChange?.(key, perm.enabled);
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-5 rounded-xl border bg-white",
        highlighted ? "border-red-300 shadow-sm" : "border-slate-200"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900">{role}</h3>
        <Icon className={cn("w-5 h-5", highlighted ? "text-red-500" : "text-slate-400")} />
      </div>

      {/* Permissions */}
      <div className="flex flex-col gap-3">
        {perms.map((perm) => (
          <div key={perm.key} className="flex items-center justify-between">
            <span className="text-sm text-slate-600">{perm.label}</span>
            <Switch
              checked={perm.enabled}
              onCheckedChange={() => toggle(perm.key)}
              className="data-[state=checked]:bg-red-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CreateRoleCard({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400 transition-all min-h-[180px]"
    >
      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
        <span className="text-slate-500 text-2xl leading-none">+</span>
      </div>
      <span className="text-sm font-semibold text-slate-500">Create New Role</span>
    </button>
  );
}
