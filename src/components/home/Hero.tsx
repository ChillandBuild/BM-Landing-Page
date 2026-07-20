"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const AmbientBackground = dynamic(() => import("@/components/AmbientBackground"), {
  ssr: false,
});

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const EASE = [0.22, 1, 0.36, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-paper">
      <AmbientBackground />

      {/* Decorative arcs, echoing the reference layout's curved lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <circle
          cx="50%"
          cy="0"
          r="45%"
          fill="none"
          stroke="rgba(61,90,194,0.18)"
          strokeWidth="1"
        />
        <circle
          cx="50%"
          cy="0"
          r="62%"
          fill="none"
          stroke="rgba(92,127,224,0.12)"
          strokeWidth="1"
        />
      </svg>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-3xl mx-auto px-container-margin w-full text-center flex flex-col items-center"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 font-inter text-xs uppercase tracking-[0.2em] text-accent border border-accent/25 bg-white/70 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-light" />
          AI-First Product Engineering
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display text-5xl md:text-7xl leading-[1.05] text-ink-dark mb-6"
        >
          Intelligent products, <span className="text-gradient-indigo">engineered</span> to
          compound.
        </motion.h1>

        <motion.p
          variants={item}
          className="font-inter text-lg text-ink-dark-muted max-w-xl mb-10 leading-relaxed"
        >
          Bloom Matrix designs, builds, and continuously evolves AI-powered products, enterprise
          software, and SaaS platforms — as a single long-term technology partner, not another
          vendor.
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="bg-gradient-indigo text-white px-8 py-4 rounded-xl font-bold text-center hover:opacity-90 transition-all shadow-lg shadow-accent/20"
          >
            Book a Strategy Call
          </Link>
          <Link
            href="/products"
            className="border border-ink-dark/15 text-ink-dark px-8 py-4 rounded-xl font-bold text-center hover:bg-navy/[0.04] transition-all"
          >
            Explore Products
          </Link>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-10 font-inter text-[11px] uppercase tracking-[0.18em] text-ink-dark-muted"
        >
          Generative AI · LLM Agents · Voice AI · FastAPI Microservices · Multi-tenant SaaS
        </motion.p>
      </motion.div>
    </section>
  );
}
