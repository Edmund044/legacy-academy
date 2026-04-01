"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { apiClient } from "@/lib/api-client";


interface attendaceTrackerProps {
  session_id: string;
}


interface Player {
  player_id: string;
  name: string;
  position: string;
  avatar: string; // initials fallback
}

type CheckInStatus = "pending" | "checked-in" | "absent" | "loading" | "attended" | "enrolled";

interface RosterEntry extends Player {
  enrollment_id: string;
  status: CheckInStatus;
}

// Replace with fetch from your API
// e.g. GET /api/sessions/{sessionId}/roster
const MOCK_ROSTER: Player[] = [
  { player_id: "b7671cd6-406b-4eec-b232-53c9c8e7a6f0", name: "Brian Otieno", position: "Midfielder", avatar: "BO" },
  { player_id: "8d010b75-4507-45c2-a802-6f3359a4a792", name: "Kevin Mwangi", position: "Forward", avatar: "KM" },
  // { player_id: "b2c3d4e5-2345-4bcd-9ef0-bbccddee1122", name: "Samuel Njoroge", position: "Goalkeeper", avatar: "SN" },
  // { player_id: "c3d4e5f6-3456-4cde-a012-ccddeeff2233", name: "Dennis Ochieng", position: "Defender", avatar: "DO" },
  // { player_id: "d4e5f607-4567-4def-b123-ddeeff003344", name: "Felix Kamau", position: "Midfielder", avatar: "FK" },
  // { player_id: "e5f60718-5678-4ef0-c234-eeff00114455", name: "James Wekesa", position: "Forward", avatar: "JW" },
  // { player_id: "f6071829-6789-4f01-d345-ff0011225566", name: "Peter Mutua", position: "Defender", avatar: "PM" },
  // { player_id: "0718293a-789a-4012-e456-001122336677", name: "Anthony Karanja", position: "Midfielder", avatar: "AK" },
  // { player_id: "18293a4b-89ab-4123-f567-112233447788", name: "Collins Oduya", position: "Forward", avatar: "CO" },
  // { player_id: "293a4b5c-9abc-4234-0678-223344558899", name: "Ian Githinji", position: "Defender", avatar: "IG" },
];

const POSITION_COLORS: Record<string, string> = {
  Goalkeeper: "bg-amber-50 text-amber-600 border-amber-200",
  Defender: "bg-blue-50 text-blue-600 border-blue-200",
  Midfielder: "bg-green-50 text-green-600 border-green-200",
  Forward: "bg-red-50 text-red-600 border-red-200",
};

