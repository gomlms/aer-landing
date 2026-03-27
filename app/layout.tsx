import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aer — AI Automation for Teams That Move Fast",
  description:
    "We build AI systems that automate repeatable processes for ecommerce stores, hedge funds, and small businesses. Give your team time back.",
  openGraph: {
    title: "Aer — AI Automation for Teams That Move Fast",
    description:
      "We build AI systems that automate repeatable processes for ecommerce stores, hedge funds, and small businesses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${jetbrains.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
