"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRoundPlus } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";
import React from "react";
import { CoachProfile } from "@/types/coaches";
import { Equipment } from "@/types/equipment";
import { ApiResponse } from "@/types/api-response";

interface AddCoachModalProps {
  onSubmit: () => void;
}

interface SessionFormData {
  name: string;
  type: string;
  coach_id: string | null;
  venue_id: string;
  session_date: Date;
  start_time: string;
  end_time: string;
  enrollment_cap: number;
  session_objective: string;
  equipment_needed: string[];
  drills: string[];
}

const TEAM_OPTIONS = [
  { id: "under-15s", label: "Under-15s" },
  { id: "under-18s", label: "Under-18s" },
  { id: "first-team", label: "First Team" },
];

const SPECIALIZATIONS = [
  "Head Coach",
  "Assistant Coach",
  "Goalkeeper Coach",
  "Fitness Coach",
  "Tactical Analyst",
  "Youth Development",
];

const SESSION_TYPE = [
  "group",
  "individual"
]

const EQUIPMENTS = [
  { id: "balls", label: "Balls" },
  { id: "training_gear", label: "Training Gear" },
  { id: "field_equipment", label: "Field Equipment" },
  { id: "medical_kits", label: "Medical Kits" },
  { id: "goalkeeping", label: "Goalkeeping" },
  { id: "protective", label: "Protective" }
];

const DRILLS = [
  { id: "drill-1", label: "Passing Drill" },
  { id: "drill-2", label: "Shooting Drill" },
  { id: "drill-3", label: "Defensive Drill" },
  { id: "drill-4", label: "Tactical Drill" },
  { id: "drill-5", label: "Fitness Drill" },
]

const VENUE = [
  { id: "d584f8cc-2ed3-4248-862c-e590d61f15ec", label: "Main" },
  { id: "d584f8cc-2ed3-4248-862c-e590d61f16ec", label: "Other" },

];

