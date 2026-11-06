# Art Direction — Zoe's Hotel & Suites

> Bootstrap step 9a, 2026-11-06. Anchored to `brief.md` (wedge: *two holidays in one family-run hotel*) and `.impeccable.md` (warm editorial, limestone + teal, no navy UI).
> Status: **proposed**, waiting for the owner's OK before the build.

---

## 1. The big idea
**"A summer day at Zoe's, from first light to the pool lights."**
The site follows one day at the hotel. **Daylight** is the family hotel: breakfast by the big pool, the garden, the walk to Ladiko beach. It is set on light limestone pages. **Evening** is the adults-only Swim-Up Suites: the same hotel after the pool lights come on. It is set in deep "cypress" bands. The two audiences get their two doors through the light itself, without us having to label them. It works because the photos really are shot that way: the swim-up pool, the suite rooms and the main pool all exist in both day and night versions.

Why not a clean template: a template would show the same "luxury" card grid to everyone. This idea comes from Zoe's own two-sided product and from their own photographs.

## 2. Reference direction
- **References:** Aurelia (`references/sites/aurelia-template.framer.website/DESIGN.md`) was chosen by the owner. Room for 1–2 more as the owner collects them.
- **What to borrow (principles, in our own words):**
  - Big, light-weight old-style serif headings with lots of air. One idea per section.
  - Two surface families only (light limestone/sand and one deep dark band), plus **one** accent. The dark band shows up every 2–3 sections to set the pace.
  - Booking sits **on** the hero, not in a separate section. It hands off to the engine.
  - Room cards built on hard facts: an icon row of **m² · beds · guests**, with prices only when they're real.
  - A full-bleed photo with one large italic-serif guest quote (once the owner sends real reviews).
  - FAQ as a two-column block: headline and contact on the left, accordion on the right.
  - Flat surfaces, small radii, depth from photo vs. surface contrast rather than shadows.
- **Translate, don't copy (house rules):** no tracked-caps eyebrow labels, which become plain sentence-case lead lines. No hairline-outlined cards or hairline FAQ dividers, which become spacing and surface steps. Aurelia's Cormorant/Manrope fonts, brass/forest colours, arch-portrait layout and copy are not used.
- **Anti-references:** AI stock imagery and "Experience Timeless Luxury" copy. Navy corporate hotel sites. OTA listing pages crammed with icons. Glossy 5-star dark-and-gold glamour, because Zoe's is an honest 3-star and proud of its value.

## 3. Type system
- **Display: EB Garamond** (variable, with italics, **full Greek**). An old-style Garamond gives the same warm, editorial calm as the reference. It's used large (about 4.5–5rem desktop), tracked about −0.02em, in sentence case. Italic is kept for guest quotes and the odd emphasised word.
- **Body: Commissioner** (variable, **full Greek**, designed by Greek type designer Kostas Bartsokas). It is a warm, slightly humanist sans and readable at 16–17px. That's a deliberate step up from the reference's 13px grey.
- The logo keeps its own Didone serif. EB Garamond sits beside it without competing.
- **Scale:** the kit's fluid perfect-fourth scale (1.333). Body never below 16px. Facts (m², distances, times) are set in Commissioner with tabular figures.

## 4. Color system: limestone + teal (+ cypress for evening)
- **Day surfaces:** limestone `oklch(97% 0.012 85)` as the page, sand `oklch(93% 0.02 80)` as the alternate section, and oak-ink `oklch(28% 0.03 60)` for text (warm brown-black, taken from the oak headboards).
- **Evening surface:** cypress `oklch(26% 0.035 175)`, a deep green-teal night. It's used for the Swim-Up Suites story, the quote band and the footer. *Not navy:* the hue stays green-side at 175.
- **Accent:** Zoe's teal `oklch(52% 0.1 200)` (deepened from the room cushions for AA contrast). It is used **only** for booking actions (Book / Check availability), links and small highlights. A lighter teal `oklch(78% 0.08 195)` is used for accents on cypress.
- **Logo colours** (navy + copper) appear only inside the logo file. A light/reversed logo version is needed for cypress bands.
- **Update 2026-11-06:** booking actions moved from teal to **copper `#A85E25`** (the logo's sunburst) after owner feedback. The booking bar is now a light limestone panel on the hero, and the hero photo is graded (less saturated) with a left/bottom cypress scrim for legible text.
- **Rule:** one accent. No gradients except a subtle photo scrim behind hero text. All text pairs AA, checked in build.

## 5. Layout & composition
- **Grid:** a calm 12-column editorial grid. Most sections are asymmetric (text 5 / image 7, alternating sides). The rooms and gallery sections are the only multi-column grids.
- **Whitespace:** generous for the story sections, then dense and scannable for facts (amenities, distances table, FAQ, policies).
- **Photography:** real Zoe's photos only, shown large, with as little cropping as possible on room shots. Day photos go on limestone and night photos on cypress.
- **Home sequence (draft):**
  1. Hero (morning garden or pool) with the booking bar on its lower edge.
  2. Welcome ("Dear future guests") with the family-run voice.
  3. **Two doors:** Superior Rooms (day) and Swim-Up Suites (evening).
  4. Pool & dining.
  5. Ladiko & around, with real walking distances.
  6. Guest quote (later).
  7. FAQ / book direct.
  8. Footer.

## 6. Motion temperament
- **Overall:** restrained and physical. It should feel like light changing, not like things flying in.
- **Defaults:** the kit's blur-in titles, gentle reveals (opacity + 12–16px rise, 500–700ms, ease-out-quint), Lenis smooth scroll at light strength.
- **Reduced motion:** all reveals become instant. The day→night signature becomes a simple pair of photos side by side.

## 7. The signature moment
**Day → night on the swim-up pool.** Where the Swim-Up Suites door opens, the same view of the suite terraces crossfades as you scroll, from afternoon (`Vlasis-108`) to the pool lights on (`Vlasis-76`). Both are shot facing the stone wall and terraces from the water; 108 needs cropping in to match 76's framing. The page surface darkens from limestone to cypress at the same moment, so the scroll itself is the evening coming in. On the suite page, the room sequence `Vlasis-120 → 121 → 122` (the same room as the light drops) can echo it. No WebGL is needed. It's a GSAP ScrollTrigger crossfade on two pre-aligned images.

## 8. Creative-tech ambition
No WebGL or 3D. The signature moment is a scroll-scrubbed image crossfade plus a surface colour change (GSAP + ScrollTrigger + Lenis, all already in the stack).

---

## Production notes (photos)
- **Resolution:** most photos are 930–1024px wide. That's fine for cards and split layouts, but **soft for a full-bleed hero and for the day/night pair** on large or retina screens. Recommendation: **upscale about 6 key photos** (hero, the day/night pair, 2–3 room heroes) with Higgsfield (`brand-imagery`, restore/upscale only, no content change). This uses Higgsfield credits and **needs the owner's OK**. Without it, the hero is designed as a split layout, not full-bleed.
- **The 1920px photos** are 4 Superior Room webps (`L1229825/27/33/34`) and the suite night shot `Vlasis-126`.
- **Exclude:** `Vlasis-55` (camera visible in the mirror).
- **Day/night pair (checked 2026-11-06):** `Vlasis-108` (day) ↔ `Vlasis-76` (night). They face the same terraces from about the same spot, so they work after cropping 108 tighter. Rejected pair: `Vlasis-6-4` ↔ `Vlasis-77` (shot from opposite sides of the pool, so a crossfade would jump). Both of these can still be used as stand-alone day and night photos.
