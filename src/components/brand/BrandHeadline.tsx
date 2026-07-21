import type { JSX } from "react";
import { isWhitespace, splitWords, tokenizeHeadline, type HeadlineToken } from "./headlineTokens";

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

/**
 * The tittle mark covers Lora's own tittle rather than swapping in a dotless
 * glyph, so the DOM text stays the real word — dotless "ı" would corrupt the
 * text for search engines, find-in-page and copy-paste. Measured from Lora:
 * the tittle is 0.12em across, centred 0.673em above the baseline, at 50% of
 * the advance upright and 58% italic. The coral dot is slightly larger so it
 * covers the ink underneath, antialiasing included.
 */
const TITTLE_SIZE = "0.15em";
const TITTLE_ABOVE_BASELINE = "0.673em";
const TITTLE_X_UPRIGHT = "50%";
const TITTLE_X_ITALIC = "58%";

/**
 * BM Serif in practice: Lora, with the brand's two approved glyph
 * modifications overlaid at render time — a Seed Coral dot inside every
 * lowercase "o" counter, and a coral tittle on every "i"/"j". The matrix-"x"
 * modification was declined and must not be added.
 *
 * Marks are decorative, so the visible glyph spans are aria-hidden and the
 * host element carries the plain text as aria-label.
 */
function Glyph({
  token,
  seeded,
  italic,
}: {
  token: HeadlineToken;
  seeded: boolean;
  italic: boolean;
}) {
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

  return (
    <span className="relative inline-block" style={{ lineHeight: 1 }}>
      {token.ch}
      <span
        className="absolute rounded-full bg-coral"
        style={{
          width: TITTLE_SIZE,
          height: TITTLE_SIZE,
          left: italic ? TITTLE_X_ITALIC : TITTLE_X_UPRIGHT,
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
        const inner = splitWords(seg.text).map((part, pi) =>
          isWhitespace(part) ? (
            <span key={pi}>{part}</span>
          ) : (
            <span key={pi} className="whitespace-nowrap">
              {tokenizeHeadline(part).map((tk, i) => (
                <Glyph key={i} token={tk} seeded={seeded} italic={seg.emphasis === true} />
              ))}
            </span>
          )
        );

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
