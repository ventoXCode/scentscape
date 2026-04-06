"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    // Send to Google Analytics if gtag is available
    if (typeof window !== "undefined" && "gtag" in window) {
      const gtag = (window as unknown as Record<string, unknown>).gtag as (
        ...args: unknown[]
      ) => void;
      gtag("event", metric.name, {
        value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value
        ),
        event_label: metric.id,
        non_interaction: true,
      });
    }

    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.log(`[Web Vital] ${metric.name}: ${metric.value.toFixed(1)}`);
    }
  });
  return null;
}
