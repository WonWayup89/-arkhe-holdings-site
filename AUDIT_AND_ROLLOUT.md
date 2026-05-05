# Arkhe Holdings — Audit & Roll-Out Report

**Site:** https://arkheholdings.net
**Audit date:** 2026-05-04
**Stack confirmed:** Next.js 16.2.4 (App Router) · React 19.2.4 · Tailwind v4 · framer-motion 12 · Resend 6 · Vercel Analytics 2

This report is split into two parts:

1. **Code audit** — dead code, conflicting code, and broken paths found in the current repo.
2. **Project-manager review** — phased roll-out plan that turns the audit into an executable backlog.

---

## PART 1 — CODE AUDIT

### 1.1 Critical: broken / non-functional code

These are bugs in production right now. Fix first.

**A. Contact form submits to a placeholder endpoint**
File: `app/contact/page.tsx`, line 20

```ts
const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", { ... });
```

The literal string `YOUR_FORM_ID` was never replaced. Every contact submission silently 404s and lands the user on the "Something went wrong" branch. Worse, the project already has a working Resend pipeline (`/app/api/subscribe/route.ts`) that this page should use.

Fix: replace Formspree with a `/api/contact` route powered by Resend, mirroring the existing subscribe route.

**B. Environment variable name mismatch (Resend leads email)**
File: `app/api/subscribe/route.ts`, line 15

```ts
to: process.env.ARKEH_LEADS_EMAIL || "brian.salsbury@arkheholdings.net"
```

The handoff doc (and Vercel env in your project notes) lists the variable as `ARKHE_LEADS_EMAIL` — note the spelling: brand is **ARKHE** (h before e), code uses **ARKEH** (e before h). If your Vercel project has the brand-spelled var, the runtime always falls through to the hard-coded default. Pick one spelling and align both sides.

**C. Two parallel "verticals" pages with overlapping content**
Files: `app/system/page.tsx` and `app/verticals/page.tsx`

- The global nav (in `SiteNav` and the homepage hand-rolled nav) labels the link `Ventures` → `/system`.
- All five vertical pages (`legal`, `technology`, `media`, `holdings`, `strategy`) end with a back-link "← All Verticals" that points to `/verticals`.
- A user clicking around the site lands on **two different "list of verticals" pages** depending on which path they took.

Decide which is canonical. Recommendation: keep `/system` (richer, includes `VentureGeomMap`, ties to the "system, not a company" thesis) and either delete `/verticals` or 308-redirect it to `/system`. Then update every vertical page's back-link.

### 1.2 Conflicting / duplicated code

**D. Homepage duplicates the navbar instead of using `<SiteNav />`**
File: `app/page.tsx`, lines 40–83

The homepage hand-rolls the same navbar markup that lives in `components/SiteNav.tsx`. Two consequences:

- Any nav change (e.g. adding "Pricing" or "Login") must be made in two places.
- The two copies have already drifted: the homepage `hover:` classes lack `transition-colors`; SiteNav has it.

Fix: import `SiteNav` on the homepage and delete the inline `<nav>` block. The footer at lines 193–209 also duplicates nav links — extract a `SiteFooter` component while you're in there.

**E. Two visual "system map" components for the same content**
Files: `components/SystemDiagram.tsx` (homepage) and `components/VentureGeomMap.tsx` (`/system`)

Both render the same five ventures in different visual languages. They are not used together but they encode the same domain model in two places. If the venture list changes (e.g. you spin up a sixth lane), you must update three sources of truth: `SystemDiagram` nodes, `VentureGeomMap` ventures + links array, and the `verticals` constant on the homepage.

Fix: extract the venture list to `lib/ventures.ts` and have all three components consume it. Same play you already made for `lib/posts.ts`.

**F. Two SVG network backgrounds rendering simultaneously on the homepage**
- `<AmbientNetwork />` is mounted globally in `app/layout.tsx` (fixed, `-z-10`).
- `<HeroNetwork />` renders inside the homepage hero section.

They don't visibly conflict because AmbientNetwork is behind everything, but on the homepage you ship two large SVGs (~70 stars + ~50 lines each) for a layer that overlaps. Consider conditionally suppressing AmbientNetwork on the homepage, or trimming HeroNetwork to only the shield/polyhedrons.

**G. Background color drift**
- `app/layout.tsx` body: `bg-[#04070a]`
- All subpage `<main>` wrappers: `bg-[#05070a]`
- `app/globals.css` body still has `--background: #ffffff;` (light) / `#0a0a0a` (dark prefers-color-scheme).

