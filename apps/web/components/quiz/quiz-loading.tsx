"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Mapping your scent personality...",
  "Analyzing 100+ fragrances...",
  "Finding your perfect matches...",
  "Almost there...",
];

export function QuizLoading() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => Math.min(prev + 1, MESSAGES.length - 1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Animated rings */}
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 rounded-full border-2 border-border-default animate-ping opacity-20" />
        <div className="absolute inset-2 rounded-full border-2 border-border-default animate-ping opacity-30 [animation-delay:200ms]" />
        <div className="absolute inset-4 rounded-full border-2 border-border-strong animate-ping opacity-40 [animation-delay:400ms]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-text-primary animate-pulse" />
        </div>
      </div>

      <p className="text-lg font-medium text-text-primary transition-opacity duration-500">
        {MESSAGES[messageIndex]}
      </p>
      <p className="text-sm text-text-muted mt-2">
        This takes just a moment
      </p>
    </div>
  );
}
