import { medusa } from "@/lib/medusa/client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ScentPyramid } from "@/components/product/scent-pyramid";
import { AccordsDisplay } from "@/components/product/accords-display";
import { PerformanceRatings } from "@/components/product/performance-ratings";
import { ProductPurchaseSection } from "@/components/product/product-purchase-section";
import { ProductJsonLd } from "@/components/seo/product-jsonld";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  try {
    const { products } = await medusa.store.product.list({ handle, limit: 1 });
    const product = products?.[0];
    if (!product) return {};
    const brand = product.metadata?.brand as string | undefined;
    return {
      title: brand
        ? `${product.title} by ${brand} | ScentScape`
        : `${product.title} | ScentScape`,
      description: product.description ?? undefined,
      openGraph: {
        title: product.title,
        description: product.description ?? undefined,
        images: product.thumbnail ? [{ url: product.thumbnail }] : [],
      },
    };
  } catch {
    return {};
  }
}

interface FragranceData {
  top_notes: string[];
  heart_notes: string[];
  base_notes: string[];
  accords: string[];
  family: string;
  sub_family: string | null;
  concentration: string;
  longevity: number | null;
  sillage: number | null;
  projection: number | null;
  gender: string;
  season: string[];
  occasion: string[];
}

async function getFragranceData(productId: string): Promise<FragranceData | null> {
  const backendUrl =
    process.env.MEDUSA_BACKEND_URL || "http://localhost:9000";
  try {
    const res = await fetch(
      `${backendUrl}/store/products/${productId}/fragrance`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.fragrance_data ?? null;
  } catch {
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;

  let products: any[] = [];
  try {
    const result = await medusa.store.product.list({ handle, limit: 1 });
    products = result.products || [];
  } catch {
    // Backend unavailable
  }

  const product = products[0];
  if (!product) notFound();

  const fragranceData = await getFragranceData(product.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductJsonLd product={product} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square bg-surface-subtle rounded-lg overflow-hidden">
          {product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24"
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
        </div>

        {/* Product Info */}
        <div>
          {product.metadata?.brand && (
            <p className="text-sm text-text-muted uppercase tracking-wider mb-2">
              {product.metadata.brand as string}
            </p>
          )}
          <h1 className="text-3xl font-bold font-display mb-2">{product.title}</h1>

          {fragranceData && (
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-surface-subtle text-text-secondary rounded text-xs font-medium">
                {fragranceData.family}
              </span>
              <span className="px-2 py-1 bg-surface-subtle text-text-secondary rounded text-xs font-medium">
                {fragranceData.concentration}
              </span>
              <span className="px-2 py-1 bg-surface-subtle text-text-secondary rounded text-xs font-medium">
                {fragranceData.gender}
              </span>
            </div>
          )}

          <p className="text-text-secondary mb-6 leading-relaxed">{product.description}</p>

          {fragranceData && (
            <>
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Scent Pyramid</h3>
                <ScentPyramid
                  top={fragranceData.top_notes}
                  heart={fragranceData.heart_notes}
                  base={fragranceData.base_notes}
                />
              </div>

              <AccordsDisplay accords={fragranceData.accords} />

              <PerformanceRatings
                longevity={fragranceData.longevity}
                sillage={fragranceData.sillage}
                projection={fragranceData.projection}
              />

              {(fragranceData.season?.length > 0 ||
                fragranceData.occasion?.length > 0) && (
                <div className="mb-6 flex flex-wrap gap-6">
                  {fragranceData.season?.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-wider text-text-muted mb-2">
                        Season
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {fragranceData.season.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {fragranceData.occasion?.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-wider text-text-muted mb-2">
                        Occasion
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {fragranceData.occasion.map((o) => (
                          <span
                            key={o}
                            className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs"
                          >
                            {o}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          <ProductPurchaseSection variants={product.variants || []} />
        </div>
      </div>
    </div>
  );
}
