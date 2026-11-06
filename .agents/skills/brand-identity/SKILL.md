---
name: brand-identity
description: Build or extend a visual brand identity from a company's existing assets, then lock it into a reusable system that downstream generation inherits. Samples true colours from a logo, extends the palette, defines type and material systems, writes the locked master prompt and four-pillar blueprint, plans the asset graph, and produces auditable brand guidelines. Use when asked to create a brand, build a visual identity, extend or modernise an existing brand, define a design system or brand guidelines, extract a palette from a logo, set up brand rules before generating assets, or prepare a brand pitch. Use BEFORE brand-artifacts or brand-imagery — those consume what this produces.
---

# Brand identity

Produce a **locked brand system** that later generation inherits, so assets match by construction
rather than by luck.

Read `references/method.md` before the first generation-facing decision. It carries the reasoning —
the thesis, the principle, the six evidence techniques, the four-pillar blueprint, the four prompt
architectures. Everything below is procedure.

## The mandate

Unless told otherwise, treat any existing identity as a **strict constraint, not a starting point to
deviate from**. Additive only. The work is what's missing, never what's already theirs.

State plainly which parts are fixed and which are the extension. Clients need to see you didn't
quietly redesign what they already paid for.

## Workflow

### 1. Inventory what exists

List every asset: logo files *and their formats*, photography, packaging, signage, uniforms, existing
colours, fonts, live site, social. A 1080px JPEG logo is a finding, not just an asset.

Look hard for something the brand already owns but doesn't use as a system — a wrapping paper, a
sticker, a uniform detail, a repeated photographic habit. **These are the highest-leverage findings:
they cost nothing and are already recognised by customers.**

### 2. Sample the real colours — never eyeball them

```bash
node scripts/sample_brand_colors.mjs <logo> [--json]
```
Run from a project directory that has `sharp` installed. Outputs ground, mark and accent clusters as
hex + oklch.

**Read the hue angle, not the hex.** A near-black at hue ~200 is *cool* and the whole system must stay
cool; ~40 is warm. This is invisible by eye at 20% lightness, and getting it backwards misdirects
every downstream surface.

⚠️ **Never sample with sharp's `stats()` after an `extract()`.** `stats()` reads the source image and
silently ignores prior pipeline operations, so a "corner sample" returns the whole-image mean — which
on a logo is the paper dragged dark by the mark. Use raw pixel buffers. The script does.

### 3. Find the gap

Compare what exists against what a working system needs:

| Gap | Symptom |
|---|---|
| No accent colour | The mark implies energy the palette doesn't contain |
| No type system | The wordmark is the only typographic decision ever made |
| No line of their own | They're borrowing a landlord's or supplier's tagline |
| Name inconsistency | Two or three spellings in the wild, splitting branded search |
| The name is never explained | The strongest available story sits unused |
| Raster-only logo | Cannot scale, recolour, or print |
| Mark fails small | Detail merges below ~48px — needs a size-tiered variant |

**Verify small-size failure, don't assume it.** Render the mark at 16/32/64/160px and look.

### 4. Extend — additively

- **Colour.** Anchors stay exactly as sampled. Surfaces step in *lightness only*; hue never moves, so
  photography stays the brightest thing on screen. **One accent**, with a stated rule for where it may
  appear. Three appearances on one screen and it has stopped meaning anything.
- **Type.** A display face that sits beside the wordmark without impersonating it; a body face that
  survives 16px on a phone in daylight. State what is banned and why.
- **Material world.** Name the actual substrates — uncoated kraft, blackened steel, greaseproof paper.
  Downstream prompts draw directly from this list.
- **Pattern.** If step 1 found an unused repeating asset, formalise it as the system's texture.

Check contrast on every pair and record the ratios. Note where a fill needs dark label text rather
than white.

### 5. Lock the master prompt

The deliverable that makes everything else consistent — palette, materials, lighting, prohibitions,
frozen once:

```
STYLE:       <palette with hex> only, <one accent> as the sole accent.
             <substrates>. <lighting>. <texture / print physics>.
             Never <prohibition>, never <prohibition>.
GOAL:        [per asset]
STRUCTURE:   [per asset]
CONSTRAINTS: <dimensions>. <format rules>. <hard prohibitions>.
```

Then the **artifact template** — aesthetic frozen, `[OBJECT]` the only variable, appearing 4–5 times
(silhouette, interior, illustration, label text). See `references/method.md` → The principle.

### 6. Plan the asset graph

Name every output as a token and state what feeds what: a master asset, then studio angles, detail
macros, variant loops, contexts, ad formats. For any variant set, state matching **numerically**
(same angle, same lighting, identical framing) so the set assembles into a grid without misalignment.

**The variant loop is usually the strongest single deliverable** — one template run N times with one
variable changed. That's a menu, a carousel and a printed board from one prompt.

### 7. Write the guidelines

Pair every rule with an **implementation trace**: how it was concretely applied, with real numbers.
Rules without traces are aspirational; rules with them are auditable.

Structure: what exists (fixed) → the gap → the extension → the locked prompts → the asset graph →
rules. Mark unverified facts visibly so they can never be mistaken for confirmed ones.

## Handing off

- **brand-artifacts** — text-to-image brand objects: vector marks, labels, packaging, stickers
- **brand-imagery** — image-to-image on real photographs: restore, restyle, pipelines, carousels

Both need the palette as hex, the material list, the locked master prompt, the artifact template, and
the prohibitions.

## Honesty rules

These protect the client relationship, and they matter most in spec or pitch work where nothing has
been verified yet.

- **Never invent a fact that looks like data** — prices, dates, measurements, provenance. Placeholders
  resembling real data are the biggest risk in a pitch; flag every one visibly.
- **Never generate a photograph of a product or premises that doesn't exist.** Restyling and restoring
  their real photographs is defensible; inventing the product is not.
- **Distinguish sampled from chosen.** "Sampled from the logo" and "my recommendation" are different
  claims and the client is entitled to know which is which.
- Vendor ROI statistics are marketing claims, not measured results. Use the shape of the argument,
  never the numbers.
