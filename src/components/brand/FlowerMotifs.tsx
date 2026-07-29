import { ACCENT_OXBLOOD, CREAM, FLOWER_PETALS, SEED_RADIUS } from "./flowerGeometry";

/**
 * A documented exception to the one-flower rule — in treatment only.
 *
 * The geometry never varies: these use the same petals as `BrandFlower` and
 * `LogoMark`, from `flowerGeometry`. What varies is the *fill*, for the
 * value-props panel where the flower progressively dissolves into the matrix as
 * you scroll: solid → hybrid → halftone → dissolve. Do not use them as a logo.
 */

export const MOTIF_KEYS = ["solid", "hybrid", "halftone", "dissolve"] as const;
export type MotifKey = (typeof MOTIF_KEYS)[number];

interface FlowerMotifProps {
  motif: MotifKey;
  size?: number;
  rotation?: number;
  className?: string;
}

/** The pair that stays solid, and the pair that dissolves — top then bottom. */
const HELD = [FLOWER_PETALS.topLeft, FLOWER_PETALS.topRight];
const DISSOLVING = [FLOWER_PETALS.bottomLeft, FLOWER_PETALS.bottomRight];

/**
 * Dot trails standing in for the two dissolving petals. Positions run down the
 * SW and SE diagonals, matching where those petals sit.
 */
const DISSOLVE_DOTS = [
  { cx: 43.7, cy: 69.2, r: 7 },
  { cx: 35.3, cy: 81.9, r: 5 },
  { cx: 28.2, cy: 93.2, r: 3.2 },
  { cx: 76.3, cy: 69.2, r: 7 },
  { cx: 84.7, cy: 81.9, r: 5 },
  { cx: 91.8, cy: 93.2, r: 3.2 },
];

export default function FlowerMotif({
  motif,
  size = 200,
  rotation = 0,
  className,
}: FlowerMotifProps) {
  const patternId = `motif-halftone-${motif}`;
  const halftoneFill = `url(#${patternId})`;

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={className} aria-hidden>
      <defs>
        <pattern id={patternId} width="8.5" height="8.5" patternUnits="userSpaceOnUse">
          <circle cx="4.25" cy="4.25" r="2.5" fill={CREAM} />
        </pattern>
      </defs>

      <g transform={`rotate(${rotation} 60 60)`}>
        {motif === "solid" && (
          <g fill={CREAM}>
            {[...HELD, ...DISSOLVING].map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        )}

        {motif === "hybrid" && (
          <>
            <g fill={CREAM}>
              {HELD.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
            <g fill={halftoneFill}>
              {DISSOLVING.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
          </>
        )}

        {motif === "halftone" && (
          <g fill={halftoneFill}>
            {[...HELD, ...DISSOLVING].map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        )}

        {motif === "dissolve" && (
          <>
            <g fill={CREAM}>
              {HELD.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
            <g fill={CREAM}>
              {DISSOLVE_DOTS.map((dot) => (
                <circle key={`${dot.cx}-${dot.cy}`} cx={dot.cx} cy={dot.cy} r={dot.r} />
              ))}
            </g>
          </>
        )}

        {/* Drawn last so it covers the petals' inner corners and reads anchored. */}
        <circle cx="60" cy="60" r={SEED_RADIUS} fill={ACCENT_OXBLOOD} />
      </g>
    </svg>
  );
}
