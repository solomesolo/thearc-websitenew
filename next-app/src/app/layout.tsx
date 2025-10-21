import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import HeroWithOverlay from "../components/HeroWithOverlay";
import DNABackground from "../components/DNABackground";
import MainLayoutClient from "../components/MainLayoutClient";
import { Analytics } from "@vercel/analytics/next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import CookieConsent from "../components/CookieConsent";
import MixPanelProvider from "../components/MixPanelProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "TheArc - Longevity System & Health Screening",
  description: "A private longevity circle guided by science, precision, and deep personalization. Built around you. Evolving with you.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        {/* Google Analytics 4 (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-90L63EEKYH"
          strategy="afterInteractive"
          async
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-90L63EEKYH');
          `}
        </Script>
        
      </head>
      <body className={`${montserrat.variable} font-montserrat antialiased bg-black min-h-screen flex flex-col`}>
        <MixPanelProvider />
        <MainLayoutClient>
          {children}
        </MainLayoutClient>
        <Footer />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
