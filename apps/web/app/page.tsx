import Link from "next/link";
import { medusa } from "@/lib/medusa/client";
import { ProductCard } from "@/components/product/product-card";

export default async function HomePage() {
  let products: any[] = [];

  try {
    const result = await medusa.store.product.list({ limit: 4 });
    products = result.products || [];
  } catch {
    // Backend may not be running yet; render empty state gracefully
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-text-primary">
          Discover Your Signature Scent
        </h1>
        <p className="text-text-secondary mb-8 text-lg">
          Explore our curated collection of premium fragrances
        </p>
        <Link
          href="/quiz"
          className="inline-block bg-text-primary text-text-inverse px-8 py-3 rounded-lg font-medium hover:bg-text-secondary transition-colors"
        >
          Take the Scent Quiz
        </Link>
      </section>

      <section>
        <h2 className="font-display text-2xl font-semibold mb-6 text-text-primary">
          Featured Fragrances
        </h2>
        {products.length === 0 ? (
          <p className="text-text-muted">
            No fragrances found. Add products in the Medusa admin to see them here.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
