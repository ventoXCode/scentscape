"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { meilisearch, PRODUCTS_INDEX, type SearchableProduct } from "@/lib/search/meilisearch";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchableProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = "search-suggestions-listbox";

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setHasSearched(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const results = await meilisearch
          .index(PRODUCTS_INDEX)
          .search<SearchableProduct>(query, { limit: 5 });
        setSuggestions(results.hits);
        setHasSearched(true);
      } catch {
        setSuggestions([]);
        setHasSearched(true);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && activeIndex >= 0 && suggestions[activeIndex]) {
      e.preventDefault();
      setIsOpen(false);
      router.push(`/products/${suggestions[activeIndex].handle}`);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const showDropdown = isOpen && query.length >= 2 && hasSearched;

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
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search fragrances..."
          aria-label="Search fragrances"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `search-option-${activeIndex}` : undefined}
          className="w-64 px-4 py-2 border border-border-default rounded-lg text-sm"
        />
      </form>

      {showDropdown && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Search suggestions"
          className="absolute top-full left-0 right-0 mt-1 bg-surface-elevated border border-border-default rounded-lg shadow-elevated z-50"
        >
          {suggestions.length > 0 ? (
            <>
              {suggestions.map((product, index) => (
                <Link
                  key={product.id}
                  id={`search-option-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  href={`/products/${product.handle}`}
                  className={`flex items-center gap-3 p-3 first:rounded-t-lg ${
                    index === activeIndex ? "bg-surface-subtle" : "hover:bg-surface-subtle"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {product.thumbnail ? (
                    <Image
                      src={product.thumbnail}
                      alt=""
                      width={40}
                      height={40}
                      className="object-cover rounded flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-surface-subtle rounded flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{product.title}</p>
                    <p className="text-xs text-text-muted truncate">{product.brand}</p>
                  </div>
                </Link>
              ))}
              <div className="border-t border-border-default">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  className="block px-3 py-2 text-xs text-text-muted hover:bg-surface-subtle rounded-b-lg text-center"
                  onClick={() => setIsOpen(false)}
                >
                  See all results for &ldquo;{query}&rdquo;
                </Link>
              </div>
            </>
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-text-muted">No results found for &ldquo;{query}&rdquo;</p>
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                className="text-xs text-text-muted underline mt-1 inline-block"
                onClick={() => setIsOpen(false)}
              >
                Try full search
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
