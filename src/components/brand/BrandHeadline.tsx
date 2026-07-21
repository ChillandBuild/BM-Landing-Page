import type { JSX } from "react";
import { tokenizeHeadline, type HeadlineToken } from "./headlineTokens";

export interface HeadlineSegment {
  text: string;
  emphasis?: boolean;
}

interface BrandHeadlineProps {
  as?: "h1" | "h2" | "h3" | "p";
  segments: HeadlineSegment[];
  className?: string;
  seeded?: boolean;
}

/**
 * Glyph-mark geometry. The marks must land on the letterform, not on the line
 * box, so each modified glyph pins `line-height: 1` and positions from there:
 * with Lora at line-height 1 the baseline sits 0.85em below the box top. The
 * seed then centres half an x-height (`0.5ex`) above the baseline — inside the
 * "o" counter — and the tittle sits where Lora's own tittle would.
 */
const BASELINE_FROM_TOP = "0.85em";
const SEED_SIZE = "0.17em";
const TITTLE_SIZE = "0.12em";
const TITTLE_ABOVE_BASELINE = "0.70em";

/**
 * BM Serif in practice: Lora, with the brand's two approved glyph
 * modifications overlaid at render time — a Seed Coral dot inside every
 * lowercase "o" counter, and a coral tittle on every "i"/"j". The matrix-"x"
 * modification was declined and must not be added.
 *
 * Marks are decorative, so the visible glyph spans are aria-hidden and the
 * host element carries the plain text as aria-label.
 */
function Glyph({ token, seeded }: { token: HeadlineToken; seeded: boolean }) {
  if (!seeded || token.kind === "plain") return <>{token.ch}</>;

  if (token.kind === "seed-o") {
    return (
      <span className="relative inline-block" style={{ lineHeight: 1 }}>
        o
        <span
          className="absolute rounded-full bg-coral"
          style={{
            width: SEED_SIZE,
            height: SEED_SIZE,
            left: "50%",
            top: `calc(${BASELINE_FROM_TOP} - 0.5ex)`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </span>
    );
  }

  const dotless = token.kind === "tittle-i" ? "ı" : "ȷ";
  return (
    <span className="relative inline-block" style={{ lineHeight: 1 }}>
      {dotless}
      <span
        className="absolute rounded-full bg-coral"
        style={{
          width: TITTLE_SIZE,
          height: TITTLE_SIZE,
          left: "50%",
          top: `calc(${BASELINE_FROM_TOP} - ${TITTLE_ABOVE_BASELINE})`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </span>
  );
}

export default function BrandHeadline({
  as = "h2",
  segments,
  className,
  seeded = true,
}: BrandHeadlineProps) {
  const Tag = as as keyof JSX.IntrinsicElements;
  const plain = segments.map((s) => s.text).join("");

  return (
    <Tag className={`font-bm-serif ${className ?? ""}`} aria-label={plain}>
      {segments.map((seg, si) => {
        const inner = tokenizeHeadline(seg.text).map((tk, i) => (
          <Glyph key={i} token={tk} seeded={seeded} />
        ));

        return seg.emphasis ? (
          <em key={si} className="text-blue" aria-hidden>
            {inner}
          </em>
        ) : (
          <span key={si} aria-hidden>
            {inner}
          </span>
        );
      })}
    </Tag>
  );
}
