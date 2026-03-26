"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Package, CheckCircle2} from "lucide-react";
import { apiClient } from "@/lib/api-client";

const CONDITIONS = ["excellent", "good", "fair", "needs_repair", "condemned"];

interface HandoverItem {
  handover_item_id: string;
  condition_in: string;
  is_lost: boolean;
  is_damaged: boolean;
  _name: string;
  _condition_out: string; // original condition at checkout
}

// Replace with fetch from your active handouts API
// e.g. GET /api/equipment/active-handover or GET /api/equipment/checkout/{id}/items
const MOCK_ACTIVE_ITEMS = [
  { handover_item_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", name: "Football (Size 5)", condition_out: "Good" },
  { handover_item_id: "a1b2c3d4-1234-4abc-8def-aabbccddeeff", name: "Training Cones (Set of 20)", condition_out: "Good" },
  // { handover_item_id: "b2c3d4e5-2345-4bcd-9ef0-bbccddee1122", name: "Goalkeeper Gloves", condition_out: "Fair" },
  // { handover_item_id: "c3d4e5f6-3456-4cde-a012-ccddeeff2233", name: "Training Bib (Yellow)", condition_out: "New" },
  // { handover_item_id: "e5f60718-5678-4ef0-c234-eeff00114455", name: "Agility Ladder", condition_out: "Good" },
];

export default function EquipmentHandover() {
  const [items, setItems] = useState<HandoverItem[]>([]);
  const [damageNotes, setDamageNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Replace with your actual fetch
    // fetch("/api/equipment/active-handover", { headers: { Authorization: `Bearer ${token}` } })
    //   .then(r => r.json())
    //   .then(data => setItems(data.map(...)))
    setItems(
      MOCK_ACTIVE_ITEMS.map((i) => ({
        handover_item_id: i.handover_item_id,
        condition_in: i.condition_out, // default to same as checked-out condition
        is_lost: false,
        is_damaged: false,
        _name: i.name,
        _condition_out: i.condition_out,
      }))
    );
  }, []);

  function updateItem(id: string, patch: Partial<HandoverItem>) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.handover_item_id !== id) return item;
        const updated = { ...item, ...patch };
        // if marked lost, force is_damaged off and lock condition
        if (patch.is_lost) updated.is_damaged = false;
        // if marked damaged, force is_lost off
        if (patch.is_damaged) updated.is_lost = false;
        return updated;
      })
    );
  }

  const hasIssues = items.some((i) => i.is_lost || i.is_damaged);

  const payload = {
    items: items.map(({ handover_item_id, condition_in, is_lost, is_damaged }) => ({
      handover_item_id,
      condition_in,
      is_lost,
      is_damaged,
    })),
    damage_notes: damageNotes,
  };

  async function handleSubmit() {
    setLoading(true);
    try {
      console.log("POST payload:", payload);

      // Replace with your actual endpoint
      // const res = await fetch("/api/equipment/handover", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify(payload),
      // });
      // if (!res.ok) throw new Error("Handover failed");
        await apiClient({
          endpoint: "/v1/equipment/handovers/e819027f-d5b4-4009-ad38-f7fc7802f83c/return",
          method: "POST",
          headers: {
            // Authorization: `Bearer ${tokens?.accessToken}`,
            "Authorization": "Bearer ",
            "Content-Type": "application/json",
          },
          body: {
            ...payload
          }
        });

      await new Promise((r) => setTimeout(r, 600)); // simulate network
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2500);
    } finally {
      setLoading(false);
    }
  }

  const statusCounts = {
    ok: items.filter((i) => !i.is_lost && !i.is_damaged).length,
    damaged: items.filter((i) => i.is_damaged).length,
    lost: items.filter((i) => i.is_lost).length,
  };

  return (
    <Dialog>
    <DialogTrigger asChild>
    <Button size="sm" variant="outline" className="text-brand border-brand"><Package className="w-3.5 h-3.5 mr-1.5" />Complete Handover</Button>
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
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-base font-medium text-gray-900">Equipment return</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Confirm condition of each item being returned
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs shrink-0 ml-4">
          {statusCounts.ok > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-600 font-medium">
              {statusCounts.ok} ok
            </span>
          )}
          {statusCounts.damaged > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 font-medium">
              {statusCounts.damaged} damaged
            </span>
          )}
          {statusCounts.lost > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-600 font-medium">
              {statusCounts.lost} lost
            </span>
          )}
        </div>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-2.5 mb-5">
        {items.map((item) => {
          const isLost = item.is_lost;
          const isDamaged = item.is_damaged;
          const cardBorder = isLost
            ? "border-red-200 bg-red-50/40"
            : isDamaged
            ? "border-amber-200 bg-amber-50/40"
            : "border-gray-200 bg-white";

          return (
            <div
              key={item.handover_item_id}
              className={`border rounded-xl p-4 transition-colors ${cardBorder}`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item._name}</p>
                  <p className="text-xs text-gray-400 font-mono mt-0.5 break-all">
                    {item.handover_item_id}
                  </p>
                </div>
                <span className="text-xs px-2 py-0.5 border border-gray-200 rounded-full text-gray-500 ml-3 shrink-0 bg-white">
                  Out: {item._condition_out}
                </span>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-3 gap-3 items-end">
                {/* Condition in */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Condition in</label>
                  <select
                    value={item.condition_in}
                    disabled={isLost}
                    onChange={(e) =>
                      updateItem(item.handover_item_id, { condition_in: e.target.value })
                    }
                    className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed transition bg-white"
                  >
                    {CONDITIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* is_damaged toggle */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Damaged?</label>
                  <button
                    onClick={() =>
                      updateItem(item.handover_item_id, { is_damaged: !isDamaged })
                    }
                    disabled={isLost}
                    className={`w-full py-1.5 text-sm rounded-lg border transition font-medium disabled:opacity-40 disabled:cursor-not-allowed ${
                      isDamaged
                        ? "bg-amber-500 border-amber-500 text-white"
                        : "bg-white border-gray-200 text-gray-500 hover:border-amber-300 hover:text-amber-600"
                    }`}
                  >
                    {isDamaged ? "Yes — damaged" : "No"}
                  </button>
                </div>

                {/* is_lost toggle */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Lost?</label>
                  <button
                    onClick={() =>
                      updateItem(item.handover_item_id, { is_lost: !isLost })
                    }
                    className={`w-full py-1.5 text-sm rounded-lg border transition font-medium ${
                      isLost
                        ? "bg-red-500 border-red-500 text-white"
                        : "bg-white border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-600"
                    }`}
                  >
                    {isLost ? "Yes — lost" : "No"}
                  </button>
                </div>
              </div>

              {/* Lost notice */}
              {isLost && (
                <p className="text-xs text-red-500 mt-2.5">
                  Item marked as lost — condition will not be recorded
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Damage notes — shown when any item is damaged or lost */}
      <div
        className={`mb-5 transition-all overflow-hidden ${
          hasIssues ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Damage / loss notes
        </label>
        <textarea
          value={damageNotes}
          onChange={(e) => setDamageNotes(e.target.value)}
          placeholder="Describe the damage or circumstances of loss…"
          rows={3}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 resize-none transition"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          {items.length} item{items.length !== 1 ? "s" : ""} to return
        </p>
        <div className="flex items-center gap-3">
          {submitted && (
            <span className="text-xs text-green-600 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Handover recorded
            </span>
          )}
          <button
            onClick={handleSubmit}
            disabled={items.length === 0 || loading}
            className="px-5 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {loading ? "Submitting…" : "Confirm return"}
          </button>
        </div>
      </div>
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

// import { Package, CheckCircle2} from "lucide-react"

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

//   const checklist = [
//     { item: "15x Size 5 Balls", condition: "EXCELLENT", checked: true },
//     { item: "20x Training Bibs", condition: "CLEAN", checked: true },
//     { item: "4x Pop-up Goals", condition: "WORN", checked: false },
//   ]
  
//   const BadgeDropdown = ({ condition }: { condition: string }) => {
//     const [isOpen, setIsOpen] = useState(false);
  
//     const toggleDropdown = () => setIsOpen(!isOpen);
  
//     return (
//       <div className="relative inline-block">
//       <Badge variant={condition === "EXCELLENT" || condition === "CLEAN" ? "success" : "warning"} className="text-[10px]" onClick={toggleDropdown}>{condition}</Badge> 
//         {/* <Badge
//           onClick={toggleDropdown}
//           className={`badge ${
//             condition === "EXCELLENT" || condition === "CLEAN" ? "bg-success" : "bg-warning"
//           } text-[10px]`}
//         >
//           {condition}
//         </Badge> */}
//         {isOpen && (
//           <div className=" mt-1 w-auto bg-white border rounded shadow-lg">
//             <ul>
//               <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Excellent</li>
//               <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Clean</li>
//               <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Worn</li>
//               <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Lost</li>
//             </ul>
//           </div>
//         )}
//       </div>
//     );
//   };


// const CompleteHandover: React.FC = () => {
//     const [selected, setSelected] = useState(Session[0])
//     const [open, setOpen] = useState(false);
//     const [checked, setChecked] = useState<Record<number, boolean>>({ 0: true, 2: true })
//     const checkedCount = Object.values(checked).filter(Boolean).length
//     const [activeHandover, setActiveHandover] = useState(true)

//     const { auth, tokens } = useAuth();
//     const handleHandover = async () => {
//       try {
//         await apiClient({
//           endpoint: "/v1/equipment/handovers/e819027f-d5b4-4009-ad38-f7fc7802f83c/return",
//           method: "POST",
//           headers: {
//             // Authorization: `Bearer ${tokens?.accessToken}`,
//             "Authorization": "Bearer ",
//             "Content-Type": "application/json",
//           },
//           body: {
//             "items": [
//               {
//                 "handover_item_id": "98a7504f-a702-443c-aa7c-a488dd1f2ea7",
//                 "condition_in": "string",
//                 "is_lost": false,
//                 "is_damaged": false
//               }
//             ],
//             "damage_notes": "bad use"
//           }
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
              
//               <Button size="sm" variant="outline" className="text-brand border-brand"><Package className="w-3.5 h-3.5 mr-1.5" />Complete Handover</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[540px] p-0 gap-0 overflow-hidden rounded-2xl">
//         {/* Header */}
//         <DialogHeader className="px-6 pt-6 pb-4">
//         </DialogHeader>

//         <div className="px-6 pb-6 space-y-5 overflow-y-auto max-h-[80vh]">
//         <div className="lg:col-span-2">
//         <Card className="border-brand/30">
//               <CardHeader className="flex flex-row items-center justify-between pb-3">
//                 <CardTitle className="text-sm text-brand">Active Handover</CardTitle>
//                 <button onClick={() => setActiveHandover(false)} className="text-muted-foreground hover:text-foreground text-xs">✕</button>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="p-2.5 bg-muted/40 rounded-lg">
//                   <p className="text-[10px] text-muted-foreground uppercase font-semibold">Coach Detail</p>
//                   <p className="text-sm font-semibold mt-0.5">David Miller</p>
//                   <p className="text-xs text-muted-foreground">U-12 Morning Drills</p>
//                 </div>
//                 <div>
//                   <p className="text-[10px] text-muted-foreground uppercase font-semibold mb-2">Return Checklist</p>
//                   <div className="space-y-2">
//                     {checklist.map((c, i) => (
//                       <div key={i} className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${c.checked ? "border-brand bg-brand" : "border-border"}`}>
//                             {c.checked && <CheckCircle2 className="w-3 h-3 text-white" />}
//                           </div>
//                           <span className="text-xs">{c.item}</span>
//                         </div>
                        
//                         <BadgeDropdown condition={c.condition} />
//                       </div>
//                     ))}
//                   </div>
                  
//                 </div>
//                 <div className="p-2.5 bg-muted/40 rounded-lg flex items-start gap-2">
//                   <input type="checkbox" className="mt-0.5" />
//                   <div>
//                     <p className="text-xs font-semibold">Losses/Damage Reported</p>
//                     <p className="text-[11px] text-muted-foreground">Mark if any equipment is missing or damaged.</p>
//                   </div>
//                 </div>
//                 <Button onClick={handleHandover} className="w-full">Confirm Return & Approve Payment</Button>
//               </CardContent>
//             </Card>
//         </div>
//         </div>
//       </DialogContent>
//     </Dialog>
            
//         </div>
//     );
// };

// export default CompleteHandover;