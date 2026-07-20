import { ImageResponse } from "next/og";

export const alt = "Bloom Matrix — AI-First Product Engineering Company";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "linear-gradient(135deg, #0A0F1F 0%, #101A3D 60%, #1a2557 100%)",
          color: "#F2F4F8",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 4,
            color: "#5C7FE0",
            textTransform: "uppercase",
            marginBottom: 24,
            display: "flex",
          }}
        >
          Bloom Matrix
        </div>
        <div style={{ fontSize: 64, lineHeight: 1.15, maxWidth: 900, display: "flex" }}>
          AI-First Product Engineering Company
        </div>
      </div>
    ),
    { ...size }
  );
}
