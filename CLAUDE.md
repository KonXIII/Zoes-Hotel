# Claude instructions — OG Web Design project

You are working inside a project that uses the OG Web Design kit. This file is your operating manual. Follow it on every turn, unprompted.

**Skill map (loaded every session):** before any task, find its row in the skill map below and call the skills it lists. Never skip one silently, and end every build/edit report with `Skills used: …`.

@SKILL-MAP.md

---

## Two modes

Decide which mode to run **by inspecting the project**:

- **BOOTSTRAP MODE** → `.impeccable.md` does NOT exist yet. Run the full setup sequence once.
- **EDIT MODE** → `.impeccable.md` exists. Lightweight. UI skills only. No re-bootstrapping.

Never re-run BOOTSTRAP once `.impeccable.md` exists. Heavier steps (audit, optimize, harden, polish, ship pipeline) only run when the user explicitly asks.

---

## BOOTSTRAP MODE — runs ONCE per project

Trigger: `.impeccable.md` is missing, OR user says "set up this project" / "apply OG kit".

Run this sequence **in order**, never skipping, never reordering:

### 1. Detect project state
- If `package.json` does **not** exist → empty project. Scaffold:
  ```bash
  npx create-next-app@latest . --ts --tailwind --app --eslint --use-npm --no-import-alias --yes
  ```
- If `package.json` **exists** → existing project. **Do not scaffold.** Move to step 2.

### 2. Refresh the stack to real-latest, then merge dependencies (non-destructive)
First, pull latest versions from npm so the project starts on real-latest, not last-reviewed-latest:
```bash
node scripts/refresh-stack.mjs
```
This bumps every package in `package.template.json` to the latest within its current major (safe). Major bumps (5 → 6) are flagged but NOT applied automatically — review their changelogs and pass `--major` only when ready.

Then merge into the project:
```bash
node scripts/merge-deps.mjs package.template.json ./package.json
```
This **adds** missing packages from `package.template.json` into the project's `package.json`. It never overwrites versions the user has already pinned.

### 3. Copy starter files (non-destructive)
For every file under `starter/`, copy to the project root if it does not already exist. Never overwrite. Specifically:
- `starter/components.json` → `./components.json`
- `starter/app/globals.css` → `./app/globals.css` (only if missing — most `create-next-app` scaffolds a different globals.css, so diff and ask before overwriting)
- `starter/app/layout.tsx` → `./app/layout.tsx` (same — ask before overwriting)
- `starter/lib/utils.ts` → `./lib/utils.ts`
- `starter/components/Motion.tsx`, `starter/components/BlurWords.tsx` → `./components/` (title blur-in, reveals, parallax). In an existing project whose `layout.tsx` and `globals.css` are kept, also mount `<Motion />` in the root layout and add the `focus-in` keyframe + utility from `starter/app/globals.css`. If the project localises routes (next-intl), import `usePathname` from its i18n navigation instead of `next/navigation`.
- `starter/tsconfig.json`, `starter/next.config.ts`, `starter/postcss.config.mjs`, `starter/eslint.config.mjs`, `starter/.gitignore`, `starter/.impeccable/config.json` (impeccable telemetry off) → same rule (skip if exists)

### 4. Install
```bash
npm install
```

### 4a. Link the vendored skills
```bash
bash scripts/link-skills.sh
```
Claude Code only loads project skills from `.claude/skills/`, which is gitignored and lost on every copy or clone. This symlinks every `.agents/skills/*` (taste-skill, GSAP suite, Emil suite, schema-markup…) into it, and warns if taste-skill's inspector is missing Node 22+ or a Chrome/Edge/Chromium. Tell the user to restart Claude Code afterwards so the skills appear. **Never skip this** — without it the page builder (`design-taste-frontend`) and GSAP skills silently don't exist.

### 5. MCP trust check
Confirm `.mcp.json` is present. If the user says MCPs aren't responding, tell them to restart Claude Code or trust the project in the Claude Code UI. Do not try to add MCPs yourself.

