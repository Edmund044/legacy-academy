"use client"
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Sidebar, TopBar } from "@/components/layout/navigation"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <TopBar sidebarCollapsed={collapsed} />
      <main className={cn(
        "transition-all duration-300 pt-14 min-h-screen",
        collapsed ? "ml-16" : "ml-60"
      )}>
        <div className="p-6 animate-fadeInUp">
          {children}
        </div>
      </main>
    </div>
  )
}
