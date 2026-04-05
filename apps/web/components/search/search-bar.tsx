"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { meilisearch, PRODUCTS_INDEX, SearchableProduct } from "@/lib/search/meilisearch";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchableProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const results = await meilisearch
          .index(PRODUCTS_INDEX)
          .search<SearchableProduct>(query, { limit: 5 });
        setSuggestions(results.hits);
      } catch {
        setSuggestions([]);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search fragrances..."
          className="w-64 px-4 py-2 border rounded-lg text-sm"
        />
      </form>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50">
          {suggestions.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              onClick={() => setIsOpen(false)}
            >
              {product.thumbnail ? (
                <img
                  src={product.thumbnail}
                  alt=""
                  className="w-10 h-10 object-cover rounded flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-100 rounded flex-shrink-0" />
              )}
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{product.title}</p>
                <p className="text-xs text-gray-500 truncate">{product.brand}</p>
              </div>
            </Link>
          ))}
          <div className="border-t">
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              className="block px-3 py-2 text-xs text-gray-500 hover:bg-gray-50 rounded-b-lg text-center"
              onClick={() => setIsOpen(false)}
            >
              See all results for &ldquo;{query}&rdquo;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
