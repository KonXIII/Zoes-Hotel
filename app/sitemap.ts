import type { MetadataRoute } from "next";
import { rooms } from "@/content/rooms";

const SITE = "https://zoes.gr";

// Every page in both languages, each with its hreflang pair (seo-plan.md).
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...rooms.map((r) => `/rooms/${r.slug}`), "/privacy"];
  const lastModified = new Date("2026-11-06");
  return paths.flatMap((p) => {
    const en = `${SITE}${p === "/" ? "" : p}`;
    const el = `${SITE}/el${p === "/" ? "" : p}`;
    const alternates = { languages: { en, el } };
    return [
      { url: en || SITE, lastModified, alternates, priority: p === "/" ? 1 : p === "/privacy" ? 0.2 : 0.8 },
      { url: el, lastModified, alternates, priority: p === "/" ? 0.9 : p === "/privacy" ? 0.2 : 0.7 },
    ];
  });
}
