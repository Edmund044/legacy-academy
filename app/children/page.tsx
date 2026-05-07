"use client"
import React, { useState } from "react"
import { PageHeader } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent, Avatar, AvatarFallback } from "@/components/ui/primitives"
import { MapPin, Phone } from "lucide-react"
import PayModal from "@/components/custom/modals/payModal";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";
import { Loader2 } from "lucide-react";
import { PlayerProfile } from "@/types/players";
import { ApiResponse } from "@/types/api-response";
import { Session } from "@/types/sessions";
import { Calendar, DollarSign } from "lucide-react"
import { CardHeader, CardTitle } from "@/components/ui/card"

const players2 = [
  {
    id: "player-001",
    first_name: "Brian",
    last_name: "Otieno",
    dob: "2010-06-15",
    position: "forward",
    status: "active",

    group_id: "grp-001",
    campus_id: "campus-01",

    group_name: {
      id: "grp-001",
      age_group: "U12",
      coach_id: "coach-001",
      name: "Junior Lions",
      division: "East League",
      campus_id: "campus-01",
      created_at: "2025-01-10T08:30:00Z",
    },

    guardian: "James Otieno",
    sponsored: 1,
    training_center: "Nairobi West",

    stats: {
      goals: 12,
      assists: 5,
      pass_accuracy: 78,
    },

    physical: {
      height: 150,
      weight: 45,
      bmi: 20,
    },

    created_at: "2025-03-01T09:00:00Z",
  },

  {
    id: "player-002",
    first_name: "Kevin",
    last_name: "Mwangi",
    dob: "2008-03-22",
    position: "midfielder",
    status: "active",

    group_id: "grp-002",
    campus_id: "campus-02",

    group_name: {
      id: "grp-002",
      age_group: "U16",
      coach_id: "coach-002",
      name: "Rising Stars",
      division: "West League",
      campus_id: "campus-02",
      created_at: "2025-02-15T10:00:00Z",
    },

    guardian: "Mary Mwangi",
    sponsored: 0,
    training_center: "Karen",

    stats: {
      goals: 4,
      assists: 11,
      pass_accuracy: 85,
    },

    physical: {
      height: 168,
      weight: 60,
      bmi: 21.3,
    },

    created_at: "2025-03-05T11:20:00Z",
  },

  {
    id: "player-003",
    first_name: "Samuel",
    last_name: "Kiptoo",
    dob: "2009-11-02",
    position: "goalkeeper",
    status: "inactive",

    group_id: "grp-001",
    campus_id: "campus-01",

    group_name: {
      id: "grp-001",
      age_group: "U12",
      coach_id: "coach-001",
      name: "Junior Lions",
      division: "East League",
      campus_id: "campus-01",
      created_at: "2025-01-10T08:30:00Z",
    },

    guardian: null,
    sponsored: 1,
    training_center: null,

    stats: {
      goals: 0,
      assists: 0,
      pass_accuracy: null,
    },

    physical: {
      height: 155,
      weight: 50,
      bmi: null,
    },

    created_at: "2025-03-10T14:45:00Z",
  },

  {
    id: "player-004",
    first_name: "Daniel",
    last_name: "Ochieng",
    dob: "2011-08-19",
    position: "defender",
    status: "active",

    group_id: "grp-001",
    campus_id: "campus-01",

    group_name: {
      id: "grp-001",
      age_group: "U12",
      coach_id: "coach-001",
      name: "Junior Lions",
      division: "East League",
      campus_id: "campus-01",
      created_at: "2025-01-10T08:30:00Z",
    },

    guardian: "Peter Ochieng",
    sponsored: 0,
    training_center: "Langata",

    stats: {
      goals: 1,
      assists: 2,
      pass_accuracy: 72,
    },

    physical: {
      height: null,
      weight: null,
      bmi: null,
    },

    created_at: "2025-03-12T16:00:00Z",
  },
]

