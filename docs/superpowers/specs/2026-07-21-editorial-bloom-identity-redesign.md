# Bloom Matrix — "Editorial Bloom" Identity & Site Redesign

Status: Approved via visual brainstorm (browser companion), pending final spec review
Date: 2026-07-21
Supersedes: `2026-07-20-bloom-matrix-rebuild-design.md` (visual system only — its IA, SEO/AEO/GEO strategy, and content rules remain in force)
Related: `.agents/context/company-and-brand.md` (source of truth for all copy facts), `docs/design-gallery/` (full archive of every explored option, with the locked identity recorded in `index.html`)

## Summary

Complete visual identity redesign — new logo, new wordmark, new palette, new design language — replacing the one-day-old navy/indigo "light editorial" system, which the user rejected as generic, non-premium, and wrong in direction. The new direction, **Editorial Bloom**, was chosen and refined across four interactive rounds (all preserved in `docs/design-gallery/`). The five-page structure, routing, and SEO/AEO machinery from the previous build are retained; every page is re-skinned in the new system.

## Locked Identity (user-approved, do not deviate)

**The mark — "The Cutout":** a Matrix Blue rounded-square tile (`rx` ≈ 26/120 of width) with a four-petal flower cut out in negative space (Paper Cream petals), rotated 45° into an ✕, with a Seed Coral dot core at center. Exact geometry lives in the identity sheet (`docs/design-gallery/identity-sheet.html`); petal path (pre-rotation): `M60 14 C74 38 74 54 60 60 C46 54 46 38 60 14 Z` and rotations thereof in a 120×120 viewBox, core `r=9`. It holds up at 16px — no simplified favicon variant needed.

**The wordmark — "The Bracket":** lowercase `bloom` in Inter Bold, wide letter-spacing, enclosed in square mathematical matrix brackets (Matrix Blue strokes, square linecaps), with a small Seed Coral `m×n` superscript at the top-right bracket. The word "matrix" appears only through the brackets and superscript — never spelled out in the lockup. On dark backgrounds the letters flip to Paper Cream; brackets stay blue, `m×n` stays coral.

**One flower rule:** every flower rendered anywhere on the site (logo, hero, section accents, OG images) uses the EXACT same petal geometry, ✕ orientation, cream fill, and coral core as the mark. No redrawn, recolored, or re-proportioned variants. (This rule exists because a near-match flower was caught and rejected during review.)

**Palette:**

| Token | Name | Hex | Role |
|---|---|---|---|
| `--color-blue` | Matrix Blue | `#1747E0` | Hard color blocks, brackets, links, emphasis |
| `--color-cream` | Paper Cream | `#F2EFE9` | Page background, flower petals, text-on-dark |
| `--color-coral` | Seed Coral | `#FF6B4A` | Flower core, primary CTA, small accents only |
| `--color-ink` | Ink | `#141414` | Body text, headlines, footer background |

Coral is an accent, never a surface color for large areas. No other hues enter the system (no teal, navy, indigo, green).

**Typography:**
- Headlines: **"BM Serif"** — a brand-modified build of Lora (SIL OFL permits modification + renaming): every lowercase "o" glyph carries a Seed Coral dot in its counter ("seeded o", user-approved 2026-07-21; simulation in `docs/design-gallery/` companion round). Built with font tooling (e.g., fontTools) from Lora Regular/Bold + italics; used at display sizes (H1/H2) only. Other explored mods (matrix "x", coral tittle) were declined — do not add them. If the modified font isn't ready at build time, stock Lora is the interim fallback with identical metrics.
- Italic + Matrix Blue remains the standard emphasis pattern inside headlines (e.g., "We build products that *think*.").
- Sub-text, body, UI, nav, wordmark: **Inter** (retained, unmodified).
- Max two families, `font-display: swap`, preload only critical weights (performance budget rules apply).

## Design Language

