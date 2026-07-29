"use client";

import { useState, type CSSProperties } from "react";
import BrandFlower from "@/components/brand/BrandFlower";

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
                Option A — All Accent
              </p>
              <div className="w-20 h-20 flex items-center justify-center mb-4" style={{ backgroundColor: "var(--accent)" }}>
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
                        ? { backgroundColor: "var(--accent)", color: "#141414" }
                        : { border: "1px solid rgba(20,20,20,0.15)", color: "rgba(20,20,20,0.5)" }
                    }
                  >
                    0{n}
                  </div>
                ))}
              </div>
              <div className="w-32 h-px mb-4" style={{ backgroundColor: "var(--accent)" }} />
              <p className="font-inter text-xs text-[#141414]/65 leading-relaxed">
                One accent color across square, reached circles and the connecting line — simplest
                rule to keep consistent.
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
          <p className="font-inter text-sm text-[#141414]/65 mb-8 max-w-2xl leading-relaxed">
            Same four concepts as before, motifs now rendered in the picked accent color instead of
            gold.
          </p>

          <p className="font-inter text-xs font-bold text-[#141414]/50 uppercase tracking-wide mb-3">
            Current (all four pages, identical — flower now renders the real Oxblood)
          </p>
          <div className="max-w-md mb-10">
            <HeroMock label="Current" desc="Flat Ink block, one centred flower. Same on every page.">
              <div className="absolute right-0 top-0 bottom-0 w-[55%] bg-[#141414]" />
              <BrandFlower size={90} className="absolute right-[16%] top-1/2 -translate-y-1/2" />
            </HeroMock>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Products */}
            <HeroMock
              label="Products — Blueprint Grid"
              desc="A fine hairline grid over Ink in the picked accent, with two outlined tiles (AIRA / AstroTamil) floating on it."
            >
              <div className="absolute right-0 top-0 bottom-0 w-[55%] bg-[#141414] overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.35]"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />
                <div className="absolute left-[20%] top-[28%] w-14 h-10" style={{ border: "1px solid color-mix(in srgb, var(--accent) 70%, transparent)" }} />
                <div className="absolute left-[38%] top-[52%] w-10 h-14" style={{ border: "1px solid color-mix(in srgb, var(--accent) 70%, transparent)" }} />
                <BrandFlower size={56} className="absolute right-[12%] bottom-[12%] opacity-70" />
              </div>
            </HeroMock>

            {/* Services */}
            <HeroMock
              label="Services — Radial Dial"
              desc="Six thin spokes radiating from a centre point, one per service discipline, in the picked accent."
            >
              <div className="absolute right-0 top-0 bottom-0 w-[55%] bg-[#141414] flex items-center justify-center overflow-hidden">
                <svg width="140" height="140" viewBox="0 0 140 140">
                  {Array.from({ length: 6 }).map((_, i) => {
                    const angle = (i * 60 * Math.PI) / 180;
                    const x2 = 70 + 60 * Math.cos(angle);
                    const y2 = 70 + 60 * Math.sin(angle);
                    return (
                      <line
                        key={i}
                        x1="70"
                        y1="70"
                        x2={x2}
                        y2={y2}
                        style={{ stroke: "var(--accent)" }}
                        strokeWidth="1"
                        opacity="0.6"
                      />
                    );
                  })}
                  <circle cx="70" cy="70" r="42" fill="none" style={{ stroke: "var(--accent)" }} strokeWidth="0.75" opacity="0.35" />
                  <circle cx="70" cy="70" r="6" style={{ fill: "var(--accent)" }} />
                </svg>
              </div>
            </HeroMock>

            {/* About */}
            <HeroMock
              label="About — Layered Horizon"
              desc="Soft horizontal bands in the picked accent suggest depth/history; the flower stays a low-opacity watermark."
            >
              <div className="absolute right-0 top-0 bottom-0 w-[55%] bg-[#141414] overflow-hidden">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0"
                    style={{
                      top: `${20 + i * 18}%`,
                      height: "2px",
                      backgroundColor: "var(--accent)",
                      opacity: 0.14 + i * 0.05,
                    }}
                  />
                ))}
                <BrandFlower size={70} className="absolute right-[14%] bottom-[10%] opacity-25" />
              </div>
            </HeroMock>

            {/* Contact */}
            <HeroMock
              label="Contact — Signal Node"
              desc="A single node with concentric rings pulsing outward, in the picked accent — 'reach out / get a response.'"
            >
              <div className="absolute right-0 top-0 bottom-0 w-[55%] bg-[#141414] flex items-center justify-center overflow-hidden">
                <svg width="140" height="140" viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r="10" style={{ fill: "var(--accent)" }} />
                  <circle cx="70" cy="70" r="26" fill="none" style={{ stroke: "var(--accent)" }} strokeWidth="1" opacity="0.5" />
                  <circle cx="70" cy="70" r="42" fill="none" style={{ stroke: "var(--accent)" }} strokeWidth="1" opacity="0.3" />
                  <circle cx="70" cy="70" r="58" fill="none" style={{ stroke: "var(--accent)" }} strokeWidth="1" opacity="0.15" />
                </svg>
              </div>
            </HeroMock>
          </div>
        </section>
      </div>
    </main>
  );
}
