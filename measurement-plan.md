# Measurement Plan — Zoe's Hotel & Suites

> Bootstrap step 9b, 2026-11-06. Anchored to `brief.md` → the one metric: **direct bookings**.

---

## 1. Primary conversion
- **The one action that = success:** A confirmed reservation in the hotel's own engine (`zoeshotelfaliraki.reserve-online.net`).
- **Where it happens (page + element):** Off-site, inside the booking engine. Our site can only see the hand-off: the **"Book now" / "Check availability"** buttons (sticky header on every page, room pages, home). The engine itself refuses automated requests (HTTP 403 via CloudFront), so we can't check it from here.
- **How we measure the real number:** Compare the engine's own reservation reports, split by channel, with the OTA reservations, season on season. (b) Deep links are **verified** (owner, 2026-11-06): `?checkin=YYYY-MM-DD&nights=N&adults=N&children=N` prefills the engine. **Still ask the provider** about (a) conversion tracking or a GA4/pixel on the confirmation page and (c) UTM / referrer reporting. With (a), we'd get a true `booking_made` event.

## 2. Key events to track
Vercel custom events. Max 2 properties each. No personal data.

| Event name | Fires when | Properties | Why it matters |
|---|---|---|---|
| `booking_start` | Click on any link to the booking engine (an outbound hand-off; the closest we can get to the conversion until the provider gives us a confirmation hook) | `place` (header / hero / superior / suites / footer), `locale` | Main funnel number. Shows which page and position drive bookings |
| `phone_click` | `tel:` link tapped | `place`, `locale` | Many hotel bookings still close by phone (owner's FAQ invites it) |
| `email_click` | `mailto:info@zoes.gr` tapped | `place` | Same: the direct channel, outside the engine |
| `lead_submitted` | Contact form returns OK (fires on `res.ok`, not on click) | `topic` (booking / question / other) | Enquiries from the form |
| `room_view` | Room page viewed (page view is enough, so no custom event needed) | n/a | Families vs couples interest split, which tests the "two doors" idea |

## 3. Tooling
- **Analytics tool:** `@vercel/analytics` (Vercel Pro, so `track()` custom events work). Add `@vercel/speed-insights` for real-user Core Web Vitals.
- **Consent / privacy stance:** EU site under GDPR. Vercel Web Analytics is cookieless, so **no cookie banner is needed for it**. If the owner later wants Meta Pixel / Google Ads / GA4, a consent banner becomes mandatory first. `/privacy` page states what's collected.

## 4. Core Web Vitals targets
- **LCP:** < 2.5s · **INP:** < 200ms · **CLS:** < 0.1
- **Current weak spot to watch:** **LCP on the hero photo** on mobile (big images, Greek 4G). Mitigation: `next/image` with `priority`, AVIF/WebP, correct `sizes`, no carousel in the hero, and fonts limited to 2 families with `display: swap`.

## 5. Post-launch review cadence
- **First review:** 2 weeks after launch (Search Console 404s from the redirects + first `booking_start` numbers).
- **Then:** monthly during the season (May–Oct). End-of-season review in late October: direct vs OTA share against last season.
- **What we'll act on:** pages with high views and low `booking_start` → `/market-landing` CRO review. Locale gaps (EL vs EN) feed the translation fixes.
