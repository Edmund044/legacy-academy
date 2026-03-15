"use client"
import React, { useState } from "react"
import { PageHeader, StatCard } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress, Avatar, AvatarFallback, Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/primitives"
import { Star, Edit, Calendar, Award, Users, MoreVertical, Shield } from "lucide-react"
import AddSessionModal from "@/components/custom/modals/addSessionModal";
import EditSessionModal from "@/components/custom/modals/editSessionModal";

import { QrCode, CheckCircle2, UserPlus, History, Wifi } from "lucide-react"

const students = [
  { initials: "MJ", name: "Marcus Johnson", id: "#EL-4902", position: "Midfielder", tag: "SPONSORED", billing: "Auto-trigger ON", checked: true },
  { initials: "SW", name: "Sara Williams", id: "#EL-4915", position: "Striker", tag: null, billing: "Pending Check-in", checked: false },
  { initials: "LC", name: "Leo Chen", id: "#EL-4988", position: "Goalkeeper", tag: "ELITE PLUS", billing: "Auto-trigger ON", checked: true },
]

const weekProgress = [
  { day: "Session 1 (Mon)", status: "Completed" },
  { day: "Session 2 (Wed)", status: "Scheduled" },
  { day: "Session 3 (Thu)", status: "Scheduled" },
  { day: "Session 4 (Sat)", status: "Scheduled" },
]
const Session = [
  {
    id: 1, name: "Julian Nagelsmann", role: "Tactical Analysis Specialist", license: "UEFA Pro License",
    bio: "Former professional focused on data-driven tactical periodization and youth elite development. Leading Elite Division since 2021.",
    stats: { experience: 12, teams: 8, winRate: 68 },
    teams: ["Under-19 (Elite Division · 24 players)", "Under-16 (Regional League · 18 players)"],
    rating: 4.9, skills: [{ name: "Tactics implementation", pct: 95 }, { name: "Youth Development", pct: 88 }, { name: "Video Analysis", pct: 92 }],
    upcoming: [{ date: "OCT 24", title: "U-19 Tactical Training", time: "15:00–17:30", venue: "Pitch 3" }, { date: "OCT 26", title: "U-16 Match vs FC Lions", time: "10:30", venue: "Main Stadium" }]
  },
  {
    id: 2, name: "Sarah Jenkins", role: "Speed & Agility Session", license: "UEFA A Candidate",
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

function SessionCard({ Session, selected, onSelect }: { Session: typeof Session[0]; selected: boolean; onSelect: () => void }) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-xl border p-4 transition-all ${selected ? "border-brand bg-brand/5 shadow-sm" : "border-border bg-white hover:border-brand/40"}`}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-12 w-12 border-2 border-white shadow">
          <AvatarFallback className="text-sm">{Session.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">{Session.name}</p>
          <p className="text-xs text-muted-foreground truncate">{Session.role}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-medium">{Session.rating}</span>
          </div>
        </div>
        <Badge variant="outline" className="text-[10px] shrink-0">{Session.license}</Badge>
      </div>
    </div>
  )
}

export default function Handover2Page() {
  const [selected, setSelected] = useState(Session[0])
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState<Record<number, boolean>>({ 0: true, 2: true })
  const checkedCount = Object.values(checked).filter(Boolean).length

  return (
    <>
      <PageHeader title="Session" description="Manage your Sessioning staff">
        {/* <Button size="sm">+ Add Session</Button> */}
        <AddSessionModal
          // open={open}
          // onOpenChange={setOpen}
          // onSubmit={(data) => console.log(data)}
        />
      </PageHeader>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: list */}
        <div className="space-y-3">
          <div className="relative">
            <input className="w-full h-9 pl-9 pr-4 rounded-lg border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand/20" placeholder="Search Session..." />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          {Session.map(c => (
            <SessionCard key={c.id} Session={c} selected={selected.id === c.id} onSelect={() => setSelected(c)} />
          ))}
        </div>

        {/* Right: detail */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div>
                  <CardTitle className="text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand" />Check-in Roster</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">{checkedCount}/24 checked</p>
                </div>
                <div className="flex gap-2 sm:ml-auto">
                  <div className="flex gap-1">
                    {["Elite AM", "Elite PM", "U16 Dev", "Academy"].map((t, i) => (
                      <button key={t} className={`px-2.5 py-1 text-xs rounded-lg ${i === 0 ? "bg-brand text-white" : "bg-muted text-muted-foreground"}`}>{t}</button>
                    ))}
                  </div>
                  <Button variant="outline" size="sm"><QrCode className="w-3.5 h-3.5 mr-1.5" />Scan QR</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {students.map((s, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${checked[i] ? "border-green-200 bg-green-50/50" : "border-border bg-white"}`}>
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-xs font-bold text-brand">{s.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold">{s.name}</p>
                      {s.tag && <Badge variant="info" className="text-[10px]">{s.tag}</Badge>}
                    </div>
                    <p className="text-[11px] text-muted-foreground">{s.id} · {s.position}</p>
                  </div>
                  <div className="text-right mr-3">
                    <p className="text-[10px] text-muted-foreground">BILLING</p>
                    <p className={`text-[11px] font-semibold ${checked[i] ? "text-green-600" : "text-muted-foreground"}`}>{s.billing}</p>
                  </div>
                  <button
                    onClick={() => setChecked(prev => ({ ...prev, [i]: !prev[i] }))}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${checked[i] ? "border-brand bg-brand" : "border-gray-300 bg-white"}`}
                  >
                    {checked[i] && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </button>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full text-brand">View All 24 Students</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}