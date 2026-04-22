// Root response
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    timestamp: string; // ISO date string
    meta: PaginationMeta;
  }
  
  
  // Supporting interfaces (empty arrays now but future-proofed)
  export interface Enrollment {
    // define fields when structure is known
    [key: string]: any;
  }
  
  export interface Handover {
    [key: string]: any;
  }
  
  export interface Equipment {
    [key: string]: any;
  }
  
  // Pagination metadata
  export interface PaginationMeta {
    page: number;
    per_page: number;
    total: number;
    pages: number;
    total_active?: number;
    net_revenue_kes?: number;
    inactive_count?: number;
    annual_standard_net_revenue_kes?: number;
    monthly_regular_class_net_revenue_kes?: number;
    quarterly_regular_class_net_revenue_kes?: number;
    scholarship_annual_net_revenue_kes?: number;
    scholarship_regular_net_revenue_kes?: number;
    annual_standard_total_active?: number;
    monthly_regular_class_total_active?: number;
    quarterly_regular_total_active ?: number;
    scholarship_annual_total_active?: number;
    scholarship_regular_total_active?: number;
    total_revenue_kes?: number;
    total_coach_revenue_kes?: number;
    total_academy_revenue_kes?: number;
    total_paid?: number;
    total_pending?:  number;
    total_reconciled?: number;
    total_disputed?: number;
    total_planned_sessions?: number;
    total_active_sessions?: number;
    total_completed_sessions?: number;
    total_cancelled_sessions?: number;
    total_group_sessions?: number;
    total_individual_sessions?: number;
  }
