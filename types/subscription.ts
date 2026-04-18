export interface Subscription {
    id: string;
    player_id: string; 
    plan_type: string;
    annual_fee_kes: number;
    net_fee_kes: number;
    discount_pct: number;
    scholarship_applied: boolean;
    status: string;
    renewal_date: string;
    player: any;
    created_at: string;
    total_active: number;
    net_revenue_kes: number;
    inactive_count: number;
  }