// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Ye Htet Aung | Digital Marketing Manager",
  description:
    "Digital Marketing Manager & Performance Marketing Expert specializing in SEO, PPC, Social Media, and Data-Driven Campaign Optimization.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9BH46V9VMG"
          strategy="afterInteractive"
        />
        <Script id="ga4-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9BH46V9VMG');
          `}
        </Script>

        <meta name="facebook-domain-verification" content="pn466ibwvkay4x78bj4l80legtjhej" />
    
      </head>

      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
