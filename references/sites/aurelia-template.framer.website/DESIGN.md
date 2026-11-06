---
name: Aurelia (Framer template)
url: https://aurelia-template.framer.website/
captured: 2026-11-06
method: shoot.mjs full-page screenshots at 1440 and 390 + CSS token extraction from the served HTML (Playwright MCP not loaded in this session)
colors:            # measured (frequency in served CSS)
  cream: "rgb(248,245,240)"      # main light surface
  sand: "rgb(238,231,221)"       # alternate light surface (FAQ band)
  forest: "rgb(30,42,36)"        # dark bands (services, quote strip)
  ink-dark: "rgb(28,29,28)"      # footer
  brass: "rgb(219,174,105)"      # eyebrow labels, price chips, outline icons
  brass-deep: "rgb(185,154,107)" # filled CTA buttons
  sage: "rgb(111,127,115)"       # secondary buttons ("Explore Room", "About Us")
  body-grey: "rgb(90,90,90)"
typography:
  display: "Cormorant Garamond" # measured; Latin/Cyrillic only, NO Greek
  body: "Manrope"               # measured
  display-sizes: [80, 64, 56, 48, 42]   # px, measured
  display-tracking: "-0.02em to -0.04em" # measured
  label-tracking: "0.13–0.2em uppercase"  # measured
  body-size: "13–16px"                   # measured (small)
radius: { buttons: "≈4px (inferred)", cards: "8px", arch-frame: "200px" }  # measured + inferred
---

## Overview
A template for a warm, light luxury resort. The base is a cream page with dark forest-green bands between sections. A large light-weight Garamond carries every heading, and brass is the only accent. It reads as calm, expensive and editorial. **All imagery is AI-generated stock**, which is the opposite of what Zoe's needs.

## Page sequence (1440)
1. **Hero.** A full-bleed photo with the nav laid over it, a left-aligned 2-line serif headline, one short paragraph and a ghost button. A dark **booking bar** sits on the bottom edge of the hero: name, email, room type, dates, adults, children, then "Request Booking".
2. **Intro.** A centred serif headline, a short paragraph, a manager's signature, then a button. An **arch-masked portrait** on the right, over faint line-drawn landscape illustrations in the background.
3. **Thin dark quote strip.** One serif line plus "Book Now →".
4. **Featured rooms.** Three cards: photo with a dark "From $239" chip, serif room name, an **icon fact row (m² · bed · guests)**, two lines of copy, then a full-width sage button.
5. **Dark services band.** Headline and button on the left. On the right, stacked thin-outlined cards, each with a circle icon, serif title, brass label and text.
6. **Gallery.** A bento grid: one large tile plus a 2×2.
7. **Full-bleed photo with a centred italic serif review quote**, star row, source ("TripAdvisor") and carousel dots.
8. **FAQ.** Headline and CTA on the left, a hairline-divided accordion on the right.
9. **Dark footer** in 4 columns: address, contact, social, pages.

## Typography
- Display: light Garamond, very large (64–80px desktop, about 44px mobile), slightly tight tracking, sentence case. **Italic serif for quotes.**
- Body is small and grey (13–16px). It is elegant, but the 13px grey text is weak for readability and contrast.
- Labels are small uppercase with wide tracking, set in brass.

## Colour discipline
Only two surface families (cream/sand and forest/near-black) plus one accent (brass). Sage is a quiet secondary. There are no gradients other than photo darkening.

## Elevation & shapes
Flat. Depth comes from photo vs. surface contrast and from the dark bands, not from shadows. Radii are small (about 4–8px). The one soft shape is the 200px **arch** mask.

## Responsive (390)
The hero headline stays big. The booking bar turns into a tall stacked form card inside the hero (7 fields), which pushes the content a full screen down. The arch portrait stacks under the intro text, and the cards stack.

## Do's (as the template practises them)
- One accent, used for small things: labels, price chips, the primary CTA.
- Big serif headings with plenty of air around them. Each section does one job.
- Room cards carry hard facts (m², bed, guests) as an icon row.
- A dark band breaks up the light page every 2–3 sections.

## Don'ts / weaknesses we should not copy
- AI stock imagery and generic luxury copy ("Experience Timeless Luxury").
- Hairline-outlined cards, hairline FAQ dividers and tracked-caps eyebrow labels, which are **banned by kit house rules**.
- A booking "request" form asking for name and email, which adds friction. A real engine hand-off is better.
- On mobile, a 7-field form in the hero.
- 13px grey body copy.

## Known gaps
- Motion: not captured (Framer appear/scroll effects likely).
- Exact button padding and radius: inferred from screenshots.
- Hover states: not captured.
