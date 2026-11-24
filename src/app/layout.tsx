import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { Navbar, Footer, VoiceAssistant } from "@/components";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  adjustFontFallback: false,
});

export const viewport: Viewport = {
  themeColor: "#FAFAFA",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SDA Intelligence | Enterprise AI Agents for SAP",
  description:
    "Boutique AI agent developers with 30+ years of SAP experience. We deliver 10x faster than Big4 consultancies — blockchain audit trails, counterfeit detection, construction compliance, and more.",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "SDA Intelligence | Enterprise AI Agents for SAP",
    description:
      "Boutique AI agent developers with 30+ years of SAP experience. We deliver 10x faster than Big4 consultancies — blockchain audit trails, counterfeit detection, construction compliance, and more.",
    type: "website",
    url: "https://sda-intelligence.com",
    siteName: "SDA Intelligence",
  },
  twitter: {
    card: "summary_large_image",
    title: "SDA Intelligence | Enterprise AI Agents for SAP",
    description:
      "Boutique AI agent developers with 30+ years of SAP experience. Enterprise AI agents that integrate with SAP.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SDA Intelligence",
  url: "https://sda-intelligence.com",
  description:
    "Boutique AI agent developers specializing in SAP integration. We build purpose-driven AI agents for blockchain audit trails, aerospace counterfeit detection, Quebec construction compliance, and finance policy digitization.",
  foundingDate: "2026",
  sameAs: [
    "https://www.linkedin.com/company/sda-intelligence",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent-primary focus:text-surface focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
        <VoiceAssistant />
      </body>
    </html>
  );
}
