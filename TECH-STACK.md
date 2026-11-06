# OG TECH STACK

> The canonical stack for every new web project. Numbers are targets — `doctor.mjs` will flag drift.

Last reviewed: **2026-11-05**

---

## CORE RUNTIME

| Package | Target | Why this, not alternatives |
|---------|--------|----------------------------|
| `next` | **^16.4.5** (LTS) | App Router + Turbopack default. 16.2 adds AI-ready `create-next-app`, browser log forwarding, agent DevTools. |
| `react` / `react-dom` | **^19.3.1** | Actions, `use()`, Server Components stable. The baseline. |
| `typescript` | **^5.9.3** | Non-negotiable for any LLM-assisted codebase — the type errors are your safety net. |

## STYLING

| Package | Target | Why |
|---------|--------|-----|
| `tailwindcss` | **^4.3.4** | Oxide engine (Rust) — 10× faster builds. CSS-first config, no `tailwind.config.js`. |
| `@tailwindcss/postcss` | **^4.3.4** | Required for v4. |
| `tailwind-merge` | **^3.7.0** | Deterministic class merging. |
| `tw-animate-css` | **^1.4** | Animation utility classes — Tailwind-native. |
| `clsx` | **^2.1** | Conditional classes. |
| `class-variance-authority` | **^0.7** | Variant APIs for components. |

## COMPONENT LAYER

| Package | Target | Why |
|---------|--------|-----|
| `shadcn` | **^4.23.0** | CLI to install components. Not a runtime dep — but pin it. |
| `@base-ui/react` | **^1.9.0** | Unstyled primitives. Pairs with shadcn — better architecture than Radix for new work. |
| `lucide-react` | **^1.69.0** | Icon set. Consistent stroke weight. Tree-shakes. v1 renamed some icons (`XCircle` → `CircleX`); run `npx @lucide/upgrade@latest` in existing projects when bumping. |

## ANIMATION

| Package | Target | Why |
|---------|--------|-----|
| `gsap` | **^3.15.1** | Now fully free under Webflow. Timelines, ScrollTrigger, every plugin unlocked. |
| `@gsap/react` | **^2.1** | `useGSAP` hook for cleanup + scoping. |
| `motion` | **^14.9.1** | Framer Motion rebranded. Use for component micro-interactions. From 14.2 the `x`/`y`/`scale`/`rotate` shorthands are hardware-accelerated on HTML elements, so keep them (no need for full `transform` strings). Bumped from 12 on 2026-11-05: 13.0 dropped the optional `@emotion/is-prop-valid` (pass `<MotionConfig isValidProp>` if needed), 14.0 removed internal APIs only. |
| `lenis` | **^1.3.27** | Smooth scroll. ≥1.3.26 required (built-in reduced motion). Canonical setup: SKILL-BIBLE → Lenis. |

**Division of labor:** GSAP for scroll/timeline/complex choreo. Lenis for smooth scroll. Motion for React-component micro-interactions (hover, tap, layout). React's built-in `<ViewTransition>` (no package, skill `vercel-react-view-transitions`) for page-to-page transitions only. Don't both-animate the same thing.

## FORMS

| Package | Target | Why |
|---------|--------|-----|
| `react-hook-form` | **^7.91.0** | Uncontrolled, fast, small. |
| `@hookform/resolvers` | **^5.9.2** | Bridge to zod. |
| `zod` | **^4.6.7** | Schema validation. Single source of truth for server + client. |

## IMAGES & MEDIA

| Package | Target | Why |
|---------|--------|-----|
| `sharp` | **^0.35.5** | Next.js image optimizer. |
| `next/image` | built-in | Always. Never `<img>` for content images. |

## SEO / META

| Package | Target | Why |
|---------|--------|-----|
| `next-sitemap` | **^4.2** | Postbuild sitemap. Install when the project has routes worth indexing. |

## OPTIONAL (add when needed)

| Package | When |
|---------|------|
| `@vercel/analytics` | Any deployed site — add day one. Mount `<Analytics />` in `layout.tsx` and fire the events named in `measurement-plan.md`. Privacy-friendly alt: `plausible` / `next-plausible` for cookieless EU audiences. |
| `@sentry/nextjs` | Anything with real users. |
| `@next/bundle-analyzer` | Before first performance audit. |
| `next-themes` | If dark/light mode is a feature, not just an accent. |
| `next-mdx-remote` | Content-heavy sites with author workflow. |
| `tinacms` + `@tinacms/*` | When the **client** must edit content themselves. Don't hand-roll — follow the global `tina-client-setup` skill (Tina Cloud + Git-backed publishing on Vercel). Client-editability is a deliverable, so vendor that skill into `.agents/skills/` for portability. |
| `playwright` | E2E tests. MCP is separate — this is for CI. |

