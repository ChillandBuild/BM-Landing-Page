"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import LogoMark from "@/components/brand/LogoMark";
import BrandHeadline from "@/components/brand/BrandHeadline";

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
      className="relative bg-ink"
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
                <BrandHeadline
                  as="h3"
                  segments={[{ text: prop.title }]}
                  className="text-3xl md:text-4xl text-cream mb-3"
                />
                <p className="font-inter text-cream/70 max-w-md">{prop.body}</p>
              </div>
            ))}
          </div>

          {/* Pinned visual: the brand mark itself, silver on Ink, turning a
              notch further per prop. */}
          <div className="relative h-[360px] bg-ink overflow-hidden flex items-center justify-center">
            <span className="absolute top-6 left-7 font-inter text-xs font-bold tracking-[0.14em] text-cream/60">
              {`0${activeIndex + 1} / 0${VALUE_PROPS.length}`}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <LogoMark size={200} tone="silver" rotation={activeIndex * 22} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
