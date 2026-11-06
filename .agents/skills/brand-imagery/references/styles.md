# Restyle and restore — the five-step skeleton

One skeleton runs every image-to-image job. What changes is whether the steps *transform* or
*preserve*.

## Contents
- [The skeleton](#the-skeleton)
- [Restore — zero alteration](#restore--zero-alteration)
- [Halftone](#halftone)
- [Risograph](#risograph)
- [Tool-physics styles](#tool-physics-styles)
- [Compose then treat](#compose-then-treat)

---

## The skeleton

```
CORE DIRECTIVE: <target>
TASK: Analyze the input image and recreate it as <target>.

STEP 1: <the core conversion — the one destructive transform>
STEP 2: <the ground — field and palette rule>
STEP 3: <THE DEFINING MOVE — the single mechanic that makes the style>
STEP 4: <the added layer — print character, texture, applied elements>
STEP 5: <final aesthetic — 3 bullets, the whole look as a gestalt>

NEGATIVE PROMPT: <10–15 items>
```

Step 3 is the one that matters. **Identify the single mechanic that makes the look and state it with
a number.** Length is not the variable — specificity of that mechanic is. A 494-character prompt with
one exact rule beats a 2000-character prompt of adjectives.

Negatives are mostly **absent-flaw failures**: perfect colour registration, anti-aliased edges, clean
digital illustration, smooth gradients, HDR, 3D shading, photorealistic rendering.

---

## Restore — zero alteration

Run this **first**, before any other imagery work. A compressed or screenshot-quality source poisons
every downstream step. Model: `nano_banana_pro` 4K with the source as reference.

This is also the **honesty guardrail written as a prompt** — it provably restores rather than
fabricates, which is what to say when a client asks what was done to their photographs.

```
CORE DIRECTIVE: QUALITY ENHANCEMENT ONLY — ZERO CONTENT ALTERATION
TASK: Enhance image to maximum clarity and resolution without changing any visual content.

STEP 1: ABSOLUTE PRESERVATION (CRITICAL)
The following must remain 100% pixel-identical in content:
- Subject identity and structure
- <domain specifics — see below>
- Background: every element, lighting, composition
- Framing: composition, crop, perspective
ZERO ALTERATION RULE: Do NOT regenerate, reinterpret, smooth, stylize, or modify any
visual content. Only improve technical image quality.

STEP 2: TECHNICAL ENHANCEMENT
- Sharpen existing details without creating new ones
- Reduce noise and compression artifacts present in source
- Upscale to maximum available resolution
- No over-sharpening, no artificial detail generation
- Preserve authentic photo grain or texture if present

STEP 3: LIGHTING REFINEMENT (PRESERVE DIRECTION)
- Enhance existing lighting quality without changing direction or source
- NO new light sources, NO changed shadow directions

STEP 4: COLOUR & TONE
- Maintain original colour palette and relationships
- Preserve original temperature — no warm/cool shift
- Avoid oversaturation

STEP 5: FINAL QUALITY
- Natural film-like authenticity, not over-processed digital
- Every detail crisp and well-resolved

NEGATIVE PROMPT: regenerated subject, altered composition, added elements, removed
elements, smoothed texture, plastic surfaces, AI-smoothing effect, different lighting
direction, HDR halo, over-sharpened artifacts, artificial detail generation, stylized
interpretation, repositioned subject, cropped differently, colour palette shift,
warm/cool tone shift, missing details from original
```

**Swap step 1's specifics for the domain.** For portraits: facial features, expression, bone
structure, hair strand placement, clothing wrinkles. For food: crumb and bark structure, grease sheen
and highlights, char marks, sauce distribution, printed packaging detail, substrate fibre. For
product: geometry, label position, material finish, wear marks.

⚠️ **Verify by eye against the original every time.** The prompt requests zero alteration; that is an
instruction, not a guarantee.

---

## Halftone

Newsprint / screened-print register. Pairs with compose-then-treat.

- **Step 1** — convert to a coarse halftone dot screen. Quantify: *"roughly 40–60 dots across the full
  image width, as if a magazine print were enlarged 30–40×."*
- **Step 2** — the ground is paper, not white. **Light areas become raw stock; do not fill them with ink.**
- **Step 3 (defining move)** — the ink count. For a two-ink brand: *one ink on paper, with the accent
  appearing exactly once per composition and nowhere else.*
- **Step 4** — print character: misregistration on the accent plate only (1–3px), dot gain, ink bleed
  at the edges of solids, visible paper fibre.
- **Step 5** — crushed blacks, blown highlights, xerox character; no gradients, no glows, no shadows.

---

## Risograph

Stencil duplication — ink physics rather than screen physics.

- **Step 1** — reduce the whole composition to a **maximum of 4 ink layers** (2 is stronger for most
  brands). **All white and light zones become raw uncoated paper — do NOT fill white areas with ink.**
- **Step 2** — simplify into bold flat shapes. Remove photographic detail. Coarse halftone screens for
  mid-tones. Hard-edged silhouettes with slight imperfection.
- **Step 3 (defining move)** — **overprint and misregistration.** Where two inks overlap they multiply
  into a new colour. Layers are deliberately misaligned 1–3px — *"this misalignment is intentional and
  must be visible at the edges of coloured shapes."*
- **Step 4** — ink is semi-transparent and soy-based: uneven patchy density, granular speckle, ink
  bleed at edges, and **occasional ink dropout — tiny gaps inside filled shapes.**
- **Step 5** — handmade and analog, paper grain unifying all layers, no drop shadows, no glows, no
  gradients. May crop or reframe for a bold poster layout.

**Best subjects: simple ones.** Logos, marks, portraits, single objects, heavy texture. Riso cannot
screen what it cannot reduce — which is the same rule as compose-then-treat, from the other direction.

---

## Tool-physics styles

Specify the **instrument and its failure modes**, not the appearance.

> *"Simulate a 20mm chisel-tip permanent marker. No fine lines — every stroke thick and massive.
> Show the dry-drag texture where the marker moved too fast and didn't cover the paper 100%. Ink
> edges fuzzy from capillary action."*

Generalises to ballpoint, wax crayon, rubber stamp, spray can, letterpress, brush. Useful as a
**secondary voice** for anything that changes daily — sold-out marks, specials, annotations — set
against the printed permanent identity.

---

## Compose then treat

Two passes, and the order matters.

```
STAGE 1 — COMPOSE   cut out the subject, place it on a ground, add elements
STAGE 2 — TREAT     apply the print treatment (halftone / riso)
```

> **The rougher the input graphic, the more authentic the final result. Do not over-polish the prep.**

The treatment pass is a **unifier** — crude cutouts and mismatched edges read as print artefacts once
screened. Polishing stage 1 actively makes stage 2 worse.

Stage 1 can be done in an image editor or with a cheap AI pre-edit pass ("cut out the subject, place
on a charcoal ground, add three rough accent shapes behind it"). Draft tier is fine — it's going to
be screened anyway.
