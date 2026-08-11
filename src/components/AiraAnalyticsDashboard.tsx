"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";

type LeadCategory = "hot" | "warm" | "cold";

/**
 * Illustrative sample figures — same "no real client/company" spirit as
 * AiraLiveSimulation's conversation copy. Percentages are always derived
 * from the counts below, never hand-typed, so they can't drift out of sync.
 */
const LEADS: Record<LeadCategory, number> = { hot: 684, warm: 1126, cold: 1037 };
const TOTAL = LEADS.hot + LEADS.warm + LEADS.cold;

/**
 * Chart marks only — NOT the site's brand oxblood/platinum. Those measure
 * ~1.85:1 contrast and near-zero chroma against this card's dark ink
 * surface (fails dataviz legibility checks); these are brightened variants
 * in the same hue families, validated for this dark surface, used only here.
 */
const CATEGORY_META: Record<LeadCategory, { label: string; color: string }> = {
  hot: { label: "Hot", color: "#DE4A63" },
  warm: { label: "Warm", color: "#B58B36" },
  cold: { label: "Cold", color: "#6483C2" },
};

const CATEGORY_ORDER: LeadCategory[] = ["hot", "warm", "cold"];

/** Illustrative weekly hot-lead volume, climbing to the current total. */
const TREND_POINTS = [420, 452, 498, 561, 612, 684];

const INSIGHTS = [
  "684 conversations flagged high-intent this month.",
  "Hot-lead volume is trending up week over week.",
];

const EASE = [0.22, 1, 0.36, 1] as const;

// Choreography — every delay below is the single source of truth for both
// the entrance animations and the moment this scene hands control back.
const KPI_START = 0.1;
const KPI_STAGGER = 0.1;
const DONUT_START = 0.75;
const DONUT_SEGMENT_DURATION = 0.55;
const TREND_START = DONUT_START + CATEGORY_ORDER.length * DONUT_SEGMENT_DURATION + 0.2;
const TREND_DURATION = 1.1;
const INSIGHTS_START = TREND_START + TREND_DURATION + 0.3;
const INSIGHTS_STAGGER = 0.35;
const HOLD_AFTER_INSIGHTS = 3200;

type AiraAnalyticsDashboardProps = {
  /** Called once, after the full choreography has played and held. */
  onFinished?: () => void;
};

const DONUT_RADIUS = 50;

const DONUT_SEGMENTS = CATEGORY_ORDER.reduce<{ category: LeadCategory; fraction: number; offset: number }[]>(
  (segments, category) => {
    const fraction = LEADS[category] / TOTAL;
    const offset = segments.length > 0 ? segments[segments.length - 1].offset + segments[segments.length - 1].fraction : 0;
    return [...segments, { category, fraction, offset }];
  },
  [],
);

function DonutChart() {
  return (
    <svg viewBox="0 0 120 120" className="w-[120px] h-[120px] shrink-0" role="img" aria-hidden>
      <circle cx="60" cy="60" r={DONUT_RADIUS} fill="none" stroke="#F2EFE9" strokeOpacity={0.08} strokeWidth={14} />
      {DONUT_SEGMENTS.map(({ category, fraction, offset }, index) => {
        // Each segment is rotated to its own start point around the ring
        // rather than using strokeDashoffset — Framer's pathLength animation
        // manages stroke-dasharray/dashoffset itself, so a manually-set
        // dashoffset gets silently overridden every frame. Rotation is a
        // separate transform, so it composes cleanly with pathLength.
        return (
          <motion.circle
            key={category}
            cx="60"
            cy="60"
            r={DONUT_RADIUS}
            fill="none"
            stroke={CATEGORY_META[category].color}
            strokeWidth={14}
            strokeLinecap="butt"
            transform={`rotate(${offset * 360 - 90} 60 60)`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: fraction }}
            transition={{
              duration: DONUT_SEGMENT_DURATION,
              delay: DONUT_START + index * DONUT_SEGMENT_DURATION,
              ease: "easeOut",
            }}
          />
        );
      })}
    </svg>
  );
}

const TREND_WIDTH = 220;
const TREND_HEIGHT = 64;

function TrendLine() {
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
      className="w-full max-w-[220px] h-16"
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

export default function AiraAnalyticsDashboard({ onFinished }: AiraAnalyticsDashboardProps) {
  const [insightsShown, setInsightsShown] = useState(0);

  useEffect(() => {
    const timers = INSIGHTS.map((_, index) =>
      setTimeout(
        () => setInsightsShown((count) => Math.max(count, index + 1)),
        (INSIGHTS_START + index * INSIGHTS_STAGGER) * 1000,
      ),
    );
    const finishAt = (INSIGHTS_START + INSIGHTS.length * INSIGHTS_STAGGER) * 1000 + HOLD_AFTER_INSIGHTS;
    const finishTimer = setTimeout(() => onFinished?.(), finishAt);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
  }, [onFinished]);

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
          Analytics
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: KPI_START, ease: EASE }}
          className="border border-cream/15 rounded-[2px] px-3 py-3"
        >
          <p className="font-inter text-[10px] uppercase tracking-[0.12em] text-cream/60 mb-1">
            Total Leads
          </p>
          <p className="font-inter text-xl md:text-2xl font-bold text-cream">
            <CountUp target={TOTAL} delay={KPI_START} />
          </p>
        </motion.div>

        {CATEGORY_ORDER.map((category, index) => {
          const count = LEADS[category];
          const percent = Math.round((count / TOTAL) * 100);
          const delay = KPI_START + (index + 1) * KPI_STAGGER;
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay, ease: EASE }}
              className="border border-cream/15 rounded-[2px] px-3 py-3"
            >
              <p className="font-inter text-[10px] uppercase tracking-[0.12em] text-cream/60 mb-1 flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: CATEGORY_META[category].color }}
                  aria-hidden
                />
                {CATEGORY_META[category].label}
              </p>
              <p className="font-inter text-xl md:text-2xl font-bold text-cream">
                <CountUp target={count} delay={delay} />
              </p>
              <p className="font-inter text-[11px] text-cream/50">
                <CountUp target={percent} delay={delay} />%
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: DONUT_START }}
          className="flex items-center gap-4"
        >
          <DonutChart />
          <ul className="flex flex-col gap-1.5">
            {CATEGORY_ORDER.map((category) => (
              <li key={category} className="flex items-center gap-2 font-inter text-[11px] text-cream/75">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: CATEGORY_META[category].color }}
                  aria-hidden
                />
                {CATEGORY_META[category].label} · {LEADS[category].toLocaleString()} ·{" "}
                {Math.round((LEADS[category] / TOTAL) * 100)}%
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: TREND_START }}
          className="flex-1 w-full"
        >
          <p className="font-inter text-[10px] uppercase tracking-[0.12em] text-cream/60 mb-2">
            Hot-Lead Trend
          </p>
          <TrendLine />
        </motion.div>
      </div>

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
