interface LogoMarkProps {
  size?: number;
  className?: string;
}

/**
 * "The Cutout" — the Bloom Matrix mark. A Matrix Blue tile with the brand
 * flower cut out of it in negative space, rotated 45deg into the matrix
 * crossing, with the Seed Coral core at centre. Legible down to 16px.
 */
export default function LogoMark({ size = 40, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="Bloom Matrix"
    >
      <rect x="6" y="6" width="108" height="108" rx="26" fill="#1747E0" />
      <g transform="rotate(45 60 60)">
        <g fill="#F2EFE9">
          <path d="M60 14 C74 38 74 54 60 60 C46 54 46 38 60 14 Z" />
          <path d="M106 60 C82 74 66 74 60 60 C66 46 82 46 106 60 Z" />
          <path d="M60 106 C46 82 46 66 60 60 C74 66 74 82 60 106 Z" />
          <path d="M14 60 C38 46 54 46 60 60 C54 74 38 74 14 60 Z" />
        </g>
      </g>
      <circle cx="60" cy="60" r="9" fill="#FF6B4A" />
    </svg>
  );
}
