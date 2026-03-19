"use client"
import React, { useState } from "react"
import { PageHeader } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent, Avatar, AvatarFallback, Progress } from "@/components/ui/primitives"
import { MapPin, Edit, Download, Phone, TrendingUp } from "lucide-react"
import AddPlayerModal from "@/components/custom/modals/addPlayerModal"
import EditPlayerModal from "@/components/custom/modals/editPlayerModal"
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";

const players = [
  { id: 1, name: "Mateo Silva", group: "U-14 ACADEMY", position: "Forward", tag: "Elite Prospect", location: "Lisbon Training Center, Pitch 4",
    stats: { goals: 18, goalsTrend: "+4 from last month", assists: 7, assistsAvg: "Season avg: 0.4", passAccuracy: 84, passNote: "Top 5% in Academy" },
    physical: { height: "172 cm", weight: "64 kg", topSpeed: "31.4 km/h", bmi: "21.6" },
    injury: "Fully Fit",
    guardian: { name: "Elena Silva", relation: "Mother" },
    timeline: [
      { date: "OCT 12, 2023", title: "Coaching Note: Finishing Drills", note: "Mateo showed exceptional focus. Improved weak foot striking significantly." },
      { date: "SEP 28, 2023", title: "U-14 Tournament MVP", note: "Led the team to victory in the Regional Cup. Scored 5 goals in 3 matches." },
      { date: "AUG 15, 2023", title: "Physical Assessment", note: "Sprint speed increased by 0.3s over 40m. Vertical leap improved by 2cm." },
    ]
  },
  { id: 2, name: "Kevin Omondi", group: "U-12 ACADEMY", position: "Midfielder", tag: "Sponsored",
    location: "Mathare Valley Training Ground",
    stats: { goals: 8, goalsTrend: "+2 from last month", assists: 12, assistsAvg: "Season avg: 0.6", passAccuracy: 79, passNote: "Top 15% in Academy" },
    physical: { height: "163 cm", weight: "55 kg", topSpeed: "28.8 km/h", bmi: "20.7" },
    injury: "Fully Fit",
    guardian: { name: "James Omondi", relation: "Father" },
    timeline: [
      { date: "NOV 1, 2023", title: "Monthly Review", note: "Excellent positioning and work rate. Needs to improve shooting accuracy." },
    ]
  },
]

