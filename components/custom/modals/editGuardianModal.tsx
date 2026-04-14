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
  guardian: any;
  onSubmit:() => void;
}

interface GuardianFormData {
  first_name: string;
  last_name: string;
  email: string;
  whatsapp_phone: string;
  player_id: string;
  relationship_type: string;
  is_primary: boolean;
}

const players2 = [
  {
    id: "player-001",
    first_name: "Brian",
    last_name: "Otieno",
    dob: "2010-06-15",
    position: "forward",
    status: "active",

    group_id: "grp-001",
    campus_id: "campus-01",

    group_name: {
      id: "grp-001",
      age_group: "U12",
      coach_id: "coach-001",
      name: "Junior Lions",
      division: "East League",
      campus_id: "campus-01",
      created_at: "2025-01-10T08:30:00Z",
    },

    guardian: "James Otieno",
    sponsored: 1,
    training_center: "Nairobi West",

    stats: {
      goals: 12,
      assists: 5,
      pass_accuracy: 78,
    },

    physical: {
      height: 150,
      weight: 45,
      bmi: 20,
    },

    created_at: "2025-03-01T09:00:00Z",
  },

  {
    id: "player-002",
    first_name: "Kevin",
    last_name: "Mwangi",
    dob: "2008-03-22",
    position: "midfielder",
    status: "active",

    group_id: "grp-002",
    campus_id: "campus-02",

    group_name: {
      id: "grp-002",
      age_group: "U16",
      coach_id: "coach-002",
      name: "Rising Stars",
      division: "West League",
      campus_id: "campus-02",
      created_at: "2025-02-15T10:00:00Z",
    },

    guardian: "Mary Mwangi",
    sponsored: 0,
    training_center: "Karen",

    stats: {
      goals: 4,
      assists: 11,
      pass_accuracy: 85,
    },

    physical: {
      height: 168,
      weight: 60,
      bmi: 21.3,
    },

    created_at: "2025-03-05T11:20:00Z",
  },

  {
    id: "player-003",
    first_name: "Samuel",
    last_name: "Kiptoo",
    dob: "2009-11-02",
    position: "goalkeeper",
    status: "inactive",

    group_id: "grp-001",
    campus_id: "campus-01",

    group_name: {
      id: "grp-001",
      age_group: "U12",
      coach_id: "coach-001",
      name: "Junior Lions",
      division: "East League",
      campus_id: "campus-01",
      created_at: "2025-01-10T08:30:00Z",
    },

    guardian: null,
    sponsored: 1,
    training_center: null,

    stats: {
      goals: 0,
      assists: 0,
      pass_accuracy: null,
    },

    physical: {
      height: 155,
      weight: 50,
      bmi: null,
    },

    created_at: "2025-03-10T14:45:00Z",
  },

  {
    id: "player-004",
    first_name: "Daniel",
    last_name: "Ochieng",
    dob: "2011-08-19",
    position: "defender",
    status: "active",

    group_id: "grp-001",
    campus_id: "campus-01",

    group_name: {
      id: "grp-001",
      age_group: "U12",
      coach_id: "coach-001",
      name: "Junior Lions",
      division: "East League",
      campus_id: "campus-01",
      created_at: "2025-01-10T08:30:00Z",
    },

    guardian: "Peter Ochieng",
    sponsored: 0,
    training_center: "Langata",

    stats: {
      goals: 1,
      assists: 2,
      pass_accuracy: 72,
    },

    physical: {
      height: null,
      weight: null,
      bmi: null,
    },

    created_at: "2025-03-12T16:00:00Z",
  },
]

const RELATIONSHIP_TYPE = [
  { id: "d584f8cc-2ed3-4248-862c-e590d61f15ec", label: "Father" },
  { id: "d584f8cc-2ed3-4248-862c-e590d61f16ec", label: "Mother" },
  { id: "d584f8cc-2ed3-4248-862c-e590d61f17ec", label: "Guardian" },

];

const IS_PRIMARY_OPTIONS = [
  { id: "1", label: true },
  { id: "2", label: false },
]




export default function AddGuardianModal(
    {
      guardian,
  onSubmit,
}: AddCoachModalProps
) {
  const { tokens } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<GuardianFormData>({
    first_name: "",
    last_name: "",
    email: "",
    whatsapp_phone: "",
    player_id: "",
    relationship_type: "",
    is_primary: false,
  });



  const handleSubmit = async () => {
    try {
      await apiClient({
        endpoint: "/v1/guardians",
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
        <Button size="sm"> + Add Guardian</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px] p-0 gap-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <UserRoundPlus className="w-5 h-5 text-red-600" />
            Add New Guardian
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
          {/* Email + Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                placeholder="e.g. user@gmail.com"
                value={form.email}
                type="email"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Whatssap Phone Number
              </Label>
              <Input
                placeholder="e.g. +254700000000"
                value={form.whatsapp_phone}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, whatsapp_phone: e.target.value }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Player + Relationship  */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Player
              </Label>
              <Select
                value={form.player_id ?? undefined}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, player_id: val }))
                }
              >
                <SelectTrigger className="text-gray-500">
                  <SelectValue placeholder="Select Player" />
                </SelectTrigger>
                <SelectContent>
                  {players2.map((player) => (
                    <SelectItem key={player.id} value={String(player.id)}>
                      {player.first_name} {player.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Relationship 
              </Label>
              <Select
                value={form.relationship_type}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, relationship_type: val }))
                }
              >
                <SelectTrigger className="text-gray-500">
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  {RELATIONSHIP_TYPE.map((relationship) => (
                    <SelectItem key={relationship.id} value={relationship.id}>
                      {relationship.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">
                  Is Primary Guardian?
                  </Label>
                  <div className="flex items-center gap-4">
                  {IS_PRIMARY_OPTIONS.map((option) => (
                    <div key={option.id} className="flex items-center gap-2">
                    <input
                      type="radio"
                      id={option.id}
                      name="is_primary"
                      checked={form.is_primary === option.label}
                      onChange={() =>
                      setForm((prev) => ({ ...prev, is_primary: option.label }))
                      }
                      className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                    />
                    <label
                      htmlFor={option.id}
                      className="text-sm text-gray-700 cursor-pointer select-none"
                    >
                      {option.label? "Yes" : "No"}
                    </label>
                    </div>
                  ))}
                  </div>
                </div>
          </div>




                {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">

            <Button
              onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6"
            >
              Add Guardian
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}