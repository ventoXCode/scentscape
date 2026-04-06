import { ImageResponse } from "next/og";
import { getSharedQuizSession } from "@/lib/quiz/api";
import { getArchetypeById } from "@/lib/quiz/personality";

export const runtime = "edge";
export const alt = "ScentScape Quiz Results";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori can't use Tailwind — map archetype gradients to CSS colors
const ARCHETYPE_COLORS: Record<string, { from: string; via: string; to: string; text: string; accent: string }> = {
  "velvet-dusk":       { from: "#581c87", via: "#6b21a8", to: "#78350f", text: "#f3e8ff", accent: "#fcd34d" },
  "morning-mist":      { from: "#bae6fd", via: "#dbeafe", to: "#a5f3fc", text: "#0c4a6e", accent: "#0284c7" },
  "gilded-ember":      { from: "#92400e", via: "#7c2d12", to: "#450a0a", text: "#fef3c7", accent: "#fdba74" },
  "silver-breeze":     { from: "#cbd5e1", via: "#e5e7eb", to: "#d4d4d8", text: "#1e293b", accent: "#475569" },
  "crimson-bloom":     { from: "#9f1239", via: "#be185d", to: "#86198f", text: "#ffe4e6", accent: "#f9a8d4" },
  "jade-garden":       { from: "#065f46", via: "#15803d", to: "#115e59", text: "#d1fae5", accent: "#86efac" },
  "midnight-reverie":  { from: "#1e1b4b", via: "#0f172a", to: "#2e1065", text: "#c7d2fe", accent: "#a78bfa" },
  "golden-hour":       { from: "#fcd34d", via: "#fef08a", to: "#fdba74", text: "#78350f", accent: "#c2410c" },
  "electric-noir":     { from: "#18181b", via: "#262626", to: "#083344", text: "#f4f4f5", accent: "#22d3ee" },
  "silk-whisper":      { from: "#fbcfe8", via: "#ffe4e6", to: "#e9d5ff", text: "#881337", accent: "#db2777" },
};

const DIMENSION_LABELS: [keyof typeof DIMENSION_DISPLAY, keyof typeof DIMENSION_DISPLAY][] = [
  ["warmth", "freshness"],
  ["boldness", "subtlety"],
  ["classic", "avantGarde"],
  ["intimate", "projecting"],
];

const DIMENSION_DISPLAY = {
  warmth: "Warm", freshness: "Fresh",
  boldness: "Bold", subtlety: "Subtle",
  classic: "Classic", avantGarde: "Avant-garde",
  intimate: "Intimate", projecting: "Projecting",
} as const;

type DimKey = "warmthFreshness" | "boldnessSubtlety" | "classicAvantgarde" | "intimateProjecting";
const DIMENSION_KEYS: DimKey[] = ["warmthFreshness", "boldnessSubtlety", "classicAvantgarde", "intimateProjecting"];

export default async function OgImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSharedQuizSession(id);

  if (!session) {
    return new ImageResponse(
      (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#1A1613", width: "100%", height: "100%" }}>
          <span style={{ color: "#FFFCF9", fontSize: 48 }}>Quiz Results Not Found</span>
        </div>
      ),
      size,
    );
  }

  const archetype = getArchetypeById(session.archetype_id);
  if (!archetype) {
    return new ImageResponse(
      (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#1A1613", width: "100%", height: "100%" }}>
          <span style={{ color: "#FFFCF9", fontSize: 48 }}>Quiz Results</span>
        </div>
      ),
      size,
    );
  }

  const colors = ARCHETYPE_COLORS[archetype.id] ?? ARCHETYPE_COLORS["velvet-dusk"];
  const dims = session.dimensions;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.via} 50%, ${colors.to} 100%)`,
          padding: 0,
        }}
      >
        {/* Left: archetype identity */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "60%",
            height: "100%",
            padding: "60px 56px",
          }}
        >
          <div style={{ display: "flex", fontSize: 20, color: colors.accent, letterSpacing: 3, textTransform: "uppercase" as const, marginBottom: 12 }}>
            My Scent Personality
          </div>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: colors.text, lineHeight: 1.1, marginBottom: 16 }}>
            {archetype.name}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: colors.text, opacity: 0.85, lineHeight: 1.4, maxWidth: 560 }}>
            {archetype.tagline}
          </div>

          {/* Personality dimensions as bars */}
          <div style={{ display: "flex", flexDirection: "column", marginTop: 40, gap: 14 }}>
            {DIMENSION_LABELS.map(([left, right], i) => {
              const key = DIMENSION_KEYS[i];
              const val = (dims[key] ?? 0);
              // Map -1..1 to 0..100 for the bar position
              const pct = Math.round((val + 1) * 50);
              return (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ display: "flex", width: 100, fontSize: 14, color: colors.text, opacity: 0.7, justifyContent: "flex-end" }}>
                    {DIMENSION_DISPLAY[left]}
                  </div>
                  <div style={{ display: "flex", position: "relative", width: 260, height: 8, borderRadius: 4, background: `${colors.text}22` }}>
                    <div style={{ display: "flex", position: "absolute", left: `${pct}%`, top: -4, width: 16, height: 16, borderRadius: 8, background: colors.accent, transform: "translateX(-50%)" }} />
                  </div>
                  <div style={{ display: "flex", width: 100, fontSize: 14, color: colors.text, opacity: 0.7 }}>
                    {DIMENSION_DISPLAY[right]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: branding + CTA */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "40%",
            height: "100%",
            padding: "60px 56px",
          }}
        >
          <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: colors.text, letterSpacing: -0.5 }}>
            ScentScape
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", fontSize: 18, color: colors.text, opacity: 0.7 }}>
              Discover yours at
            </div>
            <div
              style={{
                display: "flex",
                padding: "14px 28px",
                borderRadius: 12,
                background: colors.accent,
                color: colors.from,
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              scentscape.com/quiz
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
