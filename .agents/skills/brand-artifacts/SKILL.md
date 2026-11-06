---
name: brand-artifacts
description: Generate brand objects from text via the Higgsfield MCP — vector logos, marks, icons and patterns (Recraft V4.1 vector mode with API-locked palettes), plus labels, tags, packaging, spec plates, matchbox and sticker artifacts (Nano Banana Pro / GPT Image 2 at 4K). Handles model routing, credit cost control and draft-then-finalise workflow. Use when asked to generate a logo or icon set, create packaging or label artwork, make brand stickers or merch graphics, produce vector brand assets, design a spec plate or product tag, or build a matching series of brand objects. Requires a locked brand system — run brand-identity first if none exists. For work on existing photographs use brand-imagery instead.
---

# Brand artifacts

Text-to-image generation of **physical brand objects** through the Higgsfield MCP.

Read `references/higgsfield-routing.md` before the first call — it carries measured credit costs,
the capability boundaries that decide routing, and call syntax. Read `references/recipes.md` for the
worked prompt patterns.

## Preconditions

Requires a **locked brand system**: palette as hex, material list, master prompt, artifact template,
prohibitions. If none exists, run `brand-identity` first — generating without it produces assets that
don't match each other.

## The rule everything follows

**Describe the aesthetic, not the object.** The prompt freezes material, finish, palette, aging and
print physics; the subject is one variable, `[OBJECT]`, appearing 4–5 times. Swap the object, keep
the aesthetic. That is what makes fifty assets look like one brand.

**Name a physical artifact, never "a logo" or "a design".** "A bead-blasted aluminium spec plate"
forces the model to render a thing that exists in the world. "A modern logo" produces a floating
graphic that looks generated.

## Workflow

### 1. Choose the architecture

| The artifact is… | Use | See |
|---|---|---|
| A vector mark, icon or pattern | Recraft vector + `colors` | recipes → Vector mark |
| A recognised format (matchbox, tag, seed packet, tin sign) | Named format — 4 sentences, stay short | recipes → Named format |
| A novel object (packaging, plate, label) | Nine-component artifact description | recipes → Label, tag, packaging |
| Dense type, codes and metadata | Micrographic | recipes → Micrographic |
| A repeatable set with one variable | Template + variant series | recipes → Variant series |

**Length follows how much the model already knows.** A named format needs four sentences; a novel
artifact needs nine components. Padding a named format makes it worse.

### 2. Route the model

Full table in `references/higgsfield-routing.md`. The three decisions that matter:

- **Vector or palette-locked → `recraft_v4_1`.** Only vector path, and its `colors` array locks the
  palette at the API level. But it takes **no reference image** and caps at **2K**.
- **Anything with real text → `nano_banana_pro` at 4K (4 credits).** Not `gpt_image_2` at 4K/high,
  which is 12 credits for the same resolution. Escalate to GPT Image 2 only after NBP has actually
  failed on the typography in that specific composition.
- **Must match an existing object → needs a reference image**, so not Recraft.

### 3. Draft cheap, finalise expensive

Every model has a ~4× gap between tiers. Explore at `recraft` 1K / `gpt_image_2` 2K-medium /
`nano_banana_pro` 1K. Only bump resolution once the composition is approved.

Preflight anything over ~5 generations with `get_cost: true`, check `balance()`, and state the
projected spend before running.

### 4. Build the prompt

Every generation carries the four-pillar header:

```
STYLE:       <locked master prompt — palette, substrate, lighting, print physics, prohibitions>
GOAL:        <what this specific asset is for>
STRUCTURE:   <composition>
CONSTRAINTS: <dimensions, format rules, hard prohibitions>
```

Then the architecture body. Non-negotiables inside it:

- **Quantify.** "1–3px misregistration", "40–60 dots across the width" — never "slightly offset".
- **Quote text verbatim with its position.** Never "some text at the top".
- **One named defect with its cause** — *"registration slightly off, typical of cheap letterpress"*.
- **Invented metadata** where the artifact would carry it — REF, LOT, dates, coordinates, origin.
  Derive it from something true about the business and format it as machine data.
- **Bound the aging**: "visible but restrained — used and authentic, not destroyed."
- **Negative prompt** on restyle-type work: 10–15 items, mostly absent-flaw failures (perfect
  registration, anti-aliased edges, clean digital illustration, smooth gradients, HDR, 3D shading).

### 5. Verify before delivering

- Palette held? Recraft's `colors` enforces it; other models drift — check.
- Text spelled correctly and legible at final size?
- One accent only, appearing where the brand rules allow?
- Does it look printed rather than rendered?
- For a series: do the variants actually align into a grid?

Vector output that needs to betrue SVG must still be traced (potrace at 4× upscale → SVGO) and set to
`fill="currentColor"` so it recolours from CSS.

## Prohibitions

- Never generate a photograph of a product or premises that doesn't exist. Artifacts, packaging and
  graphics are fine; inventing the client's actual product is not.
- Never let invented metadata contradict a real fact.
- Never explore at maximum resolution.
- Never introduce a second accent colour.
