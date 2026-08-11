"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import BrandHeadline from "@/components/brand/BrandHeadline";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Same dot-matrix texture as PageHero's ink block, so this reads as the
 *  same brand surface rather than a one-off background. */
const DOT_MATRIX = {
  backgroundImage: "radial-gradient(circle, rgba(242,239,233,0.14) 1.2px, transparent 1.2px)",
  backgroundSize: "22px 22px",
} as const;

const ORIGIN = { x: 110, y: 170 };

/**
 * Deliberately abstract — no real client geography is available (see
 * .agents/context/company-and-brand.md), so these represent "international
 * markets" in general rather than any specific country. Control points are
 * hand-placed per node for varied, elegant arcs rather than a formula.
 */
const DESTINATIONS = [
  { x: 430, y: 70, control: { x: 260, y: 30 } },
  { x: 610, y: 55, control: { x: 390, y: 15 } },
  { x: 665, y: 175, control: { x: 400, y: 150 } },
  { x: 560, y: 280, control: { x: 340, y: 265 } },
  { x: 375, y: 268, control: { x: 230, y: 255 } },
];

function NetworkVisual() {
  return (
    <svg
      viewBox="0 0 760 340"
      className="w-full h-auto max-w-2xl mx-auto"
      role="img"
      aria-label="Network diagram showing connections from India to international markets"
    >
      <defs>
        <filter id="global-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {DESTINATIONS.map((node, index) => (
        <motion.path
          key={index}
          d={`M${ORIGIN.x},${ORIGIN.y} Q${node.control.x},${node.control.y} ${node.x},${node.y}`}
          fill="none"
          stroke="#7A2331"
          strokeWidth={1.5}
          strokeOpacity={0.55}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, delay: 0.3 + index * 0.22, ease: EASE }}
        />
      ))}

      {/* India — the origin node, with a soft static glow and a continuous pulse. */}
      <circle cx={ORIGIN.x} cy={ORIGIN.y} r={16} fill="#7A2331" opacity={0.18} filter="url(#global-glow)" />
      <circle cx={ORIGIN.x} cy={ORIGIN.y} r={6} className="fill-oxblood animate-pulse" />
      <text
        x={ORIGIN.x}
        y={ORIGIN.y + 28}
        textAnchor="middle"
        className="fill-cream font-inter font-bold"
        style={{ fontSize: 12, letterSpacing: "0.12em" }}
      >
        INDIA
      </text>

      {DESTINATIONS.map((node, index) => {
        const delay = 0.3 + index * 0.22 + 1;
        return (
          <g key={index}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={10}
              fill="#F2EFE9"
              initial={{ opacity: 0.5, scale: 0.6 }}
              whileInView={{ opacity: [0.5, 0, 0], scale: [0.6, 2.2, 2.2] }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay, ease: "easeOut" }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={3.5}
              className="fill-cream"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay, ease: EASE }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
          </g>
        );
      })}

      <text
        x="530"
        y="325"
        textAnchor="middle"
        className="fill-cream/50 font-inter font-bold"
        style={{ fontSize: 11, letterSpacing: "0.14em" }}
      >
        INTERNATIONAL MARKETS
      </text>
    </svg>
  );
}

/** Simplified mobile fallback: the fan-network above doesn't stay legible
 *  much below tablet width, so this swaps to the vertical India-to-markets
 *  layout the brief itself sketched out, instead of just scaling the SVG down. */
function NetworkVisualMobile() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <span className="relative flex w-3 h-3">
          <span className="absolute inline-flex h-full w-full rounded-full bg-oxblood opacity-60 animate-ping" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-oxblood" />
        </span>
        <span
          className="font-inter font-bold text-cream"
          style={{ fontSize: 12, letterSpacing: "0.12em" }}
        >
          INDIA
        </span>
      </div>

      <motion.div
        className="w-px bg-cream/25"
        initial={{ height: 0 }}
        whileInView={{ height: 36 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
      />

      <div className="flex items-center gap-4">
        {[0, 1, 2, 3].map((index) => (
          <motion.span
            key={index}
            className="w-2.5 h-2.5 rounded-full bg-cream"
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.15, ease: EASE }}
          />
        ))}
      </div>
      <span
        className="font-inter font-bold text-cream/50"
        style={{ fontSize: 11, letterSpacing: "0.14em" }}
      >
        INTERNATIONAL MARKETS
      </span>
    </div>
  );
}

export default function GlobalDelivery() {
  return (
    <section className="relative bg-ink py-24 md:py-32 overflow-hidden border-t border-cream/10">
      <div className="absolute inset-0" style={DOT_MATRIX} aria-hidden />

      <div className="relative z-10 max-w-5xl mx-auto px-container-margin">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-oxblood" aria-hidden />
            <p className="font-inter text-xs uppercase tracking-[0.14em] text-cream/70 font-bold">
              Global Delivery
            </p>
          </div>
          <BrandHeadline
            as="h2"
            seeded={false}
            segments={[{ text: "Built in India. " }, { text: "Delivered worldwide.", emphasis: true }]}
            className="uppercase text-3xl md:text-5xl text-cream mb-6 leading-[1.15] tracking-tight"
          />
          <p className="font-inter text-cream/70 leading-relaxed">
            We build and deliver digital products for businesses across international markets —
            turning ideas into scalable, production-ready technology.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="hidden md:block">
            <NetworkVisual />
          </div>
          <div className="md:hidden">
            <NetworkVisualMobile />
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-14 pt-8 border-t border-cream/10 flex flex-col items-center gap-1.5 text-center">
            <p className="font-inter text-sm text-cream/60">Client identities remain confidential.</p>
            <p className="font-inter text-xs uppercase tracking-[0.14em] text-cream/40">
              Selected international engagements
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
