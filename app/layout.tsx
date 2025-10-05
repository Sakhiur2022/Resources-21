import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ScrollToTop } from "@/components/scroll-to-top"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://r21.com.bd"),
  title: {
    default: "Resources-21 | Leading Medical Equipment Supplier in Bangladesh",
    template: "%s | Resources-21",
  },
  description:
    "Resources-21 is Bangladesh's premier medical equipment supplier, providing hospital beds, hospital cabinets, anesthesia machines, surgical equipment, and comprehensive medical solutions to hospitals nationwide.",
  keywords: [
    "medical equipment supplier Bangladesh",
    "hospital equipment Bangladesh",
    "hospital bed supplier",
    "hospital cabinet",
    "anesthesia machine",
    "surgical equipment Bangladesh",
    "medical devices Bangladesh",
    "healthcare equipment",
    "Resources-21",
    "R21 Bangladesh",
    "medical equipment Dhaka",
    "hospital bed",
    "hospital bed in Bangladesh"
  ],
  authors: [{ name: "Resources-21" }],
  creator: "Resources-21",
  publisher: "Resources-21",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "https://r21.com.bd",
    siteName: "Resources-21",
    title: "Resources-21 | Leading Medical Equipment Supplier in Bangladesh",
    description:
      "Bangladesh's premier medical equipment supplier providing hospital beds, cabinets, anesthesia machines, and comprehensive medical solutions.",
    images: [
      {
        url: "https://gurzkosujjgyjppjfwko.supabase.co/storage/v1/object/public/logo/og-image.png",
        width: 1200,
        height: 630,
        alt: "Resources-21 Medical Equipment Supplier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources-21 | Leading Medical Equipment Supplier in Bangladesh",
    description:
      "Bangladesh's premier medical equipment supplier providing hospital beds, cabinets, anesthesia machines, and comprehensive medical solutions.",
    images: ["https://gurzkosujjgyjppjfwko.supabase.co/storage/v1/object/public/logo/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "https://gurzkosujjgyjppjfwko.supabase.co/storage/v1/object/public/logo/favicon.ico",
    shortcut: "https://gurzkosujjgyjppjfwko.supabase.co/storage/v1/object/public/logo/favicon-16x16.png",
    apple: "https://gurzkosujjgyjppjfwko.supabase.co/storage/v1/object/public/logo/apple-touch-icon.png",
  },
  verification: {
    google: "google-site-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: "Resources-21",
              alternateName: "R21",
              url: "https://r21.com.bd",
              logo: "https://gurzkosujjgyjppjfwko.supabase.co/storage/v1/object/public/logo/logo.png",
              description:
                "Leading medical equipment supplier in Bangladesh providing hospital beds, cabinets, anesthesia machines, and comprehensive medical solutions.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "BD",
                addressLocality: "Dhaka",
              },
              areaServed: {
                "@type": "Country",
                name: "Bangladesh",
              },
              medicalSpecialty: ["Medical Equipment Supply", "Hospital Equipment", "Surgical Equipment"],
            }),
          }}
        />
      </head>
      <body>
        <Suspense fallback={null}>{children}</Suspense>
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  )
}
