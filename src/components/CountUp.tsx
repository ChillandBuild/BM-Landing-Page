"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

type CountUpProps = {
  target: number;
  delay: number;
  duration?: number;
  suffix?: string;
};

/** Animates 0 -> target as text content, without triggering a React re-render per frame. */
export default function CountUp({ target, delay, duration = 1.1, suffix = "" }: CountUpProps) {
  const value = useMotionValue(0);
  const display = useTransform(value, (latest) => `${Math.round(latest).toLocaleString()}${suffix}`);

  useEffect(() => {
    const controls = animate(value, target, { duration, delay, ease: "easeOut" });
    return controls.stop;
  }, [value, target, delay, duration]);

  return <motion.span>{display}</motion.span>;
}
