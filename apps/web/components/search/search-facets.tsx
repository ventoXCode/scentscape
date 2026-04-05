"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface FacetDistribution {
  [facetName: string]: {
    [value: string]: number;
  };
}

interface SearchFacetsProps {
  facetDistribution: FacetDistribution | undefined;
  currentFilters: {
    q?: string;
    family?: string;
    concentration?: string;
    gender?: string;
    accords?: string;
    season?: string;
  };
}

const FACET_LABELS: Record<string, string> = {
  family: "Scent Family",
  concentration: "Concentration",
  gender: "Gender",
  accords: "Accords",
  season: "Season",
};

export function SearchFacets({
  facetDistribution,
  currentFilters,
}: SearchFacetsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleFilter = useCallback(
    (facet: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const current = params.get(facet);

      if (current === value) {
        params.delete(facet);
      } else {
        params.set(facet, value);
      }

      router.push(`/search?${params.toString()}`);
    },
    [router, searchParams],
  );

  const clearAllFilters = () => {
    const params = new URLSearchParams();
    if (currentFilters.q) params.set("q", currentFilters.q);
    router.push(`/search?${params.toString()}`);
  };

  const hasActiveFilters =
    currentFilters.family ||
    currentFilters.concentration ||
    currentFilters.gender ||
    currentFilters.accords ||
    currentFilters.season;

  const facetKeys = Object.keys(FACET_LABELS);

  return (
    <div className="space-y-6">
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="text-sm text-text-muted underline hover:text-text-primary transition-colors"
        >
          Clear all filters
        </button>
      )}

      {facetKeys.map((facetKey) => {
        const distribution = facetDistribution?.[facetKey];
        if (!distribution || Object.keys(distribution).length === 0)
          return null;

        const currentValue =
          currentFilters[facetKey as keyof typeof currentFilters];

        return (
          <fieldset key={facetKey}>
            <legend className="font-medium text-sm mb-3 uppercase tracking-wider text-text-secondary">
              {FACET_LABELS[facetKey]}
            </legend>
            <div className="space-y-2" role="radiogroup">
              {Object.entries(distribution)
                .sort((a, b) => b[1] - a[1])
                .map(([value, count]) => {
                  const isSelected = currentValue === value;
                  return (
                    <label
                      key={value}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name={facetKey}
                        checked={isSelected}
                        onChange={() => toggleFilter(facetKey, value)}
                        className="w-4 h-4 border-border-default accent-accent-primary cursor-pointer"
                      />
                      <span className="text-sm text-text-secondary group-hover:text-text-primary flex-1">
                        {value}
                      </span>
                      <span className="text-xs text-text-muted">{count}</span>
                    </label>
                  );
                })}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}
