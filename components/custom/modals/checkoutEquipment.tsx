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
import { Package, CheckCircle2} from "lucide-react";
import { apiClient } from "@/lib/api-client";

const CONDITIONS = ["excellent", "good", "fair", "needs_repair", "condemned"];

interface CheckoutEquipmentModalProps {
  coachId: string;
  sessionId: string;
}

interface Equipment {
  id: string;
  name: string;
  category: string;
  stock: number;
}

interface SelectedItem {
  equipment_id: string;
  qty: number;
  condition_out: string;
  _name: string;
  _stock: number;
}

// Replace this with a fetch from your API
const MOCK_CATALOG: Equipment[] = [
  { id: "1b47d064-7196-48db-a5fb-4b26cb307b40", name: "Football (Size 5)", category: "Ball", stock: 24 },
  { id: "8b199dbb-c404-45c9-9fdb-58cb41316a3a", name: "Training Cones (Set of 20)", category: "Field Equipment", stock: 15 },
  { id: "98a7504f-a702-443c-aa7c-a488dd1f2ea7", name: "Goalkeeper Gloves", category: "Protective Gear", stock: 8 },
  { id: "c3d4e5f6-3456-4cde-a012-ccddeeff2233", name: "Training Bib (Yellow)", category: "Apparel", stock: 30 },
  { id: "d4e5f607-4567-4def-b123-ddeeff003344", name: "Training Bib (Red)", category: "Apparel", stock: 28 },
  { id: "e5f60718-5678-4ef0-c234-eeff00114455", name: "Agility Ladder", category: "Training Aid", stock: 6 },
  { id: "f6071829-6789-4f01-d345-ff0011225566", name: "Resistance Band", category: "Training Aid", stock: 20 },
  { id: "0718293a-789a-4012-e456-001122336677", name: "Whistle", category: "Referee Equipment", stock: 10 },
  { id: "18293a4b-89ab-4123-f567-112233447788", name: "Corner Flag Set", category: "Field Equipment", stock: 4 },
  { id: "293a4b5c-9abc-4234-0678-223344558899", name: "First Aid Kit", category: "Medical", stock: 5 },
];

