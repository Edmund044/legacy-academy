export type PlayerStatus = "active" | "inactive";
export type RelationshipType = "Father" | "Mother" | "Guardian" | "Other";

export interface Player {
  id: string;
  first_name: string;
  last_name: string;
  dob: string;
  position: string;
  status: PlayerStatus;
  group_id: string | null;
  campus_id: string | null;
  group_name: string | null;
  sponsored: number;
  training_center: string;
}

export interface Guardian {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  whatsapp_phone: string;
  relationship_type: RelationshipType;
  is_primary: boolean;
  created_at: string;
  players: Player[];
}