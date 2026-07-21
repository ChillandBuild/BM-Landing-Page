interface LogoWordmarkProps {
  className?: string;
  tone?: "ink" | "cream";
}

/**
 * "The Bracket" wordmark — frozen asset. `bloom` set in plain Inter Bold inside
 * mathematical matrix brackets, with the coral m×n superscript. Never rendered
 * in BM Serif and never given the BrandHeadline glyph mods.
 */
export default function LogoWordmark({ className, tone = "ink" }: LogoWordmarkProps) {
  const bloomFill = tone === "cream" ? "#F2EFE9" : "#141414";

  return (
    <svg viewBox="0 0 420 82" className={className} role="img" aria-label="bloom matrix">
      <g stroke="#1747E0" strokeWidth="7" fill="none" strokeLinecap="square">
        <path d="M62 8 L50 8 L50 74 L62 74" />
        <path d="M358 8 L370 8 L370 74 L358 74" />
      </g>
      <text
        x="210"
        y="56"
        textAnchor="middle"
        fontFamily="var(--font-inter), Inter, sans-serif"
        fontWeight="700"
        fontSize="44"
        letterSpacing="13"
        fill={bloomFill}
      >
        bloom
      </text>
      <text
        x="378"
        y="22"
        fontFamily="var(--font-inter), Inter, sans-serif"
        fontWeight="700"
        fontSize="18"
        letterSpacing="1"
        fill="#FF6B4A"
      >
        m×n
      </text>
    </svg>
  );
}
