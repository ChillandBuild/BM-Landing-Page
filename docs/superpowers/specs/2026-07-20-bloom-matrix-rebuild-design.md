# Bloom Matrix Website Rebuild — Design System + Core Pages

Status: Draft, pending user review
Date: 2026-07-20
Related: `.agents/context/company-and-brand.md` (source of truth for all copy/positioning facts), `.agents/projects/active-backlog.md` (rebuild backlog item)

## Summary

Full visual and structural rebuild of the Bloom Matrix marketing site, replacing the current `src/app` implementation's visual system (teal accent, glassmorphic-only aesthetic) with a new one built directly from the Bloom Matrix logo and brand doc. Scope covers a shared design system plus five pages: Home, Services, Products (with a dedicated AIRA sub-page), About, and Contact — enough to give the SEO/AEO/GEO keyword strategy proper topical homes without overloading the homepage.

**Explicitly out of scope for this spec:** the AI chat assistant (skipped — see Open Questions), a blog/content-marketing system, client testimonials/case studies (no real ones exist yet), and any page beyond the five listed above. These are candidates for follow-up specs.

**Hard constraint:** this design must not reference or reuse any visual/structural pattern from the current/old `src/app` implementation. It was explicitly rejected by the user as a starting point. Inspiration comes only from: the logo, the brand doc, and the four named reference sites (unicorn.studio, coda.io, euveka.com, gladia.io).

## Brand & Visual System

**Color palette** — pulled directly from the logo (navy-to-indigo gradient), not the old teal accent:
- Background (dark sections): near-navy `#0A0F1F`
- Background (light sections): off-white/paper `#FAFAF8`
- Primary accent: indigo-blue gradient, `#101A3D → #3D5AC2 → #5C7FE0`
- Text on dark: `#F2F4F8` (primary), `#8993B8` (secondary/muted)
- Text on light: `#0A0F1F` (primary), `#6B7280` (secondary/muted)
- Borders on light: `#E5E7EB`

**Mood** — hybrid, light-first (revised 2026-07-20 per user direction, superseding the original dark-hero plan):
- Hero + nav: light (paper background with soft blue-gradient washes and the ambient 3D visual adapted to light; blue-gradient wordmark/logo treatment)
- Body content (services, products, process, FAQ): light editorial (off-white, dense but calm, Coda-style information density without clutter)
- Navy retained as accent bands only: positioning strip, value-props section, CTA band, footer — bookending the light pages

**Typography**:
- Headlines (H1/H2, hero statements): **Instrument Serif** — thin, high-contrast, quietly premium. Matches the Euveka reference without tipping into luxury-fashion (Playfair) or literary (Newsreader) territory.
- Secondary accent use only (pull-quotes, if any editorial callouts appear later): Newsreader Italic.
- Body copy, UI labels, nav: **Inter** (already in use, keep).
- Rationale: an upright serif is more versatile across a multi-page system (product headlines, section titles, nav-adjacent labels) than an italic display face, which reads better in small doses than as a whole system.

**Imagery standard (hard requirement)**: all visuals — the 3D hero, section imagery, product panels — must read as custom-built and premium, never as generic AI-generated stock art. Concretely: the hero is a **code-generated WebGL/shader scene** (abstract geometry/particles in the navy/indigo palette via three.js), not a rendered image. Where bitmap imagery is unavoidable, use real UI mockups/screenshots or custom illustration, not AI-art-style renders.

## Sitemap & Information Architecture

| Page | Route | Role | Keyword focus |
|---|---|---|---|
| Home | `/` | Brand impression, overview, primary conversion path | Light-touch: "AI-first product engineering company," "Bloom Matrix" |
| Services | `/services` | Deep dive on all 6 core service areas | Service-specific: "AI agent development," "SaaS platform engineering," "business automation," "data & analytics," etc. |
| Products | `/products` | Overview of AIRA + AstroTamil | "Bloom Matrix products," "AI-powered business platforms" |
| AIRA | `/products/aira` | Flagship product deep-dive, own URL | "AI revenue acceleration platform," "conversational AI lead management," "AI telecalling" |
| About | `/about` | Founding philosophy, vision/mission, core values | E-E-A-T-heavy: company identity, "who is Bloom Matrix" |
| Contact | `/contact` | Dedicated conversion page beyond the footer | Contact/location entity signals |

All five pages share one design system: `<SiteHeader>` (sticky nav, transparent-to-navy on scroll), `<SiteFooter>` (navy, contact + legal links), and the same color/type tokens. This replaces the current single-page `Header` + inline footer in `src/app/page.tsx`.

