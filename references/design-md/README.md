# DESIGN.md reference library

84 design-system write-ups of well-known brands, in Google's open [DESIGN.md](https://stitch.withgoogle.com/docs/design-md/overview/) format: YAML tokens (colours, type scale, spacing, radius) followed by prose (principles, components, do's and don'ts, responsive behaviour).

**Use them to study a reference, never to copy it.** Every site this kit builds has an original brand. The brand comes from `brief.md`, `.impeccable.md`, `art-direction.md` and `brand-identity`.

## When Claude uses this

The user names a site or brand they like, e.g. "I love how Linear feels" or "something like Stripe's pricing page". Usually this happens during the DNA interview (aesthetic references) or art direction. It can also come up later for a single section or component.

1. **Look it up.** If `references/design-md/<brand>/DESIGN.md` exists, read it: it gives the system and its principles in prose. These files are snapshots and some values are approximate or out of date. A 2026-11-05 check of Linear found the colours matched exactly, but the live headline is Inter Variable 64px/510 rather than the file's "Linear Display" 80px/600. When exact values matter, confirm them with the live extraction below. **If the brand isn't here, use the live extraction to write one** (next section). Don't rely on `fetch` for visuals: it only gets the page text, not fonts, colours or layout.
2. **Pull out principles, not values.** Note what makes it feel the way it does:
   - type-scale ratio, weight contrast and tracking at display sizes
   - spacing rhythm and density (generous or compact; section padding vs component padding)
   - how depth is made (surface steps, borders or shadows)
   - corner-radius language (sharp, soft, pill)
   - how colour is used: how many accents, where an accent is allowed, how dark and light surfaces step
   - button and component posture, imagery treatment, motion temperament
   - the reference's own do's and don'ts
3. **Write them into `art-direction.md`** under *§2 Reference direction → What to borrow*, in our own words: "From Linear: one accent used only on primary actions; four near-black surface steps instead of shadows; tight −2% tracking on display type." Then apply them through the client's own palette and type.
4. **Blend 2–3 references** so no single brand is cloned.

## Any other website: write its DESIGN.md first

Works for any public URL. Save everything in the **client project**, under `references/sites/<domain>/`.

1. **Photograph it.** From the project root, for each width (1440, 768, 390):
   `node .agents/skills/design-taste-frontend/scripts/shoot.mjs --url <url> --w 1440 --out references/sites/<domain>/1440.png --profile "${TMPDIR:-/tmp}/taste-skill-chrome"`
   This renders the site in a headless Chrome and saves the full page plus screen-sized tiles in `tiles/`. Read the screenshots. Motion isn't filmed, so describe what you see moving with the Playwright MCP if it matters, and list the rest under *Known Gaps*. (Tested on linear.app, 2026-11-05.)
