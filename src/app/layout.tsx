import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { organizationSchema, SITE_URL } from "@/lib/schema";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bloom Matrix | AI-First Product Engineering Company",
    template: "%s | Bloom Matrix",
  },
  description:
    "Bloom Matrix designs, engineers, and continuously evolves intelligent digital products, enterprise software, and AI-powered platforms — including AIRA, our AI revenue acceleration platform. A single long-term technology partner, not another vendor.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Bloom Matrix | AI-First Product Engineering Company",
    description:
      "Intelligent digital products, enterprise software, and AI-powered platforms built by a single long-term technology partner.",
    url: SITE_URL,
    siteName: "Bloom Matrix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bloom Matrix | AI-First Product Engineering Company",
    description:
      "Intelligent digital products, enterprise software, and AI-powered platforms built by a single long-term technology partner.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-paper text-ink-dark font-inter">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
