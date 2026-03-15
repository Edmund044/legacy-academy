"use client"
import React, { useState } from "react"
import { PageHeader } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, History, CheckCircle2, RefreshCw } from "lucide-react"

export default function ContractsPage() {
  const [schoolPayout, setSchoolPayout] = useState(52.5)
  const [opOverheads, setOpOverheads] = useState(17.5)
  const providerNet = parseFloat((100 - schoolPayout - opOverheads).toFixed(1))

  return (
    <>
      <PageHeader title="Contract Analysis & Restructuring" description="Westlands Primary School — WPS-2024-0892">
        <Badge variant="success" className="text-xs">ACTIVE</Badge>
        <Button variant="outline" size="sm"><Download className="w-3.5 h-3.5 mr-1.5" />Export Analysis</Button>
        <Button variant="outline" size="sm"><History className="w-3.5 h-3.5 mr-1.5" />Version History</Button>
      </PageHeader>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-6 pb-0">
        {["Contract Terms", "Revenue Analysis", "Split Restructuring", "Compliance Audit", "Audit Trail"].map((t, i) => (
          <button key={t} className={`px-3 py-2 text-xs font-medium border-b-2 ${i === 2 ? "border-brand text-brand" : "border-transparent text-muted-foreground hover:text-foreground"} transition-colors`}>{t}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-sm">Split Restructuring Tool</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Simulate and adjust revenue distribution between stakeholders.</p>
              </div>
              <Badge variant="warning" className="text-[10px]">SIMULATION MODE</Badge>
            </CardHeader>
            <CardContent className="space-y-5">
              {[
                { label: "School District Payout", current: "Current: 45.0%", value: schoolPayout, setValue: setSchoolPayout, icon: "🎓" },
                { label: "Operational Overheads", current: "Current: 20.0%", value: opOverheads, setValue: setOpOverheads, icon: "⚙️" },
                { label: "Provider Net Revenue", current: "Current: 35.0%", value: providerNet, setValue: null, icon: "📊", locked: true },
              ].map((s, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span>{s.icon}</span>
                      <div>
                        <p className="text-sm font-semibold">{s.label}</p>
                        <p className="text-xs text-muted-foreground">{s.current}</p>
                      </div>
                    </div>
                    <span className="text-xl font-bold text-brand">{s.value}%</span>
                  </div>
                  <input
                    type="range" min={5} max={70} step={0.5}
                    value={s.value}
                    disabled={s.locked}
                    onChange={e => s.setValue && s.setValue(parseFloat(e.target.value))}
                    className={`w-full h-2 rounded-full appearance-none ${s.locked ? "opacity-50" : "cursor-pointer"}`}
                    style={{ accentColor: "#CC0000" }}
                  />
                </div>
              ))}

              <div className="grid grid-cols-3 gap-3 mt-2">
                {[
                  { label: "PROJECTED ANNUAL PAYOUT", value: "$452,100", sub: "+$64,200 vs current" },
                  { label: "PROVIDER MARGIN", value: "12.4%", sub: "-2.1% impact" },
                  { label: "RESTRUCTURING FEE", value: "$5,500", sub: "One-time assessment" },
                ].map((s, i) => (
                  <div key={i} className="p-3 bg-muted/40 rounded-lg">
                    <p className="text-[10px] text-muted-foreground uppercase font-semibold">{s.label}</p>
                    <p className="text-lg font-bold mt-1">{s.value}</p>
                    <p className={`text-[11px] mt-0.5 ${i === 0 ? "text-green-600" : i === 1 ? "text-red-500" : "text-muted-foreground"}`}>{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* Distribution Visualizer */}
              <div className="p-4 bg-muted/20 rounded-xl border border-border">
                <p className="text-xs font-semibold mb-3">Distribution Visualizer</p>
                <div className="h-6 bg-gray-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-brand transition-all" style={{ width: `${schoolPayout}%` }} />
                  <div className="h-full bg-amber-400 transition-all" style={{ width: `${opOverheads}%` }} />
                  <div className="h-full bg-gray-300 transition-all" style={{ width: `${providerNet}%` }} />
                </div>
                <div className="flex justify-around mt-2">
                  {[{ label: "SCHOOL", val: schoolPayout }, { label: "OPS", val: opOverheads }, { label: "PROVIDER", val: providerNet }].map((d, i) => (
                    <div key={i} className="text-center">
                      <p className={`text-sm font-bold ${i === 0 ? "text-brand" : i === 1 ? "text-amber-600" : "text-gray-500"}`}>{d.val}%</p>
                      <p className="text-[10px] text-muted-foreground">{d.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1">Apply Proposed Structure</Button>
                <Button variant="outline" className="flex-1"><RefreshCw className="w-3.5 h-3.5 mr-1.5" />Reset to Original</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Contract Terms</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "Base Rate", value: "$125.00 / student" },
                { label: "Enrollment Cap", value: "1,200 students" },
                { label: "Payment Cycle", value: "Quarterly" },
                { label: "Termination Notice", value: "90 Days" },
              ].map((t, i) => (
                <div key={i} className="flex justify-between py-1.5 border-b border-border/50 last:border-0">
                  <span className="text-xs text-muted-foreground">{t.label}</span>
                  <span className="text-xs font-semibold">{t.value}</span>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-2">View Full Master Agreement</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Audit Trail</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { icon: "✅", title: "Simulation Created", meta: "Jan 14, 2024 · 2:45 PM by Sarah Jenkins", note: "Increased school payout to 52.5%." },
                { icon: "✏️", title: "Contract Terms Modified", meta: "Dec 12, 2023 · System", note: "Updated base rate from $115 to $125." },
                { icon: "✅", title: "Annual Audit Completed", meta: "Nov 05, 2023 · Audit Team", note: "No discrepancies found." },
              ].map((a, i) => (
                <div key={i} className="flex gap-2.5">
                  <span className="text-sm mt-0.5">{a.icon}</span>
                  <div>
                    <p className="text-xs font-semibold">{a.title}</p>
                    <p className="text-[11px] text-muted-foreground">{a.meta}</p>
                    {a.note && <p className="text-[11px] text-muted-foreground mt-0.5 italic">{a.note}</p>}
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full text-brand text-xs">Load More Activity</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
