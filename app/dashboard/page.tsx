"use client"
import React from "react"
import { StatCard, PageHeader } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/primitives"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts"
import {
  Users, CalendarDays, Trophy, Package, TrendingUp,
  Activity, Star, ArrowRight, Clock
} from "lucide-react"
import Link from "next/link"

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

const quickLinks = [
  { label: "Coaches", href: "/coaches", icon: Users, color: "bg-blue-50 text-blue-600" },
  { label: "Sessions", href: "/sessions", icon: CalendarDays, color: "bg-green-50 text-green-600" },
  { label: "Tournaments", href: "/tournaments", icon: Trophy, color: "bg-amber-50 text-amber-600" },
  { label: "Equipment", href: "/equipment", icon: Package, color: "bg-purple-50 text-purple-600" },
]

const statusColors: Record<string, string> = {
  active: "success",
  upcoming: "warning",
  completed: "secondary",
}

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="Dashboard" description="Welcome back. Here's what's happening at the academy.">
        <Button size="sm" asChild>
          <Link href="/sessions"><CalendarDays className="w-4 h-4 mr-1.5" />New Session</Link>
        </Button>
      </PageHeader>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Revenue" value="KES 42,850" change="+12.5% this month" changeType="up" icon={<TrendingUp className="w-4 h-4" />} />
        <StatCard title="Total Enrolled" value="1,240" change="+5.2% this month" changeType="up" icon={<Users className="w-4 h-4" />} />
        <StatCard title="Active Sessions" value="48" badge={<Badge variant="brand" className="text-[10px] px-1.5 py-0">LIVE</Badge>} icon={<Activity className="w-4 h-4" />} />
        <StatCard title="Academy Ranking" value="#2" change="Regional Youth Division" changeType="neutral" icon={<Trophy className="w-4 h-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue & Enrollment</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader><CardTitle>Quick Access</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {quickLinks.map((ql) => (
              <Link key={ql.href} href={ql.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group">
                <div className={`p-2 rounded-lg ${ql.color}`}>
                  <ql.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{ql.label}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Sessions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Sessions</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/sessions">View all <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">SESSION</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground hidden sm:table-cell">COACH</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">ENROLLMENT</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {recentSessions.map((s, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold bg-brand/10 text-brand px-1.5 py-0.5 rounded">{s.team}</span>
                        <span className="text-sm font-medium">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-sm text-muted-foreground hidden sm:table-cell">{s.coach}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <Progress value={(s.enrollment / s.total) * 100} className="w-16 h-1.5" />
                        <span className="text-xs text-muted-foreground">{s.enrollment}/{s.total}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant={statusColors[s.status] as any} className="capitalize text-[10px]">{s.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
