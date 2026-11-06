# SEO + GEO plan — {{project name}}

> Filled out during bootstrap from `SEO-GEO-GUIDE.md`. Update whenever new pages or pillars are added.

---

## Primary language + locale
- Default locale: {{en}}
- Additional locales: {{none / fr / es / el ...}}

## URL architecture
Pick one. Most kit clients are local businesses: use **A**.

**A. Small local business** (flat, 1–2 levels)
```
/                         Home: who, where, the one action (book / call), proof
/{{service-1}}            One page per real service (not one per keyword)
/{{service-2}}
/{{location}}             Only if the business really serves that area and the page has unique content (no doorway pages)
/about
/contact                  Full NAP, map, hours, booking
```

**B. Content site** (pillar + clusters, for sites that will publish for 12+ months)
```
/                         Home (brand, pillar links, proof)
/about
/contact
/{{pillar-1}}/            Pillar page — broad, ≥2000 words
  /{{pillar-1}}/cluster-a
  /{{pillar-1}}/cluster-b
  /{{pillar-1}}/cluster-c
/{{pillar-2}}/
  ...
/blog/                    Optional — fresh content for GEO citations
```

## Redirects from the client's old site (redesigns only)
Losing old URLs loses the client's Google rankings. Before launch: crawl the old site, add its top pages from Search Console, map each old URL 1:1 to its closest new page. Never redirect everything to the homepage. Ship as permanent redirects in `redirects()` in `next.config.ts`, then watch Search Console 404s for 2 weeks.

| Old URL | New URL | Note |
|---|---|---|
| {{/old-page}} | {{/new-page}} | |

## Pillar & cluster outline (option B only)
### Pillar 1: {{topic}}
- Primary keyword: {{keyword}}
- Intent: {{informational / commercial / transactional}}
- Clusters (aim for 8–15):
  1. {{cluster title}}
  2. {{cluster title}}
  3. ...

### Pillar 2: {{topic}}
- ...

## Site-wide schema plan
- `Organization` — in root layout.
- `WebSite` (name + url, no `SearchAction`) — root layout.
- `BreadcrumbList` — every page.
- Per page type:
  - Articles → `Article` + `Person` (author) + `Organization` (publisher).
  - Services → `Service`.
  - Local business → `LocalBusiness` + `Place`.
  - FAQ blocks → `FAQPage`.
  - Products → `Product` + `Offer` + `AggregateRating`.

## `robots.txt` + LLM policy
- Allow all major search engines.
- LLM crawlers: {{allow / block — state the decision and why}}
- Sitemap: `/sitemap.xml`

## `llms.txt` outline
- Site description (1 paragraph, clear value prop).
- Top 10 canonical pages with one-line summaries.
- Out-of-scope note (what the site does NOT cover).

## GEO answer blocks (for AI citation)
Every pillar + cluster page starts with:
- Direct-answer paragraph (50–80 words, question + answer).
- 3+ unique data points (original numbers, observations, or quotes).
- Author + last-reviewed date.

## Pre-ship checklist (per page)
- [ ] One H1 with primary phrase in first 60 chars
- [ ] `<title>` ≤60 chars, keyword first, brand last
- [ ] Meta description ≤160 chars, benefit-led
- [ ] Canonical link
- [ ] OG image 1200×630
- [ ] JSON-LD schema block
- [ ] GEO answer block near top
- [ ] Semantic HTML, heading order strict
- [ ] Internal links to pillar + 2 related clusters
- [ ] Last-reviewed date visible
