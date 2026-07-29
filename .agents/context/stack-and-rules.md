# Invariants, Tech Stack & File Map

## Tech Stack
- Framework: Next.js 16.2.9, App Router, React 19 + React DOM 19, TypeScript 5.
- Styling: Tailwind CSS v4 (`@tailwindcss/postcss`). Fonts via
  `next/font/google`: **Lora** (headlines, exposed as `--font-bm-serif`) and
  **Inter** (body/UI). No icon font — all icons are inline SVG.
- Design system: **Editorial Bloom** (2026-07-21), recoloured to a
  gold/platinum/silver luxury palette on 2026-07-29. Palette is cream
  `#F2EFE9`, ink `#141414`, gold `#C5A059` (labels, underlines, small accent
  dots, and — inside `HowWeWork` only — the motion-graphic fills/nodes),
  platinum `#C0C7D0` (button fills, default underline colour), plus a
  chrome/platinum `.text-emphasis-gradient` utility used for every
  `BrandHeadline` emphasis word. No blue or coral remain anywhere except the
  frozen `LogoWordmark` (see [[subsystem-notes]]). Tokens defined in
  `src/app/globals.css`. Original spec:
  `docs/superpowers/specs/2026-07-21-editorial-bloom-identity-redesign.md`
  (colour values in that doc are now superseded).
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
