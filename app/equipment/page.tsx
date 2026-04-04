"use client"
import React, { useState } from "react"
import { PageHeader, StatCard } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/primitives"
import { Package, AlertTriangle, Edit, Plus, Search, MoreVertical } from "lucide-react"
import AddEquipmentModal from "@/components/custom/modals/addEquipmentModal"
import EditEquipmentModal from "@/components/custom/modals/editEquipmentModal"
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";
import { Equipment } from "@/types/equipment";
import { convertToUpperCase } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ApiResponse } from "@/types/api-response";


const conditionConfig: Record<string, string> = {
  "Excellent": "success",
  "Good": "info",
  "Fair": "warning",
  "Needs Repair": "destructive",
}

const categories = ["All Equipment", "balls", "training_gear", "field_equipment", "medical_kits"]

export default function EquipmentPage() {
  const [activeCategory, setActiveCategory] = useState("All Equipment")
  const [equipment  , setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true);
  const filtered = equipment.filter(e => activeCategory === "All Equipment" || e.category === activeCategory)
  const { user, tokens } = useAuth();

  const fetchEquipment = async () => {
    try {
      const response = await apiClient<ApiResponse<Equipment[]>>({
        endpoint: `/v1/equipment/inventory?page=1&per_page=100`,
        method: "GET",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOWJmOTcxMS0zNTI5LTRhYzMtOWIxMC02MzJlNjJhMWE0MTkiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzM5NDg3MjcsInR5cGUiOiJhY2Nlc3MifQ.Ez0ivwUJe2eeCZGsj0LkLfoTKyzLoH3_o4LVZwn_v90",
        },
      });
  
      setEquipment((response.data as Equipment[]) ?? []);
    } catch (error) {
      alert("Failed to fetch equipment inventory. Please try again later.");
      // toast.error("Failed to fetch your submitted requests.");
    } finally {
      setLoading(false);
    }
  };
  
  React.useEffect(() => {fetchEquipment()},[tokens]);

  return (
    <>
      <PageHeader title="Equipment Inventory" description="Manage and track football academy assets across all campuses.">
        <AddEquipmentModal fetchEquipment={fetchEquipment}/>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Assets" value="1,240" change="+5%" changeType="up" icon={<Package className="w-4 h-4" />} />
        <StatCard title="In-Use Equipment" value="856" change="+2%" changeType="up" icon={<Package className="w-4 h-4" />} />
        <StatCard title="Damaged / Lost" value="42" change="-10%" changeType="down" icon={<AlertTriangle className="w-4 h-4" />} />
        <StatCard title="Total Value" value="$28,500" change="+8%" changeType="up" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex gap-1 flex-wrap">
              {categories.map(c => (
                <button key={c} onClick={() => setActiveCategory(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeCategory === c ? "bg-brand text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                  {c}
                </button>
              ))}
            </div>
            {/* <div className="relative sm:ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input className="h-8 pl-8 pr-3 rounded-lg border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 w-full sm:w-56" placeholder="Search equipment, SKU..." />
            </div> */}
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
                  <div className="flex items-center justify-center">
                  {/* The animate-spin class makes the icon rotate infinitely */}
                  <Loader2 className="animate-spin h-8 w-8 text-red-600" />
                </div>

          ):
          (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["ITEM NAME", "CATEGORY", "TOTAL STOCK", "ASSIGNED", "CONDITION", "REPLACEMENT COST", ""].map(h => (
                    <th key={h} className="text-left py-2 px-3 text-[10px] font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((e, i) => (
                  <tr key={i} className="border-b border-border/40 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-3 text-sm font-semibold">{e.name}</td>
                    <td className="py-3 px-3 text-xs text-muted-foreground">{e.category.charAt(0).toUpperCase() + e.category.slice(1)}</td>
                    <td className="py-3 px-3 text-sm font-semibold">{e.stock_total}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <Progress value={(e.stock_assigned / e.stock_total) * 100} className="w-16 h-1.5" />
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{e.stock_assigned}/{e.stock_total}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant={conditionConfig[e.condition] as any} className="text-[10px]">{convertToUpperCase(e.condition)}</Badge>
                    </td>
                    <td className="py-3 px-3 text-sm font-medium">KSH {e.replacement_cost_usd}</td>
                    <td className="py-3 px-3">
                      {/* <button className="p-1 rounded hover:bg-muted text-muted-foreground"><MoreVertical className="w-3.5 h-3.5" /></button> */}
                      <button className="p-1 rounded hover:bg-muted text-muted-foreground">
                        <EditEquipmentModal equipment={e} onSubmit={fetchEquipment}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )
        
        }

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">Showing {filtered.length} of {equipment.length} items</p>
            <div className="flex gap-1">
              {[1, 2].map(p => (
                <button key={p} className={`w-7 h-7 rounded text-xs font-medium ${p === 1 ? "bg-brand text-white" : "hover:bg-muted text-muted-foreground"}`}>{p}</button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
