"use client"
import React, { useState } from "react"
import { PageHeader, StatCard } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress, Avatar, AvatarFallback } from "@/components/ui/primitives"
import { TrendingUp, Users, Activity, Download, Filter, Search, MoreVertical,  Edit} from "lucide-react"


const sessions = [
  { id: 1, name: "Elite Striker Camp", type: "Advanced Training", team: "U14", date: "Oct 24, 2023", time: "09:00 AM - 11:30 AM", coach: "Marco Rossi", enrollment: 17, total: 20, revenue: "KES 4,250", status: "active" },
  { id: 2, name: "Beginner Fundamentals", type: "Weekend Clinic", team: "U10", date: "Oct 25, 2023", time: "10:00 AM - 12:00 PM", coach: "Sarah Jenkins", enrollment: 30, total: 30, revenue: "KES 3,000", status: "upcoming" },
  { id: 3, name: "Goalkeeper Masterclass", type: "Specialized Training", team: "PRO", date: "Oct 26, 2023", time: "03:00 PM - 05:00 PM", coach: "David Miller", enrollment: 4, total: 10, revenue: "KES 1,600", status: "upcoming" },
  { id: 4, name: "Summer Open Tryouts", type: "Academy Selection", team: "ALL", date: "Oct 20, 2023", time: "08:00 AM - 04:00 PM", coach: "Marco Rossi", enrollment: 120, total: 120, revenue: "KES 12,000", status: "completed" },
  { id: 5, name: "U16 Technical Excellence", type: "Technical Training", team: "U16", date: "Oct 24, 2023", time: "04:00 PM - 05:30 PM", coach: "Julian Nagelsmann", enrollment: 18, total: 22, revenue: "KES 3,600", status: "active" },
]

const statusConfig: Record<string, { label: string; variant: any }> = {
  active: { label: "ACTIVE", variant: "success" },
  upcoming: { label: "UPCOMING", variant: "warning" },
  completed: { label: "COMPLETED", variant: "secondary" },
  cancelled: { label: "CANCELLED", variant: "destructive" },
}

export default function SessionsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [search, setSearch] = useState("")

  const filtered = sessions.filter(s => {
    const matchesTab = activeTab === "all" || s.status === activeTab
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.coach.toLowerCase().includes(search.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <>
      <PageHeader title="Session Reporting" description="Detailed overview of training sessions, enrollment, and revenue performance.">
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Revenue" value="KES 42,850" change="+12.5%" changeType="up" icon={<TrendingUp className="w-4 h-4" />} />
        <StatCard title="Total Enrolled" value="1,240" change="+5.2%" changeType="up" icon={<Users className="w-4 h-4" />} />
        <StatCard title="Active Sessions" value="48" badge={<Badge variant="brand" className="text-[10px]">LIVE</Badge>} icon={<Activity className="w-4 h-4" />} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex gap-1">
              {["all", "completed", "upcoming", "cancelled"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${activeTab === tab ? "bg-brand text-white" : "text-muted-foreground hover:bg-muted"}`}>
                  {tab === "all" ? "All Sessions" : tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 sm:ml-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="h-8 pl-8 pr-3 rounded-lg border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 w-full sm:w-48"
                  placeholder="Search sessions..."
                />
              </div>
              <Button variant="outline" size="sm"><Filter className="w-3.5 h-3.5 mr-1.5" />Filter</Button>
              <Button variant="outline" size="sm"><Download className="w-3.5 h-3.5 mr-1.5" />Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["SESSION NAME", "DATE & TIME", "LEAD COACH", "ENROLLMENT", "REVENUE", "STATUS", ""].map(h => (
                    <th key={h} className="text-left py-2 px-3 text-[10px] font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b border-border/40 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold bg-brand/10 text-brand px-1.5 py-0.5 rounded w-8 text-center flex-shrink-0">{s.team}</span>
                        <div>
                          <p className="text-sm font-semibold">{s.name}</p>
                          <p className="text-[11px] text-muted-foreground">{s.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-xs text-muted-foreground whitespace-nowrap">
                      <p>{s.date}</p>
                      <p>{s.time}</p>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6"><AvatarFallback className="text-[10px]">{s.coach.split(" ").map(n=>n[0]).join("")}</AvatarFallback></Avatar>
                        <span className="text-xs">{s.coach}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <Progress value={(s.enrollment / s.total) * 100} className="w-16 h-1.5" />
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{s.enrollment}/{s.total}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-sm font-semibold">{s.revenue}</td>
                    <td className="py-3 px-3">
                      <Badge variant={statusConfig[s.status]?.variant} className="text-[10px]">
                        {statusConfig[s.status]?.label}
                      </Badge>
                    </td>
                    {/* <td className="py-3 px-3">
                      <button className="p-1 rounded hover:bg-muted text-muted-foreground">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">Showing {filtered.length} of {sessions.length} sessions</p>
            <div className="flex gap-1">
              {[1, 2, 3].map(p => (
                <button key={p} className={`w-7 h-7 rounded text-xs font-medium ${p === 1 ? "bg-brand text-white" : "hover:bg-muted text-muted-foreground"}`}>{p}</button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
