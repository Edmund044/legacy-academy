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
import { UserRoundPlus, Upload } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";

// interface AddCoachModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSubmit?: (data: CoachFormData) => void;
// }

interface CoachFormData {
  full_name: string;
  speciality: string;
  license: string;
  experience_years: string;
  career_win_rate: string;
  primary_assigned_teams: string[];
  bio: string;
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

export default function AddCoachModal(
//     {
//   open,
//   onOpenChange,
//   onSubmit,
// }: AddCoachModalProps
) {
  const { tokens } = useAuth();
  const [open, setOpen] = useState(false);
  const [coaches, setCoaches] = useState<CoachProfile[]>([])
  const [form, setForm] = useState<CoachFormData>({
    full_name: "",
    speciality: "",
    license: "",
    experience_years: "",
    career_win_rate : "",
    primary_assigned_teams: [],
    bio: "",
  });


  const handleTeamToggle = (teamId: string, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      primary_assigned_teams: checked
        ? [...prev.primary_assigned_teams, teamId]
        : prev.primary_assigned_teams.filter((t) => t !== teamId),
    }));
  };

  const handleSubmit = async () => {
    try {
      await apiClient({
        endpoint: "/v1/coaches",
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: {
          ...form,
        },
      });
      setOpen(false);
      toast.success("Availability confirmed!");
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };


  return (
    <Dialog 
      open={open} onOpenChange={setOpen}
    >
              <DialogTrigger asChild>
        <Button size="sm"> + Add Coach</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px] p-0 gap-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <UserRoundPlus className="w-5 h-5 text-red-600" />
            Add New Coach
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5 overflow-y-auto max-h-[80vh]">

          {/* Full Name + Role */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <Input
                placeholder="e.g. Pep Guardiola"
                value={form.full_name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, full_name: e.target.value }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Role / Specialization
              </Label>
              <Select
                value={form.speciality}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, speciality: val }))
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

          {/* License + Years */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                License / Certifications
              </Label>
              <Input
                placeholder="e.g. UEFA Pro, CAF A"
                value={form.license}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, license: e.target.value }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Years of Experience
              </Label>
              <Input
                placeholder="e.g. 10"
                type="number"
                min={0}
                value={form.experience_years}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    experience_years: e.target.value,
                  }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Assigned Teams */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Primary Assigned Teams
            </Label>
            <div className="flex items-center gap-4">
              {TEAM_OPTIONS.map((team) => (
                <div key={team.id} className="flex items-center gap-2">
                  <Checkbox
                    id={team.id}
                    checked={form.primary_assigned_teams.includes(team.id)}
                    onCheckedChange={(checked) =>
                      handleTeamToggle(team.id, !!checked)
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
          {/** Career win rate */}
          <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Career Win Rate
              </Label>
              <Input
                placeholder="e.g. 80"
                type="number"
                min={0}
                value={form.career_win_rate}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    career_win_rate: e.target.value,
                  }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
          {/* Bio */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-700">
              Brief Bio / Experience Summary
            </Label>
            <Textarea
              placeholder="Describe the coach's coaching philosophy and career highlights..."
              rows={4}
              value={form.bio}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, bio: e.target.value }))
              }
              className="resize-none placeholder:text-gray-400"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6"
            >
              Add Coach
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}