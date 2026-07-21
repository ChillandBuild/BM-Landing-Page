# Editorial Bloom Identity & Site Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the site's entire visual identity (logo, wordmark, palette, typography, hero, page chrome) with the approved "Editorial Bloom" system, applied across all five pages.

**Architecture:** A small set of brand primitives (logo mark, bracket wordmark, brand flower, seeded-serif headline, spin hook) is built first and unit-tested where there is real logic. Every page and shared-chrome component is then recomposed to consume those primitives and the new design tokens. Old-system code (navy/indigo tokens, Instrument Serif, glassmorphism, three.js `AmbientBackground`) is removed last, once nothing references it.

**Tech Stack:** Next.js 16.2.9 (App Router), React 19, TypeScript 5 (strict), Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`), `next/font/google`, framer-motion 12. New dev deps: Vitest (unit tests for pure logic), Playwright (visual smoke + screenshots).

**Source of truth:**
- Design spec: `docs/superpowers/specs/2026-07-21-editorial-bloom-identity-redesign.md`
- Exact geometry & mockups: `docs/design-gallery/` (open `identity-sheet.html`, `hero-flower-unified.html`, `bm-serif-glyphs.html`, `final-gallery.html` in a browser). When this plan and a gallery file disagree on a pixel, the gallery wins — copy from it.

## Global Constraints

- **Palette — the ONLY colors in the system.** `Matrix Blue #1747E0`, `Paper Cream #F2EFE9`, `Seed Coral #FF6B4A`, `Ink #141414`. No teal, navy, indigo, gradient, glow, or any other hue. Coral is an accent only — never a large surface fill.
- **One-flower rule.** Every flower rendered anywhere (logo, hero, accents, favicon, OG) uses the EXACT petal geometry, 45°/✕ orientation, cream fill `#F2EFE9`, coral core `#FF6B4A` from `<BrandFlower>`. No redrawn/recolored/re-proportioned variants.
- **Typography.** Headlines (H1/H2 display) use **BM Serif** = self-hosted **Lora** rendered through `<BrandHeadline>`, which overlays the coral **seeded-"o"** and **coral-tittle** glyph mods at the component layer (see Task 1.4 note). The matrix-"x" mod is declined — never add it. Sub-text, body, UI, nav, and the wordmark use **Inter** (unmodified). Italic + Matrix Blue is the standard in-headline emphasis (e.g., "…that *think*.").
- **The Bracket wordmark is frozen.** `[bloom]` in plain Inter Bold with the coral `m×n` superscript, exactly as in `identity-sheet.html`. Never re-render it in BM Serif; never add glyph mods to it.
- **Edges.** Color blocks bleed full-width to viewport edges, no radius. Buttons/chips use `2px` radius (`rounded-[2px]`). No gradients anywhere.
- **Motion.** Animate `transform`/`opacity` only. Everything motion-related must honor `prefers-reduced-motion: reduce` (static fallback). The hero flower spins on pointer movement; the nav mark never spins.
- **TypeScript strict stays on** (`tsconfig.json`). No `any` in app code. Exported functions/props get explicit types.
- **Do not touch** `vercel.json` `/aira` rewrites. Do not treat root-level untracked `index.html`/`style.css`/`script.js` as the live site.
- **Copy is unchanged.** This redesign changes visuals, not marketing copy. Keep the text content already in each component/`src/lib/content/*`. All copy facts remain sourced from `.agents/context/company-and-brand.md` — invent nothing.
- **Commit after every task.** Conventional Commits (`feat:`, `refactor:`, `chore:`, `test:`). Do not use `git commit` flags that skip hooks unless a hook is genuinely broken.

**Color-remap table** (authority for every mechanical class swap in Phases 3–5; old class on the left is being removed):

| Old class | New class | Notes |
|---|---|---|
| `bg-paper` | `bg-cream` | page background |
| `bg-navy` | `bg-ink` | dark bands (footer, CTA) |
| `text-ink` (old light) | `text-cream` | text on dark surfaces |
| `text-ink-muted` | `text-cream/70` | muted text on dark |
| `text-ink-dark` | `text-ink` | primary text on cream |
| `text-ink-dark-muted` | `text-ink/65` | muted text on cream |
| `text-accent`, `text-accent-light` | `text-blue` | accents/links |
| `bg-accent`, `bg-accent-light` | `bg-blue` | — |
| `border-accent` | `border-blue` | — |
| `border-border-light` | `border-ink/10` | dividers on cream |
| `border-border-dark`, `border-navy` | `border-cream/12` | dividers on ink |
| `bg-gradient-indigo text-white` | `bg-coral text-ink` | PRIMARY cta → coral block, ink text |
| `text-gradient-indigo` | `text-blue` | inline emphasis (headlines use `<BrandHeadline emphasis>` instead) |
| `rounded-xl`, `rounded-2xl` (buttons/chips) | `rounded-[2px]` | sharp edges |
| `shadow-accent/20`, `shadow-lg shadow-*` | remove (or `shadow-sm shadow-ink/5`) | no glow |
| `font-display` | keep class name, now maps to Inter fallback; real headings become `<BrandHeadline>` | see Task 0.1 |

**Nav model (from mockups, applies to header + footer):** links = `Products` `/products`, `Services` `/services`, `About` `/about`; the CTA is a `Contact` chip → `/contact`, styled `bg-ink text-cream rounded-[2px]`. (Replaces the old "Book a Strategy Call" button.)

---

## Phase 0 — Design tokens & fonts

### Task 0.1: Replace palette tokens & remove gradient/glass CSS

**Files:**
- Modify: `src/app/globals.css:1-90` (the `@theme` block and custom classes)

**Interfaces:**
- Produces: Tailwind utilities `bg-blue` `text-blue` `border-blue`, `bg-cream` `text-cream`, `bg-coral` `text-coral`, `bg-ink` `text-ink` `border-ink`. CSS var `--font-bm-serif`, `--font-inter`. Removes `.text-gradient-indigo`, `.text-gradient-indigo-bright`, `.bg-gradient-indigo`, `.font-display` scaleX hack, and all `--color-navy/paper/indigo*/accent*/ink*` tokens.

- [ ] **Step 1: Rewrite the `@theme` block and custom classes.** Replace the entire top of `src/app/globals.css` (lines 1 through the end of the `body{}` block) with:

