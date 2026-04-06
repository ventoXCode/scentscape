"use client";

import { useRouter, usePathname } from "next/navigation";
import { CONCENTRATION_DESCRIPTIONS, FAMILY_DESCRIPTIONS } from "@/lib/fragrance/glossary";

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
  facets?: Record<string, Record<string, number>>;
}

export function ProductFilters({ currentFilters, facets }: ProductFiltersProps) {
  // Build dynamic options from facets when available, fallback to hardcoded
  const familyOptions: FilterOption[] = facets?.family
    ? Object.entries(facets.family)
        .sort(([, a], [, b]) => b - a)
        .map(([value]) => ({ label: value, value }))
    : FAMILY_OPTIONS;

  const concentrationOptions: FilterOption[] = facets?.concentration
    ? Object.entries(facets.concentration)
        .sort(([, a], [, b]) => b - a)
        .map(([value]) => ({ label: value, value }))
    : CONCENTRATION_OPTIONS;

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
            className="text-sm text-text-muted underline hover:text-text-primary"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Family */}
      <div>
        <h3 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wider">
          Scent Family
        </h3>
        <div className="space-y-2">
          {familyOptions.map((option) => {
            const count = facets?.family?.[option.value];
            const tooltip = FAMILY_DESCRIPTIONS[option.value];
            return (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer group/filter relative"
              >
                <input
                  type="radio"
                  name="family"
                  value={option.value}
                  checked={currentFilters.family === option.value}
                  onChange={() => updateFilter("family", option.value)}
                  className="rounded border-border-default text-text-primary focus:ring-border-focus"
                />
                <span className="text-sm text-text-secondary group-hover/filter:text-text-primary flex-1">
                  {option.label}
                </span>
                {tooltip && (
                  <span className="relative group/tip">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-border-default text-[10px] text-text-muted cursor-help" aria-label={tooltip}>?</span>
                    <span className="absolute bottom-full right-0 mb-1.5 opacity-0 group-hover/tip:opacity-100 pointer-events-none transition-opacity duration-200 bg-text-primary text-text-inverse text-xs rounded-lg px-3 py-2 w-52 text-left z-10 shadow-elevated" role="tooltip">
                      {tooltip}
                    </span>
                  </span>
                )}
                {count != null && (
                  <span className="text-xs text-text-muted">{count}</span>
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* Concentration */}
      <div>
        <h3 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wider">
          Concentration
        </h3>
        <div className="space-y-2">
          {concentrationOptions.map((option) => {
            const count = facets?.concentration?.[option.value];
            const tooltip = CONCENTRATION_DESCRIPTIONS[option.value];
            return (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer group/filter relative"
              >
                <input
                  type="radio"
                  name="concentration"
                  value={option.value}
                  checked={currentFilters.concentration === option.value}
                  onChange={() => updateFilter("concentration", option.value)}
                  className="rounded border-border-default text-text-primary focus:ring-border-focus"
                />
                <span className="text-sm text-text-secondary group-hover/filter:text-text-primary flex-1">
                  {option.label}
                </span>
                {tooltip && (
                  <span className="relative group/tip">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-border-default text-[10px] text-text-muted cursor-help" aria-label={tooltip}>?</span>
                    <span className="absolute bottom-full right-0 mb-1.5 opacity-0 group-hover/tip:opacity-100 pointer-events-none transition-opacity duration-200 bg-text-primary text-text-inverse text-xs rounded-lg px-3 py-2 w-52 text-left z-10 shadow-elevated" role="tooltip">
                      {tooltip}
                    </span>
                  </span>
                )}
                {count != null && (
                  <span className="text-xs text-text-muted">{count}</span>
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wider">
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
                className="rounded border-border-default text-text-primary focus:ring-border-focus"
              />
              <span className="text-sm text-text-secondary group-hover:text-text-primary">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Active filter chips */}
      {hasFilters && (
        <div className="pt-2 border-t border-border-default">
          <p className="text-xs text-text-muted mb-2">Active filters:</p>
          <div className="flex flex-wrap gap-2">
            {currentFilters.family && (
              <button
                onClick={() => updateFilter("family", currentFilters.family!)}
                className="flex items-center gap-1 px-2 py-1 bg-text-primary text-text-inverse text-xs rounded-full"
              >
                {currentFilters.family}
                <span className="ml-1 text-border-strong">×</span>
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
                className="flex items-center gap-1 px-2 py-1 bg-text-primary text-text-inverse text-xs rounded-full"
              >
                {currentFilters.concentration}
                <span className="ml-1 text-border-strong">×</span>
              </button>
            )}
            {currentFilters.price && (
              <button
                onClick={() => updateFilter("price", currentFilters.price!)}
                className="flex items-center gap-1 px-2 py-1 bg-text-primary text-text-inverse text-xs rounded-full"
              >
                {currentFilters.price}
                <span className="ml-1 text-border-strong">×</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
