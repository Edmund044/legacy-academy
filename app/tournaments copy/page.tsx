"use client"
import React from "react"
import { PageHeader, StatCard } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/primitives"
import { Trophy, Users, Calendar, BarChart2, MapPin } from "lucide-react"

const upcoming = [
  { live: true, elapsed: "65'", home: "Elite U19", away: "City Juniors", score: "2 - 1", type: "REGIONAL CUP", venue: "Main Stadium" },
  { live: false, date: "Tomorrow 10:00 AM", home: "North Academy", away: "Elite U17", score: "VS", type: "LEAGUE DAY 14", venue: "Pitch 2" },
  { live: false, date: "Sep 24, Pitch 4", home: "Elite U15", away: "Stark United", score: "VS", type: "FRIENDLY", venue: "Pitch 4" },
]

const standings = [
  { pos: 1, team: "Elite U19", p: 12, w: 10, d: 1, l: 1, gd: "+24", pts: 31 },
  { pos: 2, team: "City Juniors", p: 12, w: 9, d: 2, l: 1, gd: "+18", pts: 29 },
  { pos: 3, team: "North Academy", p: 11, w: 7, d: 2, l: 2, gd: "+8", pts: 23 },
]

const tournaments = [
  { name: "Regional Cup U19", progress: 75, stage: "Semi-Finals (Starts Monday)" },
  { name: "Winter League U15", progress: 20, stage: "Regular Season: 4 of 20 Games" },
  { name: "Academy Draft Cup", progress: 0, stage: "Starting in: 14 Days" },
]

export default function TournamentsPage() {
  return (
    <>
      <PageHeader title="Tournament Management" description="Manage and monitor your academy leagues and matches in real-time.">
        <Button variant="outline" size="sm"><Trophy className="w-3.5 h-3.5 mr-1.5" />Create Tournament</Button>
        <Button size="sm"><Calendar className="w-3.5 h-3.5 mr-1.5" />Schedule Match</Button>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Active Tournaments" value="4" change="+1 from last month" changeType="up" icon={<Trophy className="w-4 h-4" />} />
        <StatCard title="Matches This Week" value="12" change="3 matches today" changeType="neutral" icon={<Calendar className="w-4 h-4" />} />
        <StatCard title="Average Attendance" value="85%" change="+5% vs Season 23/24" changeType="up" icon={<Users className="w-4 h-4" />} />
        <StatCard title="Academy Ranking" value="#2" change="Regional Youth Division" changeType="neutral" icon={<BarChart2 className="w-4 h-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fixtures */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm">Upcoming Matches</CardTitle>
              <Badge variant="outline" className="text-[10px]">Next 7 Days</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcoming.map((m, i) => (
                <div key={i} className={`p-3 rounded-xl border ${m.live ? "border-brand/30 bg-brand/5" : "border-border bg-muted/20"}`}>
                  <div className="flex items-center gap-3">
                    {m.live && (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-brand">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand live-dot" />
                        LIVE · {m.elapsed}
                      </div>
                    )}
                    {!m.live && <p className="text-[11px] text-muted-foreground">{m.date}</p>}
                    <Badge variant="outline" className="text-[10px] ml-auto">{m.type}</Badge>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <p className="font-bold text-sm flex-1 text-right">{m.home}</p>
                    <div className="px-3 py-1 bg-white border border-border rounded-lg">
                      <p className="text-sm font-bold">{m.score}</p>
                    </div>
                    <p className="font-bold text-sm flex-1">{m.away}</p>
                  </div>
                  <p className="text-[11px] text-muted-foreground text-center mt-1 flex items-center justify-center gap-1"><MapPin className="w-3 h-3" />{m.venue}</p>
                  {m.live && <Button size="sm" className="w-full mt-2">Match Center</Button>}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* League Table */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Youth Premier League Table</CardTitle></CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {["POS", "TEAM", "P", "W", "D", "L", "GD", "PTS"].map(h => (
                      <th key={h} className="text-center py-1.5 px-2 text-[10px] font-semibold text-muted-foreground first:text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {standings.map((s) => (
                    <tr key={s.pos} className={`border-b border-border/40 ${s.pos === 1 ? "bg-brand/5" : ""}`}>
                      <td className="py-2 px-2 text-sm font-bold">{s.pos}</td>
                      <td className="py-2 px-2 text-sm font-semibold">{s.team}</td>
                      {[s.p, s.w, s.d, s.l].map((v, i) => <td key={i} className="py-2 px-2 text-xs text-center text-muted-foreground">{v}</td>)}
                      <td className="py-2 px-2 text-xs text-center text-green-600 font-medium">{s.gd}</td>
                      <td className="py-2 px-2 text-sm text-center font-bold">{s.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Right */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Tournament Progress</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {tournaments.map((t, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs font-semibold">{t.name}</p>
                    <span className={`text-xs font-bold ${t.progress > 0 ? "text-brand" : "text-muted-foreground"}`}>
                      {t.progress > 0 ? `${t.progress}% Complete` : "Planned"}
                    </span>
                  </div>
                  <Progress value={t.progress} className="h-1.5" />
                  <p className="text-[11px] text-muted-foreground mt-1">{t.stage}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm">Venue Map</CardTitle></CardHeader>
            <CardContent>
              <div className="h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-3">
                <MapPin className="w-8 h-8 text-green-600 opacity-50" />
              </div>
              <p className="text-xs text-muted-foreground mb-3">Real-time pitch availability and match locations.</p>
              <Button variant="outline" size="sm" className="w-full">Manage Venues</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
