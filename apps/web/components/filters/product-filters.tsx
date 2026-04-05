"use client";

import { useRouter, usePathname } from "next/navigation";

interface FilterOption {
  label: string;
  value: string;
}

const FAMILY_OPTIONS: FilterOption[] = [
  { label: "Fresh", value: "Fresh" },
  { label: "Floral", value: "Floral" },
  { label: "Amber", value: "Amber" },
  { label: "Woody", value: "Woody" },
];

const CONCENTRATION_OPTIONS: FilterOption[] = [
  { label: "EDC", value: "EDC" },
  { label: "EDT", value: "EDT" },
  { label: "EDP", value: "EDP" },
  { label: "Parfum", value: "Parfum" },
  { label: "Extrait", value: "Extrait" },
];

const PRICE_OPTIONS: FilterOption[] = [
  { label: "Under $100", value: "under-100" },
  { label: "$100 – $200", value: "100-200" },
  { label: "$200 – $400", value: "200-400" },
  { label: "Over $400", value: "over-400" },
];

interface ProductFiltersProps {
  currentFilters: {
    family?: string;
    concentration?: string;
    price?: string;
  };
}

export function ProductFilters({ currentFilters }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams();

    // Carry over existing filters
    if (currentFilters.family) params.set("family", currentFilters.family);
    if (currentFilters.concentration)
      params.set("concentration", currentFilters.concentration);
    if (currentFilters.price) params.set("price", currentFilters.price);

    // Toggle: if the same value is selected, remove it; otherwise set it
    const current = currentFilters[key as keyof typeof currentFilters];
    if (current === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`);
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  const hasFilters =
    currentFilters.family ||
    currentFilters.concentration ||
    currentFilters.price;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Filters</h2>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 underline hover:text-black"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Family */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wider">
          Scent Family
        </h3>
        <div className="space-y-2">
          {FAMILY_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="radio"
                name="family"
                value={option.value}
                checked={currentFilters.family === option.value}
                onChange={() => updateFilter("family", option.value)}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="text-sm text-gray-700 group-hover:text-black">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Concentration */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wider">
          Concentration
        </h3>
        <div className="space-y-2">
          {CONCENTRATION_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="radio"
                name="concentration"
                value={option.value}
                checked={currentFilters.concentration === option.value}
                onChange={() => updateFilter("concentration", option.value)}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="text-sm text-gray-700 group-hover:text-black">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wider">
          Price Range
        </h3>
        <div className="space-y-2">
          {PRICE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="radio"
                name="price"
                value={option.value}
                checked={currentFilters.price === option.value}
                onChange={() => updateFilter("price", option.value)}
                className="rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="text-sm text-gray-700 group-hover:text-black">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Active filter chips */}
      {hasFilters && (
        <div className="pt-2 border-t">
          <p className="text-xs text-gray-500 mb-2">Active filters:</p>
          <div className="flex flex-wrap gap-2">
            {currentFilters.family && (
              <button
                onClick={() => updateFilter("family", currentFilters.family!)}
                className="flex items-center gap-1 px-2 py-1 bg-black text-white text-xs rounded-full"
              >
                {currentFilters.family}
                <span className="ml-1 text-gray-300">×</span>
              </button>
            )}
            {currentFilters.concentration && (
              <button
                onClick={() =>
                  updateFilter(
                    "concentration",
                    currentFilters.concentration!
                  )
                }
                className="flex items-center gap-1 px-2 py-1 bg-black text-white text-xs rounded-full"
              >
                {currentFilters.concentration}
                <span className="ml-1 text-gray-300">×</span>
              </button>
            )}
            {currentFilters.price && (
              <button
                onClick={() => updateFilter("price", currentFilters.price!)}
                className="flex items-center gap-1 px-2 py-1 bg-black text-white text-xs rounded-full"
              >
                {currentFilters.price}
                <span className="ml-1 text-gray-300">×</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
