import { useId } from "react";
import { ALL_PETALS } from "./flowerGeometry";

type LogoMarkTone = "silver" | "blue" | "cream" | "ink";

interface LogoMarkProps {
  size?: number;
  className?: string;
  /** Petal treatment. Silver is a gradient and needs a dark ground — pair it
   *  with `tile` on light surfaces. */
  tone?: LogoMarkTone;
  /** Drop the Seed Coral core for a single-colour cut. Use below ~24px. */
  mono?: boolean;
  /** Ink rounded tile behind the mark. Required for silver on light grounds,
   *  where bare silver would collapse to grey. */
  tile?: boolean;
  /** Degrees to spin the petals. The tile and the centre stay put — only the
   *  petals turn, so the mark reads as a logo in motion, not a tumbling card. */
  rotation?: number;
}

const INK = "#141414";

/** Radius of the centre knockout in the mask. */
const SEED_HOLE = 14;

const FLAT_FILL: Record<Exclude<LogoMarkTone, "silver">, string> = {
  blue: "#1747E0",
  cream: "#F2EFE9",
  ink: INK,
};

/** Banded stops read as milled metal rather than a plain light-to-dark ramp. */
const SILVER_STOPS = [
  ["0%", "#F4F6F7"],
  ["16%", "#B4BBC1"],
  ["31%", "#EFF1F3"],
  ["49%", "#959CA3"],
  ["66%", "#E6E9EC"],
  ["84%", "#A7AEB5"],
  ["100%", "#DCE0E4"],
] as const;

/**
 * The Bloom Matrix mark. Four closed heptagon petals whose square inner corners
 * meet as a 16x16 block at the centre; a circular mask is knocked out of them
 * and the core sits on top. Nothing in the mark touches anything else, and the
 * ring of clear space is a real hole rather than painted-on background. The
 * stroke ends are cut by the seed's arc — they are not drawn facets.
 *
 * Silver is the brand treatment: brushed metal on an Ink ground. It is a
 * gradient, so it only reads on dark — on light surfaces pass `tile` to carry
 * its own Ink ground. Below ~24px the bands average to flat grey; that is
 * expected and still legible against Ink.
 *
 * With silver the centre is left as an open hole so the ground shows through —
 * a disc punched clean through the metal. Across the hero's cream/Ink seam that
 * means the core is half cream and half black, which is deliberate. The favicon
 * paints an Ink disc instead, because it has no ground of its own to borrow.
 */
export default function LogoMark({
  size = 40,
  className,
  tone = "silver",
  mono = false,
  tile = false,
  rotation = 0,
}: LogoMarkProps) {
  // Header and footer render a mark on the same page, so mask and gradient need
  // document-unique ids — hardcoded ones would make the second mark reuse the
  // first one's definitions.
  const uid = useId();
  const maskId = `bloom-seed-${uid}`;
  const gradId = `bloom-silver-${uid}`;

  const isSilver = tone === "silver";
  const stroke = isSilver ? `url(#${gradId})` : FLAT_FILL[tone];
  // Silver's core stays an open hole — nothing is painted into it, so it takes
  // on whatever sits behind. Across the hero's cream/Ink seam that reads as a
  // core split half cream, half black, which is intended.
  const coreFill = isSilver ? null : mono ? FLAT_FILL[tone] : "#FF6B4A";

  // Inset the mark so the tile has breathing room around it.
  const body = (
    <>
      <mask id={maskId}>
        {/* Oversized: a spun petal reaches ~65 from centre, past the 0-120 box,
            and a 120-square mask would shear those corners off mid-rotation. */}
        <rect x="-70" y="-70" width="260" height="260" fill="#fff" />
        <circle cx="60" cy="60" r={SEED_HOLE} fill="#000" />
      </mask>
      {/* Rotation sits inside the mask, never outside it — the knockout is a
          centred circle and must not turn with the petals. */}
      <g mask={`url(#${maskId})`}>
        <g
          data-flower-spin
          transform={`rotate(${rotation} 60 60)`}
          fill="none"
          stroke={stroke}
          strokeWidth="8"
          strokeLinejoin="round"
        >
          {ALL_PETALS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </g>
      {coreFill && <circle cx="60" cy="60" r="11" fill={coreFill} />}
    </>
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      // Untiled petals reach ~65 from centre when spun, past the 60 half-box,
      // so the viewport would crop them. Tiled marks are scaled to 0.74 and
      // stay inside, so they keep the default clip.
      style={rotation !== 0 && !tile ? { overflow: "visible" } : undefined}
      role="img"
      aria-label="Bloom Matrix"
    >
      {isSilver && (
        <defs>
          <linearGradient
            id={gradId}
            gradientUnits="userSpaceOnUse"
            x1="8"
            y1="4"
            x2="112"
            y2="116"
          >
            {SILVER_STOPS.map(([offset, color]) => (
              <stop key={offset} offset={offset} stopColor={color} />
            ))}
          </linearGradient>
        </defs>
      )}
      {tile ? (
        <>
          <rect width="120" height="120" rx="26" fill={INK} />
          <g transform="translate(60 60) scale(0.74) translate(-60 -60)">{body}</g>
        </>
      ) : (
        body
      )}
    </svg>
  );
}
