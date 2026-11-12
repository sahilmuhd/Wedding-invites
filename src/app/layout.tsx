import type { Metadata, Viewport } from "next";
import { Jost, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { brand } from "@/config/brand";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { RevealObserver } from "@/components/layout/RevealObserver";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const title = `${brand.name} · Wedding invitation websites`;

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  alternates: { canonical: "/" },
  title: { default: title, template: `%s | ${brand.name}` },
  description: brand.description,
  applicationName: brand.name,
  openGraph: {
    type: "website",
    url: "/",
    siteName: brand.name,
    title,
    description: brand.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${brand.name}: wedding invitation websites` }],
  },
  twitter: { card: "summary_large_image", title, description: brand.description, images: ["/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#FFFFFF", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${jost.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so scroll-reveal can hide content; without JS everything stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-maroon focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCtaBar />
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  );
}
