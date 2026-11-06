import type { NextConfig } from "next";

// Old WordPress URLs (zoes.gr sitemaps, checked 2026-11-06) → their new homes, permanently, so rankings carry over.
// Next.js first strips the trailing slash (/about/ → /about), then these apply. Greek slugs are matched percent-encoded.
const oldSite = [
  { source: "/about", destination: "/#questions" },
  { source: "/gallery-2", destination: "/#dining" },
  { source: "/location", destination: "/#location" },
  { source: "/%CE%B1%CF%81%CF%87%CE%B9%CE%BA%CE%AE", destination: "/el" }, // /αρχική
  { source: "/%CF%86%CF%89%CF%84%CE%BF%CE%B3%CF%81%CE%B1%CF%86%CE%AF%CE%B5%CF%82", destination: "/el#dining" }, // /φωτογραφίες
  { source: "/%CF%84%CE%BF%CF%80%CE%BF%CE%B8%CE%B5%CF%83%CE%AF%CE%B1", destination: "/el#location" }, // /τοποθεσία
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      ...oldSite.map((r) => ({ ...r, permanent: true })),
      // the same Greek slugs in lower-case percent-encoding, as some links and crawlers send them
      ...oldSite.filter((r) => r.source.includes("%")).map((r) => ({ ...r, source: r.source.toLowerCase(), permanent: true })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" }, // the 3D tour is framed by our own room pages only
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