export default function CheckoutHandover({ sessionId,coachId }: CheckoutEquipmentModalProps) {
  const [catalog, setCatalog] = useState<Equipment[]>(MOCK_CATALOG);
  const [selected, setSelected] = useState<SelectedItem[]>([]);
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Swap this for your real API call
  // useEffect(() => {
  //   fetch("/api/equipment", { headers: { Authorization: `Bearer ${token}` } })
  //     .then((r) => r.json())
  //     .then(setCatalog);
  // }, []);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const filtered = catalog.filter(
    (eq) =>
      eq.name.toLowerCase().includes(query.toLowerCase()) ||
      eq.category.toLowerCase().includes(query.toLowerCase())
  );

  function selectItem(eq: Equipment) {
    if (selected.some((s) => s.equipment_id === eq.id)) return;
    setSelected((prev) => [
      ...prev,
      { equipment_id: eq.id, qty: 1, condition_out: "Good", _name: eq.name, _stock: eq.stock },
    ]);
    setQuery("");
    setDropdownOpen(false);
  }

  function removeItem(id: string) {
    setSelected((prev) => prev.filter((s) => s.equipment_id !== id));
  }

  function changeQty(id: string, delta: number) {
    setSelected((prev) =>
      prev.map((s) =>
        s.equipment_id === id
          ? { ...s, qty: Math.max(1, Math.min(s._stock, s.qty + delta)) }
          : s
      )
    );
  }

  function changeCondition(id: string, value: string) {
    setSelected((prev) =>
      prev.map((s) => (s.equipment_id === id ? { ...s, condition_out: value } : s))
    );
  }

  function clearAll() {
    setSelected([]);
    setQuery("");
  }



  async function handleSubmit() {
    const payload = {
      coach_id: coachId,
      session_id: sessionId,
      items: selected.map(({ equipment_id, qty, condition_out }) => ({
        equipment_id,
        qty,
        condition_out,
      })),
    };
    try {
      await apiClient({
        endpoint: "/v1/equipment/handovers",
        method: "POST",
        headers: {
          // Authorization: `Bearer ${tokens?.accessToken}`,
          "Authorization": "Bearer ",
          "Content-Type": "application/json",
        },
        body: payload
      });
      // setOpen(false);
      // onConfirm();
      // toast.success("Availability confirmed!");
    } catch (error) {
      // toast.error("Something went wrong. Please try again later.");
    }

    // Replace with your actual endpoint
    console.log("POST payload:", payload);

    // Example:
    // const res = await fetch("/api/equipment/checkout", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify(payload),
    // });
    // if (!res.ok) throw new Error("Checkout failed");

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  }

  const payload = {
    items: selected.map(({ equipment_id, qty, condition_out }) => ({
      equipment_id,
      qty,
      condition_out,
    })),
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm"><Package className="w-3.5 h-3.5 mr-1.5" />Check-out Equipment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px] p-0 gap-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Equipment issuance
          </DialogTitle>
        </DialogHeader>
        <div className="max-w-2xl mx-auto p-6" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-medium text-gray-900">Equipment issuance</h2>
              <p className="text-sm text-gray-500 mt-0.5">Search and select equipment to check out</p>
            </div>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-600">
              {selected.length} item{selected.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Search */}
          <div className="relative mb-4" ref={searchRef}>
            <div className="relative">
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
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setDropdownOpen(true)}
                placeholder="Search equipment by name or category…"
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
              />
            </div>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden max-h-56 overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-400">No equipment found</div>
                ) : (
                  filtered.map((eq) => {
                    const already = selected.some((s) => s.equipment_id === eq.id);
                    return (
                      <button
                        key={eq.id}
                        onClick={() => selectItem(eq)}
                        disabled={already}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-left border-b border-gray-100 last:border-0 transition ${
                          already
                            ? "opacity-40 cursor-default"
                            : "hover:bg-gray-50 cursor-pointer"
                        }`}
                      >
                        <div>
                          <p className="text-sm text-gray-900">{eq.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{eq.stock} in stock</p>
                        </div>
                        <span className="text-xs px-2 py-0.5 border border-gray-200 rounded-full text-gray-500 ml-3 shrink-0">
                          {eq.category}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Selected items */}
          {selected.length === 0 ? (
            <div className="border border-dashed border-gray-200 rounded-xl text-center py-10 mb-5 text-sm text-gray-400">
              Search above and select equipment to begin issuance
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 mb-5">
              {selected.map((item) => (
                <div
                  key={item.equipment_id}
                  className="bg-white border border-gray-200 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item._name}</p>
                      <p className="text-xs text-gray-400 font-mono mt-0.5 break-all">
                        {item.equipment_id}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.equipment_id)}
                      className="ml-3 shrink-0 w-7 h-7 flex items-center justify-center border border-gray-200 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition"
                    >
                      ×
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Qty */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Quantity</label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => changeQty(item.equipment_id, -1)}
                          className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition text-base"
                        >
                          −
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.qty}</span>
                        <button
                          onClick={() => changeQty(item.equipment_id, 1)}
                          className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition text-base"
                        >
                          +
                        </button>
                        <span className="text-xs text-gray-400 ml-1">/ {item._stock}</span>
                      </div>
                    </div>

                    {/* Condition */}
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Condition out</label>
                      <select
                        value={item.condition_out}
                        onChange={(e) => changeCondition(item.equipment_id, e.target.value)}
                        className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                      >
                        {CONDITIONS.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={clearAll}
              className="text-sm text-gray-400 hover:text-gray-600 transition"
            >
              Clear all
            </button>
            <div className="flex items-center gap-3">
              {submitted && (
                <span className="text-xs text-green-600 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  Submitted
                </span>
              )}
              <button
                onClick={handleSubmit}
                disabled={selected.length === 0}
                className="px-5 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Issue equipment
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
// import { Checkbox } from "@/components/ui/checkbox";


// interface items{
//   equipment_id: string;
//   qty: number;
//   condition_out: string;
// }
// interface CheckOutHandoverFormData {
//   coach_id: string;
//   session_id: string;
//   items: items[];
// }

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

//   const EQUIPMENTS = [
//     { id: "balls", label: "Balls" },
//     { id: "training_gear", label: "Training Gear" },
//     { id: "field_equipment", label: "Field Equipment" },
//     { id: "medical_kits", label: "Medical Kits" },
//     { id: "goalkeeping", label: "Goalkeeping" },
//     { id: "protective", label: "Protective" }
//   ];

//   const checklist = [
//     { item: "15x Size 5 Balls", condition: "EXCELLENT", checked: true },
//     { item: "20x Training Bibs", condition: "CLEAN", checked: true },
//     { item: "4x Pop-up Goals", condition: "WORN", checked: false },
//   ]

//   type Item = {
//     equipment_id: string;
//     qty: number;
//     condition_out: string;
//   };
  
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


// const CheckoutHandover: React.FC = () => {
//     const [selected, setSelected] = useState(Session[0])
//     const [open, setOpen] = useState(false);
//     const [checked, setChecked] = useState<Record<number, boolean>>({ 0: true, 2: true })
//     const checkedCount = Object.values(checked).filter(Boolean).length
//     const [activeHandover, setActiveHandover] = useState(true)
//     const [form, setForm] = useState<CheckOutHandoverFormData>({
//       // name: "", // Removed the name property
//       type: "",
//       coach_id: "",
//       venue_id: "",
//       session_date: "",
//       start_time: "",
//       end_time:"",
//       enrollment_cap: 0,
//       session_objective: "",
//       equipment_needed: [],
//       drills: [],
//     });

//     const { auth, tokens } = useAuth();

//     const [items, setItems] = useState<Item[]>([
//       { equipment_id: "", qty: 0, condition_out: "" },
//     ]);
  
//     const handleChange = (
//       index: number,
//       field: keyof Item,
//       value: string | number
//     ) => {
//       const updated = [...items];
//       updated[index][field] = value as never;
//       setItems(updated);
//     };
  
//     const addItem = () => {
//       setItems([
//         ...items,
//         { equipment_id: "", qty: 0, condition_out: "" },
//       ]);
//     };
  
//     const removeItem = (index: number) => {
//       const updated = items.filter((_, i) => i !== index);
//       setItems(updated);
//     };
  
  
//     const handleCheckout = async () => {
//       try {
//         await apiClient({
//           endpoint: "/v1/equipment/handovers",
//           method: "POST",
//           headers: {
//             // Authorization: `Bearer ${tokens?.accessToken}`,
//             "Authorization": "Bearer ",
//             "Content-Type": "application/json",
//           },
//           body: {
//             "coach_id": "d574f8cc-2ed3-4248-862c-e590d61f15ec",
//             "session_id": "247710be-89b4-48c4-9c84-1081553e432f",
//             "items": [
//               {
//                 "equipment_id": "98a7504f-a702-443c-aa7c-a488dd1f2ea7",
//                 "qty": 10,
//                 "condition_out": "excellent"
//               }
//             ]
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
//               <Button size="sm"  ><Package className="w-3.5 h-3.5 mr-1.5" />Check-out Equipment</Button>
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
                  
//                   <h2>Equipment Checkout</h2>

//                       {items.map((item, index) => (
//                         <div
//                           key={index}
//                           style={{
//                             border: "1px solid #ccc",
//                             padding: 10,
//                             marginBottom: 10,
//                           }}
//                         >
//                           <input
//                             type="text"
//                             placeholder="Equipment ID"
//                             value={item.equipment_id}
//                             onChange={(e) =>
//                               handleChange(index, "equipment_id", e.target.value)
//                             }
//                           />

//                           <input
//                             type="number"
//                             placeholder="Quantity"
//                             value={item.qty}
//                             onChange={(e) =>
//                               handleChange(index, "qty", Number(e.target.value))
//                             }
//                           />

//                           <input
//                             type="text"
//                             placeholder="Condition Out"
//                             value={item.condition_out}
//                             onChange={(e) =>
//                               handleChange(index, "condition_out", e.target.value)
//                             }
//                           />

//                           <button onClick={() => removeItem(index)}>Remove</button>
//                         </div>
//                       ))}

//                       <button onClick={addItem}>Add Item</button>

//                       <br /><br />

//                       <button onClick={handleCheckout}>Submit</button>
//                   {/* <div className="space-y-2">
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
//                   </div> */}
                  
//                 </div>
//                 <div className="p-2.5 bg-muted/40 rounded-lg flex items-start gap-2">
//                   <input type="checkbox" className="mt-0.5" />
//                   <div>
//                     <p className="text-xs font-semibold">Losses/Damage Reported</p>
//                     <p className="text-[11px] text-muted-foreground">Mark if any equipment is missing or damaged.</p>
//                   </div>
//                 </div>
//                 <Button  onClick={handleCheckout} className="w-full">Confirm Return & Approve Payment</Button>
//               </CardContent>
//             </Card>
//         </div>
//         </div>
//       </DialogContent>
//     </Dialog>
            
//         </div>
//     );
// };

// export default CheckoutHandover;