export default function PlayersPage() {
  const [selected, setSelected] = useState(players[0])
  const [tab, setTab] = useState("overview")
  const { auth, tokens } = useAuth();


  const fetchPlayers = async () => {
    try {
      const response = await apiClient({
        endpoint: `v1/players?page=1&per_page=100`,
        method: "GET",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOWJmOTcxMS0zNTI5LTRhYzMtOWIxMC02MzJlNjJhMWE0MTkiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzM5NDg3MjcsInR5cGUiOiJhY2Nlc3MifQ.Ez0ivwUJe2eeCZGsj0LkLfoTKyzLoH3_o4LVZwn_v90",
        },
      });

      // setBookings((response.data as any[]) ?? []);
    } catch (error) {
      // toast.error("Failed to fetch your submitted requests.");
    } finally {
      // setLoading(false);
    }
  };

  React.useEffect(() => {fetchPlayers()},[tokens]);

  return (
    <>
      <PageHeader title="Players" description="Player profiles, development & analytics">
        <AddPlayerModal />
      </PageHeader>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Player List */}
        <div className="space-y-2">
          <input className="w-full h-9 pl-3 pr-4 rounded-lg border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand/20" placeholder="Search players..." />
          {players.map(p => (
            <div key={p.id} onClick={() => setSelected(p)}
              className={`cursor-pointer p-3 rounded-xl border transition-all ${selected.id === p.id ? "border-brand bg-brand/5" : "border-border bg-white hover:border-brand/30"}`}>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10"><AvatarFallback>{p.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback></Avatar>
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.position} · {p.group}</p>
                </div>
                <Badge variant="brand" className="ml-auto text-[10px] shrink-0">{p.tag}</Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Detail */}
        <div className="xl:col-span-3 space-y-4">
          {/* Header */}
          <Card>
            <CardContent className="pt-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <Avatar className="h-16 w-16 border-2 border-white shadow">
                  <AvatarFallback className="text-lg">{selected.name.split(" ").map(n=>n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h2 className="text-xl font-bold">{selected.name}</h2>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        <Badge variant="secondary" className="text-[10px]">{selected.group}</Badge>
                        <Badge variant="outline" className="text-[10px]">{selected.position}</Badge>
                        <Badge variant="brand" className="text-[10px]">{selected.tag}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1.5"><MapPin className="w-3 h-3" />{selected.location}</p>
                    </div>
                    <div className="flex gap-2">
                      <EditPlayerModal></EditPlayerModal>
                      {/* <Button size="sm"><Download className="w-3.5 h-3.5 mr-1.5" />Export Report</Button> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={tab} onValueChange={setTab} className="mt-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="tactical">Tactical Analysis</TabsTrigger>
                  <TabsTrigger value="scouting">Scouting Notes</TabsTrigger>
                  <TabsTrigger value="video">Video Highlights</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Performance */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3">Performance Overview</h3>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[
                          { label: "Goals", value: selected.stats.goals, note: selected.stats.goalsTrend },
                          { label: "Assists", value: selected.stats.assists, note: selected.stats.assistsAvg },
                          { label: "Pass Accuracy", value: `${selected.stats.passAccuracy}%`, note: selected.stats.passNote },
                        ].map(s => (
                          <div key={s.label} className="text-center p-3 bg-muted/40 rounded-lg">
                            <p className="text-xl font-bold text-brand">{s.value}</p>
                            <p className="text-[10px] text-muted-foreground">{s.label}</p>
                            <p className="text-[10px] text-green-600 mt-0.5">{s.note}</p>
                          </div>
                        ))}
                      </div>
                      <h3 className="text-sm font-semibold mb-2">Development Timeline</h3>
                      <div className="space-y-3">
                        {selected.timeline.map((t, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className="w-2.5 h-2.5 rounded-full bg-brand mt-1" />
                              {i < selected.timeline.length - 1 && <div className="w-0.5 flex-1 bg-border mt-1" />}
                            </div>
                            <div className="pb-3">
                              <p className="text-[10px] font-bold text-brand">{t.date}</p>
                              <p className="text-xs font-semibold">{t.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{t.note}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right side */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Physical Attributes</h3>
                        <div className="space-y-2">
                          {Object.entries(selected.physical).map(([k, v]) => (
                            <div key={k} className="flex justify-between py-1.5 px-3 bg-muted/40 rounded-lg">
                              <span className="text-xs text-muted-foreground capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
                              <span className="text-xs font-semibold">{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Injury History</h3>
                        <div className={`p-3 rounded-lg border ${selected.injury === "Fully Fit" ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}`}>
                          <p className="text-xs font-semibold text-green-700">{selected.injury}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">No active injuries recorded.</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Guardian Info</h3>
                        <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">{selected.guardian.name[0]}</AvatarFallback></Avatar>
                            <div>
                              <p className="text-xs font-semibold">{selected.guardian.name}</p>
                              <p className="text-[11px] text-muted-foreground">{selected.guardian.relation}</p>
                            </div>
                          </div>
                          <button className="p-2 rounded-lg bg-brand/10 text-brand hover:bg-brand hover:text-white transition-colors">
                            <Phone className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="tactical">
                  <div className="h-48 flex items-center justify-center bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Tactical analysis visualisation coming soon</p>
                  </div>
                </TabsContent>

                <TabsContent value="scouting">
                  <div className="h-48 flex items-center justify-center bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Scouting notes will appear here</p>
                  </div>
                </TabsContent>

                <TabsContent value="video">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {["Regional Cup Final", "U-14 League Day 8", "Training Highlights"].map((v, i) => (
                      <div key={i} className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-brand/80 flex items-center justify-center group-hover:bg-brand transition-colors">
                          <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                        </div>
                        <p className="absolute bottom-2 left-2 right-2 text-[10px] font-medium text-white bg-black/50 rounded px-1.5 py-0.5 truncate">{v}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