// const players2 = [
//   {
//     "id": "b7671cd6-406b-4eec-b232-53c9c8e7a6f0",
//     "first_name": "Player1_f",
//     "last_name": "Player1_l",
//     "dob": "1998-03-17",
//     "position": "defender",
//     "status": "active",
//     "group_id": "971a583b-97ae-4575-9625-6d6a7d57e8c5",
//     "campus_id": "979a583b-97ae-4575-9625-6d6a7d57e8c5",
//     "group_name": {
//       "id": "971a583b-97ae-4575-9625-6d6a7d57e8c5",
//       "age_group": "17-19",
//       "coach_id": "d574f8cc-2ed3-4248-862c-e590d61f15ec",
//       "name": "Under-19",
//       "division": "6",
//       "campus_id": "979a583b-97ae-4575-9625-6d6a7d57e8c5",
//       "created_at": "2026-03-17T09:33:38.889461+00:00"
//     },
//     "guardian": null,
//     "sponsored": 0,
//     "training_center": null,
//     "stats": {
//       "goals": null,
//       "assists": null,
//       "pass_accuracy": null
//     },
//     "physical": {
//       "height": null,
//       "weight": null,
//       "bmi": null
//     },
//     "created_at": "2026-03-17T09:48:36.195018+00:00"
//   },
//   // { id: 1, name: "Mateo Silva", group: "U-14 ACADEMY", position: "Forward", tag: "Elite Prospect", location: "Lisbon Training Center, Pitch 4",
//   //   stats: { goals: 18, goalsTrend: "+4 from last month", assists: 7, assistsAvg: "Season avg: 0.4", passAccuracy: 84, passNote: "Top 5% in Academy" },
//   //   physical: { height: "172 cm", weight: "64 kg", topSpeed: "31.4 km/h", bmi: "21.6" },
//   //   injury: "Fully Fit",
//   //   guardian: { name: "Elena Silva", relation: "Mother" },
//   //   timeline: [
//   //     { date: "OCT 12, 2023", title: "Coaching Note: Finishing Drills", note: "Mateo showed exceptional focus. Improved weak foot striking significantly." },
//   //     { date: "SEP 28, 2023", title: "U-14 Tournament MVP", note: "Led the team to victory in the Regional Cup. Scored 5 goals in 3 matches." },
//   //     { date: "AUG 15, 2023", title: "Physical Assessment", note: "Sprint speed increased by 0.3s over 40m. Vertical leap improved by 2cm." },
//   //   ]
//   // },
//   // { id: 2, name: "Kevin Omondi", group: "U-12 ACADEMY", position: "Midfielder", tag: "Sponsored",
//   //   location: "Mathare Valley Training Ground",
//   //   stats: { goals: 8, goalsTrend: "+2 from last month", assists: 12, assistsAvg: "Season avg: 0.6", passAccuracy: 79, passNote: "Top 15% in Academy" },
//   //   physical: { height: "163 cm", weight: "55 kg", topSpeed: "28.8 km/h", bmi: "20.7" },
//   //   injury: "Fully Fit",
//   //   guardian: { name: "James Omondi", relation: "Father" },
//   //   timeline: [
//   //     { date: "NOV 1, 2023", title: "Monthly Review", note: "Excellent positioning and work rate. Needs to improve shooting accuracy." },
//   //   ]
//   // },
// ]

