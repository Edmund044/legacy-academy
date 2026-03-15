"use client"
import React, { useState } from "react"
import { PageHeader } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, CheckCircle2, UserPlus, History, Wifi } from "lucide-react"

const students = [
  { initials: "MJ", name: "Marcus Johnson", id: "#EL-4902", position: "Midfielder", tag: "SPONSORED", billing: "Auto-trigger ON", checked: true },
  { initials: "SW", name: "Sara Williams", id: "#EL-4915", position: "Striker", tag: null, billing: "Pending Check-in", checked: false },
  { initials: "LC", name: "Leo Chen", id: "#EL-4988", position: "Goalkeeper", tag: "ELITE PLUS", billing: "Auto-trigger ON", checked: true },
]

const weekProgress = [
  { day: "Session 1 (Mon)", status: "Completed" },
  { day: "Session 2 (Wed)", status: "Scheduled" },
  { day: "Session 3 (Thu)", status: "Scheduled" },
  { day: "Session 4 (Sat)", status: "Scheduled" },
]

export default function AttendancePage() {
  const [checked, setChecked] = useState<Record<number, boolean>>({ 0: true, 2: true })
  const checkedCount = Object.values(checked).filter(Boolean).length

  return (
    <>
      <PageHeader title="Attendance & Revenue Tracker" description="Pitch-side check-in and real-time revenue split.">
        <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
          <Wifi className="w-3.5 h-3.5" />Cloud Sync Active · Updated 2m ago
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div>
                  <CardTitle className="text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand" />Check-in Roster</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">{checkedCount}/24 checked</p>
                </div>
                <div className="flex gap-2 sm:ml-auto">
                  <div className="flex gap-1">
                    {["Elite AM", "Elite PM", "U16 Dev", "Academy"].map((t, i) => (
                      <button key={t} className={`px-2.5 py-1 text-xs rounded-lg ${i === 0 ? "bg-brand text-white" : "bg-muted text-muted-foreground"}`}>{t}</button>
                    ))}
                  </div>
                  <Button variant="outline" size="sm"><QrCode className="w-3.5 h-3.5 mr-1.5" />Scan QR</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {students.map((s, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${checked[i] ? "border-green-200 bg-green-50/50" : "border-border bg-white"}`}>
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-xs font-bold text-brand">{s.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold">{s.name}</p>
                      {s.tag && <Badge variant="info" className="text-[10px]">{s.tag}</Badge>}
                    </div>
                    <p className="text-[11px] text-muted-foreground">{s.id} · {s.position}</p>
                  </div>
                  <div className="text-right mr-3">
                    <p className="text-[10px] text-muted-foreground">BILLING</p>
                    <p className={`text-[11px] font-semibold ${checked[i] ? "text-green-600" : "text-muted-foreground"}`}>{s.billing}</p>
                  </div>
                  <button
                    onClick={() => setChecked(prev => ({ ...prev, [i]: !prev[i] }))}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${checked[i] ? "border-brand bg-brand" : "border-gray-300 bg-white"}`}
                  >
                    {checked[i] && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </button>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full text-brand">View All 24 Students</Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">60/40 Split Reconciliation</CardTitle></CardHeader>
            <CardContent>
              <p className="text-[10px] text-muted-foreground">TOTAL REVENUE</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-2xl font-bold">$800.00</p>
                <Badge variant="success" className="text-[10px]">Real-time</Badge>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden my-3">
                <div className="h-full bg-brand rounded-full" style={{ width: "60%" }} />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-2.5 bg-brand/10 rounded-lg text-center">
                  <p className="text-[10px] text-brand font-bold">COACH (60%)</p>
                  <p className="text-lg font-bold">$480.00</p>
                </div>
                <div className="p-2.5 bg-muted rounded-lg text-center">
                  <p className="text-[10px] text-muted-foreground font-bold">ACADEMY (40%)</p>
                  <p className="text-lg font-bold">$320.00</p>
                </div>
              </div>
              <Button className="w-full">⚡ Process Billing Trigger</Button>
              <p className="text-[11px] text-muted-foreground text-center mt-2">Session logs archived daily for dispute avoidance.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Weekly Progress</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {weekProgress.map((w, i) => (
                <div key={i} className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${w.status === "Completed" ? "bg-brand" : "bg-gray-300"}`} />
                    <span className="text-xs">{w.day}</span>
                  </div>
                  <Badge variant={w.status === "Completed" ? "success" : "secondary"} className="text-[10px]">{w.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="flex-col h-16 gap-1">
              <UserPlus className="w-4 h-4" />
              <span className="text-xs">New Student</span>
            </Button>
            <Button variant="outline" className="flex-col h-16 gap-1">
              <History className="w-4 h-4" />
              <span className="text-xs">Logs History</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
