import Link from "next/link";
import Image from "next/image";
import {
  meilisearch,
  PRODUCTS_INDEX,
  type SearchableProduct,
} from "@/lib/search/meilisearch";
import { formatPrice } from "@/lib/utils/format";

const SEASON_CONFIG: Record<
  string,
  { label: string; tagline: string; editorial: string; icon: string; collection: string }
> = {
  Spring: {
    label: "Spring",
    tagline: "Fresh starts, fresh scents",
    editorial:
      "As the world wakes up, so should your fragrance. These are the scents people are reaching for this spring — light, floral, and full of energy.",
    icon: "🌷",
    collection: "spring-picks",
  },
  Summer: {
    label: "Summer",
    tagline: "Sunshine in a bottle",
    editorial:
      "Heat demands freshness. These are the fragrances making waves this summer — bright, aquatic, and effortlessly cool.",
    icon: "☀️",
    collection: "summer-fresh",
  },
  Fall: {
    label: "Fall",
    tagline: "Warmth meets mystery",
    editorial:
      "As leaves turn and the air cools, richer scents take center stage. These are the fragrances defining this autumn — spiced, warm, and magnetic.",
    icon: "🍂",
    collection: "fall-favorites",
  },
  Winter: {
    label: "Winter",
    tagline: "Warmth you can wear",
    editorial:
      "Cold days call for fragrances that envelop. These are the scents people are loving this winter — deep, cozy, and utterly addictive.",
    icon: "❄️",
    collection: "cozy-winter",
  },
};

function getCurrentSeason(): string {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "Spring";
  if (month >= 5 && month <= 7) return "Summer";
  if (month >= 8 && month <= 10) return "Fall";
  return "Winter";
}

export async function SeasonalPicks() {
  const season = getCurrentSeason();
  const config = SEASON_CONFIG[season];

  let products: SearchableProduct[] = [];

  try {
    const results = await meilisearch
      .index(PRODUCTS_INDEX)
      .search<SearchableProduct>("", {
        filter: `season = "${season}"`,
        limit: 4,
      });
    products = results.hits;
  } catch {
    return null;
  }

  if (products.length === 0) return null;

  return (
    <section className="py-section bg-surface-subtle/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <p className="text-accent-primary font-medium text-sm uppercase tracking-wide text-center mb-2">
          What People Are Wearing
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary text-center mb-2">
          {config.icon} {config.label} Picks
        </h2>
        <p className="text-text-secondary text-center mb-10 max-w-2xl mx-auto">
          {config.editorial}
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="group block rounded-xl border border-border-default bg-surface-elevated overflow-hidden shadow-card hover:shadow-card-hover hover:border-border-strong transition-all duration-200"
            >
              <div className="aspect-[3/4] relative bg-surface-subtle overflow-hidden">
                {product.thumbnail ? (
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-muted text-4xl">
                    🧴
                  </div>
                )}
                {product.family && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-surface-elevated/90 backdrop-blur-sm rounded-full text-xs text-text-secondary">
                    {product.family}
                  </span>
                )}
              </div>

              <div className="p-3 sm:p-4">
                {product.brand && (
                  <p className="text-[11px] text-text-muted uppercase tracking-wider mb-0.5">
                    {product.brand}
                  </p>
                )}
                <h3 className="font-display text-sm sm:text-base font-semibold text-text-primary leading-tight mb-1 group-hover:text-accent-primary transition-colors line-clamp-1">
                  {product.title}
                </h3>
                {product.price != null && (
                  <p className="text-sm text-accent-primary font-medium">
                    From {formatPrice(product.price)}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href={`/collections/${config.collection}`}
            className="text-text-secondary hover:text-text-primary font-medium transition-colors"
          >
            See all {config.label.toLowerCase()} fragrances &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
