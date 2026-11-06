# AGENTS.md — Framework gotchas

> Read this BEFORE writing any framework-specific code. The LLM's training data pre-dates most of what's below.

---

## Next.js 16 (LTS: 16.2.3)

**This is NOT the Next.js from training data.** Breaking changes vs 14/15:

- **Turbopack is default.** `next dev` uses Turbopack. Webpack config in `next.config.ts` may not apply.
- **App Router only** for new work. Pages Router still works but don't start there.
- **`async` page components** are standard. `params` and `searchParams` are Promises — `await` them.
  ```tsx
  export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    ...
  }
  ```
- **`fetch` caching changed.** No more automatic caching in Route Handlers. Opt in with `cache: 'force-cache'` or `next: { revalidate: N }`.
- **`use cache` directive** is real (experimental earlier, stable now). Prefer it over `unstable_cache`.
- **Agent DevTools** (16.2) — enable in dev for LLM-friendly error overlay.
- **Browser log forwarding** (16.2) — client logs surface in the terminal. Don't `console.log` secrets.
- **Before writing new Next code**, check `node_modules/next/dist/docs/` for the current invocation.

## React 19

- **`use()`** unwraps promises inside components. No more `useEffect` + state for data.
- **Actions** replace most `onSubmit` boilerplate. Use `<form action={fn}>`.
- **`useFormStatus` / `useFormState`** for form UX. Don't manually track `isSubmitting`.
- **Ref as prop.** `ref` is now a regular prop on function components. No more `forwardRef` wrapper.
  ```tsx
  function Input({ ref, ...props }: InputProps) { ... }
  ```
- **`<Context.Provider>` → `<Context>`.** Providers render as the context itself.
- **Document metadata** (`<title>`, `<meta>`) hoists automatically. Stop using `next/head` manually.

## Tailwind CSS 4

- **No `tailwind.config.js` by default.** Config lives in CSS:
  ```css
  @import "tailwindcss";
  @theme {
    --color-brand: oklch(70% 0.2 20);
    --font-display: "ClashDisplay", sans-serif;
  }
  ```
- **`@tailwindcss/postcss` is the PostCSS plugin.** Not `tailwindcss` directly.
- **No more `content` array** — Tailwind auto-detects.
- **`@apply` still works** but prefer utilities in markup.
- **`oklch()` everywhere.** Gradients, mixes, semi-transparent — stay in oklch for predictable mixing.

## shadcn/ui (CLI v4)

- **`components.json`** lives in project root. Always check it first.
- **`npx shadcn@latest add <component>`** — installs into `components/ui/`.
- **Base UI**, not Radix, for new primitives. shadcn's v4 templates migrated.
- **MCP** is the fastest way to browse/install: `mcp__shadcn__search_items_in_registries`.

## GSAP 3.15

- **Fully free under Webflow** — register all plugins including SplitText, MorphSVG, DrawSVG.
- **`gsap.registerPlugin(ScrollTrigger, useGSAP)`** at module top.
- **`useGSAP` hook** from `@gsap/react` handles cleanup. Always `{ scope: ref }`.
- **`gsap.matchMedia()`** for responsive + prefers-reduced-motion in one block — auto-reverts.
- **Never use `gsap.set` + `gsap.to` before a ScrollTrigger** — use `fromTo` to avoid FOUC.
- **With `scrub`: prefer `fromTo` over `from`** — deterministic end state.

## Motion (formerly Framer Motion)

- Package name is **`motion`**, not `framer-motion`. Import path: `motion/react`.
- `import { motion } from "motion/react"` — for React components.
- `import { animate, scroll } from "motion"` — for imperative / framework-agnostic.
- `useReducedMotion()` from `motion/react` is the canonical reduced-motion hook.

## Lenis (Smooth Scroll)

- Use the canonical `<SmoothScroll />` in `SKILL-BIBLE.md` → Lenis: `<ReactLenis root options={{ autoRaf: false }} />` + `import "lenis/dist/lenis.css"`, driven by `gsap.ticker` (`lenis.raf(t * 1000)`, `lagSmoothing(0)`), synced with `useLenis(ScrollTrigger.update)`.
- Never `new Lenis()` in components — get the instance with `useLenis()`.
- Reduced motion is built in from lenis 1.3.26 (`respectReducedMotion: true` by default). Don't skip init.
- Scrollable panels need `data-lenis-prevent`; open modals call `lenis.stop()` / `lenis.start()`; sticky-nav offset comes from CSS `scroll-padding-top`.

## Forms (react-hook-form + zod)

- Use `@hookform/resolvers/zod` — single schema drives client + server validation.
- Server actions should re-validate with the same zod schema. Never trust client-only validation.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
