# SEO + GEO GUIDE — The 2026 Playbook

> Research-backed. Sources at bottom. Last updated **2026-04-17**.
>
> **SEO** = traditional search engines (Google, Bing, DuckDuckGo).
> **GEO** = Generative Engine Optimization — being *cited* by ChatGPT, Perplexity, Google AI Overviews, Claude, Gemini, Copilot.
> **AEO** = Answer Engine Optimization — direct-answer formatting for both.
>
> No guide can *guarantee* rank. Algorithms + domain authority + backlinks + topical authority + competition all matter. This guide covers everything **on-page** that you control, applied rigorously.

---

## The 2026 reality — why this matters now

- **Gartner projects organic traffic to commercial sites will decline 25% by end of 2026** as discovery moves to ChatGPT, Perplexity, Gemini, Copilot.
- **AI-referred sessions jumped 527% YoY in the first 5 months of 2025** (continuing into 2026).
- **ChatGPT holds ~70% of AI search usage**. Perplexity is the most citation-heavy. Google AI Overviews now triggers for >40% of local queries and aggregates 5–6 source citations per answer.
- Freshness matters: AI answer engines (Perplexity most of all) favour recently updated pages.
- **43% of sites still fail INP** — the most commonly failed Core Web Vital.
- **Only 5–15% of sites have implemented `llms.txt`** — so it's currently a competitive edge, not a baseline.

Two-track strategy: still rank in traditional SERPs *and* win citations in AI answers. Fortunately, the on-page requirements are ~80% overlapping — a page built to GEO spec usually ranks well in SEO too.

---

## Core principles (apply everywhere)

### 1. E-E-A-T — Experience is now the primary differentiator
Google's March 2026 Core Update elevated the **Experience** component of E-E-A-T (Experience, Expertise, Authoritativeness, Trust) as the key tie-breaker on contested keywords.

**Prove Experience on-page** via:
- First-hand specifics — not "we tested" but "we ran X for 12 weeks with Y outcome".
- Original photos, screenshots, process videos — not stock imagery.
- Author bio block with credentials, photo, `Person` JSON-LD, link to LinkedIn / publications.
- Named contributors on every content page (no "admin" bylines).
- Case studies with real names, numbers, and outcomes (client permission where needed).
- "Last reviewed by [name] on [date]" line on evergreen pages.

**Prove Authoritativeness** via:
- Inbound links from recognized sources in the topic (earned, not bought).
- Mentions in industry roundups, podcasts, conferences.
- Outbound links to authoritative sources (gov, edu, peer-reviewed, primary sources).

**Prove Trust** via:
- Physical address, phone, email visible site-wide.
- SSL + recent security audit badge.
- Transparent about ownership, authors, methodology.
- Clear corrections/retractions policy on journalistic content.

Sitewide pattern matters — a few low-quality pages can drag the whole domain.

### 2. Topical authority via pillar + cluster architecture
Search engines in 2026 evaluate **how comprehensively and cohesively you cover a topic**, not whether a single page is keyword-optimized.

> **Small local business (most kit clients): skip pillar + cluster.** Use the flat local tree in `seo-plan.template.md`: home, one page per real service, location pages only where the business really serves, about, contact. Pillar + cluster is for sites that will publish content for 12+ months.

**The structure** (content sites):
- **1 pillar page** per major topic — broad, comprehensive, ≥ 2000 words, links to all cluster pages.
- **8–15 cluster pages** per pillar — each narrow, deep, ≥ 800–1500 words, links back to pillar.
- **Bidirectional linking**: pillar ↔ each cluster. Cluster ↔ 2–3 related clusters.
- Minimum 5 clusters (below this, no authority signal). Max 20–25 (beyond this, split into two pillars).

**Action**: Before building any content section, sketch the pillar page + its cluster outline. Don't publish orphan content.

