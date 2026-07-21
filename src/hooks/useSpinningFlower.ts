"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { addImpulse, stepSpin, type SpinState } from "@/lib/spin";

/** Degrees-per-ms of angular velocity added per pixel of pointer travel. */
const IMPULSE_SCALE = 0.0016;
const MAX_IMPULSE = 0.06;

/**
 * Drives the hero flower: pointer movement adds angular momentum, friction
 * decays it back to rest. Honours prefers-reduced-motion by staying static —
 * callers handle the coarse-pointer (touch) fallback themselves.
 */
export function useSpinningFlower() {
  const [angle, setAngle] = useState(0);
  const state = useRef<SpinState>({ angle: 0, velocity: 0 });
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;

    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(now - last, 48);
      last = now;
      state.current = stepSpin(state.current, dt);
      setAngle(state.current.angle);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerMove = (event: PointerEvent) => {
    if (reduced.current) return;
    const travel = Math.abs(event.movementX) + Math.abs(event.movementY);
    state.current = addImpulse(state.current, Math.min(travel * IMPULSE_SCALE, MAX_IMPULSE));
  };

  return { angle, bind: { onPointerMove } };
}
