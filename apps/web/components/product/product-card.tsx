import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils/format";
import { WishlistButton } from "@/components/product/wishlist-button";
import { getFamilyByName } from "@/lib/fragrance/family-config";
import { isStaffPick, isTrending } from "@/lib/discovery/editorial-badges";

const LONGEVITY_LABELS = ["", "Fleeting", "Short", "Moderate", "Long-lasting", "Legendary"];
const SILLAGE_LABELS = ["", "Intimate", "Close", "Moderate", "Strong", "Enormous"];

const SEASON_CONFIG: Record<string, { label: string; icon: string }> = {
  Spring: { label: "Spring Pick", icon: "\uD83C\uDF38" },
  Summer: { label: "Summer Pick", icon: "\u2600\uFE0F" },
  Fall: { label: "Fall Pick", icon: "\uD83C\uDF42" },
  Winter: { label: "Winter Pick", icon: "\u2744\uFE0F" },
};

function getCurrentSeason(): string {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "Spring";
  if (month >= 5 && month <= 7) return "Summer";
  if (month >= 8 && month <= 10) return "Fall";
  return "Winter";
}

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
    topNote?: string | null;
    sillage?: number | null;
    longevity?: number | null;
    season?: string[] | null;
    variants?: Array<{
      prices?: Array<{ amount: number; currency_code: string }>;
    }>;
    metadata?: Record<string, unknown> | null;
  };
  priority?: boolean;
}

export function ProductCard({ product, priority }: ProductCardProps) {
  const allPrices = product.variants?.flatMap(
    (v) => v.prices?.map((p) => p.amount) ?? []
  ) ?? [];
  const minPrice = allPrices.length ? Math.min(...allPrices) : null;
  const maxPrice = allPrices.length ? Math.max(...allPrices) : null;
  const hasRange = minPrice !== null && maxPrice !== null && minPrice !== maxPrice;
  const brand = product.brand || (product.metadata?.brand as string | undefined);
  const family = product.family || (product.metadata?.family as string | undefined);
  const concentration = product.concentration || (product.metadata?.concentration as string | undefined);
  const topNote = product.topNote || null;
  const familyConfig = family ? getFamilyByName(family) : undefined;
  const familyColor = familyConfig ? familyConfig.classes.bg : null;

  // Compute contextual badges (max 2 to avoid visual clutter)
  const badges: { label: string; className: string }[] = [];
  if (product.handle && isStaffPick(product.handle)) {
    badges.push({
      label: "\u2B50 Staff Pick",
      className: "bg-accent-primary/15 text-accent-primary",
    });
  }
  if (badges.length < 2 && isTrending(product.id)) {
    badges.push({
      label: "\uD83D\uDD25 Trending",
      className: "bg-family-floral-subtle text-family-floral",
    });
  }
  if (badges.length < 2 && product.sillage != null && product.sillage <= 2.5) {
    badges.push({
      label: "\uD83C\uDF1F Beginner Friendly",
      className: "bg-success-subtle text-success",
    });
  }
  const currentSeason = getCurrentSeason();
  const seasonCfg = SEASON_CONFIG[currentSeason];
  if (badges.length < 2 && seasonCfg && product.season?.includes(currentSeason)) {
    badges.push({
      label: `${seasonCfg.icon} ${seasonCfg.label}`,
      className: "bg-family-amber-subtle text-family-amber",
    });
  }

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block border border-border-default rounded-xl overflow-hidden shadow-card hover:shadow-card-hover hover:border-border-strong transition-all duration-200"
    >
      <div className="aspect-[3/4] bg-surface-subtle relative overflow-hidden">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            priority={priority}
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
              <span className="flex items-center gap-1 px-2 py-0.5 bg-surface-elevated/90 backdrop-blur-sm rounded-full text-xs font-medium text-text-primary shadow-sm">
                <span className={`w-2 h-2 rounded-full ${familyColor}`} aria-hidden="true" />
                {family}
              </span>
            )}
            {concentration && (
              <span className="px-2 py-0.5 bg-surface-elevated/90 backdrop-blur-sm rounded-full text-xs font-medium text-text-secondary shadow-sm">
                {concentration}
              </span>
            )}
          </div>
        )}

        {/* Contextual badges */}
        {badges.length > 0 && (
          <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
            {badges.map((badge) => (
              <span
                key={badge.label}
                className={`px-2 py-0.5 backdrop-blur-sm rounded-full text-xs font-medium shadow-sm ${badge.className}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}

        <WishlistButton
          product={{
            id: product.id,
            handle: product.handle || "",
            title: product.title,
            thumbnail: product.thumbnail ?? null,
            brand: brand ?? null,
            family: family ?? null,
          }}
        />

        {/* Hover quick-preview overlay */}
        {(product.description || product.longevity != null || product.sillage != null) && (
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-smooth pointer-events-none">
            <div className="bg-gradient-to-t from-black/80 via-black/60 to-transparent px-3 pb-3 pt-8">
              {product.description && (
                <p className="text-xs text-white/90 line-clamp-2 mb-1.5">
                  {product.description}
                </p>
              )}
              {(product.longevity != null || product.sillage != null) && (
                <div className="flex gap-3 text-[11px] text-white/70">
                  {product.longevity != null && (
                    <span>{LONGEVITY_LABELS[Math.round(product.longevity)] || "—"} wear</span>
                  )}
                  {product.sillage != null && (
                    <span>{SILLAGE_LABELS[Math.round(product.sillage)] || "—"} sillage</span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        {brand && (
          <p className="text-[11px] text-text-muted uppercase tracking-widest mb-1">
            {brand}
          </p>
        )}
        <h3 className="font-display font-semibold text-text-primary mb-1 line-clamp-2 leading-snug">
          {product.title}
        </h3>
        {topNote && (
          <p className="text-xs text-text-muted mb-2 truncate">
            Top note: {topNote}
          </p>
        )}
        {minPrice !== null && (
          <p className="text-sm font-semibold text-accent-primary">
            {hasRange ? `From ${formatPrice(minPrice)}` : formatPrice(minPrice)}
          </p>
        )}
      </div>
    </Link>
  );
}
