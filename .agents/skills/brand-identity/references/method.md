# The method — why AI brand assets read as fake, and what fixes it

Distilled from 14 analysed resources on AI art direction for brands. This is the reasoning layer;
the other files are procedure.

## Contents
- [The thesis](#the-thesis)
- [The principle](#the-principle)
- [Evidence of reality — the six techniques](#evidence-of-reality--the-six-techniques)
- [The four-pillar blueprint](#the-four-pillar-blueprint)
- [Prompt architectures](#prompt-architectures)
- [Specification axes](#specification-axes)
- [Anti-patterns](#anti-patterns)

## The thesis

> **The signal for "AI-made" is smoothness. Cleanness. Too-perfect edges, too-even lighting, no
> visible texture.**

Every technique below exists to fight that. The instruction that summarises the whole method:
**work with scissors instead of pixels.** And the bound that stops it becoming kitsch:
**photorealistic and tactile, not cartoonish.**

Corollary for distressing: **visible but restrained — used and authentic, not destroyed.** Without
that bound, aging instructions drift to ruin.

## The principle

> **Describe the aesthetic, not the object. Swap the object, keep the aesthetic.**

Most prompts describe the subject, so every new asset needs a new prompt and nothing matches. Invert
it: the prompt describes material, finish, shape logic, aging, surface, palette — all frozen — and
the subject is one variable, `[OBJECT]`, appearing 4–5 times throughout.

That inversion is what turns a pile of good prompts into a brand system. **A brand's core deliverable
is one locked aesthetic template, not a folder of prompts.**

Tuning without breaking the lock: append a three-part descriptor — `object: <subject>, <treatment>,
<colour>`.

## Evidence of reality — the six techniques

Every one manufactures proof that a physical thing existed and a physical process touched it.

1. **Invented-but-plausible metadata.** `REF AL6061-T6`, `LOT 7533U-141-777`, `EXP 19/04/2119`,
   GPS to four decimals, ™, "MADE IN GERMANY". **Specificity reads as authenticity; vagueness reads
   as AI.** Author it by hand when the text is load-bearing; delegate it ("short fictional label text
   related to `[OBJECT]`") when it isn't.
2. **Named physical defects, with their cause.** Not "looks old" but *"the print registration is
   slightly off, typical of cheap vintage printing."* Misregistration, dot gain, ink dropout, dry
   drag, capillary bleed, crushed blacks.
3. **Quantified everything.** Not "coarse dots" but *"roughly 40–60 dots across the full image
   width."* Not "slightly offset" but *"1–3px."* Numbers, never adjectives.
4. **Real optical values.** 100mm macro, f/2.8, 50mm equivalent, 7000K. Physically-described
   reflections: *"inverted, slightly diffused, tinted by the marble's dark surface colour."*
5. **Requested imperfection in people and scenes.** *"unretouched complexion" · "pillow marks on
   cheek" · "wallet fade mark on pocket" · "phone camera distortion" · "caught off guard."*
6. **Negatives that name the absence of flaws.** "Perfect colour registration", "anti-aliased edges",
   "clean digital illustration" listed as *failures*. A negative prompt of 10–15 items is standard.

## The four-pillar blueprint

Every generation carries this header, whichever architecture follows:

```
STYLE:       the locked aesthetic — palette, material, finish, texture, print physics
GOAL:        what this specific asset is for
STRUCTURE:   the sequence or composition
CONSTRAINTS: dimensions, prohibitions, format
```

> "AI output quality depends on a strict engineering brief. Every ambiguous variable is defined
> before generation."

## Prompt architectures

Pick by job. All four sit under the same blueprint header.

**A · Artifact description** (text→image) — for brand objects: tags, spec plates, packaging, signage.
Nine components in order: artifact declaration → substrate/surface → focal element described
*geometrically* → typography with a named reference face → invented metadata → framing furniture
(crop marks, rules, boxes) → colour-grading statement → composition statement → cultural anchor.

Critical: **name the object, never "a logo".** "A bead-blasted aluminium spec plate" forces the model
to render a thing that exists in the world rather than a floating graphic.

**B · Named format** (text→image) — when the artifact is a recognised format (matchbox label, luggage
tag, seed packet, safety placard, fruit-crate sticker). Naming it supplies proportions, conventions,
stock and process for free. **Stay short:** format → image content → text quoted verbatim with
position → colour → one named defect. Four sentences. No steps, no negative prompt.

**C · Labelled-field scene** (text+ref→image) — for lifestyle/UGC. An opening framing sentence, then
5–10 colon-labelled attributes (`Action:` `Ground:` `Wear and tear:` `Background:`), always closing
`Lighting:` then `Mood:`. The product is *one field among many* — the scene sells it. Close on a
**cultural** mood, not a visual one: name a person and a moment.

**D · Directive + five steps + negative** (image→image) — the general-purpose restyle form:
```
CORE DIRECTIVE: <target>
TASK: analyze the input image and recreate it as <target>
STEP 1: the core conversion — the one destructive transform
STEP 2: the ground — field and palette rule
STEP 3: THE DEFINING MOVE — the single mechanic that makes the style
STEP 4: the added layer — print character, texture, applied elements
STEP 5: final aesthetic — 3 bullets, the whole look as a gestalt
NEGATIVE PROMPT: 10–15 items, mostly absent-flaw failures
```
The same skeleton runs in reverse for **preservation** (restoration): step 1 becomes an itemised
list of what must stay pixel-identical, and the negatives become *changes* rather than *cleanliness*.

**Length follows how much the model already knows.** A named format needs four sentences; a novel
artifact needs nine components. Length is never the variable — **specificity of the signature
mechanic is.** Find the one rule that makes the look and state it with a number.

## Specification axes

Layer these onto any architecture.

- **Tool physics.** Specify the *instrument and its failure modes*, not the look. *"Simulate a 20mm
  chisel-tip marker"* + *"the dry-drag texture where it moved too fast and didn't cover the paper
  100%"*. Generalises to ballpoint, wax crayon, rubber stamp, spray can, letterpress.
- **Compose then treat.** Two passes. Stage 1 builds the composition (cut out, place on a ground,
  add elements). Stage 2 applies the print treatment. **The rougher stage 1, the better stage 2** —
  the treatment unifies crude edges into print artefacts. Polishing stage 1 actively hurts.
- **Cognitive anchor.** Open with *"the exact <object> from the reference image — same shape, same
  proportions, same construction."* **A reference beats any description**; never describe what you
  can show. Requires a model that accepts reference media.
- **Enforced consistency.** For variant sets, state matching numerically: *camera angle exactly
  matching, no deviation · lighting exactly matching · geometry identical · frame composition
  identical* — so variants assemble into a grid without misalignment.

## Anti-patterns

- Describing the subject instead of the aesthetic → nothing matches
- Adjectives where numbers belong ("slightly offset", "coarse")
- "A logo" / "a nice design" instead of a named physical artifact
- Skipping the negative prompt on a restyle
- Polishing the compose stage before a treatment pass
- Distressing without a bound → ruin
- Exploring at max resolution → burns credits for no gain
- Two accent colours → the accent stops meaning anything
