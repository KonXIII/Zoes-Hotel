---
name: brand-imagery
description: Work on real photographs via the Higgsfield MCP — restore and upscale compressed sources with zero content alteration, restyle them into print aesthetics (halftone, risograph, tool-physics), build matched product-shot pipelines and variant grids, generate lifestyle scenes, and produce social carousels. Uses Nano Banana Pro / GPT Image 2 / Seedream with reference images. Use when asked to restyle or treat photos, make posters or menu graphics from photography, upscale or clean up low-quality images, build a product shot set, create Instagram carousels or social sets, or turn a photo archive into brand assets. Requires a locked brand system — run brand-identity first if none exists. For text-to-image brand objects use brand-artifacts instead.
---

# Brand imagery

Image-to-image work on **real photographs** through the Higgsfield MCP.

Read `references/higgsfield-routing.md` before the first call (measured costs, capability boundaries,
reference-media syntax), `references/styles.md` for the restore and restyle prompts, and
`references/pipeline.md` for asset graphs, scenes and carousels.

## Why this skill exists separately

Restyling is not fabrication. Feed a model **their real photograph** and it screens, grades or
restores it — the subject in the output is the subject in the input. That is a darkroom, and it is
defensible to a client in a way that inventing their product is not.

So the working rule is:

- ✅ **Restyle and restore their real photographs** — freely
- ✅ **Generate empty scenes** — locations, surfaces, packaging with no product in frame
- ❌ **Never invent a photograph of a product or premises that doesn't exist**

## Preconditions

Requires a locked brand system: palette as hex, material list, master prompt, prohibitions. If none
exists, run `brand-identity` first.

Note that **Recraft cannot be used here at all** — it accepts no reference images. Everything in this
skill routes to Nano Banana Pro, GPT Image 2 or Seedream.

## Workflow

### 0. Restore first — always

A compressed or screenshot-quality source poisons every downstream step. Run the zero-alteration
prompt (`references/styles.md` → Restore) on every source before touching it.

Swap the preservation list for the domain — food needs crumb and bark structure, grease sheen, char
marks; portraits need bone structure and hair placement. **Then verify by eye against the original.**
The prompt requests zero alteration; that's an instruction, not a guarantee.

### 1. Pick the job

| Job | Approach | Reference |
|---|---|---|
| Clean up a bad source | Zero-alteration restore | styles → Restore |
| Photo → poster / menu graphic | Compose then treat | styles → Compose then treat |
| Print aesthetic | Halftone or risograph | styles |
| Hand-made voice for daily content | Tool physics | styles |
| Matched product set | Token graph + variant loop | pipeline |
| Lifestyle / UGC | Labelled-field scene | pipeline |
| Social set | Carousel system | pipeline |

### 2. Anchor to the reference

Every prompt opens with the cognitive anchor:

> The exact <object> from the reference image — same shape, same proportions, same construction.

**A reference beats any description.** Never describe what you can show. Pass references as a media
UUID or a prior `job_id` — never an `https://` URL — and check the role name per model (`image` for
Nano Banana and GPT Image 2, `image_references` for Seedream).

Chain the graph by passing each generation's `job_id` into the next.

### 3. Build the prompt on the five-step skeleton

```
CORE DIRECTIVE / TASK / STEP 1–5 / NEGATIVE PROMPT
```

**Step 3 is the defining move** — the single mechanic that makes the style, stated with a number.
Length is not the variable; specificity of that mechanic is.

Non-negotiables:
- **Quantify**: "1–3px misregistration", "40–60 dots across the width" — never "slightly offset"
- **Name defects with their cause**: "registration slightly off, typical of cheap letterpress"
- **Bound the aging**: "visible but restrained — used and authentic, not destroyed"
- **Negative prompt, 10–15 items**, mostly absent-flaw failures: perfect registration, anti-aliased
  edges, clean digital illustration, smooth gradients, HDR, 3D shading

### 4. Enforce consistency on any set

State matching numerically or the set won't grid:

> Camera angle exactly matching, no deviation · lighting exactly matching, same key/fill/rim ·
> geometry identical · frame composition identical.

For action shots the subject is **completely static** — the environment moves, not the object.

### 5. Draft cheap, finalise expensive

~4× cost gap between tiers. Explore at `gpt_image_2` 2K/medium (3 credits) or `nano_banana_pro` 1K;
finalise at 4K. **Draft an entire variant set before finalising any of it** — a misalignment
discovered at 4K is wasted credits.

Preflight batches with `get_cost: true`, check `balance()`, state projected spend before running.

### 6. Verify

- Compare every restore against its original — content unchanged?
- Palette held? Accent appearing only where the rules allow?
- Does it read as printed rather than rendered?
- Series: do the variants actually assemble into a grid?
- Any baked-in captions or platform UI in the source cropped out?
