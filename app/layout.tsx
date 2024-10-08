import type { Metadata } from "next";
import { ParallaxProviders } from "./ParallaxProvider";
import { Roboto } from "next/font/google";
import "./globals.css";
const roboto = Roboto({ weight: ["400",'700'], subsets: ["latin"] });
import CookieBackground from "@/components/CookieBackground";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.benjibakes.com'),
  alternates: {
    canonical: '/',
  },
  title: "Benji Bakes - Homemade Cookies & Seasonal Treats",
  description: "Benji Bakes offers delicious homemade cookies, including our signature Brown Butter Chocolate Chip Cookie and festive seasonal treats like the Monster Cookie. Perfect for celebrations and special moments, our cookies are made with high-quality ingredients and baked fresh to order.",
  keywords: ["homemade cookies, brown butter chocolate chip cookies, seasonal cookies, monster cookies, Benji Bakes, fresh baked cookies, best homemade cookies, celebration cookies, Halloween cookies, cookie delivery"],
  openGraph: {
    images: '/logo-horizontal.png',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/bb-letters.png',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  "name": "Benji Bakes",
  "url": "https://www.benjibakes.com",
  "description": "Benji Bakes offers delicious homemade cookies, including our signature Brown Butter Chocolate Chip Cookie and festive seasonal treats like the Monster Cookie. Perfect for celebrations and special moments, our cookies are made with high-quality ingredients and baked fresh to order.",
  "logo": "https://www.benjibakes.com/logo-horizontal.png",
  "image": "https://www.benjibakes.com/cookie-stack-crop.png",
  "priceRange": "$",
  "servesCuisine": "Bakery",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Rocklin",
    "addressRegion": "CA",
    "postalCode": "95765",
    "addressCountry": "US"
  },
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
      <link href="https://fonts.googleapis.com/css2?family=Playwrite+US+Trad:wght@100..400&display=swap" rel="stylesheet" />
      <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
  />
      </head>
      <body className={`${roboto.className} bg-bb-blue px-6 lg:px-12 relative`}>
        {/* Generate Random number of different sized images that are positioned randomly throughout the background and sized randomly*/}
        <ParallaxProviders>
        <CookieBackground />
        {children}
        </ParallaxProviders>
        </body>
    </html>
  );
}
