"use client"
import React, { useState } from "react"
import { PageHeader, StatCard } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress, Avatar, AvatarFallback, Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/primitives"
import { Star, Edit, Calendar, Award, Users, MoreVertical, Shield } from "lucide-react"
import AddCoachModal from "@/components/custom/modals/addCoachModal";
import EditCoachModal from "@/components/custom/modals/editCoachModal";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";
import { CoachProfile } from "@/types/coaches";
import { coaches } from "@/data/data"
import { convertToUpperCase } from "@/lib/utils"
import { Loader2 } from "lucide-react";
import { ApiResponse } from "@/types/api-response";

function CoachCard({ coach, selected, onSelect }: { coach: CoachProfile; selected: boolean; onSelect: () => void }) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-xl border p-4 transition-all ${selected ? "border-brand bg-brand/5 shadow-sm" : "border-border bg-white hover:border-brand/40"}`}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-12 w-12 border-2 border-white shadow">
          <AvatarFallback className="text-sm">{coach?.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">{coach.name}</p>
          <p className="text-xs text-muted-foreground truncate">{coach.role}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-medium">{(coach.stats.win_rate / 20).toFixed(2)}</span>
          </div>
        </div>
        <Badge variant="outline" className="text-[10px] shrink-0">{coach.license}</Badge>
      </div>
    </div>
  )
}

export default function CoachesPage() {
  const [coaches2, setCoaches] = useState<CoachProfile[]>([])
  const [selected, setSelected] = useState<CoachProfile>()
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, tokens } = useAuth();

  const fetchCoaches = async () => {
    try {
      const response = await apiClient<ApiResponse<CoachProfile[]>>({
        endpoint: `v1/coaches?page=1&per_page=100`,
        method: "GET",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOWJmOTcxMS0zNTI5LTRhYzMtOWIxMC02MzJlNjJhMWE0MTkiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzM5NDg3MjcsInR5cGUiOiJhY2Nlc3MifQ.Ez0ivwUJe2eeCZGsj0LkLfoTKyzLoH3_o4LVZwn_v90",
        },
      });

      setCoaches((response.data as CoachProfile[]) ?? []);
      setSelected((response.data as CoachProfile[])[0] ?? []);
    } catch (error) {
      alert("Failed to fetch equipment inventory. Please try again later.");
      // toast.error("Failed to fetch your submitted requests.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {fetchCoaches()},[]);


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
                  <PageHeader title="Coaches" description="Manage your coaching staff">
           { user?.role === "technical_director" && <AddCoachModal/>}

      </PageHeader>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left: list */}
            <div className="space-y-3" >
              <div className="relative">
                <input className="w-full h-9 pl-9 pr-4 rounded-lg border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand/20" placeholder="Search coaches..." />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              {coaches2.map(c => (
                <CoachCard key={c.id} coach={c} selected={selected?.id === c.id} onSelect={() => setSelected(c)} />
              ))}
            </div>
    
            {/* Right: detail */}
            <div className="xl:col-span-2 space-y-4">
              {/* Profile Header */}
              <Card>
                <CardContent className="pt-5">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                      <AvatarFallback className="text-xl">{selected?.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h2 className="text-xl font-bold">{selected?.name}</h2>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            <Badge variant="brand">{selected?.role}</Badge>
                            <Badge variant="outline">{selected?.license}</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <EditCoachModal 
                              //  open={open}
                              // onOpenChange={setOpen}
                              // onSubmit={(data) => console.log(data)}
                              ></EditCoachModal>
                          {/* <Button size="sm" variant="outline"><MoreVertical className="w-3.5 h-3.5" /></Button> */}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{selected?.bio}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {[
                      { label: "YEARS EXPERIENCE", value: selected?.stats.experience },
                      { label: "TEAMS MANAGED", value: selected?.stats.teams },
                      { label: "CAREER WIN RATE", value: `${selected?.stats.win_rate}%` },
                    ].map(s => (
                      <div key={s.label} className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-2xl font-bold text-brand">{s.value}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wide">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
    
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Assigned Teams */}
                <Card>
                  <CardHeader className="pb-3"><CardTitle className="text-sm flex items-center gap-2"><Shield className="w-4 h-4 text-brand" />Assigned Teams</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    {selected?.teams.map((t, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 bg-muted/40 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                        <p className="text-xs font-medium">{convertToUpperCase(t)}</p>
                        <Badge variant="success" className="ml-auto text-[10px]">ACTIVE</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
    
                {/* Upcoming */}
                {/* <Card>
                  <CardHeader className="pb-3"><CardTitle className="text-sm flex items-center gap-2"><Calendar className="w-4 h-4 text-brand" />Upcoming Schedule</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    {selected.upcoming.map((u, i) => (
                      <div key={i} className="flex gap-3 p-2.5 bg-muted/40 rounded-lg">
                        <div className="text-center bg-brand text-white rounded-lg px-2 py-1 min-w-[40px]">
                          <p className="text-[10px] font-bold">{u.date.split(" ")[0]}</p>
                          <p className="text-sm font-bold leading-none">{u.date.split(" ")[1]}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold">{u.title}</p>
                          <p className="text-[11px] text-muted-foreground">{u.time} · {u.venue}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card> */}
              </div>
    
              {/* Skill Competency */}
              {/* <Card>
                <CardHeader className="pb-3"><CardTitle className="text-sm flex items-center gap-2"><Award className="w-4 h-4 text-brand" />Skill Competency</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {selected.skills.map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-medium">{s.name}</span>
                        <span className="text-xs font-bold text-brand">{s.pct}%</span>
                      </div>
                      <Progress value={s.pct} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card> */}
            </div>
          </div>
          </>
          )}

    </>
  )
}
