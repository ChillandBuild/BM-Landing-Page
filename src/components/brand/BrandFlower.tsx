import type { CSSProperties } from "react";
import { ALL_PETALS, CORAL, CREAM, SEED_RADIUS } from "./flowerGeometry";

interface BrandFlowerProps {
  size?: number;
  rotation?: number;
  className?: string;
  style?: CSSProperties;
  shadow?: boolean;
}

/**
 * The single source of the Bloom Matrix flower — the "one-flower rule".
 *
 * Geometry, cream fill and coral seed come from `flowerGeometry` and are shared
 * with `LogoMark` and `FlowerMotifs`, so the logo and the page blooms are one
 * shape. Only size, extra rotation and the drop shadow vary between usages.
 *
 * The petals are already diagonal — unlike the old organic flower there is no
 * 45deg correction group here. Adding one would tilt it off the logo.
 */
export default function BrandFlower({
  size = 120,
  rotation = 0,
  className,
  style,
  shadow = false,
}: BrandFlowerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      style={{
        filter: shadow ? "drop-shadow(0 8px 28px rgba(20,20,20,0.16))" : undefined,
        ...style,
      }}
      aria-hidden
    >
      <g data-flower-spin transform={`rotate(${rotation} 60 60)`}>
        <g fill={CREAM}>
          {ALL_PETALS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        {/* Drawn last and wide enough to cover the petals' inner corners, so the
            seed sits on the flower rather than in the gap behind it. */}
        <circle cx="60" cy="60" r={SEED_RADIUS} fill={CORAL} />
      </g>
    </svg>
  );
}
