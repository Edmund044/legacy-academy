"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Database, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface PasswordRequirement {
  label: string;
  met: boolean;
}

export default function ResetPasswordPage() {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const requirements: PasswordRequirement[] = [
    { label: "At least 8 characters long", met: newPassword.length >= 8 },
    {
      label: "Include letters, numbers, and symbols",
      met: /[a-zA-Z]/.test(newPassword) && /\d/.test(newPassword) && /[^a-zA-Z0-9]/.test(newPassword),
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!requirements.every((r) => r.met)) {
      setError("Please meet all password requirements.");
      return;
    }

    setIsLoading(true);
    // Add your reset password logic here
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col items-center justify-center px-4">
      <Card className="w-full max-w-sm shadow-sm border border-gray-100 rounded-2xl">
        <CardContent className="p-8">
          {/* Icon + Header */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center shadow-md mb-4">
              <Database className="text-white w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Set new password</h1>
            <p className="text-gray-500 mt-2 text-sm text-center leading-relaxed">
              Your new password must be different from previously used passwords.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div className="space-y-1.5">
              <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNew ? "text" : "password"}
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-11 rounded-xl border-gray-200 pr-10 focus-visible:ring-red-500 focus-visible:border-red-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Requirements */}
              <ul className="space-y-1 mt-2">
                {requirements.map((req) => (
                  <li key={req.label} className="flex items-center gap-2 text-xs text-gray-400">
                    {req.met ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                    )}
                    <span className={req.met ? "text-green-600" : ""}>{req.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-11 rounded-xl border-gray-200 pr-10 focus-visible:ring-red-500 focus-visible:border-red-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-500 font-medium">{error}</p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 text-sm tracking-wide"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>

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

      {/* Footer */}
      <p className="mt-8 text-xs text-gray-400">© 2023 DataStore Inc. All rights reserved.</p>
    </div>
  );
}
