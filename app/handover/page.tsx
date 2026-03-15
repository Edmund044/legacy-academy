"use client"
import React, { useState } from "react"
import { PageHeader } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, AlertCircle, Package } from "lucide-react"

const sessions = [
  { time: "14:00 PM", team: "U-16 Elite Training", coach: "Coach Marcus Holloway", venue: "Pitch 4", status: "ready" },
  { time: "16:30 PM", team: "Goalkeeper Intensive", coach: "Coach Sarah Jenkins", venue: "Pitch 2", status: "pending" },
]

const pending = [
  { coach: "Coach David Miller", session: "U-12 Morning Drills", equipment: "15x Size 5 Balls, 4G", status: "Handover Pending" },
]

const liabilities = [
  { name: "Marcus Holloway", note: "Lost: 2x Professional Cones", amount: "$45.00", clear: false },
  { name: "Sarah Jenkins", note: "No outstanding balances", amount: null, clear: true },
]

const checklist = [
  { item: "15x Size 5 Balls", condition: "EXCELLENT", checked: true },
  { item: "20x Training Bibs", condition: "CLEAN", checked: true },
  { item: "4x Pop-up Goals", condition: "WORN", checked: false },
]

export default function HandoverPage() {
  const [activeHandover, setActiveHandover] = useState(true)

  return (
    <>
      <PageHeader title="Equipment Handover & Accountability" description="Track professional gear check-outs, manage returns, and oversee coach liability." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Tabs */}
          <div className="flex gap-1 border-b border-border pb-3">
            {["Upcoming Sessions", "Pending Returns", "Coach Accountability"].map((t, i) => (
              <button key={t} className={`px-3 py-1.5 text-xs font-medium rounded-lg ${i === 0 ? "text-brand border-b-2 border-brand" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>
            ))}
          </div>

          {/* Upcoming */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm flex items-center gap-2"><Package className="w-4 h-4 text-brand" />Upcoming Sessions (Today)</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {sessions.map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border">
                  <div className="text-center bg-brand text-white rounded-lg px-2.5 py-2 min-w-[50px]">
                    <p className="text-sm font-bold leading-none">{s.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{s.team}</p>
                    <p className="text-xs text-muted-foreground">{s.coach} · {s.venue}</p>
                  </div>
                  {s.status === "ready" ? (
                    <Button size="sm"><Package className="w-3.5 h-3.5 mr-1.5" />Check-out Equipment</Button>
                  ) : (
                    <Button size="sm" variant="outline" disabled>Check-out Pending</Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pending */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Pending Returns</CardTitle></CardHeader>
            <CardContent>
              {pending.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border">
                  <div>
                    <p className="text-sm font-semibold">{p.coach}</p>
                    <p className="text-xs text-muted-foreground">{p.session}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{p.equipment}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="warning" className="text-[10px]">{p.status}</Badge>
                    <Button size="sm" variant="outline" className="text-brand border-brand" onClick={() => setActiveHandover(true)}>Complete Handover</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {/* Coach Accountability */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Coach Accountability</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {liabilities.map((l, i) => (
                <div key={i} className={`p-3 rounded-xl border ${l.clear ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold">{l.name}</p>
                    {l.clear ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <span className="text-sm font-bold text-brand">{l.amount}</span>}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{l.note}</p>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-2">View All Liabilities</Button>
            </CardContent>
          </Card>

          {/* Active Handover Panel */}
          {activeHandover && (
            <Card className="border-brand/30">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm text-brand">Active Handover</CardTitle>
                <button onClick={() => setActiveHandover(false)} className="text-muted-foreground hover:text-foreground text-xs">✕</button>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-2.5 bg-muted/40 rounded-lg">
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">Coach Detail</p>
                  <p className="text-sm font-semibold mt-0.5">David Miller</p>
                  <p className="text-xs text-muted-foreground">U-12 Morning Drills</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold mb-2">Return Checklist</p>
                  <div className="space-y-2">
                    {checklist.map((c, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${c.checked ? "border-brand bg-brand" : "border-border"}`}>
                            {c.checked && <CheckCircle2 className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-xs">{c.item}</span>
                        </div>
                        <Badge variant={c.condition === "EXCELLENT" || c.condition === "CLEAN" ? "success" : "warning"} className="text-[10px]">{c.condition}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-2.5 bg-muted/40 rounded-lg flex items-start gap-2">
                  <input type="checkbox" className="mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold">Losses/Damage Reported</p>
                    <p className="text-[11px] text-muted-foreground">Mark if any equipment is missing or damaged.</p>
                  </div>
                </div>
                <Button className="w-full">Confirm Return & Approve Payment</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}
