"use client"
import React from "react"
import { PageHeader, StatCard } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, DollarSign, Package, Plus, MoreVertical, Eye } from "lucide-react"

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
  return (
    <>
      <PageHeader title="Kits & Merchandise Sales" description="Manage academy kits, equipment, and merchandise inventory.">
        <Button size="sm"><Plus className="w-3.5 h-3.5 mr-1.5" />New Product</Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Sales" value="$12,450" change="+12.5% from last month" changeType="up" icon={<DollarSign className="w-4 h-4" />} />
        <StatCard title="Active Orders" value="48" change="+5.2% since yesterday" changeType="up" icon={<ShoppingBag className="w-4 h-4" />} />
        <StatCard title="Inventory Value" value="320 units" change="-2.1% low stock alert" changeType="down" icon={<Package className="w-4 h-4" />} />
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-sm">Product Catalog</CardTitle>
          <div className="flex gap-1">
            {["All Items", "Training Kits", "Accessories", "Equipment"].map(c => (
              <button key={c} className={`px-2.5 py-1 text-xs rounded-lg ${c === "All Items" ? "bg-brand text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{c}</button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {products.map((p, i) => (
              <div key={i} className="rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow group">
                <div className={`h-32 ${p.color} relative flex items-center justify-center`}>
                  <ShoppingBag className="w-10 h-10 text-white/60" />
                  {p.tag && <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded ${p.tag === "BEST SELLER" ? "bg-green-500 text-white" : "bg-amber-500 text-white"}`}>{p.tag}</span>}
                  <button className="absolute top-2 right-2 p-1 bg-white/20 rounded opacity-0 group-hover:opacity-100 transition-opacity text-white"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold">{p.name}</p>
                  <p className="text-[11px] text-muted-foreground">{p.desc}</p>
                  <p className="text-sm font-bold text-brand mt-1">{p.price}</p>
                  <p className="text-[11px] text-muted-foreground">Stock: {p.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-sm">Recent Order History</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["ORDER ID", "CUSTOMER", "DATE", "ITEMS", "PRICE", "STATUS", ""].map(h => (
                    <th key={h} className="text-left py-2 px-3 text-[10px] font-semibold text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={i} className="border-b border-border/40 hover:bg-muted/20">
                    <td className="py-3 px-3 text-xs font-bold text-brand">{o.id}</td>
                    <td className="py-3 px-3 text-sm">{o.customer}</td>
                    <td className="py-3 px-3 text-xs text-muted-foreground">{o.date}</td>
                    <td className="py-3 px-3 text-xs">{o.items}</td>
                    <td className="py-3 px-3 text-sm font-semibold">{o.price}</td>
                    <td className="py-3 px-3"><Badge variant={statusConfig[o.status]} className="text-[10px]">{o.status}</Badge></td>
                    <td className="py-3 px-3"><button className="p-1 rounded hover:bg-muted text-muted-foreground"><Eye className="w-3.5 h-3.5" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
