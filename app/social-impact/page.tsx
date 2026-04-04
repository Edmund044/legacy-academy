"use client"
import React from "react"
import { PageHeader, StatCard } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/primitives"
import { Heart, BookOpen, Package, Bus, AlertTriangle, Download, Plus } from "lucide-react"

const players = [
  { name: "Kevin Omondi", settlement: "Mathare Valley", status: "FULLY SPONSORED", needs: "Transport, Boots", spend: "KES 14,200" },
  { name: "Faith Atieno", settlement: "Kibera Lindi", status: "PARTIAL", needs: "School Fees", spend: "KES 8,500" },
  { name: "Samuel Karanja", settlement: "Mukuru Kwa Njenga", status: "URGENT NEED", needs: "Kits, Transport", spend: "KES 2,100" },
]

const statusConfig: Record<string, { variant: any; color: string }> = {
  "FULLY SPONSORED": { variant: "success", color: "#16a34a" },
  "PARTIAL": { variant: "warning", color: "#d97706" },
  "URGENT NEED": { variant: "destructive", color: "#dc2626" },
}

const breakdown = [
  { name: "Football Boots", value: 65000 },
  { name: "Training Kits", value: 40000 },
  { name: "Weekend Bus Hire", value: 72000 },
  { name: "Emergency Health", value: 15000 },
]

const settlements = [
  { name: "MATHARE", players: 54 },
  { name: "KIBERA", players: 38 },
  { name: "OTHER", players: 28 },
]

export default function SocialImpactPage() {
  return (
    <>
      <PageHeader title="Nairobi Settlement Impact" description="Tracking unstructured support for 120+ players in Mathare and Kibera.">
        <Button variant="outline" size="sm"><Download className="w-3.5 h-3.5 mr-1.5" />Export PDF</Button>
        <Button size="sm"><Plus className="w-3.5 h-3.5 mr-1.5" />New Disbursement</Button>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Social Spend" value="KES 450,200" change="+12.4%" changeType="up" icon={<Heart className="w-4 h-4" />} />
        <StatCard title="School Fees Paid" value="KES 210,000" change="+5.2%" changeType="up" icon={<BookOpen className="w-4 h-4" />} />
        <StatCard title="Equipment Costs" value="KES 120,000" change="Stable" changeType="neutral" icon={<Package className="w-4 h-4" />} />
        <StatCard title="Transport Costs" value="KES 120,000" change="+15.0%" changeType="up" badge={<span className="text-[10px] font-bold text-brand">KES 6,000 BUS ACTIVE</span>} icon={<Bus className="w-4 h-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Vulnerable Player Tracker */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm">Vulnerable Player Tracker</CardTitle>
              <Button variant="ghost" size="sm" className="text-brand text-xs">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      {["PLAYER", "SETTLEMENT", "SPONSORSHIP STATUS", "CURRENT NEEDS", "TERM SPEND"].map(h => (
                        <th key={h} className="text-left py-2 px-3 text-[10px] font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((p, i) => (
                      <tr key={i} className="border-b border-border/40 hover:bg-muted/20">
                        <td className="py-3 px-3 text-sm font-semibold">{p.name}</td>
                        <td className="py-3 px-3 text-xs text-muted-foreground">{p.settlement}</td>
                        <td className="py-3 px-3"><Badge variant={statusConfig[p.status]?.variant} className="text-[10px]">{p.status}</Badge></td>
                        <td className="py-3 px-3 text-xs text-muted-foreground">{p.needs}</td>
                        <td className="py-3 px-3 text-sm font-semibold">{p.spend}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Settlement Distribution */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Settlement Distribution</CardTitle></CardHeader>
            <CardContent>
              <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-around p-4 mb-3">
                {settlements.map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center mb-2 mx-auto">
                      <div className="text-center">
                        <p className="text-xs font-bold text-white leading-none">{s.players}</p>
                        <p className="text-[10px] text-white/80">Players</p>
                      </div>
                    </div>
                    <p className="text-[10px] font-bold text-foreground">{s.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {/* Category Breakdown */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Category Breakdown</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {breakdown.map((b, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium">{b.name}</span>
                    <span className="text-xs font-bold">KES {b.value.toLocaleString()}</span>
                  </div>
                  <Progress value={(b.value / 72000) * 100} className="h-1.5" />
                </div>
              ))}
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg flex gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-amber-700">TRANSPORT ALERT</p>
                  <p className="text-[11px] text-amber-600">Weekend bus hire at KES 6,000/trip. Budget: 75% utilized.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sponsor CTA */}
          <Card className="bg-foreground text-white border-0">
            <CardContent className="pt-5">
              <h3 className="font-bold text-sm mb-1">Sponsor a Player Today</h3>
              <p className="text-xs text-white/70 mb-4">Provide boots, kit, and transport for one month for just KES 4,500.</p>
              <Button className="w-full bg-white text-foreground hover:bg-white/90 text-sm">Make a Difference</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
