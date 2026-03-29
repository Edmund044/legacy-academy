"use client"
import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, Users, UserCircle, CalendarDays, Trophy, Package,
  ArrowLeftRight, ShoppingBag, Heart, Gift, BookOpen, CreditCard,
  Dumbbell, ScanLine, FileText, Building2, Bell, Settings, ChevronLeft,
  Menu, X, Search
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/primitives"

const navGroups = [
  // {
  //   label: "Overview",
  //   items: [
  //     { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  //   ]
  // },
  {
    label: "People",
    items: [
      { href: "/coaches", icon: Users, label: "Coaches" },
      { href: "/players", icon: UserCircle, label: "Players" },
    ]
  },
  {
    label: "Operations",
    items: [
      { href: "/sessions", icon: CalendarDays, label: "Sessions" },
      // { href: "/tournaments", icon: Trophy, label: "Tournaments" },
      { href: "/equipment", icon: Package, label: "Equipment" },
      { href: "/handover", icon: ArrowLeftRight, label: "Handover" },
      { href: "/user-management", icon: Package, label: "User Management" },
      // { href: "/merchandise", icon: ShoppingBag, label: "Merchandise" },
    ]
  },
  // {
  //   label: "Finance & Impact",
  //   items: [
  //     { href: "/social-impact", icon: Heart, label: "Social Impact" },
  //     { href: "/sponsorship", icon: Gift, label: "Sponsorship" },
  //     { href: "/billing", icon: CreditCard, label: "Billing" },
  //   ]
  // },
  {
    label: "Parent Portal",
    items: [
      { href: "/parent-dashboard", icon: Dumbbell, label: "Parent Dashboard" },
      // { href: "/attendance", icon: ScanLine, label: "Attendance" },
    ]
  },
  {
    label: "Coach Portal",
    items: [
      { href: "/coach-dashboard", icon: Dumbbell, label: "Coach Dashboard" },
      // { href: "/attendance", icon: ScanLine, label: "Attendance" },
    ]
  },
  // {
  //   label: "Partnerships",
  //   items: [
  //     { href: "/contracts", icon: FileText, label: "Contracts" },
  //     { href: "/partnerships", icon: Building2, label: "Partnerships" },
  //   ]
  // },
  // {
  //   label: "Parent",
  //   items: [
  //     { href: "/bookings", icon: BookOpen, label: "Bookings" },
  //   ]
  // },
]

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname()

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen bg-white border-r border-border flex flex-col z-40 transition-all duration-300",
      collapsed ? "w-16" : "w-60"
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
        <div className="flex-shrink-0 w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
          <Trophy className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-foreground truncate">Legacy Academy</p>
            {/* <p className="text-xs text-muted-foreground truncate">Season 2024/25</p> */}
          </div>
        )}
        <button
          onClick={onToggle}
          className="ml-auto p-1 rounded-md hover:bg-muted text-muted-foreground"
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-2">
            {!collapsed && (
              <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                {group.label}
              </p>
            )}
            {group.items.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-all group",
                    active
                      ? "bg-brand text-white shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-2 py-3 border-t border-border">
        <Link href="/settings" className="flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
          <Settings className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  )
}

export function TopBar({ sidebarCollapsed }: { sidebarCollapsed: boolean }) {
  return (
    <header className={cn(
      "fixed top-0 right-0 h-14 bg-white border-b border-border z-30 flex items-center gap-3 px-4 transition-all duration-300",
      sidebarCollapsed ? "left-16" : "left-60"
    )}>
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search sessions, players, coaches..."
            className="w-full h-9 pl-9 pr-4 rounded-lg border border-input bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand rounded-full"></span>
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-border">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">AD</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold">Admin User</p>
            <p className="text-[10px] text-muted-foreground">Manager</p>
          </div>
        </div>
      </div>
    </header>
  )
}