```css
@import "tailwindcss";

@theme {
  /* Editorial Bloom palette — the only colors in the system */
  --color-blue: #1747E0;
  --color-cream: #F2EFE9;
  --color-coral: #FF6B4A;
  --color-ink: #141414;

  /* Fonts */
  --font-bm-serif: var(--font-lora);   /* BM Serif base; glyph mods applied by <BrandHeadline> */
  --font-inter: var(--font-inter-family);

  /* Spacing (kept) */
  --spacing-section-gap: 96px;
  --spacing-container-margin: 24px;
  --spacing-base: 8px;
  --spacing-gutter: 16px;
}

/* Headline display face fallback. Real brand headings use <BrandHeadline>;
   this class exists only so any stray heading still lands on the serif. */
.font-display {
  font-family: var(--font-bm-serif), Georgia, serif;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--color-blue) !important;
  box-shadow: 0 0 0 3px rgba(23, 71, 224, 0.15);
}

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

body {
  background-color: var(--color-cream);
  color: var(--color-ink);
  overflow-x: hidden;
  min-height: 100vh;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Verify no stale token names remain in the file.**

Run: `grep -nE "navy|paper|indigo|accent|gradient|scaleX" src/app/globals.css`
Expected: no output (exit 1).

- [ ] **Step 3: Commit.**

```bash
git add src/app/globals.css
git commit -m "refactor: replace palette tokens with Editorial Bloom system"
```

Note: the site will not fully build until Task 0.2 (fonts) and Phase 2+ (component swaps) are done. That is expected mid-plan; build is verified at the end of each phase, not each task, for visual tasks.

### Task 0.2: Load Lora + Inter, drop Instrument Serif & Material Symbols font link

**Files:**
- Modify: `src/app/layout.tsx:1-77`

**Interfaces:**
- Consumes: none.
- Produces: `--font-lora` and `--font-inter-family` CSS vars on `<html>`. `<body>` classes use new tokens.

- [ ] **Step 1: Replace the font imports and their configs.** In `src/app/layout.tsx`, replace lines 1-19 with:

```tsx
import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { organizationSchema, SITE_URL } from "@/lib/schema";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
```

- [ ] **Step 2: Update the `<html>` className and remove the Material Symbols `<link>`.** Replace the `<html …>` opening tag's className and delete the `<link href="https://fonts.googleapis.com/css2?family=Material+Symbols…" />` element inside `<head>`. The `<html>` tag becomes:

```tsx
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lora.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-cream text-ink font-inter">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
```

- [ ] **Step 3: Find every Material Symbols usage (they must all be replaced with inline SVG or text in later tasks).**

Run: `grep -rn "material-symbols" src`
Expected: a list (SiteFooter, SiteHeader, possibly ContactForm/FAQ). Record these paths — each is handled in its component's task (Phases 2–4). The icon font is now gone, so any leftover `material-symbols-outlined` span renders as empty text and must be replaced.

- [ ] **Step 4: Commit.**

```bash
git add src/app/layout.tsx
git commit -m "feat: load Lora + Inter, drop Instrument Serif and icon font"
```

---

## Phase 1 — Test infra & brand primitives

### Task 1.1: Add Vitest + Playwright

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`, `playwright.config.ts`, `tests/e2e/.gitkeep`

**Interfaces:**
- Produces: `npm run test:unit` (Vitest), `npm run test:e2e` (Playwright) scripts.

- [ ] **Step 1: Install dev deps.**

```bash
npm install -D vitest@^2 @vitejs/plugin-react@^4 jsdom@^25 @testing-library/react@^16 @testing-library/jest-dom@^6 @playwright/test@^1
npx playwright install chromium
```

- [ ] **Step 2: Create `vitest.config.ts`.**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", globals: true, include: ["src/**/*.test.{ts,tsx}"] },
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});
```

- [ ] **Step 3: Create `playwright.config.ts`.**

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  webServer: { command: "npm run build && npm run start", url: "http://localhost:3000", reuseExistingServer: !process.env.CI, timeout: 180_000 },
  use: { baseURL: "http://localhost:3000" },
  projects: [
    { name: "mobile", use: { ...devices["Pixel 5"], viewport: { width: 320, height: 800 } } },
    { name: "tablet", use: { viewport: { width: 768, height: 1024 } } },
    { name: "laptop", use: { viewport: { width: 1024, height: 800 } } },
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
  ],
});
```

- [ ] **Step 4: Add scripts to `package.json`** (`"scripts"` block): add `"test:unit": "vitest run"`, `"test:e2e": "playwright test"`, `"typecheck": "tsc --noEmit"`. Create `tests/e2e/.gitkeep` (empty).

- [ ] **Step 5: Verify Vitest runs (no tests yet is fine).**

Run: `npm run test:unit`
Expected: exits 0 with "No test files found" or similar.

- [ ] **Step 6: Commit.**

```bash
git add package.json package-lock.json vitest.config.ts playwright.config.ts tests/e2e/.gitkeep
git commit -m "test: add Vitest and Playwright harness"
```

### Task 1.2: `<BrandFlower>` primitive (the one-flower rule, single source)

**Files:**
- Create: `src/components/brand/BrandFlower.tsx`
- Test: `src/components/brand/BrandFlower.test.tsx`

**Interfaces:**
- Produces: `export default function BrandFlower(props: { size?: number; rotation?: number; className?: string; style?: CSSProperties; shadow?: boolean }): JSX.Element`. Renders the exact petal geometry (cream petals, coral core) in a 120×120 viewBox. `rotation` (deg) is applied on top of the base 45° ✕ orientation via an outer wrapper so the spin hook can drive it. Default `rotation=0`, `size=120`.

- [ ] **Step 1: Write the failing test.**

```tsx
import { render } from "@testing-library/react";
import BrandFlower from "./BrandFlower";

test("renders four cream petals and a coral core", () => {
  const { container } = render(<BrandFlower size={120} />);
  const petals = container.querySelectorAll('path[fill="#F2EFE9"]');
  expect(petals.length).toBe(4);
  const core = container.querySelector('circle[fill="#FF6B4A"]');
  expect(core).not.toBeNull();
});

test("applies rotation via transform on the wrapper group", () => {
  const { container } = render(<BrandFlower rotation={30} />);
  expect(container.querySelector('[data-flower-spin]')?.getAttribute("transform")).toContain("rotate(30");
});
```

- [ ] **Step 2: Run test to verify it fails.**

Run: `npm run test:unit -- BrandFlower`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement `BrandFlower.tsx`.** Petal paths and core are copied verbatim from `docs/design-gallery/hero-flower-unified.html` (the locked ✕ flower).

