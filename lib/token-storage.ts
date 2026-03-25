/**
 * Token persistence layer.
 *
 * Stores the refresh token in an httpOnly-style secure cookie (via the
 * /api/auth/session Next.js route handler) and keeps the short-lived
 * access token only in memory so it is never exposed to localStorage
 * or JS-accessible cookies.
 *
 * If you prefer a simpler approach during development you can swap the
 * implementations below to use localStorage instead.
 */

const REFRESH_COOKIE = "academy_refresh";
const ACCESS_KEY = "academy_access"; // sessionStorage – tab-scoped, cleared on close

// ─── Access token (in-memory / sessionStorage) ────────────────────────────────

export function saveAccessToken(token: string): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(ACCESS_KEY, token);
  }
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(ACCESS_KEY);
}

export function clearAccessToken(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(ACCESS_KEY);
  }
}

// ─── Refresh token (cookie via Route Handler) ─────────────────────────────────
// The Route Handler at app/api/auth/session/route.ts sets an httpOnly cookie
// so the refresh token is never readable by client-side JS.

export async function saveRefreshToken(token: string): Promise<void> {
  await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: token }),
  });
}

export async function getRefreshToken(): Promise<string | null> {
  const res = await fetch("/api/auth/session");
  if (!res.ok) return null;
  const data = await res.json();
  return data.refresh_token ?? null;
}

export async function clearRefreshToken(): Promise<void> {
  await fetch("/api/auth/session", { method: "DELETE" });
}
