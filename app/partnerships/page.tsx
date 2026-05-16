"use client"
import React, { useState } from "react"
import { PageHeader, StatCard } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, DollarSign, TrendingUp, Filter, Plus, MoreVertical } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import AddNewSchoolModal from "@/components/custom/modals/addNewSchool"
import { ApiResponse } from "@/types/api-response"
import { apiClient } from "@/lib/api-client"
import { Schools } from  "@/types/schools"
import { useAuth } from "@/context/auth-context"

const schools = [
  { initials: "OH", name: "Oakwood High", location: "Oakland, CA", status: "Active", revenue: "$42,500", renewal: "Oct 12, 2024" },
  { initials: "PS", name: "Pineview Secondary", location: "Seattle, WA", status: "Renewal Pending", revenue: "$38,000", renewal: "Aug 22, 2024" },
  { initials: "LH", name: "Lakeview Heights", location: "Portland, OR", status: "Active", revenue: "$51,200", renewal: "Dec 01, 2024" },
  { initials: "WA", name: "Western Academy", location: "San Jose, CA", status: "Terminated", revenue: "$12,000", renewal: "—" },
]

const statusConfig: Record<string, any> = {
  "active": "success",
  "renewal_pending": "warning",
  "terminated": "secondary",
  "prospect": "outline",
}

const pieData = [
  { name: "Academy Revenue", value: 65, color: "#CC0000" },
  { name: "Coach Revenue", value: 35, color: "#E5E7EB" },
]

const pipelineData = [
  { month: "Jan", contracted: 180000, projection: 220000 },
  { month: "Feb", contracted: 195000, projection: 235000 },
  { month: "Mar", contracted: 210000, projection: 260000 },
  { month: "Apr", contracted: 225000, projection: 275000 },
  { month: "May", contracted: 240000, projection: 290000 },
  { month: "Jun", contracted: 255000, projection: 305000 },
]

export default function PartnershipsPage() {
  const [schools, setSchools] = useState<Schools[]>([])
  const [loading, setLoading] = useState(true);
  const { tokens } = useAuth();
  
  const fetchSchools = async () => {
    try {
      const response = await apiClient<ApiResponse<Schools[]>>({
        endpoint: `/v1/partnerships/school-partners`,
        method: "GET",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOWJmOTcxMS0zNTI5LTRhYzMtOWIxMC02MzJlNjJhMWE0MTkiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzM5NDg3MjcsInR5cGUiOiJhY2Nlc3MifQ.Ez0ivwUJe2eeCZGsj0LkLfoTKyzLoH3_o4LVZwn_v90",
        },
      });

      setSchools((response.data as Schools[]) ?? []);
    } catch (error) {
      alert("Failed to fetch schools. Please try again later.");
      // toast.error("Failed to fetch your submitted requests.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {fetchSchools()},[tokens]);
  return (
    <>
      <PageHeader title="Partnership Overview" description="Manage school partnership contracts and revenue.">
        {/* <Button size="sm"><Plus className="w-3.5 h-3.5 mr-1.5" />Add New School</Button> */}
        <AddNewSchoolModal onSubmit={() => {}}/>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Contract Value" value="$1.24M" change="+12.5%" changeType="up" icon={<DollarSign className="w-4 h-4" />} />
        <StatCard title="Active Partnerships" value="48 Schools" change="+4 this quarter" changeType="up" icon={<Building2 className="w-4 h-4" />} />
        <StatCard title="Avg. Contract Term" value="2.4 Years" change="Stable" changeType="neutral" />
        <StatCard title="Revenue Per School" value="$25.8k" change="+8%" changeType="up" icon={<TrendingUp className="w-4 h-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-sm">Revenue Split</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={120} height={120}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" strokeWidth={0}>
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {pieData.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                    <div>
                      <p className="text-xs font-medium">{d.name}</p>
                      <p className="text-sm font-bold">{i === 0 ? "$806k" : "$434k"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm">Contract Pipeline</CardTitle>
            <div className="flex gap-1">
              {["Monthly", "Quarterly"].map(t => (
                <button key={t} className={`px-2 py-1 text-xs rounded ${t === "Monthly" ? "bg-brand text-white" : "text-muted-foreground hover:bg-muted"}`}>{t}</button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [`$${(v/1000).toFixed(0)}k`]} />
                <Line type="monotone" dataKey="contracted" stroke="#CC0000" strokeWidth={2} dot={false} name="Contracted" />
                <Line type="monotone" dataKey="projection" stroke="#E5E7EB" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Pipeline Projection" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-sm">Partnered Schools</CardTitle>
          <div className="flex gap-2">
            {/* <Button variant="outline" size="sm"><Filter className="w-3.5 h-3.5 mr-1.5" />Filter</Button>
            <Button size="sm"><Plus className="w-3.5 h-3.5 mr-1.5" />Add New School</Button> */}
            <AddNewSchoolModal onSubmit={() => fetchSchools()}/>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["SCHOOL NAME",
                   "CONTRACT STATUS",
                   "REVENUE (YTD)", 
                   "COACH ALLOCATION", 
                   "RENEWAL DATE", 
                  //  "LOCATION",
                   ""].map(h => (
                    <th key={h} className="text-left py-2 px-3 text-[10px] font-semibold text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {schools.map((s, i) => (
                  <tr key={i} className="border-b border-border/40 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center text-xs font-bold flex-shrink-0">{s.initials}</div>
                        <div>
                          <p className="text-sm font-semibold">{s.name}</p>
                          <p className="text-[11px] text-muted-foreground">{s.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3"><Badge variant={statusConfig[s.status]} className="text-[10px]">{s.status}</Badge></td>
                    <td className="py-3 px-3 text-sm font-semibold">$42,000</td>
                    <td className="py-3 px-3">
                      <div className="flex gap-1">
                        {s.status !== "Terminated" ? (
                          <div className="flex -space-x-1">{[1,2].map(j => <div key={j} className="w-6 h-6 rounded-full bg-brand/20 border-2 border-white" />)}</div>
                        ) : <span className="text-xs text-muted-foreground">None</span>}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-xs text-muted-foreground"></td>
                    <td className="py-3 px-3"><button className="p-1 rounded hover:bg-muted text-muted-foreground"><MoreVertical className="w-3.5 h-3.5" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">Showing 1–4 of 48 schools</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
