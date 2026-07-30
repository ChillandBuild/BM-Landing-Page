# Historical Decisions & Migrations

## Migration Index
| date | migration file | what changed |
|---|---|---|
| 2026-07-02 | `403f4b0` | Initial commit from `create-next-app`. |
| 2026-07-02 | `3a37edc` | `feat: build Bloom Matrix landing page` — the current `src/app/page.tsx` hero/services/AIRA/contact/footer layout. |
| 2026-07-02 | `e78e11e` | Added `vercel.json` rewrite proxying `/aira*` to the external Aira AI MVP deployment. |
| 2026-07-02–10 | `2cbfed0`..`54a6bc1` | A run of "hello"/"heeloo"/"reverted the hello" commits — no functional decision content, appear to be test/sanity commits. |

## Decisions
| date | decision | why | what was rejected |
|---|---|---|---|
| 2026-07-19 | Root-level static `index.html`/`style.css`/`script.js` are leftover/experimental, not a rebuild target for now | Confirmed with user while bootstrapping the second brain | Treating the static files as an in-progress migration away from Next.js |
| — | Rebuilding the Bloom Matrix site from scratch is the plan going forward | User stated intent while bootstrapping the second brain (2026-07-19) | Continuing to iterate incrementally on the current `src/app` implementation |
| 2026-07-19 | Added `.agents/context/company-and-brand.md` as the source-of-truth for company identity, positioning, products (AIRA, AstroTamil), tone, and brand rules | User supplied the full brand/company doc directly; it governs all future customer-facing copy | Inferring company facts/positioning from the existing landing page copy alone |
| 2026-07-21 | Replaced the whole visual identity with **Editorial Bloom** — Cutout mark, Bracket wordmark, blue/cream/coral/ink palette, BM Serif headlines | Previous navy/indigo system was rejected by the user as generic, templated and not premium; full option history is archived in `docs/design-gallery/` | Iterating on the 2026-07-20 navy/indigo system; a baked COLR colour font for BM Serif (marks are overlaid by `<BrandHeadline>` instead) |
| 2026-07-29 | Recoloured Editorial Bloom off blue/coral entirely, onto gold `#C5A059` / platinum `#C0C7D0` / a chrome-platinum emphasis gradient, keeping cream/ink; also swapped `ValuePropsSticky`'s flower-motif visual for the real silver `LogoMark` | User supplied a `design-preview.html` luxury (obsidian/silver/gold) mockup and asked for a site-wide colour-only pass — no blue or coral anywhere | Kept blue/coral as an accepted secondary palette; a partial recolour that left some sections blue |
| 2026-07-29 | Renamed the `--color-gold` token (and every `bg-gold`/`text-gold`/`border-gold` usage, plus `ACCENT_GOLD` in `flowerGeometry.ts`) to `--color-oxblood` `#7A2331`, site-wide — same day as the gold/platinum pass above | User reviewed 4 candidate red shades live via a picker on a new `/design-review` internal page and chose Oxblood Bordeaux for its luxury-fashion, high-contrast (~8.7:1) read | Terracotta, Crimson, and Garnet as the primary accent; Rosewood/Maroon (highest contrast but visually indistinguishable from Ink) |
| 2026-07-30 | Replaced `LogoWordmark`'s bracket `[ bloom ]` + coral `m×n` treatment with plain "BLOOM MATRIX" text, and gave every "A"/"a" in it an inverted-V mark (no crossbar) via a new `BrandWordmarkText` component, used in both the footer lockup and the header logo link | Direct user request, overriding the 2026-07-21/29 "frozen, never restyle" note on this component | Keeping the bracket/superscript treatment; a full SVG-only redesign (kept it as accessible HTML/CSS text instead, matching the header's existing plain-text approach) |

