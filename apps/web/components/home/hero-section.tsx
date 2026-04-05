"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const ROTATING_WORDS = ["Signature", "Perfect", "Dream", "Ideal", "Unique"];

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-surface-primary via-surface-subtle/50 to-surface-primary">
      {/* Decorative floating orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-family-floral/10 blur-3xl animate-float" />
        <div className="absolute top-[60%] right-[8%] w-80 h-80 rounded-full bg-family-amber/10 blur-3xl animate-float-delayed" />
        <div className="absolute bottom-[10%] left-[30%] w-48 h-48 rounded-full bg-family-fresh/10 blur-3xl animate-float-slow" />
        <div className="absolute top-[30%] right-[25%] w-36 h-36 rounded-full bg-family-citrus/8 blur-2xl animate-float-slow" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center max-w-3xl animate-fade-in-up">
        <p className="text-accent-primary font-medium tracking-wide uppercase text-sm mb-6">
          Personalized Fragrance Discovery
        </p>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-text-primary leading-tight mb-6">
          Discover Your{" "}
          <span
            className={`inline-block text-accent-secondary transition-all duration-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            {ROTATING_WORDS[wordIndex]}
          </span>
          <br />
          Scent
        </h1>

        <p className="text-text-secondary text-lg sm:text-xl mb-4 max-w-xl mx-auto leading-relaxed">
          Answer a few questions about your personality and preferences.
          We&apos;ll match you with fragrances you&apos;ll love.
        </p>
        <p className="text-text-muted text-sm mb-10">
          Free &middot; 2 minutes &middot; No account needed
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center bg-accent-primary text-text-inverse px-10 py-4 rounded-lg font-medium text-lg hover:bg-accent-primary-hover transition-colors shadow-elevated"
          >
            Find Your Scent
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center border border-border-strong text-text-secondary px-8 py-4 rounded-lg font-medium hover:bg-surface-subtle transition-colors"
          >
            Browse Collection
          </Link>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface-primary to-transparent" />
    </section>
  );
}
