#!/usr/bin/env node
// skill-router.mjs — UserPromptSubmit hook: names the kit skills for a request.
//
// Claude Code runs this on every message you send (see .claude/settings.json).
// It is a plain keyword matcher: no AI, no network, ~40 ms. When the message
// matches a row of SKILL-MAP.md it prints one short line per match (max 3) as
// extra context for Claude. No match → no output → 0 tokens.
//
// It also records which skills this message expects in
// .claude/skill-log/<session>.json, so skill-guard.mjs can check at the end of
// the turn that they were used (layer 3). A new message resets that record.
//
// Test by hand:
//   echo '{"prompt":"write the hero copy","session_id":"t"}' | node scripts/skill-router.mjs
//
// Keep the rules in sync with SKILL-MAP.md (B. Task router).
//   re    — keywords (lower-case text)
//   hint  — what Claude is told
//   group — one hint per group; rules are ordered specific → general
//   need  — skills that count as "done" for this rule (any one of them);
//           [] = guidance only (files, scripts), never enforced

import { recordExpected } from "./skill-log.mjs";

const RULES = [
  // Copy
  { group: "copy", re: /\b(sounds? (like|too) ai|ai[- ]slop|de-?slop|robotic copy)\b/,
    hint: "copy-editing (sweeps + ai-tells) → copywriting only if the structure is weak",
    need: ["copy-editing", "copywriting"] },
  { group: "copy", re: /\b(copy|copywrit\w*|headlines?|taglines?|ctas?|microcopy|value prop\w*|rewrite the text|wording)\b/,
    hint: "copywriting → copy-editing · + market-ads (headline/CTA variants), clarify (microcopy) · facts only from brief.md §7",
    need: ["copywriting", "copy-editing"] },

  // Pages and design
  { group: "page", re: /\b(dashboard|admin panel|app screen|settings page|saas app)\b/,
    hint: "taste-app-screens + interface-design", need: ["taste-app-screens", "interface-design"] },
  { group: "page", re: /\b(redesign|restyle|looks? (generic|templated|ai[- ]made|cheap))\b/,
    hint: "design-taste-frontend (redesign brief in SKILL-BIBLE) → before/after shots", need: ["design-taste-frontend"] },
  { group: "page", re: /\b(review (this|the|my) (page|site|design)|what'?s wrong with (it|the page))\b/,
    hint: "design-taste-frontend (review brief, no code changes) · critique for a scored view", need: ["design-taste-frontend", "critique"] },
  { group: "page", re: /\b(new page|landing page|homepage|home page|one-?pager|build (a|the) (page|site|website)|new site)\b/,
    hint: "copywriting first → design-taste-frontend (new-page brief) → schema-markup · quality gate on the production build",
    need: ["design-taste-frontend"] },
  { group: "page", re: /\b((new|add (a|an|the)|build (a|the)|design (a|the)) (\w+ )?(section|hero|footer|nav\w*|header|faq|pricing|testimonials?))\b/,
    hint: "design-taste-frontend (section recipe) → consistency.mjs on the page", need: ["design-taste-frontend"] },
  { group: "page", re: /\b(make it (better|nicer|pop)|improve (this|the) (page|design|ui))\b/,
    hint: "impeccable (vague request) → the granular skill once the dimension is clear", need: ["impeccable", "polish"] },
  { group: "type", re: /\b(typograph\w*|fonts?|type scale|line[- ]height|letter[- ]spacing)\b/, hint: "typeset", need: ["typeset"] },
  { group: "colour", re: /\b(colou?rs?|palette|too gr[ae]y|contrast)\b/, hint: "colorize (brand colours from .impeccable.md)", need: ["colorize"] },
  { group: "layout", re: /\b(spacing|alignment|layout feels|cramped|whitespace)\b/, hint: "arrange", need: ["arrange"] },
  { group: "tone", re: /\b(too (loud|busy|much going on))\b/, hint: "quieter", need: ["quieter"] },
  { group: "tone", re: /\b(too (safe|boring|bland|plain))\b/, hint: "bolder", need: ["bolder"] },
  { group: "tone", re: /\b(wow|blow (me|them) away|signature moment)\b/, hint: "overdrive", need: ["overdrive"] },

  // Motion
  { group: "motion-cut", re: /\b(too much (animation|motion)|over-?animated|tone down the (motion|animation)|feels slow)\b/,
    hint: "remove-animations (subtract only) · keep blur-in titles + scroll reveals", need: ["remove-animations"] },
  { group: "motion-perf", re: /\b(jank\w*|choppy|stutter\w*|laggy|drop(ped|s)? frames|will-change)\b/,
    hint: "animation-performance (+ gsap-performance for GSAP)", need: ["animation-performance", "gsap-performance"] },
  { group: "motion", re: /\b(scroll[- ]?(trigger|driven|animation|reveal)|parallax|pin(ned)? section)\b/,
    hint: "gsap-scrolltrigger + gsap-react + gsap-core · Lenis setup in SKILL-BIBLE", need: ["gsap-scrolltrigger"] },
  { group: "motion", re: /\b(stagger\w*|entrance|sequence|choreograph\w*|one after another|timeline)\b/,
    hint: "choreograph (order + overlap) → gsap-timeline or Motion", need: ["choreograph", "gsap-timeline"] },
  { group: "motion", re: /\b(page transition|route transition|view transition)\b/,
    hint: "vercel-react-view-transitions", need: ["vercel-react-view-transitions"] },
  { group: "motion", re: /\b(drag|swipe|gesture|bottom sheet|spring)\b/,
    hint: "apple-design + emil-design-eng", need: ["apple-design", "emil-design-eng"] },
  { group: "motion", re: /\b(hover|tap state|press state|micro-?interaction)\b/,
    hint: "emil-design-eng + Motion (motion/react) + interaction-design", need: ["emil-design-eng", "interaction-design"] },
  { group: "motion", re: /\b(animat\w*|motion|transition)\b/,
    hint: "emil-animate (one element) or choreograph (several) · prefers-reduced-motion", need: ["emil-animate", "choreograph"] },

  // Mobile, code, components
  { group: "mobile", re: /\b(on (the |my )?(phone|iphone|mobile)|100vh|notch|safe area|input zoom)\b/, hint: "mobile-native", need: ["mobile-native"] },
  { group: "library", re: /\b(component library|which ui library|shadcn or|base ui or)\b/, hint: "pick-ui-library", need: ["pick-ui-library"] },
  { group: "react", re: /\b(bundle size|waterfall|re-?renders?|server component|client component|data fetching)\b/,
    hint: "vercel-react-best-practices", need: ["vercel-react-best-practices"] },

  // SEO, schema, tracking
  { group: "schema", re: /\b(json-?ld|schema markup|structured data|rich (results|snippets))\b/,
    hint: "schema-markup (always through <JsonLd>)", need: ["schema-markup"] },
  { group: "seo", re: /\b(seo|not ranking|rankings?|search console|google business|gbp|map pack|local seo|title tags?|meta description)\b/,
    hint: "seo-audit (local-SEO references) · page speed → optimize · plan for a new site → seo-plan.md", need: ["seo-audit"] },
  { group: "tracking", re: /\b(analytics|tracking|track (the )?(bookings?|calls?|leads?|forms?)|conversion events?)\b/,
    hint: "measurement-plan.md + _examples/conversion-tracking.tsx (bookings, phone) · forms fire on res.ok", need: [] },

  // Brand and imagery
  { group: "brand", re: /\b(logo|brand mark|icon set|packaging)\b/, hint: "brand-identity → brand-artifacts", need: ["brand-identity", "brand-artifacts"] },
  { group: "brand", re: /\b(brand (guidelines|identity)|existing brand|palette from (the|a) logo)\b/, hint: "brand-identity", need: ["brand-identity"] },
  { group: "imagery", re: /\b(hero image|og image|og card|product shot|imagery|photos?|generate (an )?image)\b/,
    hint: "higgsfield-master-creator (+ brand-imagery for the client's real photos)", need: ["higgsfield-master-creator", "brand-imagery"] },

  // Ship, security, CMS
  { group: "ship", re: /\b(go live|going live|ship check|pre-?launch|launch the site)\b/,
    hint: "audit → adapt → optimize → harden → polish → security-audit (guidance) → references/site-launch-qa.md", need: ["audit"] },
  { group: "security", re: /\b(security|is (it|this) safe|xss|api route|server action)\b/, hint: "security-audit (guidance mode)", need: ["security-audit"] },
  { group: "a11y", re: /\b(accessib\w*|a11y|screen reader|wcag)\b/, hint: "audit (a11y)", need: ["audit"] },
  { group: "perf", re: /\b(slow|performance|lighthouse|core web vitals|lcp|inp|cls)\b/,
    hint: "optimize + vercel-react-best-practices", need: ["optimize", "vercel-react-best-practices"] },
  { group: "cms", re: /\b(cms|editable|tina)\b/, hint: "tina-client-setup (escape JSON-LD via <JsonLd> first)", need: ["tina-client-setup"] },

  // Kit maintenance
  { group: "kit", re: /\b(check skills|skills? (outdated|updates?)|update (the )?skills)\b/,
    hint: "node scripts/check-skills.mjs (read-only) → reviewed update per skill", need: [] },
];

const MAX_HINTS = 3;

let event = {};
try {
  event = JSON.parse(await new Promise((res) => {
    let s = "";
    process.stdin.on("data", (d) => (s += d)).on("end", () => res(s)).on("error", () => res("{}"));
  }));
} catch {
  process.exit(0);
}

const prompt = String(event.prompt ?? "");
const text = prompt.slice(0, 1500).toLowerCase();
// A slash command names its own skill: the user chose, so nothing is expected from the map.
if (text.trimStart().startsWith("/")) {
  recordExpected(event, []);
  process.exit(0);
}
// A go-ahead ("yes", "continue", "go ahead", "do it") carries no task of its own:
// it continues the previous request, so that request's expectations stay.
const CONTINUE = /^\s*(yes|yeah|yep|yup|ok(ay)?|sure|go( ahead| on| for it)?|continue|proceed|do it|do both|next|carry on|keep going|sounds good|perfect|great|nice|correct|right|approved?|agreed?)\b/;
const skip = !text.trim() || (text.length < 80 && CONTINUE.test(text));

const matched = [];
if (!skip) {
  const used = new Set();
  for (const rule of RULES) {
    if (used.has(rule.group) || !rule.re.test(text)) continue;
    used.add(rule.group);
    matched.push(rule);
    if (matched.length === MAX_HINTS) break;
  }
}

// A short reply ("yes", "continue") keeps the previous message's expectations,
// so "build the page" → "yes continue" is still checked. A real new request resets them.
if (!skip || matched.length) {
  recordExpected(event, matched.filter((r) => r.need.length).map((r) => ({ hint: r.hint, need: r.need })));
}

if (!matched.length) process.exit(0);

const additionalContext =
  "Skill map (SKILL-MAP.md) for this request — call these unless one truly doesn't apply (then say which and why):\n" +
  matched.map((r) => `• ${r.hint}`).join("\n");

process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "UserPromptSubmit", additionalContext } }));
