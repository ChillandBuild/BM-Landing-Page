"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STEPS = [
  { label: "Signature Verified", detail: "Webhook payload authenticated" },
  { label: "RAG Query Context", detail: "Knowledge base matched to enquiry" },
  { label: "Lead Routed", detail: "Assigned to best-fit telecaller" },
  { label: "Telecaller Logged", detail: "Activity recorded to CRM" },
] as const;

type LogEntry = {
  id: number;
  step: (typeof STEPS)[number];
  time: string;
};

/**
 * Self-contained animated feed standing in for a real AIRA demo video —
 * no external asset, cycles through the product's real workflow steps.
 */
export default function AiraLiveSimulation() {
  const [log, setLog] = useState<LogEntry[]>([]);
  const stepRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const step = STEPS[stepRef.current % STEPS.length];
      stepRef.current += 1;
      const entry: LogEntry = {
        id: Date.now(),
        step,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };
      setLog((current) => [entry, ...current].slice(0, 4));
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-ink p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-5">
        <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
        <span className="font-inter text-xs uppercase tracking-widest text-cream/70">
          Live Agent
        </span>
      </div>
      <div className="space-y-px min-h-[220px] bg-cream/10">
        <AnimatePresence initial={false}>
          {log.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 bg-ink px-4 py-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-coral shrink-0" aria-hidden />
              <div className="flex-1">
                <p className="font-inter text-sm text-cream font-semibold">{entry.step.label}</p>
                <p className="font-inter text-xs text-cream/60">{entry.step.detail}</p>
              </div>
              <span className="font-inter text-[10px] text-cream/40">{entry.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {log.length === 0 && (
          <p className="font-inter text-sm text-cream/60 bg-ink px-4 py-3">
            Initializing live feed…
          </p>
        )}
      </div>
    </div>
  );
}
