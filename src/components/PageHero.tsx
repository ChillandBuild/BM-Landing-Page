"use client";

import { motion, type Variants } from "framer-motion";

type PageHeroProps = {
  eyebrow: string;
  title: string;
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

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative bg-paper pt-40 pb-20 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(92,127,224,0.20) 0%, rgba(250,250,248,0) 60%), #FAFAF8",
        }}
      />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto px-container-margin text-center"
      >
        <motion.p
          variants={item}
          className="font-inter text-xs uppercase tracking-[0.2em] text-accent mb-4"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          variants={item}
          className="font-display text-4xl md:text-6xl text-ink-dark mb-6 leading-tight"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={item}
          className="font-inter text-lg text-ink-dark-muted max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
      </motion.div>
    </section>
  );
}
