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
  }
