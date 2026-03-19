// ─── Token payloads ───────────────────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  /** Unix timestamp (seconds) when the access token expires */
  expiresAt: number;
}

// ─── User ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Coach" | "Manager" | "Parent";
  avatarUrl?: string;
}

// ─── Context shape ────────────────────────────────────────────────────────────

export interface AuthContextValue {
  /** The currently authenticated user, or null if logged out */
  user: AuthUser | null;
  /** Raw token pair (access + refresh) */
  tokens: AuthTokens | null;
  /** True while any auth operation is in flight */
  isLoading: boolean;
  /** True once the initial session check has completed */
  isInitialized: boolean;
  /** Non-null when the last auth operation failed */
  error: string | null;

  auth: {
    user: null;
    tokens: AuthTokens;
  };


  // ── Actions ──
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  /** Manually trigger a token refresh (normally automatic) */
  refreshTokens: () => Promise<void>;
  clearError: () => void;
}

// ─── API response shapes (adapt to match your backend) ───────────────────────

export interface LoginResponse {
  user: AuthUser;
  access_token: string;
  refresh_token: string;
  expires_in: number; // seconds until access token expires
}

export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
