import { medusa } from "@/lib/medusa/client";
import { ProductCard } from "@/components/product/product-card";
import { ProductFilters } from "@/components/filters/product-filters";

interface ProductsPageProps {
  searchParams: Promise<{
    family?: string;
    concentration?: string;
    price?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  let products: any[] = [];
  try {
    const result = await medusa.store.product.list({ limit: 50 });
    products = result.products || [];
  } catch {
    // Backend may not be running; render empty state gracefully
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Fragrances</h1>

      <div className="flex gap-8">
        <aside className="w-64 flex-shrink-0">
          <ProductFilters currentFilters={params} />
        </aside>

        <main className="flex-1">
          {products.length === 0 ? (
            <p className="text-gray-500">
              No fragrances found. Run the seed script to populate the catalog.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
