import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./mobile-responsive.css";
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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MJ4KKD9N');
            `,
          }}
        />
        
        {/* Google Ads Conversion Tracking (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17631760134"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17631760134');
            `,
          }}
        />
        
      </head>
      <body className={`${montserrat.variable} font-montserrat antialiased bg-black text-white min-h-screen flex flex-col`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-MJ4KKD9N"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <MixPanelProvider />
        <MainLayoutClient>
          {children}
        </MainLayoutClient>
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