### 6. Version doctor
```bash
node scripts/doctor.mjs .
```
Bump anything red by editing `package.json` and re-running `npm install`. Never proceed with red packages — the LLM (you) will otherwise write against stale APIs.

### 6a. Discovery & strategy (NEW — run before the DNA interview)
Before design, understand the business. This is what makes the work worth thousands rather than a nice template. Copy `brief.template.md` → `brief.md` and fill it through a short strategy conversation (5–8 questions): what the business does, who the audience is, the **single most important goal** (the "one metric"), the top 2–3 competitors, and the differentiator. For a premium/agency build, deepen it with global research skills instead of guessing:
- `deep-research` — market/audience/competitor research when the client can't answer or you need outside evidence.
- `market-competitors` — structured teardown of the named competitors.
- `market-brand` — positioning + brand-voice extraction that later feeds copy and DNA.

**Then fill §7 Inventory**: the concrete facts only this client has (real name and its meaning, the place, the numbers, the constraint it lives with, rituals and hours, materials and printed things, content the page must carry, the photo folder) plus §3's exact conversion destination. Ask for them in one batch ("send me whatever of these you have"). Don't spend a question per line, and leave empty lines empty rather than invent. `design-taste-frontend` builds the page's idea from these; without them it designs for the category, not the client.

Keep it conversational. `brief.md` becomes the north star for every later decision (DNA, art direction, SEO, copy, measurement).

### 7. Design DNA interview
Copy `.impeccable.template.md` → `.impeccable.md`, then interview the user to fill every `{{slot}}`. Ask in this order: users → brand personality → aesthetic references (when the user names a brand, check `references/design-md/` — see 9a) → anti-references → color direction → typography direction → motion temperament → 3 design principles. Keep it short, conversational, 8–10 questions max. Anchor answers to `brief.md` — don't re-ask what discovery already answered.

### 8. Brand asset check
Look inside `brand/`. If `logo.svg`, `palette.json`, or `brand/fonts/*.woff2` exist, wire them into `app/layout.tsx` + `app/globals.css @theme`. If the folder is empty, ask once during step 7 how the user wants fonts/colors handled.
**If the client already has a brand** (logo, photos, shop, packaging), run `brand-identity` here — ideally before the step 7 colour/type questions, so they aren't decided twice. It treats the existing brand as fixed, samples the real colours from the logo, fills the gaps, and locks a master prompt. Feed its palette into `brand/palette.json` + `@theme`, and its master prompt into the Higgsfield imagery step.

### 9. SEO architecture plan
Copy `seo-plan.template.md` → `seo-plan.md`. Fill the URL tree, pillar + cluster outline, and schema plan from the user's answers. Keep conversational — this is a sketch, not a spec.

### 9a. Art direction — the big idea (NEW)
Before building, commit to a **concept**, not just a style. Copy `art-direction.template.md` → `art-direction.md` and define the site's unifying point of view. Pull 2–3 references (the user's, or from `references/inspiration.md`). **For every reference site, work from a DESIGN.md:** if the brand is one of the 84 in `references/design-md/`, read its file; for **any other URL**, write one first into the project's `references/sites/<domain>/DESIGN.md` (screenshots with taste-skill's `shoot.mjs`, measured styles with the Playwright MCP). The exact procedure is in `references/design-md/README.md`. Don't judge visuals from `fetch`, which only gets the page text. Then: extract principles (type-scale ratio, spacing rhythm, depth, radius, how colour is used, the reference's do's and don'ts), write them into `art-direction.md` → §2 Reference direction in our own words, blend 2–3 references, and **never copy** a brand's hex values, proprietary fonts, logos or signature layouts. For palette, style and type pairing, start from the client (`brief.md` §7, the real brand) and the reference DESIGN.md files, never a category catalog; for the brand itself, the vendored brand suite: `brand-identity` (brand rules + locked master prompt; if step 8 already ran it, build on that) → `brand-artifacts` (logo, marks, icons, packaging) → `brand-imagery` (real photos). Lock: concept statement, moodboard direction, type system, color system, motion temperament, and one signature moment. This is the step that separates award-grade work from a competent template.

