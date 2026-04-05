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
      <AddToCartButton variantId={selectedVariant.id} />
    </div>
  );
}
