# Measurement Plan — {{project_name}}

> The "measure and iterate" layer. Filled during BOOTSTRAP step 9b.
> A site you can't measure is a site you can only guess about. Keep this tight —
> one primary conversion, a handful of events. Anchor to `brief.md` → the one metric.

---

## 1. Primary conversion
- **The one action that = success:** {{primary_conversion}}  <!-- mirrors brief.md -->
- **Where it happens (page + element):** {{conversion_location}}

## 2. Key events to track
**Rules:** fire on the **confirmed** success (after the request returns OK, or the booking widget confirms), never on the button click · names are lowercase `object_action` (`lead_submitted`, `booking_made`, `phone_click`) · **no personal data** in properties (no names, emails, phone numbers) · Vercel allows **max 2 properties** per event.
Common local-business set: `lead_submitted` (own forms, see `_examples/form-accessible.tsx`), `booking_made` + `phone_click` (see `_examples/conversion-tracking.tsx`).

| Event name | Fires when | Why it matters |
|---|---|---|
| {{event_1}} | {{trigger_1}} | {{why_1}} |
| {{event_2}} | {{trigger_2}} | {{why_2}} |
| {{event_3}} | {{trigger_3}} | {{why_3}} |

## 3. Tooling
- **Analytics tool:** {{analytics_tool}}  <!-- default: Vercel Web Analytics on the Pro plan (client sites are on Pro). Custom events via track() need Pro; on a Hobby project use Plausible instead -->
- **Consent / privacy stance:** {{consent}}  <!-- cookieless preferred; note GDPR if EU audience -->

## 4. Core Web Vitals targets (ranking factor — see SEO-GEO-GUIDE)
- **LCP:** < 2.5s  ·  **INP:** < 200ms  ·  **CLS:** < 0.1
- **Current weak spot to watch:** {{cwv_risk}}  <!-- INP is the common failure in 2026 -->

## 5. Post-launch review cadence
- **First review:** {{first_review}}  <!-- e.g. 2 weeks post-launch -->
- **What we'll act on:** {{review_action}}  <!-- route findings to /market-landing for CRO -->

---
<!-- Implementation: add `@vercel/analytics` (TECH-STACK → OPTIONAL), mount <Analytics /> in
     app/layout.tsx, and fire the events above from the conversion elements. The EDIT MODE
     quality gate checks that conversion elements emit these events. -->
