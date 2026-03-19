"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

/**
 * Redirects to /login if the user is not authenticated.
 * Use at the top of any page that requires authentication.
 *
 * @example
 * export default function DashboardPage() {
 *   const { user } = useRequireAuth();
 *   if (!user) return null; // still initializing
 *   return <Dashboard />;
 * }
 */
export function useRequireAuth() {
  const { user, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !user) {
      router.replace("/login");
    }
  }, [isInitialized, user, router]);

  return useAuth();
}
