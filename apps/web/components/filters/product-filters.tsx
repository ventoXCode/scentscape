"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  CONCENTRATION_DESCRIPTIONS,
  FAMILY_DESCRIPTIONS,
  GENDER_DESCRIPTIONS,
  SEASON_DESCRIPTIONS,
  ACCORD_DESCRIPTIONS,
} from "@/lib/fragrance/glossary";

interface FilterOption {
  label: string;
  value: string;
}

const FAMILY_OPTIONS: FilterOption[] = [
  { label: "Fresh", value: "Fresh" },
  { label: "Floral", value: "Floral" },
  { label: "Amber", value: "Amber" },
  { label: "Woody", value: "Woody" },
  { label: "Citrus", value: "Citrus" },
  { label: "Aromatic", value: "Aromatic" },
];

import { getFamilyByName } from "@/lib/fragrance/family-config";

const CONCENTRATION_OPTIONS: FilterOption[] = [
  { label: "EDC", value: "EDC" },
  { label: "EDT", value: "EDT" },
  { label: "EDP", value: "EDP" },
  { label: "Parfum", value: "Parfum" },
  { label: "Extrait", value: "Extrait" },
];

const GENDER_OPTIONS: FilterOption[] = [
  { label: "Masculine", value: "Masculine" },
  { label: "Feminine", value: "Feminine" },
  { label: "Unisex", value: "Unisex" },
];

const SEASON_OPTIONS: FilterOption[] = [
  { label: "Spring", value: "Spring" },
  { label: "Summer", value: "Summer" },
  { label: "Fall", value: "Fall" },
  { label: "Winter", value: "Winter" },
];

const SEASON_ICONS: Record<string, string> = {
  Spring: "🌸",
  Summer: "☀️",
  Fall: "🍂",
  Winter: "❄️",
};

const GENDER_ICONS: Record<string, string> = {
  Masculine: "♂",
  Feminine: "♀",
  Unisex: "⚤",
};

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
    gender?: string;
    accords?: string;
    season?: string;
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

  const genderOptions: FilterOption[] = facets?.gender
    ? Object.entries(facets.gender)
        .sort(([, a], [, b]) => b - a)
        .map(([value]) => ({ label: value, value }))
    : GENDER_OPTIONS;

  const accordOptions: FilterOption[] = facets?.accords
    ? Object.entries(facets.accords)
        .sort(([, a], [, b]) => b - a)
        .map(([value]) => ({ label: value, value }))
    : [];

  const seasonOptions: FilterOption[] = facets?.season
    ? Object.entries(facets.season)
        .sort(([, a], [, b]) => b - a)
        .map(([value]) => ({ label: value, value }))
    : SEASON_OPTIONS;

  const router = useRouter();
  const pathname = usePathname();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams();

    // Carry over existing filters
    const filterKeys = ["family", "concentration", "gender", "accords", "season", "price"] as const;
    for (const k of filterKeys) {
      if (currentFilters[k]) params.set(k, currentFilters[k]!);
    }

    // Toggle: if the same value is selected, remove it; otherwise set it
    const current = currentFilters[key as keyof typeof currentFilters];
    if (current === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // Reset to page 1 when filters change
    params.delete("page");

    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`);
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  const hasFilters =
    currentFilters.family ||
    currentFilters.concentration ||
    currentFilters.gender ||
    currentFilters.accords ||
    currentFilters.season ||
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
                {getFamilyByName(option.value) && (
                  <span className={`w-3 h-3 rounded-full ${getFamilyByName(option.value)!.classes.bg} shrink-0`} aria-hidden="true" />
                )}
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

      {/* Gender */}
      <div>
        <h3 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wider">
          Gender
        </h3>
        <div className="space-y-2">
          {genderOptions.map((option) => {
            const count = facets?.gender?.[option.value];
            const tooltip = GENDER_DESCRIPTIONS[option.value];
            const icon = GENDER_ICONS[option.value];
            return (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer group/filter relative"
              >
                <input
                  type="radio"
                  name="gender"
                  value={option.value}
                  checked={currentFilters.gender === option.value}
                  onChange={() => updateFilter("gender", option.value)}
                  className="rounded border-border-default text-text-primary focus:ring-border-focus"
                />
                {icon && (
                  <span className="text-sm text-text-muted shrink-0" aria-hidden="true">{icon}</span>
                )}
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

      {/* Season */}
      <div>
        <h3 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wider">
          Season
        </h3>
        <div className="space-y-2">
          {seasonOptions.map((option) => {
            const count = facets?.season?.[option.value];
            const tooltip = SEASON_DESCRIPTIONS[option.value];
            const icon = SEASON_ICONS[option.value];
            return (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer group/filter relative"
              >
                <input
                  type="radio"
                  name="season"
                  value={option.value}
                  checked={currentFilters.season === option.value}
                  onChange={() => updateFilter("season", option.value)}
                  className="rounded border-border-default text-text-primary focus:ring-border-focus"
                />
                {icon && (
                  <span className="text-sm shrink-0" aria-hidden="true">{icon}</span>
                )}
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

      {/* Accords */}
      {accordOptions.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-text-secondary mb-3 uppercase tracking-wider">
            Accords
          </h3>
          <div className="space-y-2">
            {accordOptions.map((option) => {
              const count = facets?.accords?.[option.value];
              const tooltip = ACCORD_DESCRIPTIONS[option.value];
              return (
                <label
                  key={option.value}
                  className="flex items-center gap-2 cursor-pointer group/filter relative"
                >
                  <input
                    type="radio"
                    name="accords"
                    value={option.value}
                    checked={currentFilters.accords === option.value}
                    onChange={() => updateFilter("accords", option.value)}
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
      )}

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
            {currentFilters.gender && (
              <button
                onClick={() => updateFilter("gender", currentFilters.gender!)}
                className="flex items-center gap-1 px-2 py-1 bg-text-primary text-text-inverse text-xs rounded-full"
              >
                {currentFilters.gender}
                <span className="ml-1 text-border-strong">×</span>
              </button>
            )}
            {currentFilters.season && (
              <button
                onClick={() => updateFilter("season", currentFilters.season!)}
                className="flex items-center gap-1 px-2 py-1 bg-text-primary text-text-inverse text-xs rounded-full"
              >
                {currentFilters.season}
                <span className="ml-1 text-border-strong">×</span>
              </button>
            )}
            {currentFilters.accords && (
              <button
                onClick={() => updateFilter("accords", currentFilters.accords!)}
                className="flex items-center gap-1 px-2 py-1 bg-text-primary text-text-inverse text-xs rounded-full"
              >
                {currentFilters.accords}
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
