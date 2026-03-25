"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your forgot password logic here
    setTimeout(() => {
      setIsLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center px-4">
      <Card className="w-full max-w-sm shadow-sm border border-gray-100 rounded-2xl">
        <CardContent className="p-8">
          {/* Icon + Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center shadow-md mb-4">
              <Mail className="text-white w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Reset your password
            </h1>
            <p className="text-gray-500 mt-2 text-sm text-center leading-relaxed">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {sent ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="text-green-600 w-6 h-6" />
              </div>
              <p className="text-sm text-gray-600 font-medium">Check your inbox!</p>
              <p className="text-xs text-gray-400 mt-1">A reset link has been sent to your email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  className="h-11 rounded-xl border-gray-200 focus-visible:ring-red-500 focus-visible:border-red-500"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 text-sm tracking-wide"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          )}

          {/* Back to Login */}
          <div className="mt-6 flex justify-center">
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