**Keyword-without-clutter mechanism**: each page carries its own scoped FAQ block (e.g. `/services` answers "what does Bloom Matrix build," `/products/aira` answers AIRA-specific questions) rather than one large homepage FAQ. Internal links (Home → Services → AIRA → Contact) build topical authority without any single page absorbing all the keyword depth.

## Homepage — Section by Section

1. **Nav** — sticky; transparent over the hero, solidifies to navy on scroll. Logo, Products / Services / About / Contact, persistent "Book a Strategy Call" CTA button.
2. **Hero** (dark cinematic) — code-generated 3D ambient background (see Imagery standard), eyebrow badge, Instrument Serif headline, Inter subheadline, dual CTA (Book a Strategy Call + Explore Products).
3. **Positioning strip** — short, declarative statement sourced from the brand doc's Founding Philosophy: not an IT service provider or dev shop, but a single long-term AI-first product engineering partner.
4. **Value props — sticky-scroll swap** — 4–5 statements drawn from the brand doc's Core Philosophy (scalable, intelligent, secure, continuously evolving, etc.). Text stack scrolls on one side; a pinned visual panel on the other crossfades per statement (the unicorn.studio "Unlock a Whole New Dimension" pattern).
5. **Core Service Areas** (light editorial) — dense grid covering all 6 service areas from the brand doc, with real descriptions from the doc — not filler copy. Links out to `/services` for depth.
6. **Featured Product: AIRA** — recreated live-simulation panel (Signature Verified → RAG Query Context → Lead Routed → Telecaller Logged, cycling), copy sourced from the real AIRA product page. Smaller secondary card for AstroTamil. Links to `/products/aira`.
7. **How We Work** — process-steps section (Discover → Design → Build → Deploy → Evolve) using Gladia's elegant transition/motion style. Replaces a testimonials section — no client claims, since none exist yet.
8. **AEO/FAQ** — 5–8 high-value questions (What does Bloom Matrix do? Is it a software agency or a product company? What is AIRA? What industries does it serve?), marked up with `FAQPage` JSON-LD, answered in self-contained, quotable sentences.
9. **Final CTA band + Footer** — navy bookend; footer contact email `bloommatrixtech@gmail.com`, nav links, legal links. No physical address (not provided — `Organization` schema used instead of `LocalBusiness`).

Services, Products/AIRA, About, and Contact pages follow the same visual system (light-editorial body, navy hero/footer bookend) with content drawn directly from the brand doc; their section-level detail will be worked out during implementation planning rather than exhaustively pre-specified here, since the pattern (hero → topical content → scoped FAQ → CTA) is now established.

## SEO / AEO / GEO Strategy

**SEO** — semantic heading hierarchy (one H1/page), descriptive per-page meta titles/descriptions via Next.js `metadata` API, OG/Twitter card images, image alt text throughout, `sitemap.xml` + `robots.txt`, Core Web Vitals discipline (3D hero lazy-mounts and never blocks LCP).

**AEO (Answer Engine Optimization)** — content structured for direct extraction/citation by AI assistants (ChatGPT, Perplexity, Google AI Overviews):
- `FAQPage` JSON-LD on every page's scoped FAQ block, written as self-contained declarative answers, not marketing copy.
- `Organization` JSON-LD (name, logo, URL, sameAs, contact email) present sitewide for stable entity attribution.
- Early, declarative claim-statements in each major section (AI answer engines favor extractable facts over narrative buildup).

**GEO/AGO** — same schema mechanisms as AEO, plus consistent entity signals (name/email, "Coimbatore, Tamil Nadu, India" stated as origin only — not a regional-targeting claim, per the global-first positioning decision) and copy that explicitly disambiguates Bloom Matrix from generic "software agency" / "web dev shop" categorization, reinforcing the "Product Engineering Company" identity.

## Explicitly Deferred (Open Backlog for Future Specs)

- AI chat assistant — skipped for this phase; cost/approach (cheap paid API vs. free-tier vs. skip) was discussed and deferred, not decided against permanently.
- Blog / long-form content marketing system — no content ops in place yet.
- Real client testimonials/case studies — none exist; do not fabricate (explicit brand-doc rule against unsupported claims). Add once real ones exist.
- Additional product sub-pages (e.g. dedicated AstroTamil page) if it grows into a second flagship.

## Open Items / Placeholders Needing Confirmation

- Footer contact: `bloommatrixtech@gmail.com` confirmed ,physical address : Coimbatore , Tamil Nadu , India . No phone number  provided — flag if either should be added (affects whether `Organization` or `LocalBusiness` schema is used).
- Exact FAQ question sets per page will be drafted during implementation using brand-doc content; not exhaustively pre-written here to avoid the spec going stale before build.
