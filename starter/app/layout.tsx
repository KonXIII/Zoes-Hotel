import type { Metadata, Viewport } from "next";
import { Motion } from "@/components/Motion";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Site title — tagline",
    template: "%s | Site title",
  },
  description: "Replace this with a benefit-led, keyword-bearing description (≤160 chars).",
  openGraph: {
    type: "website",
    locale: "en",
    siteName: "Site title",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "oklch(98% 0.005 90)" },
    { media: "(prefers-color-scheme: dark)", color: "oklch(14% 0.015 270)" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Title blur-in, scroll reveals and parallax. See components/Motion.tsx. */}
        <Motion />
      </body>
    </html>
  );
}
