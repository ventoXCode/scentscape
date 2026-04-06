"use client";

import { useSampleBox } from "@/lib/samples/context";
import {
  SAMPLE_BOX_TIERS,
  MIN_SAMPLES,
  MAX_SAMPLES,
  buildSamplePartnerUrl,
  SAMPLE_PARTNER,
} from "@/lib/samples/config";
import { formatPrice } from "@/lib/utils/format";
import Image from "next/image";
import Link from "next/link";

export function SampleBoxSummary() {
  const { items, removeItem, clearBox, count } = useSampleBox();

  // Determine applicable tier based on count
  const activeTier =
    SAMPLE_BOX_TIERS.find((t) => t.sampleCount <= count) ?? null;
  const nextTier =
    SAMPLE_BOX_TIERS.find((t) => t.sampleCount > count) ?? null;

  const partnerUrl = buildSamplePartnerUrl(
    items.map((i) => `${i.brand} ${i.title}`),
  );

  const handleCheckout = () => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "sample_box_checkout", {
        item_count: count,
        tier: activeTier?.id ?? "none",
        items: items.map((i) => i.handle).join(","),
      });
    }
  };

  return (
    <div className="rounded-xl border border-border-default bg-surface-elevated shadow-card">
      <div className="p-6 border-b border-border-default">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold font-display text-text-primary">
            Your Sample Box
          </h2>
          <span className="text-sm text-text-muted">
            {count}/{MAX_SAMPLES} samples
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-2 rounded-full bg-surface-subtle overflow-hidden">
          <div
            className="h-full rounded-full bg-accent-primary transition-all duration-300"
            style={{ width: `${(count / MAX_SAMPLES) * 100}%` }}
          />
        </div>
        {nextTier && count < MIN_SAMPLES && (
          <p className="mt-2 text-xs text-text-muted">
            Add {MIN_SAMPLES - count} more to reach the minimum ({nextTier.name})
          </p>
        )}
        {nextTier && count >= MIN_SAMPLES && (
          <p className="mt-2 text-xs text-text-muted">
            Add {nextTier.sampleCount - count} more for the{" "}
            {nextTier.name} ({formatPrice(nextTier.price, "usd")})
          </p>
        )}
      </div>

      {/* Items list */}
      {items.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-text-muted text-sm">
            Your sample box is empty
          </p>
          <Link
            href="/products"
            className="mt-3 inline-block text-sm text-accent-primary hover:underline"
          >
            Browse fragrances →
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-border-subtle">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 p-4"
            >
              {item.thumbnail ? (
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-lg object-cover bg-surface-subtle"
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-surface-subtle" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {item.title}
                </p>
                <p className="text-xs text-text-muted">
                  {item.brand}
                  {item.family && (
                    <span className="ml-2 text-text-muted">
                      · {item.family}
                    </span>
                  )}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.title} from sample box`}
                className="flex-shrink-0 p-1.5 rounded-lg text-text-muted hover:text-error hover:bg-error-subtle transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Footer with pricing and CTA */}
      {items.length > 0 && (
        <div className="p-6 border-t border-border-default space-y-4">
          {/* Tier pricing */}
          <div className="space-y-2">
            {SAMPLE_BOX_TIERS.map((tier) => {
              const isActive = count >= tier.sampleCount;
              const isExact = count === tier.sampleCount;
              return (
                <div
                  key={tier.id}
                  className={`flex items-center justify-between text-sm ${
                    isActive
                      ? "text-text-primary font-medium"
                      : "text-text-muted"
                  }`}
                >
                  <span>
                    {tier.name} ({tier.description})
                    {isExact && " ✓"}
                  </span>
                  <span>{formatPrice(tier.price, "usd")}</span>
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          {count >= MIN_SAMPLES ? (
            <a
              href={partnerUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCheckout}
              className="block w-full text-center px-6 py-3 rounded-lg bg-accent-primary text-white font-medium hover:bg-accent-primary-hover transition-colors"
            >
              Order Samples — {formatPrice(activeTier?.price ?? 2500, "usd")}
            </a>
          ) : (
            <Link
              href="/products"
              className="block w-full text-center px-6 py-3 rounded-lg bg-accent-primary text-white font-medium hover:bg-accent-primary-hover transition-colors"
            >
              Add {MIN_SAMPLES - count} More to Order
            </Link>
          )}

          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">
              {SAMPLE_PARTNER.tagline}
            </p>
            <button
              onClick={clearBox}
              className="text-xs text-text-muted hover:text-error transition-colors"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