Three different background sources for a single dark theme. The Tailwind class on `<body>` wins, but the CSS variables and the one-character color drift between layout and pages are dead/conflicting code. Pick one canonical color (`#04070a` looks right) and centralize it.

**H. Tailwind/CSS leftover from the Next.js starter**
File: `app/globals.css`

```css
--font-sans: var(--font-geist-sans);
--font-mono: var(--font-geist-mono);
font-family: Arial, Helvetica, sans-serif;
```

The Geist font variables are referenced but never registered (no `next/font` import in `layout.tsx`), so they always resolve empty. Body falls back to system Arial — which is what the site currently ships. Either wire up `next/font/google` (Geist Sans / Geist Mono) and use the variables, or delete the `@theme` block and the `prefers-color-scheme` override entirely. Keeping unused boilerplate is the kind of thing reviewers pick on.

### 1.3 Lint errors blocking clean builds

`npx eslint .` returns **18 errors, 3 warnings**. Summary:

- `react/no-unescaped-entities` — unescaped `"` and `'` in `about/page.tsx`, `holdings/page.tsx`, `media/page.tsx`, `strategy/page.tsx`. Quick mass-replace fix.
- `@next/next/no-html-link-for-pages` — internal links use raw `<a>` instead of `<Link>` in `app/page.tsx` (3×), `app/privacy/page.tsx` (1×), `components/SiteNav.tsx` (2×). Same fix as the SiteNav consolidation in (D).
- `@next/next/no-img-element` (warning) — `<img>` instead of `next/image` in `app/page.tsx` and `components/SiteNav.tsx` for the logo. Convert to `<Image>` and you also get auto-LCP optimization.
- `@typescript-eslint/no-explicit-any` — `components/VentureGeomMap.tsx:73` uses `function Geom({ node, active, onEnter }: any)`. Type it: `{ node: typeof ventures[number]; active: boolean; onEnter: () => void }`.

None of these block a Vercel deploy today, but they're sand in the gears and they'll bite the moment you (or a future agent) wire stricter lint into CI.

### 1.4 Minor dead lines and stylistic noise

- `app/layout.tsx` line 42: `icons: { icon: "/icon.svg" }` — Next 16 already auto-detects `app/icon.svg` (which exists). The metadata declaration is harmless but redundant.
- `app/founder/page.tsx` lines 23–28: trailing whitespace + a stray `<br />` inside a `<p>` (`Founder of Arkhe Holdings  <br />`). Looks fine visually but is the kind of thing that breaks when you switch to `<Link>`.
- `app/page.tsx` line 158: blank line followed by `<EmailCapture />` floating between `</section>` and `<SystemDiagram />`. Wrap it in a section + heading or it reads as orphaned in a screen reader.
- `public/` contains both `arkhe-logo.jpeg`, `arkhe-logo.png`, and `arkhe-logo.svg` — three logo formats, only the JPEG is referenced. Decide which is canonical and remove the rest, or convert to a single optimized SVG.
- Project handoff doc references `/components/Navbar.tsx`. Actual component is `SiteNav.tsx`. Update the handoff doc when you next touch it.

### 1.5 Audit summary table

| # | Severity | Area | Fix effort |
|---|----------|------|-----------|
| A | Critical | Contact form posts to placeholder Formspree URL | 1 hr |
| B | High | `ARKEH_` vs `ARKHE_` env var spelling drift | 5 min |
| C | High | `/system` vs `/verticals` duplicate index pages | 30 min |
| D | High | Hand-rolled nav on homepage duplicates `SiteNav` | 30 min |
| E | Medium | Venture list duplicated across 3 components | 45 min |
| F | Medium | AmbientNetwork + HeroNetwork double-render on home | 20 min |
| G | Medium | Background color drift across layout / pages / globals.css | 15 min |
| H | Low | Geist font variables referenced but never registered | 30 min |
| 1.3 | Medium | 18 lint errors, 3 warnings | 1 hr |
| 1.4 | Low | Redundant icon metadata, orphaned files, stale handoff doc | 30 min |

Total cleanup budget: roughly **5 hours of focused work**.

---

## PART 2 — PROJECT-MANAGER REVIEW

Scoring each handoff-doc Phase 3 priority against current state.

### 2.1 Where the site is now (vs. handoff doc)

