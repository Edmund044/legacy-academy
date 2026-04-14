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

interface AddCoachModalProps {
  onSubmit:() => void;
}

interface PlayerFormData {
  first_name: string;
  last_name: string;
  dob: Date;
  position: string;
  training_center: string;
  height: number;
  weight: number;
  top_speed:  number;
  bmi: number;
  goals:  number;
  assists: number;
  pass_accuracy: string;
  sponsored: string;
  guardian: string;
  group_id: string;
}

const TEAM_OPTIONS = [
  { id: "971a583b-97ae-4575-9625-6d6a7d57e8c5", label: "Under-7" },
  { id: "972a583b-97ae-4575-9625-6d6a7d57e8c5", label: "Under-9" },
  { id: "973a583b-97ae-4575-9625-6d6a7d57e8c5", label: "Under-11" },
  { id: "974a583b-97ae-4575-9625-6d6a7d57e8c5", label: "Under-13" },
  { id: "975a583b-97ae-4575-9625-6d6a7d57e8c5", label: "Under-15" },
  { id: "971a583b-97ae-4575-9625-6d6a7d57e8c5", label: "Under-17" },
  { id: "978a583b-97ae-4575-9625-6d6a7d57e8c5", label: "Under-19" },
  { id: "976a583b-97ae-4575-9625-6d6a7d57e8c5", label: "Under-21" },
];

const SPONSORSHIP_OPTIONS = [
  { id: "1", label: "Full" },
  { id: "2", label: "Partial" },
  { id: "3", label: "None" },
]

const POSITIONS = [
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


export default function AddPlayerModal(
    {
  onSubmit,
}: AddCoachModalProps
) {
  const { tokens } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<PlayerFormData>({
    first_name: "",
    last_name: "",
    dob: new Date(),
    position: "",
    training_center: "",
    height: 0,
    weight: 0,
    top_speed:  0,
    bmi: 0,
    goals:  0,
    assists: 0,
    pass_accuracy: "",
    sponsored: "",
    guardian: "",
    group_id: "",
  });



  const handleSubmit = async () => {
    try {
      await apiClient({
        endpoint: "/v1/players",
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
      onSubmit();
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
    open={open} onOpenChange={setOpen}
    >
              <DialogTrigger asChild>
        <Button size="sm"> + Add Player</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px] p-0 gap-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <UserRoundPlus className="w-5 h-5 text-red-600" />
            Add New Player
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5 overflow-y-auto max-h-[80vh]">

          {/* Full Name + Role */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                First Name
              </Label>
              <Input
                placeholder="e.g. Pep Guardiola"
                value={form.first_name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, first_name: e.target.value }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Last Name
              </Label>
              <Input
                placeholder="e.g. Pep Guardiola"
                value={form.last_name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, last_name: e.target.value }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="grid grid-cols-2">
          <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Date Of Birth
              </Label>
              <Input
                type="date"
                placeholder="e.g. 01/01/2000"
                value={form.dob.toISOString().split('T')[0]}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, dob: new Date(e.target.value) }))
                }
                className="placeholder:text-gray-400"></Input>
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
                  {POSITIONS.map((s) => (
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
                value={form.group_id}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, group_id: val }))
                }
              >
                <SelectTrigger className="text-gray-500">
                  <SelectValue placeholder="Select Specialization" />
                </SelectTrigger>
                <SelectContent>
                  {TEAM_OPTIONS.map((s) => (
                    <SelectItem key={s.id} value={String(s.id)}>
                      {s.label}
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
                    height: Number(e.target.value),
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
                    weight: Number(e.target.value),
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
                    top_speed: Number(e.target.value),
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
                    bmi: Number(e.target.value),
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
                    goals: Number(e.target.value),
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
                    assists: Number(e.target.value),
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
                      checked={form.sponsored === option.label}
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
              onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6"
            >
              Add Player
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}