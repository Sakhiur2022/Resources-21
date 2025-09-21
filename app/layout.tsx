import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ScrollToTop } from "@/components/scroll-to-top"
import "./globals.css"

export const metadata: Metadata = {
  title: "Resources 21 - Professional Medical Equipments Supplier",
  description: "Leading provider of quality products and services for medical equipments worldwide",
  icons: {
    icon: "https://gurzkosujjgyjppjfwko.supabase.co/storage/v1/object/public/logo/favicon.ico",
    shortcut: "https://gurzkosujjgyjppjfwko.supabase.co/storage/v1/object/public/logo/favicon-16x16.png",
    apple: "https://gurzkosujjgyjppjfwko.supabase.co/storage/v1/object/public/logo/apple-touch-icon.png",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  )
}