```tsx
import type { CSSProperties } from "react";

interface BrandFlowerProps {
  size?: number;
  rotation?: number;
  className?: string;
  style?: CSSProperties;
  shadow?: boolean;
}

export default function BrandFlower({ size = 120, rotation = 0, className, style, shadow = false }: BrandFlowerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      style={{ filter: shadow ? "drop-shadow(0 8px 28px rgba(20,20,20,0.16))" : undefined, ...style }}
      aria-hidden
    >
      <g data-flower-spin transform={`rotate(${rotation} 60 60)`}>
        <g transform="rotate(45 60 60)">
          <g fill="#F2EFE9">
            <path d="M60 14 C74 38 74 54 60 60 C46 54 46 38 60 14 Z" />
            <path d="M106 60 C82 74 66 74 60 60 C66 46 82 46 106 60 Z" />
            <path d="M60 106 C46 82 46 66 60 60 C74 66 74 82 60 106 Z" />
            <path d="M14 60 C38 46 54 46 60 60 C54 74 38 74 14 60 Z" />
          </g>
        </g>
        <circle cx="60" cy="60" r="9" fill="#FF6B4A" />
      </g>
    </svg>
  );
}
```

- [ ] **Step 4: Run test to verify it passes.**

Run: `npm run test:unit -- BrandFlower`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit.**

```bash
git add src/components/brand/BrandFlower.tsx src/components/brand/BrandFlower.test.tsx
git commit -m "feat: add BrandFlower primitive (single source for the one-flower rule)"
```

### Task 1.3: `<LogoMark>` and `<LogoWordmark>` (The Cutout + The Bracket)

**Files:**
- Create: `src/components/brand/LogoMark.tsx`, `src/components/brand/LogoWordmark.tsx`, `src/components/brand/LogoLockup.tsx`
- Test: `src/components/brand/LogoMark.test.tsx`

**Interfaces:**
- Produces:
  - `LogoMark(props: { size?: number; className?: string }): JSX.Element` — blue tile with negative-space ✕ flower + coral core (from `identity-sheet.html`).
  - `LogoWordmark(props: { className?: string; tone?: "ink" | "cream" }): JSX.Element` — the frozen Bracket wordmark; `tone` sets the `bloom` letter color (`ink` `#141414` default, `cream` `#F2EFE9` on dark). Brackets stay blue, `m×n` stays coral.
  - `LogoLockup(props: { className?: string; tone?: "ink" | "cream"; markSize?: number })` — mark + wordmark in a flex row, for header/footer.

- [ ] **Step 1: Write the failing test.**

```tsx
import { render } from "@testing-library/react";
import LogoMark from "./LogoMark";

test("mark is a blue tile with a coral core", () => {
  const { container } = render(<LogoMark size={40} />);
  expect(container.querySelector('rect[fill="#1747E0"]')).not.toBeNull();
  expect(container.querySelector('circle[fill="#FF6B4A"]')).not.toBeNull();
});
```

- [ ] **Step 2: Run to verify fail.** `npm run test:unit -- LogoMark` → FAIL.

- [ ] **Step 3: Implement `LogoMark.tsx`** (paths verbatim from `identity-sheet.html` primary lockup):

```tsx
interface LogoMarkProps { size?: number; className?: string }

export default function LogoMark({ size = 40, className }: LogoMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} role="img" aria-label="Bloom Matrix">
      <rect x="6" y="6" width="108" height="108" rx="26" fill="#1747E0" />
      <g transform="rotate(45 60 60)">
        <g fill="#F2EFE9">
          <path d="M60 14 C74 38 74 54 60 60 C46 54 46 38 60 14 Z" />
          <path d="M106 60 C82 74 66 74 60 60 C66 46 82 46 106 60 Z" />
          <path d="M60 106 C46 82 46 66 60 60 C74 66 74 82 60 106 Z" />
          <path d="M14 60 C38 46 54 46 60 60 C54 74 38 74 14 60 Z" />
        </g>
      </g>
      <circle cx="60" cy="60" r="9" fill="#FF6B4A" />
    </svg>
  );
}
```

- [ ] **Step 4: Implement `LogoWordmark.tsx`** (verbatim geometry from `identity-sheet.html`; `<text>` uses Inter which loads site-wide):

```tsx
interface LogoWordmarkProps { className?: string; tone?: "ink" | "cream" }

export default function LogoWordmark({ className, tone = "ink" }: LogoWordmarkProps) {
  const bloomFill = tone === "cream" ? "#F2EFE9" : "#141414";
  return (
    <svg viewBox="0 0 420 82" className={className} role="img" aria-label="bloom matrix">
      <g stroke="#1747E0" strokeWidth="7" fill="none" strokeLinecap="square">
        <path d="M62 8 L50 8 L50 74 L62 74" />
        <path d="M358 8 L370 8 L370 74 L358 74" />
      </g>
      <text x="210" y="56" textAnchor="middle" fontFamily="var(--font-inter), Inter, sans-serif" fontWeight="700" fontSize="44" letterSpacing="13" fill={bloomFill}>bloom</text>
      <text x="380" y="22" fontFamily="var(--font-inter), Inter, sans-serif" fontWeight="600" fontSize="15" fill="#FF6B4A">m×n</text>
    </svg>
  );
}
```

- [ ] **Step 5: Implement `LogoLockup.tsx`.**

```tsx
import LogoMark from "./LogoMark";
import LogoWordmark from "./LogoWordmark";

interface LogoLockupProps { className?: string; tone?: "ink" | "cream"; markSize?: number }

export default function LogoLockup({ className, tone = "ink", markSize = 30 }: LogoLockupProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark size={markSize} />
      <LogoWordmark tone={tone} className="h-[26px] w-auto" />
    </span>
  );
}
```

- [ ] **Step 6: Run to verify pass.** `npm run test:unit -- LogoMark` → PASS.

- [ ] **Step 7: Commit.**

```bash
git add src/components/brand/LogoMark.tsx src/components/brand/LogoWordmark.tsx src/components/brand/LogoLockup.tsx src/components/brand/LogoMark.test.tsx
git commit -m "feat: add LogoMark, LogoWordmark, LogoLockup brand primitives"
```

### Task 1.4: `<BrandHeadline>` with seeded-"o" + coral-tittle (BM Serif)

**Files:**
- Create: `src/components/brand/headlineTokens.ts`, `src/components/brand/BrandHeadline.tsx`
- Test: `src/components/brand/headlineTokens.test.ts`