### 9b. Measurement plan (NEW)
Copy `measurement-plan.template.md` → `measurement-plan.md`. Decide the one primary conversion, the key events to track, and the analytics tool. Add `@vercel/analytics` (or Plausible) on day one — it's already in TECH-STACK → OPTIONAL. This makes "measure and iterate" possible after launch instead of guessing.

### 10. Initial pages
**Content first.** Before layout, draft the page's copy and narrative — never build around lorem ipsum. Write it with `copywriting` (new page copy, checked against its AI-tells ban list), then polish with `copy-editing` (seven sweeps); add `market-ads` (headline / CTA variants) and `clarify` (microcopy / labels / errors), all anchored to `brief.md` + `art-direction.md`.
**Assets.** For hero / feature imagery, art-directed photography, or OG cards, use the Higgsfield MCP via `higgsfield-master-creator` (layout-aware web imagery) rather than stock.
**Build each page with `design-taste-frontend`** (taste-skill v2.5), **called by name** with the matching brief from `SKILL-BIBLE.md` → `design-taste-frontend` (new page / redesign / review only), fed from `brief.md` §3 + §7 Inventory. Its run: the kind of business → copy first → plan as screens → deal → build → check (`consistency.mjs`, `check.mjs`, `shoot.mjs`, `perf.mjs`) → report. **Apply the kit adaptations listed there:** brand colours via `start.mjs brand` (`.impeccable.md` + `art-direction.md` own the brand), fonts via `next/font`, the Next.js port, scroll reveals kept as a reported kit override, `--no-address` for real client contact details, never `effects.mjs publish`. Imagery: Higgsfield counts as its "image tool" (preference #2). Motion step uses GSAP + Lenis + the Emil skills (see EDIT MODE routing).
Then the rest of the **full workflow** from `SKILL-BIBLE.md`: ship pipeline (audit → adapt → optimize → harden → polish) → playwright screenshot at mobile + desktop.

### 11. Switch to EDIT MODE
Say "Bootstrap complete" and stop. Every subsequent turn runs in EDIT MODE.

---

## EDIT MODE — default after bootstrap

Trigger: `.impeccable.md` exists.

This is where most of your time runs. Keep it lean.

### On every request
1. **Read `.impeccable.md`** (design DNA), `brief.md` (strategy), `art-direction.md` (concept), and `seo-plan.md`. Never ask questions already answered there.
2. **Before building anything new**, skim the matching file in `_examples/` if one exists (hero → `_examples/hero-editorial.tsx`, nav → `_examples/nav-sticky.tsx`, etc.). Take structure, tokens and a11y from them. **Where they clash with the house rules, the house rules win.** Kit house rules: no eyebrow / tiny tracked-caps labels, no 01/02/03 index tags, no hairline dividers, no backdrop-blur nav, no gradients, no resting shadows, max two typefaces. On taste-skill builds, its own nine house rules also apply (`design-taste-frontend/SKILL.md`), with the kit adaptations in `SKILL-BIBLE.md`.
3. **Route to the right UI/UX skill** — see table below.
4. **Implement.** When writing UI code, follow the MUST/NEVER rules in `references/web-interface-guidelines.md` (Vercel's build-time rules; its *Kit overrides* table wins where they clash).
5. **Apply the minimum quality gate** (below) before reporting done.
6. **Stop.** Don't invent extra scope.

### Minimum quality gate (every shipped page or major section)
This is non-negotiable even in EDIT MODE. It's fast — under a minute.
- [ ] One `<h1>` with primary phrase in first 60 chars.
- [ ] `<title>` (via `metadata`) ≤60 chars, keyword first, brand last.
- [ ] Meta description ≤160 chars, benefit-led.
- [ ] Semantic HTML — `<header>`, `<nav>`, `<main>`, `<section>`, proper heading order.
- [ ] WCAG AA contrast on every text/background pair.
- [ ] Focus-visible outlines on every interactive element.
- [ ] 44×44px minimum touch targets.
- [ ] `prefers-reduced-motion` respected on any motion added.
- [ ] No MUST/NEVER from `references/web-interface-guidelines.md` broken (focus not hidden under sticky elements, `autocomplete`/`type`/`inputmode` on inputs, mobile inputs ≥16px, no `transition: all`, links are `<a>`/`<Link>`, images have width/height).
- [ ] Copy is real (anchored to `brief.md`), not lorem ipsum.
- [ ] Conversion elements fire the events named in `measurement-plan.md`.
- [ ] Page verified via Playwright MCP at 375×812 (mobile) + 1440×900 (desktop) screenshots. (On taste-skill builds, `consistency.mjs` + `check.mjs` at 1440/1024/820/768/390 with 0 FAIL, apart from the reported scroll-reveal kit override, plus `shoot.mjs` screenshots cover this.)
- [ ] **The final check runs on the production build** (`next build && next start`), not the dev server. Bundlers change the CSS visitors get, and taste-skill's checkers should see what visitors see.
- [ ] No console errors in dev.

Skip this gate only for trivial tweaks (copy change, one color swap).

### What NOT to do in EDIT MODE
- ❌ Re-run the doctor, the discovery interview, or the design DNA interview.
- ❌ Run `/audit`, `/optimize`, `/harden`, `/normalize`, `/web-design-guidelines`, or `/polish` on every request. Those are explicit-ask only.
- ❌ Call `context7` for APIs you already used successfully in this project.
- ❌ Re-plan SEO if `seo-plan.md` already covers the page.
- ❌ Re-bootstrap. `.impeccable.md` exists → bootstrap is done.

### Skill routing — EDIT MODE
| User asks for… | Invoke |
|---|---|
| New marketing page, landing page, portfolio, one-pager | `design-taste-frontend` by name, full run, with the kit adaptations. Use the **new page** brief in `SKILL-BIBLE.md` |
| Redesign / restyle / "looks generic, AI-made, templated" | `design-taste-frontend` by name, the **redesign** brief (consistency + shoot into `.taste-skill/before` → rebuild → `.taste-skill/after`, before/after side by side) |
| "Review this page" / "what's wrong with it?" without changing code | `design-taste-frontend`, the **review only** brief (no code changes; three biggest changes) |
| Single new section or component on an existing page | `design-taste-frontend` by name: build it to its section recipe (`references/sections-library.md`) with the page's existing system, then `consistency.mjs` on the page; `og-frontend-design` only as fallback |
| Landing page CRO review ("is this landing page converting?", "review for conversion") | `/market-landing` |
| New dashboard / app interface | **`taste-app-screens`** by name (taste-skill v2.1.5's app-screen route: `references/app-screens.md`, `draw.mjs --app --keep palette,type`, `inspect.mjs --app`), the **app screen** brief in `SKILL-BIBLE.md`, + `interface-design` |
| Typography tweak | `typeset` |
| Color feels off / too gray | `colorize` |
| Spacing / alignment | `arrange` |
| Build a new animation / transition (should it animate, tool, curve, exit) | `emil-animate` (Emil's `animate`, renamed to avoid clashing with the global `animate`; when its text says "use animate", it means `emil-animate`) |
| Component-level animation (hover, tap, layout) | `emil-design-eng` + Motion (`motion/react`) + `interaction-design` |
| Janky / dropped frames, "which property should I animate", `will-change` | `animation-performance` (+ `gsap-performance` for GSAP) |
| Stress-test a component with worst-case data | `break-ui` |
| Feels wrong on a phone (100vh, notch, tap flash, input zoom, sticky hover) | `mobile-native` |
| "Show me a few versions" / explore variants of one UI piece | `prototype` (explicit-invoke only) |
| Gesture, drag, sheet, spring, momentum | `apple-design` + `emil-design-eng` |
| "What could animate here?" / "make it feel alive" | `find-animation-opportunities` (proposes) → implement with GSAP / Motion |
| Several elements moving together: hero entrance, staggered list, view swap, multi-step flow (order, overlap, what stays still) | `choreograph` (decides the sequence) → build it with `gsap-timeline` or Motion |
| "Too much animation" / "feels slow" / "over-animated" / "tone down the motion" | `remove-animations` (subtracts only). **Protect the kit defaults:** blur-in titles (`Motion.tsx` / `BlurWords.tsx`) and scroll reveals stay unless the user opts out of them |
| Review or fix existing animations | `review-animations` (a diff) · `improve-animations` (whole-codebase roadmap) |
| User describes an effect but doesn't know its name | `animation-vocabulary` |
| Choosing a UI / component library | `pick-ui-library` |
| Isometric illustration, explanatory figure of how a system works, interactive technical drawing (SVG, optional WebGL / 3D) | `anatomy` (draw the concept as a real physical object; it ships its own audits and Chrome checks) |
| Smooth scroll | Lenis — copy the canonical `<SmoothScroll />` from `SKILL-BIBLE.md` → Lenis (`lenis/react` root instance, GSAP ticker, ScrollTrigger sync, built-in reduced motion). Scrollable panels get `data-lenis-prevent`; modals call `lenis.stop()` |
| Scroll-driven animation | `gsap-scrolltrigger` + `gsap-react` + `gsap-core` (+ Lenis) |
| Titles / headings (house default: blur into focus word by word) | `components/Motion.tsx` (`data-title`, on scroll) + `components/BlurWords.tsx` (headline on screen at load). See `_examples/blur-title.tsx`. Apply to every page's titles unless the user opts out |
| Multi-step sequence | `gsap-timeline` |
| Page-to-page transitions, route-change animation, shared element between pages (card → detail), forward/back direction | `vercel-react-view-transitions` (React's built-in `<ViewTransition>`; works in Next.js 16 as-is, don't install `react@canary`). **Page changes only:** in-page component motion stays with Motion, scroll with GSAP + Lenis. Respect `prefers-reduced-motion` |
| Writing or reviewing React / Next.js code: data fetching, loading waterfalls, bundle size, server vs client components, re-renders | `vercel-react-best-practices` (70 rules ranked by impact; read only the rule files relevant to the task) |
| Reusable component APIs, compound components, a component growing many boolean props, context providers | `vercel-composition-patterns` |
| Drag, physics, SVG morph, SplitText | `gsap-plugins` |
| Find a ready component | shadcn MCP (`mcp__shadcn__search_items_in_registries`) |
| "Add personality" / "make it fun" | `delight` |
| "Wow me" / hero moment | `overdrive` |
| "Too loud / overstimulating" | `quieter` |
| "Too safe / boring" | `bolder` |
| New unplanned page | Re-open `SEO-GEO-GUIDE.md` → Page Architecture Rules section |
| Adding a page with obvious schema match (article, product, FAQ, local business) | `schema-markup` (proactive — don't wait for user to ask) |
| "Add JSON-LD" / "structured data" / "rich snippets" | `schema-markup` |
| Write / rewrite copy, headline, CTA, microcopy | `copywriting` (write) → `copy-editing` (polish) + `market-ads` (headline/CTA variants) + `clarify` (microcopy) — anchor to `brief.md` |
| Grade the copy on an existing live URL | `market-copy` |
| Hero / feature image, OG card, art-directed photo, ambient video | Higgsfield MCP via `higgsfield-master-creator` |
| "Make it editable" / client CMS / hand off for editing | `tina-client-setup` (see portability note below) |
| Research audience / competitors / positioning | `deep-research` + `market-competitors` + `market-brand` |
| Client has an existing logo / brand to extend, palette from a logo, brand guidelines | `brand-identity` → hands off to `brand-artifacts` (logo, objects) / `brand-imagery` (real photos) |
| Restore, upscale or restyle the client's real photos | `brand-imagery` (after `brand-identity`) |
| "Add analytics" / "set up tracking" / measurement / "track bookings" / "track calls" | add `@vercel/analytics` (client sites are on Vercel Pro, so `track()` custom events work, max 2 properties); own forms fire on `res.ok` (`_examples/form-accessible.tsx`); embedded Cal.com/Calendly bookings + `tel:` taps via `_examples/conversion-tracking.tsx`; update `measurement-plan.md` |

---

## Explicit user triggers (heavier steps, opt-in only)

| User says | Run |
|---|---|
| "audit this" / "review my UI" | `/audit` + `/web-design-guidelines` |
| "check accessibility" | `/audit` (a11y dimension only) |
| "SEO audit" / "why am I not ranking" / "traffic dropped" / "local SEO" / "Google Business Profile" / "map pack" / "title tags" | `seo-audit` (local-SEO references are the kit's current source; fixes in Next.js `metadata` / `app/sitemap.ts` / `redirects()`). Page speed stays with `/optimize` |
| "optimize performance" / "it's slow" | `/optimize` + `vercel-react-best-practices` (code-level React/Next.js fixes) + Playwright perf run |
| "pre-launch review" / "ship check" / "go live" / "launch the site" | full ship pipeline: `/audit` → `/adapt` → `/optimize` → `/harden` → `/polish`, then `security-audit` in **guidance mode** on the site's attack surface (forms, server actions, API routes, env/secrets, security headers), then walk `references/site-launch-qa.md` (before the switch → at the switch → first two weeks) |
| "security check" / "is this safe?" / after adding forms, server actions, API routes, auth or payments | `security-audit` (global) in **guidance mode**: focused review, no files created. **Full audit mode only when the user explicitly asks** for a full audit or pen test: it launches many sub-agents and costs a lot. Never probe the live site |
| "conversion review" / "CRO this" / "why isn't this converting" | `/market-landing` |
| "brief this" / "discovery" / "strategy first" | Copy `brief.template.md` → `brief.md`; run `deep-research` + `market-competitors` + `market-brand` |
| "art direction" / "concept" / "moodboard" | Copy `art-direction.template.md` → `art-direction.md`; `brand-identity` + reference DESIGN.md files (`references/design-md/`) |
| "I like how [brand / any URL] looks" / "make it feel like Linear / Stripe / Apple…" | One of the 84 → read `references/design-md/<brand>/DESIGN.md`. Any other site → write `references/sites/<domain>/DESIGN.md` first (`shoot.mjs` screenshots + Playwright measurements). Extract principles into `art-direction.md`; never copy tokens, fonts or logos. Procedure: `references/design-md/README.md` |
| "make a logo" / "brand mark" / "icon set" / "packaging" | `brand-artifacts` (after `brand-identity`; Recraft vector via Higgsfield → trace to SVG → `brand/logo.svg`) |
| "write the copy" / "messaging" / "voice" / "sounds like AI" | `copywriting` → `copy-editing` + `market-ads` + `clarify` (anchor to `brief.md`) |
| "generate imagery" / "hero image" / "OG image" / "product shot" | Higgsfield via `higgsfield-master-creator` |
| "make it editable" / "add a CMS" / "client handoff" | `tina-client-setup` |
| "set up analytics" / "add measurement/tracking" | `@vercel/analytics` + update `measurement-plan.md` |
| "make it responsive" | `/adapt` |
| "harden this" | `/harden` |
| `/impeccable` (any mode) | First write `PRODUCT.md` / `DESIGN.md` from `brief.md` / `.impeccable.md` / `art-direction.md` (SKILL-BIBLE → "impeccable v4.8 in the kit"); never let it re-interview. **Live mode only on explicit ask, started with `IMPECCABLE_LIVE_COPY_AGENT=chat`** (the default can launch a no-permission background Claude) |
| "normalize" | `/normalize` |
| "polish it" | `/polish` |
| "check versions" | `node scripts/doctor.mjs .` |
| "check skills" / "are our skills outdated?" / "skill updates" | `node scripts/check-skills.mjs` (read-only: each skill vs its pinned `sourceCommit` and upstream HEAD, plus new upstream skills). Never update automatically: per skill, fetch to scratch → security scan → diff → re-apply the local edits it lists (see the lock `note`) → bump `sourceCommit` → `bash scripts/link-skills.sh`. Every skill added to `.agents/skills/` gets a `skills-lock.json` entry with `sourceCommit`, or the checker reports it as an error |
| "refresh the stack" / "bump kit versions" | `node scripts/refresh-stack.mjs` (within-major) · add `--major` to apply major bumps |
| "check updates" / "update this project" / "bump versions" / "update deps" | `bash scripts/update-project.sh` — runs npm outdated + npm update + lucide v1 codemod (if applicable) + doctor. Skips the on-hold majors (see TECH-STACK.md → MAJOR BUMPS ON HOLD). |
| "show me" / "screenshot" | Playwright MCP mobile + desktop |
| "re-plan SEO" | Re-open `SEO-GEO-GUIDE.md` full |

---

## Note on global skills (portability)

The strategy / content / CMS / asset skills routed above — `deep-research`, `market-*`, `tina-client-setup`, `security-audit` (Cloudflare), and `higgsfield-*` (Higgsfield MCP) — are **global** skills that live in the operator's `~/.claude/skills`, not vendored inside this kit's `.agents/skills/`. They work automatically on the kit owner's machine and travel with the owner across projects.

If this kit is ever run on a **different machine or handed to a client**, those global skills will not be present — only the vendored `.agents/skills/` ones will. In that case, vendor the critical ones into `.agents/skills/` and pin them in `skills-lock.json`. Priority to vendor first: **`tina-client-setup`** (client-editability ships in the deliverable, so it must be reproducible).

Contrast: the GSAP suite, the Emil design skills, `design-taste-frontend` and the brand suite (`brand-identity`, `brand-artifacts`, `brand-imagery`) ARE vendored in `.agents/skills/`, so they are portable already. The brand suite still needs the Higgsfield MCP (and its account) to generate anything.

**Claude Code only loads project skills from `.claude/skills/`**, and `.claude/` is gitignored. Each vendored skill needs a symlink there, or it silently never loads. `bash scripts/link-skills.sh` creates them (bootstrap step 4a). Run it again on any fresh clone or new machine, or after adding a skill to `.agents/skills/`.

**Adding or updating taste-skill:** `npx skills add Leonxlnx/taste-skill --skill design-taste-frontend -a claude-code -y` installs into `.claude/skills/`. Move the folder to `.agents/skills/`, re-run `link-skills.sh`, and set `sourceCommit` in `skills-lock.json`.

---

## MCPs — when to use
| MCP | When |
|---|---|
| `playwright` | Every page or major section (quality gate). Also for user-triggered visual QA. |
| `shadcn` | Before hand-rolling a component — check registry first. |
| `context7` | Only for library APIs you haven't used in this project yet. |
| `fetch` | Reading page *text* (competitor copy, positioning). Not for visuals: for a reference site's look, use `playwright` + taste-skill's `shoot.mjs` (see `references/design-md/README.md`). |
| `higgsfield` | Generating art-directed imagery / OG cards / ambient video. Route via `higgsfield-master-creator`. |

---

## Source of truth (order of precedence)

When these conflict with each other or with training-data knowledge, **these files win**, in this order:

1. `brief.md` — business strategy, audience, goals, the one metric. **(highest authority — everything serves this)**
2. `.impeccable.md` — project-specific design DNA.
3. `art-direction.md` — the visual concept / big idea.
4. `seo-plan.md` — project-specific SEO structure.
5. `measurement-plan.md` — primary conversion + analytics events.
6. `CLAUDE.md` (this file) — operating rules.
7. `SKILL-BIBLE.md` — skill usage reference.
8. `TECH-STACK.md` — dependency list + pins.
9. `AGENTS.md` — framework-specific gotchas.
10. `SEO-GEO-GUIDE.md` — page structure principles.
11. `_examples/` — anti-slop reference code.
12. `.mcp.json` — MCP declarations.
13. `.agents/skills/*` — project-local skills.

## Tech stack (authoritative)
See `TECH-STACK.md`. Core pins: **Next.js 16 · React 19 · TypeScript 5 · Tailwind 4 · shadcn · @base-ui/react 1 · GSAP 3.15 · Motion 14 · Lenis 1.3 · react-hook-form 7 + zod 4 · lucide-react · sharp**.

Never introduce a package outside this list without explaining why to the user first.
