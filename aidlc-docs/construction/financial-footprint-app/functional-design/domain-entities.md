# Domain Entities — Financial Footprint Discovery Assistant

## TypeScript Interface Definitions

### FinancialFootprint (Top-level response)

```typescript
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
```

### Overview

```typescript
export interface Overview {
  totalItemsDetected: number;
  totalRecurringMonthlySpend: number;
  totalLoans: number;
  totalInsurance: number;
  totalInvestments: number;
  totalAttentionItems: number;
  currency: string; // e.g., "INR", "USD"
}
```

### RecurringExpense

```typescript
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
```

### Loan

```typescript
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
```

### Insurance

```typescript
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
```

### Investment

```typescript
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
```

### AttentionItem

```typescript
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
```

## Entity Relationships

```
FinancialFootprint
├── executiveSummary (string)
├── overview (Overview)
├── recurringExpenses[] (RecurringExpense)
├── loans[] (Loan)
├── insurance[] (Insurance)
├── investments[] (Investment)
├── attentionItems[] (AttentionItem)
├── analyzedDocuments (number)
└── analyzedAt (string)
```

All entities share a common pattern:
- `id`: Unique identifier
- `name`: Human-readable name
- `confidence`: 0-100 percentage score
- `sourceDocument`: Reference to originating file
- `detectedOn`: ISO 8601 date of detection

## Confidence Score Display Rules

| Range | Level | Badge Color | Label |
|---|---|---|---|
| 80-100 | High | Green (#22C55E) | "High Confidence" |
| 50-79 | Medium | Amber (#F59E0B) | "Medium Confidence" |
| 0-49 | Low | Red (#EF4444) | "Low Confidence" |

## Category Union Type (for filtering)

```typescript
export type FinancialCategory = 
  | 'recurring' 
  | 'loan' 
  | 'insurance' 
  | 'investment' 
  | 'attention';

export interface FinancialItem {
  id: string;
  name: string;
  amount: number | null;
  confidence: number;
  sourceDocument: string;
  category: FinancialCategory;
}
```

This union type is used internally for the search/filter feature to flatten all items into a single filterable list.
