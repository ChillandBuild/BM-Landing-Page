interface BrandWordmarkTextProps {
  text: string;
  className?: string;
}

/**
 * Renders text with every "A"/"a" swapped for an inverted-V mark — two
 * square-capped strokes meeting at a point, no crossbar — sized to the same
 * cap-height and advance width as a normal capital letter (0.72em / 0.6em,
 * matching Inter's own cap-height ratio) rather than the full line box, so it
 * sits flush with the surrounding letters instead of towering over them.
 * Inline replaced elements align to the text baseline by default, which is
 * overridden explicitly here since Tailwind's preflight resets svg to
 * `display: block`.
 *
 * The real word is exposed via aria-label on the wrapping span so search,
 * screen readers and copy/paste still see the real word — same
 * accessible-decoration pattern as BrandHeadline's seed/tittle glyph marks.
 */
export default function BrandWordmarkText({ text, className }: BrandWordmarkTextProps) {
  return (
    <span aria-label={text} className={className}>
      {Array.from(text).map((ch, i) =>
        ch.toLowerCase() === "a" ? (
          <svg
            key={i}
            aria-hidden
            viewBox="0 0 62 72"
            style={{ width: "0.62em", height: "0.72em", display: "inline-block", verticalAlign: "baseline" }}
          >
            <path
              d="M31 3 L59 69 M31 3 L3 69"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        ) : (
          <span key={i} aria-hidden>
            {ch}
          </span>
        )
      )}
    </span>
  );
}
