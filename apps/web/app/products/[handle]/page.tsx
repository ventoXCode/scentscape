import { medusa } from "@/lib/medusa/client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ScentPyramid } from "@/components/product/scent-pyramid";
import { AccordsDisplay } from "@/components/product/accords-display";
import { PerformanceRatings } from "@/components/product/performance-ratings";
import { ProductPurchaseSection } from "@/components/product/product-purchase-section";
import { ProductJsonLd } from "@/components/seo/product-jsonld";
import { ImageGallery } from "@/components/product/image-gallery";
import { PerfectFor } from "@/components/product/perfect-for";
import { ScentJourney } from "@/components/product/scent-journey";

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

export async function generateStaticParams() {
  try {
    const { products } = await medusa.store.product.list({ limit: 200 });
    return (products ?? [])
      .filter((p: any) => p.handle)
      .map((p: any) => ({ handle: p.handle }));
  } catch {
    return [];
  }
}

export const revalidate = 300;

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

  const productImages = (product.images || []).map((img: { id: string; url: string }) => ({
    id: img.id,
    url: img.url,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductJsonLd product={product} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-text-muted">
          <li><Link href="/" className="hover:text-text-primary transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/products" className="hover:text-text-primary transition-colors">Fragrances</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-text-secondary truncate max-w-[200px]">{product.title}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <ImageGallery
          thumbnail={product.thumbnail}
          images={productImages}
          title={product.title}
        />

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

              <PerfectFor
                seasons={fragranceData.season ?? []}
                occasions={fragranceData.occasion ?? []}
                gender={fragranceData.gender}
                concentration={fragranceData.concentration}
              />

              <ScentJourney
                topNotes={fragranceData.top_notes}
                heartNotes={fragranceData.heart_notes}
                baseNotes={fragranceData.base_notes}
              />
            </>
          )}

          <ProductPurchaseSection variants={product.variants || []} />
        </div>
      </div>
    </div>
  );
}
