---
name: schema-markup
description: Generate JSON-LD structured data (schema.org) for Next.js App Router pages. Covers Organization, WebSite, BreadcrumbList, Article, BlogPosting, FAQPage, Product, Review/AggregateRating, LocalBusiness, Service, Event, HowTo, Person, VideoObject. Use when the user asks for schema markup, JSON-LD, structured data, rich results, sitelinks, FAQ rich snippets, breadcrumbs in Google, knowledge panel, or wants Google to understand a page's content. Also use proactively when adding a new page type that has an obvious schema match (article → Article, product → Product, FAQ section → FAQPage). Outputs typed TypeScript objects rendered with `<script type="application/ld+json" />` in a Server Component.
---

# Schema markup — JSON-LD for the OG Web Design kit

You write **typed, validated, App Router-native** JSON-LD. Not a generic helper. Every block must:

1. Match an actual page type — never invent schemas the page can't support (don't claim `aggregateRating` if no reviews exist).
2. Be **Server-Component-rendered** through the `<JsonLd data={...} />` component (step 4), which escapes `<` as `\u003c` — never a raw `JSON.stringify` in `dangerouslySetInnerHTML`, never client-rendered, never split across blocks.
3. Use the **fully qualified `@context`** (`https://schema.org`) on each top-level block. For multi-schema pages, use `@graph`.
4. Include canonical URLs (absolute, never relative), real ISO 8601 dates, and image URLs that exist (1200×630 minimum for sharable types).
5. Survive Google's [Rich Results Test](https://search.google.com/test/rich-results). When in doubt, suggest the user paste the page into that tool.

## Workflow

### 1. Read the page context
- Open the relevant `app/**/page.tsx` and figure out what content lives on the page.
- Check `seo-plan.md` if it exists — it may already declare which schemas the page needs.
- Read `.impeccable.md` for brand name, organization details.
- If the user has provided structured info (FAQs, product details, article frontmatter), use it. Don't fabricate.

### 2. Pick the matching schema(s)

| Page type | Primary schema | Often also |
|---|---|---|
| Homepage | `Organization` + `WebSite` (name + url; no `SearchAction`: Google retired the sitelinks search box in Nov 2024) | `BreadcrumbList` |
| Article / blog post | `Article` or `BlogPosting` | `BreadcrumbList`, `Person` (author) |
| Product detail | `Product` | `Offer`, `AggregateRating`, `Review`, `BreadcrumbList` |
| Service detail | `Service` | `Offer`, `Organization` (provider), `BreadcrumbList` |
| Local business page | `LocalBusiness` (or a subtype: `Restaurant`, `Dentist`, `ProfessionalService`...) | `OpeningHoursSpecification`, `GeoCoordinates` |
| FAQ section / page | `FAQPage` | — |
| Event | `Event` | `Place`, `Offer` |
| How-to / tutorial | `HowTo` | `HowToStep`, `BreadcrumbList` |
| Author / team page | `Person` | — |
| Video page | `VideoObject` | — |
| Any non-root page | `BreadcrumbList` | — |

If multiple apply, combine under `@graph` (one `<script>` per page, all schemas inside).

### 3. Generate the typed builder + the JSX

Create or update `lib/schema.ts` with a typed builder for each schema you need. Builders take a typed input and return a JSON-LD-compatible object. Example shape:

```ts
// lib/schema.ts
import type { Organization, WithContext, WebSite, Article, FAQPage, Product, BreadcrumbList } from "schema-dts";

export const siteUrl = "https://example.com"; // pull from env or .impeccable.md

export const organizationSchema = (): WithContext<Organization> => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OG Web Design",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  sameAs: [
    "https://twitter.com/example",
    "https://linkedin.com/company/example",
  ],
});

export const websiteSchema = (): WithContext<WebSite> => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: siteUrl,
  name: "OG Web Design",
});

export const breadcrumbSchema = (
  items: { name: string; url: string }[],
): WithContext<BreadcrumbList> => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});

export const articleSchema = (input: {
  headline: string;
  description: string;
  image: string;
  authorName: string;
  authorUrl?: string;
  publishedAt: string; // ISO 8601
  modifiedAt?: string;
  url: string;
}): WithContext<Article> => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: input.headline,
  description: input.description,
  image: input.image,
  author: {
    "@type": "Person",
    name: input.authorName,
    ...(input.authorUrl ? { url: input.authorUrl } : {}),
  },
  publisher: {
    "@type": "Organization",
    name: "OG Web Design",
    logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
  },
  datePublished: input.publishedAt,
  ...(input.modifiedAt ? { dateModified: input.modifiedAt } : {}),
  mainEntityOfPage: { "@type": "WebPage", "@id": input.url },
});

export const faqSchema = (
  faqs: { question: string; answer: string }[],
): WithContext<FAQPage> => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});
```

