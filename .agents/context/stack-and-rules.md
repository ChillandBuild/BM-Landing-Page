# Invariants, Tech Stack & File Map

## Tech Stack
- Framework: Next.js 16.2.9, App Router, React 19 + React DOM 19, TypeScript 5.
- Styling: Tailwind CSS v4 (`@tailwindcss/postcss`). Fonts via
  `next/font/google`: **Lora** (headlines, exposed as `--font-bm-serif`) and
  **Inter** (body/UI). No icon font — all icons are inline SVG.
- Design system: **Editorial Bloom** (2026-07-21). Palette is exactly four
  colours — blue `#1747E0`, cream `#F2EFE9`, coral `#FF6B4A`, ink `#141414` —
  defined in `src/app/globals.css`. See
  `docs/superpowers/specs/2026-07-21-editorial-bloom-identity-redesign.md`.
- Testing: Vitest (`npm run test:unit`) for pure logic, Playwright
  (`npm run test:e2e`) for page smoke + visual checks.
- Hosting: Vercel (`vercel.json`), `npm run dev|build|start` map to
  `next dev|build|start`.
- No backend/DB in this repo — it's a marketing landing page + a contact form
  (`src/components/ContactForm.tsx`) and an external product (Aira) linked in.

## Hard Invariants
- `vercel.json` rewrites `/aira` and `/aira/:path*` to the separately deployed
  `https://aira-ai-mvp.vercel.app` app — don't remove without confirming Aira
  routing is meant to move elsewhere.
- `tsconfig.json` strict mode must stay on.
- The `src/app` Next.js app is the tracked, real implementation. Do not treat
  the untracked root-level `index.html` / `style.css` / `script.js` / `assets/`
  as the live site — see [[subsystem-notes]] for why they exist.

## File Map
- `src/app/layout.tsx` — root layout, fonts, global metadata.
- `src/app/page.tsx` — the single landing page: hero, services bento, Aira
  product callout, contact form, "Why Bloom Matrix" section, footer.
- `src/components/SiteHeader.tsx` / `SiteFooter.tsx` — shared chrome.
- `src/components/brand/` — the brand primitives. `BrandFlower` is the single
  source of the flower (the "one-flower rule"); `LogoMark` (Cutout tile),
  `LogoWordmark` (frozen Bracket wordmark — never restyle), `LogoLockup`,
  and `BrandHeadline` (BM Serif + seeded-o / coral-tittle marks).
- `src/hooks/useSpinningFlower.ts` + `src/lib/spin.ts` — hero flower momentum.
- `src/components/ContactForm.tsx` — contact form panel.
- `src/app/icon.tsx` / `src/app/opengraph-image.tsx` — generated favicon and OG
  card. Both draw the flower unrotated and rotate via CSS: the OG renderer
  ignores SVG group transforms, and it cannot parse variable fonts (hence the
  static `src/app/_fonts/Lora-Regular.ttf`).
- `public/images/` — static image assets referenced by the Next app
  (e.g. `/images/logo.png`).
- Root-level `index.html`, `style.css`, `script.js`, `assets/`, `web` —
  untracked, not part of the live app. See [[subsystem-notes]].
