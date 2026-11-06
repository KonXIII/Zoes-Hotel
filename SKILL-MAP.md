# Skill map — OG Web Design kit

The one-page index of every skill this kit uses: **when** to use it, **how** to call it, **what to combine** it with, and **what proves it ran**. Loaded every session through `CLAUDE.md`. Detail lives in `CLAUDE.md` (routing table, quality gate) and `SKILL-BIBLE.md` (per-skill briefs); this page decides *which* skill.

**K** = kit skill (`.agents/skills/`, linked into `.claude/skills/`) · **G** = global skill (`~/.claude/skills/`) · **MCP** = tool server.

## Rules

1. **Find the row first.** Before any task, find its row in A, B or C below and call every skill in the **Call** column, in order, with the Skill tool and the exact name shown. `/audit` and `audit` are the same skill.
2. **Read the project files first.** Every skill starts from `brief.md` → `.impeccable.md` → `art-direction.md` → `seo-plan.md` → `measurement-plan.md`. Never ask the user what they already answer.
3. **Never skip a "Must".** If a listed skill truly doesn't apply, say which one you skipped and why in the report. Silent skips are not allowed. A Stop hook (`scripts/skill-guard.mjs`) enforces this: if a turn changed files without calling a skill the router named, it stops the turn once and names what's missing.
4. **One owner per job.** When two skills could do it, the map's choice wins. See D (name traps).
5. **Report what ran.** End every build or edit report with one line: `Skills used: …`.
6. **Router hints.** A hook (`scripts/skill-router.mjs`) adds a short "Skill map … for this request" note to matching messages. Treat it as this map's row for the request: call those skills, or say which one doesn't apply and why.

## A. Building a site — phase order (BOOTSTRAP)

| # | Phase | Call (in order) | Combine with | Done when |
|---|---|---|---|---|
| 1 | Discover | interview → `brief.md` | `anthropic-skills:deep-research`, `market-competitors` (G), `market-brand` (G) when the client can't answer | `brief.md` filled, incl. §7 Inventory |
| 2 | Brand (client has one) | `brand-identity` (K) | → `brand-artifacts` (K) for logo/marks, → `brand-imagery` (K) for real photos | `brand/palette.json` + locked master prompt |
| 3 | Design DNA + concept | interview → `.impeccable.md`; `art-direction.md` | reference DESIGN.md files (`references/design-md/`, or write `references/sites/<domain>/DESIGN.md`) | concept, type, colour, motion, signature moment locked |
| 4 | SEO plan | `seo-plan.md` (tree **A** for local businesses) | `SEO-GEO-GUIDE.md`; redirect map if replacing an old site | URL tree + schema plan + redirects |
| 5 | Measurement | `measurement-plan.md` | `@vercel/analytics` (Pro: `track()`) | one primary conversion + events named |
| 6 | Copy | `copywriting` (K) → `copy-editing` (K) | `market-ads` (G) headline/CTA variants · `clarify` (G) microcopy | passes `copywriting/references/ai-tells.md`; facts only from §7 |
| 7 | Imagery | `higgsfield-master-creator` (G) | `brand-imagery` (K) for the client's real photos | shot list generated + web-optimised |
| 8 | Build each page | **`design-taste-frontend` (K)**, called by name with the SKILL-BIBLE brief (new page / redesign / review) | `vercel-react-best-practices` (K) while coding · `vercel-composition-patterns` (K) for component APIs · shadcn MCP before hand-rolling · `_examples/` | `consistency.mjs` + `check.mjs` 0 FAIL (scroll-reveal = reported kit override) |
| 9 | Motion | `emil-animate` (K) one element · `choreograph` (K) several elements | `gsap-scrolltrigger` + `gsap-react` + `gsap-core` (K) for scroll · Motion (`motion/react`) for components · titles: `Motion.tsx` / `BlurWords.tsx` | `prefers-reduced-motion` respected |
| 10 | Schema + tracking | `schema-markup` (K), always through `<JsonLd>` | `_examples/conversion-tracking.tsx` (bookings, phone) · forms fire on `res.ok` | Rich Results Test passes; events fire |
| 11 | Quality gate (every page) | CLAUDE.md minimum gate | `web-design-guidelines` (K) rules · Playwright MCP 375 + 1440 | gate checklist green on the **production build** |
| 12 | Launch ("ship check", "go live") | `audit` → `adapt` → `optimize` → `harden` → `polish` (G) | → `security-audit` (G, guidance mode) → `references/site-launch-qa.md` | all three launch passes ticked |

## B. Task router (EDIT MODE)

