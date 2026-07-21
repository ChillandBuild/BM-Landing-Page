"use client";

import { motion, type Variants } from "framer-motion";
import BrandFlower from "@/components/brand/BrandFlower";
import BrandHeadline, { type HeadlineSegment } from "@/components/brand/BrandHeadline";

type PageHeroProps = {
  eyebrow: string;
  titleSegments: HeadlineSegment[];
  description: string;
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

export default function PageHero({ eyebrow, titleSegments, description }: PageHeroProps) {
  return (
    <section className="relative bg-cream pt-40 pb-20 overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-[38%] bg-blue" aria-hidden />
      <BrandFlower
        size={280}
        shadow
        className="absolute right-[10%] top-24 hidden md:block pointer-events-none"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto px-container-margin"
      >
        <motion.p
          variants={item}
          className="font-inter text-xs uppercase tracking-[0.14em] text-blue font-bold mb-4"
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
