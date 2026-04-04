import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: {
    id: string;
    handle: string | null;
    title: string;
    thumbnail?: string | null;
    description?: string | null;
    variants?: Array<{
      prices?: Array<{ amount: number; currency_code: string }>;
    }>;
    metadata?: Record<string, unknown> | null;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const price = product.variants?.[0]?.prices?.[0];
  const brand = product.metadata?.brand as string | undefined;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount / 100);
  };

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block border rounded-lg overflow-hidden hover:border-black transition-colors"
    >
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
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
      </div>
      <div className="p-4">
        {brand && (
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            {brand}
          </p>
        )}
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>
        {price && (
          <p className="text-sm font-semibold">{formatPrice(price.amount)}</p>
        )}
      </div>
    </Link>
  );
}
