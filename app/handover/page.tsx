"use client"
import React, { useState } from "react"
import { PageHeader } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, AlertCircle, Package } from "lucide-react"
import CompleteHandover from "@/components/custom/modals/completeHandover"
import CheckoutHandover from "@/components/custom/modals/checkoutEquipment"
import { apiClient } from "@/lib/api-client";
import { Loader2 } from "lucide-react";
import { Session } from "@/types/sessions";
import { useAuth } from "@/context/auth-context";
import { Tabs, TabsList, TabsTrigger, TabsContent,  Progress } from "@/components/ui/primitives"

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
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([])
  const { auth, tokens } = useAuth();
  const [tab, setTab] = useState("upcoming")

  const handleSubmit = async () => {
    try {
      await apiClient({
        endpoint: "/v1/equipment/inventory",
        method: "POST",
        headers: {
          // Authorization: `Bearer ${tokens?.accessToken}`,
          "Authorization": "Bearer ",
          "Content-Type": "application/json",
        },
        body: {
          "name": "Mikasa big balls",
          "category": "balls",
          "sku": "ball-001",
          "stock_total": 20,
          "condition": "excellent",
          "replacement_cost_usd": 100,
          "campus_id": "979a583b-97ae-4575-9625-6d6a7d57e8c5"
        },
      });
      // setOpen(false);
      // onConfirm();
      // toast.success("Availability confirmed!");
    } catch (error) {
      // toast.error("Something went wrong. Please try again later.");
    }
    finally{
      setLoading(false)
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await apiClient({
        endpoint: `v1/sessions?status=planned&page=1&per_page=100`,
        method: "GET",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOWJmOTcxMS0zNTI5LTRhYzMtOWIxMC02MzJlNjJhMWE0MTkiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzM5NDg3MjcsInR5cGUiOiJhY2Nlc3MifQ.Ez0ivwUJe2eeCZGsj0LkLfoTKyzLoH3_o4LVZwn_v90",
        },
      });

      setSessions((response.data as any[]) ?? []);
    } catch (error) {
      alert("Failed to fetch equipment inventory. Please try again later.");
      // toast.error("Failed to fetch your submitted requests.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSessions();
  }, [tokens]);

  return (
    <>
    {loading ? (
      <div className="flex items-center justify-center mt-50">
      {/* The animate-spin class makes the icon rotate infinitely */}
      <Loader2 className="animate-spin h-20 w-20 text-red-600" />
    </div>

):
(    <>
  <PageHeader title="Equipment Handover & Accountability" description="Track professional gear check-outs, manage returns, and oversee coach liability." />

  <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
    <div className="lg:col-span-2 space-y-4">
                          {/* Tabs */}
                          <Tabs value={tab} onValueChange={setTab} className="mt-4">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
                <TabsTrigger value="active">Active Session</TabsTrigger>
                {/* <TabsTrigger value="completed">Completed Returns</TabsTrigger> */}
                {/* <TabsTrigger value="coach_accountability">Coach Accountability</TabsTrigger> */}
              </TabsList>

              <TabsContent value="upcoming">
                      {/* Upcoming */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm flex items-center gap-2"><Package className="w-4 h-4 text-brand" />Upcoming Sessions (Today)</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {sessions.filter(s => s.status === 'planned').map((s, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border">
              <div className="text-center bg-brand text-white rounded-lg px-2.5 py-2 min-w-[50px]">
                <p className="text-sm font-bold leading-none">{s.session_date}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.coach}</p>
              </div>
              <CheckoutHandover coachId={s.coach_id} sessionId={s.id}/>
            </div>
          ))}
        </CardContent>
      </Card>
                </TabsContent>
                <TabsContent value="completed">
                      {/* Completed */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm flex items-center gap-2"><Package className="w-4 h-4 text-brand" />Completed Sessions</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {sessions.filter(s => s.status === 'planned').map((s, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border">
              <div className="text-center bg-brand text-white rounded-lg px-2.5 py-2 min-w-[50px]">
                <p className="text-sm font-bold leading-none">{s.session_date}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.coach}</p>
              </div>
              <CheckoutHandover/>
            </div>
          ))}
        </CardContent>
      </Card>
                </TabsContent>
                <TabsContent value="active">
      {/* Pending */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm">Pending Returns</CardTitle></CardHeader>
        <CardContent>
          {sessions.filter(s => s.status === 'planned').map((p, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border">
              {/* <div>
              <p className="bg-brand text-white rounded-lg px-2.5 py-2  text-sm font-bold leading-none">{p.session_date}</p>
                <p className="text-sm font-semibold">Coach {p.coach}</p>
                <p className="text-xs text-muted-foreground">{p.name}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{p.type}</p>
              </div> */}
                            <div className="text-center bg-brand text-white rounded-lg mr-2 px-2.5 py-2 min-w-[50px]">
                <p className="text-sm font-bold leading-none">{p.session_date}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.coach}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant="warning" className="text-[10px]">{p.status}</Badge>
                <CompleteHandover />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
                </TabsContent>
                <TabsContent value="coach_accountability">
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
                </TabsContent>
                </Tabs>




    </div>

    {/* <div className="space-y-4"> */}
      {/* Coach Accountability */}
      {/* <Card>
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
      </Card> */}

      {/* Active Handover Panel */}
      {/* {activeHandover && (
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
      )} */}
    {/* </div> */}
  </div>
</>)}
</>
  )
}
