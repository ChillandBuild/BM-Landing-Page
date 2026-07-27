import LogoMark from "./LogoMark";
import LogoWordmark from "./LogoWordmark";

interface LogoLockupProps {
  className?: string;
  tone?: "ink" | "cream";
  markSize?: number;
}

/**
 * Mark + wordmark in a row — the standard lockup for header and footer.
 *
 * The mark is silver in both places, but it needs a dark ground to read as
 * metal. On the cream header it carries its own Ink tile; on the Ink footer the
 * page already supplies the ground, so the tile is dropped and the petals sit
 * directly on the page.
 */
export default function LogoLockup({
  className,
  tone = "ink",
  markSize = 30,
}: LogoLockupProps) {
  const onDarkGround = tone === "cream";

  return (
    <span className={`inline-flex items-center gap-2 sm:gap-2.5 ${className ?? ""}`}>
      <LogoMark
        size={markSize}
        tone="silver"
        tile={!onDarkGround}
        className="w-6 h-6 sm:w-auto sm:h-auto"
      />
      <LogoWordmark tone={tone} className="h-[20px] sm:h-[26px] w-auto" />
    </span>
  );
}
