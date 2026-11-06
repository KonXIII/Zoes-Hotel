# Artifact recipes

Worked patterns for text-to-image brand objects. Substitute the brand's own palette, substrates and
prohibitions from its locked master prompt — never use the example values.

## Contents
- [Vector mark / icon / pattern](#vector-mark--icon--pattern)
- [Label, tag, packaging](#label-tag-packaging)
- [Named-format artifact](#named-format-artifact)
- [Micrographic / spec plate](#micrographic--spec-plate)
- [Sticker](#sticker)
- [Variant series](#variant-series)

---

## Vector mark / icon / pattern

`recraft_v4_1`, `model_type: "vector"` (or `utility_vector` for flatter, more predictable output).

The only route to genuine vector output, and the only model that locks the palette at the API level.

```
generate_image({
  model: "recraft_v4_1",
  model_type: "vector",
  resolution: "1k",                       // 2.5 credits; go 2k (10) only when approved
  colors: ["#111C1D", "#F9F8F4"],         // up to 10; the palette cannot drift
  background_color: "#F9F8F4",
  aspect_ratio: "1:1",
  prompt: "..."
})
```

Prompt shape — describe construction geometrically, never "a nice logo":

> A solid three-tongue flame mark, stencil weight, no outline, no gradient. Flat single colour.
> Symmetrical. Hard edges. Reads clearly at 16px.

**Recraft takes no reference image.** If the job is "match this existing mark", Recraft is the wrong
tool — route to Nano Banana Pro with a reference instead.

Downstream: raster output still needs tracing to real SVG (potrace at 4× upscale, then SVGO), and
`fill="currentColor"` so it recolours from CSS.

---

## Label, tag, packaging

`nano_banana_pro` at 4K — 4 credits, tagged for text rendering.

Nine-component artifact architecture. **Name the physical object, never "a design".**

```
STYLE:       <locked master prompt>
GOAL:        A <artifact> for <brand>
STRUCTURE:   <composition>
CONSTRAINTS: <aspect>, <prohibitions>

A <artifact type> on <substrate, stated before any design>.
Centre: <focal element described geometrically>.
Text "<EXACT STRING>" in <named reference typeface genre>, <position>.
<invented-but-plausible metadata: REF / LOT / dates / coordinates / origin>.
<framing furniture: crop marks, thin rules, boxes around data>.
<colour-grading statement>. <composition statement>.
<one named defect with its cause>.
```

Text is always **quoted verbatim with its position stated**. Never "some text at the top".

---

## Named-format artifact

When the artifact is a recognised format — matchbox label, luggage tag, seed packet, fruit-crate
sticker, safety placard, tin sign, cigarette card, bill of lading.

Naming the format supplies proportions, conventions, stock and print process for free. **Stay short —
four sentences, no steps, no negative prompt:**

```
<Format name> on <substrate>.
Centre image: <what's depicted>.
Text "<X>" at top, "<Y>" in a banner at bottom. Side vertical text "<Z>".
<colour statement>. <One named defect>, typical of <its cause>.
```

Model: `nano_banana_pro` 4K. If it fumbles the typography specifically, escalate to `gpt_image_2`
4K/high — but that's 12 credits against 4, so only after NBP has actually failed.

---

## Micrographic / spec plate

The nine-component architecture at its densest — mostly type, codes and metadata on an industrial
substrate. This is where **invented-but-plausible metadata** carries the whole image.

Generate the metadata from something *true* about the business — a real process time, a real address,
a real founding year — formatted as machine data. Fabricated specificity that contradicts reality
will be spotted; fabricated *formatting* of real facts will not.

```
REF <CUT>-01 · LOT <YYWWD> · <PROCESS> <N>H · <GPS to 4dp> · <CITY>
```

Model: `nano_banana_pro` 4K. Small dense type is exactly its strength.

---

## Sticker

Template architecture — aesthetic frozen, `[OBJECT]` the only variable. Vintage-paper register suits
print-led brands; glossy resin suits modern/toy/tech.

```
A single <substrate> sticker on a <ground>, top-down flat lay, macro product photography.
The sticker represents [OBJECT]. Its silhouette is based on the natural shape of [OBJECT],
simplified into a bold <form> with an imperfect hand-cut outline.
The interior uses <palette rule>. The illustration of [OBJECT] is simple and graphic
with thick printed outlines, subtle misregistration, small imperfections in the ink.
Add minimal printed typography around or below the object, using short label text
related to [OBJECT].
Signs of age: rough edges, tiny scratches, faded ink, light dust —
visible but restrained, used and authentic, not destroyed.

object:
```

Replace **every** `[OBJECT]` with the same word. Tune with the three-part descriptor after the colon:
`object: <subject>, <treatment>, <colour>`.

---

## Variant series

The highest-value pattern: one template, N runs, one variable changed.

State matching numerically or the set won't align:

> Camera angle exactly matching, no deviation · lighting exactly matching, same key/fill/rim ·
> geometry identical across all variants · frame composition identical, so all variants can be
> assembled into a grid without misalignment.

Draft the whole series at the cheap tier first, confirm alignment across the set, then re-run the
approved variants at the high tier. A misaligned series discovered at 4K is wasted credits.
