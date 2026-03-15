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
import { UserRoundPlus, Edit, Upload } from "lucide-react";

// interface EditCoachModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSubmit?: (data: CoachFormData) => void;
// }

interface CoachFormData {
  profilePhoto: File | null;
  fullName: string;
  specialization: string;
  license: string;
  yearsOfExperience: string;
  winRate: string;
  assignedTeams: string[];
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

export default function EditCoachModal(
//   {
//   open,
//   onOpenChange,
//   onSubmit,
// }: EditCoachModalProps
) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [form, setForm] = useState<CoachFormData>({
    profilePhoto: null,
    fullName: "",
    specialization: "",
    license: "",
    yearsOfExperience: "",
    winRate : "",
    assignedTeams: [],
    bio: "",
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, profilePhoto: file }));
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleTeamToggle = (teamId: string, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      assignedTeams: checked
        ? [...prev.assignedTeams, teamId]
        : prev.assignedTeams.filter((t) => t !== teamId),
    }));
  };

  // const handleSubmit = () => {
  //   onSubmit?.(form);
  // };

  // const handleCancel = () => {
  //   onOpenChange(false);
  // };

  return (
    <Dialog 
    // open={open} onOpenChange={onOpenChange}
    >
              <DialogTrigger asChild>
              <Button size="sm" variant="outline"><Edit className="w-3.5 h-3.5 mr-1.5" />Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px] p-0 gap-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <UserRoundPlus className="w-5 h-5 text-red-600" />
            Edit Coach
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* Photo Upload */}
          <div
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 py-6 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handlePhotoChange}
            />
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile preview"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center overflow-hidden">
                {/* Silhouette SVG */}
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-14 h-14"
                >
                  <ellipse cx="32" cy="24" rx="10" ry="11" fill="#a0522d" opacity="0.5" />
                  <path
                    d="M12 56c0-11 9-18 20-18s20 7 20 18"
                    fill="#a0522d"
                    opacity="0.5"
                  />
                </svg>
              </div>
            )}
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-700 flex items-center gap-1 justify-center">
                <Upload className="w-3.5 h-3.5" />
                Upload Profile Photo
              </p>
              <p className="text-xs text-gray-400">PNG or JPG, max 5MB</p>
            </div>
          </div>

          {/* Full Name + Role */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <Input
                placeholder="e.g. Pep Guardiola"
                value={form.fullName}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, fullName: e.target.value }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Role / Specialization
              </Label>
              <Select
                value={form.specialization}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, specialization: val }))
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
                value={form.yearsOfExperience}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    yearsOfExperience: e.target.value,
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
                    checked={form.assignedTeams.includes(team.id)}
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
                value={form.winRate}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    yearsOfExperience: e.target.value,
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
              variant="ghost"
              // onClick={handleCancel}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </Button>
            <Button
              // onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6"
            >
              Edit Coach
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}