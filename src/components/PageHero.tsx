"use client";

import { motion, type Variants } from "framer-motion";
import LogoMark from "@/components/brand/LogoMark";
import BrandHeadline, { type HeadlineSegment } from "@/components/brand/BrandHeadline";

type PageHeroProps = {
  eyebrow: string;
  titleSegments: HeadlineSegment[];
  description: string;
  /** Degrees to rotate the foreground flower. The corner block is otherwise
   *  identical to the Hero's (same dot-matrix texture, same oversized ghost
   *  flower bleeding off the edge) on every page — rotation is the one
   *  deliberate per-page variable, chosen because it's already a meaningful
   *  brand variable via the Hero's pointer-driven spin, not a new idea. */
  flowerRotation?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Same dot-matrix texture as Hero.tsx's Ink block, so this corner reads as
 *  the same surface as the homepage hero rather than a flatter restatement. */
const DOT_MATRIX = {
  backgroundImage: "radial-gradient(circle, rgba(242,239,233,0.16) 1.2px, transparent 1.2px)",
  backgroundSize: "22px 22px",
} as const;

export default function PageHero({
  eyebrow,
  titleSegments,
  description,
  flowerRotation = 0,
}: PageHeroProps) {
  return (
    <section className="relative bg-cream pt-40 pb-20 overflow-hidden">
      {/* Block and flowers are desktop-only: at narrow widths they would cover
          the headline rather than sit beside it. */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[38%] bg-ink hidden md:block"
        style={DOT_MATRIX}
        aria-hidden
      />
      {/* Oversized ghost bleeding off the block's outer edge — same treatment
          as the Hero's ghost flower, scaled down for this shorter section. */}
      <LogoMark
        size={340}
        tone="silver"
        rotation={-15}
        className="absolute right-[-8%] top-1/2 -translate-y-1/2 hidden md:block pointer-events-none opacity-[0.1] z-0"
      />
      <LogoMark
        size={260}
        tone="silver"
        rotation={flowerRotation}
        className="absolute right-[9%] top-28 hidden md:block pointer-events-none z-0"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-7xl mx-auto px-container-margin md:pr-[44%]"
      >
        <motion.p
          variants={item}
          className="font-inter text-xs uppercase tracking-[0.14em] text-oxblood font-bold mb-4"
        >
          {eyebrow}
        </motion.p>
        <motion.div variants={item}>
          <BrandHeadline
            as="h1"
            segments={titleSegments}
            className="text-4xl md:text-6xl text-ink mb-6 leading-[1.05]"
          />
        </motion.div>
        <motion.p
          variants={item}
          className="font-inter text-lg text-ink/65 max-w-xl leading-relaxed"
        >
          {description}
        </motion.p>
      </motion.div>
    </section>
  );
}
