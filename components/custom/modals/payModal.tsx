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
import { useAuth } from "@/context/auth-context";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import { UserRoundPlus, Upload } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api-response";
import { PaymentRequest } from "@/types/payment-request";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, MessageSquare } from "lucide-react"
import { Star, Smartphone } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/primitives";


const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

interface AddPlayerModalProps {  
  paymentRequest: PaymentRequest;  
  onSuccess:() => void;
  onClose:() => void;
}



export default function PayModal(
    {
    paymentRequest,
    onSuccess,
    onClose
}: AddPlayerModalProps
) {
    const { tokens,user } = useAuth();
    const config = {
      reference: uuidv4(),
      email: user?.email || "legacyuser@gmail.com",
      amount: paymentRequest.amount * 100, 
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






  return (
    <Dialog 
    >
              <DialogTrigger asChild>
              <Button>{paymentRequest.buttonText}</Button> 
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px]  p-0 gap-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
           
          </DialogTitle>
        </DialogHeader>
        <div>
              <Card className="sticky top-20">
                <CardHeader className="pb-3"><CardTitle className="text-sm">Booking Summary</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-2.5 bg-muted/40 rounded-lg">
                    <Avatar className="h-10 w-10"><AvatarFallback>{paymentRequest.itemName.split(" ").slice(-1)[0][0]}</AvatarFallback></Avatar>
                    <div>
                      <p className="text-xs font-semibold">{paymentRequest.itemName}</p>
                      <p className="text-[11px] text-muted-foreground">{paymentRequest.itemDescription}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs"><span className="font-bold">{paymentRequest.paymentFor}</span><span>KES {paymentRequest.amount.toLocaleString()}</span></div>
                    <div className="flex justify-between text-sm font-bold pt-2 border-t border-border">
                      <span>Total Amount</span><span className="text-brand">KES {paymentRequest.amount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* <div className="space-y-2">
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

                  <Button className="w-full">Complete Booking →</Button> */}
                <PaystackButton
                {...config}
                text="Pay with M-Pesa"
                className="w-full bg-red-700 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                onSuccess={onSuccess}
                onClose={onClose}
              />
                  <Button className="w-full text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300">Pay with Debt →</Button>
                  {/* <button className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all`}>
                        <div className={`w-8 h-5 rounded flex items-center justify-center`}><Smartphone className="w-4 h-4 text-green-600" /></div>
                        <span className="text-sm font-medium flex-1 text-left">Pay with Debt</span>
                        <div className={`w-4 h-4 rounded-full border-2`}>
                          {<div className="w-1.5 h-1.5 bg-white rounded-full m-auto mt-0.5" />}
                        </div>
                      </button> */}
                </CardContent>
              </Card>
            </div>

      </DialogContent>
    </Dialog>
  );
}