"use client";

import type { Archetype, PersonalityDimensions } from "@/lib/quiz/types";

interface PersonalityCardProps {
  archetype: Archetype;
  dimensions: PersonalityDimensions;
}

const DIMENSION_LABELS: { key: keyof PersonalityDimensions; low: string; high: string }[] = [
  { key: "warmthFreshness", low: "Fresh", high: "Warm" },
  { key: "boldnessSubtlety", low: "Subtle", high: "Bold" },
  { key: "classicAvantgarde", low: "Classic", high: "Modern" },
  { key: "intimateProjecting", low: "Intimate", high: "Projecting" },
];

export function PersonalityCard({ archetype, dimensions }: PersonalityCardProps) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${archetype.gradient} p-8 md:p-10 shadow-elevated`}>
      <div className={archetype.textColor}>
        <p className={`text-sm font-medium uppercase tracking-widest mb-2 ${archetype.accentColor}`}>
          Your scent personality
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          {archetype.name}
        </h2>
        <p className="text-lg md:text-xl opacity-90 mb-6 leading-relaxed">
          {archetype.tagline}
        </p>
        <p className="text-sm opacity-80 leading-relaxed mb-8">
          {archetype.description}
        </p>

        {/* Personality dimensions visualization */}
        <div className="space-y-3">
          {DIMENSION_LABELS.map(({ key, low, high }) => {
            const value = dimensions[key];
            // Map -1..+1 to 0..100
            const percent = ((value + 1) / 2) * 100;
            return (
              <div key={key}>
                <div className="flex justify-between text-xs opacity-70 mb-1">
                  <span>{low}</span>
                  <span>{high}</span>
                </div>
                <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-white/70 transition-all duration-700"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
