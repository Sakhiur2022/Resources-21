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
         <meta property="og:title" content="Resources-21 | Leading Medical Equipment Supplier in Bangladesh" />
  <meta property="og:description" content="Bangladesh's premier medical equipment supplier providing hospital beds, cabinets, anesthesia machines, and comprehensive medical solutions." />
  <meta property="og:image" content="https://gurzkosujjgyjppjfwko.supabase.co/storage/v1/object/public/logo/favicon.ico" />
  <meta name="image" property="og:image" content="https://gurzkosujjgyjppjfwko.supabase.co/storage/v1/object/public/logo/favicon.ico" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="https://r21.com.bd" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Resources-21" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Resources-21 | Leading Medical Equipment Supplier in Bangladesh" />
  <meta name="twitter:description" content="Bangladesh's premier medical equipment supplier providing hospital beds, cabinets, anesthesia machines, and comprehensive medical solutions." />
  <meta name="twitter:image" content="https://gurzkosujjgyjppjfwko.supabase.co/storage/v1/object/public/logo/og-image.png" />
  <meta name="author" content="Sakhiur Rahman" />
  <meta property="article:published_time" content="2025-10-06T00:00:00+06:00" />
  <meta property="article:publisher" content="https://www.facebook.com/people/Resources-21-Limited/100048287333284/" />


      </head>
      <body>
        <Suspense fallback={null}>{children}</Suspense>
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  )
}
