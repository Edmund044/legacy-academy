"use client"
import React from "react"
import { PageHeader, StatCard } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/primitives"
import { Calendar, DollarSign,Edit, CheckCircle2, Clock, ChevronRight } from "lucide-react"
import AddSessionModal from "@/components/custom/modals/addSessionModal"
import EditSessionModal from "@/components/custom/modals/editSessionModal"
import AttendanceTrackerModal from "@/components/custom/modals/attendanceTrackerModal"

const sessions = [
  { initials: "EK", name: "Ethan Kamau", tag: "SPONSORED", tagVariant: "success", time: "09:00 AM – 10:00 AM (Today)", eligibility: "45% Support Plan", status: "live" },
  { initials: "SM", name: "Sarah Mwangi", tag: "SIBLING DISC.", tagVariant: "info", time: "10:30 AM – 11:30 AM (Today)", eligibility: "Private Funded", status: "upcoming" },
  { initials: "JO", name: "Junior Otieno", tag: null, tagVariant: null, time: "03:00 PM – 04:00 PM (Today)", eligibility: "Private Funded", status: "upcoming" },
]

const activity = [
  { icon: "✅", title: "Session Completed: Mark Z.", meta: "Yesterday, 4:00 PM • Payout Reconciled", color: "text-green-600" },
  { icon: "💰", title: "Weekly Bonus Processed", meta: "2 days ago • Training Excellency", color: "text-brand" },
  { icon: "⏳", title: "Session Completed: Lisa W.", meta: "3 days ago • Payout Pending", color: "text-amber-600" },
]

export default function CoachDashboardPage() {
  return (
    <>
      <PageHeader title="Coach Dashboard" description="Your sessions, earnings, and activity at a glance." />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="sm:col-span-1 bg-brand text-white border-0">
          <CardContent className="pt-5">
            <p className="text-sm font-medium text-white/80">Good morning,</p>
            <p className="text-xl font-bold mt-0.5">Coach David</p>
            <p className="text-xs text-white/70 mt-2">You have 4 elite training sessions scheduled for today.</p>
            {/* <Button size="sm" className="mt-3 bg-white text-brand hover:bg-white/90"><Calendar className="w-3.5 h-3.5 mr-1.5" />View Schedule</Button> */}
            <AddSessionModal/>
          </CardContent>
        </Card>
        <StatCard title="Sessions This Week" value="24" change="+12%" changeType="up" icon={<Calendar className="w-4 h-4" />} />
        <StatCard title="Pending Payout" value="KES 12,500" icon={<DollarSign className="w-4 h-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm">Sessions</CardTitle>
              <div className="flex gap-1">
                {["Individual", "Group"].map(t => (
                  <button key={t} className={`px-2.5 py-1 text-xs rounded-lg border ${t === "Individual" ? "border-brand text-brand" : "border-border text-muted-foreground"}`}>{t}</button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {sessions.map((s, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${s.status === "live" ? "border-brand/30 bg-brand/5" : "border-border bg-muted/20"}`}>
                  <Avatar className="h-10 w-10"><AvatarFallback>{s.initials}</AvatarFallback></Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold truncate">{s.name}</p>
                      {s.tag && <Badge variant={s.tagVariant as any} className="text-[10px]">{s.tag}</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">{s.time}</p>
                    <p className="text-[11px] text-muted-foreground">Player Eligibility: <span className="font-medium text-foreground">{s.eligibility}</span></p>
                  </div>
                  {/* <Button size="sm"><span className="w-1.5 h-1.5 rounded-full bg-white live-dot mr-1.5" />Check-in</Button> */}
                  <AttendanceTrackerModal/>
                  <EditSessionModal/>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Revenue Split</CardTitle></CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">STANDARD SESSION RATE</p>
              <p className="text-2xl font-bold text-brand mt-1">KES 2,500</p>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-brand" /><span className="text-xs">Coach Share (60%)</span></div>
                  <span className="text-xs font-bold">KES 1,500</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-gray-300" /><span className="text-xs">Academy Share (40%)</span></div>
                  <span className="text-xs font-bold">KES 1,000</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-brand rounded-full" style={{ width: "60%" }} />
                </div>
              </div>
              <div className="mt-3 p-2.5 bg-brand/5 border border-brand/20 rounded-lg">
                <p className="text-[10px] font-bold text-brand">COACH NOTE</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Sponsored players (45%) have their session fees reconciled through the Academy Foundation Fund at full coach rate.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm">Recent Activity</CardTitle>
              <Button variant="ghost" size="sm" className="text-brand text-xs">View All</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {activity.map((a, i) => (
                <div key={i} className="flex gap-2.5">
                  <span className="text-base leading-none mt-0.5">{a.icon}</span>
                  <div>
                    <p className="text-xs font-semibold">{a.title}</p>
                    <p className="text-[11px] text-muted-foreground">{a.meta}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
