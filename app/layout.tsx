import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "@/app/globals.css";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL 
  ? process.env.NEXT_PUBLIC_APP_URL 
  : process.env.VERCEL_PROJECT_PRODUCTION_URL 
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

export const metadata: Metadata = {
  title: {
    template: "%s | LearnCode With RK",
    default: "LearnCode With RK | 20,000 Expert Guides",
  },
  description: "Learn to build products faster with 20,000 AI-generated tutorials tailored for students, freelancers, and founders.",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "LearnCode With RK | 20,000 Expert Guides",
    description: "Learn to build products faster with 20,000 AI-generated tutorials tailored for students, freelancers, and founders.",
    url: "/",
    siteName: "LearnCode With RK",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LearnCode With RK | 20,000 Expert Guides",
    description: "Learn to build products faster with 20,000 AI-generated tutorials tailored for students, freelancers, and founders.",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "YOUR_GOOGLE_SITE_VERIFICATION_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
