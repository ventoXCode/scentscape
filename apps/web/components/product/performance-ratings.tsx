"use client";

import { useState, useEffect, useRef } from "react";

interface PerformanceRatingsProps {
  longevity: number | null;
  sillage: number | null;
  projection: number | null;
}

interface MetricConfig {
  key: string;
  label: string;
  description: string;
  getVerbalLabel: (value: number) => string;
}

const METRICS: MetricConfig[] = [
  {
    key: "longevity",
    label: "Longevity",
    description: "How long the fragrance lasts on your skin",
    getVerbalLabel: (v) =>
      v >= 4.5
        ? "Legendary"
        : v >= 3.5
          ? "Long-lasting"
          : v >= 2.5
            ? "Moderate"
            : v >= 1.5
              ? "Short"
              : "Fleeting",
  },
  {
    key: "sillage",
    label: "Sillage",
    description: "The scent trail left in the air as you move",
    getVerbalLabel: (v) =>
      v >= 4.5
        ? "Enormous"
        : v >= 3.5
          ? "Strong"
          : v >= 2.5
            ? "Moderate"
            : v >= 1.5
              ? "Gentle"
              : "Intimate",
  },
  {
    key: "projection",
    label: "Projection",
    description: "How far the fragrance radiates from your skin",
    getVerbalLabel: (v) =>
      v >= 4.5
        ? "Room-filling"
        : v >= 3.5
          ? "Strong"
          : v >= 2.5
            ? "Moderate"
            : v >= 1.5
              ? "Close"
              : "Skin scent",
  },
];

const RADIUS = 36;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function CircularGauge({
  value,
  metric,
  isVisible,
}: {
  value: number | null;
  metric: MetricConfig;
  isVisible: boolean;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const offset =
    isVisible && value != null
      ? CIRCUMFERENCE * (1 - value / 5)
      : CIRCUMFERENCE;

  const verbalLabel = value != null ? metric.getVerbalLabel(value) : null;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative">
        <svg
          viewBox="0 0 88 88"
          className="w-[88px] h-[88px]"
          role="meter"
          aria-valuenow={value ?? undefined}
          aria-valuemin={0}
          aria-valuemax={5}
          aria-label={`${metric.label}: ${value != null ? `${value.toFixed(1)} out of 5` : "no data"}`}
        >
          {/* Background ring */}
          <circle
            cx="44"
            cy="44"
            r={RADIUS}
            fill="none"
            strokeWidth="7"
            className="stroke-surface-subtle"
          />
          {/* Value arc */}
          <circle
            cx="44"
            cy="44"
            r={RADIUS}
            fill="none"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            transform="rotate(-90 44 44)"
            className="stroke-accent-primary transition-[stroke-dashoffset] duration-1000 ease-out"
          />
          {/* Center value */}
          {value != null ? (
            <text
              x="44"
              y="41"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-text-primary text-lg font-semibold"
              style={{ fontSize: "18px", fontWeight: 600 }}
            >
              {value.toFixed(1)}
            </text>
          ) : (
            <text
              x="44"
              y="44"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-text-muted"
              style={{ fontSize: "14px" }}
            >
              &mdash;
            </text>
          )}
          {/* Verbal label inside ring */}
          {verbalLabel && (
            <text
              x="44"
              y="56"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-text-secondary"
              style={{ fontSize: "9px" }}
            >
              {verbalLabel}
            </text>
          )}
        </svg>
      </div>

      {/* Label + info */}
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium text-text-secondary">
          {metric.label}
        </span>
        <button
          type="button"
          className="relative group/info"
          aria-label={`What is ${metric.label}?`}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
        >
          <svg
            viewBox="0 0 16 16"
            className="w-3.5 h-3.5 text-text-muted hover:text-text-secondary transition-colors"
            fill="currentColor"
          >
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 12.5a5.5 5.5 0 110-11 5.5 5.5 0 010 11zM8 5a.75.75 0 01.75.75v.5a.75.75 0 01-1.5 0v-.5A.75.75 0 018 5zm-.75 3.25a.75.75 0 011.5 0v2.5a.75.75 0 01-1.5 0v-2.5z" />
          </svg>
          {showTooltip && (
            <span
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-text-primary text-text-inverse text-xs rounded-lg px-3 py-2 w-44 text-center z-10 shadow-elevated whitespace-normal"
              role="tooltip"
            >
              {metric.description}
              <span
                className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-text-primary"
                aria-hidden="true"
              />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export function PerformanceRatings({
  longevity,
  sillage,
  projection,
}: PerformanceRatingsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const values = { longevity, sillage, projection };

  return (
    <div ref={ref} className="my-6">
      <h3 className="font-semibold mb-4 text-text-primary">Performance</h3>
      <div className="flex justify-around">
        {METRICS.map((metric) => (
          <CircularGauge
            key={metric.key}
            value={values[metric.key as keyof typeof values]}
            metric={metric}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
}