- **Paper-first:** cream background everywhere; ink text; generous editorial whitespace.
- **Hard color blocks:** flat Matrix Blue rectangles that bleed to viewport edges — no gradients, no glassmorphism, no glows. Sharp edges (border-radius 2px on buttons/chips; blocks have none).
- **Boundary-crossing composition:** key visuals (the flower foremost) straddle the edge between blue blocks and cream paper, with text layered over them — the signature move the user picked from the hero mockup.
- **Dot-grid accents:** fine ink dot grids (low opacity) may texture cream sections sparingly — a nod to the matrix, not a wallpaper.
- **Buttons/chips:** near-square (2px radius). Primary CTA = coral block with ink text; secondary = underlined text with a 2px blue or coral underline; nav CTA = ink block with cream text.

## Homepage Hero (locked composition)

- Cream field; Matrix Blue block occupying the right ~42% full-bleed.
- The brand flower (~320–360px on desktop) straddles the block's left edge — half on blue, half on paper — with a soft drop shadow (`0 8px 28px rgba(20,20,20,.16)`) so cream petals read against cream paper.
- Nav: mark + Bracket wordmark left; Products / Services / About links + ink Contact chip right.
- Content column over the flower: blue uppercase kicker ("AI-first product engineering"), serif headline "We build products that *think*." (54–60px), short subline, coral "Start a project →" CTA + underlined "Explore products" link.
- **Signature interaction — the spinning flower:** mouse movement drives the hero flower's rotation. Pointer velocity adds angular momentum; friction decays it back to rest (a flick spins it, then it eases out). Implementation: `transform: rotate()` only, driven via `requestAnimationFrame`; listener on the hero section, passive. Touch/no-pointer devices: slow scroll-linked rotation instead. `prefers-reduced-motion: reduce`: flower is static. The nav mark does not spin.

## Page System (all five pages re-skinned)

Retained from the previous spec unchanged: routes (`/`, `/services`, `/products`, `/products/aira`, `/about`, `/contact`), per-page scoped FAQ blocks with `FAQPage` JSON-LD, `Organization` JSON-LD, per-page metadata, sitemap/robots, internal-linking strategy, copy sourced only from the brand doc, no fabricated testimonials, AIRA live-simulation panel concept, footer contact (`bloommatrixtech@gmail.com`, Coimbatore origin statement).

Re-skinned in the new system:
- Sub-page heroes: cream field + blue block (position may vary per page: right, top band, or left) + the flower at reduced scale crossing the boundary; serif headline over it.
- Section rhythm: light editorial body on cream; blue blocks used as section dividers/emphasis bands instead of the old navy bands; footer is Ink (not navy) with cream wordmark.
- The AIRA panel and service grids adopt the 2px-radius, hard-edge, cream/blue/coral treatment.

## Assets To Produce

- **BM Serif font files** (woff2, Regular + Bold + italics) generated from Lora with the seeded-"o" glyph modification, self-hosted.
- `LogoBM` component rewritten to render the new mark + Bracket wordmark (inline SVG, no bitmap).
- `favicon.ico` / icon set and `opengraph-image.tsx` regenerated from the new mark and palette.
- Remove all remnants of the old system: teal/navy/indigo tokens, Instrument Serif, glassmorphic styles, the old ambient/3D hero treatment.

## Out of Scope (unchanged from previous spec)

AI chat assistant; blog/content system; testimonials/case studies (none exist — do not fabricate); additional product sub-pages. The full text typeface ("invent a font") was explicitly scoped down with user agreement: the Bracket logotype is the custom lettering; body/headline text uses licensed fonts.

## Decision Trail

The complete option history — 4 direction candidates, 13 marks, 15 wordmarks, hero variants, and what was rejected at each step — is archived as browsable HTML in `docs/design-gallery/` (start at `index.html`). If the user later wants to revisit any choice, that archive is the reference; this spec records only the locked outcome.
