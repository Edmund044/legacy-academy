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
import { UserRoundPlus, Upload, Plus } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; 

interface AddNewSchoolModalProps {
  onSubmit: () => void;
}

interface AddNewSchoolModalFormData {
  name: string;
  status: string;
  location: string; 
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


const CATEGORY = [
  { id: "d58e4f8cc-2ed3-4248-862c-e590d61f15ec", label: "active" },
  { id: "d584ff8cc-2ed3-4248-862c-e590d61f16ec", label: "renewal_pending" },
  { id: "d584fs8cc-2ed3-4248-862c-e590d61f17ec", label: "terminated" },
  { id: "d584ff8cc-2ed3-4248-862c-e590d61f18ec", label: "prospect" },
];


export default function AddNewSchoolModal(
    {
  onSubmit,
}: AddNewSchoolModalProps
) {
  const { tokens } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<AddNewSchoolModalFormData>({
    name: "",
    status: "",
    location: "",
  });



  const handleSubmit = async () => {
    try {
      await apiClient({
        endpoint: `/v1/partnerships/school-partners`,
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
        <Button size="sm"> <Plus className="w-3.5 h-3.5 mr-1.5" /> Add New School</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px] p-0 gap-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <UserRoundPlus className="w-5 h-5 text-red-600" />
            Add New School
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5 overflow-y-auto max-h-[80vh]">

          {/* Full Name + Role */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">
                  School Name
                  </Label>
                  <Input
                  placeholder="e.g. 100"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="placeholder:text-gray-400"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">
                  Status 
                  </Label>
                  <Select
                  value={form.status}
                  onValueChange={(val) =>
                    setForm((prev) => ({ ...prev, status: val }))
                  }
                  >
                  <SelectTrigger className="text-gray-500">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY.map((venue) => (
                    <SelectItem key={venue.id} value={venue.label}>
                      {venue.label}
                    </SelectItem>
                    ))}
                  </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-gray-700">
                  Location
                  </Label>
                  <Input
                  placeholder="e.g. Nairobi West"
                  value={form.location}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, location: e.target.value }))
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
              Add Cost
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}