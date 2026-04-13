export interface Guardian {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    whatsapp_phone: string;
    player_id: string;
    relationship_type: string;
    is_primary: boolean;
    created_at: string | null;
  }