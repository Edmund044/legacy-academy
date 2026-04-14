"use client"
import React, { useState } from "react"
import { PageHeader, StatCard } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress, Avatar, AvatarFallback } from "@/components/ui/primitives"
import { TrendingUp, Users, Activity, Download, Filter, Search, MoreVertical,  Edit} from "lucide-react"
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";
import { Service } from "@/types/services";
import { ApiResponse } from "@/types/api-response";


const statusConfig: Record<string, { label: string; variant: any }> = {
  active: { label: "ACTIVE", variant: "success" },
  upcoming: { label: "UPCOMING", variant: "warning" },
  completed: { label: "COMPLETED", variant: "secondary" },
  cancelled: { label: "CANCELLED", variant: "destructive" },
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [search, setSearch] = useState("")

  // const filtered = Services.filter(s => {
  //   const matchesTab = activeTab === "all" || s.status === activeTab
  //   const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.coach.toLowerCase().includes(search.toLowerCase())
  //   return matchesTab && matchesSearch
  // })

  const { tokens } = useAuth();


  const fetchServices = async () => {
    try {
      const response = await apiClient<ApiResponse<Service[]>>({
        endpoint: `v1/services?page=1&per_page=100`,
        method: "GET",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOWJmOTcxMS0zNTI5LTRhYzMtOWIxMC02MzJlNjJhMWE0MTkiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzM5NDg3MjcsInR5cGUiOiJhY2Nlc3MifQ.Ez0ivwUJe2eeCZGsj0LkLfoTKyzLoH3_o4LVZwn_v90",
        },
      });

      setServices((response.data as Service[]) ?? []);
    } catch (error) {
      alert("Failed to fetch services. Please try again later.");
      // toast.error("Failed to fetch your submitted requests.");
    } finally {
      // setLoading(false);
    }
  };

  React.useEffect(() => {fetchServices()},[tokens]);

  return (
    <>
      <PageHeader title="Price Configurations" description="Price Configurations for all the services">
      </PageHeader>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* <div className="flex gap-1">
              {["all", "completed", "upcoming", "cancelled"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${activeTab === tab ? "bg-brand text-white" : "text-muted-foreground hover:bg-muted"}`}>
                  {tab === "all" ? "All Services" : tab}
                </button>
              ))}
            </div> */}
            <div className="flex items-center gap-2 sm:ml-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="h-8 pl-8 pr-3 rounded-lg border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 w-full sm:w-48"
                  placeholder="Search Services..."
                />
              </div>
              <Button variant="outline" size="sm"><Filter className="w-3.5 h-3.5 mr-1.5" />Filter</Button>
              <Button variant="outline" size="sm"><Download className="w-3.5 h-3.5 mr-1.5" />Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["SERVICE NAME", "PRICE", ""].map(h => (
                    <th key={h} className="text-left py-2 px-3 text-[10px] font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id} className="border-b border-border/40 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold bg-brand/10 text-brand px-1.5 py-0.5 rounded w-8 text-center flex-shrink-0">{s.name.charAt(0)}</span>
                        <div>
                          <p className="text-sm font-semibold">{s.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-xs text-muted-foreground whitespace-nowrap">
                      <p>{s.price}</p>
                    </td>
                    {/* <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6"><AvatarFallback className="text-[10px]">{s?.coach.split(" ").map(n=>n[0]).join("")}</AvatarFallback></Avatar>
                        <span className="text-xs">{s.coach}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <Progress value={(s.enrollment_cap / s.total) * 100} className="w-16 h-1.5" />
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{s.enrollment_cap}/{s.total}</span>
                      </div>
                    </td> */}
                    {/* <td className="py-3 px-3 text-sm font-semibold">{s.revenue_kes}</td>
                    <td className="py-3 px-3">
                      <Badge variant={statusConfig[s.status]?.variant} className="text-[10px]">
                        {statusConfig[s.status]?.label}
                      </Badge>
                    </td> */}
                    <td className="py-3 px-3">
                      <button className="p-1 rounded hover:bg-muted text-muted-foreground">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">Showing {services.length} of {services.length} Services</p>
            <div className="flex gap-1">
              {[1, 2, 3].map(p => (
                <button key={p} className={`w-7 h-7 rounded text-xs font-medium ${p === 1 ? "bg-brand text-white" : "hover:bg-muted text-muted-foreground"}`}>{p}</button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
