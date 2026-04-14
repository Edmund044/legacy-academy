export interface Session {
    id: string;
    name: string;
    type: string;
    team: string;
    handovers: string[];
    session_date: string;
    start_time: string;
    end_time: string;
    coach: string;
    equipment_needed: string;
    enrollments: string;
    enrollment_cap: number;
    total: number;
    revenue_kes: number; // 4250
    coach_id: string,
    venue_id: string,
    currency: "KES";
    status: "active" | "planned" | "completed" | "completed" ;
  }