export default function StudentCheckIn({session_id}: attendaceTrackerProps) {
  const [roster, setRoster] = useState<RosterEntry[]>([]);
  const [query, setQuery] = useState("");
  const [sessionLabel] = useState("Morning Training — 26 Mar 2026");
  const searchRef = useRef<HTMLInputElement>(null);
  const { user, tokens } = useAuth();
  const [loading, setLoading] = useState(true);


  const fetchSessionsRoster = async () => {
    try {
      const response = await apiClient({
        endpoint: `v1/sessions/${session_id}/roster`,
        method: "GET",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOWJmOTcxMS0zNTI5LTRhYzMtOWIxMC02MzJlNjJhMWE0MTkiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzM5NDg3MjcsInR5cGUiOiJhY2Nlc3MifQ.Ez0ivwUJe2eeCZGsj0LkLfoTKyzLoH3_o4LVZwn_v90",
        },
      });

      setRoster((response.data as any[]) ?? []);
    } catch (error) {
      alert("Failed to fetch equipment inventory. Please try again later.");
      // toast.error("Failed to fetch your submitted requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Replace with real fetch:
    // fetch(`/api/sessions/${sessionId}/roster`, { headers: { Authorization: `Bearer ${token}` } })
    //   .then(r => r.json())
    //   .then(data => setRoster(data.map((p: Player) => ({ ...p, status: "pending" }))))
    fetchSessionsRoster()
    // setRoster(MOCK_ROSTER.map((p) => ({ ...p, status: "pending" })));
  }, []);

  

  async function checkIn(player_id: string) {
    setRoster((prev) =>
      prev.map((p) => (p.player_id === player_id ? { ...p, status: "loading" } : p))
    );

    try {
      try {
        await apiClient({
          endpoint: `v1/sessions/${session_id}/checkin`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokens?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: {
            player_id: player_id,
            status: 'attended'
          }
        });
        // setOpen(false);
        // onConfirm();
        // toast.success("Availability confirmed!");
      } catch (error) {
        // toast.error("Something went wrong. Please try again later.");
      }

      // await new Promise((r) => setTimeout(r, 500)); // simulate network

      setRoster((prev) =>
        prev.map((p) => (p.player_id === player_id ? { ...p, status: "attended" } : p))
      );
    } catch {
      setRoster((prev) =>
        prev.map((p) => (p.player_id === player_id ? { ...p, status: "enrolled" } : p))
      );
    }
  }

  async function markAbsent(player_id: string) {
    try {
      await apiClient({
        endpoint: `v1/sessions/${session_id}/checkin`,
        method: "POST",
        headers: {
          // Authorization: `Bearer ${tokens?.accessToken}`,
          "Authorization": "Bearer ",
          "Content-Type": "application/json",
        },
        body: {
          player_id: player_id,
          status: 'absent'
        }
      });
      // setOpen(false);
      // onConfirm();
      // toast.success("Availability confirmed!");
    } catch (error) {
      // toast.error("Something went wrong. Please try again later.");
    }
    setRoster((prev) =>
      prev.map((p) => (p.player_id === player_id ? { ...p, status: "absent" } : p))
    );
  }

  async function undoStatus(player_id: string) {
    try {
      await apiClient({
        endpoint: `v1/sessions/${session_id}/checkin`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: {
          player_id: player_id,
          status: 'enrolled'
        }
      });
      // setOpen(false);
      // onConfirm();
      // toast.success("Availability confirmed!");
    } catch (error) {
      // toast.error("Something went wrong. Please try again later.");
    }
    setRoster((prev) =>
      prev.map((p) => (p.player_id === player_id ? { ...p, status: "enrolled" } : p))
    );
  }

  async function checkInAll() {
    const pending = roster.filter((p) => p.status === "enrolled");
    for (const p of pending) {
      await checkIn(p.player_id);
    }
  }

  const filtered = roster.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.position.toLowerCase().includes(query.toLowerCase())
  );

  const counts = {
    total: roster.length,
    checkedIn: roster.filter((p) => p.status === "attended").length,
    absent: roster.filter((p) => p.status === "absent").length,
    pending: roster.filter((p) => p.status === "enrolled" || p.status === "loading").length,
  };

  const attendancePercent =
    counts.total > 0 ? Math.round((counts.checkedIn / counts.total) * 100) : 0;

  return (
    <Dialog>
    <DialogTrigger asChild>
    <Button size="sm"><span className="w-1.5 h-1.5 rounded-full bg-white live-dot mr-1.5" />Check-in</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[540px] p-0 gap-0 overflow-hidden rounded-2xl">
      {/* Header */}
      <DialogHeader className="px-6 pt-6 pb-4">
        <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          Equipment return
        </DialogTitle>
      </DialogHeader>
    <div className="max-w-2xl mx-auto p-6" style={{ maxHeight: '500px', overflowY: 'auto' }}>
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-medium text-gray-900">Player check-in</h2>
            <p className="text-sm text-gray-500 mt-0.5">{sessionLabel}</p>
          </div>
          <button
            onClick={checkInAll}
            disabled={counts.pending === 0}
            className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Check in all
          </button>
        </div>

        {/* Stats bar */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: "Checked in", value: counts.checkedIn, color: "text-green-600", bg: "bg-green-50" },
            { label: "Absent", value: counts.absent, color: "text-red-500", bg: "bg-red-50" },
            { label: "Pending", value: counts.pending, color: "text-gray-500", bg: "bg-gray-50" },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-xl px-4 py-3`}>
              <p className={`text-xl font-semibold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Attendance</span>
            <span>{attendancePercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-400 rounded-full transition-all duration-500"
              style={{ width: `${attendancePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="6.5" cy="6.5" r="4.5" />
          <path d="M10.5 10.5L14 14" />
        </svg>
        <input
          ref={searchRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or position…"
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
        />
      </div>

      {/* Roster list */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">No players found</p>
        )}
        {filtered.map((player) => {
          const isCheckedIn = player.status === "attended";
          const isAbsent = player.status === "absent";
          const isLoading = player.status === "loading";

          return (
            <div
              key={player.player_id}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
                isCheckedIn
                  ? "bg-green-50/60 border-green-200"
                  : isAbsent
                  ? "bg-red-50/40 border-red-200"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                  isCheckedIn
                    ? "bg-green-100 text-green-700"
                    : isAbsent
                    ? "bg-red-100 text-red-500"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {isCheckedIn ? (
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l3.5 3.5L13 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : isAbsent ? (
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
                  </svg>
                ) : (
                  player.avatar
                )}
              </div>

              {/* Name + position */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{player.name}</p>
                <span
                  className={`text-xs px-2 py-0.5 border rounded-full ${
                    POSITION_COLORS[player.position] ?? "bg-gray-50 text-gray-500 border-gray-200"
                  }`}
                >
                  {player.position}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {isCheckedIn || isAbsent  ? (
                  <button
                    onClick={() => undoStatus(player.player_id)}
                    className="text-xs px-2.5 py-1 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 hover:border-gray-300 transition bg-white"
                  >
                    Undo
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => markAbsent(player.player_id)}
                      disabled={isLoading}
                      className="text-xs px-2.5 py-1 border border-red-200 rounded-lg text-red-400 hover:bg-red-50 transition disabled:opacity-40"
                    >
                      Absent
                    </button>
                    <button
                      onClick={() => checkIn(player.player_id)}
                      disabled={isLoading}
                      className="text-xs px-2.5 py-1 border border-green-300 rounded-lg text-green-600 hover:bg-green-50 transition disabled:opacity-40 flex items-center gap-1"
                    >
                      {isLoading ? (
                        <svg className="w-3 h-3 animate-spin" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="20" strokeDashoffset="10" />
                        </svg>
                      ) : null}
                      {isLoading ? "Checking…" : "Check in"}
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer summary */}
      {counts.pending === 0 && counts.total > 0 && (
        <div className="mt-5 text-center text-sm text-gray-400 border border-dashed border-gray-200 rounded-xl py-4">
          All players have been marked —{" "}
          <span className="text-green-600 font-medium">{counts.checkedIn} checked in</span>
          {counts.absent > 0 && (
            <>, <span className="text-red-500 font-medium">{counts.absent} absent</span></>
          )}
        </div>
      )}
    </div>
    </DialogContent>
    </Dialog>
  );
}

// import React, { useState } from 'react';
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger
//   } from "@/components/ui/dialog";
//   import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { apiClient } from "@/lib/api-client";
// import { useAuth } from "@/context/auth-context";
// import { QrCode, CheckCircle2} from "lucide-react";

// const students = [
//     { initials: "MJ", name: "Marcus Johnson", id: "#EL-4902", position: "Midfielder", tag: "SPONSORED", billing: "Auto-trigger ON", checked: true },
//     { initials: "SW", name: "Sara Williams", id: "#EL-4915", position: "Striker", tag: null, billing: "Pending Check-in", checked: false },
//     { initials: "LC", name: "Leo Chen", id: "#EL-4988", position: "Goalkeeper", tag: "ELITE PLUS", billing: "Auto-trigger ON", checked: true },
//   ]
//   const Session = [
//     {
//       id: 1, name: "Julian Nagelsmann", role: "Tactical Analysis Specialist", license: "UEFA Pro License",
//       bio: "Former professional focused on data-driven tactical periodization and youth elite development. Leading Elite Division since 2021.",
//       stats: { experience: 12, teams: 8, winRate: 68 },
//       teams: ["Under-19 (Elite Division · 24 players)", "Under-16 (Regional League · 18 players)"],
//       rating: 4.9, skills: [{ name: "Tactics implementation", pct: 95 }, { name: "Youth Development", pct: 88 }, { name: "Video Analysis", pct: 92 }],
//       upcoming: [{ date: "OCT 24", title: "U-19 Tactical Training", time: "15:00–17:30", venue: "Pitch 3" }, { date: "OCT 26", title: "U-16 Match vs FC Lions", time: "10:30", venue: "Main Stadium" }]
//     },
//     {
//       id: 2, name: "Sarah Jenkins", role: "Speed & Agility Session", license: "UEFA A Candidate",
//       bio: "Specialising in explosive movement and athletic development for youth players.",
//       stats: { experience: 5, teams: 3, winRate: 74 },
//       teams: ["Under-10 (Weekend Clinic · 30 players)"],
//       rating: 4.8, skills: [{ name: "Speed & Agility", pct: 96 }, { name: "Physical Conditioning", pct: 90 }, { name: "Youth Development", pct: 85 }],
//       upcoming: [{ date: "OCT 25", title: "Beginner Fundamentals", time: "10:00–12:00", venue: "Pitch 1" }]
//     },
//     {
//       id: 3, name: "Marco Rossi", role: "Head of Attacking Development", license: "UEFA Pro",
//       bio: "Elite striker program lead with over 400 sessions delivered across multiple age groups.",
//       stats: { experience: 12, teams: 5, winRate: 72 },
//       teams: ["U14 Elite (Advanced Training · 20 players)", "ALL (Academy Selection · 120 players)"],
//       rating: 4.7, skills: [{ name: "Finishing & Positioning", pct: 98 }, { name: "Tactical Awareness", pct: 87 }, { name: "Player Mentorship", pct: 91 }],
//       upcoming: [{ date: "OCT 24", title: "Elite Striker Camp", time: "09:00–11:30", venue: "Main Pitch" }]
//     },
//   ]
// const AttendanceTrackerModal: React.FC = () => {
//     const [selected, setSelected] = useState(Session[0])
//     const [open, setOpen] = useState(false);
//     const [checked, setChecked] = useState<Record<number, boolean>>({ 0: true, 2: true })
//     const checkedCount = Object.values(checked).filter(Boolean).length
//     const handleAttendance = async () => {
//       try {
//         await apiClient({
//           endpoint: "v1/sessions/19579024-8543-4f0f-ac90-c1ccbdb85792/enroll",
//           method: "PATCH",
//           headers: {
//             // Authorization: `Bearer ${tokens?.accessToken}`,
//             "Authorization": "Bearer ",
//             "Content-Type": "application/json",
//           },
//           body: {
//             "player_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//             "billing_method": "string",
//             "player_eligibility": "string"
//           },
//         });
//         // setOpen(false);
//         // onConfirm();
//         // toast.success("Availability confirmed!");
//       } catch (error) {
//         // toast.error("Something went wrong. Please try again later.");
//       }
//     };
//     return (
//         <div>
//                 <Dialog 
//     // open={open} onOpenChange={onOpenChange}
//     >
//               <DialogTrigger asChild>
//               <Button size="sm"><span className="w-1.5 h-1.5 rounded-full bg-white live-dot mr-1.5" />Check-in</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[540px] p-0 gap-0 overflow-hidden rounded-2xl">
//         {/* Header */}
//         <DialogHeader className="px-6 pt-6 pb-4">
//           <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
//             Attendance Tracker
//           </DialogTitle>
//         </DialogHeader>

//         <div className="px-6 pb-6 space-y-5 overflow-y-auto max-h-[80vh]">
//         <div className="lg:col-span-2">
//           <Card>
//             <CardHeader>
//               <div className="flex flex-col sm:flex-row sm:items-center gap-3">
//                 <div>
//                   <CardTitle className="text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand" />Check-in Roster</CardTitle>
//                   <p className="text-xs text-muted-foreground mt-0.5">{checkedCount}/24 checked</p>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {students.map((s, i) => (
//                 <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${checked[i] ? "border-green-200 bg-green-50/50" : "border-border bg-white"}`}>
//                   <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-xs font-bold text-brand">{s.initials}</div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-1.5">
//                       <p className="text-sm font-semibold">{s.name}</p>
//                       {s.tag && <Badge variant="info" className="text-[10px]">{s.tag}</Badge>}
//                     </div>
//                     <p className="text-[11px] text-muted-foreground">{s.id} · {s.position}</p>
//                   </div>
//                   <div className="text-right mr-3">
//                     <p className="text-[10px] text-muted-foreground">BILLING</p>
//                     <p className={`text-[11px] font-semibold ${checked[i] ? "text-green-600" : "text-muted-foreground"}`}>{s.billing}</p>
//                   </div>
//                   <button
//                     // onClick={() => setChecked(prev => ({ ...prev, [i]: !prev[i] }))}
//                     className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${checked[i] ? "border-brand bg-brand" : "border-gray-300 bg-white"}`}
//                   >
//                     {checked[i] && <CheckCircle2 className="w-4 h-4 text-white" />}
//                   </button>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>

//           {/* Actions */}
//           <div className="flex justify-end gap-3 pt-2">
//             <Button
//               variant="ghost"
//             //   onClick={handleCancel}
//               className="text-gray-600 hover:text-gray-800"
//             >
//               Cancel
//             </Button>
//             <Button
//             //   onClick={handleSubmit}
//               className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6"
//             >
//               Submit
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
            
//         </div>
//     );
// };

// export default AttendanceTrackerModal;