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
      <span className="relative inline-block">
        o
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral"
          style={{ width: "0.17em", height: "0.17em" }}
        />
      </span>
    );
  }

  const dotless = token.kind === "tittle-i" ? "ı" : "ȷ";
  return (
    <span className="relative inline-block">
      {dotless}
      <span
        className="absolute left-1/2 rounded-full bg-coral"
        style={{ width: "0.12em", height: "0.12em", top: "0.04em", transform: "translateX(-50%)" }}
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
