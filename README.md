# OG WEB DESIGN

> A folder you copy into any project to make Claude build you great websites.

---

## How to use it

### New project (empty folder)
1. Create an empty folder for your project (e.g. `Tennis Website/`).
2. Open this `OG WEB DESIGN` folder in Finder, select all (`Cmd+A`), copy (`Cmd+C`).
3. Paste into your new project folder.
4. Open Claude Code in that folder.
5. Say: **"set up this project"**.

Claude reads `CLAUDE.md`, detects the folder is empty, and runs the full bootstrap:
- Scaffolds Next.js 16.
- Merges kit deps into `package.json`.
- Copies starter files (`components.json`, `globals.css` with design tokens, `layout.tsx`, etc.).
- Runs `npm install`.
- Runs the version doctor.
- Asks you 8–10 brand DNA questions → saves `.impeccable.md`.
- Sketches `seo-plan.md` with your URL tree and pillars.
- Builds your first page with the full quality pipeline.

### Existing project
Same — paste all kit files into the project root. Open Claude. Say **"apply OG kit"** (or "set up this project").

Claude detects `package.json` already exists, **skips the scaffold**, and:
- Only merges missing deps (never overwrites your pins).
- Only copies missing starter files (never overwrites existing).
- Runs the version doctor and flags drift.
- Runs the DNA interview + SEO plan.

Your existing code is never touched unless you ask.

---

## What's in the folder

```
OG WEB DESIGN/
├── CLAUDE.md                  ← Operating manual for Claude (loaded every session)
├── SKILL-MAP.md               ← Which skill to call, when, combined with what (loaded every session)
├── SKILL-BIBLE.md             ← How every skill/MCP/library fits together
├── TECH-STACK.md              ← Canonical dependency list + version targets
├── AGENTS.md                  ← Framework gotchas (Next 16, React 19, Tailwind 4, GSAP)
├── SEO-GEO-GUIDE.md           ← Page structure for SEO + Generative Engine Optimization
├── README.md                  ← This file
│
├── .mcp.json                  ← MCP servers (playwright, shadcn, context7, fetch)
├── brief.template.md          ← Discovery & strategy template (filled during bootstrap 6a)
├── .impeccable.template.md    ← Design DNA template (filled during bootstrap)
├── art-direction.template.md  ← Visual concept / big-idea template (filled during bootstrap 9a)
├── seo-plan.template.md       ← SEO architecture template (filled during bootstrap)
├── measurement-plan.template.md ← Conversion + analytics template (filled during bootstrap 9b)
├── package.template.json      ← Canonical deps merged into the project
│
├── scripts/
│   ├── apply.sh               ← Full one-shot bootstrap (manual fallback)
│   ├── merge-deps.mjs         ← Non-destructive package.json merger
│   ├── check-skills.mjs       ← Skill update check against upstream
│   ├── skill-router.mjs       ← Hook: names the right skills for each message (no AI, 0 tokens on no match)
│   ├── skill-guard.mjs        ← Hooks: records skill calls; at the end of a turn that changed files, stops once if a named skill was skipped
│   ├── skill-log.mjs          ← Shared state for router + guard (.claude/skill-log/, never committed)
│   ├── install-hooks.mjs      ← Adds the kit hooks to .claude/settings.json (merge, never replace)
│   └── doctor.mjs             ← Version check against TECH-STACK
│
├── starter/                   ← Baseline project files copied during bootstrap
│   ├── components.json        ← shadcn config
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── postcss.config.mjs
│   ├── eslint.config.mjs
│   ├── .gitignore
│   ├── app/
│   │   ├── globals.css        ← Tailwind 4 with @theme design tokens (oklch, fluid type)
│   │   └── layout.tsx         ← Root layout with metadata scaffolding
│   ├── components/
│   │   ├── Motion.tsx         ← Title blur-in on scroll, reveals, parallax (mounted in layout)
│   │   └── BlurWords.tsx      ← Headline that blurs in word by word on load (CSS)
│   └── lib/utils.ts           ← cn() helper
│
├── _examples/                 ← Anti-slop reference components Claude reads before building
│   ├── hero-editorial.tsx
│   ├── nav-sticky.tsx
│   ├── feature-grid-asymmetric.tsx
│   ├── form-accessible.tsx
│   ├── cta-bold.tsx
│   ├── scroll-reveal.tsx
│   ├── blur-title.tsx
│   └── footer-generous.tsx
│
├── references/
│   ├── inspiration.md         ← Sites I love — Claude studies 2–3 for direction
│   ├── design-md/             ← 84 brand design systems (DESIGN.md) to study, never copy
│   └── web-interface-guidelines.md ← Vercel's build-time UI rules (+ kit overrides)
│
├── brand/                     ← Drop logo.svg, palette.json, fonts/ here
│   └── README.md
│
└── .agents/skills/            ← Project-local skills (Claude Code needs a symlink in .claude/skills/)
    ├── design-taste-frontend/ (taste-skill v2.5 — Leonxlnx/taste-skill; default page builder, websites)
    ├── taste-app-screens/     (taste-skill v2.1.5 kept for app screens / dashboards only)
    ├── og-frontend-design/
    ├── interaction-design/
    ├── interface-design/
    ├── web-design-guidelines/
    ├── schema-markup/
    ├── emil-design-eng/       (Emil Kowalski suite — synced from emilkowalski/skill)
    ├── apple-design/
    ├── animation-vocabulary/
    ├── find-animation-opportunities/
    ├── improve-animations/
    ├── review-animations/
    ├── pick-ui-library/
    ├── emil-animate/          (Emil's /animate, renamed — global `animate` is impeccable's)
    ├── animation-performance/
    ├── break-ui/
    ├── mobile-native/
    ├── prototype/
    ├── anatomy/               (wheresryan22/anatomy — interactive isometric SVG figures of how systems work)
    ├── brand-identity/        (brand suite, via Higgsfield — brand rules + locked master prompt; run first)
    ├── brand-artifacts/       (logos, marks, icons, packaging → trace to SVG)
    ├── brand-imagery/         (restore / restyle the client's real photos)
    ├── vercel-react-best-practices/   (vercel-labs/agent-skills — 70 React/Next.js performance rules)
    ├── vercel-react-view-transitions/ (page-to-page transitions with React's <ViewTransition>)
    ├── vercel-composition-patterns/   (component architecture — compound components, React 19 APIs)
    └── gsap-*/                (8 GSAP skills — core, scrolltrigger, timeline, react,
                                plugins, performance, utils, frameworks)

    Note: strategy/content/CMS/asset capabilities (deep-research, market-*,
    tina-client-setup, higgsfield-*) are routed from CLAUDE.md as
    GLOBAL skills (~/.claude/skills), not vendored here. Portable on the owner's
    machine; vendor them in if the kit moves machines. See CLAUDE.md → portability note.
```

