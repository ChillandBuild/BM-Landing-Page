import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon: the Cutout mark. Petals are drawn unrotated and the 45deg (x)
 * orientation comes from a CSS transform — the OG renderer (Satori) ignores
 * SVG group transforms.
 */
const PETALS = [
  "M60 14 C74 38 74 54 60 60 C46 54 46 38 60 14 Z",
  "M106 60 C82 74 66 74 60 60 C66 46 82 46 106 60 Z",
  "M60 106 C46 82 46 66 60 60 C74 66 74 82 60 106 Z",
  "M14 60 C38 46 54 46 60 60 C54 74 38 74 14 60 Z",
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
          background: "#1747E0",
          borderRadius: 7,
        }}
      >
        <div style={{ display: "flex", transform: "rotate(45deg)" }}>
          <svg width="30" height="30" viewBox="0 0 120 120">
            <g fill="#F2EFE9">
              {PETALS.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
          </svg>
        </div>
        <div
          style={{
            position: "absolute",
            width: 8,
            height: 8,
            borderRadius: 4,
            background: "#FF6B4A",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