export default function PlayersPage() {
  const [players, setPlayers] = useState<PlayerProfile[]>([])
  const [selected, setSelected] = useState<PlayerProfile>(players2[0])
  const [tab, setTab] = useState("overview")
  const { user,tokens } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([])
  const [playerId, setPlayerId] = useState<string>("")
  

  const fetchPlayers = async () => {
    try {
      const response = await apiClient<ApiResponse<PlayerProfile[]>>({
        endpoint: `v1/players?guardian_id=${user?.id}&page=1&per_page=100`,
        method: "GET",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOWJmOTcxMS0zNTI5LTRhYzMtOWIxMC02MzJlNjJhMWE0MTkiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzM5NDg3MjcsInR5cGUiOiJhY2Nlc3MifQ.Ez0ivwUJe2eeCZGsj0LkLfoTKyzLoH3_o4LVZwn_v90",
        },
      });

      setPlayers((response.data as PlayerProfile[]) ?? []);
      setSelected((response.data as PlayerProfile[])[0] ?? []);
    } catch (error) {
      alert("Failed to fetch players. Please try again later.");
      // toast.error("Failed to fetch your submitted requests.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await apiClient<ApiResponse<Session[]>>({
        endpoint: `v1/sessions?status=planned&page=1&per_page=100`,
        method: "GET",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOWJmOTcxMS0zNTI5LTRhYzMtOWIxMC02MzJlNjJhMWE0MTkiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzM5NDg3MjcsInR5cGUiOiJhY2Nlc3MifQ.Ez0ivwUJe2eeCZGsj0LkLfoTKyzLoH3_o4LVZwn_v90",
        },
      });

      setSessions((response.data as Session[]) ?? []);
    } catch (error) {
      alert("Failed to fetch sessions. Please try again later.");
      // toast.error("Failed to fetch your submitted requests.");
    } finally {
      setLoading(false);
    }
  };

  const handlEnroll = async (sessionId:string,player_id: string) => {
    try {
      setLoadingButton(true);
      const response = await apiClient<ApiResponse<Session[]>>({
        endpoint: `v1/sessions/${sessionId}/enroll`,
        method: "POST",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOWJmOTcxMS0zNTI5LTRhYzMtOWIxMC02MzJlNjJhMWE0MTkiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzM5NDg3MjcsInR5cGUiOiJhY2Nlc3MifQ.Ez0ivwUJe2eeCZGsj0LkLfoTKyzLoH3_o4LVZwn_v90",
        },
        body: {
          player_id: player_id,
          billing_method: "pay_as_you_go",
          player_eligibility: "none"
        }
      });

    } catch (error) {
      alert("Failed to enroll student. Please try again later.");
    } finally {
      setLoadingButton(false);
    }

  }

  React.useEffect(() => {fetchPlayers(),fetchSessions()},[tokens]);

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
                  <PageHeader title="Players" description="Player profiles, development & analytics">
      </PageHeader>
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Player List */}
            <div className="space-y-2">
              <input className="w-full h-9 pl-3 pr-4 rounded-lg border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand/20" placeholder="Search players..." />
              {players.map(p => (
                <div key={p.id} onClick={() => setSelected(p)}
                  className={`cursor-pointer p-3 rounded-xl border transition-all ${selected?.id === p.id ? "border-brand bg-brand/5" : "border-border bg-white hover:border-brand/30"}`}>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10"><AvatarFallback>{(p.first_name[0])}</AvatarFallback></Avatar>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">{p.first_name + " " + p.last_name}</p>
                      <p className="text-xs text-muted-foreground">{p.position} ·  </p>
                    </div>
                    <Badge variant="brand" className="ml-auto text-[10px] shrink-0">{p.sponsored == 1 ? "Sponsored" : "Paid" }</Badge>
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
                      <AvatarFallback className="text-lg">{(selected?.first_name[0])}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h2 className="text-xl font-bold">{(selected?.first_name + " " + selected?.last_name)}</h2>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            <Badge variant="secondary" className="text-[10px]">{selected?.group_name?.name || 'Under 11' }</Badge>
                            <Badge variant="outline" className="text-[10px]">{selected?.position}</Badge>
                            <Badge variant="brand" className="text-[10px]">{selected?.sponsored == 1 ? "Sponsored" : "Paid" }</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1.5"><MapPin className="w-3 h-3" />{selected?.training_center}</p>
                        </div>
                        <div className="flex gap-2">
                          {/* <Button size="sm"><Download className="w-3.5 h-3.5 mr-1.5" />Export Report</Button> */}
                        </div>
                      </div>
                    </div>
                  </div>
    
                  {/* Tabs */}
                  <Tabs value={tab} onValueChange={setTab} className="mt-4">
                    <TabsList>
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="enroll">Enroll Session</TabsTrigger>
                      {/* <TabsTrigger value="tactical">Tactical Analysis</TabsTrigger>
                      <TabsTrigger value="scouting">Scouting Notes</TabsTrigger>
                      <TabsTrigger value="video">Video Highlights</TabsTrigger> */}
                    </TabsList>
                    <TabsContent value="enroll">

                    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-sm">Sessions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
      {sessions.map((c, i) => (
                      <div key={i}
                        className={`cursor-pointer p-3 rounded-xl border transition-all border-border hover:border-brand/30"`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-10 w-10"><AvatarFallback className="text-xs">{c.name.split(" ").slice(-1)[0][0]}</AvatarFallback></Avatar>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold truncate">{c.name}</p>
                            <p className="text-[10px] text-brand font-medium"><span>{c.start_time} - {c.end_time}</span></p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {c.session_date}
                        </div>
                        <p className="text-xs font-medium mt-1">{c.enrollment_cap}</p>
                        <PayModal 
            paymentRequest={{
              amount: 1,
              itemName: c.name,
              itemDescription: c.type,
              paymentFor: "elite training",
              buttonText: "Enroll Now"
            }}
            onClose={() => console.log("Modal closed")}
            onSuccess={() => handlEnroll(c.id,selected.id)}

            
            ></PayModal>
                      </div>
                    ))}
                    </div>
        {/* {sessions.filter(s => s.type === 'individual').map((s, i) => (

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

            <PayModal 
            paymentRequest={{
              amount: 1,
              itemName: s.name,
              itemDescription: s.type,
              paymentFor: "elite training",
              buttonText: "Enroll Now"
            }}
            onClose={() => console.log("Modal closed")}
            onSuccess={() => handlEnroll(s.id)}

            
            ></PayModal>
              <Button
            key={s.id}
            size="sm"
            onClick={() => toggleEnroll(s.id)}
          >
            {loadingButton && <span className="w-1.5 h-1.5 rounded-full bg-white live-dot mr-1.5" />}
            {enrolledRecordId === s.id ? "Undo" : "Enroll"}
          </Button>

          </div>
        ))} */}
      </CardContent>
    </Card>
                    </TabsContent>
    
                    <TabsContent value="overview">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Performance */}
                        <div>
                          <h3 className="text-sm font-semibold mb-3">Performance Overview</h3>
                          <div className="grid grid-cols-3 gap-2 mb-4">
                            {[
                              { label: "Goals", value: selected?.stats.goals, note: selected?.stats.goals },
                              { label: "Assists", value: selected?.stats.assists, note: selected?.stats.assists },
                              { label: "Pass Accuracy", value: `${selected?.stats.pass_accuracy}%`, note: selected?.stats.pass_accuracy },
                            ].map(s => (
                              <div key={s.label} className="text-center p-3 bg-muted/40 rounded-lg">
                                <p className="text-xl font-bold text-brand">{s.value}</p>
                                <p className="text-[10px] text-muted-foreground">{s.label}</p>
                                <p className="text-[10px] text-green-600 mt-0.5">{s.note}</p>
                              </div>
                            ))}
                          </div>
                          {/* <h3 className="text-sm font-semibold mb-2">Development Timeline</h3>
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
                          </div> */}
                        </div>
    
                        {/* Right side */}
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-semibold mb-2">Physical Attributes</h3>
                            <div className="space-y-2">
                              {selected && selected.physical && Object.entries(selected.physical).map(([k, v]) => (
                                <div key={k} className="flex justify-between py-1.5 px-3 bg-muted/40 rounded-lg">
                                  <span className="text-xs text-muted-foreground capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
                                  <span className="text-xs font-semibold">{v}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* <div>
                            <h3 className="text-sm font-semibold mb-2">Injury History</h3>
                            <div className={`p-3 rounded-lg border ${selected.injury === "Fully Fit" ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}`}>
                              <p className="text-xs font-semibold text-green-700">{selected.injury}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">No active injuries recorded.</p>
                            </div>
                          </div> */}
                          <div>
                            <h3 className="text-sm font-semibold mb-2">Guardian Info</h3>
                            <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="text-xs">{selected?.guardian ? selected.guardian.charAt(0) : '?'}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-xs font-semibold">{selected?.guardian}</p>
                                  {/* <p className="text-[11px] text-muted-foreground">{selected.guardian.relation}</p> */}
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
          )}

    </>
  )
}
