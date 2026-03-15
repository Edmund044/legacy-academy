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


const coaches = [
  {
    id: 1, name: "Julian Nagelsmann", role: "Tactical Analysis Specialist", license: "UEFA Pro License",
    bio: "Former professional focused on data-driven tactical periodization and youth elite development. Leading Elite Division since 2021.",
    stats: { experience: 12, teams: 8, winRate: 68 },
    teams: ["Under-19 (Elite Division · 24 players)", "Under-16 (Regional League · 18 players)"],
    rating: 4.9, skills: [{ name: "Tactics implementation", pct: 95 }, { name: "Youth Development", pct: 88 }, { name: "Video Analysis", pct: 92 }],
    upcoming: [{ date: "OCT 24", title: "U-19 Tactical Training", time: "15:00–17:30", venue: "Pitch 3" }, { date: "OCT 26", title: "U-16 Match vs FC Lions", time: "10:30", venue: "Main Stadium" }]
  },
  {
    id: 2, name: "Sarah Jenkins", role: "Speed & Agility Coach", license: "UEFA A Candidate",
    bio: "Specialising in explosive movement and athletic development for youth players.",
    stats: { experience: 5, teams: 3, winRate: 74 },
    teams: ["Under-10 (Weekend Clinic · 30 players)"],
    rating: 4.8, skills: [{ name: "Speed & Agility", pct: 96 }, { name: "Physical Conditioning", pct: 90 }, { name: "Youth Development", pct: 85 }],
    upcoming: [{ date: "OCT 25", title: "Beginner Fundamentals", time: "10:00–12:00", venue: "Pitch 1" }]
  },
  {
    id: 3, name: "Marco Rossi", role: "Head of Attacking Development", license: "UEFA Pro",
    bio: "Elite striker program lead with over 400 sessions delivered across multiple age groups.",
    stats: { experience: 12, teams: 5, winRate: 72 },
    teams: ["U14 Elite (Advanced Training · 20 players)", "ALL (Academy Selection · 120 players)"],
    rating: 4.7, skills: [{ name: "Finishing & Positioning", pct: 98 }, { name: "Tactical Awareness", pct: 87 }, { name: "Player Mentorship", pct: 91 }],
    upcoming: [{ date: "OCT 24", title: "Elite Striker Camp", time: "09:00–11:30", venue: "Main Pitch" }]
  },
]

function CoachCard({ coach, selected, onSelect }: { coach: typeof coaches[0]; selected: boolean; onSelect: () => void }) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-xl border p-4 transition-all ${selected ? "border-brand bg-brand/5 shadow-sm" : "border-border bg-white hover:border-brand/40"}`}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-12 w-12 border-2 border-white shadow">
          <AvatarFallback className="text-sm">{coach.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">{coach.name}</p>
          <p className="text-xs text-muted-foreground truncate">{coach.role}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-medium">{coach.rating}</span>
          </div>
        </div>
        <Badge variant="outline" className="text-[10px] shrink-0">{coach.license}</Badge>
      </div>
    </div>
  )
}

export default function CoachesPage() {
  const [selected, setSelected] = useState(coaches[0])
  const [open, setOpen] = useState(false);

  return (
    <>
      <PageHeader title="Coaches" description="Manage your coaching staff">
        {/* <Button size="sm">+ Add Coach</Button> */}
        <AddCoachModal
          // open={open}
          // onOpenChange={setOpen}
          // onSubmit={(data) => console.log(data)}
        />
      </PageHeader>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: list */}
        <div className="space-y-3">
          <div className="relative">
            <input className="w-full h-9 pl-9 pr-4 rounded-lg border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand/20" placeholder="Search coaches..." />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          {coaches.map(c => (
            <CoachCard key={c.id} coach={c} selected={selected.id === c.id} onSelect={() => setSelected(c)} />
          ))}
        </div>

        {/* Right: detail */}
        <div className="xl:col-span-2 space-y-4">
          {/* Profile Header */}
          <Card>
            <CardContent className="pt-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                  <AvatarFallback className="text-xl">{selected.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h2 className="text-xl font-bold">{selected.name}</h2>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        <Badge variant="brand">{selected.role}</Badge>
                        <Badge variant="outline">{selected.license}</Badge>
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
                  <p className="mt-2 text-sm text-muted-foreground">{selected.bio}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: "YEARS EXPERIENCE", value: selected.stats.experience },
                  { label: "TEAMS MANAGED", value: selected.stats.teams },
                  { label: "CAREER WIN RATE", value: `${selected.stats.winRate}%` },
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
                {selected.teams.map((t, i) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 bg-muted/40 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                    <p className="text-xs font-medium">{t}</p>
                    <Badge variant="success" className="ml-auto text-[10px]">ACTIVE</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming */}
            <Card>
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
            </Card>
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
  )
}
