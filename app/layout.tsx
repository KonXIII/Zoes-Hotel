import type { Metadata, Viewport } from "next";
import { Noto_Serif_Display, Manrope } from "next/font/google";
import { hotel, home } from "@/content/home";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Track } from "@/components/Track";
import "./globals.css";

// Owner's pick from /fonts (2026-11-06): pairing 4. Both have full Greek.
const display = Noto_Serif_Display({ subsets: ["latin", "greek"], variable: "--font-display-face", style: ["normal", "italic"], display: "swap" });
const text = Manrope({ subsets: ["latin", "greek"], variable: "--font-text-face", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://zoes.gr"),
  title: home.meta.title,
  description: home.meta.description,
  openGraph: { type: "website", locale: "en", siteName: hotel.name },  // image: app/opengraph-image.jpg
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#f3f1eb" };

const hotelSchema = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: hotel.name,
  url: "https://zoes.gr/",
  logo: "https://zoes.gr/logo.svg",
  image: "https://zoes.gr/photos/balcony-view.webp",
  telephone: hotel.phone,
  email: hotel.email,
  address: { "@type": "PostalAddress", streetAddress: "Ladiko", addressLocality: "Faliraki", postalCode: "851 05", addressRegion: "Rhodes", addressCountry: "GR" },
  starRating: { "@type": "Rating", ratingValue: "3" },
  numberOfRooms: 58,
  checkinTime: "15:00",
  checkoutTime: "11:00",
  petsAllowed: false,
  amenityFeature: ["Outdoor pool", "Children's pool", "Restaurant", "Pool bar", "Free Wi-Fi", "Free parking", "Children's playground", "24-hour reception"].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`}>
      <body>
        <SmoothScroll />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }} />
        <Track />
      </body>
    </html>
  );
}
