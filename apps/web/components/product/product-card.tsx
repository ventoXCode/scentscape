import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils/format";

const FAMILY_COLORS: Record<string, string> = {
  Fresh: "bg-family-fresh",
  Floral: "bg-family-floral",
  Amber: "bg-family-amber",
  Woody: "bg-family-woody",
  Citrus: "bg-family-citrus",
  Aromatic: "bg-family-aromatic",
};

interface ProductCardProps {
  product: {
    id: string;
    handle: string | null;
    title: string;
    thumbnail?: string | null;
    description?: string | null;
    brand?: string | null;
    family?: string | null;
    concentration?: string | null;
    variants?: Array<{
      prices?: Array<{ amount: number; currency_code: string }>;
    }>;
    metadata?: Record<string, unknown> | null;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const price = product.variants?.[0]?.prices?.[0];
  const brand = product.brand || (product.metadata?.brand as string | undefined);
  const family = product.family || (product.metadata?.family as string | undefined);
  const concentration = product.concentration || (product.metadata?.concentration as string | undefined);
  const familyColor = family ? FAMILY_COLORS[family] || "bg-text-muted" : null;

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block border border-border-default rounded-xl overflow-hidden shadow-card hover:shadow-card-hover hover:border-border-strong transition-all duration-200"
    >
      <div className="aspect-square bg-surface-subtle relative overflow-hidden">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Family + concentration badges */}
        {(family || concentration) && (
          <div className="absolute top-2 left-2 flex items-center gap-1.5">
            {family && familyColor && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-text-primary shadow-sm">
                <span className={`w-2 h-2 rounded-full ${familyColor}`} aria-hidden="true" />
                {family}
              </span>
            )}
            {concentration && (
              <span className="px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-text-secondary shadow-sm">
                {concentration}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="p-4">
        {brand && (
          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">
            {brand}
          </p>
        )}
        <h3 className="font-medium text-text-primary mb-2 line-clamp-2">
          {product.title}
        </h3>
        {price && (
          <p className="text-sm font-semibold text-text-primary">{formatPrice(price.amount)}</p>
        )}
      </div>
    </Link>
  );
}
