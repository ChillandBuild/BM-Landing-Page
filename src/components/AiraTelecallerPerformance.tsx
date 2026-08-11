"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CountUp from "@/components/CountUp";

type Temperature = "hot" | "warm" | "cold";

/**
 * Illustrative sample data — same "no real client/company" spirit as the
 * WhatsApp conversation and analytics scenes. Conversion % is always
 * derived from converted/assigned, never hand-typed.
 */
const CATEGORY_META: Record<Temperature, { label: string; color: string }> = {
  hot: { label: "Hot", color: "#DE4A63" },
  warm: { label: "Warm", color: "#B58B36" },
  cold: { label: "Cold", color: "#6483C2" },
};

type Lead = {
  name: string;
  temperature: Temperature;
  source: string;
  priority: "High" | "Medium" | "Low";
  assignedTo: string;
};

const LEADS: Lead[] = [
  { name: "Rahul Traders", temperature: "hot", source: "WhatsApp", priority: "High", assignedTo: "Arun" },
  { name: "Priya Stores", temperature: "hot", source: "Website", priority: "High", assignedTo: "Divya" },
  { name: "Kumar Agencies", temperature: "warm", source: "WhatsApp", priority: "Medium", assignedTo: "Karthik" },
  { name: "Anitha Retail", temperature: "cold", source: "Campaign", priority: "Low", assignedTo: "Divya" },
];

type Telecaller = { name: string; assigned: number; contacted: number; converted: number };

const TELECALLERS: Telecaller[] = [
  { name: "Arun", assigned: 42, contacted: 38, converted: 11 },
  { name: "Divya", assigned: 38, contacted: 35, converted: 13 },
  { name: "Karthik", assigned: 45, contacted: 41, converted: 8 },
];

const RANKED_TELECALLERS = [...TELECALLERS].sort(
  (a, b) => b.converted / b.assigned - a.converted / a.assigned,
);
const MEDALS = ["🥇", "🥈", "🥉"];

/** Illustrative cumulative conversions across the week, ending at the team total. */
const TREND_POINTS = [14, 18, 21, 24, 28, 32];

const INSIGHTS = ["Divya has the highest conversion rate this week.", "Arun has 7 high-priority leads awaiting follow-up."];

const EASE = [0.22, 1, 0.36, 1] as const;
const SCENE_TRANSITION = { duration: 0.7, ease: EASE };

// Assignment sub-scene choreography.
const ROW_START = 0.1;
const ROW_STAGGER = 0.15;
const ASSIGN_REVEAL_START = ROW_START + LEADS.length * ROW_STAGGER + 0.3;
const ASSIGN_REVEAL_STAGGER = 0.5;
const RECOMMENDATION_AT = ASSIGN_REVEAL_START + ASSIGN_REVEAL_STAGGER + 0.3;
const ASSIGN_HOLD = 1600;
const ASSIGN_TOTAL_MS =
  (ASSIGN_REVEAL_START + LEADS.length * ASSIGN_REVEAL_STAGGER) * 1000 + ASSIGN_HOLD;

// Performance sub-scene choreography.
const CARD_START = 0.1;
const CARD_STAGGER = 0.15;
const TREND_START = CARD_START + TELECALLERS.length * CARD_STAGGER + 0.4;
const TREND_DURATION = 1.1;
const INSIGHTS_START = TREND_START + TREND_DURATION + 0.3;
const INSIGHTS_STAGGER = 0.35;
const PERFORMANCE_HOLD = 3200;
const PERFORMANCE_TOTAL_MS = (INSIGHTS_START + INSIGHTS.length * INSIGHTS_STAGGER) * 1000 + PERFORMANCE_HOLD;

function TemperatureDot({ temperature }: { temperature: Temperature }) {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full shrink-0"
      style={{ backgroundColor: CATEGORY_META[temperature].color }}
      aria-hidden
    />
  );
}

