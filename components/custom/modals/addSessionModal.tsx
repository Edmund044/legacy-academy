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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRoundPlus, Upload, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { setDate } from "date-fns";
import { format } from "path";

// interface AddCoachModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSubmit?: (data: CoachFormData) => void;
// }

interface SessionFormData {
  session_name: string;
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

export default function AddSessionModal(
//     {
//   open,
//   onOpenChange,
//   onSubmit,
// }: AddCoachModalProps
) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [date, setDate] = useState<Date>();
  const [form, setForm] = useState<SessionFormData>({
    session_name: "",
    session_objective: "",
    equipment_needed: [],
    drills: [],
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, profilePhoto: file }));
    setPreviewUrl(URL.createObjectURL(file));
  };

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
//   const handleSubmit = () => {
//     onSubmit?.(form);
//   };

//   const handleCancel = () => {
//     onOpenChange(false);
//   };

  return (
    <Dialog 
    // open={open} onOpenChange={onOpenChange}
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Session Name
              </Label>
              <Input
                placeholder="e.g. Pep Guardiola"
                value={form.session_name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, session_name: e.target.value }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Session Objective
              </Label>
              <Select
                value={form.session_objective}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, session_objective: val }))
                }
              >
                <SelectTrigger className="text-gray-500">
                  <SelectValue placeholder="Select Specialization" />
                </SelectTrigger>
                <SelectContent>
                  {SPECIALIZATIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Equipment Needed */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Equipment Needed
            </Label>
            <div className="flex items-center gap-4">
              {TEAM_OPTIONS.map((team) => (
                <div key={team.id} className="flex items-center gap-2">
                  <Checkbox
                    id={team.id}
                    checked={form.equipment_needed.includes(team.id)}
                    onCheckedChange={(checked) =>
                      handleEquipmentToggle(team.id, !!checked)
                    }
                    className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                  />
                  <label
                    htmlFor={team.id}
                    className="text-sm text-gray-700 cursor-pointer select-none"
                  >
                    {team.label}
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
            <div className="flex items-center gap-4">
              {TEAM_OPTIONS.map((team) => (
                <div key={team.id} className="flex items-center gap-2">
                  <Checkbox
                    id={team.id}
                    checked={form.equipment_needed.includes(team.id)}
                    onCheckedChange={(checked) =>
                      handleDrillsToggle(team.id, !!checked)
                    }
                    className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                  />
                  <label
                    htmlFor={team.id}
                    className="text-sm text-gray-700 cursor-pointer select-none"
                  >
                    {team.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
                    {/* Date & time */}
                    <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Session Time
              </Label>
              <Select
                value={form.session_objective}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, session_objective: val }))
                }
              >
                <SelectTrigger className="text-gray-500">
                  <SelectValue placeholder="Select Specialization" />
                </SelectTrigger>
                <SelectContent>
                  {SPECIALIZATIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Session Objective
              </Label>
                  <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] justify-start text-left">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
            </div>
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
              Add Session
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}