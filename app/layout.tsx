import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AcademyPro — Football Academy Management",
  description: "Comprehensive football academy management platform",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