function AssignmentView() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [showRecommendation, setShowRecommendation] = useState(false);

  useEffect(() => {
    const timers = LEADS.map((_, index) =>
      setTimeout(
        () => setRevealedCount((count) => Math.max(count, index + 1)),
        (ASSIGN_REVEAL_START + index * ASSIGN_REVEAL_STAGGER) * 1000,
      ),
    );
    const recommendTimer = setTimeout(() => setShowRecommendation(true), RECOMMENDATION_AT * 1000);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(recommendTimer);
    };
  }, []);

  const tally = TELECALLERS.map((telecaller) => ({
    name: telecaller.name,
    count: LEADS.slice(0, revealedCount).filter((lead) => lead.assignedTo === telecaller.name).length,
  }));

  return (
    <div className="bg-ink p-6 md:p-7 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-oxblood animate-pulse" aria-hidden />
          <span className="font-inter text-[11px] uppercase tracking-[0.16em] text-cream font-bold">
            AIRA
          </span>
        </div>
        <span className="font-inter text-[10px] uppercase tracking-[0.14em] text-cream/70 border border-cream/25 rounded-[2px] px-2 py-1">
          Assignment
        </span>
      </div>

      <ul className="flex flex-col gap-2 mb-4">
        {LEADS.map((lead, index) => {
          const isAssigned = index < revealedCount;
          return (
            <motion.li
              key={lead.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: ROW_START + index * ROW_STAGGER, ease: EASE }}
              className="flex items-center justify-between border border-cream/15 rounded-[2px] px-3 py-2.5"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <TemperatureDot temperature={lead.temperature} />
                <div className="min-w-0">
                  <p className="font-inter text-[12px] font-semibold text-cream truncate">{lead.name}</p>
                  <p className="font-inter text-[10px] text-cream/50">
                    {CATEGORY_META[lead.temperature].label} · {lead.source} · {lead.priority}
                  </p>
                </div>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                {isAssigned ? (
                  <motion.span
                    key="assigned"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="font-inter text-[11px] text-cream/85 whitespace-nowrap shrink-0"
                  >
                    → {lead.assignedTo}
                  </motion.span>
                ) : (
                  <motion.span
                    key="unassigned"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-inter text-[11px] text-cream/40 whitespace-nowrap shrink-0"
                  >
                    Unassigned
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ul>

      <div className="flex items-center gap-4 mb-4">
        {tally.map((entry) => (
          <div key={entry.name} className="flex items-center gap-1.5">
            <span className="font-inter text-[11px] text-cream/60">{entry.name}</span>
            <motion.span
              key={entry.count}
              initial={{ opacity: 0.4, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="font-inter text-[11px] font-bold text-cream border border-cream/20 rounded-[2px] px-1.5"
            >
              {entry.count}
            </motion.span>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-cream/20 min-h-[36px] flex items-center">
        {showRecommendation && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="font-inter text-[11px] text-cream/85 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-oxblood shrink-0" aria-hidden />
            AIRA recommends Arun for this lead based on prior conversion performance.
          </motion.p>
        )}
      </div>
    </div>
  );
}

const TREND_WIDTH = 220;
const TREND_HEIGHT = 56;

function PerformanceTrendLine() {
  const min = Math.min(...TREND_POINTS);
  const max = Math.max(...TREND_POINTS);
  const span = max - min || 1;

  const coords = TREND_POINTS.map((point, index) => {
    const x = (index / (TREND_POINTS.length - 1)) * TREND_WIDTH;
    const y = TREND_HEIGHT - ((point - min) / span) * TREND_HEIGHT;
    return { x, y };
  });

  const path = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");

  return (
    <svg
      viewBox={`0 0 ${TREND_WIDTH} ${TREND_HEIGHT}`}
      className="w-full max-w-[260px] h-14"
      role="img"
      aria-hidden
    >
      <motion.path
        d={path}
        fill="none"
        stroke="#DE4A63"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: TREND_DURATION, delay: TREND_START, ease: EASE }}
      />
      {coords.map((c, index) => (
        <motion.circle
          key={index}
          cx={c.x}
          cy={c.y}
          r={2.5}
          fill="#DE4A63"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: TREND_START + (index / (TREND_POINTS.length - 1)) * TREND_DURATION,
          }}
        />
      ))}
    </svg>
  );
}

function PerformanceView({ onFinished }: { onFinished?: () => void }) {
  const [insightsShown, setInsightsShown] = useState(0);

  useEffect(() => {
    const timers = INSIGHTS.map((_, index) =>
      setTimeout(
        () => setInsightsShown((count) => Math.max(count, index + 1)),
        (INSIGHTS_START + index * INSIGHTS_STAGGER) * 1000,
      ),
    );
    const finishTimer = setTimeout(() => onFinished?.(), PERFORMANCE_TOTAL_MS);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
  }, [onFinished]);

  return (
    <div className="bg-ink p-6 md:p-7 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-oxblood animate-pulse" aria-hidden />
          <span className="font-inter text-[11px] uppercase tracking-[0.16em] text-cream font-bold">
            AIRA
          </span>
        </div>
        <span className="font-inter text-[10px] uppercase tracking-[0.14em] text-cream/70 border border-cream/25 rounded-[2px] px-2 py-1">
          Performance
        </span>
      </div>

      <ul className="flex flex-col gap-2 mb-6">
        {RANKED_TELECALLERS.map((telecaller, index) => {
          const conversionRate = Math.round((telecaller.converted / telecaller.assigned) * 100);
          const delay = CARD_START + index * CARD_STAGGER;
          return (
            <motion.li
              key={telecaller.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay, ease: EASE }}
              className="border border-cream/15 rounded-[2px] px-3 py-2.5"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-inter text-[12px] font-semibold text-cream flex items-center gap-1.5">
                  <span aria-hidden>{MEDALS[index]}</span>
                  {telecaller.name}
                </span>
                <span className="font-inter text-[12px] font-bold text-cream">
                  <CountUp target={conversionRate} delay={delay} suffix="%" />
                </span>
              </div>
              <div className="h-1 rounded-full bg-cream/10 overflow-hidden mb-1.5">
                <motion.div
                  className="h-full rounded-full bg-oxblood"
                  initial={{ width: 0 }}
                  animate={{ width: `${conversionRate}%` }}
                  transition={{ duration: 0.9, delay: delay + 0.15, ease: EASE }}
                />
              </div>
              <p className="font-inter text-[10px] text-cream/50">
                <CountUp target={telecaller.assigned} delay={delay} /> assigned ·{" "}
                <CountUp target={telecaller.contacted} delay={delay} /> contacted ·{" "}
                <CountUp target={telecaller.converted} delay={delay} /> converted
              </p>
            </motion.li>
          );
        })}
      </ul>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: TREND_START }}
      >
        <p className="font-inter text-[10px] uppercase tracking-[0.12em] text-cream/60 mb-2">
          Conversions This Week
        </p>
        <PerformanceTrendLine />
      </motion.div>

      <div className="mt-auto pt-4 border-t border-cream/20 min-h-[44px] flex flex-col justify-center gap-1.5">
        {INSIGHTS.slice(0, insightsShown).map((insight, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="font-inter text-[11px] text-cream/85 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-oxblood shrink-0" aria-hidden />
            {insight}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

type SubScene = "assign" | "performance";

type AiraTelecallerPerformanceProps = {
  /** Called once, after both sub-scenes have played and held. */
  onFinished?: () => void;
};

export default function AiraTelecallerPerformance({ onFinished }: AiraTelecallerPerformanceProps) {
  const [subScene, setSubScene] = useState<SubScene>("assign");

  useEffect(() => {
    if (subScene !== "assign") return;
    const timer = setTimeout(() => setSubScene("performance"), ASSIGN_TOTAL_MS);
    return () => clearTimeout(timer);
  }, [subScene]);

  return (
    <div className="h-full flex flex-col overflow-hidden relative">
      <AnimatePresence mode="wait" initial={false}>
        {subScene === "assign" ? (
          <motion.div
            key="assign"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={SCENE_TRANSITION}
            className="flex-1 flex flex-col"
          >
            <AssignmentView />
          </motion.div>
        ) : (
          <motion.div
            key="performance"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={SCENE_TRANSITION}
            className="flex-1 flex flex-col"
          >
            <PerformanceView onFinished={onFinished} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
