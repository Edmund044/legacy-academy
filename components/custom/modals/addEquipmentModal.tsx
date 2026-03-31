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
import { UserRoundPlus, Upload, Plus } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import { EQUIPMENT_CATEGORY, CONDITION } from "@/constants/constants";

interface AddEquipmentModalProps {
  fetchEquipment: () => void;
}

interface EquipmentFormData {
  name: string;
  category: string;
  sku: string;
  stock_total: number;
  condition: string;
  replacement_cost_usd: number;
}

const TEAM_OPTIONS = [
  { id: "under-15s", label: "Under-15s" },
  { id: "under-18s", label: "Under-18s" },
  { id: "first-team", label: "First Team" },
];

const SPECIALIZATIONS = [
  "Head Equipment",
  "Assistant Equipment",
  "Goalkeeper Equipment",
  "Fitness Equipment",
  "Tactical Analyst",
  "Youth Development",
];



export default function AddEquipmentModal(
    {
      fetchEquipment
}: AddEquipmentModalProps
) {
  // const fileInputRef = useRef<HTMLInputElement>(null);
  // const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { tokens } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<EquipmentFormData>({
    name: "",
    category: "",
    stock_total: 0,
    condition: "",
    replacement_cost_usd: 0,
    sku: ""
  });

  // const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  //   setForm((prev) => ({ ...prev, profilePhoto: file }));
  //   setPreviewUrl(URL.createObjectURL(file));
  // };

  // const handleTeamToggle = (teamId: string, checked: boolean) => {
  //   setForm((prev) => ({
  //     ...prev,
  //     assignedTeams: checked
  //       ? [...prev.assignedTeams, teamId]
  //       : prev.assignedTeams.filter((t) => t !== teamId),
  //   }));
  // };

  const handleSubmit = async () => {
    try {
      await apiClient({
        endpoint: "/v1/equipment/inventory",
        method: "POST",
        headers: {
          "Authorization": `Bearer ${tokens?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: {
          ...form,
        },
      });
      setOpen(false);
      fetchEquipment();
      toast.success("Availability confirmed!");
    } catch (error) {
      alert((error as Error).message);
      toast.error("Something went wrong. Please try again later.");
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
              <Button size="sm"><Plus className="w-3.5 h-3.5 mr-1.5" />Add New Equipment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px] p-0 gap-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <UserRoundPlus className="w-5 h-5 text-red-600" />
            Add New Equipment
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* Full Name + Role */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Item Name
              </Label>
              <Input
                placeholder="e.g. Ball"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Category
              </Label>
              <Select
                value={form.category}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, category: val }))
                }
              >
                <SelectTrigger className="text-gray-500">
                  <SelectValue placeholder="Select Specialization" />
                </SelectTrigger>
                <SelectContent>
                  {EQUIPMENT_CATEGORY.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                SKU
              </Label>
              <Input
                placeholder="e.g. ball-0001"
                value={form.sku}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, sku: e.target.value }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Stock & Condition */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Stock Quantity
              </Label>
              <Input
                placeholder="e.g. 10"
                type="number"
                min={0}
                value={form.stock_total}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, stock_total: e.target.value }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Replacment Costs
              </Label>
              <Input
                placeholder="e.g. 10"
                type="number"
                min={0}
                value={form.replacement_cost_usd}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, replacement_cost_usd: e.target.value }))
                }
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                Condition
              </Label>
              <Select
                value={form.condition}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, condition: val }))
                }
              >
                <SelectTrigger className="text-gray-500">
                  <SelectValue placeholder="Select Specialization" />
                </SelectTrigger>
                <SelectContent>
                  {CONDITION.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6"
            >
              Add Equipment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}