| The request is about… | Call | Combine with |
|---|---|---|
| New page / landing page | `design-taste-frontend` (K), new-page brief | phase 6 copy first · phase 9 motion · `schema-markup` (K) |
| New section on an existing page | `design-taste-frontend` (K), section recipe | run `consistency.mjs` on the page |
| Redesign / "looks generic, AI-made" | `design-taste-frontend` (K), redesign brief | before/after shots |
| "Review this page" (no code changes) | `design-taste-frontend` (K), review brief | `critique` (G) for a scored UX view |
| Dashboard / app screen | `taste-app-screens` (K) | `interface-design` (K) |
| Vague "make it better" | `impeccable` (K) | granular skill once the dimension is clear |
| Typography / colour / spacing | `typeset` / `colorize` / `arrange` (G) | — |
| Too loud / too safe / needs personality / wow | `quieter` / `bolder` / `delight` / `overdrive` (G) | — |
| Write or rewrite copy, "sounds like AI" | `copywriting` (K) → `copy-editing` (K) | `market-ads` (G), `clarify` (G) |
| Grade copy on a live URL | `market-copy` (G) | — |
| Landing page converting? | `market-landing` (G) | — |
| Build an animation | `emil-animate` (K) | `choreograph` (K) if several parts move |
| Hover / tap / layout motion | `emil-design-eng` (K) + Motion | `interaction-design` (K) |
| Scroll-driven animation | `gsap-scrolltrigger` + `gsap-react` + `gsap-core` (K) | Lenis (SKILL-BIBLE canonical setup) |
| Sequence / timeline | `gsap-timeline` (K) | `choreograph` (K) decides the order |
| SplitText, drag, SVG morph | `gsap-plugins` (K) | — |
| Janky motion, `will-change` | `animation-performance` (K) | `gsap-performance` (K) for GSAP |
| Review motion: one diff / whole codebase | `review-animations` / `improve-animations` (K) | — |
| "What could animate?" / "too much animation" | `find-animation-opportunities` / `remove-animations` (K) | protect blur-in titles + scroll reveals |
| Name for an effect | `animation-vocabulary` (K) | — |
| Gesture, drag, sheet, spring | `apple-design` + `emil-design-eng` (K) | — |
| Feels wrong on a phone | `mobile-native` (K) | — |
| Page-to-page transitions | `vercel-react-view-transitions` (K) | — |
| A few variants of one UI piece | `prototype` (K), only when asked | — |
| Worst-case data stress test | `break-ui` (K) | — |
| Pick a component library | `pick-ui-library` (K) | — |
| Explain a system as an isometric figure | `anatomy` (K) | — |
| React / Next.js code quality, waterfalls, bundle | `vercel-react-best-practices` (K) | `vercel-composition-patterns` (K) |
| Find a ready component | shadcn MCP | — |
| Structured data / JSON-LD | `schema-markup` (K) | — |
| SEO audit, not ranking, local SEO, GBP, map pack | `seo-audit` (K) | page speed → `optimize` (G) |
| Analytics, track bookings / calls | `measurement-plan.md` + `_examples/conversion-tracking.tsx` | — |
| Hero / OG / product imagery | `higgsfield-master-creator` (G) | `brand-imagery` (K) |
| Logo, marks, icon set, packaging | `brand-artifacts` (K) | after `brand-identity` (K) |
| Client CMS / "make it editable" | `tina-client-setup` (G) | fix JSON-LD escaping first (`<JsonLd>`) |
| Security check, forms, API routes | `security-audit` (G), guidance mode | — |
| Accessibility | `audit` (G), a11y only | — |
| Library API not used before in this project | context7 MCP | — |
| Skill updates | `node scripts/check-skills.mjs` | update process in CLAUDE.md |

## C. Recipes (common combinations)

- **New service page (local client):** read brief §7 → `copywriting` → `copy-editing` → `design-taste-frontend` (new page) → `emil-animate` (only for what the page needs) → `schema-markup` (`Service` + `BreadcrumbList`) → quality gate.
- **Hero section:** `copywriting` (headline + CTA) → `market-ads` (3 variants) → `design-taste-frontend` (section recipe) → `higgsfield-master-creator` (hero image) → `choreograph` (entrance order) → `BlurWords` title.
- **Redesign of a client's old site:** `design-taste-frontend` (redesign brief) → redirect map in `seo-plan.md` → `copy-editing` on kept copy → `seo-audit` after launch.
- **"The copy sounds like AI":** `copy-editing` (sweeps + ai-tells) → rewrite with `copywriting` only if the structure itself is weak.
- **"It feels janky":** `animation-performance` → `gsap-performance` (if GSAP) → `review-animations` on the fix.
- **Local SEO for a client:** `seo-audit` (local references) → `schema-markup` (`LocalBusiness`, no self-serving stars) → GBP fixes listed for the client.
- **Go live:** phase 12 in full, then the first-two-weeks pass of `site-launch-qa.md`.

## D. Name traps

| Trap | Use |
|---|---|
| **Global beats project** when names match (Claude Code rule) | Never keep a global copy of a kit skill (duplicates moved to `~/.claude/skills-backup-2026-11-05/kit-duplicates`). If a global must stay, the kit copy gets an `og-` prefix (`og-frontend-design`). `link-skills.sh` and `check-skills.mjs` flag any new clash |
| `frontend-design` (G, impeccable fork, loaded by `/audit`, `/polish`…) vs `og-frontend-design` (K, Anthropic) | Fallback builder → `og-frontend-design`. Main builder is `design-taste-frontend` |
| `animate` (G, impeccable) vs `emil-animate` (K) | New motion → `emil-animate` |
| `seo-audit` (K) vs `marketing:seo-audit` (plugin) vs `market-seo` (G) | `seo-audit` |
| `market-*` (G) have **empty descriptions**, so they never auto-route | Call by exact name, only where this map says |
| `deep-research` isn't a plain skill here | `anthropic-skills:deep-research` |
| `design-taste-frontend` (v2.5, sites) vs `taste-app-screens` (v2.1.5) | Dashboards and app screens only → `taste-app-screens` |
| `impeccable` (umbrella) vs granular skills | Vague request → `impeccable`; specific dimension → granular |

## E. Don't use in this kit

- `ui-ux-pro-max` (removed: category defaults instead of the client).
- `design:*` and `marketing:*` plugin skills (not part of the kit flow).
- `animate` (G) for new motion; `frontend-design` (G) as a builder: use `og-frontend-design` (fallback) or `design-taste-frontend`.
- impeccable **live mode**, unless asked and started with `IMPECCABLE_LIVE_COPY_AGENT=chat`.
