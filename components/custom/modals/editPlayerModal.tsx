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

// interface AddCoachModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onSubmit?: (data: CoachFormData) => void;
// }

interface PlayerFormData {
  profilePhoto: File | null;
  fullName: string;
  position: string;
  training_center: string;
  height: string;
  weight: string;
  top_speed:  string;
  bmi: string;
  goals:  string;
  assists: string;
  pass_accuracy: string;
  assignedTeam: string;
  sponsored: string;
  guardian: string;
}

const TEAM_OPTIONS = [
  "Under-7",
  "Under-9",
  "Under-11",
  "Under-13",
  "Under-15",
  "Under-17",
  "Under-19",
  "Under-21",
];

const SPONSORSHIP_OPTIONS = [
  { id: "1", label: "Full" },
  { id: "2", label: "Partial" },
  { id: "3", label: "None" },
]

const SPECIALIZATIONS = [
  "Striker",
  "Attacking Midfielder",
  "Goalkeeper",
  "Defensive Midfielder",
  "Left Back",
  "Right Back",
  "Center Back",
  "Left Winger",
  "Right Winger",
];


export default function EditPlayerModal(
//     {
//   open,
//   onOpenChange,
//   onSubmit,
// }: AddCoachModalProps
) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [form, setForm] = useState<PlayerFormData>({
    profilePhoto: null,
    fullName: "",
    position: "",
    training_center: "",
    height: "",
    weight: "",
    top_speed:  "",
    bmi: "",
    goals:  "",
    assists: "",
    pass_accuracy: "",
    assignedTeam: "",
    sponsored: "",
    guardian: "",
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
              <Button size="sm" variant="outline"><Edit className="w-3.5 h-3.5 mr-1.5" />Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px] p-0 gap-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <UserRoundPlus className="w-5 h-5 text-red-600" />
            Edit Player
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
                Position
              </Label>
              <Select
                value={form.position}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, position: val }))
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
                Training Center
              </Label>
              <Input
                placeholder="e.g. Main Academy Facility"
                value={form.training_center}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, training_center: e.target.value }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Team
              </Label>
              <Select
                value={form.assignedTeam}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, assignedTeam: val }))
                }
              >
                <SelectTrigger className="text-gray-500">
                  <SelectValue placeholder="Select Specialization" />
                </SelectTrigger>
                <SelectContent>
                  {TEAM_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Height & Weight */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Height
              </Label>
              <Input
                placeholder="e.g. 183"
                type="number"
                min={0}
                value={form.height}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    height: e.target.value,
                  }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Weight
              </Label>
              <Input
                placeholder="e.g. 80"
                type="number"
                min={0}
                value={form.weight}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    weight: e.target.value,
                  }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Top Speed & BMI */} 
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Top Speed
              </Label>
              <Input
                placeholder="e.g. 31"
                type="number"
                min={0}
                value={form.top_speed}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    top_speed: e.target.value,
                  }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                BMI
              </Label>
              <Input
                placeholder="e.g. 20"
                type="number"
                min={0}
                value={form.bmi}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    bmi: e.target.value,
                  }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
          </div>

          {/** Goals & Assists*/}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Goals
              </Label>
              <Input
                placeholder="e.g. 10"
                type="number"
                min={0}
                value={form.goals}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    goals: e.target.value,
                  }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Assists
              </Label>
              <Input
                placeholder="e.g. 5"
                type="number"
                min={0}
                value={form.assists}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    assists: e.target.value,
                  }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Pass Accuracy
              </Label>
              <Input
                placeholder="e.g. 21"
                type="number"
                min={0}
                value={form.pass_accuracy}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    pass_accuracy: e.target.value,
                  }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Sponsored & Guardian */} 
                <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">
                  Sponsored
                  </Label>
                  <div className="flex items-center gap-4">
                  {SPONSORSHIP_OPTIONS.map((option) => (
                    <div key={option.id} className="flex items-center gap-2">
                    <input
                      type="radio"
                      id={option.id}
                      name="sponsored"
                      checked={form.sponsored === option.id}
                      onChange={() =>
                      setForm((prev) => ({ ...prev, sponsored: option.id }))
                      }
                      className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                    />
                    <label
                      htmlFor={option.id}
                      className="text-sm text-gray-700 cursor-pointer select-none"
                    >
                      {option.label}
                    </label>
                    </div>
                  ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">
                  Guardian
                  </Label>
                  <Input
                  placeholder="e.g. 20"
                  value={form.guardian}
                  onChange={(e) =>
                    setForm((prev) => ({
                    ...prev,
                    guardian: e.target.value,
                    }))
                  }
                  className="placeholder:text-gray-400"
                  />
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
              Edit Player
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}