### What gets created in YOUR project during bootstrap
- `brief.md` — your discovery & strategy (from template, filled in step 6a). **Highest-authority doc.**
- `.impeccable.md` — your design DNA (from template, filled by interview).
- `art-direction.md` — your visual concept / big idea (from template, step 9a).
- `seo-plan.md` — your SEO architecture (from template).
- `measurement-plan.md` — your conversion + analytics plan (from template, step 9b).
- `components.json`, `app/globals.css`, `app/layout.tsx`, `lib/utils.ts`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `.gitignore` — only if missing.
- Updated `package.json` — only new deps added.

---

## Manual fallback

If "set up this project" ever stalls, you can run the whole bootstrap yourself:
```bash
bash scripts/apply.sh .
```
That script mirrors what Claude does. Then open Claude and say "continue setup" to pick up at the DNA interview.

## Version check
```bash
node scripts/doctor.mjs .
```
Prints which packages match target versions and which need bumping.

## Skill update check
```bash
node scripts/check-skills.mjs            # all skills
node scripts/check-skills.mjs gsap-core  # one skill
```
Compares every vendored skill with the version pinned in `skills-lock.json` and with the latest upstream: ✅ up to date · 🟠 behind (commits + files changed) · 🧊 frozen on purpose · 📁 kit-made. Also lists new skills that appeared upstream next to ours. Read-only; needs `gh auth login` (or `GITHUB_TOKEN`). Exit code 2 means updates are available.

---

## One rule
Don't remove any file from the kit once copied. Claude treats them as a single system — the examples calibrate taste, the templates drive the interview, the scripts make bootstrap reproducible.
