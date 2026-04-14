import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/context/auth-context"

export const metadata: Metadata = {
  title: "Legacy Football Academy Management",
  description: "Comprehensive football academy management platform",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>

    </html>
  )
}
