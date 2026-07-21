import LogoMark from "./LogoMark";
import LogoWordmark from "./LogoWordmark";

interface LogoLockupProps {
  className?: string;
  tone?: "ink" | "cream";
  markSize?: number;
}

/** Mark + wordmark in a row — the standard lockup for header and footer. */
export default function LogoLockup({
  className,
  tone = "ink",
  markSize = 30,
}: LogoLockupProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark size={markSize} />
      <LogoWordmark tone={tone} className="h-[26px] w-auto" />
    </span>
  );
}
