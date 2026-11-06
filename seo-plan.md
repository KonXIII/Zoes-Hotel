# SEO + GEO plan — Zoe's Hotel & Suites

> Bootstrap step 9, 2026-11-06. Built from `SEO-GEO-GUIDE.md` + `brief.md`. Update whenever pages are added.
> Primary goal = **direct bookings**. SEO's job is to win the "brand + Faliraki hotel" searches *before* the OTAs do, and to rank for the two room types.

---

## Primary language + locale
- Default locale: **en** (served at `/`, no prefix)
- Additional locales: **el** (served at `/el/…`). Full translation with `hreflang` en / el / x-default → en.
- Slugs: English slugs in both locales (`/el/rooms/swim-up-suites`). This is simpler to maintain, and Greek visitors still get Greek titles and H1s.

## Target searches (by page)
| Page | Primary phrase | Secondary |
|---|---|---|
| `/` | Zoe's Hotel Faliraki | hotel in Ladiko Rhodes · family hotel Faliraki · ξενοδοχείο Φαληράκι |
| `/rooms/superior-rooms` | family rooms Faliraki | hotel room for 4 Rhodes · Superior Room Faliraki |
| `/rooms/swim-up-suites` | swim-up suite Faliraki | adults-only swim-up suite Rhodes · private pool suite Faliraki |
| `/pool-and-dining` | hotel with pool Faliraki | Greek restaurant Ladiko · poolside breakfast Rhodes |
| `/location` | hotel near Anthony Quinn Bay | hotel near Ladiko beach · Faliraki hotel airport distance |
| `/faq` | Zoe's Hotel cancellation policy | (brand + question searches) |

## URL architecture (A: small local business)
```
/                               Home: who, where, the two doors (families / suites), book, proof
/rooms                          Overview: two room types side by side
/rooms/superior-rooms           48 rooms, 32 m², 3 adults or 2+2 kids, balcony views
/rooms/swim-up-suites           10 suites, adults 21+, max 2, swim-up pool, 13 m² veranda
/pool-and-dining                200 m² pool, kids' pool, Zoes restaurant, breakfast, pool bar, Greek nights
/location                       Ladiko, distances table, getting here (taxi €33 / 20 min), nearby beaches + sights
/gallery                        Full photo set, grouped
/faq                            FAQ + booking, cancellation and non-refundable policies, check-in/out, season
/contact                        Full NAP, map, phone/mobile/email, contact form
/privacy  /cookies              GDPR (required; EU site with forms + analytics)
/el/…                           Greek mirror of all of the above
```
Booking button → `https://zoeshotelfaliraki.reserve-online.net/` (external, opens the engine with dates and guests prefilled if the engine accepts URL params; check this).

**Phase 2 (only if the owner will keep it up):** small guides that win AI and "near me" citations, such as "Ladiko beach & Anthony Quinn Bay: walking from Zoe's" and "Faliraki without a car". Each one needs real local knowledge from the family, not generic text.

## Redirects from the old site
Old site is WordPress with 7 URLs in its sitemap (checked 2026-11-06). Before launch, also check Search Console for any other URLs that get traffic.

| Old URL | New URL | Note |
|---|---|---|
| `/` | `/` | |
| `/about/` | `/faq` | Old About page held the room facts **and** the FAQ. Room traffic goes to `/rooms`, but the FAQ is the bigger chunk. Re-check in Search Console. |
| `/gallery-2/` | `/gallery` | |
| `/location/` | `/location` | |
| `/αρχική/` (`/%ce%b1%cf%81%cf%87%ce%b9%ce%ba%ce%ae/`) | `/el` | Greek home |
| `/φωτογραφίες/` (`/%cf%86%cf%89…`) | `/el/gallery` | Greek gallery |
| `/τοποθεσία/` (`/%cf%84%ce%bf…`) | `/el/location` | Greek location |
| `/el/*` (WP language prefix, may exist) | `/el/*` closest match | verify with crawl |

Ship as permanent `redirects()` in `next.config.ts`, then watch Search Console 404s for 2 weeks.

