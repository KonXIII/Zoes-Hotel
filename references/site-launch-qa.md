# Site launch QA (Next.js on Vercel)

Run this for every go-live: a new client site, a redesign, or a migration from the client's old site (WordPress, Wix, Squarespace…). It is the last step of the "pre-launch review / ship check" in `CLAUDE.md`, after the ship pipeline. Most launch failures don't show on the homepage, so walk all three passes.

Adapted from coreyhaines31/marketingskills `launch/references/site-launch-qa.md` (MIT), rewritten for the kit's stack.

## 1. Before the switch

**Content**
- [ ] Every page in `seo-plan.md` exists with final copy: no lorem ipsum, "TBD", or test prices
- [ ] Contact details, prices, opening hours and service names match what the client actually says (`brief.md` §7)
- [ ] Legal pages exist and are current: privacy, terms, cookie policy (EU clients: GDPR)
- [ ] Crawl the preview deployment for broken internal links and missing images

**Forms and conversions**
- [ ] Submit every form with a real test entry. Confirm it arrives in the inbox / CRM / booking tool
- [ ] Spam protection doesn't block real submissions; success and error messages both work
- [ ] Conversion events fire on the **confirmed success** (after the request returns OK), not on the button click. Names match `measurement-plan.md`
- [ ] Embedded booking (Cal.com, Calendly) and phone clicks are tracked: see `_examples/conversion-tracking.tsx`
- [ ] Vercel Web Analytics enabled on the project; custom events need the Pro plan
- [ ] Consent: if any non-essential tracking is used, the banner works and tags wait for consent

**SEO**
- [ ] `metadataBase` is set to the **production** domain, so canonicals and OG URLs never point at `*.vercel.app`
- [ ] Production is indexable: no `robots: { index: false }` left in `metadata`, no `noindex` header. Preview deployments are `noindex` by default on Vercel, so check production specifically
- [ ] `app/robots.ts` allows the pages you want indexed; `app/sitemap.ts` lists production URLs only
- [ ] Structured data validates: Rich Results Test (Google features) + validator.schema.org
- [ ] **Migration only:** the old-site redirect map from `seo-plan.md` is in `redirects()` in `next.config.ts` (permanent 301s, one old URL → its closest new page, never everything → homepage). Spot-test 10 old URLs on the preview

**Performance and access**
- [ ] Core Web Vitals acceptable on the key templates, on mobile (production build)
- [ ] Works on iPhone Safari and inside in-app browsers (Instagram, Facebook): these break `100vh`, fixed elements and some embeds
- [ ] OG image and title render when the link is shared (WhatsApp, Facebook, LinkedIn)
- [ ] Images have alt text, forms have labels, keyboard navigation works (quality gate)

**Deploy safety**
- [ ] Every env var the code reads exists in the **Vercel production** environment, not only `.env.local` (`grep -rhoE 'process\.env\.[A-Z_0-9]+' app lib components | sort -u`, compare with the project's env list)
- [ ] You know how to undo: Vercel **Instant Rollback** to the previous production deployment. Do it once on a preview
- [ ] DNS TTL lowered a day ahead if the domain moves from another host

## 2. At the switch

- [ ] Domain added in Vercel; HTTPS works on both `www` and apex, and one redirects to the other
- [ ] Redirects ship in the same deployment as the new site
- [ ] Load the top 10 pages: status 200, right content, right `<title>`, canonical on the production domain
- [ ] Submit one real form on production and confirm it arrives everywhere it should
- [ ] Every cron path in `vercel.json` returns **401** without auth (503/500 = missing env var or broken job: P1, tell the client's owner now)
- [ ] Submit the sitemap in Google Search Console and Bing Webmaster Tools
- [ ] Re-check production isn't `noindex`
- [ ] Google Business Profile website link points to the new domain/page (local clients)

## 3. The first two weeks

- [ ] Search Console: check coverage and 404s daily in week 1, then weekly. Add any missing redirects
- [ ] Compare traffic and conversions with the same period before, page by page
- [ ] Fix internal links that still point at redirected URLs
- [ ] Collect bugs from the client and their customers; decide what's urgent
