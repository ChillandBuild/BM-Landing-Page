/**
 * A documented exception to the one-flower rule.
 *
 * The mark itself never varies — nav, favicon, OG and the hero all use
 * `BrandFlower`. These are decorative *motifs* for the value-props panel only,
 * where the flower progressively dissolves into the matrix as you scroll:
 * solid → hybrid → halftone → dissolve. Do not use them as a logo anywhere.
 */

const PETAL_TOP = "M60 14 C74 38 74 54 60 60 C46 54 46 38 60 14 Z";
const PETAL_RIGHT = "M106 60 C82 74 66 74 60 60 C66 46 82 46 106 60 Z";
const PETAL_BOTTOM = "M60 106 C46 82 46 66 60 60 C74 66 74 82 60 106 Z";
const PETAL_LEFT = "M14 60 C38 46 54 46 60 60 C54 74 38 74 14 60 Z";

export const MOTIF_KEYS = ["solid", "hybrid", "halftone", "dissolve"] as const;
export type MotifKey = (typeof MOTIF_KEYS)[number];

interface FlowerMotifProps {
  motif: MotifKey;
  size?: number;
  rotation?: number;
  className?: string;
}

/** Dot trails standing in for the two dissolving petals. */
const DISSOLVE_DOTS = [
  { cx: 78, cy: 55, r: 7 },
  { cx: 93, cy: 58, r: 5 },
  { cx: 106, cy: 61, r: 3.2 },
  { cx: 55, cy: 78, r: 7 },
  { cx: 58, cy: 93, r: 5 },
  { cx: 61, cy: 106, r: 3.2 },
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
          <circle cx="4.25" cy="4.25" r="2.5" fill="#F2EFE9" />
        </pattern>
      </defs>

      <g transform={`rotate(${rotation} 60 60)`}>
        <g transform="rotate(45 60 60)">
          {motif === "solid" && (
            <g fill="#F2EFE9">
              <path d={PETAL_TOP} />
              <path d={PETAL_RIGHT} />
              <path d={PETAL_BOTTOM} />
              <path d={PETAL_LEFT} />
            </g>
          )}

          {motif === "hybrid" && (
            <>
              <g fill="#F2EFE9">
                <path d={PETAL_TOP} />
                <path d={PETAL_LEFT} />
              </g>
              <g fill={halftoneFill}>
                <path d={PETAL_RIGHT} />
                <path d={PETAL_BOTTOM} />
              </g>
            </>
          )}

          {motif === "halftone" && (
            <g fill={halftoneFill}>
              <path d={PETAL_TOP} />
              <path d={PETAL_RIGHT} />
              <path d={PETAL_BOTTOM} />
              <path d={PETAL_LEFT} />
            </g>
          )}

          {motif === "dissolve" && (
            <>
              <g fill="#F2EFE9">
                <path d={PETAL_TOP} />
                <path d={PETAL_LEFT} />
              </g>
              <g fill="#F2EFE9">
                {DISSOLVE_DOTS.map((dot) => (
                  <circle key={`${dot.cx}-${dot.cy}`} cx={dot.cx} cy={dot.cy} r={dot.r} />
                ))}
              </g>
            </>
          )}
        </g>
        <circle cx="60" cy="60" r="10" fill="#FF6B4A" />
      </g>
    </svg>
  );
}
