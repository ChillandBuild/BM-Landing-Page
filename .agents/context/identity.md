# Identity, Dev Persona & Code Style

## Who is working on this
Solo dev (Aishvarya Govindaraju) building the Bloom Matrix marketing/landing site.
Plan is to rebuild the site from scratch rather than continue iterating on the
current Next.js implementation — see [[active-backlog]] for the rebuild note.

## Response Conventions
- Terse, low-narration. Make reasonable calls without stopping to ask unless
  genuinely blocked or a decision is destructive/hard to reverse.
- No unsolicited summaries or docs — match the existing CLAUDE.md/AGENTS.md
  style of short, direct instructions.

## Code Style Rules
- TypeScript strict mode is on (`tsconfig.json`) — don't loosen it.
- ESLint config is `eslint-config-next` (core-web-vitals + typescript) via
  flat config in `eslint.config.mjs`. `@next/next/no-img-element` is
  deliberately turned off (plain `<img>` is fine, no forced `next/image`).
- Tailwind CSS v4 (via `@tailwindcss/postcss`), utility-first, no separate
  CSS modules per component observed so far.
