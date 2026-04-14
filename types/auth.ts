// ─── Token payloads ───────────────────────────────────────────────────────────

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  /** Unix timestamp (seconds) when the access token expires */
  expiresAt: number;
}

// ─── User ─────────────────────────────────────────────────────────────────────
// admin = "admin"
// coach = "coach"
// parent = "parent"
// technical_director = "technical_director"
// customer_care = "customer_care"
// business_development = "business_development"
// csr_lead = "csr_lead"
// kit_and_equipment_manager = "kit_and_equipment_manager"
// operations_manager = "operations_manager"
// physiotherapist =  "physiotherapist"
// player = "player"
export type UserRoles =
  | "admin"
  | "coach"
  | "parent"
  | "customer_care"
  | "business_development"
  | "csr_lead"
  | "kit_and_equipment_manager"
  | "operations_manager"
  | "physiotherapist"
  | "player"
  | "technical_director";
export interface AuthUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRoles;
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

  // auth: {
  //   user: null;
  //   tokens: AuthTokens;
  // };


  // ── Actions ──
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  /** Manually trigger a token refresh (normally automatic) */
  refreshTokens: () => Promise<void>;
  clearError: () => void;
}

// ─── API response shapes (adapt to match your backend) ───────────────────────

export interface LoginResponse {
  success: boolean;
  timeStamp: string;
  data: {
    user: AuthUser;
    access_token: string;
    refresh_token: string;
    token_type: string; // e.g. "Bearer"
    expires_in: number; // seconds until access token expires
  }
}

export interface RefreshResponse {
  success: boolean;
  timeStamp: string;
  data: {
    access_token: string;
    expires_in: number; 
    refresh_token: string;
  }
}
