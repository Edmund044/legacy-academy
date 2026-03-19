import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";
import { QrCode, CheckCircle2} from "lucide-react";

const students = [
    { initials: "MJ", name: "Marcus Johnson", id: "#EL-4902", position: "Midfielder", tag: "SPONSORED", billing: "Auto-trigger ON", checked: true },
    { initials: "SW", name: "Sara Williams", id: "#EL-4915", position: "Striker", tag: null, billing: "Pending Check-in", checked: false },
    { initials: "LC", name: "Leo Chen", id: "#EL-4988", position: "Goalkeeper", tag: "ELITE PLUS", billing: "Auto-trigger ON", checked: true },
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
const AttendanceTrackerModal: React.FC = () => {
    const [selected, setSelected] = useState(Session[0])
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState<Record<number, boolean>>({ 0: true, 2: true })
    const checkedCount = Object.values(checked).filter(Boolean).length
    const handleAttendance = async () => {
      try {
        await apiClient({
          endpoint: "v1/sessions/19579024-8543-4f0f-ac90-c1ccbdb85792/enroll",
          method: "PATCH",
          headers: {
            // Authorization: `Bearer ${tokens?.accessToken}`,
            "Authorization": "Bearer ",
            "Content-Type": "application/json",
          },
          body: {
            "player_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "billing_method": "string",
            "player_eligibility": "string"
          },
        });
        // setOpen(false);
        // onConfirm();
        // toast.success("Availability confirmed!");
      } catch (error) {
        // toast.error("Something went wrong. Please try again later.");
      }
    };
    return (
        <div>
                <Dialog 
    // open={open} onOpenChange={onOpenChange}
    >
              <DialogTrigger asChild>
              <Button size="sm"><span className="w-1.5 h-1.5 rounded-full bg-white live-dot mr-1.5" />Check-in</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px] p-0 gap-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Attendance Tracker
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5 overflow-y-auto max-h-[80vh]">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div>
                  <CardTitle className="text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand" />Check-in Roster</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">{checkedCount}/24 checked</p>
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
                    // onClick={() => setChecked(prev => ({ ...prev, [i]: !prev[i] }))}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${checked[i] ? "border-brand bg-brand" : "border-gray-300 bg-white"}`}
                  >
                    {checked[i] && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="ghost"
            //   onClick={handleCancel}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </Button>
            <Button
            //   onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6"
            >
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
            
        </div>
    );
};

export default AttendanceTrackerModal;