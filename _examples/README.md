# Reference patterns

These are **reference** implementations — not components to ship. Claude reads them before building anything new so the output stays anti-slop.

## Rules embodied by every file here
- `oklch()` colors only — never hex.
- Distinctive display font (Fraunces / serif / grotesk), never Inter/Roboto default.
- Fluid type with `clamp()` — not fixed px.
- No glassmorphism, no purple-to-blue gradients, no cyan-on-dark.
- Animations use `transform` + `opacity` only, exponential easing, ≤500ms.
- Asymmetric layouts. Not everything wrapped in a card.
- Real semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`).
- A11y baked in — focus-visible, aria-labels, reduced-motion respected.

## What's here
- `hero-editorial.tsx` — editorial-style hero with oversized serif + subtle scroll cue.
- `nav-sticky.tsx` — sticky nav with scroll-position backdrop, keyboard-accessible.
- `feature-grid-asymmetric.tsx` — broken grid, varied cell sizes.
- `form-accessible.tsx` — react-hook-form + zod, real error states. Shows success only after the server confirms (`res.ok`), then fires the lead event.
- `cta-bold.tsx` — single bold CTA block with restrained motion.
- `scroll-reveal.tsx` — GSAP ScrollTrigger stagger reveal, matchMedia-gated.
- `blur-title.tsx` — titles blur into focus word by word (house default): `<BlurWords>` on load in CSS, `data-title` + `<Motion>` on scroll.
- `footer-generous.tsx` — spacious footer with logical information architecture.
- `conversion-tracking.tsx` — counts embedded Cal.com / Calendly bookings and `tel:` taps with Vercel `track()`. Mount once in the root layout. No personal data sent.

When building a similar section, Claude should:
1. Read the matching reference file.
2. Adapt colors/fonts from `.impeccable.md` (not copy the example's tokens).
3. Keep the structure, rename to the project.
