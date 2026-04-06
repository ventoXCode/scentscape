import Link from "next/link";
import Image from "next/image";
import { meilisearch, PRODUCTS_INDEX, type SearchableProduct } from "@/lib/search/meilisearch";
import { formatPrice } from "@/lib/utils/format";
import { WishlistButton } from "@/components/product/wishlist-button";

interface NoteProductsProps {
  noteName: string;
}

export async function NoteProducts({ noteName }: NoteProductsProps) {
  let products: SearchableProduct[] = [];

  try {
    const res = await meilisearch
      .index(PRODUCTS_INDEX)
      .search<SearchableProduct>(noteName, { limit: 8 });
    products = res.hits;
  } catch {
    // Meilisearch unavailable at build time
  }

  if (products.length === 0) {
    return (
      <p className="text-text-muted text-sm">
        No fragrances featuring {noteName.toLowerCase()} found in our catalog yet.{" "}
        <Link href="/products" className="text-accent-primary hover:underline">
          Browse all fragrances
        </Link>
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((hit) => (
        <div
          key={hit.id}
          className="border border-border-default rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200"
        >
          <Link href={`/products/${hit.handle}`} className="block">
            <div className="aspect-square bg-surface-subtle relative overflow-hidden">
              {hit.thumbnail ? (
                <Image
                  src={hit.thumbnail}
                  alt={hit.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              <WishlistButton
                product={{
                  id: hit.id,
                  handle: hit.handle,
                  title: hit.title,
                  thumbnail: hit.thumbnail ?? null,
                  brand: hit.brand ?? null,
                  family: hit.family ?? null,
                }}
              />
            </div>
          </Link>
          <div className="p-3">
            {hit.brand && (
              <p className="text-xs text-text-muted uppercase tracking-wider mb-0.5">
                {hit.brand}
              </p>
            )}
            <Link href={`/products/${hit.handle}`}>
              <h3 className="text-sm font-medium text-text-primary line-clamp-2 hover:text-accent-primary transition-colors">
                {hit.title}
              </h3>
            </Link>
            {hit.price != null && (
              <p className="text-sm font-semibold text-text-primary mt-1">
                {formatPrice(hit.price)}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
