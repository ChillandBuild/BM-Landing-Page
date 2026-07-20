"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STEPS = [
  { icon: "verified", label: "Signature Verified", detail: "Webhook payload authenticated" },
  { icon: "manage_search", label: "RAG Query Context", detail: "Knowledge base matched to enquiry" },
  { icon: "call_split", label: "Lead Routed", detail: "Assigned to best-fit telecaller" },
  { icon: "fact_check", label: "Telecaller Logged", detail: "Activity recorded to CRM" },
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
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      };
      setLog((current) => [entry, ...current].slice(0, 4));
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-navy rounded-2xl border border-border-dark p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-accent-light animate-pulse" />
        <span className="font-inter text-xs uppercase tracking-widest text-ink-muted">Live Agent</span>
      </div>
      <div className="space-y-3 min-h-[220px]">
        <AnimatePresence initial={false}>
          {log.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 bg-white/[0.03] border border-border-dark rounded-xl px-4 py-3"
            >
              <span className="material-symbols-outlined text-accent-light text-[20px]">
                {entry.step.icon}
              </span>
              <div className="flex-1">
                <p className="font-inter text-sm text-ink font-semibold">{entry.step.label}</p>
                <p className="font-inter text-xs text-ink-muted">{entry.step.detail}</p>
              </div>
              <span className="font-inter text-[10px] text-ink-muted/70">{entry.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {log.length === 0 && (
          <p className="font-inter text-sm text-ink-muted">Initializing live feed…</p>
        )}
      </div>
    </div>
  );
}
