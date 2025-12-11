// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
