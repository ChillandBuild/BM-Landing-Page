# Invariants, Tech Stack & File Map

## Tech Stack
- Framework: Next.js 16.2.9, App Router, React 19 + React DOM 19, TypeScript 5.
- Styling: Tailwind CSS v4 (`@tailwindcss/postcss`), custom fonts loaded via
  `next/font/google` (Hanken Grotesk, Inter, Geist, Geist Mono) plus a
  hand-linked Material Symbols stylesheet in `src/app/layout.tsx`.
- 3D/visual: `three` is a dependency — used by `AmbientBackground` component
  for the cinematic background effect.
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
- `src/components/Header.tsx` — nav.
- `src/components/AmbientBackground.tsx` — three.js-driven background.
- `src/components/ContactForm.tsx` — sticky contact form panel.
- `src/components/LogoBM.tsx` — logo component.
- `public/images/` — static image assets referenced by the Next app
  (e.g. `/images/logo.png`).
- Root-level `index.html`, `style.css`, `script.js`, `assets/`, `web` —
  untracked, not part of the live app. See [[subsystem-notes]].
