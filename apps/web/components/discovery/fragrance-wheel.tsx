"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FRAGRANCE_FAMILIES, type FragranceFamily } from "@/lib/learn/families";

import { FAMILIES, type FamilySlug } from "@/lib/fragrance/family-config";

const SEGMENT_ANGLE = 360 / 6;
const OUTER_RADIUS = 200;
const INNER_RADIUS = 70;
const CENTER_X = 250;
const CENTER_Y = 250;

function polarToCartesian(cx: number, cy: number, radius: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

function describeArc(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number,
) {
  const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerR, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerR, endAngle);
  const innerEnd = polarToCartesian(cx, cy, innerR, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerStart.x} ${innerStart.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
    "Z",
  ].join(" ");
}

function SubfamilyRing({
  family,
  startAngle,
  colors,
  isActive,
}: {
  family: FragranceFamily;
  startAngle: number;
  colors: { main: string; subtle: string; text: string };
  isActive: boolean;
}) {
  if (!isActive) return null;

  const subfamilyAngle = SEGMENT_ANGLE / family.subfamilies.length;
  const subOuterR = OUTER_RADIUS + 55;
  const subInnerR = OUTER_RADIUS + 4;

  return (
    <g className="animate-fade-in">
      {family.subfamilies.map((sub, i) => {
        const subStart = startAngle + i * subfamilyAngle;
        const subEnd = subStart + subfamilyAngle;
        const subMidAngle = subStart + subfamilyAngle / 2;
        const labelR = (subInnerR + subOuterR) / 2;
        const labelPos = polarToCartesian(CENTER_X, CENTER_Y, labelR, subMidAngle);

        // Rotate text so it reads naturally along the arc
        const textRotation = subMidAngle > 180 ? subMidAngle + 90 : subMidAngle - 90;

        return (
          <g key={sub.name}>
            <path
              d={describeArc(CENTER_X, CENTER_Y, subInnerR, subOuterR, subStart, subEnd)}
              fill={colors.subtle}
              stroke={colors.main}
              strokeWidth="1"
              opacity="0.9"
            />
            <text
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              dominantBaseline="central"
              transform={`rotate(${textRotation}, ${labelPos.x}, ${labelPos.y})`}
              className="fill-current text-[9px] font-medium pointer-events-none select-none"
              style={{ fill: colors.text }}
            >
              {sub.name}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function FragranceWheel() {
  const [activeFamily, setActiveFamily] = useState<string | null>(null);
  const router = useRouter();

  const handleFamilyClick = (family: FragranceFamily) => {
    if (activeFamily === family.slug) {
      router.push(`/search?family=${family.name}`);
    } else {
      setActiveFamily(family.slug);
    }
  };

  const activeData = activeFamily
    ? FRAGRANCE_FAMILIES.find((f) => f.slug === activeFamily)
    : null;

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Wheel */}
      <div className="relative w-full max-w-[520px] aspect-square">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full"
          role="img"
          aria-label="Interactive fragrance family wheel — click a segment to explore"
        >
          {/* Segments */}
          {FRAGRANCE_FAMILIES.map((family, i) => {
            const startAngle = i * SEGMENT_ANGLE;
            const endAngle = startAngle + SEGMENT_ANGLE;
            const midAngle = startAngle + SEGMENT_ANGLE / 2;
            const colors = FAMILIES[family.color as FamilySlug]?.hex ?? FAMILIES.fresh.hex;
            const isActive = activeFamily === family.slug;

            // Label position at 60% between inner and outer radius
            const labelR = INNER_RADIUS + (OUTER_RADIUS - INNER_RADIUS) * 0.55;
            const labelPos = polarToCartesian(CENTER_X, CENTER_Y, labelR, midAngle);

            // Emoji position closer to outer edge
            const emojiR = INNER_RADIUS + (OUTER_RADIUS - INNER_RADIUS) * 0.82;
            const emojiPos = polarToCartesian(CENTER_X, CENTER_Y, emojiR, midAngle);

            return (
              <g key={family.slug}>
                <path
                  d={describeArc(CENTER_X, CENTER_Y, INNER_RADIUS, OUTER_RADIUS, startAngle, endAngle)}
                  fill={isActive ? colors.main : colors.subtle}
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-300"
                  style={{
                    filter: isActive ? "none" : "saturate(0.8)",
                    opacity: activeFamily && !isActive ? 0.5 : 1,
                  }}
                  onClick={() => handleFamilyClick(family)}
                  onMouseEnter={() => !activeFamily && setActiveFamily(family.slug)}
                  onMouseLeave={() => !activeFamily && setActiveFamily(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${family.name}: ${family.tagline}. Click to explore.`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleFamilyClick(family);
                    }
                  }}
                />

                {/* Emoji */}
                <text
                  x={emojiPos.x}
                  y={emojiPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-lg pointer-events-none select-none"
                  style={{ opacity: activeFamily && !isActive ? 0.4 : 1 }}
                >
                  {family.emoji}
                </text>

                {/* Family name */}
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="pointer-events-none select-none"
                  style={{
                    fill: isActive ? "white" : colors.text,
                    fontSize: isActive ? "13px" : "12px",
                    fontWeight: isActive ? 700 : 600,
                    opacity: activeFamily && !isActive ? 0.5 : 1,
                  }}
                >
                  {family.name}
                </text>

                {/* Subfamily ring */}
                <SubfamilyRing
                  family={family}
                  startAngle={startAngle}
                  colors={colors}
                  isActive={isActive}
                />
              </g>
            );
          })}

          {/* Center circle */}
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={INNER_RADIUS - 2}
            fill="white"
            stroke="#E8E0D6"
            strokeWidth="1"
          />
          <text
            x={CENTER_X}
            y={CENTER_Y - 10}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-xs font-medium pointer-events-none select-none"
            style={{ fill: "#6B6259" }}
          >
            Fragrance
          </text>
          <text
            x={CENTER_X}
            y={CENTER_Y + 8}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-xs font-medium pointer-events-none select-none"
            style={{ fill: "#6B6259" }}
          >
            Families
          </text>
        </svg>
      </div>

      {/* Detail panel */}
      {activeData && (
        <div
          className="w-full max-w-lg animate-fade-in-up rounded-xl border border-border-default bg-surface-elevated p-6 shadow-card"
        >
          <div className="flex items-start gap-4 mb-4">
            <span className="text-3xl">{activeData.emoji}</span>
            <div className="flex-1">
              <h3 className="font-display text-xl font-semibold text-text-primary">
                {activeData.name}
              </h3>
              <p className="text-sm text-text-secondary mt-0.5">{activeData.tagline}</p>
            </div>
            <button
              onClick={() => router.push(`/search?family=${activeData.name}`)}
              className="shrink-0 rounded-lg bg-accent-primary px-4 py-2 text-sm font-medium text-white hover:bg-accent-primary-hover transition-colors"
            >
              Browse
            </button>
          </div>

          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            {activeData.description.slice(0, 200)}...
          </p>

          {/* Signature notes */}
          <div className="mb-4">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
              Signature Notes
            </p>
            <div className="flex flex-wrap gap-1.5">
              {activeData.signatureNotes.slice(0, 6).map((note) => (
                <span
                  key={note}
                  className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: FAMILIES[activeData.color as FamilySlug]?.hex.subtle ?? FAMILIES.fresh.hex.subtle,
                    color: FAMILIES[activeData.color as FamilySlug]?.hex.text ?? FAMILIES.fresh.hex.text,
                  }}
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Subfamilies */}
          <div>
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
              Subfamilies
            </p>
            <div className="space-y-1.5">
              {activeData.subfamilies.map((sub) => (
                <div key={sub.name} className="text-sm">
                  <span className="font-medium text-text-primary">{sub.name}</span>
                  <span className="text-text-muted"> — {sub.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Learn more */}
          <a
            href={`/learn/families/${activeData.slug}`}
            className="mt-4 inline-block text-sm font-medium text-accent-primary hover:text-accent-primary-hover transition-colors"
          >
            Learn more about {activeData.name} fragrances →
          </a>
        </div>
      )}

      {/* Instruction text when no family selected */}
      {!activeData && (
        <p className="text-sm text-text-muted text-center max-w-md">
          Hover or tap a segment to explore a fragrance family. Click again to browse products in that family.
        </p>
      )}
    </div>
  );
}
