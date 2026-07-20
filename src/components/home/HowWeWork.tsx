"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const STEPS = [
  {
    icon: "search",
    step: "01",
    title: "Discover",
    body: "We start by understanding the business problem, not the tech wishlist.",
  },
  {
    icon: "design_services",
    step: "02",
    title: "Design",
    body: "Product architecture and UX decisions made together, not in sequence.",
  },
  {
    icon: "construction",
    step: "03",
    title: "Build",
    body: "Engineering executed with product-grade discipline — scalable and maintainable from day one.",
  },
  {
    icon: "rocket_launch",
    step: "04",
    title: "Deploy",
    body: "Shipped into production with the operational rigor of a long-term system, not a demo.",
  },
  {
    icon: "autorenew",
    step: "05",
    title: "Evolve",
    body: "Bloom Matrix stays on as the long-term partner, continuously improving what's shipped.",
  },
];

export default function HowWeWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(STEPS.length - 1, Math.floor(latest * STEPS.length));
    setActiveIndex(index);
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-paper border-t border-border-light"
      style={{ height: `${STEPS.length * 70}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-container-margin w-full grid md:grid-cols-[0.8fr_1.2fr] gap-16 items-center">
          <div className="relative">
            <p className="font-inter text-xs uppercase tracking-[0.2em] text-accent mb-4">
              How We Work
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-ink-dark mb-4">
              One partner, the whole lifecycle.
            </h2>
            <p className="font-inter text-sm text-ink-dark-muted max-w-sm mb-8 leading-relaxed">
              Every Bloom Matrix engagement runs from discovery through deployment to continuous
              evolution — a single team accountable end to end, from idea to every release after.
            </p>
            <div className="relative w-40 h-40 rounded-2xl bg-gradient-indigo flex items-center justify-center mb-8 shadow-lg shadow-accent/20">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="material-symbols-outlined text-white text-[56px]"
                >
                  {STEPS[activeIndex].icon}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="flex gap-2">
              {STEPS.map((s, i) => (
                <div key={s.step} className="h-1 flex-1 rounded-full bg-border-light overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-indigo"
                    initial={false}
                    animate={{ width: i <= activeIndex ? "100%" : "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Connecting timeline: static track + gradient fill up to the active node */}
            <div className="absolute left-[17px] top-4 bottom-4 w-px bg-border-light" aria-hidden />
            <motion.div
              className="absolute left-[17px] top-4 w-px bg-gradient-indigo"
              aria-hidden
              initial={false}
              animate={{ height: `${(activeIndex / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.4 }}
              style={{ maxHeight: "calc(100% - 2rem)" }}
            />
            <div className="space-y-6">
              {STEPS.map((s, index) => {
                const isActive = activeIndex === index;
                const isReached = index <= activeIndex;
                return (
                  <div key={s.step} className="relative flex gap-6">
                    <div
                      className={`relative z-10 shrink-0 w-9 h-9 rounded-full border flex items-center justify-center font-inter text-[11px] font-bold transition-colors duration-300 ${
                        isReached
                          ? "bg-gradient-indigo border-transparent text-white"
                          : "bg-paper border-border-light text-ink-dark-muted"
                      }`}
                    >
                      {s.step}
                    </div>
                    <div className="pt-1.5">
                      <h3
                        className="font-display text-2xl md:text-3xl text-ink-dark transition-opacity duration-300"
                        style={{ opacity: isActive ? 1 : 0.4 }}
                      >
                        {s.title}
                      </h3>
                      <motion.div
                        initial={false}
                        animate={{
                          height: isActive ? "auto" : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="font-inter text-ink-dark-muted max-w-md pt-2">{s.body}</p>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