### 3. Information Gain — unique data is the new long-tail
**Pages with first-hand, unique information get cited; pages that summarise others don't.** Real numbers, own photos, local facts and the client's own experience are what "information gain" means. (Studies put numbers on this; don't quote them to clients as forecasts.)

Unique = original survey, internal experiment, proprietary benchmark, contrarian take backed by reasoning, exclusive interview, first-hand field test.

Aggregator content that just summarizes existing sources loses. "Information Gain" is now the scoring model for both ranking and AI citation selection.

**Action**: Every cluster page should carry at least one unique data point (number, quote, observation) that no competitor has. Table it. Chart it. Label it clearly.

---

## Page architecture rules (every page)

### URL
- Lowercase, hyphenated, keyword-bearing.
- ✅ `/programs/ems-training-patras`
- ❌ `/Programs/EMS_Training/?id=42`
- Depth ≤ 3 from root.
- Stable — never change URLs without 301s.

### Semantic HTML (non-negotiable)
- **One `<h1>` per page.** Primary intent phrase in first 60 chars.
- Heading hierarchy strict: H1 → H2 → H3. Never skip levels.
- Landmarks: `<header>`, `<nav>`, `<main>`, `<article>` for long-form, `<section>`, `<aside>`, `<footer>`.
- Lists as `<ul>`/`<ol>`, not styled `<div>`s.
- `<button>` for actions, `<a>` for navigation. Never mix.
- `<time datetime="2026-04-17">April 17, 2026</time>` for dates (machine-readable).

### `<head>` — meta tags
- **`<title>`** ≤60 chars. Primary keyword first, brand at end.
  `EMS Training Patras — 20 min sessions | MOVUS`
- **Meta description** ≤160 chars. Benefit-led, includes secondary keyword + clear next step.
- **Canonical** on every page (`<link rel="canonical">`).
- **`hreflang`** if multilingual (one per locale + `x-default`).
- **Robots meta** — `index, follow` by default. `noindex` on thank-you, draft, internal search pages.
- **Open Graph**: `og:title`, `og:description`, `og:image` (1200×630, readable text at 400px preview), `og:type`, `og:url`, `og:locale`, `og:site_name`.
- **Twitter Card**: `summary_large_image`, with title/description/image.

### The GEO answer block (place right below H1)
Generative engines extract "nuggets" from the first 40–50 words of H2/H3 sections and the block directly under the H1. Formalize this into a purpose-built answer block:

```html
<section aria-label="Quick answer">
  <p><strong>[One-sentence direct answer — ≤20 words.]</strong></p>
  <p>[Expanded context — 2–3 sentences, facts only, no marketing verbs.]</p>
  <ul>
    <li>[Key fact 1 with specific number]</li>
    <li>[Key fact 2 with specific number]</li>
    <li>[Key fact 3 with specific number]</li>
  </ul>
</section>
```

**Rules for this block**:
- 120–200 words total.
- Sentences ≤ 20 words each (LLMs quote clean sentences verbatim).
- Specific numbers, durations, prices, measurements — "20-minute sessions" beats "short sessions".
- No adjectives like "best", "leading", "world-class". Plain facts.
- No tabs or accordions hiding this content — AI ingestion prefers visible.

### H2/H3 patterns for AI Overview citation
Google's Gemini extracts the **first 40–50 words of each H2/H3**. Structure:

```html
<h2>How long does an EMS session take?</h2>
<p><strong>A standard EMS session at MOVUS runs 20 minutes.</strong> The session includes 5 minutes of setup, 15 minutes of active training, and replaces approximately 4 hours of conventional gym work due to simultaneous activation of 350+ muscle groups.</p>
```

- H2/H3 phrased as the user's question (not a marketing headline).
- Answer in first sentence, bolded.
- Data-bearing specifics in the next 1–2 sentences.
- This block alone can land you in AI Overviews even when the rest of the page is average.

### Images & media
- `next/image` only, never raw `<img>`.
- `alt` is descriptive and includes intent where natural — not "image1".
- Above-fold hero: `priority` + `fetchpriority="high"`.
- Below-fold: `loading="lazy"`.
- Always set `width` + `height` to prevent CLS.
- WebP/AVIF over JPEG.
- Original photos > stock (E-E-A-T signal).

### Internal linking
- ≥3 contextual internal links per page (in-body, not nav).
- Anchor text includes target page's primary keyword — natural phrasing.
- Breadcrumb on every non-home page (visual + `BreadcrumbList` schema).
- Footer secondary nav to deep pages.
- Orphan audit: compare the URLs in `app/sitemap.ts` with internal links; every page needs at least 1 inbound link.

### Outbound links
- 1–3 outbound to authoritative sources per 1000 words of body.
- `rel="noopener"` on all external targets.
- `rel="nofollow ugc"` on user-generated content.
- `rel="sponsored"` on paid placements.

---

## JSON-LD schema playbook (2026)

Google explicitly recommends JSON-LD. Match schema to **actual** page intent — mismatches hurt trust signals.

### Priority types (pick what fits, don't force)

| Page | Primary | Also add |
|------|---------|----------|
| **Homepage** | `Organization` + `WebSite` (name + url only: Google retired the sitelinks search box in Nov 2024, so no `SearchAction`) | `LocalBusiness` if local |
| **Local business** | `LocalBusiness` (or subtype: `Dentist`, `Gym`, `Restaurant`, etc.) | Full `PostalAddress`, `GeoCoordinates`, `OpeningHoursSpecification`, `telephone`, `priceRange`. **No `aggregateRating`/`Review` for the business's own reviews**: self-serving LocalBusiness review markup earns no stars |
| **Service page** | `Service` | `provider`, `areaServed`, `offers`, `hasOfferCatalog` |
| **Product** | `Product` + `Offer` | `AggregateRating`, `Review`, `GTIN` |
| **Article / blog** | `Article` (or `BlogPosting`, `NewsArticle`) | `author` (→ `Person`), `datePublished`, `dateModified`, `image`, `publisher` |
| **FAQ page** | `FAQPage` | Only when the page's main content is Q&A (see `schema-markup`). A short FAQ section on a service page doesn't qualify |
| **HowTo** | `HowTo` with `HowToStep` | For genuine step-by-step guides |
| **About / Team** | `AboutPage` + `Person` (one per team member) | Link via `sameAs` to LinkedIn, GitHub, etc. |
| **Contact** | `ContactPage` + `ContactPoint` | |
| **Breadcrumbs (always)** | `BreadcrumbList` | Every non-home page |

### Entity linking (Schema 3.0 boost)
Adding `sameAs` and `mainEntityOfPage` properties that link to recognised entities (official profiles, Wikidata) helps search engines and AI tie the page to the right entity. No study isolates a numeric lift, so don't promise one.

Example on a `Person` (author bio):
```json
{
  "@type": "Person",
  "name": "Dr. Maria Papadimitriou",
  "jobTitle": "Head EMS Trainer, TEFAA-certified",
  "mainEntityOfPage": "https://movus.gr/team/maria",
  "sameAs": [
    "https://linkedin.com/in/mariapapadimitriou",
    "https://instagram.com/dr.maria.ems"
  ]
}
```

### FAQPage — real FAQ pages only
Google limited FAQ rich results to well-known government and health sites in August 2023. Use `FAQPage` only where the page's main content is Q&A (same rule as the `schema-markup` skill). For AI extraction, what matters is the visible text: question headings with direct answers right under them.

### Validation (mandatory before ship)
- https://validator.schema.org/
- https://search.google.com/test/rich-results
- Google Search Console → Enhancements (verify Google is parsing your schema)

---

## GEO-specific tactics (ChatGPT, Perplexity, AI Overviews)

### Engine preferences (different engines, different signals)
- **ChatGPT (~70% market share)** — favors comprehensive, well-sourced content, clear expertise signals, strong domain authority.
- **Perplexity** — heavily citation-focused, real-time web search, strong preference for recent/updated content, transparent about sources.
- **Google AI Overviews** — aggregates 5–6 sources per answer; requires you to rank organically first (AI Overview selection draws from top 10 SERP).
- **Claude (in-app search)** — favors authoritative, structured, citable sources.

### Be citable — concrete patterns

1. **Named, specific facts over generic claims.** "350+ muscles activated" > "many muscles activated".
2. **Comparison tables with measurable columns.** LLMs lift tabular data verbatim and cite the source.
3. **Q&A subsection headings** (`<h2>What is X?</h2>`) — matches the question-answering pattern of retrieval.
4. **Bolded lead-sentences** under every H2/H3 — first 40–50 words are the extraction window.
5. **Original data points** — survey, benchmark, measurement, first-hand observation. Credit yourself clearly: "Per our internal testing across N clients over M months…"
6. **Date stamps** on every content page: `datePublished` and `dateModified`, visible to humans and in schema.
7. **Author attribution** with credentials — LLMs weight authored content above anonymous.
8. **Avoid hiding answers** behind tabs, accordions, or modals above the fold — AI crawlers often don't execute JS to reveal hidden content.

### Citation-targeting — get named by the LLM
1. Include a **"How to cite this page"** snippet at the bottom of pillar pages.
2. Use unique **branded phrases** LLMs can attribute: "The MOVUS 20/4 ratio", "Patras EMS Standard".
3. Publish **original research with a methodology section** — LLMs value reproducibility signals.
4. State **explicit source claims**: "Data collected by [Company] between [dates] from [sample]…"

### Information Gain checklist (per page)
- [ ] At least one number/data point not found elsewhere on the topic
- [ ] At least one first-hand claim ("we did X and found Y")
- [ ] At least one comparison (vs alternatives, vs industry average, vs past state)
- [ ] One assertion the page author stakes their reputation on

---

## LLM crawler policy — `robots.txt` + `llms.txt`

### `robots.txt` — two-track policy

Modern AI vendors run **separate bots for training vs. retrieval/search**. The 2026 best practice: **allow retrieval/search bots, block training bots by default**.

```txt
# ============ Training bots (block by default) ============
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot-Extended
Disallow: /

# ============ Retrieval / search bots (allow — they cite you) ============
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

# ============ Traditional search (always allow) ============
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: *
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
```

**Why this split**:
- Training bots scrape your content to build/improve the model — no direct benefit to you.
- Retrieval/search bots fetch pages at query time to cite you — direct referral traffic and attribution.
- Allowing retrieval while blocking training is the "get cited, don't fuel competitors" position.

**Adjust based on your stance**: some businesses want training-set inclusion for brand awareness even without direct attribution. That's a valid choice — flip the block directives to `Allow` if so. Default to block unless you have a reason to allow.

### `llms.txt` — the emerging standard
Only 5–15% of sites have adopted. Early mover advantage.

Place at `/llms.txt`, Markdown format:

```markdown
# [Site name]

> [One-paragraph summary of what this site is, who it serves, what value it provides.]

## Core pages

- [Homepage](https://yoursite.com): [Short description]
- [About](https://yoursite.com/about): [Description]
- [Services](https://yoursite.com/services): [Description]

## Products / Services

- [Product A](https://yoursite.com/products/a): [Summary + key facts]
- [Product B](https://yoursite.com/products/b): [Summary + key facts]

## Content

- [Pillar: Topic 1](https://yoursite.com/topic-1): [Summary]
  - [Cluster 1.1](...): [Summary]
  - [Cluster 1.2](...): [Summary]

## Contact

- Email: [contact@yoursite.com]
- Address: [Full address]
- Phone: [+30 ...]
```

Also consider `/llms-full.txt` — the same index plus the actual content of each page inlined, for sites that want to make ingestion frictionless.

---

## Core Web Vitals (2026 thresholds — confirmed ranking factor)

All three must pass at the **75th percentile of real user data** for a page to be classified "Good".

| Metric | Good | Needs improvement | Poor |
|--------|------|-------------------|------|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | 2.5–4.0s | > 4.0s |
| **INP** (Interaction to Next Paint) | ≤ 200ms | 200–500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | 0.1–0.25 | > 0.25 |

### INP is the current weak spot — 43% of sites fail
INP replaced FID in March 2024 and is more demanding. Common fixes:
- Break up long JS tasks (>50ms blocks the main thread).
- Use `requestIdleCallback` for non-urgent work.
- Debounce/throttle scroll, input, resize handlers.
- Ship less JS on first load — dynamic import heavy features.
- Offload to Web Workers for parseable/computable work.

### LCP optimizations
- Hero image: `next/image` with `priority` + `fetchpriority="high"`.
- Preload critical fonts.
- Eliminate render-blocking JS above fold.
- Self-host fonts (skip Google Fonts network RTT).

### CLS optimizations
- Always set `width` + `height` on `<img>`.
- Reserve space for dynamic content (ads, embeds) with `min-height`.
- Use CSS `font-display: swap` with `size-adjust` to minimize font-swap shift.
- Avoid injecting content above existing content.

### Tools
- PageSpeed Insights (field + lab data).
- Chrome DevTools → Performance + Lighthouse.
- `@next/bundle-analyzer` for JS weight audit.
- `web-vitals` npm package for in-app reporting.

---

## Local SEO (if the site serves a geographic area)

### Google Business Profile (GBP)
> Newer, detailed guidance: the `seo-audit` skill → `references/local-seo*.md`. It wins where it disagrees with this section.

- **Pick the right profile model:** storefront (customers visit), service-area (you visit them: hide a home address, never publish it), or hybrid. One profile per real, staffed location.
- Complete every field that is true for the business. Never add keywords to the business name.
- Primary category + all relevant secondary categories.
- Photos: exterior, interior, team, products/services. Upload regularly.
- Posts — for real updates, offers and events. A fixed posting cadence has no proven ranking benefit.
- No Q&A plan: Google discontinued GBP Q&A (API) on 3 Nov 2025. Answer common questions on the website and in accurate profile fields.
- Services section — every service with description + price if possible.
- Attributes — every applicable one (wheelchair accessible, free wifi, etc.).

### NAP consistency — critical
**Name, address and phone must agree in meaning across the main directories.** An abbreviation ("Street" vs "St.") is not a conflict. A wrong phone, an old address or a duplicate listing is: fix those first.

- Core directories: Google, Bing Places, Apple Maps, Yelp, Facebook, TripAdvisor (if relevant), industry-specific (Healthgrades, Avvo, etc.).
- Use a citation manager (Moz Local, BrightLocal, Yext) if you have budget — otherwise spreadsheet-track manually.
- Audit quarterly for drift.

### Reviews
- **Review velocity matters as much as total count** — 5 new per month > 50 old.
- Ask every satisfied customer. Build it into checkout/post-service flow.
- Respond to every review (positive and negative) within 48 hours.
- Show real reviews as visible text. No `Review`/`AggregateRating` markup for reviews of the business itself on its own site (self-serving, no stars). Ask for reviews neutrally: same request to every customer, no incentives, no filtering of unhappy ones.

### On-site local signals
- City + service in H1 and `<title>`: "EMS Training in Patras | MOVUS".
- Full NAP in footer on every page.
- Embedded map (one `<iframe>`, lazy-loaded).
- Service area pages if multi-location: `/locations/patras`, `/locations/athens`.
- `LocalBusiness` JSON-LD on homepage + every location page.
- Local schema: `areaServed`, `openingHoursSpecification`, `GeoCoordinates`.

### AI Overviews reality for local
>40% of local queries now trigger AI Overviews. Being the cited source means:
- Precise, factual GBP description.
- Structured service list with prices.
- Comprehensive FAQ section answering "how long", "how much", "who is it for", "what to expect".
- Recent reviews mentioning specific services by name.

---

## Content freshness strategy

### The rule
- **Update `dateModified` only when you make substantive content changes**: new sections, updated stats, revised recommendations, new examples.
- Cosmetic edits (typos, grammar, tiny tweaks) do NOT warrant date updates. Google's algorithm detects fake freshness; manipulated sites lose rankings.

### The cadence
| Content type | Review frequency | Typical update trigger |
|--------------|------------------|------------------------|
| Pillar pages | Quarterly | New data, new sub-topic, link refresh |
| Cluster / blog | Every 6 months | Stat refresh, new examples, internal linking |
| Time-sensitive (guides, benchmarks) | Monthly | Tool versions, pricing, stats |
| Timeless (core concept explainers) | Annually | Major industry shift |
| Product / service | On change | Price, features, availability |

### Why it matters (2026 data)
- Perplexity explicitly weights recency.
- Google's QDF (Query Deserves Freshness) elevates fresh content for any query with news/recency signals.
- `datePublished` + `dateModified` both matter — display both to users, include both in schema.

### How to refresh
1. Pull top-25 traffic pages quarterly.
2. Audit against current best practices (this guide, competitor content, GEO citation gaps).
3. Update 3–5 concrete things per refresh — new data, new examples, rewritten intro, added FAQ, updated schema.
4. Bump `dateModified` in schema + visible display.
5. Re-submit URL in Google Search Console.

---

## Per-page-type playbooks

### Homepage
- H1: brand + primary positioning ("MOVUS — Premium EMS Studio in Patras").
- GEO answer block directly under H1 (who you are, what you do, key differentiator in 120–200 words).
- Value props in first viewport — no "scroll to discover" scavenger hunt.
- Social proof above fold on desktop (review stars, client count, press logos).
- Services/products preview grid with descriptive H2s linking to cluster pages.
- Trust signals (certifications, years in business, press mentions).
- Local NAP + map (if local business).
- Email capture with clear value exchange.
- **JSON-LD**: `Organization` + `WebSite` + `LocalBusiness` (if local) + `BreadcrumbList`.

### Pillar page
- ≥2000 words.
- H1 with broad topic keyword.
- GEO answer block.
- Table of contents (anchor links to H2s).
- 8+ H2 sections covering the topic's sub-areas comprehensively.
- Links out to 8–15 cluster pages (the supporting articles).
- Original data / graphic / research differentiator.
- CTAs distributed, not only at end.
- Author bio + `dateModified`.
- **JSON-LD**: `Article` + `BreadcrumbList` + `Person` for author.

### Cluster / blog post
- ≥800–1500 words.
- H1 = the user's question phrased naturally.
- GEO answer block (direct answer in first 200 words).
- Q&A-style H2s matching search phrasings.
- Original data point minimum (one unique number, observation, or example).
- 3+ internal links: back to pillar + to 2–3 related clusters.
- Author bio + `dateModified`.
- Embedded FAQ block if 3+ Q&A exist.
- **JSON-LD**: `Article` + `FAQPage` (if FAQ) + `BreadcrumbList` + `Person`.

### Service / program page
- H1: `[Service] — [Primary Benefit] | [Location]`.
- GEO answer block — what it is, who it's for, price, duration.
- "What is X?" H2 with plain definition.
- "Who is it for?" H2.
- "How it works" — numbered H3 steps (enables HowTo schema if it genuinely fits).
- Pricing transparency — generative engines favor pages that state prices.
- Testimonials block (with `Review` schema).
- FAQ block.
- Primary CTA + secondary CTA.
- **JSON-LD**: `Service` + `FAQPage` + `BreadcrumbList` + `Offer`.

### Product page
- H1 = product name.
- Hero image gallery (multiple angles, zoom).
- Price, availability, shipping visible above fold.
- Short description (GEO answer block territory).
- Specifications table — structured, scannable.
- Real customer reviews of the product + `AggregateRating` schema (product reviews only; never the business's own testimonials).
- Related products (internal linking).
- Return policy link.
- **JSON-LD**: `Product` + `Offer` + `AggregateRating` + `Review` + `BreadcrumbList`.

### About / team page
- Company origin story with specifics (year, founders, first clients).
- Team grid with `Person` schema per member + credentials + photo.
- Differentiators — what makes you different, backed by evidence.
- Press mentions / awards / certifications.
- **JSON-LD**: `AboutPage` + `Organization` + `Person` per team member.

### Contact / location page
- Full NAP as plain text (not only on a map image).
- `tel:` link on phone. `mailto:` on email.
- Hours of operation as visible text (not just in schema).
- Map (one `<iframe>`, lazy-loaded).
- Contact form with clear submit expectations ("we respond in 24h").
- **JSON-LD**: `LocalBusiness` + `ContactPage` + `ContactPoint`.

### 404 page
- Returns actual **404 status code**, not 200.
- Search box + links to top pages + category navigation.
- Friendly copy, brand voice preserved.

---

## Pre-ship SEO/GEO checklist

### On every page
- [ ] Single `<h1>`, keyword-bearing in first 60 chars
- [ ] Meta title ≤60 chars, primary keyword first
- [ ] Meta description ≤160 chars, benefit-led, secondary keyword included
- [ ] Canonical URL set
- [ ] Open Graph complete (title, description, 1200×630 image, type, url, locale)
- [ ] Twitter Card (summary_large_image)
- [ ] GEO answer block (120–200 words) under H1
- [ ] H2/H3s phrased as questions where natural
- [ ] First 40–50 words of each H2/H3 contain bolded direct answer
- [ ] ≥1 unique data point (Information Gain)
- [ ] ≥3 internal contextual links with keyword-rich anchors
- [ ] 1–3 outbound links to authoritative sources
- [ ] All images have descriptive `alt` + width/height
- [ ] Semantic HTML (no `<div>` landmarks)
- [ ] Heading hierarchy strict (no skipped levels)
- [ ] JSON-LD for page type + `BreadcrumbList`
- [ ] JSON-LD validated (schema.org validator + Google Rich Results Test)
- [ ] Entity linking via `sameAs` where applicable
- [ ] `datePublished` + `dateModified` in schema (and visible for editorial content)
- [ ] Author attribution with credentials
- [ ] Mobile LCP <2.5s, INP <200ms, CLS <0.1 (field data, 75th percentile)
- [ ] WCAG AA contrast verified
- [ ] Keyboard navigable, visible focus rings
- [ ] `lang` attribute on `<html>`
- [ ] Included in `sitemap.xml`
- [ ] Not accidentally blocked by `robots.txt`
- [ ] `hreflang` if multilingual
- [ ] No hidden-above-fold answers (tabs/accordions blocking GEO extraction)

### Site-wide (one-time setup)
- [ ] `robots.txt` with AI bot policy (training blocked, retrieval allowed)
- [ ] `sitemap.xml` from `app/sitemap.ts` and `robots.txt` from `app/robots.ts` (Next.js built-in)
- [ ] `llms.txt` at `/llms.txt`
- [ ] Page architecture planned in `seo-plan.md` (flat local tree, or pillar + clusters for content sites)
- [ ] Google Search Console verified + sitemap submitted
- [ ] Google Business Profile complete (if local)
- [ ] NAP correct on the main directories: Google, Apple Business Connect, Bing Places, Facebook + the industry's top 1–2 (if local)
- [ ] Analytics installed: Vercel Web Analytics (custom events via `track()` need the Pro plan) or Plausible
- [ ] Core Web Vitals monitoring active (field data, not just lab)
- [ ] Security: HTTPS, HSTS, reasonable CSP, no mixed content

---

## Tools & validation

### Build-time
- `app/sitemap.ts` + `app/robots.ts` — Next.js built-in, no package needed.
- Next.js `generateMetadata` — dynamic `<title>` + meta per route.
- `@next/bundle-analyzer` — catch JS bloat before it hurts INP.

### MCPs in this kit
- **`context7` MCP** — live docs for Next.js metadata APIs, schema.org types, Core Web Vitals APIs.
- **`playwright` MCP** — verify OG preview renders, screenshot mobile + desktop for CWV checks.
- **`fetch` MCP** — pull competitor pages for gap analysis.

### External validators (manual)
- https://validator.schema.org/ — every JSON-LD block before ship.
- https://search.google.com/test/rich-results — confirm Google parses.
- https://pagespeed.web.dev/ — CWV field + lab.
- https://www.seobility.net/en/seocheck/ — on-page audit.
- https://ahrefs.com/backlink-checker — backlink gap analysis.
- Google Search Console → Performance + Enhancements + Indexing.

### AI-specific monitoring
- Track AI citations: monitor brand mentions in ChatGPT/Perplexity/AI Overviews manually or via tools like Otterly, Scrunch, BrightEdge GEO tools.
- Set up Google Alerts for branded phrases.

---

## What this guide does NOT cover (flag if you need)

- **Link building strategy** — off-page, out of scope of on-page guide.
- **Content production workflow** — editorial calendars, topic research, keyword clustering tools (Ahrefs/Semrush/Clearscope).
- **Technical SEO at scale** — log file analysis, crawl budget management, faceted navigation handling, pagination, international SEO depth.
- **Programmatic SEO** — template-based page generation for location × service matrices.
- **Paid search (SEM)** — Google Ads, etc. — orthogonal to SEO.

Ask when you hit any of these.

---

## Sources (2026-04-17)

- [Google Search Central — Helpful Content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [E-E-A-T in March 2026 — DigitalApplied](https://www.digitalapplied.com/blog/e-e-a-t-march-2026-google-rewards-experience-content-guide)
- [Google March 2026 Core Update Analysis — OrangeMonke](https://orangemonke.com/blogs/google-march-core-update-complete/)
- [GEO Complete Guide 2026 — Enrich Labs](https://www.enrichlabs.ai/blog/generative-engine-optimization-geo-complete-guide-2026)
- [GEO Best Practices 2026 — GenOptima](https://www.gen-optima.com/geo/generative-engine-optimization-best-practices-2026/)
- [AI Overviews Optimization — LinkGraph](https://www.linkgraph.com/blog/ai-overviews-optimization/)
- [Topic Clusters for SEO 2026 — DigitalApplied](https://www.digitalapplied.com/blog/seo-content-clusters-2026-topic-authority-guide)
- [Core Web Vitals 2026 — DigitalApplied](https://www.digitalapplied.com/blog/core-web-vitals-2026-inp-lcp-cls-optimization-guide)
- [Google Search Central — Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [AI User Agent Landscape 2026 — No Hacks](https://nohacks.co/blog/ai-user-agents-landscape-2026)
- [ClaudeBot/Claude-SearchBot robots.txt — ALM Corp](https://almcorp.com/blog/anthropic-claude-bots-robots-txt-strategy/)
- [llms.txt specification](https://llmstxt.org/)
- [Local SEO 2026 — BoulderSEO](https://boulderseomarketing.com/local-seo-a-comprehensive-guide/)
- [Schema Markup 2026 — Rankeo](https://rankeo.io/blog/schema-markup-complete-guide)
- [Content Freshness — Ahrefs](https://ahrefs.com/blog/fresh-content/)
