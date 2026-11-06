# THE SKILL BIBLE — OG WEB DESIGN EDITION

### Complete guide to every skill, MCP, and library in the kit.

> **How to use this guide**: Skills are organized by **when** you use them in a project lifecycle. Each skill has its trigger, purpose, workflow, and rules. Think of this as a production pipeline — you move through phases, using the right skill at the right moment. Libraries (GSAP, Motion, Lenis, Base UI, shadcn, Tailwind 4) are treated as first-class citizens alongside skills.

Last reviewed: **2026-04-16**

---

## TABLE OF CONTENTS

1. [Phase 0: Project Setup — Kit + Context](#phase-0-project-setup)
2. [Phase 1: Design Intelligence — Plan Before You Build](#phase-1-design-intelligence)
3. [Phase 2: Build — Create the Interface](#phase-2-build)
4. [Phase 3: Style & Refine — Make It Beautiful](#phase-3-style--refine)
5. [Phase 4A: Motion Engineering — The GSAP Stack](#phase-4a-motion-engineering)
6. [Phase 4B: Interaction & Delight — Component-Level Motion](#phase-4b-interaction--delight)
7. [Phase 5: Intensity Control — Dial Up or Down](#phase-5-intensity-control)
8. [Phase 6: Quality & Production — Ship-Ready](#phase-6-quality--production)
9. [Phase 7: Extract & Systematize — Scale It](#phase-7-extract--systematize)
10. [MCP Servers — The Weapons](#mcp-servers)
11. [Skill Dependency Map](#skill-dependency-map)
12. [Quick Reference Card](#quick-reference-card)
13. [Anti-Patterns — What NOT to Do](#anti-patterns)

---

## PHASE 0: PROJECT SETUP
*Run at the very start. Sets context for everything below.*

---

### Kit bootstrap
Claude runs these automatically when the user says "set up this project" — see `CLAUDE.md` → BOOTSTRAP MODE. The steps:

1. If `package.json` missing → scaffold Next.js: `npx create-next-app@latest . --ts --tailwind --app --eslint --use-npm --no-import-alias --yes`. If it exists → skip.
2. Merge deps (non-destructive):
   ```bash
   node scripts/merge-deps.mjs package.template.json ./package.json
   ```
3. Copy starter files from `starter/` into the project root (skip any that already exist).
4. `npm install`.
5. Version doctor:
   ```bash
   node scripts/doctor.mjs .
   ```
   Bump anything red before coding. The LLM will otherwise write against stale APIs.

Manual fallback: `bash scripts/apply.sh .` runs the whole sequence.

**Note on skill scope.** This kit ships project-local skills in `.agents/skills/` (the GSAP pack, `og-frontend-design`, `interface-design`, `interaction-design`, `emil-design-eng`, `web-design-guidelines`, `schema-markup`, plus the umbrella `impeccable` skill from pbakaus). The other skills referenced below (`/polish`, `/audit`, `/harden`, `/adapt`, `/optimize`, `/colorize`, `/arrange`, `/typeset`, `/normalize`, `/distill`, `/clarify`, `/critique`, `/delight`, `/overdrive`, `/bolder`, `/quieter`, `/animate`, `/extract`, `/onboard`, `/teach-impeccable`, `/market-landing`) are user-level Claude Code skills on this machine. If you use the kit on a different machine or share it, those skills must be installed separately or this bible should be trimmed to only the local set.

### `/impeccable` (umbrella) vs granular skills — when to use which

`pbakaus/impeccable` is an umbrella skill that internally covers most of phases 3, 5, 6, and 7 (polish, audit, clarify, distill, harden, optimize, adapt, animate, colorize, extract, bolder, quieter, delight, overdrive). It overlaps with the granular skills listed below — so the routing rule is:

| Request shape | Invoke |
|---|---|
| **Specific trigger** ("the color feels gray", "fix the spacing", "add scroll animation") | Granular skill — `/colorize`, `/arrange`, `gsap-scrolltrigger`, etc. The phase map below tells you which. |
| **Vague trigger** ("make this better", "improve this page", "polish the whole thing") | `/impeccable` — let the umbrella route internally. |
| **Pre-launch ship pipeline** | Granular sequence: `/audit` → `/adapt` → `/optimize` → `/harden` → `/polish`. The pipeline order matters; the umbrella doesn't preserve it. |

Default to **granular** when you know the dimension to fix. Default to **`/impeccable`** when the user can't articulate it yet.

### impeccable v4.8 in the kit (security-vetted 2026-11-05)

- **Context files.** v4.8 reads `PRODUCT.md` + `DESIGN.md`, not `.impeccable.md`. The kit's files stay the authority. Before the first `/impeccable` run in a project, write `PRODUCT.md` from `brief.md` (users, purpose, positioning, §7 Inventory facts) and `DESIGN.md` from `.impeccable.md` + `art-direction.md` (palette, type, motion, principles). Mark both as derived: "Derived from brief.md / .impeccable.md / art-direction.md; edit those, then regenerate". Never let impeccable's own `init` interview re-ask what discovery and the DNA interview already answered.
- **Engine.** Its scripts run a Rust binary. The first use downloads it from GitHub Releases into `~/.impeccable/bin/<version>/` and refuses it unless its SHA-256 matches `scripts/engine-checksums.txt`. Engine 0.1.18 for darwin-arm64 was verified by hand.
- **Telemetry off.** `starter/.impeccable/config.json` sets `"telemetry": false` for every project. New designs still fetch style directions from impeccable.style; no project files are sent.
- **Live mode is explicit-ask only**, and always start it with `IMPECCABLE_LIVE_COPY_AGENT=chat` in the environment. With the default (`auto`), it can launch a background `claude --permission-mode bypassPermissions` (or Codex with its sandbox off) to apply copy edits.
- **Design hook: not installed.** `npx impeccable install` would add PostToolUse + Stop hooks that scan every UI edit. That is a separate decision, part of the agent-team / enforcement design. Without the hook, run its detector once at the end of UI work.
- **Kit overrides.** Its craft-floor discourages "one identical entrance on every section". The kit's blur-in titles and scroll reveals win, and are reported as a kit override (same as taste-skill's `scroll-reveal`). Its eyebrow, 01/02/03, gradient-text and decorative-glass bans match the house rules.
- **Not vendored:** its 4 subagents (`.claude/agents/impeccable-*.md`). The skill falls back to `reference/degraded/*` without them.

### `/teach-impeccable`
**Category**: One-time setup  
**Purpose**: Interviews you about your project (brand, audience, tone, aesthetic) and saves persistent design guidelines to `.impeccable.md`.  
**When to use**: **First thing, before any other design skill.** Every other design skill checks for this context and will redirect you here if it doesn't exist.

**What it does**:
1. Explores your codebase — reads README, package.json, existing components, brand assets, CSS variables, style guides.
2. Asks UX-focused questions — who uses this, what emotions, brand personality, references, anti-references, visual direction, light/dark, colors, a11y.
3. Writes `.impeccable.md` with: Users, Brand Personality, Aesthetic Direction, Design Principles.

**Output**: `.impeccable.md` — the design DNA for your entire project.

**Rule**: Run this ONCE. Every other design skill reads from it automatically. Update it if brand direction changes.

---

## PHASE 1: DESIGN INTELLIGENCE
*Plan your design system before writing code.*

---

### `/critique`
**Category**: Design evaluation  
**Purpose**: Evaluate design from UX perspective with quantitative scoring, persona testing, and actionable feedback.

**Workflow**:
1. Mandatory prep: loads `/frontend-design` context; runs `/teach-impeccable` if no design DNA exists.
2. Scores across: Visual hierarchy, Information architecture, Emotional resonance, Cognitive load, Consistency, Accessibility.
3. Persona-based testing from multiple user perspectives.
4. Actionable, prioritized improvements.

**Rule**: Critique identifies *what* to fix. Other skills (arrange, typeset, colorize, etc.) do the fixing.

---

## PHASE 2: BUILD
*Create the actual interface.*

---

### `design-taste-frontend` (taste-skill v2.5, the default page builder)
**Category**: Primary build skill for every website page, redesign and page review
**Source**: [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) v2.5.0 (security-reviewed 2026-11-05). App screens use **`taste-app-screens`** (v2.1.5 kept for its app-screen route), never this skill.

**Always call it by name.** Several skills can build a page (`og-frontend-design`, `impeccable`, `interface-design`). Naming `design-taste-frontend` keeps the others from being picked instead.

**What drives it: the kind of business.** v2.5 sorts every brief into software, gaming, tech hardware, product, service or **place** (café, bakery, shop, clinic, studio, gym…). The kind decides everything. Places, products and services get real photographs, flat colour, type, real icons and a hover layer. Shader effects, scroll moments and big scenes are only for software, gaming and tech hardware. Its run: read the brief → write all the copy first → plan the page as screens (one section per screen) → deal hero, palette and type at random (no two pages alike) → build from its starter → check in a real browser (100+ checks) → report.

**Give it facts, not a look.** Its first step asks for the real material: logo, screens, photographs, prices, address, hours, the one main action. That is `brief.md` §3 + §7 Inventory, so don't re-ask the user for what those hold.

#### Kit adaptations (these win over the skill)
1. **Brand.** Use `start.mjs brand --page <kind> --bg --ink --accent [--surface --muted] --type <id>` with the colours from `.impeccable.md` / `brand/palette.json`. This replaces v2's `--keep palette,type`. Its "never violet" yields to an existing client brand (`brand-identity` treats the brand as fixed).
2. **Fonts.** `start.mjs` prints Google Fonts `<link>`s. In Next.js, load the same family with `next/font/google` (self-hosted, so visitors' browsers never contact Google; GDPR) or `next/font/local` for `brand/fonts/`, and point `--font-display` / `--font-text` at it.
3. **Next.js port.** v2.5 is HTML-first (`assets/starter.html`, `system.css`, `system.js`, `assets/motion`). Import `system.css` in the root layout next to `globals.css`, load `system.js` and the motion layer from a client component (or `next/script`), and port each section from `starter.html` / `references/sections-library.md` into components. Copy **only the files the page uses** into `public/assets/`, never the whole 39 MB `assets/`. Run `icons.mjs scan` on the built page so every icon is a local file.
4. **Scroll reveals stay (kit decision B, 2026-11-05).** The kit keeps its blur-in titles (`components/Motion.tsx`, `data-title`) and GSAP reveals on every kind of page. `consistency.mjs` FAILs these as `scroll-reveal`, and no flag skips just that check. Treat **those FAILs only** as the deliberate kit override and list them in the report under *Kit override: scroll reveal*. Fix every other FAIL, including `reduced-motion` and `hidden-content`: under reduced motion everything must rest, visible.
5. **Real contact details.** Its rule 9 (no house number, postcode or dialable phone) exists so agents don't invent real-looking data. With the client's **real** details from `brief.md` (address, phone, `tel:` links, LocalBusiness schema), run `consistency.mjs` with `--no-address`. Never invent a real-looking address or number.
6. **Never run `scripts/effects.mjs publish` inside a project.** It clears `index.html`, `components/` and more in its output folder. It's a tool for the skill's maintainers.
7. **Check against the production build** (`next build && next start`), not the dev server.

#### Commands (from the project root)
```bash
SK=.agents/skills/design-taste-frontend
P="${TASTE_SKILL_TMP:-${TMPDIR:-/tmp}}/taste-skill-chrome"      # Chrome profile, kept outside the project

# deal (each keeps a history so pages differ)
node $SK/assets/layout/deal.mjs --type <page type> --has <photo,ui,object,film> --history .taste-skill/layout-history.json
node $SK/scripts/start.mjs deal --page <kind> --history .taste-skill/history.json
node $SK/scripts/start.mjs brand --page <kind> --bg "#.." --ink "#.." --accent "#.." --type <id> --radius soft

# check (after next build && next start)
U=http://localhost:3000/<route>
node $SK/scripts/consistency.mjs $U --widths 1440,1024,820,768,390 --rhythm-widths 1440,820,768,390 --profile "$P" \
  --page <kind> --category "<what is sold>" --primary "<main action>" [--no-address]
node $SK/assets/layout/check.mjs --url $U --profile "$P" --sizes 1440x900,1024x768,820x1180,768x1024,390x844 --shots .taste-skill/shots/layout
node $SK/scripts/shoot.mjs --url $U --w 1440 --out .taste-skill/shots/1440.png --profile "$P"   # also 1024, 820, 768, 390
node $SK/scripts/perf.mjs $U --profile "$P"
```

#### Brief: a new page
```
Use the design-taste-frontend skill to build [the page] for [client].

Facts: brief.md (§3 the one action and its destination, §7 the inventory), art-direction.md,
.impeccable.md + brand/ (brand colours via start.mjs brand, fonts via next/font). Stack: Next.js,
this project. Photographs: [brief §7 folder, or "none"]; Higgsfield (higgsfield-master-creator)
for anything we don't have.

Run the whole skill: the kind, the copy first, the page plan as screens, the deal, the build,
then consistency.mjs, check.mjs, shoot.mjs and perf.mjs on the production build until no FAIL is
left except the kit's scroll-reveal override, and read every screenshot against the checklist.
Apply the kit adaptations in SKILL-BIBLE.md. Then give me the report.
```

#### Brief: a redesign
```
Use the design-taste-frontend skill to redesign [page/route] in this project.

Scope: [restyle: keep the layout, change type, colour and components] or [redesign: deal anew
and rebuild the sections]. Must stay: the stack, the routes, the forms and what they send, the
brand (.impeccable.md, brand/), legal copy, [anything else]. What is wrong today: [the user's words].

Record the before first: consistency.mjs and shoot.mjs on the production build, with --out /
shots into .taste-skill/before. Rebuild, record the after into .taste-skill/after, click through
every link, form and menu that worked before, and report before and after side by side.
```

#### Brief: review only (no code changes)
```
Use the design-taste-frontend skill to review [page] at [URL]. Do not change any code.
Run consistency.mjs, check.mjs and shoot.mjs into .taste-skill/review, judge the screenshots
against the skill's checklist (SKILL.md §5), list the findings with their check ids, and name
the three changes that would move the page most.
```

#### App screens and dashboards → `taste-app-screens`
```
Use the taste-app-screens skill to build an app screen: the [overview / list / detail / settings]
screen of [product]. Who opens it, the data (fields, units, realistic sizes, or a data file), the
screen's one question, the job people do most from it, theme, brand (.impeccable.md + brand/).
Follow references/app-screens.md: draw.mjs --app --keep palette,type, build the shell, the data
and the empty, loading and error states, check with lint.mjs --app and inspect.mjs --app at 1440,
768 and 390, and give me the report.
```

**Expect** a long run: the author's figure for v2 was 30–45 minutes and a few hundred thousand tokens per full page, mostly on pictures, and v2.5 checks more. Files land in `.taste-skill/` (deal history, screenshots, reports) and the page's assets folder (photos, icons, `icons-credits.json`, credits).

**Common problems**: no browser → install Chrome/Edge/Chromium or set `CHROME_PATH` (Node 22+). Temporary Chrome profiles go to the system temp folder (`TASTE_SKILL_TMP` moves them). A page that still looks like the category means the inventory is too thin.

---

### `/frontend-design` (global) and `/og-frontend-design` (kit)
*The global `frontend-design` is the impeccable fork that the global `/audit`, `/polish` etc. load as context, so it stays. The kit's own copy is Anthropic's current version, renamed `og-frontend-design` so the global one can't shadow it.*  
**Category**: Fallback build skill (`og-frontend-design`). Use only when `design-taste-frontend` can't run (no Node 22, no browser) or for a non-page artifact  
**Purpose**: Create distinctive, production-grade frontend interfaces. Avoids generic "AI-looking" aesthetics.

**Workflow**:
1. **Context Gathering Protocol** (mandatory every time): check Design Context, read `.impeccable.md`, else redirect to `/teach-impeccable`.
2. Choose a BOLD direction — brutally minimal, maximalist, retro-futuristic, luxury, editorial, industrial, etc. Intentionality over intensity.
3. Implement production-grade code with meticulous detail.

**The AI Slop Test** — would someone recognize this as AI-made? If yes, redesign.

**NEVER use**: Inter/Roboto/Arial as lazy defaults · cyan-on-dark · purple-to-blue gradients · glassmorphism · sparklines as decoration · bounce/elastic easing · monospace as "techy" shorthand.

**Typography**: Distinctive fonts. Modular type scales. Fluid sizing with `clamp()`.
**Color**: `oklch()`, `color-mix()`. Tint neutrals toward brand hue. No pure black/white.
**Layout**: Visual rhythm through varied spacing. Fluid sizing. Embrace asymmetry. Don't wrap everything in cards.
**Motion**: Only `transform` and `opacity`. Exponential easing (ease-out-quart/quint/expo).

**Rule**: Invoked as prerequisite by almost every other design skill.

---

### `/shadcn` + **shadcn MCP**
**Category**: Component library management  
**Purpose**: Add, search, fix, debug, style, and compose shadcn/ui components.

**MCP tools** (via `.mcp.json`):
- `mcp__shadcn__get_project_registries` — list registries from `components.json`
- `mcp__shadcn__list_items_in_registries` — browse all components
- `mcp__shadcn__search_items_in_registries` — fuzzy search
- `mcp__shadcn__view_items_in_registries` — full source + docs
- `mcp__shadcn__get_item_examples_from_registries` — usage examples
- `mcp__shadcn__get_add_command_for_items` — install CLI
- `mcp__shadcn__get_audit_checklist` — quality check

**CLI**:
- `npx shadcn@latest add <component>`
- `npx shadcn@latest info`
- `npx shadcn@latest diff` — check for updates

**Rule**: Project must have `components.json`. Use MCP for registry ops, CLI for project config.

---

### `/interface-design`
**Category**: App/tool interface design (NOT marketing pages)  
**Purpose**: Dashboards, admin panels, apps, tools, interactive products.

**Rules**:
- Optimize for efficiency — users live here for hours.
- Information density > visual drama.
- Keyboard shortcuts are essential.
- Progressive disclosure for complex features.
- Real-time feedback on every action.

---

### `/onboard`
**Category**: First-run experience design  
**Purpose**: Onboarding flows, empty states, first-run UX.

**Core principles**: Show don't tell · Make it optional · Time to value · Context over ceremony · Respect user intelligence.

**Empty state formula**: What will appear · Why it matters · How to start · Visual interest · Contextual help.

**Rules**: Never force long onboarding before product use. Never repeat the same tooltip. Never block the UI during a tour. Always have an easy-to-find Skip.

---

## PHASE 3: STYLE & REFINE
*Make the built interface beautiful and intentional.*

---

### `/typeset`
**Purpose**: Fix font choices, hierarchy, sizing, weight, readability.

**Workflow**:
- Font selection: reflect brand. Pair with genuine contrast (serif + sans, geometric + humanist) or single family in multiple weights.
- Hierarchy: 5 sizes cover most needs (caption, secondary, body, subheading, heading). Use ratio (1.25 / 1.333 / 1.5).
- Readability: `max-width: 65ch`. Line-height 1.1–1.2 for headings, 1.5–1.7 for body. Body minimum 16px/1rem.
- Details: `tabular-nums` for data. Letter-spacing open for uppercase, tight for display. Semantic tokens (`--text-body`, not `--font-16`).

**Rules**: Max 2–3 font families · Body ≥ 16px · Use `rem`, not `px` · No decorative fonts for body · Never disable zoom · App UIs use fixed rem scale · Marketing uses fluid `clamp()` for headings.

---

### `/colorize`
**Purpose**: Strategic color to monochromatic/dull interfaces.

**Workflow**: 60/30/10 rule (60% neutral, 30% secondary, 10% accent). Primary for action · Secondary for support · Neutrals tinted toward brand hue (not pure gray) · Semantic colors for state · Surface for depth.

**Always** use `oklch()` and `color-mix()`. Tint neutrals (add 0.01 chroma in oklch). Never gray text on color — use darker shade of that color.

**Rules**: Every color means something. Test color-blind. Meet WCAG contrast.

---

### `/arrange`
**Purpose**: Layout & spacing rhythm.

**Workflow**: Establish a spacing scale (4px base: 4/8/12/16/24/32/48/64) — never arbitrary values. Use space to group related items (proximity). More space between sections, less within. Alternate dense/sparse areas. Consistent alignment points (optical may differ from mathematical). Embrace whitespace.

**Rules**: No arbitrary spacing · Don't center everything · Use CSS Grid/Flexbox and `gap`, not margins between siblings.

---

### `/emil-design-eng`
**Purpose**: The invisible details that make software feel great.

**Animation Decision Framework** (4 questions):
1. **Should this animate at all?**
   - 100+×/day → NO animation
   - 10s×/day → remove or drastically reduce
   - Occasional (modals, drawers) → standard
   - Rare (onboarding, celebrations) → can delight
   - **Never animate keyboard-initiated actions**
2. **What is the purpose?** Must have a clear answer.
3. **What easing?** enter = `ease-out`, exit = `ease-in`, move = `ease-in-out`. Never linear, never bounce/elastic.
4. **What duration?** Micro (hover) 100–150ms · Small (dropdown) 150–250ms · Medium (modal) 200–350ms · Large (page) 300–500ms · Max 500ms.

**Output format**: Mandatory Before / After / Why table.

---

## PHASE 4A: MOTION ENGINEERING
*The heavy-motion layer — GSAP + ScrollTrigger + Lenis. Use when component-level Motion isn't enough.*

> Decide first: **Motion (library)** for component micro-interactions (hover, tap, `layout`). **GSAP** for scroll-driven, timeline-based, or complex choreography. **Lenis** for smooth scroll. **React `<ViewTransition>`** (`vercel-react-view-transitions`) for page-to-page transitions only. Don't both-animate the same element.

---

### `gsap-core`
**Purpose**: The core API — `gsap.to()`, `from()`, `fromTo()`, easing, duration, stagger, defaults, `gsap.matchMedia()` (responsive + prefers-reduced-motion in one block).

**When**: Any GSAP tween. Responsive animation. Reduced-motion handling.

**Golden patterns**:
```ts
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
  gsap.to(".thing", { yPercent: 20, duration: 1, ease: "expo.out" });
});
```

**Rules**: Prefer `fromTo` over `set` + `to` (avoids FOUC). Prefer `fromTo` over `from` under scrub (deterministic end state).

---

### `gsap-scrolltrigger`
**Purpose**: Scroll-linked animations — pinning, scrub, triggers, parallax.

**Always**:
- Register once at module top: `gsap.registerPlugin(ScrollTrigger, useGSAP)`
- Use `invalidateOnRefresh: true` when end distance depends on viewport.
- Pinned sections: `pin: true` + end length in scroll distance.
- Call `ScrollTrigger.refresh()` after async content (image load, fonts).

**Rules**: One ScrollTrigger per logical effect. Use `ScrollTrigger.batch()` for list reveals. Wrap everything in `gsap.matchMedia()` for responsive + a11y.

---

### `gsap-timeline`
**Purpose**: Sequencing — `gsap.timeline()`, position parameter, nesting, playback control.

**Golden patterns**:
```ts
const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
tl.from(".a", { y: 20, opacity: 0 })
  .from(".b", { y: 20, opacity: 0 }, "-=0.3")   // overlap 0.3s
  .from(".c", { y: 20, opacity: 0 }, "<");      // start with previous
```

**Rule**: Replace hardcoded `delay` chains with a timeline + position parameter. Delays are brittle; timelines re-time cleanly.

---

### `gsap-react`
**Purpose**: React/Next.js integration — `useGSAP`, refs, scoped selectors, cleanup.

**Always**:
```tsx
const ref = useRef<HTMLDivElement>(null);
useGSAP(() => {
  gsap.from(".card", { y: 20 });  // scoped to ref
}, { scope: ref });
```

**Rules**: Always `{ scope: ref }` so class selectors resolve only within. `useGSAP` handles cleanup automatically — no manual context revert needed.

---

### `gsap-plugins`
**Purpose**: ScrollToPlugin, Flip, Draggable, Inertia, Observer, SplitText, DrawSVG, MorphSVG, CustomEase, etc. All free under the Webflow acquisition.

**Register what you use**:
```ts
gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
```

**Common picks**:
- `SplitText` — line/word/char reveals.
- `Flip` — FLIP-based layout transitions (grid → detail view).
- `Draggable` + `InertiaPlugin` — physics-based dragging.
- `ScrollToPlugin` — smooth `scrollTo` tweens.
- `Observer` — one normalized API for wheel/touch/scroll/drag/key.
- `CustomEase` — hand-crafted easing curves.

---

### `gsap-performance`
**Purpose**: 60fps at scale.

**Rules**:
- Animate `transform` and `opacity` only. Layout props (width, top, margin) kill FPS.
- `will-change` ONLY during active animation — toggle via `onStart` / `onComplete`. Permanent `will-change` wastes compositor memory.
- Batch DOM reads/writes. Avoid layout thrashing.
- Use `gsap.quickSetter()` / `gsap.quickTo()` for high-frequency updates (mouse tracking, scroll).
- `ScrollTrigger.config({ ignoreMobileResize: true })` stops iOS address-bar jumps.
- Measure with DevTools Performance tab — target 16.6ms frames. Below 50fps, simplify.

---

### `gsap-utils`
**Purpose**: Helpers — `clamp`, `mapRange`, `normalize`, `interpolate`, `random`, `snap`, `toArray`, `wrap`, `pipe`.

**Use**:
- `gsap.utils.toArray()` over `document.querySelectorAll` (returns real array).
- `gsap.utils.mapRange()` for driving values from scroll/mouse position.
- `gsap.utils.wrap()` for infinite carousels.
- `gsap.utils.pipe()` for composing transforms.

---

### `gsap-frameworks`
**Purpose**: Vue, Nuxt, Svelte, SvelteKit lifecycle integration.

**Rule**: For React use `gsap-react`. This skill covers the rest — `onMounted`/`onDestroy` (Vue), `onMount`/`onDestroy` (Svelte), and scoping selectors inside component lifecycles.

---

### Lenis (smooth scroll)
Not a skill — a library. But it's part of the kit. This is the one canonical Next.js setup; CLAUDE.md and AGENTS.md point here. Source: the Lenis README + `lenis/react` README (checked against lenis 1.3.27).

**Hookup pattern** — `components/SmoothScroll.tsx`, mounted once in `app/layout.tsx` inside `<body>`:
```tsx
"use client";
import "lenis/dist/lenis.css"; // required: Lenis's own CSS (stopped state, nested scroll, iframes)
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  // Runs on every Lenis scroll: keeps ScrollTrigger positions in sync.
  const lenis = useLenis(ScrollTrigger.update);

  // GSAP's ticker drives Lenis, so both run on one frame loop.
  useEffect(() => {
    if (!lenis) return;
    const tick = (time: number) => lenis.raf(time * 1000); // GSAP gives seconds, Lenis wants ms
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(tick);
  }, [lenis]);

  return (
    <ReactLenis
      root // global instance: useLenis() works from any component
      options={{
        autoRaf: false,              // the GSAP ticker above calls raf
        lerp: 0.12,                  // 0.1–0.14: weight without lagging behind the hand
        anchors: true,               // smooth #section links (offset comes from scroll-padding-top, below)
        stopInertiaOnNavigate: true, // no leftover momentum after a route change
        // respectReducedMotion defaults to true (lenis ≥1.3.26): smoothing off, jumps instant, live-updating
      }}
    />
  );
}
```

**Rules**:
- **One instance per app** — `<SmoothScroll />` once in the root layout. Elsewhere, `const lenis = useLenis()`; never `new Lenis()`.
- **Reduced motion is built in** (lenis ≥1.3.26 — the kit pins `^1.3.27`). Don't skip init: Lenis stays running with smoothing off so ScrollTrigger sync keeps working. On an older install, upgrade rather than hand-roll a check.
- **Sticky nav offset → CSS, not JS.** Set `html { scroll-padding-top: <nav height>; }` (or `scroll-margin-top` on targets). Lenis reads both for anchors and `scrollTo`, and the browser uses the same value to keep keyboard focus from hiding under the nav.
- **Scrollable panels** (mobile menu, drawer, modal body, cookie panel, code block): add `data-lenis-prevent`, or the page steals their scroll.
- **Modals lock the page** with Lenis, not `overflow: hidden` alone:
  ```tsx
  const lenis = useLenis();
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);
  ```
- **Programmatic scroll**: `lenis?.scrollTo("#pricing")` — honours scroll-padding and reduced motion.
- **Don't** set `scroll-behavior: smooth` on `html` (fights Lenis), and don't use CSS `scroll-snap` on the page (use `lenis/snap`).
- **Known limits**: Safari caps at 60fps (30 in Low Power Mode); wheel smoothing stops over iframes (YouTube, Maps embeds); touch keeps native scrolling by default — leave `syncTouch` off.
- `taste-app-screens` (taste-skill v2.1.5) mentions its own `Stage.smooth()` for plain-HTML pages. Ignore it in Next.js; this pattern is the kit's one smooth-scroll setup.

---

## PHASE 4B: INTERACTION & DELIGHT
*Component-level motion — Motion library + skill guides.*

---

### `/animate`
**Purpose**: Add purposeful animations, micro-interactions, and motion effects.

**Workflow**:
1. Identify animation opportunities: state transitions, feedback, entrance/exit, continuity.
2. Apply Animation Decision Framework from `/emil-design-eng`.
3. Implement with discipline: `transform` + `opacity` only · exponential easing · respect `prefers-reduced-motion` · target 60fps.

**Tool choice**:
- Motion (`motion/react`) for React hover/tap/layout animations.
- CSS transitions for state changes (`:hover`, `data-state`).
- GSAP for anything scroll-driven or sequenced.

**Rules**: Never animate layout properties · No bounce/elastic · No keyboard-initiated · Max 500ms · One great > ten mediocre.

---

### `/interaction-design`
**Purpose**: Microinteractions, feedback patterns, motion design.

**Key patterns**:
- **Button feedback**: Scale down on press (0.97–0.98). Color shift on hover.
- **Loading**: Skeleton > spinner. Progress bar for known duration. Shimmer for unknown.
- **Success**: Subtle checkmark animation. Color flash. Haptic on mobile.
- **Error**: 2–3 shake cycles. Red highlight. Clear recovery message.
- **Transitions**: Shared element morph (GSAP Flip). Cross-fade between states. Slide for spatial navigation.

---

### `/delight`
**Purpose**: Joy, personality, memorable touches.

**Where**: Moments of waiting · Moments of success · Moments of discovery · Empty states · Error moments.

**Rules**: Never at cost of usability · Not on high-frequency actions · Not during critical flows (checkout, error recovery) · Less is more · Cultural sensitivity.

---

### `/overdrive`
**Purpose**: Push past conventional limits. Hero sections, portfolio pieces, flagship features.

**Toolkit**:
| Goal | Tech |
|------|------|
| Cinematic transitions | View Transitions API, `@starting-style`, GSAP timelines, spring physics |
| Scroll-driven animation | GSAP ScrollTrigger (default) or `animation-timeline: scroll()` (CSS-only, modern browsers) |
| Beyond CSS rendering | WebGL (Three.js, OGL), WebGPU, Canvas 2D, SVG filters |
| Alive data | Virtual scrolling, animated data transitions, GPU charts |
| Complex property animation | `@property` custom props, Web Animations API |
| Raw performance | Web Workers, OffscreenCanvas, WASM |

**Workflow**:
1. Context check — context determines what "extraordinary" means.
2. **Propose before building** — 2–3 directions, describe each, ask user to pick.
3. Iterate with Playwright MCP — visually verify every step.

**Rules**: Progressive enhancement is non-negotiable · `@supports` feature detection · Always respect `prefers-reduced-motion` · Target 60fps, simplify below 50 · Test on real mid-range devices, not just your MacBook · Never layer competing wow moments · Never sound without opt-in · Ship the version that feels inevitable.

---

## PHASE 5: INTENSITY CONTROL
*Dial the design up or down based on feedback.*

---

### `/bolder`
**Purpose**: Amplify safe/boring designs. More visual interest and impact.

**How**: Increase type size contrast · Bolder weights · More saturated accents · Stronger contrast · Break the grid intentionally · Dramatic scale differences · Stronger imagery · More dramatic shadows · More assertive hover states.

**Rules**: Bold ≠ cluttered · One bold element per group · Usability always first · Test on phone, in meeting room, for color-blind users.

---

### `/quieter`
**Purpose**: Tone down overstimulating designs. Refined, sophisticated, easier on eyes.

**How**: Saturation 70–85% · Softer tones · Fewer colors · Reduce weights (900→600, 700→500) · More whitespace · Remove decorative gradients/shadows/patterns · Shorter motion distances · Tighter grid.

**Critical**: Quieter ≠ boring. Refined, not lazy. Great quiet design is HARDER than great bold design.

---

## PHASE 6: QUALITY & PRODUCTION
*Make it ship-ready.*

---

### `/audit`
**Purpose**: Scored quality report across a11y, perf, theming, responsive, anti-patterns.

**Severity**:
- **P0** Critical — must fix (broken functionality, WCAG A failures).
- **P1** High — should fix (WCAG AA failures, major UX).
- **P2** Medium — fix soon (minor UX, perf concerns).
- **P3** Low — polish, minor inconsistencies.

---

### `/web-design-guidelines`
**Purpose**: Best-practices compliance check — semantic HTML, a11y, perf, responsive, UX conventions, cross-browser.

---

### `/adapt`
**Purpose**: Responsive & cross-platform.

**Breakpoints**: Mobile 320–767 · Tablet 768–1023 · Desktop 1024+.

**Rules**: Mobile-first · Test on real devices · 44×44px touch targets (non-negotiable) · Don't hide critical content on mobile — restructure · Test 3G throttling.

---

### `/optimize`
**Purpose**: Performance fixes.

**CRITICAL**: Measure BEFORE and AFTER. No premature optimization.

**Targets**: LCP < 2.5s · INP < 200ms · CLS < 0.1.

**Areas**: Images (WebP/AVIF, `srcset`, lazy) · JS (code splitting, tree shaking, dynamic imports) · CSS (remove unused, inline critical, `contain`) · Fonts (`font-display: swap`, subset, preload critical, limit weights) · Rendering (`content-visibility: auto`, virtual scrolling) · Animation (GPU only, `rAF`, 60fps).

**Tools**: `@next/bundle-analyzer` · Playwright MCP for Lighthouse-style runs · DevTools Performance tab.

---

### `/harden`
**Purpose**: Production resilience.

**Dimensions**:
| Dimension | Actions |
|-----------|---------|
| Text overflow | `text-overflow: ellipsis` · `-webkit-line-clamp` · `min-width: 0` on flex items |
| i18n | 30–40% space budget · Logical CSS properties (`margin-inline-start`) · `Intl` API · RTL |
| Error handling | Clear messages · Retry buttons · Per-HTTP-status · Graceful degradation |
| Edge cases | Empty states · Loading · Large datasets (pagination/virtual scroll) · Double-submit prevention |
| Input validation | Client + ALWAYS server · Injection protection |
| A11y resilience | Keyboard · ARIA · `prefers-reduced-motion` · High-contrast mode |
| Perf resilience | Skeletons · Optimistic UI · Offline · Debounce/throttle |

**Test with**: Long text (100+ chars), emoji, RTL, CJK · Network failures, 4xx/5xx · 1000+ item datasets · Rapid concurrent clicks · Empty states · Slow 3G.

---

### `/normalize`
**Purpose**: Audit + realign UI to design system standards.

**Workflow**: Discover the system → analyze deviations → replace hard-coded values with tokens → replace custom components with system equivalents → align animation timing/easing + breakpoints → verify a11y → clean up orphans.

---

### `schema-markup` (project-local)
**Purpose**: Generate JSON-LD structured data so Google understands the page (rich snippets, sitelinks search, FAQ blocks, breadcrumbs, knowledge panel hints).

**Trigger**: User asks for schema, structured data, rich results, JSON-LD, sitelinks. Also runs **proactively** when you add a page that obviously needs it (Article, Product, FAQPage, LocalBusiness).

**Workflow**: read the page → pick matching schema(s) from the table in the skill → generate a typed builder in `lib/schema.ts` (using `schema-dts` for compile-time validation) → render as one `<script type="application/ld+json">` per page in a Server Component, always through the shared `<JsonLd>` component.

**Rules**: Escape every `<` as `\u003c` at render (`<JsonLd>` does it; a raw `JSON.stringify` in `dangerouslySetInnerHTML` lets a `</script>` in CMS-edited text break out = XSS) · Absolute URLs only · ISO 8601 dates · never fake ratings/reviews · don't add `FAQPage` to non-FAQ pages · don't use `next/script` (inline `<script>` is correct) · validate via Rich Results Test before reporting done.

**Output**: Updates `lib/schema.ts` + the relevant `app/**/page.tsx`. Never invents data not on the page.

---

### `/polish`
**Purpose**: The last 5%. Fix alignment, spacing, consistency, micro-details before shipping.

**Checklist**:
- [ ] Visual alignment perfect at all breakpoints
- [ ] Spacing uses design tokens consistently
- [ ] Typography hierarchy consistent
- [ ] ALL interactive states (default, hover, focus, active, disabled, loading, error, success)
- [ ] ALL transitions smooth (60fps)
- [ ] Copy consistent (terminology, casing, punctuation)
- [ ] Icons consistent (family, size, optical alignment)
- [ ] Forms labeled + validated
- [ ] Error states helpful with recovery
- [ ] Loading states clear
- [ ] Empty states welcoming
- [ ] Touch targets 44×44px min
- [ ] WCAG AA contrast
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] No console errors/warnings
- [ ] No layout shift on load
- [ ] Works across supported browsers
- [ ] Respects `prefers-reduced-motion`
- [ ] Code clean (no TODOs, console.logs, dead code)

**Rules**: Use it yourself on real devices · Squint at it · Never introduce bugs while polishing · Never perfect one section while leaving others rough.

---

## PHASE 7: EXTRACT & SYSTEMATIZE
*Scale what you've built.*

---

### `/extract`
**Purpose**: Consolidate reusable components, tokens, patterns.

**Rules**: Extract patterns appearing 3+ times · Don't over-abstract — mildly repetitive > prematurely abstracted · Name for purpose, not implementation · Every component independently testable.

---

### `/distill`
**Purpose**: Strip designs to their essence.

**Rule**: Simplification ≠ removal. It's making the complex feel simple. Simple is HARDER than complex.

---

### `/clarify`
**Purpose**: Fix UX copy, labels, microcopy, errors.

**Formulas**:
- **Buttons**: Verb + object ("Save changes" not "Submit").
- **Errors**: What + why + what-to-do ("Payment failed. Card declined. Try another card or contact your bank.").
- **Empty states**: What goes here + why it matters + how to start.
- **Confirmations**: What + reversible? + confirm/cancel.
- **Loading**: What's happening + estimated time.
- **Success**: What was done + what's next.

**Rules**: User's language, not system's · Front-load important info · Specific > vague · One idea per sentence · Consistent terminology throughout.

---

## MCP SERVERS
*The "weapons" — declared in `.mcp.json`, available to Claude automatically.*

---

### `playwright`
**What**: Full browser automation — navigate, click, fill forms, screenshot, snapshot, evaluate JS.  
**When**: Visual QA during build. Verify `/overdrive` work. Lighthouse-style runs. Regression screenshots.  
**Tools**: `mcp__playwright__browser_navigate`, `_click`, `_type`, `_take_screenshot`, `_snapshot`, `_resize`, `_evaluate`, `_fill_form`, `_wait_for`, `_run_code`.  
**Best practice**: Before reporting a UI task "done", screenshot the feature at desktop + mobile breakpoints via this MCP.

### `shadcn`
**What**: Registry search, component install, audit checklists.  
**When**: Picking a component for a job. Auditing installed components. Checking for registry updates.  
**Tools**: See `/shadcn` section above.

### `context7`
**What**: Live, up-to-date library documentation fetched on demand.  
**When**: Any library where the LLM's training data might be stale — Next.js 16, React 19, Tailwind 4, Base UI, GSAP plugins, etc.  
**Why critical**: Claude's training data has a cutoff. Frameworks move fast. Context7 fixes this for docs.  
**Use pattern**: When you hit an API you're unsure of, invoke context7 first rather than guessing.

### `fetch`
**What**: URL-to-markdown conversion.  
**When**: Pulling design references, competitor analysis, scraping a page for copy inspiration.

---

## SKILL DEPENDENCY MAP

```
                    ┌──────────────────┐
                    │ KIT BOOTSTRAP    │  ← scripts/apply.sh + scripts/doctor.mjs
                    │ (once per proj)  │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │ /teach-impeccable │  ← RUN FIRST
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │ /frontend-design │  ← LOADED BY EVERY DESIGN SKILL
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
     ┌────────▼───┐  ┌──────▼──────┐  ┌───▼──────────┐
     │/ui-ux-pro- │  │  /critique   │  │   /shadcn    │
     │    max     │  │              │  │  (+ MCP)     │
     └────────────┘  └──────────────┘  └──────────────┘

   REFINE:     /typeset · /colorize · /arrange · /emil-design-eng

   MOTION:
     ┌─────────────────────────────────────────────────────┐
     │ GSAP pack: core · scrolltrigger · timeline · react  │
     │           plugins · performance · utils · frameworks│
     │                                                      │
     │ Component motion: /animate · /interaction-design     │
     │           /delight · /overdrive                      │
     │                                                      │
     │ Smooth scroll: Lenis + GSAP ticker                   │
     └─────────────────────────────────────────────────────┘

   INTENSITY:  /bolder ⇄ /quieter

   SHIP:       /audit → /web-design-guidelines → /adapt
               /optimize → /harden → /normalize → /polish

   SYSTEMATIZE: /extract → /distill → /clarify

   MCP (all phases): playwright · shadcn · context7 · fetch
```

---

## QUICK REFERENCE CARD

### Skills
| Skill | One-Line Purpose | Phase | Frequency |
|-------|------------------|-------|-----------|
| `/teach-impeccable` | Establish design DNA | 0 | Once |
| `/critique` | Evaluate & score design | 1 | Per milestone |
| `/frontend-design` | Build pages & components | 2 | Every build |
| `/shadcn` | Manage component library | 2 | Per component |
| `/interface-design` | App/dashboard interfaces | 2 | Per interface |
| `/onboard` | First-run experiences | 2 | Per flow |
| `/typeset` | Fix typography | 3 | Per feature |
| `/colorize` | Strategic color | 3 | Per feature |
| `/arrange` | Layout & spacing | 3 | Per feature |
| `/emil-design-eng` | Design philosophy + animation decisions | 3–4 | Per review |
| `gsap-core` | GSAP basics | 4A | Every motion feature |
| `gsap-scrolltrigger` | Scroll-driven animation | 4A | Per scroll effect |
| `gsap-timeline` | Sequencing | 4A | Per complex sequence |
| `gsap-react` | React lifecycle + scoping | 4A | Every React GSAP use |
| `gsap-plugins` | SplitText, Flip, Draggable, etc | 4A | Per plugin need |
| `gsap-performance` | 60fps discipline | 4A | Every motion feature |
| `gsap-utils` | Helpers (clamp, mapRange, etc) | 4A | As needed |
| `gsap-frameworks` | Vue/Svelte/Nuxt | 4A | Non-React projects |
| `/animate` | Purposeful motion | 4B | Per feature |
| `/interaction-design` | Microinteractions + feedback | 4B | Per feature |
| `/delight` | Joy & personality | 4B | Per feature |
| `/overdrive` | Extraordinary UI | 4B | Hero sections |
| `/bolder` | Amplify visual impact | 5 | As needed |
| `/quieter` | Tone down intensity | 5 | As needed |
| `/audit` | Scored quality report | 6 | Pre-ship |
| `/web-design-guidelines` | Best-practice compliance | 6 | Pre-ship |
| `/adapt` | Responsive & cross-platform | 6 | Per feature |
| `/optimize` | Performance fixes | 6 | Pre-ship |
| `/harden` | Error handling, i18n, edge cases | 6 | Pre-ship |
| `/normalize` | Design system alignment | 6 | Per sprint |
| `/polish` | Final micro-detail pass | 6 | Last step |
| `schema-markup` | JSON-LD structured data | 6 | Per new page type |
| `/extract` | Reusable components & tokens | 7 | Per pattern |
| `/distill` | Remove unnecessary complexity | 7 | Per feature |
| `/clarify` | Fix UX copy & microcopy | 7 | Per feature |

### MCPs
| MCP | Primary use | Frequency |
|-----|-------------|-----------|
| `playwright` | Browser automation, visual QA | Every UI feature |
| `shadcn` | Registry search, install, audit | Per component |
| `context7` | Live library docs | Any unfamiliar API |
| `fetch` | URL scraping for references | Research |

---

## ANTI-PATTERNS — What NOT to Do

### Don't code before the doctor runs
Stale `next`, `react`, or `tailwindcss` means the LLM writes obsolete APIs. 30 seconds of `node scripts/doctor.mjs .` saves hours of rework.

### Don't use all skills on every task
A bug fix doesn't need `/overdrive`. A settings page doesn't need `/delight`.

### Don't skip Phase 0
Every design skill redirects to `/teach-impeccable` if no DNA exists.

### Don't polish before building
`/polish` is the LAST step.

### Don't stack motion libraries on the same element
Motion + GSAP on the same element = state drift. Pick one per element.

### Don't use `/bolder` and `/quieter` in a loop
If you're cycling, the problem is *direction*, not intensity. Go back to `/critique`.

### Don't skip measuring
`/optimize` requires before/after numbers. Don't guess.

### Don't use `/overdrive` everywhere
One extraordinary moment per page. Multiple competing wow moments cancel out.

### Don't skip context7 on unfamiliar APIs
If you're not 100% sure an API exists in the current version — check first, code second.

### Don't confuse similar skills
| Want | Use | NOT |
|------|-----|-----|
| Strategic color | `/colorize` | `/bolder` |
| Reduce noise | `/distill` | `/quieter` |
| Fix layout | `/arrange` | `/polish` |
| Animation philosophy | `/emil-design-eng` | `/animate` |
| Add component animations | `/animate` or Motion | `gsap-*` |
| Scroll-linked animation | `gsap-scrolltrigger` | `/animate` |
| Complex sequences | `gsap-timeline` | `delay:` chains |
| Score quality | `/audit` | `/critique` |
| Fix copy | `/clarify` | `/polish` |
| Design system alignment | `/normalize` | `/polish` |

---

*This bible is the source of truth for the OG Web Design kit. Update it here, then re-copy the kit into projects (or re-run `bash scripts/apply.sh .` in them). When a new skill lands or a library majors-up, update this file and `TECH-STACK.md` together so they never drift.*
