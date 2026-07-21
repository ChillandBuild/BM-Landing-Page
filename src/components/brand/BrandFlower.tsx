import type { CSSProperties } from "react";

interface BrandFlowerProps {
  size?: number;
  rotation?: number;
  className?: string;
  style?: CSSProperties;
  shadow?: boolean;
}

/**
 * The single source of the Bloom Matrix flower — the "one-flower rule".
 * Petal geometry, the base 45deg (x) orientation, cream fill and coral core are
 * fixed; only size, extra rotation and the drop shadow vary between usages.
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
        <g transform="rotate(45 60 60)">
          <g fill="#F2EFE9">
            <path d="M60 14 C74 38 74 54 60 60 C46 54 46 38 60 14 Z" />
            <path d="M106 60 C82 74 66 74 60 60 C66 46 82 46 106 60 Z" />
            <path d="M60 106 C46 82 46 66 60 60 C74 66 74 82 60 106 Z" />
            <path d="M14 60 C38 46 54 46 60 60 C54 74 38 74 14 60 Z" />
          </g>
        </g>
        <circle cx="60" cy="60" r="9" fill="#FF6B4A" />
      </g>
    </svg>
  );
}
