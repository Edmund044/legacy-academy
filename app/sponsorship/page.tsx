"use client"
import React from "react"
import { PageHeader } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/primitives"
import { Plus, Upload, Download, FileText, CheckCircle2, XCircle } from "lucide-react"

const costLog = [
  { date: "Oct 12, 2023", category: "Equipment", desc: "Professional Football Boots", amount: "KES 12,500" },
  { date: "Oct 05, 2023", category: "Transport", desc: "Tournament Travel Stipend", amount: "KES 4,000" },
]

const receipts = ["Boots_Receipt.jpg", "Term1_Fees.pdf"]

export default function SponsorshipPage() {
  return (
    <>
      <PageHeader title="Sponsorship Case Management" description="Joseph Kamau — SPONSOR-2024-089">
        <Badge variant="success">Active Sponsorship</Badge>
        <Button variant="outline" size="sm"><Download className="w-3.5 h-3.5 mr-1.5" />Export Case</Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Annual Budget", value: "KES 250,000", sub: null, color: "bg-white" },
          { label: "Total Spent", value: "KES 115,000", sub: "46% used", color: "bg-white" },
          { label: "Remaining Funds", value: "KES 135,000", sub: null, color: "bg-white" },
        ].map((s, i) => (
          <Card key={i}>
            <CardContent className="pt-5">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${i === 1 ? "text-brand" : i === 2 ? "text-green-600" : "text-foreground"}`}>{s.value}</p>
              {s.sub && <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>}
              <Progress value={i === 0 ? 100 : i === 1 ? 46 : 54} className={`h-1.5 mt-2 ${i === 2 ? "[&>div]:bg-green-500" : ""}`} />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm">Cost Log (Equipment & Transport)</CardTitle>
              <Button size="sm"><Plus className="w-3.5 h-3.5 mr-1.5" />Add Entry</Button>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {["DATE", "CATEGORY", "DESCRIPTION", "AMOUNT"].map(h => (
                      <th key={h} className="text-left py-2 px-3 text-[10px] font-semibold text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {costLog.map((c, i) => (
                    <tr key={i} className="border-b border-border/40 hover:bg-muted/20">
                      <td className="py-3 px-3 text-xs text-muted-foreground">{c.date}</td>
                      <td className="py-3 px-3"><Badge variant={c.category === "Equipment" ? "info" : "secondary"} className="text-[10px]">{c.category}</Badge></td>
                      <td className="py-3 px-3 text-sm">{c.desc}</td>
                      <td className="py-3 px-3 text-sm font-bold">{c.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Case Notes</CardTitle></CardHeader>
            <CardContent>
              <textarea className="w-full h-20 rounded-lg border border-input bg-muted/30 p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand/20" placeholder="Add a new observation or update..." />
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs font-semibold">Case Manager Sarah <span className="text-muted-foreground font-normal">— 2 days ago</span></p>
                <p className="text-xs text-muted-foreground mt-1">Player has shown exceptional discipline in training this month. Suggested to review equipment needs for next quarter.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">School Fee Status</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {[{ term: "Term 1 (2024)", status: "Paid" }, { term: "Term 2 (2024)", status: "Pending" }].map((t, i) => (
                <div key={i} className="flex items-center justify-between py-1.5">
                  <span className="text-xs">{t.term}</span>
                  <div className="flex items-center gap-1">
                    {t.status === "Paid" ? <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> : <XCircle className="w-3.5 h-3.5 text-red-500" />}
                    <span className={`text-xs font-semibold ${t.status === "Paid" ? "text-green-600" : "text-red-500"}`}>{t.status}</span>
                  </div>
                </div>
              ))}
              <div className="mt-2 p-2.5 bg-muted/40 rounded-lg">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Policy Note</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Fees must be cleared by the 10th. Proof of performance (B average) required for renewal.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Receipts & Evidence</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {receipts.map((r, i) => (
                  <div key={i} className="aspect-[4/3] bg-muted/40 rounded-lg border border-border flex flex-col items-center justify-center gap-1 p-2">
                    <FileText className="w-6 h-6 text-muted-foreground" />
                    <p className="text-[10px] text-muted-foreground text-center truncate w-full text-center">{r}</p>
                  </div>
                ))}
              </div>
              <button className="w-full border-2 border-dashed border-border rounded-lg p-3 flex flex-col items-center gap-1 hover:border-brand transition-colors group">
                <Upload className="w-4 h-4 text-muted-foreground group-hover:text-brand" />
                <p className="text-xs text-muted-foreground group-hover:text-brand">Upload Receipt</p>
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
