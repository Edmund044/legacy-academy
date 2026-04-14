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
import { CoachProfile } from "@/types/coaches";
import { Equipment } from "@/types/equipment";
// interface EditCoachModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSubmit?: (data: CoachFormData) => void;
// }

// interface SessionFormData {
//   session_name: string;
//   session_objective: string;
//   equipment_needed: string[];
//   drills: string[];
// }
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

const SESSION_TYPE = [
  "group",
  "individual"
]
export default function EditSessionModal(
//     {
//   open,
//   onOpenChange,
//   onSubmit,
// }: EditCoachModalProps
) {
  // const fileInputRef = useRef<HTMLInputElement>(null);
  // const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [coaches, setCoaches] = useState<CoachProfile[]>([])
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
  // const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  //   setForm((prev) => ({ ...prev, profilePhoto: file }));
  //   setPreviewUrl(URL.createObjectURL(file));
  // };

  const handleEquipmentToggle = (teamId: string, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      assignedTeams: checked
        ? [...prev.equipment_needed, teamId]
        : prev.equipment_needed.filter((t) => t !== teamId),
    }));
  };

  const handleDrillsToggle = (teamId: string, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      assignedTeams: checked
        ? [...prev.drills, teamId]
        : prev.drills.filter((t) => t !== teamId),
    }));
  };
  const handleSubmit = async () => {
    try {
      await apiClient({
        endpoint: "/v1/sessions/19579024-8543-4f0f-ac90-c1ccbdb85792",
        method: "PATCH",
        headers: {
          // Authorization: `Bearer ${tokens?.accessToken}`,
          "Authorization": "Bearer ",
          "Content-Type": "application/json",
        },
        body: {
          "name": "Attack Buildup_UPDATE",
          "type": "Group",
          "coach_id": "d574f8cc-2ed3-4248-862c-e590d61f15ec",
          "venue_id": "d584f8cc-2ed3-4248-862c-e590d61f15ec",
          "session_date": "2026-03-30",
          "start_time": "09:00",
          "end_time": "11:00",
          "enrollment_cap": 30
        },
      });
      // setOpen(false);
      // onConfirm();
      // toast.success("Availability confirmed!");
    } catch (error) {
      // toast.error("Something went wrong. Please try again later.");
    }
  };

//   const handleCancel = () => {
//     onOpenChange(false);
//   };

  return (
    <Dialog 
    // open={open} onOpenChange={onOpenChange}
    >
              <DialogTrigger asChild>
              
        <Button size="sm" className=" bg-white text-brand hover:bg-white/90"> + Edit Session</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px] p-0 gap-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <UserRoundPlus className="w-5 h-5 text-red-600" />
            Edit New Session
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