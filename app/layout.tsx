import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { OrganisationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/site";
import "./globals.css";

/** Neutralises the reveal primitives' initial hidden state. */
const MOTION_FALLBACK_CSS =
  '[data-motion="reveal"]{opacity:1!important;transform:none!important;filter:none!important}';

/* Self-hosted by next/font — no request to Google, no layout shift. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  keywords: [
    "Chirantana Group",
    "Chirantana Foundation",
    "Chirantana Naturals",
    "Chirantana Swadeshi Bhandara",
    "SV Lots India",
    "Karoli Konnect",
    "Tumkur",
    "Karnataka",
  ],
  authors: [{ name: site.legalName }],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  // Emitted only when a token exists — see .env.example.
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION && {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    }),
    ...(process.env.BING_SITE_VERIFICATION && {
      other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION },
    }),
  },
};

export const viewport: Viewport = {
  themeColor: "#14110f",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${geist.variable}`}>
      <head>
        {/* Reveal primitives render an inline opacity:0 on the server. Without
            JS that state would never clear, hiding the page content. */}
        <noscript>
          <style
            // biome-ignore lint/security/noDangerouslySetInnerHtml: static literal, no interpolation
            dangerouslySetInnerHTML={{ __html: MOTION_FALLBACK_CSS }}
          />
        </noscript>
        {/* If scripting is enabled but an app chunk fails to load, hydration
            never runs and reveals stay at opacity 0. This inline script cannot
            itself fail to load, so it clears them unless hydration reports in. */}
        <style
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static literal, no interpolation
          dangerouslySetInnerHTML={{
            __html: `[data-motion-fallback] ${MOTION_FALLBACK_CSS}`,
          }}
        />
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static literal, no interpolation
          dangerouslySetInnerHTML={{
            __html:
              "window.__chirantanaHydrated=false;setTimeout(function(){if(!window.__chirantanaHydrated){document.documentElement.setAttribute('data-motion-fallback','')}},3000)",
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-surface pb-16 antialiased lg:pb-0">
        <SmoothScroll />
        <ScrollProgress />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-pill focus:bg-peacock-400 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-obsidian-950"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <OrganisationJsonLd />
        <WebSiteJsonLd />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
