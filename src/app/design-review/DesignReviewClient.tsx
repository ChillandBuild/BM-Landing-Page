"use client";

import { useState, type CSSProperties } from "react";
import BrandFlower from "@/components/brand/BrandFlower";
import LogoMark from "@/components/brand/LogoMark";
import FlowerMotif from "@/components/brand/FlowerMotifs";

/** Same dot-matrix texture Hero.tsx paints under its Ink block — reused as-is
 *  so the corner box reads as the same surface as the homepage hero. */
const DOT_MATRIX = {
  backgroundImage: "radial-gradient(circle, rgba(242,239,233,0.16) 1.2px, transparent 1.2px)",
  backgroundSize: "22px 22px",
} as const;

const CORNER_PAGES = [
  { label: "Products", rotation: 0, motif: "solid" as const },
  { label: "Services", rotation: 22, motif: "hybrid" as const },
  { label: "About", rotation: -18, motif: "dissolve" as const },
  { label: "Contact", rotation: 40, motif: "halftone" as const },
];

function CornerBase({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative w-full h-36 overflow-hidden bg-[#141414] flex items-center justify-center"
      style={DOT_MATRIX}
    >
      {/* Same oversized silver ghost Hero bleeds off its block edge with —
          kept constant across every option below; only the foreground mark
          in front of it changes. */}
      <LogoMark
        size={230}
        tone="silver"
        rotation={-15}
        className="absolute right-[-22%] top-1/2 -translate-y-1/2 opacity-[0.11] pointer-events-none"
      />
      {children}
    </div>
  );
}

/**
 * INTERNAL REVIEW PAGE — not linked from nav, not for production.
 * Delete this route once decisions are made and folded back into the real
 * components (globals.css, HowWeWork.tsx, PageHero.tsx).
 *
 * Every former literal gold hex in this file is now `var(--accent)`, driven
 * by the picker below, so picking a red re-themes the whole preview live —
 * not just isolated swatches.
 */

const GOLD = "#C5A059";
const OXBLOOD = "#7A2331";

const ACCENT_OPTIONS = [
  {
    id: "oxblood",
    name: "Live — Oxblood",
    hex: OXBLOOD,
    contrast: "8.7:1",
    pass: "AAA",
    note: "This is now the real site accent (globals.css, flowerGeometry.ts, and every component below have been switched over).",
  },
  {
    id: "gold",
    name: "Previous — Gold",
    hex: GOLD,
    contrast: "2.1:1",
    pass: "reference",
    note: "The site's accent before this change, kept here only for comparison.",
  },
  {
    id: "terracotta",
    name: "Terracotta Brick",
    hex: "#B14A32",
    contrast: "4.7:1",
    pass: "AA",
    note: "Warm and earthy — closest emotional temperature to the gold this replaced. Reads as clay/ceramic, not alarm-red.",
  },
  {
    id: "crimson",
    name: "Crimson Scarlet",
    hex: "#B3352B",
    contrast: "5.3:1",
    pass: "AA",
    note: "A punchier, more saturated true red. Bolder and more attention-grabbing than terracotta.",
  },
  {
    id: "garnet",
    name: "Garnet",
    hex: "#8C1F3B",
    contrast: "7.7:1",
    pass: "AAA",
    note: "A jewel-tone red leaning slightly magenta. Rich and a little more modern/fashion-forward than oxblood.",
  },
] as const;

function SectionHeader({
  eyebrow,
  title,
  id,
}: {
  eyebrow: string;
  title: string;
  id: string;
}) {
  return (
    <div id={id} className="scroll-mt-24 mb-10">
      <p className="font-inter text-xs uppercase tracking-[0.14em] text-[var(--accent)] font-bold mb-2">
        {eyebrow}
      </p>
      <h2 className="font-inter text-3xl md:text-4xl font-bold text-[#141414]">{title}</h2>
    </div>
  );
}

function ContrastBadge({ ratio, pass }: { ratio: string; pass: string }) {
  const ok = pass === "AAA" || pass === "AA";
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-inter text-[11px] font-bold px-2 py-1 rounded ${
        ok ? "bg-[#1E4620] text-[#B8F5BB]" : "bg-[#5A1E1E] text-[#F5B8B8]"
      }`}
    >
      {ratio} contrast · {pass}
    </span>
  );
}

function HeroMock({
  label,
  desc,
  children,
}: {
  label: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-[#141414]/10 bg-white">
      <div className="relative h-56 overflow-hidden bg-[#F2EFE9]">{children}</div>
      <div className="p-4">
        <p className="font-inter text-sm font-bold text-[#141414] mb-1">{label}</p>
        <p className="font-inter text-xs text-[#141414]/65 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function DesignReviewClient() {
  const [accentId, setAccentId] = useState<string>("oxblood");
  const accent = ACCENT_OPTIONS.find((o) => o.id === accentId) ?? ACCENT_OPTIONS[0];

  return (
    <main
      className="bg-[#EDEAE3] text-[#141414] py-16"
      style={{ ["--accent" as string]: accent.hex } as CSSProperties}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Intro */}
        <div className="mb-10">
          <p className="font-inter text-xs uppercase tracking-[0.14em] text-[var(--accent)] font-bold mb-3">
            Internal · not linked from nav
          </p>
          <h1 className="font-inter text-4xl md:text-5xl font-bold mb-4">Design review</h1>
          <p className="font-inter text-[#141414]/70 max-w-2xl leading-relaxed">
            Every accent color on this page (eyebrows, badges, squares, circles, lines, motifs) is
            now driven by the picker below — pick a shade and everything re-themes live in your
            browser, no reload needed.
          </p>
          <nav className="flex flex-wrap gap-3 mt-6">
            <a href="#accent" className="font-inter text-sm font-semibold border-b-2 border-[var(--accent)] pb-0.5">
              0. Accent color
            </a>
            <a href="#silver" className="font-inter text-sm font-semibold border-b-2 border-[var(--accent)] pb-0.5">
              1. Silver/emphasis text
            </a>
            <a href="#howwework" className="font-inter text-sm font-semibold border-b-2 border-[var(--accent)] pb-0.5">
              2. How We Work colors
            </a>
            <a href="#herocorner" className="font-inter text-sm font-semibold border-b-2 border-[var(--accent)] pb-0.5">
              3. Hero corner box
            </a>
          </nav>
        </div>

        {/* ================================================================ */}
        {/* SECTION 0 — Accent color picker: Gold -> Red                     */}
        {/* ================================================================ */}
        <section className="mb-20" id="accent">
          <SectionHeader
            eyebrow="Gold → Red"
            title="Pick an accent shade — the whole page below updates live"
            id="accent-inner"
          />

          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {ACCENT_OPTIONS.map((opt) => {
              const selected = opt.id === accentId;
              return (
                <button
                  key={opt.id}
                  onClick={() => setAccentId(opt.id)}
                  className={`text-left bg-white border-2 p-4 transition-all ${
                    selected ? "shadow-lg" : "border-[#141414]/10 opacity-80 hover:opacity-100"
                  }`}
                  style={selected ? { borderColor: opt.hex } : undefined}
                >
                  <div className="w-full h-14 mb-3" style={{ backgroundColor: opt.hex }} />
                  <p className="font-inter text-sm font-bold text-[#141414] mb-1">{opt.name}</p>
                  <p className="font-inter text-[11px] text-[#141414]/50 mb-2 font-mono">{opt.hex}</p>
                  {opt.pass !== "reference" && <ContrastBadge ratio={opt.contrast} pass={opt.pass} />}
                  {selected && (
                    <p className="font-inter text-[10px] font-bold uppercase tracking-wide mt-2" style={{ color: opt.hex }}>
                      ● Viewing this shade below
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          <div className="bg-white border border-[#141414]/10 p-5">
            <p className="font-inter text-sm text-[#141414]/80 leading-relaxed">
              <strong>{accent.name}</strong> ({accent.hex}) — {accent.note}
            </p>
          </div>

          <div className="mt-4 bg-white border border-[#141414]/10 p-5">
            <p className="font-inter text-xs text-[#141414]/60 leading-relaxed">
              <strong className="text-[#141414]">Not shown above — Rosewood/Maroon (#5C1A22):</strong>{" "}
              technically the highest contrast (~11:1), but at that darkness it reads almost
              identical to Ink next to it — same problem flagged earlier for navy replacing the
              silver gradient. Dropped for being visually redundant, not for contrast.
            </p>
          </div>

          <p className="font-inter text-xs text-[#141414]/50 mt-4">
            Note: the flower mark&apos;s seed dot below always renders the real site color from{" "}
            <code className="bg-[#141414]/10 px-1 rounded">flowerGeometry.ts</code> (now Oxblood
            site-wide) — it doesn&apos;t follow the picker above, since that constant isn&apos;t wired to
            this page-local preview variable.
          </p>
        </section>

        {/* ================================================================ */}
        {/* SECTION 1 — Silver / emphasis text contrast                       */}
        {/* ================================================================ */}
        <section className="mb-24">
          <SectionHeader
            eyebrow="Issue 1"
            title='"Silver" emphasis word is nearly invisible on cream'
            id="silver"
          />

          <div className="bg-white border border-[#141414]/10 p-8 mb-8">
            <p className="font-inter text-xs uppercase tracking-[0.1em] text-[#141414]/50 font-bold mb-4">
              The bug, reproduced exactly as it renders today
            </p>
            <p
              className="font-inter mb-2"
              style={{ fontFamily: "Georgia, serif", fontSize: "42px", lineHeight: 1.1 }}
            >
              One partner,{" "}
              <em
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #94A3B8 0%, #F1F5F9 45%, #E2E8F0 65%, #C0C7D0 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  fontStyle: "italic",
                }}
              >
                the whole lifecycle
              </em>
              .
            </p>
            <p className="font-inter text-sm text-[#141414]/60">
              That was the gradient formerly in{" "}
              <code className="bg-[#141414]/10 px-1 rounded">.text-emphasis-gradient</code>{" "}
              (now renamed <code className="bg-[#141414]/10 px-1 rounded">.text-emphasis</code>) in{" "}
              <code className="bg-[#141414]/10 px-1 rounded">globals.css</code>, on the same cream
              (<code className="bg-[#141414]/10 px-1 rounded">#F2EFE9</code>) the real page uses.
              Measured contrast against cream was <strong>~1.05:1</strong> (WCAG needs 3:1 minimum
              even for large headline text) — this has since been fixed site-wide, shown below.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-[#5A6472] p-6 relative">
              <div className="absolute -top-3 left-6 bg-[#5A6472] text-white text-[11px] font-bold uppercase tracking-wide px-2.5 py-1">
                Live — implemented site-wide
              </div>
              <p className="font-inter text-xs font-bold text-[#141414]/50 uppercase tracking-wide mb-3 mt-2">
                Solid Steel Grey — no gradient
              </p>
              <p className="mb-4" style={{ fontFamily: "Georgia, serif", fontSize: "32px", lineHeight: 1.15 }}>
                <em style={{ color: "#5A6472", fontStyle: "italic" }}>the whole lifecycle</em>
              </p>
              <ContrastBadge ratio="~5.2:1" pass="AA" />
              <p className="font-inter text-xs text-[#141414]/65 leading-relaxed mt-3">
                One flat color, <code className="bg-[#141414]/10 px-1 rounded">#5A6472</code> — no
                dark→light→dark band to wash out. Reads as a cool grey/&quot;silver&quot; without
                ever dipping toward white. This is what&apos;s live now.
              </p>
            </div>

            <div className="bg-white border border-[#141414]/10 p-6">
              <p className="font-inter text-xs font-bold text-[#141414]/50 uppercase tracking-wide mb-3 mt-2">
                Alternative — Solid Ink
              </p>
              <p className="mb-4" style={{ fontFamily: "Georgia, serif", fontSize: "32px", lineHeight: 1.15 }}>
                <em style={{ color: "#141414", fontStyle: "italic" }}>the whole lifecycle</em>
              </p>
              <ContrastBadge ratio="~16:1" pass="AAA" />
              <p className="font-inter text-xs text-[#141414]/65 leading-relaxed mt-3">
                Reuses <code className="bg-[#141414]/10 px-1 rounded">--color-ink</code> exactly —
                zero new color, maximum legibility, but loses the grey/silver distinction from body
                copy entirely.
              </p>
            </div>

            <div className="bg-white border border-[#141414]/10 p-6">
              <p className="font-inter text-xs font-bold text-[#141414]/50 uppercase tracking-wide mb-3 mt-2">
                Alternative — Deep Charcoal
              </p>
              <p className="mb-4" style={{ fontFamily: "Georgia, serif", fontSize: "32px", lineHeight: 1.15 }}>
                <em style={{ color: "#36454F", fontStyle: "italic" }}>the whole lifecycle</em>
              </p>
              <ContrastBadge ratio="~8.6:1" pass="AAA" />
              <p className="font-inter text-xs text-[#141414]/65 leading-relaxed mt-3">
                Darker and warmer than the steel grey — sits between Ink and Platinum, still
                distinct from body-copy black.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 2 — How We Work                                          */}
        {/* ================================================================ */}
        <section className="mb-24">
          <SectionHeader
            eyebrow="Issue 2"
            title='"How We Work" square, circles & connecting line'
            id="howwework"
          />
          <p className="font-inter text-sm text-[#141414]/65 mb-8 max-w-2xl leading-relaxed">
            All three options below now render in whichever accent you picked above, so you can
            directly compare gold vs. each red on the actual square/circle/line elements.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Option A */}
            <div className="bg-white border-2 border-[var(--accent)] p-6 relative">
              <div
                className="absolute -top-3 left-6 text-[#141414] text-[11px] font-bold uppercase tracking-wide px-2.5 py-1"
                style={{ backgroundColor: "var(--accent)" }}
              >
                Recommended
              </div>
              <p className="font-inter text-xs font-bold text-[#141414]/50 uppercase tracking-wide mb-4 mt-2">
                Option A — All Accent (live)
              </p>
              <div className="w-20 h-20 flex items-center justify-center mb-4" style={{ backgroundColor: "var(--accent)" }}>
                <span style={{ fontFamily: "Georgia, serif" }} className="text-white text-3xl">
                  03
                </span>
              </div>
              <div className="flex gap-4 mb-2">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold font-inter"
                    style={
                      n <= 2
                        ? { backgroundColor: "var(--accent)", color: "#FFFFFF" }
                        : { border: "1px solid rgba(20,20,20,0.15)", color: "rgba(20,20,20,0.5)" }
                    }
                  >
                    0{n}
                  </div>
                ))}
              </div>
              <div className="w-32 h-px mb-4" style={{ backgroundColor: "var(--accent)" }} />
              <p className="font-inter text-xs text-[#141414]/65 leading-relaxed">
                One accent color across square, reached circles and the connecting line; numerals
                are white/cream instead of ink for contrast against the dark accent — this is what&apos;s
                live now.
              </p>
            </div>

            {/* Option B */}
            <div className="bg-white border border-[#141414]/10 p-6">
              <p className="font-inter text-xs font-bold text-[#141414]/50 uppercase tracking-wide mb-4 mt-2">
                Option B — Ink Anchor
              </p>
              <div className="w-20 h-20 bg-[#141414] flex items-center justify-center mb-4">
                <span style={{ fontFamily: "Georgia, serif", color: "var(--accent)" }} className="text-3xl">
                  03
                </span>
              </div>
              <div className="flex gap-4 mb-2">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold font-inter"
                    style={
                      n <= 2
                        ? { backgroundColor: "#141414", color: "var(--accent)" }
                        : { border: "1px solid rgba(20,20,20,0.15)", color: "rgba(20,20,20,0.5)" }
                    }
                  >
                    0{n}
                  </div>
                ))}
              </div>
              <div className="w-32 h-px mb-4" style={{ backgroundColor: "var(--accent)" }} />
              <p className="font-inter text-xs text-[#141414]/65 leading-relaxed">
                Square and reached circles flip to Ink with accent-colored numerals; only the
                connecting line carries the accent as a "progress" signal.
              </p>
            </div>

            {/* Option C */}
            <div className="bg-white border border-[#141414]/10 p-6">
              <p className="font-inter text-xs font-bold text-[#141414]/50 uppercase tracking-wide mb-4 mt-2">
                Option C — Platinum Companion
              </p>
              <div className="w-20 h-20 bg-[#C0C7D0] flex items-center justify-center mb-4">
                <span style={{ fontFamily: "Georgia, serif" }} className="text-[#141414] text-3xl">
                  03
                </span>
              </div>
              <div className="flex gap-4 mb-2">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold font-inter"
                    style={
                      n <= 2
                        ? { backgroundColor: "#C0C7D0", border: "2px solid var(--accent)", color: "#141414" }
                        : { border: "1px solid rgba(20,20,20,0.15)", color: "rgba(20,20,20,0.5)" }
                    }
                  >
                    0{n}
                  </div>
                ))}
              </div>
              <div className="w-32 h-px mb-4" style={{ backgroundColor: "var(--accent)" }} />
              <p className="font-inter text-xs text-[#141414]/65 leading-relaxed">
                Square/circle fills stay Platinum; the accent is kept only as the reached-circle
                border and the line — a quieter, cooler use of the new color.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 3 — Hero corner box                                      */}
        {/* ================================================================ */}
        <section>
          <SectionHeader
            eyebrow="Issue 3"
            title="Top-right corner block — Products, Services, About, Contact"
            id="herocorner"
          />
          <p className="font-inter text-sm text-[#141414]/65 mb-4 max-w-2xl leading-relaxed">
            The grid/dial/horizon/node concepts from before were four unrelated icon languages
            bolted onto the same block — that&apos;s the &quot;too distinct&quot; problem. These three
            options instead reuse only what&apos;s already on the site: the same{" "}
            <code className="bg-[#141414]/10 px-1 rounded">LogoMark</code> silver flower and dot-matrix
            texture Hero already paints under its Ink block, and (where noted) the same{" "}
            <code className="bg-[#141414]/10 px-1 rounded">FlowerMotif</code> solid/hybrid/halftone/dissolve
            states already built for the homepage value props. Nothing new is invented — pages differ
            only by how much an existing brand variable (rotation, or dissolve state) shifts.
          </p>

          <p className="font-inter text-xs font-bold text-[#141414]/50 uppercase tracking-wide mb-3">
            Previous (flat Ink + one static flower, no texture, identical on all four)
          </p>
          <div className="max-w-sm mb-10">
            <HeroMock label="Previous" desc="No dot-matrix texture, no ghost flower — read flatter than the homepage hero it was supposed to match.">
              <div className="absolute right-0 top-0 bottom-0 w-[55%] bg-[#141414]" />
              <BrandFlower size={90} className="absolute right-[16%] top-1/2 -translate-y-1/2" />
            </HeroMock>
          </div>

          {/* Option 1 — chosen, now live */}
          <div className="mb-3 flex items-center gap-3">
            <span className="bg-[#7A2331] text-white text-[11px] font-bold uppercase tracking-wide px-2.5 py-1">
              Live — implemented in PageHero.tsx
            </span>
            <p className="font-inter text-sm font-bold text-[#141414]">
              Option 1 — Hero Echo, rotation-varied
            </p>
          </div>
          <p className="font-inter text-xs text-[#141414]/65 mb-4 max-w-2xl leading-relaxed">
            Identical composition on every page — dot-matrix texture, oversized ghost flower bleeding
            off the edge, one foreground silver <code className="bg-[#141414]/10 px-1 rounded">LogoMark</code>{" "}
            — exactly matching the homepage Hero. The only per-page change is the foreground flower&apos;s
            rotation angle, since rotation is already a meaningful brand variable (the Hero&apos;s
            pointer-driven spin), not a new idea.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {CORNER_PAGES.map((page) => (
              <div key={page.label} className="border border-[#141414]/10 bg-white">
                <CornerBase>
                  <LogoMark size={72} tone="silver" rotation={page.rotation} />
                </CornerBase>
                <p className="font-inter text-xs font-bold text-[#141414] p-2">{page.label}</p>
              </div>
            ))}
          </div>

          {/* Option 2 */}
          <p className="font-inter text-sm font-bold text-[#141414] mb-2">
            Option 2 — Hero Echo, fully uniform
          </p>
          <p className="font-inter text-xs text-[#141414]/65 mb-4 max-w-2xl leading-relaxed">
            The same composition with zero per-page variation at all — the safest, most consistent
            read if even a rotation difference feels like too much. All four pages become
            pixel-identical to each other and to the Hero&apos;s block.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {CORNER_PAGES.map((page) => (
              <div key={page.label} className="border border-[#141414]/10 bg-white">
                <CornerBase>
                  <LogoMark size={72} tone="silver" rotation={0} />
                </CornerBase>
                <p className="font-inter text-xs font-bold text-[#141414] p-2">{page.label}</p>
              </div>
            ))}
          </div>

          {/* Option 3 */}
          <p className="font-inter text-sm font-bold text-[#141414] mb-2">
            Option 3 — Hero Echo, motif-state-varied
          </p>
          <p className="font-inter text-xs text-[#141414]/65 mb-4 max-w-2xl leading-relaxed">
            Same texture and ghost flower again, but the foreground mark swaps to{" "}
            <code className="bg-[#141414]/10 px-1 rounded">FlowerMotif</code> in a different
            already-approved state per page: solid for Products (fully formed/shipped), hybrid for
            Services (practice in motion), dissolve for About (evolving philosophy), halftone for
            Contact (still forming — reach out and shape it). More differentiated than Option 1, but
            every state already exists in the codebase for the value-props section.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CORNER_PAGES.map((page) => (
              <div key={page.label} className="border border-[#141414]/10 bg-white">
                <CornerBase>
                  <FlowerMotif motif={page.motif} size={72} />
                </CornerBase>
                <p className="font-inter text-xs font-bold text-[#141414] p-2">
                  {page.label} <span className="font-normal text-[#141414]/50">— {page.motif}</span>
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