| Handoff goal | Status | Evidence |
|---|---|---|
| Hero with glow shield + network | **Done** | `HeroNetwork.tsx` ships heraldic shield, polyhedrons, perspective floor, twinkle/pulse animations |
| Email capture (Resend) | **Done** | `/api/subscribe` working; `EmailCapture` component renders cleanly |
| System Architecture page | **Done** | `/system` exists with `VentureGeomMap` + venture cards |
| Insights page (future authority engine) | **Done** | `/insights` ships with three founder posts, dynamic `[slug]` route, sitemap entries |
| Domain + SSL + analytics | **Done** | `metadataBase`, OG image, JSON-LD, Vercel Analytics all wired |
| Animated network lines + node pulse | **Partial** | Lines draw-in + pulse on hero & ambient layer. Nodes don't pulse on `SystemDiagram`. |
| Floating motion layer | **Partial** | Polyhedrons float on hero. `SystemDiagram` is fully static. |
| Interactive system diagram (clickable nodes → vertical pages) | **Not done** | `SystemDiagram` nodes are non-interactive. `VentureGeomMap` has hover but no click-through. |
| Typography upgrade | **Partial** | Hero is strong; sub-pages still use baseline Tailwind type. No custom font loaded. |
| Dark depth effects (bloom / vignette) | **Partial** | Hero has both. Sub-pages are flat dark. |
| Founder authority page | **Partial** | Copy is strong; layout reads like a resume. No pull-quote, no glow card, no "system architect" framing visual. |
| Insights as authority engine | **Just shipped** | 3 posts is a foothold — needs cadence + categorization. |

Roughly **70% of Phase 3 is done**; the remaining 30% is where the site jumps from "functional" to "elite."

### 2.2 Prioritized improvement backlog

**P0 — Trust & correctness (ship this week)**
1. Fix the contact form (item A). Users contacting you right now are silently dropped. This is the only outright bug in production.
2. Reconcile `ARKEH_/ARKHE_` env var (item B).
3. Resolve `/system` vs `/verticals` (item C). Pick `/system`, redirect `/verticals`, fix back-links.

**P1 — Cleanup (next sprint)**
4. Replace homepage inline nav with `<SiteNav />`; convert all internal `<a>` to `<Link>` (items D + 1.3 lint).
5. Extract `lib/ventures.ts` and dedupe across `page.tsx`, `SystemDiagram`, `VentureGeomMap` (item E).
6. Mass-fix unescaped entities + remove `any` in `VentureGeomMap` (1.3).
7. Centralize background color and decide on the Geist font story (items G + H).

**P2 — Visual fidelity (the "elite jump")**
8. **Make `SystemDiagram` interactive.** Each node becomes a `<Link>` with a hover glow and a small popover preview. This is the highest-leverage visual upgrade you have left and it's <2 hrs of work.
9. **Add the motion layer to sub-pages.** Reuse `AmbientNetwork`'s star/line system but with lower density. Right now sub-pages feel like a different site than the homepage.
10. **Founder page repositioning.** Current page reads as a bio. Target: "system architect" framing — pull-quote, vertical-line timeline (Law / AI / Holdings columns), a single CTA. Steal layout cues from Palantir's "Why Palantir" page.
11. **Typography tuning.** Either load Geist via `next/font` or pick a serif/sans pair (e.g. Inter for UI, Fraunces for headers) and bind it through `app/layout.tsx`. Tighten tracking on H1s by another `-0.01em`.

**P3 — Authority engine (compounding moat)**
12. Add **categories/tags** to `lib/posts.ts` (`law`, `ai`, `structure`) and a filter UI on `/insights`. You have three posts; design the surface so post 30 still works.
13. Add an **RSS feed** at `/feed.xml` (Next 16 supports static route handlers; trivial). Anyone serious about insights as a moat ships an RSS feed.
14. Per-post **Open Graph image generation** via `@vercel/og`. Each insight needs a shareable card.
15. **Newsletter handoff** — currently `EmailCapture` only emails *you* on signup. Move subscribers into a real list (Resend Audiences, Buttondown, or ConvertKit). Today the list lives in your inbox.

**P4 — Long-tail polish**
16. Consolidate logo assets in `/public` (item 1.4).
17. Per-page metadata for the five vertical pages (most of them are missing `export const metadata`).
18. Accessibility pass: `prefers-reduced-motion` guard on the heavy SVG animations (`HeroNetwork`, `AmbientNetwork`); skip-to-content link; `alt=""` audit.
19. Add a `/work` or `/case-studies` shell — even with placeholder copy — so the strategy CTA has somewhere serious to land.

### 2.3 What NOT to do (per project guardrails)

