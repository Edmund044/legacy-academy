"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const { login, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Clear any stale error when the user starts editing
  useEffect(() => {
    if (error) clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    // On success, AuthContext calls router.push("/dashboard") automatically
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col items-center justify-center px-4">
      {/* Logo + Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center shadow-md mb-4">
          <Zap className="text-white w-8 h-8 fill-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back</h1>
        <p className="text-gray-500 mt-1 text-sm">Please enter your details to sign in</p>
      </div>

      {/* Card */}
      <Card className="w-full max-w-sm shadow-sm border border-gray-100 rounded-2xl">
        <CardContent className="p-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                className="h-11 rounded-xl border-gray-200 focus-visible:ring-red-500 focus-visible:border-red-500"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-11 rounded-xl border-gray-200 pr-10 focus-visible:ring-red-500 focus-visible:border-red-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(v) => setRememberMe(!!v)}
                className="border-gray-300 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
              />
              <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer font-normal">
                Remember me for 30 days
              </Label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 text-sm tracking-wide"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            {/* Register link */}
            <p className="text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-red-500 hover:text-red-600 transition-colors"
              >
                Create an account
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <footer className="mt-10 text-center">
        <div className="flex items-center justify-center gap-4 mb-3">
          {["Privacy Policy", "Terms of Service", "Help Center"].map((item, i) => (
            <span key={item} className="flex items-center gap-4">
              <Link
                href="#"
                className="text-xs font-medium text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors"
              >
                {item}
              </Link>
              {i < 2 && <span className="text-gray-300 text-xs">•</span>}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-400">© 2023 DataStore Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
