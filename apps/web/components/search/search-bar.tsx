"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { meilisearch, PRODUCTS_INDEX, type SearchableProduct } from "@/lib/search/meilisearch";

const RECENT_SEARCHES_KEY = "scentscape-recent-searches";
const MAX_RECENT_SEARCHES = 5;

function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveRecentSearch(q: string) {
  const trimmed = q.trim();
  if (!trimmed || trimmed.length < 2) return;
  const searches = getRecentSearches().filter((s) => s !== trimmed);
  searches.unshift(trimmed);
  localStorage.setItem(
    RECENT_SEARCHES_KEY,
    JSON.stringify(searches.slice(0, MAX_RECENT_SEARCHES))
  );
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchableProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = "search-suggestions-listbox";

  // Hydrate recent searches on mount
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  const refreshRecent = useCallback(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  const handleSaveSearch = useCallback(
    (q: string) => {
      saveRecentSearch(q);
      refreshRecent();
    },
    [refreshRecent]
  );

  const handleRemoveRecent = useCallback(
    (q: string) => {
      const updated = recentSearches.filter((s) => s !== q);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      setRecentSearches(updated);
    },
    [recentSearches]
  );

  const handleClearRecent = useCallback(() => {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
    setRecentSearches([]);
  }, []);

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
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    handleSaveSearch(query);
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
      handleSaveSearch(query);
      router.push(`/products/${suggestions[activeIndex].handle}`);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const showDropdown = isOpen && query.length >= 2 && hasSearched;
  const showRecent =
    isOpen && query.length < 2 && recentSearches.length > 0;
  const showSuggested =
    isOpen && query.length < 2 && recentSearches.length === 0;

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
          aria-expanded={showDropdown || showRecent || showSuggested}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `search-option-${activeIndex}` : undefined}
          className="w-full sm:w-64 px-4 py-2.5 border border-border-default rounded-lg text-sm"
        />
      </form>

      {/* Recent searches — shown when input is focused with no/short query */}
      {showRecent && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-surface-elevated border border-border-default rounded-lg shadow-elevated z-50"
          role="listbox"
          aria-label="Recent searches"
        >
          <div className="flex items-center justify-between px-3 pt-2.5 pb-1.5">
            <span className="text-xs font-medium text-text-muted uppercase tracking-wide">
              Recent
            </span>
            <button
              onClick={handleClearRecent}
              className="text-xs text-text-muted hover:text-text-secondary transition-colors"
            >
              Clear all
            </button>
          </div>
          {recentSearches.map((term) => (
            <div
              key={term}
              className="flex items-center gap-2 px-3 min-h-[44px] hover:bg-surface-subtle group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 text-text-muted flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <Link
                href={`/search?q=${encodeURIComponent(term)}`}
                className="flex-1 text-sm text-text-primary py-2.5 truncate"
                onClick={() => {
                  setIsOpen(false);
                  setQuery(term);
                }}
              >
                {term}
              </Link>
              <button
                onClick={() => handleRemoveRecent(term)}
                className="p-1 text-text-muted opacity-0 group-hover:opacity-100 hover:text-text-secondary transition-opacity"
                aria-label={`Remove "${term}" from recent searches`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Suggested queries — shown when focused with no query and no recent history */}
      {showSuggested && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-surface-elevated border border-border-default rounded-lg shadow-elevated z-50"
          role="listbox"
          aria-label="Suggested searches"
        >
          <div className="px-3 pt-2.5 pb-1.5">
            <span className="text-xs font-medium text-text-muted uppercase tracking-wide">
              Try searching for
            </span>
          </div>
          {["woody", "floral", "date night", "fresh", "under $150", "summer"].map((term) => (
            <Link
              key={term}
              href={`/search?q=${encodeURIComponent(term)}`}
              className="flex items-center gap-2 px-3 min-h-[44px] hover:bg-surface-subtle text-sm text-text-primary"
              onClick={() => {
                setIsOpen(false);
                setQuery(term);
                handleSaveSearch(term);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 text-text-muted flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {term}
            </Link>
          ))}
        </div>
      )}

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
                  className={`flex items-center gap-3 p-3 sm:p-3 min-h-[52px] first:rounded-t-lg ${
                    index === activeIndex ? "bg-surface-subtle" : "hover:bg-surface-subtle"
                  }`}
                  onClick={() => {
                    setIsOpen(false);
                    handleSaveSearch(query);
                  }}
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
                  className="block px-3 py-3 text-sm text-text-muted hover:bg-surface-subtle rounded-b-lg text-center"
                  onClick={() => {
                    setIsOpen(false);
                    handleSaveSearch(query);
                  }}
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
                className="text-sm text-text-muted underline mt-2 inline-block py-1"
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