**Implementation note (technique, in-scope):** The approved mockup (`bm-serif-glyphs.html`) achieves the glyph mods by OVERLAYING coral marks on the real Lora glyphs, not by baking a COLR color font. This plan implements that same overlay technique at the component layer — it is visually identical to what was approved, more robust, and needs no font tooling. "BM Serif" is therefore self-hosted Lora + `<BrandHeadline>`. Do not attempt to build a COLR/CPAL font.

**Interfaces:**
- Produces:
  - `tokenizeHeadline(text: string): Array<{ ch: string; kind: "plain" | "seed-o" | "tittle-i" | "tittle-j" }>` — pure, lowercase `o`→seed-o, `i`→tittle-i, `j`→tittle-j, else plain. (Uppercase O/I/J stay plain — mods are lowercase per mockup.)
  - `BrandHeadline(props: { as?: "h1" | "h2" | "h3" | "p"; segments: Array<{ text: string; emphasis?: boolean }>; className?: string; seeded?: boolean }): JSX.Element` — renders segments in `font-bm-serif`; each char tokenized and seeded (unless `seeded={false}`); `emphasis` segments wrapped in `<em>` with `text-blue` (keeps Lora italic). The host element gets `aria-label` = concatenated plain text and children are `aria-hidden` for clean screen-reader output.

- [ ] **Step 1: Write the failing tokenizer test.**

```ts
import { tokenizeHeadline } from "./headlineTokens";

test("marks lowercase o, i, j; leaves others plain", () => {
  const t = tokenizeHeadline("bloomij X");
  expect(t.map((x) => x.kind)).toEqual([
    "plain", "plain", "seed-o", "seed-o", "plain", "tittle-i", "tittle-j", "plain", "plain",
  ]);
});

test("uppercase letters stay plain", () => {
  expect(tokenizeHeadline("OIJ").every((x) => x.kind === "plain")).toBe(true);
});
```

- [ ] **Step 2: Run to verify fail.** `npm run test:unit -- headlineTokens` → FAIL.

- [ ] **Step 3: Implement `headlineTokens.ts`.**

```ts
export type HeadlineToken = { ch: string; kind: "plain" | "seed-o" | "tittle-i" | "tittle-j" };

export function tokenizeHeadline(text: string): HeadlineToken[] {
  return Array.from(text).map((ch) => {
    if (ch === "o") return { ch, kind: "seed-o" };
    if (ch === "i") return { ch, kind: "tittle-i" };
    if (ch === "j") return { ch, kind: "tittle-j" };
    return { ch, kind: "plain" };
  });
}
```

- [ ] **Step 4: Run to verify pass.** `npm run test:unit -- headlineTokens` → PASS.

- [ ] **Step 5: Implement `BrandHeadline.tsx`.** Seed-o overlays a coral dot centered in Lora's real `o` counter; tittle swaps to the dotless glyph (`ı` U+0131 / `ȷ` U+0237) plus a positioned coral dot.

```tsx
import type { JSX } from "react";
import { tokenizeHeadline, type HeadlineToken } from "./headlineTokens";

interface Segment { text: string; emphasis?: boolean }
interface BrandHeadlineProps {
  as?: "h1" | "h2" | "h3" | "p";
  segments: Segment[];
  className?: string;
  seeded?: boolean;
}

function Glyph({ token, seeded }: { token: HeadlineToken; seeded: boolean }) {
  if (!seeded || token.kind === "plain") return <>{token.ch}</>;
  if (token.kind === "seed-o") {
    return (
      <span className="relative inline-block" aria-hidden>
        o
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral"
          style={{ width: "0.17em", height: "0.17em" }}
        />
      </span>
    );
  }
  const base = token.kind === "tittle-i" ? "ı" : "ȷ"; // dotless i / j
  return (
    <span className="relative inline-block" aria-hidden>
      {base}
      <span
        className="absolute left-1/2 rounded-full bg-coral"
        style={{ width: "0.12em", height: "0.12em", top: "0.04em", transform: "translateX(-50%)" }}
      />
    </span>
  );
}

export default function BrandHeadline({ as = "h2", segments, className, seeded = true }: BrandHeadlineProps) {
  const Tag = as as keyof JSX.IntrinsicElements;
  const plain = segments.map((s) => s.text).join("");
  return (
    <Tag className={`font-bm-serif ${className ?? ""}`} aria-label={plain}>
      {segments.map((seg, si) => {
        const tokens = tokenizeHeadline(seg.text);
        const inner = tokens.map((tk, i) => <Glyph key={i} token={tk} seeded={seeded} />);
        return seg.emphasis ? (
          <em key={si} className="text-blue" aria-hidden>{inner}</em>
        ) : (
          <span key={si} aria-hidden>{inner}</span>
        );
      })}
    </Tag>
  );
}
```

- [ ] **Step 6: Add `font-bm-serif` utility.** Confirm Tailwind v4 exposes `font-bm-serif` from the `--font-bm-serif` theme var (it does, via the `--font-*` → `font-*` mapping). Verify:

Run: `grep -n "font-bm-serif" src/app/globals.css` → the `--font-bm-serif` token from Task 0.1 is present.

- [ ] **Step 7: Commit.**

```bash
git add src/components/brand/headlineTokens.ts src/components/brand/headlineTokens.test.ts src/components/brand/BrandHeadline.tsx
git commit -m "feat: add BrandHeadline (BM Serif seeded-o + coral tittle)"
```

### Task 1.5: Spin physics + `useSpinningFlower` hook

**Files:**
- Create: `src/lib/spin.ts`, `src/hooks/useSpinningFlower.ts`
- Test: `src/lib/spin.test.ts`

**Interfaces:**
- Produces:
  - `type SpinState = { angle: number; velocity: number }`
  - `stepSpin(state: SpinState, dtMs: number, friction?: number): SpinState` — decays velocity by `friction^(dt/16.67)`, advances angle by `velocity*dt`. Default friction `0.94`.
  - `addImpulse(state: SpinState, impulse: number): SpinState`
  - `useSpinningFlower(): { angle: number; bind: { onPointerMove: (e: React.PointerEvent) => void } }` — rAF loop calling `stepSpin`; pointer movement adds impulse from `movementX+movementY` magnitude; returns current `angle`. On `prefers-reduced-motion` or coarse pointer, returns static `angle=0` and a no-op `bind` (touch fallback handled in Hero via scroll, Task 3.1).

- [ ] **Step 1: Write the failing physics test.**

