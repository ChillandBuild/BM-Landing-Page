"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Turn = { from: "lead" | "aira"; text: string };

/**
 * An illustrative inbound conversation — AIRA is multi-tenant, so this stands
 * in for an enquiry arriving on a customer's own channel. Deliberately generic:
 * no named person or company, nothing that could read as a real client.
 */
const CONVERSATION: Turn[] = [
  { from: "lead", text: "Hi — do you supply in bulk for retail stores?" },
  {
    from: "aira",
    text: "We do. Wholesale pricing starts at 50 units, with distributor rates above 150. What volume are you planning?",
  },
  { from: "lead", text: "Around 200 units a month." },
  {
    from: "aira",
    text: "That qualifies for the distributor rate. I'm handing you to the team now — they'll call within the hour.",
  },
];

/** One extra step past the conversation holds the routing outcome on screen. */
const TOTAL_STEPS = CONVERSATION.length + 1;

const LEAD_DELAY = 1500;
const TYPING_DELAY = 2100;
const HOLD_DELAY = 3800;

function delayFor(revealed: number): number {
  if (revealed >= CONVERSATION.length) return HOLD_DELAY;
  return CONVERSATION[revealed].from === "aira" ? TYPING_DELAY : LEAD_DELAY;
}

type AiraLiveSimulationProps = {
  /** Fires once per loop, the instant the conversation reaches its hold
   *  state — right before it would restart. Optional; standalone usage
   *  (no prop passed) behaves exactly as before. */
  onCycleComplete?: () => void;
};

export default function AiraLiveSimulation({ onCycleComplete }: AiraLiveSimulationProps = {}) {
  const reducedMotion = usePrefersReducedMotion();

  // A single monotonic counter drives everything: which turns are visible and
  // which replay we are on. Nothing is reordered mid-flight, so the panel can
  // never render its turns out of sequence.
  const [tick, setTick] = useState(0);

  const cycle = Math.floor(tick / TOTAL_STEPS);
  const revealed = reducedMotion ? CONVERSATION.length : tick % TOTAL_STEPS;
  const isTyping =
    !reducedMotion && revealed < CONVERSATION.length && CONVERSATION[revealed].from === "aira";
  const isComplete = revealed >= CONVERSATION.length;

  useEffect(() => {
    if (reducedMotion) return;
    const stepInCycle = tick % TOTAL_STEPS;
    if (stepInCycle === CONVERSATION.length) onCycleComplete?.();
    const timer = setTimeout(() => setTick((current) => current + 1), delayFor(stepInCycle));
    return () => clearTimeout(timer);
  }, [tick, reducedMotion, onCycleComplete]);

  return (
    <div className="bg-ink p-6 md:p-7 h-full min-h-[380px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-oxblood animate-pulse" aria-hidden />
          <span className="font-inter text-[11px] uppercase tracking-[0.16em] text-cream font-bold">
            AIRA
          </span>
        </div>
        <span className="font-inter text-[10px] uppercase tracking-[0.14em] text-cream/70 border border-cream/25 rounded-[2px] px-2 py-1">
          WhatsApp
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={cycle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="flex-1 flex flex-col justify-end gap-3"
        >
          {CONVERSATION.slice(0, revealed).map((turn, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={
                turn.from === "aira"
                  ? "self-end max-w-[85%] bg-cream text-ink rounded-[2px] px-4 py-3"
                  : "self-start max-w-[80%] border border-cream/30 text-cream rounded-[2px] px-4 py-3"
              }
            >
              <p className="font-inter text-[13px] leading-relaxed">{turn.text}</p>
            </motion.div>
          ))}

          {isTyping && (
            <div className="self-end bg-cream rounded-[2px] px-4 py-3.5 flex gap-1.5" aria-hidden>
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  className="w-1.5 h-1.5 rounded-full bg-oxblood"
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 1, repeat: Infinity, delay: dot * 0.18 }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 pt-4 border-t border-cream/20 min-h-[44px] flex items-center">
        {isComplete && (
          <motion.p
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="font-inter text-[11px] text-cream/85 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-oxblood shrink-0" aria-hidden />
            Lead qualified — routed to a telecaller and logged to CRM.
          </motion.p>
        )}
      </div>
    </div>
  );
}
