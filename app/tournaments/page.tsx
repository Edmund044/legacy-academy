"use client"
import { PageHeader, StatCard } from "@/components/modules/stat-card"
import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, DollarSign, Package, Plus, Eye } from "lucide-react"
import { apiClient } from "@/lib/api-client";
import { Tournament } from "@/types/tournament";
import { ApiResponse } from "@/types/api-response";
import { useAuth } from "@/context/auth-context";
import PayModal from "@/components/custom/modals/payModal";

const products = [
  { name: "Elite Training Jersey", desc: "Premium athletic fabric", price: "$45.00", stock: 84, tag: "BEST SELLER", color: "bg-green-600" },
  { name: "Academy Travel Polo", desc: "Official club travel gear", price: "$35.00", stock: 120, tag: null, color: "bg-slate-700" },
  { name: "Academy Pro Football", desc: "FIFA Quality certified", price: "$25.00", stock: 12, tag: "LOW STOCK", color: "bg-red-500" },
  { name: "Performance Water Bottle", desc: "BPA-free plastic, 750ml", price: "$12.00", stock: 215, tag: null, color: "bg-teal-600" },
]

const orders = [
  { id: "#ORD-9021", customer: "Marco Silva", date: "Oct 24, 2023", items: "2x Training Jersey", price: "$90.00", status: "COMPLETED" },
  { id: "#ORD-9022", customer: "Elena Rossi", date: "Oct 23, 2023", items: "1x Travel Polo", price: "$35.00", status: "SHIPPED" },
  { id: "#ORD-9023", customer: "Thomas Mueller", date: "Oct 23, 2023", items: "3x Pro Footballs", price: "$75.00", status: "PENDING" },
]

const statusConfig: Record<string, any> = { COMPLETED: "success", SHIPPED: "info", PENDING: "warning" }

export default function MerchandisePage() {
  const [activeCategory, setActiveCategory] = useState("All Equipment")
  const [loading, setLoading] = useState(true);
  const [tournament  , setEquipment] = useState<Tournament[]>([])
  const filtered = tournament.filter(e => activeCategory === "All Equipment" || e.format === activeCategory)
  const { user, tokens } = useAuth();
  const fetchTournament = async () => {
    try {
      const response = await apiClient<ApiResponse<Tournament[]>>({
        endpoint: `/v1/tournaments?page=1&per_page=100`,
        method: "GET",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOWJmOTcxMS0zNTI5LTRhYzMtOWIxMC02MzJlNjJhMWE0MTkiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzM5NDg3MjcsInR5cGUiOiJhY2Nlc3MifQ.Ez0ivwUJe2eeCZGsj0LkLfoTKyzLoH3_o4LVZwn_v90",
        },
      });
  
      setEquipment((response.data as Tournament[]) ?? []);
    } catch (error) {
      alert("Failed to fetch tournament inventory. Please try again later.");
      // toast.error("Failed to fetch your submitted requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleTournament = async (tournamentId:string,amount: Number,enrollement_total:number,format:string) => {
    try {
      await apiClient({
        endpoint: `/v1/tournaments/${tournamentId}`,
        method: "PATCH",
        headers: {
          // Authorization: `Bearer ${tokens?.accessToken}`,
          "Authorization": "Bearer ",
          "Content-Type": "application/json",
        },
        body: {
          // stock_total: stock_total - 1
          enrollement_total: enrollement_total + 1,
          "user_id":user?.id,
          "amount_kes": amount,
          "format": format
        },
      });
      fetchTournament();
      // toast.success("Availability confirmed!");
    } catch (error) {
      alert("Failed to update tournament. Please try again later.");
      // toast.error("Something went wrong. Please try again later.");
    }

  }
  
  React.useEffect(() => {fetchTournament()},[tokens]);
  return (
    <>
      <PageHeader title="Tournaments" description="Register for a tournament">
      </PageHeader>
{/* 
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Sales" value="$12,450" change="+12.5% from last month" changeType="up" icon={<DollarSign className="w-4 h-4" />} />
        <StatCard title="Active Orders" value="48" change="+5.2% since yesterday" changeType="up" icon={<ShoppingBag className="w-4 h-4" />} />
        <StatCard title="Inventory Value" value="320 units" change="-2.1% low stock alert" changeType="down" icon={<Package className="w-4 h-4" />} />
      </div> */}

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-sm">Tournaments</CardTitle>
          <div className="flex gap-1">
            {["All Tournaments", "league", "knockout", "group_stage", "friendly", "round_robin"].map(c => (
              <button key={c} onClick={() => setActiveCategory(c)} className={`px-2.5 py-1 text-xs rounded-lg ${activeCategory === c ? "bg-brand text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{c}</button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filtered.map((p, i) => (
              <div key={i} className="rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow group">
                <div className={`h-64 bg-blue-600 relative flex items-center justify-center`}>
                  {/* <ShoppingBag className="w-10 h-10 text-white/60" /> */}
                  {p.format && <span className={`absolute top-2 left-2 text-[20px] font-bold px-2 py-0.5 rounded ${p.name === "BEST SELLER" ? "bg-green-500 text-white" : "bg-green-500 text-white"}`}>KES 2,000</span>}
                  {/* <button className="absolute top-2 right-2 p-1 bg-white/20 rounded opacity-0 group-hover:opacity-100 transition-opacity text-white"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button> */}
                </div>
                <div className="p-3 grid grid-cols-4">
                  <div><span className="text-xs text-muted-foreground">Name</span><p className="text-sm font-semibold">{p.name}</p></div>
                  <div><span className="text-xs text-muted-foreground">Format</span><p className="text-sm font-semibold">{p.format}</p></div>
                  <div><span className="text-xs text-muted-foreground">Age Group</span><p className="text-sm font-semibold">{p.age_group}</p></div>
                  <div><span className="text-xs text-muted-foreground">Status</span><p className="text-sm font-semibold">{p.status}</p></div>
                </div>
                <div className="mx-20 my-">
                  <PayModal 
            paymentRequest={{
              // amount: Number(p.cost),
              amount: 2000,
              itemName: p.name,
              itemDescription: p.format + " - " + p.name,
              paymentFor: "merchandise",
              buttonText: "Book"
            }}
            onClose={() => console.log("Modal closed")}
            onSuccess={() => handleTournament(p.id,2)}

            
            ></PayModal>
            </div>
                
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </>
  )
}
