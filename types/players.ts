export type PlayerStatus = "active" | "inactive";

export type PlayerPosition =
  | "defender"
  | "midfielder"
  | "forward"
  | "goalkeeper";

export interface Group {
  id: string;
  age_group: string;
  coach_id: string;
  name: string;
  division: string;
  campus_id: string;
  created_at: string; // ISO datetime
}

export interface PlayerStats {
  goals: number | null;
  assists: number | null;
  pass_accuracy: number | null;
}

export interface PlayerPhysical {
  height: number | null;
  weight: number | null;
  bmi: number | null;
}

export interface sponsorship_cases {
  
    id: string,
    player_id: string,
    annual_budget_kes: number,
    status: string,
    start_date: string,
    created_at: string,
    case_ref: string,
    sponsor_name: string,
    total_spent_kes: number,
    end_date: string,
    updated_at: string,
}

export interface PlayerProfile {
  id: string;
  first_name: string;
  last_name: string;
  dob: string;
  position: string;
  status: string;

  group_id: string;
  campus_id: string;

  group_name: Group; // ⚠️ name is misleading (it's actually an object)

  guardian: string | null;
  sponsorship_cases: sponsorship_cases | null;
  sponsored: number; // ⚠️ API gives 0/1 → convert to boolean in frontend
  training_center: string | null;

  stats: PlayerStats;
  physical: PlayerPhysical;

  created_at: string;
}