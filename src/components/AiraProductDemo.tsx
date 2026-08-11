"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AiraLiveSimulation from "@/components/AiraLiveSimulation";
import AiraAnalyticsDashboard from "@/components/AiraAnalyticsDashboard";

type Scene = "whatsapp" | "dashboard";

const SCENE_TRANSITION = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

/**
 * Product-demo shell: the WhatsApp conversation (AiraLiveSimulation, kept
 * exactly as it behaves standalone) plays to its hold state, then this
 * cross-fades into the animated lead-analytics dashboard and back — a
 * looping "customer talks to AIRA -> AIRA tells you who to call" demo.
 *
 * Mounting each scene fresh on every visit is what makes the loop work:
 * AiraLiveSimulation's own tick state resets to 0, so it naturally replays
 * its conversation from the top without any extra reset wiring here.
 */
export default function AiraProductDemo() {
  const [scene, setScene] = useState<Scene>("whatsapp");

  const showDashboard = useCallback(() => setScene("dashboard"), []);
  const showWhatsApp = useCallback(() => setScene("whatsapp"), []);

  return (
    <div className="bg-ink min-h-[480px] flex flex-col overflow-hidden relative">
      <AnimatePresence mode="wait" initial={false}>
        {scene === "whatsapp" ? (
          <motion.div
            key="whatsapp"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={SCENE_TRANSITION}
            className="flex-1 flex flex-col"
          >
            <AiraLiveSimulation onCycleComplete={showDashboard} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={SCENE_TRANSITION}
            className="flex-1 flex flex-col"
          >
            <AiraAnalyticsDashboard onFinished={showWhatsApp} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
