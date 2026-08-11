"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AiraLiveSimulation from "@/components/AiraLiveSimulation";
import AiraAnalyticsDashboard from "@/components/AiraAnalyticsDashboard";
import AiraTelecallerPerformance from "@/components/AiraTelecallerPerformance";

type Scene = "whatsapp" | "dashboard" | "telecaller";

const SCENE_TRANSITION = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

/**
 * Product-demo shell: the WhatsApp conversation (AiraLiveSimulation, kept
 * exactly as it behaves standalone) plays to its hold state, then this
 * cross-fades through the animated lead-analytics dashboard and the
 * telecaller assignment/performance scene, then back to WhatsApp — a
 * looping "customer talks to AIRA -> AIRA scores the lead -> AIRA assigns
 * and tracks the team" demo.
 *
 * Mounting each scene fresh on every visit is what makes the loop work:
 * AiraLiveSimulation's own tick state resets to 0, so it naturally replays
 * its conversation from the top without any extra reset wiring here. All
 * three scenes share one fixed card height (below) so nothing jumps at the
 * cross-fades — Scene 3 is the tallest content, the others just get room.
 */
export default function AiraProductDemo() {
  const [scene, setScene] = useState<Scene>("whatsapp");

  const showDashboard = useCallback(() => setScene("dashboard"), []);
  const showTelecaller = useCallback(() => setScene("telecaller"), []);
  const showWhatsApp = useCallback(() => setScene("whatsapp"), []);

  return (
    <div className="bg-ink min-h-[560px] flex flex-col overflow-hidden relative">
      <AnimatePresence mode="wait" initial={false}>
        {scene === "whatsapp" && (
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
        )}
        {scene === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={SCENE_TRANSITION}
            className="flex-1 flex flex-col"
          >
            <AiraAnalyticsDashboard onFinished={showTelecaller} />
          </motion.div>
        )}
        {scene === "telecaller" && (
          <motion.div
            key="telecaller"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={SCENE_TRANSITION}
            className="flex-1 flex flex-col"
          >
            <AiraTelecallerPerformance onFinished={showWhatsApp} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
