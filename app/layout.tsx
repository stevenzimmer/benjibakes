import type { Metadata } from "next";
import { ParallaxProviders } from "./ParallaxProvider";
import { Roboto } from "next/font/google";
import "./globals.css";
const roboto = Roboto({ weight: ["400",'700'], subsets: ["latin"] });
import CookieBackground from "@/components/CookieBackground";


export const metadata: Metadata = {
  title: "Benji Bakes",
  description: "Home of the best brown butter chocolate chip cookies in Rocklin, Ca",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Playwrite+US+Trad:wght@100..400&display=swap" rel="stylesheet" />
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
