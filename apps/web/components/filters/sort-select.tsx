"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface SortOption {
  label: string;
  value: string;
}

const SORT_OPTIONS: SortOption[] = [
  { label: "Relevance", value: "" },
  { label: "Price: Low to High", value: "price:asc" },
  { label: "Price: High to Low", value: "price:desc" },
  { label: "Longest Lasting", value: "longevity:desc" },
  { label: "Strongest Sillage", value: "sillage:desc" },
  { label: "Best for Beginners", value: "sillage:asc" },
];

interface SortSelectProps {
  basePath: string;
  currentSort?: string;
}

export function SortSelect({ basePath, currentSort }: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    const value = e.target.value;

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    // Reset to page 1 when sort changes
    params.delete("page");

    const qs = params.toString();
    router.push(`${basePath}${qs ? `?${qs}` : ""}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-sm text-text-muted whitespace-nowrap">
        Sort by
      </label>
      <select
        id="sort-select"
        value={currentSort || ""}
        onChange={handleChange}
        className="text-sm border border-border-default rounded-lg px-3 py-1.5 bg-surface-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
