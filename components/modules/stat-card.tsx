import React from "react"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "up" | "down" | "neutral"
  icon?: React.ReactNode
  badge?: React.ReactNode
  className?: string
}

export function StatCard({ title, value, change, changeType = "up", icon, badge, className }: StatCardProps) {
  return (
    <div className={cn("bg-white rounded-xl border border-border p-5 flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <div className="flex items-center gap-2">
          {badge}
          {icon && <div className="p-2 rounded-lg bg-brand/10 text-brand">{icon}</div>}
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      {change && (
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium",
          changeType === "up" ? "text-green-600" : changeType === "down" ? "text-red-500" : "text-muted-foreground"
        )}>
          {changeType === "up" ? <TrendingUp className="w-3 h-3" /> : changeType === "down" ? <TrendingDown className="w-3 h-3" /> : null}
          {change}
        </div>
      )}
    </div>
  )
}

export function PageHeader({ title, description, children }: { title: string; description?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2 flex-wrap">{children}</div>}
    </div>
  )
}
