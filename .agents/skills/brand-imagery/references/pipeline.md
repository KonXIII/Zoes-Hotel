# Asset pipeline and carousel systems

## Contents
- [The token graph](#the-token-graph)
- [The five principles](#the-five-principles)
- [Product pipeline](#product-pipeline)
- [Scene generation](#scene-generation)
- [Carousel / slide system](#carousel--slide-system)

---

## The token graph

A brand asset suite is a **dependency graph**, not a folder. Name every output as a token; later
steps consume earlier tokens.

```
[MASTER]                    subject isolated, brand artwork applied, alpha
   ├── [STUDIO_HERO]        45°/15° elevation, 80% frame height
   ├── [STUDIO_FRONT]       0° dead-on, 85% frame height, flat even light
   ├── [STUDIO_SIDE]        90° profile — shows the wrap seam
   ├── [DETAIL_MACRO]       matches STUDIO_HERO framing, 100mm macro equiv, f/2.8
   ├── [VARIANT_01..N]      camera + light EXACTLY matching STUDIO_HERO
   ├── [ACTION_*]           environment moves, subject does not
   ├── [CONTEXT_*]          50mm equivalent, subject is sole hero
   └── [AD_SQUARE 1:1] / [AD_STORY 9:16]
```

Chain by passing a prior generation's **`job_id`** as the reference `medias[].value`. That's what
keeps the subject identical across the set.

## The five principles

1. **Cognitive anchor.** Every prompt opens: *"The exact <object> from the reference image — same
   shape, same proportions, same construction."*
2. **Reference beats description.** *"The container from the reference image"* beats *"a 330ml
   aluminium can"*. Never describe what you can show.
3. **Artwork as a second input.** Pass brand artwork as its own visual input, instructed to apply
   *physically* — wrapped, panelled or sleeved, with correct perspective distortion.
4. **User variables only.** Just `[[VARIANT_NAME]]`, `[[COLOR]]`, `[[HEADLINE]]` need filling.
   Everything else is frozen.
5. **No hallucinated objects.** Every prompt carries an explicit prohibition list: no invented
   containers, no geometry changes, no random props.

## Product pipeline

**Input:** a plain photo of the object + the flat brand artwork.

Consistency for variant sets is stated **numerically**, or the set won't grid:

> Camera angle exactly matching `[STUDIO_HERO]`, no deviation · lighting exactly matching, same
> key/fill/rim · geometry identical across all variants · frame composition identical, so all
> variants can be compared side-by-side or assembled into a grid without misalignment.

For action shots, pin the subject:

> The <object> is completely STATIC. It does not move, tilt, rotate, or deform.

The environment does the moving. Also standing: the primary label face stays visible and all label
text stays legible.

**Substitute the studio ground for the brand's own.** Seamless white is an e-commerce default, not a
law — a dark-first brand shoots on its own dark surface, and everything else in the pipeline survives
the swap unchanged.

**This pipeline's subject is packaging, not the product itself.** That matters: a box, a wrapper or a
label can be generated freely without inventing the client's actual goods.

## Scene generation

Labelled-field architecture for lifestyle and UGC.

```
<Shot type and framing sentence>.
Location: …      Action: …        Wear and tear: …
Background: …    Ground: …        Shadows: …
Product focal point: …
Lighting: …
Mood: …
```

Always closes `Lighting:` then `Mood:`. **The mood line is cultural, not visual** — name a person and
a moment ("everyday, unhurried, caught off guard"), not an aesthetic.

The product occupies **one field among many**. The scene sells it; that's why the same prompt works
for a different product with one line changed.

**Empty-scene generation is always safe** — the location, the surface, the packaging with no product
in frame. It solves the common "no exterior photo exists" gap without inventing anything.

## Carousel / slide system

For social sets. Seven rules:

1. **Anchor to the existing identity as a strict constraint.** Three layers only: background,
   slightly elevated surface, one accent as the sole colour signal. Everything else neutral.
2. **Type does the hierarchy, not icons or colour.** Three weights, three roles, no overlap:
   ALL CAPS titles · Semibold mixed-case sub-heads · Regular body.
3. **Narrative order:** `hook → capability → architecture → proof`. **Context must be built before
   metrics are earned** — a number only lands after the image has done its work.
4. **Spatial logic:** upper ~30% empty, headline only. Nothing bleeds to the edge. 8px base grid.
5. **Component consistency:** **no shadows, no borders — depth comes solely from the colour delta
   between surface and card.**
6. **Constraint engineering:** every slide carries the four-pillar header (STYLE / GOAL / STRUCTURE /
   CONSTRAINTS).
7. **Calibrate to the delivery format.** 1080×1080 forces tighter type and a maximum of three cards
   per slide.

Rule 5 is worth carrying into the website too — then social and site read as one system rather than
two.
