import { Session } from "./sessions";
export interface SessionPayout {
    id: string;
    session_id: string;
    coach_id: string;
  
    session_rate_kes: number;
    coach_pct: number;
    academy_pct: number;
  
    coach_amount_kes: number;
    academy_amount_kes: number;
  
    payout_status: string;
  
    processed_at: string | null;
    session: Session;
  }