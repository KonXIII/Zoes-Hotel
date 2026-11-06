import type { MetadataRoute } from "next";

// Two-track LLM policy (seo-plan.md, SEO-GEO-GUIDE): search and AI *retrieval* bots may read the site (they cite
// and link it when travellers ask "where to stay near Anthony Quinn Bay"); *training-only* crawlers are blocked.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ["GPTBot", "CCBot", "ClaudeBot", "anthropic-ai", "Google-Extended", "Applebot-Extended", "Bytespider", "meta-externalagent"], disallow: "/" },
    ],
    sitemap: "https://zoes.gr/sitemap.xml",
    host: "https://zoes.gr",
  };
}