## Site-wide schema plan
- **`Hotel`** (LodgingBusiness) in the root layout. It is the main entity:
  - `name` "Zoe's Hotel & Suites", `url`, `logo`, `image[]`, `telephone` +30 22410 85140, `email`, `faxNumber`
  - `address`: Ladiko, Faliraki, 851 05 Rhodes, GR. `geo` (lat/lng: **get from Google Business Profile**)
  - `starRating` 3, `checkinTime` 15:00, `checkoutTime` 11:00, `petsAllowed` false
  - `numberOfRooms` 58, `amenityFeature[]` (pool, children's pool, restaurant, free Wi-Fi, free parking, playground, mini gym, 24h reception, wheelchair ramps)
  - `openingHoursSpecification` / seasonal note: 15 May – 15 Oct
  - `sameAs`: TripAdvisor, Booking.com, Facebook, Instagram, YouTube, Google Business Profile URLs (**owner to supply**)
  - `aggregateRating` **only once the owner gives real numbers**, never estimated
- **`WebSite`** (name + url, no `SearchAction`) in the root layout.
- **`BreadcrumbList`** on every inner page.
- Per page:
  - Room pages → `HotelRoom` (`floorSize`, `occupancy`, `bed`, `amenityFeature`) inside an `Offer` that links to the booking engine (no price unless real).
  - `/faq` → `FAQPage` (real FAQ, from the owner's text).
  - `/location` → `Place` + `TouristAttraction` mentions (Anthony Quinn Bay, Ladiko beach, Kallithea Springs, Rhodes Old Town).
  - `/pool-and-dining` → `Restaurant` (servesCuisine: Greek, International) linked to the Hotel via `containedInPlace`.

## `robots.txt` + LLM policy
- Allow all major search engines.
- LLM crawlers: **allow retrieval/search bots** (ChatGPT-search, PerplexityBot, Claude-SearchBot, Google-Extended for AI Overviews), because travellers increasingly ask AI "where to stay near Anthony Quinn Bay" and we want to be cited. **Block training-only bots** (GPTBot, CCBot, etc.) following the guide's two-track default.
- Sitemap: `/sitemap.xml` (both locales, with `alternates`).

## `llms.txt` outline
- One paragraph: family-run 3-star in Ladiko, Faliraki, Rhodes. 48 family-friendly Superior Rooms + 10 adults-only swim-up suites. Open 15 May – 15 Oct. Book direct.
- Canonical pages: home, both room pages, pool & dining, location, FAQ, contact, each with one line.
- Out of scope: no pets, no children in suites, closed in winter, not all-inclusive (confirm board options).

## GEO answer blocks (top of each page, below the H1)
- 50–80 word direct answer containing the page's facts ("Zoe's Swim-Up Suites are 10 adults-only (21+) suites in Ladiko, Faliraki… 30 m² with a 13 m² veranda and steps straight into a private pool…").
- 3+ hard data points per page (sizes, capacities, distances, times). We have plenty, in `content/source-texts.md`.
- "Last updated" date on FAQ and location.

## Local SEO (biggest lever for a hotel; mostly off-site)
- **Google Business Profile** needs claiming/verifying, with the exact NAP below, photos from `Images/`, a booking link to the engine, and seasonal hours. **Owner to confirm access.**
- **NAP (use exactly, everywhere):** Zoe's Hotel & Suites · Ladiko, Faliraki, 851 05 Rhodes, Greece · +30 22410 85140
- Check the NAP on Booking.com, TripAdvisor and discovergreece.com listings.

## Pre-ship checklist (per page)
- [ ] One H1 with primary phrase in first 60 chars
- [ ] `<title>` ≤60 chars, keyword first, brand last
- [ ] Meta description ≤160 chars, benefit-led
- [ ] Canonical + hreflang (en, el, x-default)
- [ ] OG image 1200×630
- [ ] JSON-LD schema block, validated
- [ ] GEO answer block near top
- [ ] Semantic HTML, heading order strict
- [ ] Internal links: every page → both room pages + book
- [ ] Last-reviewed date visible (FAQ, location)
