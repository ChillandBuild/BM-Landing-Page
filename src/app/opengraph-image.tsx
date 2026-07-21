import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Bloom Matrix — AI-First Product Engineering Company";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Unrotated petals. The 45deg (x) orientation is applied with a CSS transform
 * on the wrapper rather than an SVG group transform, which the OG renderer
 * (Satori) does not apply — it silently dropped half the flower.
 */
const PETALS = [
  "M60 14 C74 38 74 54 60 60 C46 54 46 38 60 14 Z",
  "M106 60 C82 74 66 74 60 60 C66 46 82 46 106 60 Z",
  "M60 106 C46 82 46 66 60 60 C74 66 74 82 60 106 Z",
  "M14 60 C38 46 54 46 60 60 C54 74 38 74 14 60 Z",
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
            transform: "rotate(45deg)",
          }}
        >
          <svg width="280" height="280" viewBox="0 0 120 120">
            <g fill="#F2EFE9">
              {PETALS.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
          </svg>
        </div>
        {/* Core drawn separately so the wrapper rotation cannot offset it. */}
        <div
          style={{
            position: "absolute",
            left: 959,
            top: 294,
            width: 42,
            height: 42,
            borderRadius: 21,
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
