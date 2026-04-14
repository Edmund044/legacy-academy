import type {
  LoginResponse,
  RefreshResponse,
} from "@/types/auth";

const API_BASE = "https://legacy-academy-backend-271490766088.europe-west1.run.app";
// const API_BASE = "http://localhost:8000";
// ─── Helpers ──────────────────────────────────────────────────────────────────

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.detail ?? body?.message ?? `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ─── API calls ────────────────────────────────────────────────────────────────

/**
 * POST /api/v1/auth/login
 * Returns tokens + user profile.
 */
export async function apiLogin(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse<LoginResponse>(res);
}

/**
 * POST /api/v1/auth/refresh
 * Exchanges a refresh token for a new token pair.
 */
export async function apiRefresh(
  refreshToken: string | null
): Promise<RefreshResponse> {
  const res = await fetch(`${API_BASE}/v1/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  return handleResponse<RefreshResponse>(res);
}

/**
 * POST /api/v1/auth/logout
 * Revokes the refresh token server-side (best-effort).
 */
export async function apiLogout(
  accessToken: string,
  refreshToken: string
): Promise<void> {
  await fetch(`${API_BASE}/api/v1/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  }).catch(() => {
    // Logout is best-effort — never block the UI on a network failure
  });
}
