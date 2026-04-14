"use client"
import React, { useState } from "react"
import { PageHeader, StatCard } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/primitives"
import { Calendar, DollarSign } from "lucide-react"
import AddSessionModal from "@/components/custom/modals/addSessionModal"
import EditSessionModal from "@/components/custom/modals/editSessionModal"
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/primitives"
import { Session } from "@/types/sessions";
import { Loader2 } from "lucide-react";
import { ApiResponse } from "@/types/api-response";

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
  const { user, tokens } = useAuth();
  const [tab, setTab] = useState("individual")
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true);




  const fetchSessions = async () => {
    try {
      const response = await apiClient<ApiResponse<Session[]>>({
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
          (
            <>
                  <PageHeader title="Coach Dashboard" description="Your sessions, earnings, and activity at a glance." />

<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
  <Card className="sm:col-span-1 bg-brand text-white border-0">
    <CardContent className="pt-5">
      <p className="text-sm font-medium text-white/80">Good morning,</p>
      <p className="text-xl font-bold mt-0.5">Coach {user?.first_name}</p>
      <p className="text-xs text-white/70 mt-2">You have 4 elite training sessions scheduled for today.</p>
      {/* <Button size="sm" className="mt-3 bg-white text-brand hover:bg-white/90"><Calendar className="w-3.5 h-3.5 mr-1.5" />View Schedule</Button> */}
      <AddSessionModal onSubmit={fetchSessions}/>
    </CardContent>
  </Card>
  <StatCard title="Sessions This Week" value="24" change="+12%" changeType="up" icon={<Calendar className="w-4 h-4" />} />
  <StatCard title="Pending Payout" value="KES 12,500" icon={<DollarSign className="w-4 h-4" />} />
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">
                    {/* Tabs */}
                    <Tabs value={tab} onValueChange={setTab} className="mt-4">
              <TabsList>
                <TabsTrigger value="individual">Individual</TabsTrigger>
                <TabsTrigger value="group">Group</TabsTrigger>
              </TabsList>

              <TabsContent value="individual">
              
              <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm">Sessions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sessions.filter(s => s.type === 'individual').map((s, i) => (
          <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border`}>
            <Avatar className="h-10 w-10"><AvatarFallback>{s.name.charAt(0)}</AvatarFallback></Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold truncate">{s.name}</p>
               
              </div>
              <p className="text-xs text-muted-foreground">{s.start_time} - {s.end_time}</p>
              <p className="text-xs text-muted-foreground">{s.session_date}</p>
              <p className="text-[11px] text-muted-foreground">Players:  <Badge>{s.enrollment_cap}</Badge></p>
            </div>
            
            {/* <AttendanceTrackerModal/> */}
            <EditSessionModal/>
          </div>
        ))}
      </CardContent>
    </Card>
  
              </TabsContent>

              <TabsContent value="group">
              <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm">Sessions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sessions.filter(s => s.type === 'group').map((s, i) => (
          <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border`}>
            <Avatar className="h-10 w-10"><AvatarFallback>{s.name.charAt(0)}</AvatarFallback></Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold truncate">{s.name}</p>
               
              </div>
              <p className="text-xs text-muted-foreground">{s.start_time} - {s.end_time}</p>
              <p className="text-xs text-muted-foreground">{s.session_date}</p>
              <p className="text-[11px] text-muted-foreground">Players:  <Badge>{s.enrollment_cap}</Badge></p>
            </div>
            
            {/* <AttendanceTrackerModal/> */}
            <EditSessionModal/>
          </div>
        ))}
      </CardContent>
    </Card>
              </TabsContent>


            </Tabs>
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
</div></>
          )}

    </>
  )
}