2. **Measure it.** Open the URL with the Playwright MCP (`browser_navigate`), then run this with `browser_evaluate`:
   ```js
   () => {
     const pick = (sel) => { const el = document.querySelector(sel); if (!el) return null; const s = getComputedStyle(el);
       return { font: s.fontFamily, size: s.fontSize, weight: s.fontWeight, lineHeight: s.lineHeight, tracking: s.letterSpacing,
                color: s.color, bg: s.backgroundColor, radius: s.borderRadius, shadow: s.boxShadow, padding: s.padding }; };
     const out = { viewport: innerWidth };
     for (const sel of ['body', 'h1', 'h2', 'h3', 'p', 'nav a', 'main a', 'button', 'input', 'footer']) out[sel] = pick(sel);
     out.fonts = [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family} ${f.weight}`))];
     const tally = {};
     document.querySelectorAll('body *').forEach(el => { const s = getComputedStyle(el);
       for (const c of [s.color, s.backgroundColor]) if (c && c !== 'rgba(0, 0, 0, 0)') tally[c] = (tally[c] || 0) + 1; });
     out.topColors = Object.entries(tally).sort((a, b) => b[1] - a[1]).slice(0, 12);
     const radii = {};
     document.querySelectorAll('a, button, input, img, [class*=card]').forEach(el => { const r = getComputedStyle(el).borderRadius;
       if (r !== '0px') radii[r] = (radii[r] || 0) + 1; });
     out.radii = Object.entries(radii).sort((a, b) => b[1] - a[1]).slice(0, 6);
     out.sectionPadding = [...document.querySelectorAll('section')].slice(0, 8).map(s => getComputedStyle(s).paddingBlock);
     return out;
   }
   ```
   Tested on linear.app (2026-11-05). It returns fonts, the type scale, the colour palette by frequency, the radius scale and section rhythm. Run it again at 390px (`browser_resize`) for mobile, and on a second page (pricing, product) if the user cares about it. Close the browser afterwards.
3. **Write `references/sites/<domain>/DESIGN.md`** in the same structure as the files here: YAML tokens, then Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts, Responsive Behavior. Mark each value **measured** or **inferred from screenshots**, and list what you couldn't capture under *Known Gaps*.
4. Continue from step 2 above: principles, not values.

**Limits:** pages behind a login, cookie walls or bot protection may not load or may show the wrong content. Heavy WebGL/3D scenes can render blank in an automated browser. Motion isn't captured by the screenshots (describe it from the Playwright MCP if it matters), and never as exact timings or easings. Say so in *Known Gaps* rather than guessing.

## Never copy
- A brand's **hex values, gradients or signature colour** onto a client site. The client's palette comes from `brand-identity` / `.impeccable.md`.
- **Proprietary fonts** (Linear Display, Söhne, SF Pro, Circular…). Use the DESIGN.md's substitute notes only to understand the *feel*, then choose the client's own pair.
- **Logos, marks, illustrations, product imagery, signature layouts or copy.** Close copies of a real brand's look can mislead visitors and create legal risk for the client.

## Precedence
`brief.md` → `.impeccable.md` → `art-direction.md` → taste-skill house rules → these references. A reference that relies on something the house rules ban (hairline dividers, gradients, backdrop-blur nav, eyebrow labels, resting shadows) is translated into an allowed equivalent, not followed.

## Brands (84)

- **AI & developer tools:** claude, cohere, composio, cursor, elevenlabs, expo, lovable, minimax, mistral.ai, ollama, opencode.ai, replicate, runwayml, together.ai, voltagent, warp, x.ai, raycast, vercel, supabase, sentry, posthog, resend, mintlify, hashicorp, mongodb, clickhouse, sanity
- **Design & productivity SaaS:** linear.app, notion, figma, framer, webflow, miro, airtable, cal, clay, intercom, zapier, slack, superhuman, jobright
- **Finance:** stripe, mercury, revolut, wise, kraken, coinbase, binance, mastercard, nerdwallet, 1win
- **Consumer & retail:** airbnb, nike, starbucks, spotify, pinterest, uber, oura, shopify, mydealz
- **Automotive & space:** bmw, bmw-m, bugatti, ferrari, lamborghini, renault, tesla, spacex
- **Hardware & big tech:** apple, dell-1996, dji, hp, ibm, meta, nvidia, oracle, sap, playstation, nintendo-2001, vodafone
- **Media:** aljazeera, theverge, wired

`dell-1996` and `nintendo-2001` describe the retro versions of those sites.

## Source
- Upstream: [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md), MIT (see `LICENSE`)
- Snapshot: commit `fcc7028` (2026-10-28), copied 2026-11-05. Only the `DESIGN.md` files are kept; the per-brand READMEs just pointed to getdesign.md.
- Security-scanned before adding: markdown only, no scripts, no hidden text or injected instructions. The `npx @google/design.md lint` lines inside some files refer to Google's official DESIGN.md linter (`google-labs-code/design.md`).
- Upstream is moving content to its website (getdesign.md). Don't pull updates blindly: re-scan any new version before replacing this snapshot.