const COACHES = [
  {
    id: "d574f8cc-2ed3-4248-862c-e590d61f15ec", name: "Julian Nagelsmann", role: "Tactical Analysis Specialist", license: "UEFA Pro License",
    bio: "Former professional focused on data-driven tactical periodization and youth elite development. Leading Elite Division since 2021.",
    stats: { experience: 12, teams: 8, winRate: 68 },
    teams: ["Under-19 (Elite Division · 24 players)", "Under-16 (Regional League · 18 players)"],
    rating: 4.9, skills: [{ name: "Tactics implementation", pct: 95 }, { name: "Youth Development", pct: 88 }, { name: "Video Analysis", pct: 92 }],
    upcoming: [{ date: "OCT 24", title: "U-19 Tactical Training", time: "15:00–17:30", venue: "Pitch 3" }, { date: "OCT 26", title: "U-16 Match vs FC Lions", time: "10:30", venue: "Main Stadium" }]
  },
  {
    id: "d574f8cc-2ed3-4248-862c-e590d61f19ec", name: "Sarah Jenkins", role: "Speed & Agility Coach", license: "UEFA A Candidate",
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

export default function AddSessionModal(
    {
  onSubmit,
}: AddCoachModalProps
) {
  const [coaches, setCoaches] = useState<CoachProfile[]>([])
  const [open, setOpen] = useState(false);
  const { user, tokens } = useAuth();
  const [equipments  , setEquipments] = useState<Equipment[]>([])
  const [form, setForm] = useState<SessionFormData>({
    name: "",
    type: "",
    coach_id: user?.id ?? null,
    venue_id: "",
    session_date: new Date(),
    start_time: "",
    end_time:"",
    enrollment_cap: 0,
    session_objective: "",
    equipment_needed: [],
    drills: [],
  });



  const fetchEquipment = async () => {
    try {
      const response = await apiClient<ApiResponse<Equipment[]>>({
        endpoint: `/v1/equipment/inventory?page=1&per_page=100`,
        method: "GET",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOWJmOTcxMS0zNTI5LTRhYzMtOWIxMC02MzJlNjJhMWE0MTkiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzM5NDg3MjcsInR5cGUiOiJhY2Nlc3MifQ.Ez0ivwUJe2eeCZGsj0LkLfoTKyzLoH3_o4LVZwn_v90",
        },
      });
  
      setEquipments((response?.data as Equipment[]) ?? []);
    } catch (error) {
      alert("Failed to fetch equipment inventory. Please try again later.");
      // toast.error("Failed to fetch your submitted requests.");
    }
  };



  const handleEquipmentToggle = (teamId: string, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      equipment_needed: checked
        ? [...prev.equipment_needed, teamId]
        : prev.equipment_needed.filter((t) => t !== teamId),
    }));
  };

  const handleDrillsToggle = (teamId: string, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      drills: checked
        ? [...prev.drills, teamId]
        : prev.drills.filter((t) => t !== teamId),
    }));
  };


  const handleSubmit = async () => {
    try {
      await apiClient({
        endpoint: "/v1/sessions",
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: {
          ...form
        },
      });
      setOpen(false);
      onSubmit();
      // toast.success("Availability confirmed!");
    } catch (error) {
      // toast.error("Something went wrong. Please try again later.");
    }
  };

  const fetchCoaches = async () => {
    try {
      const response = await apiClient<ApiResponse<CoachProfile[]>>({
        endpoint: `v1/coaches?page=1&per_page=100`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokens?.accessToken}`,
        },
      });

      setCoaches((response?.data as CoachProfile[]) ?? []);
    } catch (error) {
      alert("Failed to fetch coaches. Please try again later.");
    }
  };


  React.useEffect(() => {fetchEquipment(),fetchCoaches()},[]);

  return (
    <Dialog 
    open={open} onOpenChange={setOpen}
    >
              <DialogTrigger asChild>
        <Button size="sm" className="mt-3 bg-white text-brand hover:bg-white/90"> + Add Session</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px] p-0 gap-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <UserRoundPlus className="w-5 h-5 text-red-600" />
            Add New Session
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5 overflow-y-auto max-h-[80vh]">

          {/* Full Name + Role */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Session Name
              </Label>
              <Input
                placeholder="e.g. Pep Guardiola"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Session Objective
              </Label>
              <Input
                placeholder="e.g. Pep Guardiola"
                value={form.session_objective}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, session_objective: e.target.value }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Session Type
              </Label>
              <Select
                value={form.type}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, type: val }))
                }
              >
                <SelectTrigger className="text-gray-500">
                  <SelectValue placeholder="Session Type" />
                </SelectTrigger>
                <SelectContent>
                  {SESSION_TYPE.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

                    {/* Date & time */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-gray-700">
                          Session Start Time
                        </Label>
                        <Input
                          type="time"
                          value={form.start_time}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, start_time: e.target.value }))
                          }
                          className="placeholder:text-gray-400"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-gray-700">
                          Session End Time
                        </Label>
                        <Input
                          type="time"
                          value={form.end_time}
                          onChange={(e) =>
                            setForm((prev) => ({ ...prev, end_time: e.target.value }))
                          }
                          className="placeholder:text-gray-400"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-gray-700">
                          Session Date
                        </Label>
                        <Input
                type="date"
                placeholder="e.g. 01/01/2000"
                value={form.session_date.toISOString().split('T')[0]}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, session_date: new Date(e.target.value) }))
                }
                className="placeholder:text-gray-400"></Input>
                        {/* <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-[240px] justify-start text-left">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {session_date ? format(session_date, 'PPP') : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={session_date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover> */}
                      </div>
                    </div>

                              {/* Coach , venue and enrollment cap */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Coach
              </Label>
              <Select
                value={form.coach_id ?? undefined}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, coach_id: val }))
                }
              >
                <SelectTrigger className="text-gray-500">
                  <SelectValue placeholder="Select Coach" />
                </SelectTrigger>
                <SelectContent>
                  {coaches.map((coach) => (
                    <SelectItem key={coach.id} value={String(coach.id)}>
                      {coach.name} - {coach.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Venue 
              </Label>
              <Select
                value={form.venue_id}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, venue_id: val }))
                }
              >
                <SelectTrigger className="text-gray-500">
                  <SelectValue placeholder="Select Venue" />
                </SelectTrigger>
                <SelectContent>
                  {VENUE.map((venue) => (
                    <SelectItem key={venue.id} value={venue.id}>
                      {venue.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Enrollment Cap
              </Label>
              <Input
                placeholder="e.g. 30"
                type="number"
                value={form.enrollment_cap}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, enrollment_cap: Number(e.target.value) }))
                }
                className="placeholder:text-gray-400"/>
            </div>
          </div>

                    {/* Equipment Needed */}
                    <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Equipment Needed
            </Label>
            <div className="gap-4">
              {equipments.map((equipment) => (
                <div key={equipment.name} className="flex items-center gap-2">
                  <Checkbox
                    id={equipment.name}
                    checked={form.equipment_needed.includes(equipment.name)}
                    onCheckedChange={(checked) =>
                      handleEquipmentToggle(equipment.name, !!checked)
                    }
                    className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                  />
                  <label
                    htmlFor={equipment.name}
                    className="text-sm text-gray-700 cursor-pointer select-none"
                  >
                    {equipment.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* Drills */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Drills
            </Label>
            <div className="gap-4">
              {DRILLS.map((drill) => (
                <div key={drill.id} className="flex items-center gap-2">
                  <Checkbox
                    id={drill.id}
                    checked={form.drills.includes(drill.id)}
                    onCheckedChange={(checked) =>
                      handleDrillsToggle(drill.id, !!checked)
                    }
                    className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                  />
                  <label
                    htmlFor={drill.id}
                    className="text-sm text-gray-700 cursor-pointer select-none"
                  >
                    {drill.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
            </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="ghost"
            //   onClick={handleCancel}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6"
            >
              Add Session
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}