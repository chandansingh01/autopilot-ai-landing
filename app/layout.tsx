import type { Metadata } from "next";
import { DM_Serif_Display, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import Analytics from "./components/Analytics";
import "./globals.css";

const serif = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const sans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "AutoPilot AI — We Automate Your Busywork",
  description:
    "AI automation agency for Indian businesses. We build Digital Workers that handle invoices, follow-ups, lead scoring, and appointment reminders — so your team can focus on real work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${serif.variable} ${sans.variable} ${mono.variable} antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
