"use client"
import React from "react"
import { PageHeader } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Download, MessageSquare, CheckCircle2 } from "lucide-react"
import { useAuth } from "@/context/auth-context";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

const sessions = [
  { date: "Oct 24, 2023", player: "Mateo Silva", type: "Technical Drill", charge: "KES 800", status: "PENDING" },
  { date: "Oct 23, 2023", player: "Sofia Silva", type: "Match Play", charge: "KES 800", status: "PENDING" },
  { date: "Oct 21, 2023", player: "Mateo Silva", type: "Technical Drill", charge: "KES 800", status: "PAID" },
  { date: "Oct 20, 2023", player: "Sofia Silva", type: "Conditioning", charge: "KES 800", status: "PAID" },
]

const invoices = [
  { id: "INV-2023-009", date: "Sep 30, 2023", amount: "KES 4,800" },
  { id: "INV-2023-008", date: "Aug 31, 2023", amount: "KES 5,200" },
  { id: "INV-2023-007", date: "Jul 31, 2023", amount: "KES 14,000" },
]

export default function BillingPage() {
  const { tokens,user } = useAuth();
  const config = {
    reference: uuidv4(),
    email: user?.email || "legacyuser@gmail.com",
    // amount: Math.round(total * 100),
    amount: 100,
    publicKey: "pk_live_27803e8ab6af25269cdf63a08e344f7c9c06a99c",
    currency: "KES",
    metadata: {
      custom_fields: [
        {
          display_name: "User ID",
          variable_name: "user_id",
          value: user?.id || "unknown_user_id",
        },
      ],
    },
  };
  return (
    <>
      <PageHeader title="Subscription & Billing" description="Manage memberships, training fees, and scholarship credits for your family.">
        <Button size="sm">Settle Outstanding Fees</Button>
      </PageHeader>

      {/* Annual Membership */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />Annual Elite Membership</CardTitle>
          <Badge variant="success">ACTIVE</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { player: "Mateo Silva", label: "PLAYER 1", tag: "SCHOLARSHIP APPLIED", tagVariant: "brand", origPrice: "KES 14,000 / year", finalPrice: "KES 0", finalColor: "text-brand", note: "100% Sponsored Credit" },
              { player: "Sofia Silva", label: "PLAYER 2", tag: "SIBLING DISCOUNT", tagVariant: "info", origPrice: "KES 14,000 / year", finalPrice: "KES 11,900", finalColor: "text-foreground", note: "15% Sibling Discount" },
            ].map((p, i) => (
              <div key={i} className="p-4 bg-muted/30 rounded-xl border border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] text-muted-foreground font-bold">{p.label}</p>
                  <Badge variant={p.tagVariant as any} className="text-[10px]">{p.tag}</Badge>
                </div>
                <p className="text-lg font-bold">{p.player}</p>
                <p className="text-xs text-muted-foreground line-through mt-1">{p.origPrice}</p>
                <p className={`text-xl font-bold ${p.finalColor}`}>{p.finalPrice}</p>
                <p className="text-[11px] text-muted-foreground">{p.note}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">Next renewal date: Jan 15, 2025</p>
            <PaystackButton
                {...config}
                text="Renew Membership"
                className="w-full bg-red-700 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                onSuccess={() => console.log("Payment was a success")}
                onClose={() => console.log("Payment was cancelled")}
              />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm">Attendance-Based Billing (Pay-As-You-Go)</CardTitle>
              <Badge variant="secondary" className="text-[10px]">Current Cycle: Oct 2023</Badge>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {["DATE", "PLAYER", "SESSION TYPE", "CHARGE", "STATUS"].map(h => (
                      <th key={h} className="text-left py-2 px-3 text-[10px] font-semibold text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s, i) => (
                    <tr key={i} className="border-b border-border/40 hover:bg-muted/20">
                      <td className="py-2.5 px-3 text-xs text-muted-foreground">{s.date}</td>
                      <td className="py-2.5 px-3 text-sm font-medium">{s.player}</td>
                      <td className="py-2.5 px-3 text-xs text-brand">{s.type}</td>
                      <td className="py-2.5 px-3 text-sm font-semibold">{s.charge}</td>
                      <td className="py-2.5 px-3"><Badge variant={s.status === "PAID" ? "success" : "warning"} className="text-[10px]">{s.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">Showing last 4 sessions this week</p>
                <p className="text-sm font-bold">Total Due: <span className="text-brand">KES 1,600</span></p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-brand/20 bg-brand/5">
            <CardContent className="pt-5">
              <p className="text-xs font-bold text-brand">PLAYER PROFILE: MATEO SILVA</p>
              <p className="text-sm font-semibold mt-1">Elite Talent Program Sponsorship</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between"><span className="text-xs text-muted-foreground">Annual Fee Relief:</span><span className="text-xs font-bold text-green-600">100%</span></div>
                <div className="flex justify-between"><span className="text-xs text-muted-foreground">Training Credit:</span><span className="text-xs font-bold">KES 2,000 / mo</span></div>
              </div>
              <p className="text-[11px] text-muted-foreground mt-2 italic">Scholarship maintained on 90% attendance and quarterly performance reviews.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Recent Invoices</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {invoices.map((inv, i) => (
                <div key={i} className="flex items-center justify-between py-1.5">
                  <div>
                    <p className="text-xs font-semibold">{inv.id}</p>
                    <p className="text-[11px] text-muted-foreground">{inv.date} · {inv.amount}</p>
                  </div>
                  <button className="p-1.5 rounded-lg bg-brand/10 text-brand hover:bg-brand hover:text-white transition-colors">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full text-xs">View All History</Button>
            </CardContent>
          </Card>

          <div className="p-4 bg-foreground text-white rounded-xl">
            <p className="text-sm font-bold">Need help with billing?</p>
            <p className="text-xs text-white/70 mt-1">Our finance team is available Mon–Fri, 8 AM – 5 PM EAT.</p>
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline" className="flex-1 border-white/30 text-white hover:bg-white/10"><MessageSquare className="w-3.5 h-3.5 mr-1.5" />Contact Finance</Button>
              <Button size="sm" className="flex-1 bg-brand hover:bg-brand-dark"><CreditCard className="w-3.5 h-3.5 mr-1.5" />Update Payment</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
