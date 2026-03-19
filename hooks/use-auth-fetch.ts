"use client";

import { useCallback } from "react";
import { useAuth } from "@/context/auth-context";

/**
 * Returns a `fetch` wrapper that automatically injects the Authorization
 * header and retries once after a silent token refresh on 401 responses.
 *
 * @example
 * const authFetch = useAuthFetch();
 * const data = await authFetch("/api/v1/players").then(r => r.json());
 */
export function useAuthFetch() {
  const { tokens, refreshTokens } = useAuth();

  const authFetch = useCallback(
    async (input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> => {
      const makeRequest = (token: string) =>
        fetch(input, {
          ...init,
          headers: {
            ...(init.headers ?? {}),
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

      if (!tokens?.accessToken) {
        throw new Error("Not authenticated");
      }

      let response = await makeRequest(tokens.accessToken);

      // On 401 try a single silent refresh then retry
      if (response.status === 401) {
        await refreshTokens();
        // After refresh the context has updated tokens; read the new one
        const { getAccessToken } = await import("@/lib/token-storage");
        const newToken = getAccessToken();
        if (newToken) {
          response = await makeRequest(newToken);
        }
      }

      return response;
    },
    [tokens, refreshTokens]
  );

  return authFetch;
}
