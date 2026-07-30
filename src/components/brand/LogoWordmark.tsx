import BrandWordmarkText from "./BrandWordmarkText";

interface LogoWordmarkProps {
  className?: string;
  tone?: "ink" | "cream";
}

/**
 * The Bloom Matrix wordmark: "BLOOM MATRIX" in Inter Bold, with every "A"
 * drawn as an inverted-V mark instead of the standard glyph. Replaces the
 * earlier bracketed "[ bloom ]m×n" treatment by direct request.
 */
export default function LogoWordmark({ className, tone = "ink" }: LogoWordmarkProps) {
  const color = tone === "cream" ? "#F2EFE9" : "#141414";

  return (
    <span
      className={`inline-flex items-center font-inter font-bold uppercase tracking-[0.14em] ${className ?? ""}`}
      style={{ color }}
    >
      <BrandWordmarkText text="BLOOM MATRIX" />
    </span>
  );
}
