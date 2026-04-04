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
        <h1 className="text-4xl font-bold mb-4">Discover Your Signature Scent</h1>
        <p className="text-gray-600 mb-8">
          Explore our curated collection of premium fragrances
        </p>
        <a
          href="/quiz"
          className="inline-block bg-black text-white px-8 py-3 rounded"
        >
          Take the Scent Quiz
        </a>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Featured Fragrances</h2>
        {products.length === 0 ? (
          <p className="text-gray-500">
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
