/**
 * Domain Type Definitions — Financial Footprint Discovery Assistant
 *
 * These interfaces represent the core business entities returned by the
 * analyzer service. Every UI component consumes ONLY these types.
 *
 * The frontend never references AWS SDKs, Bedrock, Textract, Lambda, or
 * mock JSON directly. Only services/analyzer.ts knows data origin.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Top-level Response
// ─────────────────────────────────────────────────────────────────────────────

export interface FinancialFootprint {
  executiveSummary: string;
  overview: Overview;
  recurringExpenses: RecurringExpense[];
  loans: Loan[];
  insurance: Insurance[];
  investments: Investment[];
  attentionItems: AttentionItem[];
  analyzedDocuments: number;
  analyzedAt: string; // ISO 8601 timestamp
}

// ─────────────────────────────────────────────────────────────────────────────
// Overview (Summary Statistics)
// ─────────────────────────────────────────────────────────────────────────────

export interface Overview {
  totalItemsDetected: number;
  totalRecurringMonthlySpend: number;
  totalLoans: number;
  totalInsurance: number;
  totalInvestments: number;
  totalAttentionItems: number;
  currency: string; // e.g., "INR", "USD"
}

// ─────────────────────────────────────────────────────────────────────────────
// Financial Entities
// ─────────────────────────────────────────────────────────────────────────────

export interface RecurringExpense {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'annual';
  category: 'subscription' | 'utility' | 'membership' | 'service' | 'other';
  confidence: number; // 0-100
  sourceDocument: string;
  detectedOn: string; // ISO 8601 date
}

export interface Loan {
  id: string;
  name: string;
  emiAmount: number;
  outstandingAmount: number | null;
  tenure: string | null; // e.g., "15 years", "36 months"
  loanType: 'home' | 'vehicle' | 'personal' | 'education' | 'business' | 'other';
  confidence: number; // 0-100
  sourceDocument: string;
  detectedOn: string;
}

export interface Insurance {
  id: string;
  name: string;
  premiumAmount: number;
  frequency: 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
  insuranceType: 'life' | 'health' | 'vehicle' | 'home' | 'travel' | 'other';
  confidence: number; // 0-100
  sourceDocument: string;
  detectedOn: string;
}

export interface Investment {
  id: string;
  name: string;
  amount: number;
  investmentType: 'sip' | 'mutual-fund' | 'fixed-deposit' | 'equity' | 'ppf' | 'nps' | 'other';
  frequency: 'one-time' | 'monthly' | 'quarterly' | 'annual' | null;
  confidence: number; // 0-100
  sourceDocument: string;
  detectedOn: string;
}

export interface AttentionItem {
  id: string;
  name: string;
  description: string;
  reason: 'unusual-charge' | 'missed-payment' | 'expiring-policy' | 'high-interest' | 'duplicate' | 'other';
  severity: 'high' | 'medium' | 'low';
  relatedAmount: number | null;
  confidence: number; // 0-100
  sourceDocument: string;
  detectedOn: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility Types (for search/filter feature)
// ─────────────────────────────────────────────────────────────────────────────

export type FinancialCategory =
  | 'recurring'
  | 'loan'
  | 'insurance'
  | 'investment'
  | 'attention';

/**
 * Unified item type used internally for flattening all financial items
 * into a single filterable/sortable list in the search feature.
 */
export interface FinancialItem {
  id: string;
  name: string;
  amount: number | null;
  confidence: number;
  sourceDocument: string;
  category: FinancialCategory;
  description?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Confidence Level Helpers
// ─────────────────────────────────────────────────────────────────────────────

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export function getConfidenceLevel(score: number): ConfidenceLevel {
  if (score >= 80) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
}

export function getConfidenceColor(score: number): string {
  const level = getConfidenceLevel(score);
  switch (level) {
    case 'high':
      return '#22C55E'; // Green
    case 'medium':
      return '#F59E0B'; // Amber
    case 'low':
      return '#EF4444'; // Red
  }
}