```ts
import { stepSpin, addImpulse } from "./spin";

test("velocity decays toward zero over time", () => {
  let s = { angle: 0, velocity: 1 };
  s = stepSpin(s, 16.67);
  expect(s.velocity).toBeLessThan(1);
  expect(s.velocity).toBeGreaterThan(0);
});

test("angle advances by velocity*dt", () => {
  const s = stepSpin({ angle: 10, velocity: 2 }, 10, 1); // friction=1 → no decay
  expect(s.angle).toBeCloseTo(30);
});

test("addImpulse increases velocity", () => {
  expect(addImpulse({ angle: 0, velocity: 1 }, 0.5).velocity).toBe(1.5);
});
```

- [ ] **Step 2: Run to verify fail.** `npm run test:unit -- spin` → FAIL.

- [ ] **Step 3: Implement `src/lib/spin.ts`.**

```ts
export type SpinState = { angle: number; velocity: number };

export function stepSpin(state: SpinState, dtMs: number, friction = 0.94): SpinState {
  const velocity = state.velocity * Math.pow(friction, dtMs / 16.67);
  const settled = Math.abs(velocity) < 1e-4 ? 0 : velocity;
  return { angle: state.angle + settled * dtMs, velocity: settled };
}

export function addImpulse(state: SpinState, impulse: number): SpinState {
  return { angle: state.angle, velocity: state.velocity + impulse };
}
```

- [ ] **Step 4: Run to verify pass.** `npm run test:unit -- spin` → PASS.

- [ ] **Step 5: Implement `src/hooks/useSpinningFlower.ts`.**

```ts
"use client";

import { useEffect, useRef, useState } from "react";
import { addImpulse, stepSpin, type SpinState } from "@/lib/spin";

const IMPULSE_SCALE = 0.0016; // deg/ms per px of pointer travel
const MAX_VELOCITY = 0.06;

export function useSpinningFlower() {
  const [angle, setAngle] = useState(0);
  const state = useRef<SpinState>({ angle: 0, velocity: 0 });
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(now - last, 48);
      last = now;
      state.current = stepSpin(state.current, dt);
      setAngle(state.current.angle);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduced.current) return;
    const travel = Math.abs(e.movementX) + Math.abs(e.movementY);
    const impulse = Math.min(travel * IMPULSE_SCALE, MAX_VELOCITY);
    state.current = addImpulse(state.current, impulse);
  };

  return { angle, bind: { onPointerMove } };
}
```

- [ ] **Step 6: Commit.**

```bash
git add src/lib/spin.ts src/lib/spin.test.ts src/hooks/useSpinningFlower.ts
git commit -m "feat: add spin physics and useSpinningFlower hook"
```

---

## Phase 2 — Shared chrome

### Task 2.1: `SiteHeader` reskin (mark + wordmark, Contact chip, inline SVG menu icon)

**Files:**
- Modify: `src/components/SiteHeader.tsx` (full rewrite)

**Interfaces:**
- Consumes: `LogoLockup` (1.3).
- Produces: header with the new nav model (Global Constraints) — links Products/Services/About, `Contact` chip.

- [ ] **Step 1: Rewrite `SiteHeader.tsx`.**

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LogoLockup from "@/components/brand/LogoLockup";

const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-cream/95 backdrop-blur-md border-b border-ink/10" : "bg-transparent"
      }`}
    >
      <nav className="flex justify-between items-center px-container-margin py-4 w-full max-w-7xl mx-auto">
        <Link href="/" aria-label="Bloom Matrix home">
          <LogoLockup tone="ink" markSize={30} />
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-ink/70 font-inter font-medium hover:text-ink transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="bg-ink text-cream font-inter font-semibold px-5 py-2.5 rounded-[2px] hover:opacity-90 active:scale-95 transition-all">
            Contact
          </Link>
        </div>

        <button
          className="md:hidden text-ink p-2"
          onClick={() => setIsMobileMenuOpen((o) => !o)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden fill="none" stroke="currentColor" strokeWidth="2">
            {isMobileMenuOpen ? <path d="M6 6 L20 20 M20 6 L6 20" /> : <path d="M4 8 H22 M4 13 H22 M4 18 H22" />}
          </svg>
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-cream border-b border-ink/10 flex flex-col items-center py-6 gap-6">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-ink/70 font-inter font-medium text-lg hover:text-ink transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="bg-ink text-cream font-inter font-semibold px-8 py-3 rounded-[2px] w-11/12 max-w-xs text-center" onClick={() => setIsMobileMenuOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Typecheck.** Run: `npm run typecheck` → the file has no errors (other files may still error until their tasks land; confirm no NEW error originates in `SiteHeader.tsx`).

- [ ] **Step 3: Commit.**

```bash
git add src/components/SiteHeader.tsx
git commit -m "feat: reskin SiteHeader with new logo lockup and Contact chip"
```

### Task 2.2: `SiteFooter` reskin (Ink band, inline SVG icons)

**Files:**
- Modify: `src/components/SiteFooter.tsx` (full rewrite)

**Interfaces:**
- Consumes: `LogoLockup` (1.3, `tone="cream"`).

- [ ] **Step 1: Rewrite `SiteFooter.tsx`** — Ink background, cream wordmark, inline mail/pin SVGs (icon font is gone), nav model from Global Constraints, keep email/location/copyright copy.

```tsx
import Link from "next/link";
import LogoLockup from "@/components/brand/LogoLockup";

const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-ink mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-start px-container-margin py-14 w-full max-w-7xl mx-auto gap-10">
        <div className="space-y-4 text-left max-w-sm">
          <LogoLockup tone="cream" markSize={30} />
          <p className="font-inter text-sm text-cream/70">
            Building intelligent digital ecosystems. AI-first product engineering for enterprises that refuse to stand still.
          </p>
          <div className="mt-4 space-y-2 font-inter text-xs text-cream/70">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B4A" strokeWidth="2" aria-hidden><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
              <a href="mailto:bloommatrixtech@gmail.com" className="hover:text-cream transition-colors">bloommatrixtech@gmail.com</a>
            </div>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B4A" strokeWidth="2" aria-hidden><path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
              <span>Coimbatore, Tamil Nadu, India</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-6 self-stretch md:self-auto justify-between">
          <div className="flex flex-wrap gap-6 md:gap-8">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-cream/70 font-inter text-xs uppercase tracking-wider hover:text-cream transition-colors">{l.label}</Link>
            ))}
            <span className="text-cream/70 font-inter text-xs uppercase tracking-wider">Privacy</span>
            <span className="text-cream/70 font-inter text-xs uppercase tracking-wider">Terms</span>
          </div>
          <span className="font-inter text-[11px] text-cream/50 tracking-wide">© 2026 Bloom Matrix. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit.**

