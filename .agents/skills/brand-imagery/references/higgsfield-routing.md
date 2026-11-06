# Higgsfield MCP — model routing and cost control

Measured against a live `pro` account on 2026-08-01 via `get_cost: true` preflights.
Re-verify with a preflight before any large run — pricing changes.

## Contents
- [Cost table](#cost-table)
- [The draft/final rule](#the-draftfinal-rule)
- [Capability boundaries that decide routing](#capability-boundaries-that-decide-routing)
- [Routing by job](#routing-by-job)
- [Call syntax](#call-syntax)
- [Reference media](#reference-media)
- [Failure modes](#failure-modes)

## Cost table

| Model | Config | Credits |
|---|---|---|
| `nano_banana_2` | 4K | 3 |
| `nano_banana_pro` | 4K | **4** |
| `nano_banana_pro` | 1K/2K | cheaper — preflight |
| `gpt_image_2` | 2K / medium | 3 |
| `gpt_image_2` | 4K / high | **12** |
| `recraft_v4_1` | 1K vector | 2.5 |
| `recraft_v4_1` | 2K vector | 10 |

**The single most important line: `nano_banana_pro` at 4K costs 4 credits. `gpt_image_2` at
4K/high costs 12 — three times more for the same resolution.** Both are tagged for text rendering.
Default to Nano Banana Pro; escalate to GPT Image 2 only when NBP has actually failed on
typography in the specific composition being made, not pre-emptively.

## The draft/final rule

Every model has a ~4× gap between its cheap and expensive tier. **Iterate at the low tier, finalise
at the high one.** Never explore at 4K.

| Phase | Setting |
|---|---|
| Exploring composition, testing a prompt | `recraft` 1K · `gpt_image_2` 2K/medium · `nano_banana_pro` 1K |
| Chosen and approved | bump resolution, same prompt, same seed-equivalent inputs |

Preflight anything running more than ~5 generations:
```
generate_image({model, prompt, ...params, get_cost: true})   # returns cost, submits nothing
```
Check `balance()` before a batch. State the projected spend before running one.

## Capability boundaries that decide routing

**`recraft_v4_1`**
- **No reference images.** `medias` is empty — text-to-image only. The cognitive-anchor technique
  ("the exact object from the reference image") is **impossible** here. Never route a
  match-this-existing-thing job to Recraft.
- **Max 2K.** No 4K.
- `model_type`: `standard` · `vector` · `utility` · `utility_vector`
- ⭐ **`colors`: array of up to 10 `#RRGGBB`** — palette locked at the API level, not by prompt
  persuasion. Plus `background_color`. For a locked brand palette this beats every other model.
- Vector output suits logos, marks, icons, patterns, flat illustration.

**`nano_banana_pro` / `nano_banana_2`** — 1K/2K/4K, accept reference media (role `image`), support
unlim. Pro is tagged text-rendering + diagrams; use it for anything with type, codes, or labels.

**`gpt_image_2`** — 1K/2K/4K plus `quality` low/medium/high, accepts reference media (role `image`),
tagged text-rendering/typography/editing. The escalation path for stubborn typography.

**`seedream_v4_5`** — `quality` basic (~4K) / high (~6K), reference role is `image_references` (note
the different role name). Use when output must exceed 4K.

## Routing by job

| Job | Model | Why |
|---|---|---|
| Vector logo, mark, icon, pattern | `recraft_v4_1` `vector` or `utility_vector` + `colors` | Only vector path; palette locked at API |
| Flat brand graphic, swatch, mockup ground | `recraft_v4_1` `utility` + `background_color` | Predictable, flat, front-facing |
| Label / tag / packaging with real text | `nano_banana_pro` 4K | Text rendering at 4 credits |
| Typography the above got wrong | `gpt_image_2` 4K/high | Escalation only — 12 credits |
| Restyle a real photograph | `nano_banana_pro` or `gpt_image_2` + reference | Needs reference input; Recraft cannot |
| Match an existing object exactly | `nano_banana_pro` + reference | Cognitive anchor requires reference |
| Photo restore / upscale | `nano_banana_pro` 4K + reference | Zero-alteration prompt |
| Beyond 4K | `seedream_v4_5` `high` | ~6K ceiling |

## Call syntax

```
generate_image({
  model: "recraft_v4_1",
  prompt: "...",
  resolution: "1k",
  model_type: "vector",
  colors: ["#111C1D", "#E7E8E4", "#E4692B"],
  background_color: "#E7E8E4",
  aspect_ratio: "1:1",
  count: 1
})
```

Model params sit at the **top level of `params`**, not nested. Call `models_explore({action:"get",
model_id})` for a model's exact parameter list and aspect ratios before a first use.

## Reference media

`medias[].value` takes a **media UUID or a prior job_id — never an `https://` URL.**

- Local file → `media_upload_widget` (Apps UI) or `media_upload`
- Web URL → `media_import_url` first, then pass the returned `media_id`
- Chaining a previous generation → pass its `job_id` directly

Roles differ per model: `image` for Nano Banana and GPT Image 2, `image_references` for Seedream.
Check `models_explore` rather than guessing.

## Failure modes

- **`use_unlim`** defaults false. Only pass true when the user explicitly asks to spend their
  free-trial allowance. Never infer it to save them credits. A request that can't be served free is
  rejected, never silently charged — and `count` is capped to 1.
- **`recovery_tool` in a response** → call it immediately, don't explain first.
- Out of credits → `show_plans_and_credits({intent:"auto_refill"})` and relay its response verbatim.
- Recraft asked for a reference image → wrong model. Re-route.
- Recraft asked for 4K → not available. Cap at 2K or re-route.
