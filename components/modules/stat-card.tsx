import React from "react"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts"


const revenueData = [
  { month: "Sep", revenue: 32000, enrolled: 980 },
  { month: "Oct", revenue: 38500, enrolled: 1100 },
  { month: "Nov", revenue: 41200, enrolled: 1180 },
  { month: "Dec", revenue: 35800, enrolled: 1050 },
  { month: "Jan", revenue: 43000, enrolled: 1200 },
  { month: "Feb", revenue: 42850, enrolled: 1240 },
]

const recentSessions = [
  { name: "Elite Striker Camp", team: "U14", coach: "Marco Rossi", enrollment: 17, total: 20, status: "active" },
  { name: "Beginner Fundamentals", team: "U10", coach: "Sarah Jenkins", enrollment: 30, total: 30, status: "upcoming" },
  { name: "Goalkeeper Masterclass", team: "PRO", coach: "David Miller", enrollment: 4, total: 10, status: "upcoming" },
  { name: "Summer Open Tryouts", team: "ALL", coach: "Marco Rossi", enrollment: 120, total: 120, status: "completed" },
]



const statusColors: Record<string, string> = {
  active: "success",
  upcoming: "warning",
  completed: "secondary",
}

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
                  <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#CC0000" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#CC0000" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number, n: string) => [n === "revenue" ? `KES ${v.toLocaleString()}` : v, n === "revenue" ? "Revenue" : "Enrolled"]} />
                <Area type="monotone" dataKey="revenue" stroke="#CC0000" strokeWidth={2} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
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
