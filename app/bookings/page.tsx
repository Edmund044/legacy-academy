"use client"
import React, { useState } from "react"
import { PageHeader } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/primitives"
import { Star, Smartphone, CreditCard, CheckCircle2, Filter } from "lucide-react"

const coaches = [
  { name: "Coach David Oloo", cert: "UEFA B Licensed", specialty: "Technical Lead", rating: 4.9, sessions: 240, fee: 1500 },
  { name: "Coach Sarah Nduta", cert: "UEFA A Candidate", specialty: "Speed & Agility", rating: 4.8, sessions: 185, fee: 1500 },
  { name: "Coach Marcus", cert: "FA Level 2", specialty: "Defense Mastery", rating: 4.7, sessions: 120, fee: 1500 },
  { name: "Coach Michael", cert: "UEFA PRO", specialty: "Elite Striker Program", rating: 5.0, sessions: 400, fee: 1500 },
]

const timeSlots = ["08:00 AM", "10:30 AM", "04:00 PM", "05:30 PM"]
const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
const dates = [26, 27, 28, 29, 30, 1, 2]

export default function BookingsPage() {
  const [selectedCoach, setSelectedCoach] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState("04:00 PM")
  const [selectedDay, setSelectedDay] = useState(5)
  const [payMethod, setPayMethod] = useState("mpesa")

  const total = coaches[selectedCoach].fee + 1000

  return (
    <>
      <PageHeader title="Individual Elite Training" description="Book 1-on-1 sessions with pro-level coaches.">
        <Badge variant="success" className="text-xs flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />Sponsored Elite Player</Badge>
      </PageHeader>

      <Tabs defaultValue="book">
        <TabsList className="mb-6">
          <TabsTrigger value="book">Book a Session</TabsTrigger>
          <TabsTrigger value="subscriptions">Annual Subscriptions</TabsTrigger>
          <TabsTrigger value="history">Session History</TabsTrigger>
          <TabsTrigger value="payments">Payment Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="book">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {/* Coach Selection */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm">Select Lead Coach</CardTitle>
                  <Button variant="ghost" size="sm" className="text-brand text-xs"><Filter className="w-3.5 h-3.5 mr-1" />View all coaches</Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {coaches.map((c, i) => (
                      <div key={i} onClick={() => setSelectedCoach(i)}
                        className={`cursor-pointer p-3 rounded-xl border transition-all ${selectedCoach === i ? "border-brand bg-brand/5" : "border-border hover:border-brand/30"}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-10 w-10"><AvatarFallback className="text-xs">{c.name.split(" ").slice(-1)[0][0]}</AvatarFallback></Avatar>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold truncate">{c.name}</p>
                            <p className="text-[10px] text-brand font-medium">{c.cert}</p>
                          </div>
                          {selectedCoach === i && <CheckCircle2 className="w-4 h-4 text-brand ml-auto flex-shrink-0" />}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />{c.rating}
                          <span>·</span><span>{c.sessions}+ Sessions</span>
                        </div>
                        <p className="text-xs font-medium mt-1">{c.specialty}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Calendar */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-sm">Available Slots</CardTitle>
                  <span className="text-xs text-muted-foreground">September 2024</span>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 mb-3">
                    {days.map((d, i) => (
                      <div key={d} className="text-center">
                        <p className="text-[10px] text-muted-foreground mb-1">{d}</p>
                        <button onClick={() => setSelectedDay(i)}
                          className={`w-full aspect-square rounded-lg text-xs font-semibold transition-all ${selectedDay === i ? "bg-brand text-white" : dates[i] > 25 ? "text-muted-foreground hover:bg-muted" : "hover:bg-muted"}`}>
                          {dates[i]}
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timeSlots.map(slot => (
                      <button key={slot} onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${selectedSlot === slot ? "bg-brand text-white border-brand" : "border-border hover:border-brand/40"}`}>
                        {slot}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Annual Membership CTA */}
              <div className="p-5 bg-foreground text-white rounded-xl">
                <p className="font-bold text-sm">Annual Elite Membership</p>
                <p className="text-xs text-white/70 mt-1">Unlock priority booking, dedicated performance tracking, and significant savings for siblings.</p>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {[
                    { label: "SINGLE PLAYER", price: "KES 14,000 /yr" },
                    { label: "SIBLING DISCOUNT (15% OFF)", price: "KES 11,900 /child", highlight: true },
                  ].map((p, i) => (
                    <div key={i} className={`p-3 rounded-lg border ${p.highlight ? "border-brand/50 bg-brand/20" : "border-white/20"}`}>
                      <p className={`text-[10px] font-bold ${p.highlight ? "text-brand" : "text-white/60"}`}>{p.label}</p>
                      <p className="text-lg font-bold mt-1">{p.price}</p>
                    </div>
                  ))}
                </div>
                <Button size="sm" className="mt-3 bg-brand hover:bg-brand-dark">Upgrade to Annual ↗</Button>
              </div>
            </div>

            {/* Booking Summary */}
            <div>
              <Card className="sticky top-20">
                <CardHeader className="pb-3"><CardTitle className="text-sm">Booking Summary</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-2.5 bg-muted/40 rounded-lg">
                    <Avatar className="h-10 w-10"><AvatarFallback>{coaches[selectedCoach].name.split(" ").slice(-1)[0][0]}</AvatarFallback></Avatar>
                    <div>
                      <p className="text-xs font-semibold">{coaches[selectedCoach].name}</p>
                      <p className="text-[11px] text-muted-foreground">1-on-1 Session · Sept {dates[selectedDay]}, {selectedSlot}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs"><span className="text-muted-foreground">Training Fee</span><span>KES {coaches[selectedCoach].fee.toLocaleString()}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-muted-foreground">Academy Facility & Tech (40%)</span><span>KES 1,000</span></div>
                    <div className="flex justify-between text-sm font-bold pt-2 border-t border-border">
                      <span>Total Amount</span><span className="text-brand">KES {total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      { id: "mpesa", label: "Pay with M-Pesa", icon: <Smartphone className="w-4 h-4 text-green-600" />, color: "bg-green-600" },
                      { id: "card", label: "Card Payment", icon: <CreditCard className="w-4 h-4" />, color: "bg-gray-700" },
                    ].map(pm => (
                      <button key={pm.id} onClick={() => setPayMethod(pm.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${payMethod === pm.id ? "border-brand bg-brand/5" : "border-border"}`}>
                        <div className={`w-8 h-5 rounded ${pm.color} flex items-center justify-center`}>{pm.icon}</div>
                        <span className="text-sm font-medium flex-1 text-left">{pm.label}</span>
                        <div className={`w-4 h-4 rounded-full border-2 ${payMethod === pm.id ? "border-brand bg-brand" : "border-gray-300"}`}>
                          {payMethod === pm.id && <div className="w-1.5 h-1.5 bg-white rounded-full m-auto mt-0.5" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  <Button className="w-full">Complete Booking →</Button>
                  <p className="text-[10px] text-muted-foreground text-center">By clicking, you agree to our Terms of Service and 24-hour cancellation policy.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="subscriptions">
          <div className="flex items-center justify-center h-48 bg-muted/30 rounded-xl">
            <p className="text-muted-foreground text-sm">Annual subscription management</p>
          </div>
        </TabsContent>
        <TabsContent value="history">
          <div className="flex items-center justify-center h-48 bg-muted/30 rounded-xl">
            <p className="text-muted-foreground text-sm">Session history will appear here</p>
          </div>
        </TabsContent>
        <TabsContent value="payments">
          <div className="flex items-center justify-center h-48 bg-muted/30 rounded-xl">
            <p className="text-muted-foreground text-sm">Payment logs will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