```bash
git add src/components/SiteFooter.tsx
git commit -m "feat: reskin SiteFooter as Ink band with inline icons"
```

### Task 2.3: `CTABand` reskin

**Files:**
- Modify: `src/components/CTABand.tsx`

**Interfaces:**
- Consumes: `BrandHeadline` (1.4).

- [ ] **Step 1: Rewrite `CTABand.tsx`** — Ink band; title via `BrandHeadline` with `compounds` emphasized; primary coral CTA (ink text), secondary outlined cream CTA; keep copy and links.

```tsx
import Link from "next/link";
import Reveal from "@/components/Reveal";
import BrandHeadline from "@/components/brand/BrandHeadline";

type CTABandProps = { titleSegments?: { text: string; emphasis?: boolean }[]; description?: string };

const DEFAULT_TITLE = [
  { text: "Let's build something that " },
  { text: "compounds", emphasis: true },
  { text: "." },
];

export default function CTABand({
  titleSegments = DEFAULT_TITLE,
  description = "Book a strategy call and talk through what you're building — no sales script, just an engineering-led conversation.",
}: CTABandProps) {
  return (
    <section className="bg-ink py-24">
      <div className="max-w-3xl mx-auto px-container-margin text-center">
        <Reveal>
          <BrandHeadline as="h2" segments={titleSegments} className="text-4xl md:text-5xl text-cream mb-6" />
          <p className="font-inter text-cream/70 mb-10 max-w-xl mx-auto">{description}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="bg-coral text-ink px-8 py-4 rounded-[2px] font-semibold text-center hover:opacity-90 transition-all">Start a project</Link>
            <Link href="/products/aira" className="border border-cream/25 text-cream px-8 py-4 rounded-[2px] font-semibold text-center hover:bg-cream/5 transition-all">Explore AIRA</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

Note on `titleSegments`: any page passing a custom `title` prop today must be updated to pass `titleSegments`. Grep for it in Step 2.

- [ ] **Step 2: Find & fix custom callers.**

Run: `grep -rn "<CTABand" src` — for any usage passing `title=`, convert it to `titleSegments={[…]}` in that page's task (Phase 4). If none pass `title`, nothing to do.

- [ ] **Step 3: Commit.**

```bash
git add src/components/CTABand.tsx
git commit -m "feat: reskin CTABand as Ink band with BrandHeadline and coral CTA"
```

### Task 2.4: `PageHero` reskin → boundary-crossing brand hero

**Files:**
- Modify: `src/components/PageHero.tsx` (full rewrite)

**Interfaces:**
- Consumes: `BrandFlower` (1.2), `BrandHeadline` (1.4).
- Produces: `PageHero(props: { eyebrow: string; titleSegments: { text: string; emphasis?: boolean }[]; description: string })` — cream field, right-side blue block, static ✕ flower crossing the boundary, serif headline over it. **Signature change:** `title: string` → `titleSegments`. Every caller (services/products/aira/about/contact pages) updates in Phase 4.

- [ ] **Step 1: Rewrite `PageHero.tsx`.**

```tsx
"use client";

import { motion, type Variants } from "framer-motion";
import BrandFlower from "@/components/brand/BrandFlower";
import BrandHeadline from "@/components/brand/BrandHeadline";

interface PageHeroProps {
  eyebrow: string;
  titleSegments: { text: string; emphasis?: boolean }[];
  description: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };
const item: Variants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };

