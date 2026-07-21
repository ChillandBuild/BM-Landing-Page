"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(pointer: coarse)";

function subscribe(onChange: () => void): () => void {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

/** Server render assumes a fine pointer; the client corrects on hydration. */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * True on touch devices, which have no pointer to fling the hero flower with —
 * callers fall back to scroll-driven motion there.
 */
export function useCoarsePointer(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
