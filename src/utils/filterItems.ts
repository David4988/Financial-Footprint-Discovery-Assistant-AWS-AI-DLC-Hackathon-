import type { FinancialFootprint, FinancialItem, FinancialCategory } from '@/types';

export interface FilterState {
  searchQuery: string;
  categories: FinancialCategory[];
  confidenceLevel: 'all' | 'high' | 'medium' | 'low';
  sortBy: 'amount-desc' | 'confidence-desc' | 'alphabetical';
}

export const defaultFilterState: FilterState = {
  searchQuery: '',
  categories: [],
  confidenceLevel: 'all',
  sortBy: 'confidence-desc',
};

/**
 * Flatten all financial items from the footprint into a unified list for filtering.
 */
export function flattenItems(result: FinancialFootprint): FinancialItem[] {
  const items: FinancialItem[] = [];

  for (const e of result.recurringExpenses) {
    items.push({ id: e.id, name: e.name, amount: e.amount, confidence: e.confidence, sourceDocument: e.sourceDocument, category: 'recurring' });
  }
  for (const l of result.loans) {
    items.push({ id: l.id, name: l.name, amount: l.emiAmount, confidence: l.confidence, sourceDocument: l.sourceDocument, category: 'loan' });
  }
  for (const i of result.insurance) {
    items.push({ id: i.id, name: i.name, amount: i.premiumAmount, confidence: i.confidence, sourceDocument: i.sourceDocument, category: 'insurance' });
  }
  for (const inv of result.investments) {
    items.push({ id: inv.id, name: inv.name, amount: inv.amount, confidence: inv.confidence, sourceDocument: inv.sourceDocument, category: 'investment' });
  }
  for (const att of result.attentionItems) {
    items.push({ id: att.id, name: att.name, amount: att.relatedAmount, confidence: att.confidence, sourceDocument: att.sourceDocument, category: 'attention', description: att.description });
  }

  return items;
}

/**
 * Apply filters and sorting to a flat list of financial items.
 */
export function applyFilters(items: FinancialItem[], filters: FilterState): FinancialItem[] {
  let filtered = [...items];

  // Text search
  if (filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        (item.description?.toLowerCase().includes(query) ?? false)
    );
  }

  // Category filter
  if (filters.categories.length > 0) {
    filtered = filtered.filter((item) => filters.categories.includes(item.category));
  }

  // Confidence filter
  if (filters.confidenceLevel !== 'all') {
    filtered = filtered.filter((item) => {
      if (filters.confidenceLevel === 'high') return item.confidence >= 80;
      if (filters.confidenceLevel === 'medium') return item.confidence >= 50 && item.confidence < 80;
      return item.confidence < 50;
    });
  }

  // Sort
  filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case 'amount-desc':
        return (b.amount ?? 0) - (a.amount ?? 0);
      case 'confidence-desc':
        return b.confidence - a.confidence;
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return filtered;
}