export default function PageHero({ eyebrow, titleSegments, description }: PageHeroProps) {
  return (
    <section className="relative bg-cream pt-40 pb-20 overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-[38%] bg-blue" aria-hidden />
      <BrandFlower size={280} shadow className="absolute right-[10%] top-24 hidden md:block pointer-events-none" />
      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 max-w-4xl mx-auto px-container-margin">
        <motion.p variants={item} className="font-inter text-xs uppercase tracking-[0.14em] text-blue font-bold mb-4">{eyebrow}</motion.p>
        <motion.div variants={item}>
          <BrandHeadline as="h1" segments={titleSegments} className="text-4xl md:text-6xl text-ink mb-6 leading-[1.05]" />
        </motion.div>
        <motion.p variants={item} className="font-inter text-lg text-ink/65 max-w-xl leading-relaxed">{description}</motion.p>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit.**

```bash
git add src/components/PageHero.tsx
git commit -m "feat: reskin PageHero as boundary-crossing brand hero"
```

---

## Phase 3 — Homepage

### Task 3.1: Homepage Hero with spinning flower

**Files:**
- Modify: `src/components/home/Hero.tsx` (full rewrite)

**Interfaces:**
- Consumes: `BrandFlower` (1.2), `BrandHeadline` (1.4), `useSpinningFlower` (1.5).
- Produces: the locked hero (`hero-flower-unified.html`, option 1) — cream field, right blue block, flower crossing the boundary and spinning on pointer move, headline "We build products that *think*." over it, coral "Start a project" + underlined "Explore products".

- [ ] **Step 1: Rewrite `Hero.tsx`.** Removes the `AmbientBackground` import and decorative arcs entirely.

```tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import BrandFlower from "@/components/brand/BrandFlower";
import BrandHeadline from "@/components/brand/BrandHeadline";
import { useSpinningFlower } from "@/hooks/useSpinningFlower";

const EASE = [0.22, 1, 0.36, 1] as const;
const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const item: Variants = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };

const TITLE = [
  { text: "We build products " },
  { text: "that " },
  { text: "think", emphasis: true },
  { text: "." },
];

export default function Hero() {
  const { angle, bind } = useSpinningFlower();
  // Touch / coarse-pointer fallback: slow scroll-linked rotation.
  const [scrollAngle, setScrollAngle] = useState(0);
  const coarse = useRef(false);
  useEffect(() => {
    coarse.current = window.matchMedia("(pointer: coarse)").matches;
    if (!coarse.current) return;
    const onScroll = () => setScrollAngle(window.scrollY * 0.08);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const flowerAngle = coarse.current ? scrollAngle : angle;

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-cream" onPointerMove={bind.onPointerMove}>
      <div className="absolute right-0 top-0 bottom-0 w-[42%] bg-blue" aria-hidden />
      <BrandFlower size={340} rotation={flowerAngle} shadow className="absolute right-[24%] top-[12%] hidden md:block pointer-events-none z-0" />

      <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 max-w-3xl mx-auto md:mx-0 md:ml-[8%] px-container-margin w-full flex flex-col items-start">
        <motion.span variants={item} className="font-inter text-xs uppercase tracking-[0.14em] text-blue font-bold mb-5">AI-first product engineering</motion.span>
        <motion.div variants={item}>
          <BrandHeadline as="h1" segments={TITLE} className="text-5xl md:text-7xl leading-[1.03] text-ink mb-6" />
        </motion.div>
        <motion.p variants={item} className="font-inter text-lg text-ink/65 max-w-md mb-9 leading-relaxed">
          An AI-first product engineering company for businesses that want more than software.
        </motion.p>
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Link href="/contact" className="bg-coral text-ink px-8 py-4 rounded-[2px] font-semibold hover:opacity-90 transition-all">Start a project</Link>
          <Link href="/products" className="text-ink font-semibold border-b-2 border-blue pb-0.5 hover:border-coral transition-colors">Explore products</Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Write a Playwright smoke test** at `tests/e2e/home.spec.ts`.

```ts
import { test, expect } from "@playwright/test";

test("homepage hero renders with the brand headline", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("h1")).toHaveAttribute("aria-label", /We build products that think\./);
  expect(errors).toEqual([]);
});
```

- [ ] **Step 3: Build and run the smoke test.**

Run: `npm run test:e2e -- home.spec.ts --project=desktop`
Expected: PASS. If build fails on other components not yet migrated, fix only what blocks the build (they are handled in later tasks; a NOT-YET-migrated file that still references removed tokens must be temporarily neutralized only if it blocks build — otherwise defer). Record any deferrals.

- [ ] **Step 4: Commit.**

```bash
git add src/components/home/Hero.tsx tests/e2e/home.spec.ts
git commit -m "feat: rebuild homepage hero with spinning brand flower"
```

### Task 3.2: Re-skin the seven homepage sections

**Files (each its own commit):** `src/components/home/PositioningStrip.tsx`, `ValuePropsSticky.tsx`, `ServiceAreasGrid.tsx`, `FeaturedProducts.tsx`, `HowWeWork.tsx`, `FAQSection.tsx`, and `src/app/page.tsx` (imports/order only if needed).

**Interfaces:**
- Consumes: `BrandHeadline` (1.4), color-remap table (Global Constraints), `BrandFlower` for optional accents.

For EACH of the six section components, do the following (one task cycle + commit per file):

- [ ] **Step 1: Apply the color-remap table** to every class in the file (see Global Constraints table). Mechanical: replace each left-column class with its right-column class. In particular: `bg-navy`→`bg-ink`, `bg-paper`→`bg-cream`, `text-ink-dark*`→`text-ink*`, `text-accent*`→`text-blue`, `bg-gradient-indigo text-white`→`bg-coral text-ink`, `rounded-xl`→`rounded-[2px]`, remove `shadow-*` glows.

- [ ] **Step 2: Convert the section heading.** Find the `<h2 className="font-display …">…</h2>`. Replace it with `<BrandHeadline as="h2" segments={[…]} className="…(same size/color classes)…" />`, splitting the text into segments and marking the word that was inside the old `text-gradient-indigo`/emphasis span as `{ text: "…", emphasis: true }`. Keep all other copy identical.

- [ ] **Step 3: Replace any `material-symbols-outlined` icon spans** with a matching inline SVG (stroke `currentColor`, 24×24) or, for decorative bullets, a `BrandFlower size={16}` or a coral dot `<span class="w-1.5 h-1.5 rounded-full bg-coral"/>`. No icon-font references may remain.

- [ ] **Step 4: Typecheck the file.** Run: `npm run typecheck` → no new error in this file.

- [ ] **Step 5: Commit.** `git add <file> && git commit -m "feat: reskin <SectionName> to Editorial Bloom"`.

After all six sections:

- [ ] **Step 6: Verify no icon-font or old tokens remain in home components.**

Run: `grep -rnE "material-symbols|navy|paper|indigo|accent|gradient|ink-dark|ink-muted" src/components/home`
Expected: no output.

- [ ] **Step 7: Build + smoke the homepage across breakpoints.**

Run: `npm run test:e2e -- home.spec.ts`
Expected: PASS on mobile/tablet/laptop/desktop.

- [ ] **Step 8: Capture review screenshots.**

Run: `npx playwright test --project=desktop --project=mobile home.spec.ts` then, in a throwaway spec or via `page.screenshot`, save `tests/e2e/__screens__/home-desktop.png` and `home-mobile.png`. **STOP for human review** against `docs/design-gallery/hero-flower-unified.html` and `identity-sheet.html` before Phase 4.

---

## Phase 4 — Sub-pages

Each page is one task + commit. For every page: (a) apply the color-remap table to all classes; (b) convert every `<h2>`/section heading to `<BrandHeadline>` (emphasis = the word previously gradient-colored); (c) update the `PageHero` call from `title={"…"}` to `titleSegments={[…]}` (emphasis on the key word); (d) update any `CTABand title=` to `titleSegments=`; (e) replace icon-font spans with inline SVG; (f) typecheck; (g) build; (h) commit.

### Task 4.1: `/services` — `src/app/services/page.tsx`
- [ ] Apply steps (a)–(h) above. Verify: `grep -nE "material-symbols|navy|paper|indigo|accent|gradient|ink-dark|ink-muted" src/app/services/page.tsx` → empty. Commit `feat: reskin /services to Editorial Bloom`.

### Task 4.2: `/products` — `src/app/products/page.tsx`
- [ ] Apply (a)–(h). Same grep check on the file → empty. Commit `feat: reskin /products to Editorial Bloom`.

### Task 4.3: `/products/aira` — `src/app/products/aira/page.tsx`
- [ ] Apply (a)–(h). The AIRA live-simulation panel adopts `rounded-[2px]`, `bg-cream`/`bg-blue`/`bg-ink` surfaces, coral accents only. Same grep check → empty. Commit `feat: reskin /products/aira to Editorial Bloom`.

### Task 4.4: `/about` — `src/app/about/page.tsx`
- [ ] Apply (a)–(h). Same grep check → empty. Commit `feat: reskin /about to Editorial Bloom`.

### Task 4.5: `/contact` — `src/app/contact/page.tsx` + `src/components/ContactForm.tsx`
- [ ] Apply (a)–(h) to both files. Form inputs: cream field, `border-ink/15`, focus ring already blue (Task 0.1). Submit button `bg-coral text-ink rounded-[2px]`. Replace any icon-font spans with inline SVG. Same grep check on both files → empty. Commit `feat: reskin /contact and ContactForm to Editorial Bloom`.

### Task 4.6: Remaining shared components sweep
**Files:** `src/components/Reveal.tsx` (likely no colors), `src/components/AiraLiveSimulation.tsx`, `src/components/FAQAccordion.tsx`, any other file under `src/components` not yet touched.
- [ ] Run `grep -rnlE "material-symbols|navy|paper|indigo|accent|gradient|ink-dark|ink-muted" src` to list every remaining file. For each, apply the color-remap table + icon-font replacement + heading→BrandHeadline where a display heading exists. Typecheck. Commit per file: `feat: reskin <file> to Editorial Bloom`.
- [ ] Final verify: `grep -rnE "material-symbols|navy|paper|indigo|accent|gradient|ink-dark|ink-muted" src` → **no output** (exit 1).

---

## Phase 5 — Assets & cleanup

### Task 5.1: Regenerate favicon & OG image from the mark
**Files:** Modify `src/app/opengraph-image.tsx`; add `src/app/icon.tsx` (replaces `favicon.ico`).
- [ ] **Step 1: Rewrite `opengraph-image.tsx`** — cream background `#F2EFE9`, ink text, the mark drawn as SVG-in-JSX (blue tile + cream ✕ + coral core), wordmark-style "bloom matrix" label, headline "AI-first product engineering." Use only palette colors; no gradient.
- [ ] **Step 2: Add `src/app/icon.tsx`** using `ImageResponse` at 32×32 rendering `LogoMark` geometry (blue rounded tile, cream ✕, coral core). Delete `src/app/favicon.ico` and the `icons.icon` override in `layout.tsx` metadata (Next serves `icon.tsx` automatically).
- [ ] **Step 3: Build** `npm run build` → succeeds; visit `/opengraph-image` and `/icon` render. Commit `feat: regenerate favicon and OG image from Cutout mark`.

