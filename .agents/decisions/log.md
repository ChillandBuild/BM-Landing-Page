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

