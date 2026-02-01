import type { Metadata } from "next";
import { ParallaxProviders } from "./ParallaxProvider";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
});
import { GoogleAnalytics } from '@next/third-parties/google'
import CookieBackground from "@/components/CookieBackground";
import ThemeProvider from "@/providers/ThemeProvider";
import Nav from "@/components/Nav";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  metadataBase: new URL('https://www.benjibakes.com'),
  alternates: {
    canonical: '/',
  },
  title: "Benji Bakes - Cookies & Bakery in Rocklin + Roseville, CA",
  description: "Benji Bakes is a local cookie bakery serving Rocklin and Roseville in Placer County, CA. Order small-batch, baked-to-order cookies for pickup, including seasonal favorites and our Brown Butter Chocolate Chip.",
  keywords: [
    "Rocklin bakery",
    "Rocklin cookies",
    "Roseville bakery",
    "Roseville cookies",
    "Placer County bakery",
    "Placer County cookies",
    "cookie pickup Rocklin",
    "cookie pickup Roseville",
    "homemade cookies",
    "brown butter chocolate chip cookies",
    "seasonal cookies",
    "monster cookies",
    "Benji Bakes",
    "fresh baked cookies",
  ],
  openGraph: {
    title: "Benji Bakes - Cookies & Bakery in Rocklin + Roseville, CA",
    description: "Small-batch, baked-to-order cookies for pickup in Rocklin and Roseville, Placer County, CA.",
    url: "https://www.benjibakes.com",
    siteName: "Benji Bakes",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo-horizontal.png",
        width: 1200,
        height: 630,
        alt: "Benji Bakes logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Benji Bakes - Cookies & Bakery in Rocklin + Roseville, CA",
    description: "Small-batch, baked-to-order cookies for pickup in Rocklin and Roseville, Placer County, CA.",
    images: ["/logo-horizontal.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/bb-letters.png',
  },
  other: {
    "geo.region": "US-CA",
    "geo.placename": "Rocklin, Roseville, Placer County",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["Bakery", "LocalBusiness"],
  "name": "Benji Bakes",
  "url": "https://www.benjibakes.com",
  "description": "Benji Bakes is a local cookie bakery serving Rocklin and Roseville in Placer County, CA. Small-batch cookies are baked to order for pickup, including the Brown Butter Chocolate Chip and seasonal favorites.",
  "logo": "https://www.benjibakes.com/logo-horizontal.png",
  "image": "https://www.benjibakes.com/cookie-stack-crop.png",
  "priceRange": "$",
  "servesCuisine": "Bakery",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "4535 Mountaingate Dr.",
    "addressLocality": "Rocklin",
    "addressRegion": "CA",
    "postalCode": "95765",
    "addressCountry": "US"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Rocklin"
    },
    {
      "@type": "City",
      "name": "Roseville"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Placer County"
    }
  ],
  "hasMap": "https://www.google.com/maps/place/4535+Mountaingate+Dr,+Rocklin,+CA+95765",
  "sameAs": [
    "https://www.instagram.com/benjibakescookies",
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="scroll-smooth">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
  />
      </head>
      <body
        className={`${manrope.variable} ${fraunces.variable} font-body bg-[radial-gradient(circle_at_10%_10%,#fff7ee_0%,#f7e5d3_45%,#efd9c2_100%)] text-bb-ink !px-3 md:!px-6 lg:!px-12 relative overflow-x-hidden`}
      >
        <ThemeProvider>
          <ParallaxProviders>
            <CookieBackground />
            <main className="px-3 md:px-8 pb-16 lg:px-10 lg:pb-20 bg-white/80 backdrop-blur-lg max-w-6xl mx-auto rounded-[28px] relative md:py-4 py-1 border border-bb-brown-20 shadow-[0_30px_80px_rgba(59,36,23,0.18)]">
            <Nav />
            {children}
            </main>
            <Toaster />
          </ParallaxProviders>
        </ThemeProvider>
        </body>
        <GoogleAnalytics gaId="G-XCT71CMV8P" />
    </html>
  );
}
