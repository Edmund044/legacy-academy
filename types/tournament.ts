export type AgeGroup = "under-19" | "under-17" | "under-15" | "senior";

export type Format = "league" | "knockout" | "friendly" | "round_robin" | "group_stage";

export type Status = "planned" | "ongoing" | "completed" | "cancelled";

export interface Tournament {
  id: string;
  name: string;
  age_group: AgeGroup;
  format: Format;
  status: Status;
  start_date: string;
  end_date: string;
}