- Don't add color outside the teal spectrum.
- Don't add bullet-heavy marketing pages. The site's voice is paragraphs, not feature lists.
- Don't bolt on a CMS yet — `lib/posts.ts` is the right primitive at three posts and even at thirty.
- Don't "modernize" the shield SVG. The heraldic style is the identity.

---

## PART 3 — ROLL-OUT PLAN

Four phases. Each is shippable on its own.

### Phase A — Trust patch (1 day, P0 items)

Goal: nothing in production is broken.

- [ ] Build `/api/contact` Resend route mirroring `/api/subscribe`.
- [ ] Replace Formspree fetch in `app/contact/page.tsx`.
- [ ] Standardize env var name; update Vercel and code together.
- [ ] Pick canonical verticals index; add a `redirects()` entry in `next.config.ts` for the loser; fix the five back-links.
- [ ] Smoke-test: submit contact form, submit subscribe form, click every nav link, click "All Verticals" on each vertical page.
- [ ] `npx vercel --prod`.

### Phase B — Cleanup (1–2 days, P1 items)

Goal: zero lint errors, single source of truth for nav and verticals.

- [ ] Replace homepage inline nav with `<SiteNav />`. Extract `<SiteFooter />` and use it on every page.
- [ ] Create `lib/ventures.ts`; refactor `app/page.tsx`, `SystemDiagram`, `VentureGeomMap`, `app/system/page.tsx` to import from it.
- [ ] Convert internal `<a>` → `<Link>` everywhere. Convert hero/nav `<img>` → `<Image>`.
- [ ] Escape stray `'` and `"` in copy. Type the `any` in `VentureGeomMap`.
- [ ] Centralize the dark background (`#04070a`) in one place; remove the light-mode CSS variables.
- [ ] Decide font: load Geist via `next/font` *or* delete the unused variables in `globals.css`.
- [ ] Lint goal: `npx eslint .` exits clean.

### Phase C — Motion + interactivity (3–5 days, P2 items)

Goal: the site looks elite, not just functional.

- [ ] `SystemDiagram` nodes become `<Link>`s with hover glow + popover. Tie copy to `lib/ventures.ts`.
- [ ] Add a low-density `AmbientNetwork` variant on each sub-page hero strip.
- [ ] Founder page: redesign as a system-architect page (pull-quote → three-column "Law · AI · Holdings" timeline → single CTA).
- [ ] Typography: load chosen font(s); tune tracking and hierarchy on H1/H2; check rhythm on `/about`, `/founder`, vertical pages.
- [ ] Add `prefers-reduced-motion` guards to `HeroNetwork` + `AmbientNetwork`.

### Phase D — Authority engine (1–2 weeks, P3 items)

Goal: every new insight compounds.

- [ ] Extend `Post` type with `tags: string[]`; add filter UI on `/insights`.
- [ ] RSS feed at `/feed.xml`.
- [ ] Per-post OG card generation via `@vercel/og`.
- [ ] Move email list to a real provider; rewrite `/api/subscribe` accordingly.
- [ ] Set a publishing cadence target (one post / two weeks).
- [ ] Add `/case-studies` placeholder so `/strategy` has a destination for "Inquire" follow-through.

### Definition of done per phase

- **A:** all forms submit successfully end-to-end; no orphan routes.
- **B:** `npx eslint .` returns 0 errors, 0 warnings; nav and ventures each have one source.
- **C:** every interactive element on the site has a hover state; sub-page heroes don't feel "flatter" than the homepage.
- **D:** new posts ship with no manual OG/metadata work; subscribers live in a list, not an inbox.

---

## Appendix — Files touched

- `app/api/subscribe/route.ts` — env var rename
- `app/contact/page.tsx` — Resend rewrite
- `app/page.tsx` — nav consolidation, ventures import, footer extraction
- `app/system/page.tsx` — interactive nodes, ventures import
- `app/verticals/page.tsx` — delete or redirect
- `app/{legal,technology,media,holdings,strategy}/page.tsx` — back-link fix, entity escapes, metadata exports
- `app/founder/page.tsx` — layout redesign
- `app/insights/page.tsx` — tag filter UI
- `app/globals.css` — color/font cleanup
- `app/layout.tsx` — font load (if chosen), AmbientNetwork conditional
- `components/SiteNav.tsx` — `<Link>` conversion, `<Image>` conversion
- `components/SystemDiagram.tsx` — interactivity
- `components/VentureGeomMap.tsx` — strict typing
- `lib/ventures.ts` — new
- `lib/posts.ts` — tag field
- `next.config.ts` — `redirects()` for `/verticals`
- `public/` — logo dedupe

End of report.
