"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

const VALUE_PROPS = [
  {
    title: "Scalable by default",
    body: "Every system is architected to grow with the business, not be rebuilt by it.",
  },
  {
    title: "Intelligent at the core",
    body: "AI isn't bolted on after the fact — it's part of how the product thinks from day one.",
  },
  {
    title: "Secure by design",
    body: "Security is a first-class requirement, not a post-launch checklist item.",
  },
  {
    title: "Continuously evolving",
    body: "Products ship, then keep improving — Bloom Matrix stays the long-term partner, not a one-time vendor.",
  },
];

export default function ValuePropsSticky() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(VALUE_PROPS.length - 1, Math.floor(latest * VALUE_PROPS.length));
    setActiveIndex(index);
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-navy"
      style={{ height: `${VALUE_PROPS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-container-margin w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-14">
            {VALUE_PROPS.map((prop, index) => (
              <div
                key={prop.title}
                className="transition-opacity duration-300"
                style={{ opacity: activeIndex === index ? 1 : 0.3 }}
              >
                <h3 className="font-display text-3xl md:text-4xl text-ink mb-3">{prop.title}</h3>
                <p className="font-inter text-ink-muted max-w-md">{prop.body}</p>
              </div>
            ))}
          </div>
          <div className="relative h-[360px] rounded-2xl border border-border-dark bg-white/[0.02] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-40 h-40 rounded-full bg-gradient-indigo opacity-70 blur-2xl" />
                <span className="absolute font-display text-6xl text-ink/20">
                  {`0${activeIndex + 1}`}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
