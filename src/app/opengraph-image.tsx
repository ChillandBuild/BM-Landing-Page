import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Bloom Matrix — AI-First Product Engineering Company";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The bloom mark. No rotation is needed, unlike the old Cutout — the OG
 * renderer (Satori) does not apply SVG group transforms, so everything stays in
 * plain untransformed coordinates.
 *
 * The seed's clear ring is an opaque Matrix Blue disc rather than a mask:
 * Satori has no mask support, and the flower sits on a solid blue block here,
 * so painting the ring in the ground colour is indistinguishable from a
 * knockout. The masked (genuinely transparent) version is the SVG asset.
 */
const PETALS = [
  "M23 6L35 6L52 23L52 52L23 52L6 35L6 23Z",
  "M97 6L85 6L68 23L68 52L97 52L114 35L114 23Z",
  "M23 114L35 114L52 97L52 68L23 68L6 85L6 97Z",
  "M97 114L85 114L68 97L68 68L97 68L114 85L114 97Z",
];

export default async function Image() {
  // Static instance, not the variable TTF — the OG renderer cannot parse
  // variable fonts and fails the whole route.
  const lora = await readFile(join(process.cwd(), "src/app/_fonts/Lora-Regular.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#F2EFE9",
          color: "#141414",
          fontFamily: "Lora",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "38%",
            background: "#1747E0",
          }}
        />

        {/* Seated on the blue block: the cream flower needs a shadow to read
            against cream paper, and the OG renderer cannot draw SVG filters. */}
        <div
          style={{
            position: "absolute",
            left: 840,
            top: 175,
            display: "flex",
          }}
        >
          <svg width="280" height="280" viewBox="0 0 120 120">
            <g fill="none" stroke="#F2EFE9" strokeWidth="8" strokeLinejoin="round">
              {PETALS.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
          </svg>
        </div>
        {/* Mark centre lands at (980, 315): left 840 + 60 * (280/120). The blue
            disc opens the clear ring, then the coral core sits inside it. */}
        <div
          style={{
            position: "absolute",
            left: 947,
            top: 282,
            width: 66,
            height: 66,
            borderRadius: 33,
            background: "#1747E0",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 954,
            top: 289,
            width: 52,
            height: 52,
            borderRadius: 26,
            background: "#FF6B4A",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 80,
            top: 196,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: 21,
              letterSpacing: 4,
              color: "#1747E0",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 26,
              display: "flex",
            }}
          >
            AI-first product engineering
          </div>
          <div style={{ fontSize: 78, lineHeight: 1.06, maxWidth: 520, display: "flex" }}>
            We build products that think.
          </div>
          <div
            style={{
              fontSize: 23,
              marginTop: 32,
              color: "#141414",
              opacity: 0.6,
              display: "flex",
            }}
          >
            Bloom Matrix
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Lora", data: lora, style: "normal", weight: 400 }],
    }
  );
}
