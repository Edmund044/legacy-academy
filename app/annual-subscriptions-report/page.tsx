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
import { Subscription } from "@/types/subscription";
import { ApiResponse, PaginationMeta } from "@/types/api-response";
import { BadgeProps } from "@/components/ui/badge";


type BadgeVariant = BadgeProps["variant"];

const statusConfig: Record<string, { label: string; variant: BadgeVariant }> = {
  active: { label: "active", variant: "success" },
  expired: { label: "expired", variant: "warning" },
  suspended: { label: "suspended", variant: "secondary" },
  pending_renewal: { label: "pending_renewal", variant: "destructive" },
}

export default function SessionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [meta,setMeta] = useState<PaginationMeta>()
  const [activeTab, setActiveTab] = useState("all")
  const [search, setSearch] = useState("")

  // const filtered = subscriptions.filter(s => {
  //   const matchesTab = activeTab === "all" || s.status === activeTab
  //   const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.coach.toLowerCase().includes(search.toLowerCase())
  //   return matchesTab && matchesSearch
  // })

  const { tokens } = useAuth();


  const fetchSubscriptions = async () => {
    try {
      const response = await apiClient<ApiResponse<Subscription[]>>({
        endpoint: `/v1/billing/subscriptions?page=1&per_page=100`,
        method: "GET",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOWJmOTcxMS0zNTI5LTRhYzMtOWIxMC02MzJlNjJhMWE0MTkiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzM5NDg3MjcsInR5cGUiOiJhY2Nlc3MifQ.Ez0ivwUJe2eeCZGsj0LkLfoTKyzLoH3_o4LVZwn_v90",
        },
      });

      setSubscriptions((response.data as Subscription[]) ?? []);
      setMeta(response.meta);
    } catch (error) {
      alert("Failed to fetch subscriptions. Please try again later.");
      // toast.error("Failed to fetch your submitted requests.");
    } finally {
      // setLoading(false);
    }
  };

  React.useEffect(() => {fetchSubscriptions()},[tokens]);

  return (
    <>
      <PageHeader title="Annual Subscriptions Reporting" description="Detailed overview of annual subscriptions revenue performance.">
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Revenue" value={String(meta?.net_revenue_kes)}  icon={<TrendingUp className="w-4 h-4" />} />
        <StatCard title="Active" value={String(meta?.total_active)} badge={<Badge variant="brand" className="text-[10px]">LIVE</Badge>} icon={<Users className="w-4 h-4" />} />
        <StatCard title="Expired" value={String(meta?.net_revenue_kes)}  icon={<TrendingUp className="w-4 h-4" />} />
        {/* <StatCard title="Suspended" value={String(meta?.total_active)} badge={<Badge variant="brand" className="text-[10px]">LIVE</Badge>} icon={<Users className="w-4 h-4" />} />
        <StatCard title="Pending Renewal" value={String(meta?.inactive_count)}  icon={<Activity className="w-4 h-4" />} />
        <StatCard title="Annual " value={String(meta?.inactive_count)}  icon={<Activity className="w-4 h-4" />} />
        <StatCard title="Monthly Regular" value={String(meta?.net_revenue_kes)}  icon={<TrendingUp className="w-4 h-4" />} />
        <StatCard title="Quaterly Regular" value={String(meta?.total_active)} badge={<Badge variant="brand" className="text-[10px]">LIVE</Badge>} icon={<Users className="w-4 h-4" />} />
        <StatCard title="Scholarships" value={String(meta?.inactive_count)}  icon={<Activity className="w-4 h-4" />} /> */}

      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* <div className="flex gap-1">
              {["all", "completed", "upcoming", "cancelled"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${activeTab === tab ? "bg-brand text-white" : "text-muted-foreground hover:bg-muted"}`}>
                  {tab === "all" ? "All Sessions" : tab}
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
                  placeholder="Search sessions..."
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
                  {["PLAYER NAME","PLAN NAME", "ORGINAL FEE","DISCOUNT PERCENTAGE","NET FEE", "SCHOLARSHIP APPLIED", "STATUS","SUBSCRIBED AT","RENEWAL DATE", ""].map(h => (
                    <th key={h} className="text-left w-full py-2 px-3 text-[10px] font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((s) => (
                  <tr key={s.id} className="border-b border-border/40 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-3 text-xs text-muted-foreground whitespace-nowrap">
                    {/* <Avatar className="h-6 w-6"><AvatarFallback className="text-[10px]">{s?.player.first_name.split(" ").map(n=>n[0]).join("") + " " + s?.player.last_name.split(" ").map(n=>n[0]).join("")}</AvatarFallback></Avatar>  */}
                      <p>{s.player.first_name + " " + s.player.last_name }</p>
                    </td>
                    
                    <td className="py-3 px-3 text-muted-foreground whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="text-xs">{s.plan_type}</p>
                          {/* <p className="text-[11px] text-muted-foreground">{s.type}</p> */}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground whitespace-nowrap">
                      <p className="text-xs">{s.annual_fee_kes}</p>
                      {/* <p>{s.start_time}</p> */}
                    </td>
                    <td className="py-3 px-3 text-muted-foreground whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {/* <Avatar className="h-6 w-6"><AvatarFallback className="text-[10px]">{s?.coach.split(" ").map(n=>n[0]).join("")}</AvatarFallback></Avatar> */}
                        <span className="text-xs">{s.discount_pct} %</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground whitespace-nowrap">
                    <p className="text-xs">{s.net_fee_kes}</p>
                    </td>
                    <td className="py-3 px-3">                      
                      <Badge variant={s.scholarship_applied ? "success" : "info"} className="text-[10px]">
                        {s.scholarship_applied ? "YES" : "NO"}
                      </Badge></td>
                    <td className="py-3 px-3">
                      <Badge variant={statusConfig[s.status]?.variant} className="text-[10px]">
                        {s.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-xs text-muted-foreground whitespace-nowrap">
                    <p>{s.created_at.toLocaleString()}</p>
                    </td>
                    <td className="py-3 px-3 text-xs text-muted-foreground whitespace-nowrap">
                    <p>{s.renewal_date}</p>
                    </td>
                    {/* <td className="py-3 px-3">
                      <button className="p-1 rounded hover:bg-muted text-muted-foreground">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">Showing {subscriptions.length} of {subscriptions.length} sessions</p>
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
