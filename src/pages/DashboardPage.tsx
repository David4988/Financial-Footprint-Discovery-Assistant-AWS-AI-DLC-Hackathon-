import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Repeat, Landmark, Shield, TrendingUp } from 'lucide-react';
import { Container } from '@/components/layout';
import { useAnalysisResult } from '@/hooks/useAnalysisResult';
import {
  ExecutiveSummary,
  OverviewCards,
  AttentionCard,
  CategorySection,
} from '@/features/dashboard';
import { SearchFilterBar } from '@/features/search';
import { AIAssistant } from '@/features/assistant';
import { flattenItems, applyFilters, defaultFilterState, type FilterState } from '@/utils/filterItems';
import type { FinancialItem } from '@/types';

export function DashboardPage() {
  const navigate = useNavigate();
  const { result } = useAnalysisResult();
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);

  useEffect(() => {
    if (!result) {
      navigate('/upload', { replace: true });
    }
  }, [result, navigate]);

  if (!result) return null;

  const hasActiveFilters = filters.searchQuery.trim() !== '' ||
    filters.categories.length > 0 ||
    filters.confidenceLevel !== 'all';

  // Memoize filtered items
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const allItems = useMemo(() => flattenItems(result), [result]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filteredItems = useMemo(() => applyFilters(allItems, filters), [allItems, filters]);

  // Group filtered items by category for display
  const groupedFiltered = (category: FinancialItem['category']) =>
    filteredItems.filter((item) => item.category === category);

  // Map domain entities to CategorySection-compatible items (unfiltered)
  const recurringItems = result.recurringExpenses.map((e) => ({
    id: e.id, name: e.name, amount: e.amount, confidence: e.confidence,
    sourceDocument: e.sourceDocument, subtitle: `${e.frequency} · ${e.category}`,
  }));
  const loanItems = result.loans.map((l) => ({
    id: l.id, name: l.name, amount: l.emiAmount, confidence: l.confidence,
    sourceDocument: l.sourceDocument, subtitle: [l.loanType, l.tenure].filter(Boolean).join(' · '),
  }));
  const insuranceItems = result.insurance.map((i) => ({
    id: i.id, name: i.name, amount: i.premiumAmount, confidence: i.confidence,
    sourceDocument: i.sourceDocument, subtitle: `${i.frequency} · ${i.insuranceType}`,
  }));
  const investmentItems = result.investments.map((inv) => ({
    id: inv.id, name: inv.name, amount: inv.amount, confidence: inv.confidence,
    sourceDocument: inv.sourceDocument, subtitle: [inv.investmentType, inv.frequency].filter(Boolean).join(' · '),
  }));

  // When filters are active, show filtered flat list; otherwise show grouped categories
  const filteredRecurring = hasActiveFilters
    ? groupedFiltered('recurring').map((i) => ({ id: i.id, name: i.name, amount: i.amount, confidence: i.confidence, sourceDocument: i.sourceDocument }))
    : recurringItems;
  const filteredLoans = hasActiveFilters
    ? groupedFiltered('loan').map((i) => ({ id: i.id, name: i.name, amount: i.amount, confidence: i.confidence, sourceDocument: i.sourceDocument }))
    : loanItems;
  const filteredInsurance = hasActiveFilters
    ? groupedFiltered('insurance').map((i) => ({ id: i.id, name: i.name, amount: i.amount, confidence: i.confidence, sourceDocument: i.sourceDocument }))
    : insuranceItems;
  const filteredInvestments = hasActiveFilters
    ? groupedFiltered('investment').map((i) => ({ id: i.id, name: i.name, amount: i.amount, confidence: i.confidence, sourceDocument: i.sourceDocument }))
    : investmentItems;

  return (
    <Container>
      <div className="space-y-8">
        {/* 1. Executive Summary (Hero) */}
        <ExecutiveSummary summary={result.executiveSummary} />

        {/* 2. Overview Cards */}
        <OverviewCards overview={result.overview} />

        {/* 3. Needs Attention */}
        {result.attentionItems.length > 0 && !hasActiveFilters && (
          <section data-testid="attention-section">
            <h3 className="mb-3 text-base font-semibold text-foreground">
              ⚠️ Needs Attention ({result.attentionItems.length})
            </h3>
            <div className="space-y-2">
              {result.attentionItems.map((item) => (
                <AttentionCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* 4. Search & Filters */}
        <SearchFilterBar
          filters={filters}
          onChange={setFilters}
          totalResults={hasActiveFilters ? filteredItems.length : allItems.length}
        />

        {/* 5. Financial Categories */}
        <div className="space-y-8">
          <CategorySection
            title="Recurring Expenses"
            icon={<Repeat className="h-5 w-5 text-blue-600" />}
            items={filteredRecurring}
            currency={result.overview.currency}
          />
          <CategorySection
            title="Loans & EMIs"
            icon={<Landmark className="h-5 w-5 text-orange-600" />}
            items={filteredLoans}
            currency={result.overview.currency}
          />
          <CategorySection
            title="Insurance"
            icon={<Shield className="h-5 w-5 text-emerald-600" />}
            items={filteredInsurance}
            currency={result.overview.currency}
          />
          <CategorySection
            title="Investments"
            icon={<TrendingUp className="h-5 w-5 text-violet-600" />}
            items={filteredInvestments}
            currency={result.overview.currency}
          />

          {hasActiveFilters && filteredItems.length === 0 && (
            <div className="rounded-lg border border-dashed border-border p-8 text-center">
              <p className="text-sm text-muted-foreground">No items match your filters.</p>
            </div>
          )}
        </div>

        {/* 6. AI Assistant (supporting role) */}
        <AIAssistant result={result} />
      </div>
    </Container>
  );
}