**Install `schema-dts`** for compile-time validation against the official schema.org vocabulary:
```bash
npm install schema-dts
```
This is a dev-time-only types package (zero runtime cost). Wrong property names, missing required fields, and bad value types become TypeScript errors.

### 4. Render it in the page

Always render through one shared component. **Never put a bare `JSON.stringify(...)` in `dangerouslySetInnerHTML`:** if any value contains `</script>` (a CMS-edited FAQ answer, a product name, a review), it closes the tag early and whatever follows runs as HTML/script (stored XSS). Escaping every `<` as `\u003c` keeps the JSON valid, and parsers recover the original text. This follows the [Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld).

```tsx
// components/JsonLd.tsx — Server Component (no "use client")
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
```

```tsx
// app/blog/[slug]/page.tsx
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  const schemas = [
    articleSchema({
      headline: post.title,
      description: post.excerpt,
      image: post.coverImage,
      authorName: post.author.name,
      authorUrl: post.author.url,
      publishedAt: post.publishedAt,
      modifiedAt: post.updatedAt,
      url: `https://example.com/blog/${slug}`,
    }),
    breadcrumbSchema([
      { name: "Home", url: "https://example.com" },
      { name: "Blog", url: "https://example.com/blog" },
      { name: post.title, url: `https://example.com/blog/${slug}` },
    ]),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <article>{/* ... */}</article>
    </>
  );
}
```

For multi-schema pages, wrap in `@graph`:
```ts
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", /* ... */ },
    { "@type": "WebSite", /* ... */ },
    { "@type": "BreadcrumbList", /* ... */ },
  ],
};
```

### 5. Sanity-check before reporting done

- [ ] All `url` fields are **absolute** (`https://`), never relative.
- [ ] All dates are valid ISO 8601 (`2026-05-19T00:00:00Z`).
- [ ] Image URLs resolve and meet minimums (Article: 1200×630).
- [ ] Required props for the chosen schema are present (run Rich Results Test, or paste the JSON into validator.schema.org).
- [ ] No invented data — every claim ties to real page content.
- [ ] One `<script type="application/ld+json">` per page (consolidate into `@graph` if needed).
- [ ] The script is in a **Server Component** — no `"use client"` in the file that renders it.
- [ ] Rendered through `<JsonLd>` (escapes `<`). `grep -rn "application/ld+json" app components` shows only `components/JsonLd.tsx`.

## Anti-patterns — never do these

- **Don't fake reviews/ratings.** If `aggregateRating` isn't backed by real Review data on the page, omit it. Google will detect and demote.
- **Don't include FAQPage on every page.** It's for pages whose primary content is FAQ. A short FAQ section on a homepage doesn't qualify.
- **Don't put JSON-LD in `next/script`.** `<script type="application/ld+json">` rendered inline in a Server Component is correct — `next/script` is for interactive scripts.
- **Don't duplicate `Organization` on every page.** Render it once on the homepage; rely on cross-page entity resolution via `@id` URLs.
- **Don't use deprecated types** (`Blog` as a wrapper around posts is fine; `BlogPosting` for the post itself).
- **Don't render raw `JSON.stringify` into `dangerouslySetInnerHTML`.** Unescaped `<` lets a `</script>` inside any value break out of the tag (XSS), and CMS-editable content makes that a real risk. Always use `<JsonLd>`.
- **Don't ship hand-written JSON strings.** Always TS objects → `JSON.stringify` at render. Hand-written JSON breaks the second a field name has a typo.

## When NOT to use this skill

- You're adding a `<title>` or `<meta description>` — that's Next.js `metadata`, not JSON-LD.
- You're configuring `robots.txt` or sitemaps — that's `app/sitemap.ts` / `app/robots.ts` (Next.js built-in).
- The page has no content that benefits from rich results (legal pages, simple internal tools).

## Related kit files

- `seo-plan.md` — the per-project schema plan (which pages get which schemas).
- `SEO-GEO-GUIDE.md` — overall SEO architecture, including schema strategy.
- `lib/schema.ts` — the typed builder file (create on first use, extend as more page types appear).
