"use client";

import { useState } from "react";
import { VariantSelector } from "./variant-selector";
import { AddToCartButton } from "./add-to-cart-button";

interface Variant {
  id: string;
  title: string;
  prices?: Array<{ amount: number; currency_code: string }>;
}

interface ProductPurchaseSectionProps {
  variants: Variant[];
}

export function ProductPurchaseSection({ variants }: ProductPurchaseSectionProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    variants[0]?.id ?? ""
  );

  return (
    <div className="border-t pt-6 space-y-4">
      <VariantSelector
        variants={variants}
        onSelect={(v) => setSelectedVariantId(v.id)}
      />
      <AddToCartButton
        productId=""
        variantId={selectedVariantId}
      />
    </div>
  );
}
