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


import { Package, CheckCircle2} from "lucide-react"

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

  const checklist = [
    { item: "15x Size 5 Balls", condition: "EXCELLENT", checked: true },
    { item: "20x Training Bibs", condition: "CLEAN", checked: true },
    { item: "4x Pop-up Goals", condition: "WORN", checked: false },
  ]
  
  const BadgeDropdown = ({ condition }: { condition: string }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => setIsOpen(!isOpen);
  
    return (
      <div className="relative inline-block">
      <Badge variant={condition === "EXCELLENT" || condition === "CLEAN" ? "success" : "warning"} className="text-[10px]" onClick={toggleDropdown}>{condition}</Badge> 
        {/* <Badge
          onClick={toggleDropdown}
          className={`badge ${
            condition === "EXCELLENT" || condition === "CLEAN" ? "bg-success" : "bg-warning"
          } text-[10px]`}
        >
          {condition}
        </Badge> */}
        {isOpen && (
          <div className=" mt-1 w-auto bg-white border rounded shadow-lg">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Excellent</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Clean</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Worn</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Lost</li>
            </ul>
          </div>
        )}
      </div>
    );
  };


const CompleteHandover: React.FC = () => {
    const [selected, setSelected] = useState(Session[0])
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState<Record<number, boolean>>({ 0: true, 2: true })
    const checkedCount = Object.values(checked).filter(Boolean).length
    const [activeHandover, setActiveHandover] = useState(true)
    return (
        <div>
                <Dialog 
    // open={open} onOpenChange={onOpenChange}
    >
              <DialogTrigger asChild>
              
              <Button size="sm" variant="outline" className="text-brand border-brand"><Package className="w-3.5 h-3.5 mr-1.5" />Complete Handover</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px] p-0 gap-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5 overflow-y-auto max-h-[80vh]">
        <div className="lg:col-span-2">
        <Card className="border-brand/30">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm text-brand">Active Handover</CardTitle>
                <button onClick={() => setActiveHandover(false)} className="text-muted-foreground hover:text-foreground text-xs">✕</button>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-2.5 bg-muted/40 rounded-lg">
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold">Coach Detail</p>
                  <p className="text-sm font-semibold mt-0.5">David Miller</p>
                  <p className="text-xs text-muted-foreground">U-12 Morning Drills</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase font-semibold mb-2">Return Checklist</p>
                  <div className="space-y-2">
                    {checklist.map((c, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${c.checked ? "border-brand bg-brand" : "border-border"}`}>
                            {c.checked && <CheckCircle2 className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-xs">{c.item}</span>
                        </div>
                        
                        <BadgeDropdown condition={c.condition} />
                      </div>
                    ))}
                  </div>
                  
                </div>
                <div className="p-2.5 bg-muted/40 rounded-lg flex items-start gap-2">
                  <input type="checkbox" className="mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold">Losses/Damage Reported</p>
                    <p className="text-[11px] text-muted-foreground">Mark if any equipment is missing or damaged.</p>
                  </div>
                </div>
                <Button className="w-full">Confirm Return & Approve Payment</Button>
              </CardContent>
            </Card>
        </div>
        </div>
      </DialogContent>
    </Dialog>
            
        </div>
    );
};

export default CompleteHandover;