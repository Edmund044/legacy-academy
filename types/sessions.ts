export interface Session {
    id: number;
    name: string;
    type: string;
    team: string;
    session_date: string;
    start_time: string;
    end_time: string;
    coach: string;
    enrollment_cap: number;
    total: number;
    revenue_kes: number; // 4250
    coach_id: string,
    venue_id: string,
    currency: "KES";
    status: "active" | "planned" | "completed" | "completed" ;
  }