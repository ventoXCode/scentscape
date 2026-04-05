"use client";

import { useState } from "react";
import { VariantSelector } from "./variant-selector";
import { AddToCartButton } from "./add-to-cart-button";
import { formatPrice } from "@/lib/utils/format";

interface Variant {
  id: string;
  title: string;
  prices?: Array<{ amount: number; currency_code: string }>;
}

interface ProductPurchaseSectionProps {
  variants: Variant[];
}

export function ProductPurchaseSection({
  variants,
}: ProductPurchaseSectionProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    variants[0] ?? { id: "", title: "" },
  );

  const price = selectedVariant.prices?.[0];

  return (
    <>
      <div className="border-t border-border-default pt-6 space-y-4">
        {price && (
          <p className="text-2xl font-semibold text-text-primary font-display">
            {formatPrice(price.amount, price.currency_code)}
          </p>
        )}
        <VariantSelector
          variants={variants}
          onSelect={(v) => setSelectedVariant(v)}
        />
        {/* Desktop add-to-cart (hidden on mobile where sticky bar shows) */}
        <div className="hidden md:block">
          <AddToCartButton variantId={selectedVariant.id} />
        </div>
      </div>

      {/* Mobile sticky add-to-cart bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-surface-elevated border-t border-border-default px-4 py-3 shadow-elevated">
        <div className="flex items-center gap-3">
          {price && (
            <p className="text-lg font-semibold text-text-primary font-display flex-shrink-0">
              {formatPrice(price.amount, price.currency_code)}
            </p>
          )}
          <div className="flex-1">
            <AddToCartButton variantId={selectedVariant.id} />
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from being hidden behind the sticky bar on mobile */}
      <div className="h-20 md:hidden" aria-hidden="true" />
    </>
  );
}