### Task 5.2: Update `schema.ts` logo reference
**Files:** `src/lib/schema.ts`
- [ ] Point `organizationSchema().logo` at a real asset: create `public/images/logo-mark.svg` containing the `LogoMark` SVG markup (blue tile + cream ✕ + coral core), and set `logo: \`${SITE_URL}/images/logo-mark.svg\``. Build. Commit `chore: update Organization schema logo to new mark`.

### Task 5.3: Remove old-system code (three.js, AmbientBackground, old LogoBM)
**Files:** delete `src/components/AmbientBackground.tsx`, `src/components/LogoBM.tsx`; modify `package.json`.
- [ ] **Step 1: Confirm nothing imports them.** Run: `grep -rn "AmbientBackground\|LogoBM" src` → **no output**. (If any remain, they were missed in Phases 2–4 — fix those first.)
- [ ] **Step 2: Delete the files.** `git rm src/components/AmbientBackground.tsx src/components/LogoBM.tsx`.
- [ ] **Step 3: Remove three.js deps.** `npm uninstall three @types/three`.
- [ ] **Step 4: Build.** `npm run build` → succeeds. Commit `chore: remove three.js AmbientBackground and legacy LogoBM`.

### Task 5.4: Update the brand knowledge base
**Files:** `.agents/context/stack-and-rules.md`, `.agents/decisions/log.md`
- [ ] Update the File Map (LogoBM → `src/components/brand/*`; note AmbientBackground/three.js removed) and add a decision-log entry pointing at the spec + `docs/design-gallery/`. Commit `docs: update second-brain for Editorial Bloom redesign`.

---

## Phase 6 — Full verification

### Task 6.1: Green gate
- [ ] `npm run test:unit` → all pass (BrandFlower, LogoMark, headlineTokens, spin).
- [ ] `npm run typecheck` → clean.
- [ ] `npm run lint` → clean.
- [ ] `npm run build` → succeeds; note the homepage JS/CSS bundle size against the landing-page budget (JS < 150kb gz, CSS < 30kb — `rules/web/performance.md`). three.js removal should help.
- [ ] `grep -rnE "material-symbols|#0A0F1F|#FAFAF8|navy|indigo|Instrument_Serif|gradient-indigo" src` → **no output**.

### Task 6.2: Cross-breakpoint visual + a11y smoke
**Files:** `tests/e2e/pages.spec.ts`
- [ ] Add a spec that visits `/`, `/services`, `/products`, `/products/aira`, `/about`, `/contact`; for each asserts `h1` visible, no console errors, and saves a screenshot per project (320/768/1024/1440). Run `npm run test:e2e`. **STOP for human review** of all screenshots against `docs/design-gallery/`.
- [ ] Verify `prefers-reduced-motion`: add one test with `test.use({ reducedMotion: "reduce" })` asserting the hero flower `[data-flower-spin]` transform stays `rotate(0 60 60)` after pointer movement.
- [ ] Commit `test: cross-breakpoint and reduced-motion verification`.

---

## Self-Review (completed against the spec)

- **Spec coverage:** mark → 1.3/5.1/5.2; wordmark → 1.3; one-flower rule → 1.2; palette → 0.1 + remap table; BM Serif (seeded-o + tittle, x declined, wordmark exempt) → 1.4; boundary-crossing hero → 3.1/2.4; spinning flower (momentum/friction, touch scroll, reduced-motion) → 1.5/3.1/6.2; all five pages re-skinned → 3.x/4.x; chrome → 2.x; favicon/OG/schema → 5.1/5.2; remove old system (navy/indigo/Instrument Serif/glass/three.js) → 0.1/0.2/5.3/6.1; knowledge base → 5.4. No spec section is unmapped.
- **Placeholder scan:** none — every code step has complete code; mechanical steps cite the exact remap table and exact grep gates.
- **Type consistency:** `titleSegments` signature is consistent across `PageHero` (2.4), `CTABand` (2.3), and all callers (4.x); `SpinState`/`stepSpin`/`addImpulse` names match across 1.5 and its hook; `BrandFlower` `rotation`/`data-flower-spin` used identically in 1.2, 3.1, 6.2.
- **Known interpretation flagged:** BM Serif is implemented as self-hosted Lora + `<BrandHeadline>` overlay (Task 1.4 note), not a baked COLR font — visually identical to the approved `bm-serif-glyphs.html`, and far safer to execute. This is the one implementation-level decision; if the executor's reviewer wants a true font binary later, it can be swapped behind the same `<BrandHeadline>` API without touching call sites.
