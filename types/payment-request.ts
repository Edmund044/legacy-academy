export type Currency = "KES" | "USD" | "EUR" | "GBP";
export type PaymentFor = "membership" | "group training" | "elite training" | "merchandise" | "tournament" | "other";


export interface PaymentRequest {
  amount: number;
  itemName: string;
  itemDescription?: string;
  paymentFor: PaymentFor;
  buttonText?: string; 
}