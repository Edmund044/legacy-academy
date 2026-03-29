import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = "KES") {
  return `${currency} ${amount.toLocaleString()}`
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}


export function convertToUpperCase(str: string) {
  return str.toUpperCase();
}


export function convertFirstLetterToUpperCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}