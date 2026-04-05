"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils/format";

interface Variant {
  id: string;
  title: string;
  prices?: Array<{ amount: number; currency_code: string }>;
}

interface VariantSelectorProps {
  variants: Variant[];
  onSelect?: (variant: Variant) => void;
}

export function VariantSelector({ variants, onSelect }: VariantSelectorProps) {
  const [selectedId, setSelectedId] = useState<string>(
    variants[0]?.id ?? "",
  );

  if (!variants || variants.length === 0) return null;

  const handleSelect = (variant: Variant) => {
    setSelectedId(variant.id);
    onSelect?.(variant);
  };

  return (
    <div className="mb-4">
      <p
        id="variant-selector-label"
        className="text-sm font-medium text-text-secondary mb-2"
      >
        Size
      </p>
      <div
        className="flex flex-wrap gap-2"
        role="radiogroup"
        aria-labelledby="variant-selector-label"
      >
        {variants.map((variant) => {
          const price = variant.prices?.[0];
          const isSelected = variant.id === selectedId;

          return (
            <button
              key={variant.id}
              onClick={() => handleSelect(variant)}
              role="radio"
              aria-checked={isSelected}
              className={`px-4 py-2 border rounded-lg text-sm transition-all ${
                isSelected
                  ? "border-text-primary bg-text-primary text-text-inverse"
                  : "border-border-default hover:border-border-strong text-text-primary"
              }`}
            >
              <span>{variant.title}</span>
              {price && (
                <span
                  className={`ml-2 ${isSelected ? "text-text-inverse/70" : "text-text-muted"}`}
                >
                  {formatPrice(price.amount, price.currency_code)}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
