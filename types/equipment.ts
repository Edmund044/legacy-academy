export interface Equipment {
    id: string;
    name: string;
    category: string;
    sku: string;
    stock_total: number;
    stock_assigned: number;
    utilization_pct: number;
    assigned: number;
    condition: "Excellent" | "Good" | "Fair" | "Poor"; // optional: restrict values
    replacement_cost_usd: string; 
  }
