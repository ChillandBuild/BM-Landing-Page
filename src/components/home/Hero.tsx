"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import BrandFlower from "@/components/brand/BrandFlower";
import BrandHeadline, { type HeadlineSegment } from "@/components/brand/BrandHeadline";
import { useSpinningFlower } from "@/hooks/useSpinningFlower";
import { useCoarsePointer } from "@/hooks/useCoarsePointer";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const TITLE: HeadlineSegment[] = [
  { text: "We build products that " },
  { text: "think", emphasis: true },
  { text: "." },
];

/** Degrees of rotation per pixel scrolled, for the touch fallback. */
const SCROLL_SPIN_RATE = 0.08;

export default function Hero() {
  const { angle, bind } = useSpinningFlower();

  // Touch devices have no pointer to fling the flower with, so rotation is
  // driven by scroll position instead.
  const isCoarsePointer = useCoarsePointer();
  const [scrollAngle, setScrollAngle] = useState(0);

  useEffect(() => {
    if (!isCoarsePointer) return;

    const onScroll = () => setScrollAngle(window.scrollY * SCROLL_SPIN_RATE);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isCoarsePointer]);

  return (
    <section
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-cream"
      onPointerMove={bind.onPointerMove}
    >
      {/* Desktop: a full-height block on the right with the flower straddling
          its edge — half on blue, half on paper — and the headline over it. */}
      <div className="absolute right-0 top-0 bottom-0 w-[42%] bg-blue hidden md:block" aria-hidden />

      {/* A far larger ghost of the same flower bleeds off the right edge and
          turns at a third of the speed, so the block reads as depth rather
          than a flat void. Drawn first so the solid flower stays in front. */}
      <BrandFlower
        size={820}
        rotation={(isCoarsePointer ? scrollAngle : angle) * 0.35}
        className="absolute right-[-18%] top-1/2 -translate-y-1/2 hidden md:block pointer-events-none opacity-[0.09] z-0"
      />

      <BrandFlower
        size={420}
        rotation={isCoarsePointer ? scrollAngle : angle}
        shadow
        className="absolute left-[58%] top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block pointer-events-none z-0"
      />

      {/* Mobile: the same two elements restated as a band beneath the copy, so
          the block never covers the headline on a narrow screen. */}
      <div
        className="absolute inset-x-0 bottom-0 h-[38vh] bg-blue flex items-center justify-center md:hidden"
        aria-hidden
      >
        <BrandFlower size={160} rotation={scrollAngle} />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-3xl mx-auto md:mx-0 md:ml-[8%] px-container-margin flex flex-col items-start pb-[40vh] md:pb-0"
      >
        <motion.span
          variants={item}
          className="font-inter text-xs uppercase tracking-[0.14em] text-blue font-bold mb-5"
        >
          AI-first product engineering
        </motion.span>

        <motion.div variants={item}>
          <BrandHeadline
            as="h1"
            segments={TITLE}
            className="text-5xl md:text-7xl leading-[1.03] text-ink mb-6"
          />
        </motion.div>

        <motion.p
          variants={item}
          className="font-inter text-lg text-ink/65 max-w-md mb-9 leading-relaxed"
        >
          An AI-first product engineering company for businesses that want more than software.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
        >
          <Link
            href="/contact"
            className="bg-coral text-ink px-8 py-4 rounded-[2px] font-semibold hover:opacity-90 transition-all"
          >
            Start a project
          </Link>
          <Link
            href="/products"
            className="text-ink font-semibold border-b-2 border-blue pb-0.5 hover:border-coral transition-colors"
          >
            Explore products
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