## CREATIVE TECH (award-grade / WebGL builds only)

Add ONLY when `art-direction.md` → "signature moment" genuinely needs 3D / shaders / particles. This is the top enabler for Awwwards-caliber "wow" that GSAP + Lenis alone can't deliver — but it's heavy, so don't add it by default.

| Package | Why |
|---------|-----|
| `three` | The WebGL/WebGPU engine. |
| `@react-three/fiber` | React renderer for Three.js (declarative scenes). |
| `@react-three/drei` | Helper components (controls, loaders, effects). |
| `@react-three/postprocessing` | Bloom, DOF, and shader post-effects. |

> ⚠️ **No official Claude skill exists for Three.js / R3F** (unlike GSAP, which ships official MIT skills). Before building with these, vendor a vetted **community** R3F skill into `.agents/skills/` and pin it in `skills-lock.json` — candidates: `Impertio-Studio/Three.js-Claude-Skill-Package` (broadest: WebGL/WebGPU/R3F/Drei/physics), `EnzeD/r3f-skills`, `dgreenheck/webgpu-claude-skill`. Audit license + quality first.

## DEV TOOLING

| Package | Target | Why |
|---------|--------|-----|
| `eslint` | **^9.39.5** | Flat config. |
| `eslint-config-next` | Match `next` major | Auto-aligned rules. |
| `@types/node` | **^20.19.43** | Node 20 LTS baseline. |
| `@types/react` / `@types/react-dom` | **^19.3.0** | Match React major. |

---

## WHAT WE DO NOT INSTALL (by default)

- **`framer-motion`** — use `motion` instead (same library, new name).
- **`styled-components` / `emotion`** — Tailwind covers it.
- **`redux`** — Zustand or React context first. Redux only for apps that genuinely need time-travel debugging.
- **`moment`** — use `date-fns` or native `Intl`.
- **`axios`** — native `fetch` is fine in Next.js 16.
- **`jquery`** — no.

## VERSION CHECK

From the project root, run:
```bash
node scripts/doctor.mjs .
```

The script checks `package.json` against the major-version targets in this file and prints a compact diff. Bump anything red before writing framework-specific code — the LLM will otherwise default to obsolete APIs from its training data.

To refresh the kit itself to latest-within-major from npm:
```bash
node scripts/refresh-stack.mjs            # safe: bumps within current majors only
node scripts/refresh-stack.mjs --major    # also applies major bumps (review changelogs first)
node scripts/refresh-stack.mjs --check    # exits 1 if drift exists (for CI)
```

---

## MAJOR BUMPS ON HOLD

These have shipped on npm but we are NOT bumping the kit yet. Each entry lists what unblocks it.

| Package | Current target | Latest available | Why on hold | Unblock when |
|---------|----------------|------------------|-------------|--------------|
| `typescript` | `^5.9.3` | `6.0.x` | Next.js 16's bundled tsconfig still targets TS 5.x; `strict: true` is the new default in 6.0 and several legacy options removed (`moduleResolution: classic`, `target: es5`, `esModuleInterop: false`). | `create-next-app` ships with TS 6 in its template, or Next.js docs officially recommend TS 6. |
| `eslint` | `^9.39.4` | `10.x` | Hard-blocked: `eslint-config-next` peer-deps on ESLint 9. ESLint 10 also drops Node 18/19/21/23 and ignores legacy `.eslintrc.json` entirely (flat config mandatory). | `eslint-config-next@17` (or whichever major) ships with ESLint 10 peer support. |
| `@types/node` | `^20.19.41` | `25.x` | `@types/node` major should match the **Node runtime major**, not "latest". Kit currently baselines Node 20 LTS. Node 24 became LTS in Oct 2025. | Either accept the Node 20 baseline and stay (current stance), or deliberately bump the kit's runtime baseline to Node 24 LTS — then move `@types/node` to `^24`, not 25. Separate, considered decision. |

When unblocking, run:
```bash
node scripts/refresh-stack.mjs --major
```
…then remove the entry from this table.
