"use client"
import React, { useState } from "react"
import { PageHeader } from "@/components/modules/stat-card"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { useAuth } from "@/context/auth-context";
import { Subscription } from "@/types/subscription";
import { apiClient } from "@/lib/api-client";
import PayModal from "@/components/custom/modals/payModal";
import { ApiResponse } from "@/types/api-response";
import { Guardian } from "@/types/guardians"
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);


const sessions = [
  { date: "Oct 24, 2023", player: "Mateo Silva", type: "Technical Drill", charge: "KES 800", status: "PENDING" },
  { date: "Oct 23, 2023", player: "Sofia Silva", type: "Match Play", charge: "KES 800", status: "PENDING" },
  { date: "Oct 21, 2023", player: "Mateo Silva", type: "Technical Drill", charge: "KES 800", status: "PAID" },
  { date: "Oct 20, 2023", player: "Sofia Silva", type: "Conditioning", charge: "KES 800", status: "PAID" },
]

const invoices = [
  { id: "INV-2023-009", date: "Sep 30, 2023", amount: "KES 4,800" },
  { id: "INV-2023-008", date: "Aug 31, 2023", amount: "KES 5,200" },
  { id: "INV-2023-007", date: "Jul 31, 2023", amount: "KES 14,000" },
]


const guardians2 = [
  { player_id: "153a5928-8e84-449d-9571-81bea68f5c80" ,player: "Mateo Silva", label: "PLAYER 1", tag: "SCHOLARSHIP APPLIED", tagVariant: "brand", origPrice: 14000, finalPrice: 0, finalColor: "text-brand", note: "100% Sponsored Credit" },
  { player_id: "153a5928-8e84-449d-9571-81bea68f5c80" ,player: "Sofia Silva", label: "PLAYER 2", tag: "SIBLING DISCOUNT", tagVariant: "info", origPrice: 14000, finalPrice: 11900, finalColor: "text-foreground", note: "15% Sibling Discount" },
  { player_id: "153a5928-8e84-449d-9571-81bea68f5c80" ,player: "Mateo Silva", label: "PLAYER 1", tag: "SCHOLARSHIP APPLIED", tagVariant: "brand", origPrice: 14000, finalPrice: 0, finalColor: "text-brand", note: "100% Sponsored Credit" },
  { player_id: "153a5928-8e84-449d-9571-81bea68f5c80" ,player: "Sofia Silva", label: "PLAYER 2", tag: "SIBLING DISCOUNT", tagVariant: "info", origPrice: 14000, finalPrice: 11900, finalColor: "text-foreground", note: "15% Sibling Discount" },
]
export default function BillingPage() {
  const { tokens,user } = useAuth();
  const [loadingButton, setLoadingButton] = useState(false);
  const [guardians, setGuardians] = useState<Guardian>()
  const [loading, setLoading] = useState(true);
  const config = {
    reference: uuidv4(),
    email: user?.email || "legacyuser@gmail.com",
    amount: 1 * 100, 
    publicKey: "pk_live_27803e8ab6af25269cdf63a08e344f7c9c06a99c",
    currency: "KES",
    metadata: {
      custom_fields: [
        {
          display_name: "User ID",
          variable_name: "user_id",
          value: user?.id || "unknown_user_id",
        },
      ],
    },
  };

  const handlSubscription = async (playerId:string,annual_fee_kes: number,scholarship_applied: boolean) => {
    try {
      setLoadingButton(true);
      const renewalDate = new Date();
      renewalDate.setFullYear(renewalDate.getFullYear() + 1);
      
      const response = await apiClient<ApiResponse<Subscription[]>>({
        endpoint: `v1/billing/subscriptions`,
        method: "POST",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOWJmOTcxMS0zNTI5LTRhYzMtOWIxMC02MzJlNjJhMWE0MTkiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzM5NDg3MjcsInR5cGUiOiJhY2Nlc3MifQ.Ez0ivwUJe2eeCZGsj0LkLfoTKyzLoH3_o4LVZwn_v90",
        },
        body: {
          "player_id": playerId,
          "plan_type": "annual_membership",
          "annual_fee_kes": annual_fee_kes,
          "discount_pct": scholarship_applied ? 100 : 0,
          "scholarship_applied": scholarship_applied,
          "renewal_date": renewalDate.toISOString().split('T')[0]
        }
      });

    } catch (error) {
      alert("Failed to post subscription. Please try again later.");
    } finally {
      setLoadingButton(false);
    }

  }
  
  const fetchGuardians = async () => {
    try {
      const response = await apiClient<ApiResponse<Guardian>>({
        endpoint: `v1/guardians/83e5c848-de1b-4677-8a79-10581e4aebab`,
        method: "GET",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOWJmOTcxMS0zNTI5LTRhYzMtOWIxMC02MzJlNjJhMWE0MTkiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzM5NDg3MjcsInR5cGUiOiJhY2Nlc3MifQ.Ez0ivwUJe2eeCZGsj0LkLfoTKyzLoH3_o4LVZwn_v90",
        },
      });

      setGuardians((response.data as Guardian) ?? []);
    } catch (error) {
      alert("Failed to fetch equipment inventory. Please try again later.");
      // toast.error("Failed to fetch your submitted requests.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchGuardians();
  }, [tokens]);

  const calculateDiscountedPrice = (originalPrice: number, sponsored: number,players:number,sibling: boolean) => {
    if (sponsored == 3) {
      return 0; // 100% discount for scholarship
    }
    else if (sponsored == 1 && players > 1 && sibling) {
      return originalPrice * 0.85; // 15% discount for sibling
    }
    else {
      return originalPrice; // No discount
    }

  }


  const checkIfSiblingDiscount = (playerId: string) => {
    if (!guardians || !Array.isArray(guardians.players)) return false;
    const playerIndex = guardians.players.findIndex(p => p.id === playerId);
    return playerIndex > 0 && guardians.players.length > 1; // Sibling discount applies to the second player if there are multiple players
  }
  
  return (
    <>
      <PageHeader title="Subscription & Billing" description="Manage memberships, training fees, and scholarship credits for your family.">
      </PageHeader>

      {/* Annual Membership */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />Annual Elite Membership</CardTitle>
          <Badge variant="success">ACTIVE</Badge>
        </CardHeader>
        <CardContent>
          { guardians && Array.isArray(guardians.players) && guardians.players.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guardians.players.map((p, i) => (
              <div key={i} className="p-4 bg-muted/30 rounded-xl border border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] text-muted-foreground font-bold">{p.first_name} {p.last_name}</p>
                  {p.sponsored == 3 && <Badge variant="brand" className="text-[10px]">SCHOLARSHIP APPLIED</Badge>}
                  {guardians.players.length > 1 && p.sponsored == 1 && checkIfSiblingDiscount(p.id) && <Badge variant="info" className="text-[10px]">SIBLING DISCOUNT</Badge>}
                </div>
                <p className="text-lg font-bold">{p.first_name} {p.last_name}</p>
                <p className="text-xs text-muted-foreground line-through mt-1">{p.sponsored == 3 || checkIfSiblingDiscount(p.id) ? "KES 14,000 / year":""}</p>
                <p className={`text-xl font-bold ${checkIfSiblingDiscount(p.id) ? "text-brand" : "text-foreground"}`}>KES {calculateDiscountedPrice(14000,p.sponsored,guardians.players.length,checkIfSiblingDiscount(p.id))}</p>
                <p className="text-[11px] text-muted-foreground">{p.group_name}</p>
                <p className="text-xs text-muted-foreground">Next renewal date: Jan 15, 2025</p>
                
                {p.sponsored != 3 && <PayModal 
            paymentRequest={{
              amount: calculateDiscountedPrice(14000,p.sponsored,guardians.players.length,checkIfSiblingDiscount(p.id)),
              itemName: "Annual Membership",
              itemDescription: p.first_name + " - " + p.last_name + " Elite Membership",
              paymentFor: "membership",
              buttonText: "Renew Membership"
            }}
            onClose={() => console.log("Modal closed")}
            onSuccess={() => handlSubscription(p.id,200,true)}

            
            ></PayModal>}
              </div>
            ))}
          </div>}
        </CardContent>
      </Card>

    </>
  )
}
