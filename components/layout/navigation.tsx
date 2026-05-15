"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, Users, UserCircle, CalendarDays, Trophy, Package,
  ArrowLeftRight, ShoppingBag, Heart, Gift, BookOpen, CreditCard,
  Dumbbell, ScanLine, FileText, Building2, Bell, Settings, ChevronLeft,
  Search
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/primitives"
import { useAuth } from "@/context/auth-context"
import { RoleNames } from "@/constants/constants"

//
// ✅ TYPES
//
export interface NavLinkItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

export interface NavGroup {
  label: string;
  roles?: string[]; // optional role restriction
  items: NavLinkItem[];
}

//
// ✅ NAV CONFIG (NOW FULLY TYPED)
//
const naviGroups: NavGroup[] = [
  // {
  //   label: "Overview",
  //   items: [
  //     { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  //   ]
  // },
  // {
  //   label: "People",
  //   items: [
  //     { href: "/coaches", icon: Users, label: "Coaches" },
  //     { href: "/players", icon: UserCircle, label: "Players" },
  //   ]
  // },
  // {
  //   label: "Operations",
  //   items: [
  //     { href: "/sessions", icon: CalendarDays, label: "Sessions" },
  //     { href: "/equipment", icon: Package, label: "Equipment" },
  //     { href: "/handover", icon: ArrowLeftRight, label: "Handover" },
  //     { href: "/user-management", icon: Package, label: "User Management" },
  //   ]
  // },

  // ✅ ROLE-BASED GROUPS
  {
    label: "Parent Portal",
    roles: [RoleNames.PARENT],
    items: [
      // { href: "/bookings", icon: BookOpen, label: "Bookings" },
      { href: "/annual-subscriptions", icon: UserCircle, label: "Subscriptions" },
      // { href: "/parent-dashboard", icon: Dumbbell, label: "Enroll Session" },
      { href : "/children", icon: UserCircle, label: "My Children" },
      { href: "/tournaments", icon: Dumbbell, label: "Tournaments" },
      { href: "/merchandise", icon: Dumbbell, label: "Merchandise" },
      { href: "/sessions", icon: Dumbbell, label: "Session History" },
      { href: "/billing", icon: Dumbbell, label: "Billing" },

    ]
  },
  {
    label: "Coach Portal",
    roles: [RoleNames.COACH],
    items: [
      { href: "/coach-dashboard", icon: Dumbbell, label: "Plan Session" },
      { href: "/sessions", icon: Dumbbell, label: "Session History" },
      { href: "/handover", icon: Dumbbell, label: "Handover" },
      { href: "/session-attendance", icon: ScanLine, label: "Attendance" },
    ]
  },
  {
    label: "Kits & Equipment Portal",
    roles: [RoleNames.COACH],
    items: [
      { href: "/sessions", icon: Dumbbell, label: "Session History" },
      { href: "/equipment", icon: Dumbbell, label: "Equipment" },
      { href: "/handover", icon: Dumbbell, label: "Handover" },
    ]
  },
  {
    label: "Customer Care Portal",
    roles: [RoleNames.CUSTOMER_CARE],
    items: [
      { href: "/players", icon: UserCircle, label: "Players" },
      { href: "/guardians", icon: UserCircle, label: "Guardian" },
      { href: "/sessions", icon: Dumbbell, label: "Session History" },
      { href: "/sponsorship", icon: Dumbbell, label: "Sponsorship" },
      { href: "/billing", icon: CreditCard, label: "Billing" },
    ]
  },
  {
    label: "CSR Portal",
    roles: [RoleNames.CSR_LEAD],
    items: [
      { href: "/social-impact", icon: Heart, label: "Social Impact" },
      { href: "/sponsorship", icon: Dumbbell, label: "Sponsorship" },
      { href: "/contracts", icon: FileText, label: "Contracts" },
    ]
  },
  {
    label: "Technical Director Portal",
    roles: [RoleNames.TECHNICAL_DIRECTOR],
    items: [
      { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/price-configurations", icon: CalendarDays, label: "Price Configurations" },
      { href: "/annual-subscriptions-report", icon: ScanLine, label: "Annual Subscriptions" },
      { href: "/attendance-billing", icon: Package, label: "Attendance Billing" },
      { href: "/revenue-splits", icon: Package, label: "Revenue Splits" },
      { href: "/coaches", icon: Users, label: "Coaches" },
      { href: "/tournaments", icon: Dumbbell, label: "Tournaments" },
      { href: "/sponsorship", icon: Dumbbell, label: "Sponsorship" },
      { href: "/players", icon: UserCircle, label: "Players" },
      {href: "/sponsorship-cases", icon: UserCircle, label: "Sponsorship Cases" },
      { href: "/social-impact", icon: Heart, label: "Social Impact" },
      { href: "/contracts", icon: FileText, label: "Contracts" },
      { href: "/sessions", icon: Dumbbell, label: "Session History" },
      { href: "/handover", icon: Dumbbell, label: "Handover" },
      { href: "/session-attendance", icon: ScanLine, label: "Attendance" },
    ]
  }
]

//
// ✅ SIDEBAR
//
export function Sidebar({
  collapsed,
  onToggle
}: {
  collapsed: boolean
  onToggle: () => void
}) {
  const pathname = usePathname()
  const [navGroups, setNavGroups] = useState<NavGroup[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    const filtered = naviGroups.filter(group =>
      !group.roles || group.roles.includes(user.role)
    )

    setNavGroups(filtered)
  }, [user])

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen bg-white border-r border-border flex flex-col z-40 transition-all duration-300",
      collapsed ? "w-16" : "w-60"
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
        <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
          <Trophy className="w-4 h-4 text-white" />
        </div>

        {!collapsed && (
          <p className="font-bold text-sm">Legacy Academy</p>
        )}

        <button
          onClick={onToggle}
          className="ml-auto p-1 rounded-md hover:bg-muted"
        >
          <ChevronLeft className={cn(
            "w-4 h-4 transition-transform",
            collapsed && "rotate-180"
          )} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navGroups.map(group => (
          <div key={group.label} className="mb-3">
            {!collapsed && (
              <p className="px-2 py-1 text-xs text-muted-foreground uppercase">
                {group.label}
              </p>
            )}

            {group.items.map(item => {
              const active =
                pathname === item.href ||
                pathname.startsWith(item.href + "/")

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-2 py-2 rounded-lg text-sm",
                    active
                      ? "bg-brand text-white"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {!collapsed && item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t">
        <Link href="/settings" className="flex items-center gap-2 px-2 py-2">
          <Settings className="w-4 h-4" />
          {!collapsed && "Settings"}
        </Link>
      </div>
    </aside>
  )
}

//
// ✅ TOPBAR
//
export function TopBar({
  sidebarCollapsed
}: {
  sidebarCollapsed: boolean
}) {
  return (
    <header className={cn(
      "fixed top-0 right-0 h-14 bg-white border-b flex items-center px-4",
      sidebarCollapsed ? "left-16" : "left-60"
    )}>
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-2 w-4 h-4" />
          <input
            className="w-full pl-9 h-9 border rounded-lg text-sm"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <Bell className="w-4 h-4" />

        <Avatar className="h-8 w-8">
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}