import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ScentScape — Discover Your Signature Fragrance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1A1613 0%, #2A2318 40%, #3D2E1A 100%)",
          padding: 60,
        }}
      >
        {/* Decorative accent line */}
        <div
          style={{
            display: "flex",
            width: 80,
            height: 4,
            borderRadius: 2,
            background: "#8B6914",
            marginBottom: 32,
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "#FFFCF9",
            letterSpacing: -1,
            marginBottom: 16,
          }}
        >
          ScentScape
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#C4B8AA",
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 700,
            marginBottom: 48,
          }}
        >
          Discover Your Signature Fragrance Through Personality-Based Matching
        </div>

        {/* Feature pills */}
        <div style={{ display: "flex", gap: 24 }}>
          {["10 Scent Personalities", "100+ Fragrances", "Free 2-Min Quiz"].map(
            (label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  padding: "12px 24px",
                  borderRadius: 100,
                  border: "1px solid #8B691444",
                  background: "#8B691414",
                  color: "#D4A017",
                  fontSize: 18,
                }}
              >
                {label}
              </div>
            )
          )}
        </div>
      </div>
    ),
    size,
  );
}
