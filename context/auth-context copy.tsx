"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import type { AuthContextValue, AuthTokens, AuthUser } from "@/types/auth";
import { apiLogin, apiLogout, apiRefresh } from "@/lib/auth-api";
import {
  clearAccessToken,
  clearRefreshToken,
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
} from "@/lib/token-storage";

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── How many seconds before expiry to proactively refresh ────────────────────
const REFRESH_BUFFER_SECONDS = 60;

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Timer ref for the proactive refresh scheduler
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Internal helpers ────────────────────────────────────────────────────────

  /** Persist a new token pair and schedule the next silent refresh. */
  const persistTokens = useCallback(
    async (
      newTokens: AuthTokens,
      authenticatedUser: AuthUser
    ) => {
      saveAccessToken(newTokens.accessToken);
      await saveRefreshToken(newTokens.refreshToken);

      setTokens(newTokens);
      setUser(authenticatedUser);

      scheduleRefresh(newTokens);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /** Clear all auth state and cancel any pending refresh. */
  const clearAuthState = useCallback(async () => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
    clearAccessToken();
    await clearRefreshToken();
    setUser(null);
    setTokens(null);
  }, []);

  // ── Proactive token refresh ──────────────────────────────────────────────────

  /**
   * Schedules a silent token refresh REFRESH_BUFFER_SECONDS before the
   * current access token expires. If the refresh fails the user is logged out.
   */
  const scheduleRefresh = useCallback((currentTokens: AuthTokens) => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);

    const nowSeconds = Math.floor(Date.now() / 1000);
    const secondsUntilExpiry = currentTokens.expiresAt - nowSeconds;
    const delay = Math.max(
      (secondsUntilExpiry - REFRESH_BUFFER_SECONDS) * 1000,
      0
    );

    refreshTimerRef.current = setTimeout(async () => {
      try {
        await silentRefresh(currentTokens.refreshToken);
      } catch {
        // If silent refresh fails, force logout
        await clearAuthState();
        router.replace("/login");
      }
    }, delay);
  }, [clearAuthState, router]);

  /**
   * Exchanges the given refresh token for a new token pair without
   * showing loading state (called silently in the background).
   */
  const silentRefresh = useCallback(
    async (refreshToken: string) => {
      const data = await apiRefresh(refreshToken);

      const newTokens: AuthTokens = {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: Math.floor(Date.now() / 1000) + data.expires_in,
      };

      // We need the current user — read it from state via a ref pattern
      setUser((currentUser) => {
        if (currentUser) {
          // Fire-and-forget persistence (no await in setState)
          saveAccessToken(newTokens.accessToken);
          saveRefreshToken(newTokens.refreshToken);
          setTokens(newTokens);
          scheduleRefresh(newTokens);
        }
        return currentUser;
      });
    },
    [scheduleRefresh]
  );

  // ── Session rehydration on mount ────────────────────────────────────────────

  useEffect(() => {
    const rehydrate = async () => {
      try {
        const storedRefresh = await getRefreshToken();
        const storedAccess = getAccessToken();

        if (!storedRefresh) return; // No session to restore

        // Try to refresh immediately — the stored access token may be stale
        const data = await apiRefresh(storedRefresh);

        const newTokens: AuthTokens = {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          expiresAt: Math.floor(Date.now() / 1000) + data.expires_in,
        };

        // TODO: replace with a real /me call if your backend requires it
        // For now we decode the JWT payload to extract user info
        const payload = decodeJwtPayload(newTokens.accessToken);
        if (!payload) throw new Error("Invalid token");

        const restoredUser: AuthUser = {
          id: payload.sub ?? "",
          name: payload.name ?? "",
          email: payload.email ?? "",
          role: payload.role ?? "Coach",
          avatarUrl: payload.avatar_url,
        };

        await persistTokens(newTokens, restoredUser);
      } catch {
        // Stale / invalid session — start fresh
        await clearAuthState();
      } finally {
        setIsInitialized(true);
      }
    };

    rehydrate();

    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    };
  }, [clearAuthState, persistTokens]);

  // ── Public actions ──────────────────────────────────────────────────────────

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await apiLogin(email, password);

        const newTokens: AuthTokens = {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          expiresAt: Math.floor(Date.now() / 1000) + data.expires_in,
        };

        await persistTokens(newTokens, data.user);
        router.push("/dashboard");
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Login failed. Please try again.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [persistTokens, router]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      if (tokens) {
        await apiLogout(tokens.accessToken, tokens.refreshToken);
      }
    } finally {
      await clearAuthState();
      setIsLoading(false);
      router.replace("/login");
    }
  }, [tokens, clearAuthState, router]);

  const refreshTokens = useCallback(async () => {
    const storedRefresh = await getRefreshToken();
    if (!storedRefresh) throw new Error("No refresh token available");
    await silentRefresh(storedRefresh);
  }, [silentRefresh]);

  const clearError = useCallback(() => setError(null), []);

  // ── Value ───────────────────────────────────────────────────────────────────

  const value: AuthContextValue = {
    user,
    tokens,
    isLoading,
    isInitialized,
    error,
    login,
    logout,
    refreshTokens,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Consumer hook ────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}

// ─── Utility ─────────────────────────────────────────────────────────────────

/** Safely decode the payload of a JWT without verifying the signature. */
function decodeJwtPayload(token: string): Record<string, any> | null {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}
