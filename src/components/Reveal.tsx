"use client";

import React from "react";
import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Shared scroll-reveal wrapper — fades/slides content up as it enters the
 * viewport. Used sitewide instead of static text so sections don't feel
 * inert, matching the smooth-transition feel of the Gladia reference.
 */
export default function Reveal({ children, delay = 0, y = 22, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
