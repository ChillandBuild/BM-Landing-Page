import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon: the hero flower exactly, with no tile. Transparent ground,
 * brushed-silver petals, Ink core.
 *
 * No mask here, and none needed. LogoMark knocks a r=14 hole out of the petals
 * and then fills it with an opaque r=14 Ink disc; painting that same disc over
 * un-masked petals gives a pixel-identical result, since the disc covers exactly
 * what the hole removed. That keeps the geometry faithful and avoids relying on
 * SVG masks, which the OG renderer (Satori) does not support.
 *
 * The core is drawn in viewBox units rather than as a px-sized div, so it tracks
 * LogoMark's radius exactly. An 8px div would be r=15 at this scale.
 *
 * Satori also ignores SVG group transforms, so everything stays untransformed —
 * unlike the old Cutout, this mark needs no rotation anyway.
 *
 * Without a tile the mark has no ground of its own, so contrast depends on the
 * browser's tab colour: strong on dark, weak on white. The tiled alternative is
 * public/images/logo-bloom-mark-silver-ink-tile.svg.
 */
const PETALS = [
  "M23 6L35 6L52 23L52 52L23 52L6 35L6 23Z",
  "M97 6L85 6L68 23L68 52L97 52L114 35L114 23Z",
  "M23 114L35 114L52 97L52 68L23 68L6 85L6 97Z",
  "M97 114L85 114L68 97L68 68L97 68L114 85L114 97Z",
];

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "transparent",
        }}
      >
        <div style={{ display: "flex" }}>
          {/* Full 32px now that no tile is eating the margins. */}
          <svg width="32" height="32" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="fav" gradientUnits="userSpaceOnUse" x1="8" y1="4" x2="112" y2="116">
                <stop offset="0%" stopColor="#F4F6F7" />
                <stop offset="16%" stopColor="#B4BBC1" />
                <stop offset="31%" stopColor="#EFF1F3" />
                <stop offset="49%" stopColor="#959CA3" />
                <stop offset="66%" stopColor="#E6E9EC" />
                <stop offset="84%" stopColor="#A7AEB5" />
                <stop offset="100%" stopColor="#DCE0E4" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#fav)" strokeWidth="8" strokeLinejoin="round">
              {PETALS.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
            {/* r=14 matches LogoMark's knockout, so this stands in for it. */}
            <circle cx="60" cy="60" r="14" fill="#141414" />
          </svg>
        </div>
      </div>
    ),
    { ...size }
  );
}
