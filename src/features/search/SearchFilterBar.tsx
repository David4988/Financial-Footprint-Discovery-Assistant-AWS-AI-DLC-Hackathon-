import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { FilterState } from '@/utils/filterItems';
import type { FinancialCategory } from '@/types';

interface SearchFilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalResults: number;
}

const categoryOptions: { value: FinancialCategory; label: string }[] = [
  { value: 'recurring', label: 'Recurring' },
  { value: 'loan', label: 'Loans' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'investment', label: 'Investments' },
  { value: 'attention', label: 'Attention' },
];

const confidenceOptions = [
  { value: 'all' as const, label: 'All' },
  { value: 'high' as const, label: 'High' },
  { value: 'medium' as const, label: 'Medium' },
  { value: 'low' as const, label: 'Low' },
];

const sortOptions = [
  { value: 'confidence-desc' as const, label: 'Confidence' },
  { value: 'amount-desc' as const, label: 'Amount' },
  { value: 'alphabetical' as const, label: 'A–Z' },
];

export function SearchFilterBar({ filters, onChange, totalResults }: SearchFilterBarProps) {
  const toggleCategory = (cat: FinancialCategory) => {
    const current = filters.categories;
    const next = current.includes(cat)
      ? current.filter((c) => c !== cat)
      : [...current, cat];
    onChange({ ...filters, categories: next });
  };

  return (
    <div className="space-y-4" data-testid="search-filter-bar">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name..."
          value={filters.searchQuery}
          onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
          className="pl-10"
          data-testid="search-input"
        />
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Category chips */}
        <div className="flex flex-wrap gap-1.5">
          {categoryOptions.map((opt) => (
            <Button
              key={opt.value}
              variant={filters.categories.includes(opt.value) ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleCategory(opt.value)}
              className={cn('h-7 text-xs')}
              data-testid={`filter-category-${opt.value}`}
            >
              {opt.label}
            </Button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Confidence */}
          <select
            value={filters.confidenceLevel}
            onChange={(e) => onChange({ ...filters, confidenceLevel: e.target.value as FilterState['confidenceLevel'] })}
            className="h-8 rounded-md border border-border bg-background px-2 text-xs"
            data-testid="filter-confidence"
          >
            {confidenceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} confidence
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
            className="h-8 rounded-md border border-border bg-background px-2 text-xs"
            data-testid="filter-sort"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                Sort: {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground">
        {totalResults} {totalResults === 1 ? 'item' : 'items'} found
      </p>
    </div>
  );
}
