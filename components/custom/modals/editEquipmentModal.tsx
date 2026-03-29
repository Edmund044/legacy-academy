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
import { UserRoundPlus, Edit, Plus } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";
import { EQUIPMENT_CATEGORY,  CONDITION } from "@/constants/constants";


interface EquipmentFormData {
  name: string;
  category: string;
  sku: string;
  stock_total: number;
  condition: string;
  replacement_cost_usd: number;
}
interface EquipmentData {
  id: string;
  name: string;
  category: string;
  sku: string;
  stock_total: number;
  condition: string;
  replacement_cost_usd: number;
}


interface EditEquipmentModalProps {
  // open: boolean;
  // onOpenChange: (open: boolean) => void;
  equipment: EquipmentData;
  onSubmit: () => void;
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

export default function EditEquipmentModal(
{equipment,onSubmit}: EditEquipmentModalProps
) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<EquipmentFormData>({
    name: equipment?.name || "",
    category: equipment?.category || "",
    stock_total: equipment?.stock_total || 0,
    condition: equipment?.condition || "",
    replacement_cost_usd: equipment?.replacement_cost_usd || 0,
    sku: equipment?.sku || ""
  });

  const handleSubmit = async () => {
    try {
      await apiClient({
        endpoint: `/v1/equipment/inventory/${equipment?.id}`,
        method: "PATCH",
        headers: {
          // Authorization: `Bearer ${tokens?.accessToken}`,
          "Authorization": "Bearer ",
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
      alert("Failed to update equipment. Please try again later.");
      // toast.error("Something went wrong. Please try again later.");
    }
  };


  return (
    <Dialog 
      open={open}
        onOpenChange={setOpen}
    >
              <DialogTrigger asChild>
              <Edit className="w-3.5 h-3.5 mr-1.5" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px] p-0 gap-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <UserRoundPlus className="w-5 h-5 text-red-600" />
            Edit New Equipment
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* Full Name + Role */}
          <div className="grid grid-cols-2 gap-4">
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
              Edit Equipment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}