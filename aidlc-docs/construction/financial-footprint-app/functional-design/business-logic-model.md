# Business Logic Model — Financial Footprint Discovery Assistant

## Core Data Flow

```
User selects PDF files (≤5 files, ≤10MB each)
    │
    ├── Client-side validation (type, size, count)
    │   └── Rejection → Error toast + file removed from list
    │
    ├── Valid files stored in local component state
    │
    └── User clicks "Analyze"
            │
            ├── Navigate to ProcessingPage
            │   └── Call analyzeDocuments(files: File[])
            │       └── mockAnalyzer ignores files, returns static JSON
            │       └── (Future: POST /api/analyze with multipart form)
            │
            ├── Simulate processing steps (timed delays in mock mode)
            │   └── Step 1: "Uploading Documents" (800ms)
            │   └── Step 2: "Extracting Text" (1200ms)
            │   └── Step 3: "AI Financial Analysis" (1500ms)
            │   └── Step 4: "Building Financial Footprint" (1000ms)
            │   └── Step 5: "Completed" (500ms)
            │
            ├── Store FinancialFootprint in AnalysisContext
            │
            ├── Navigate to RevealPage
            │   └── Display summary counts from FinancialFootprint
            │   └── User clicks "View Financial Footprint"
            │
            └── Navigate to DashboardPage
                └── Read FinancialFootprint from context
                └── Render executive summary, cards, categories
```

## Service Layer Logic

### analyzeDocuments(files: File[]): Promise<FinancialFootprint>

```typescript
// Current implementation (mock)
export async function analyzeDocuments(files: File[]): Promise<FinancialFootprint> {
  // Simulate network delay
  await delay(500);
  return mockAnalyzer(files);
}

// Future implementation (one-line swap)
export async function analyzeDocuments(files: File[]): Promise<FinancialFootprint> {
  const formData = new FormData();
  files.forEach(file => formData.append('documents', file));
  const response = await fetch('/api/analyze', { method: 'POST', body: formData });
  if (!response.ok) throw new Error('Analysis failed');
  return response.json();
}
```

### mockAnalyzer(files: File[]): FinancialFootprint

- Ignores actual file content (no PDF parsing in frontend)
- Returns pre-defined JSON data from `mock/financialFootprint.json`
- Includes realistic executive summary text
- Includes document metadata referencing uploaded file names

## State Management Logic

### AnalysisContext

```typescript
interface AnalysisState {
  result: FinancialFootprint | null;
  isAnalyzing: boolean;
  error: string | null;
  uploadedFiles: FileInfo[];
}

interface FileInfo {
  name: string;
  size: number;
  uploadedAt: string;
}
```

**Provider behavior**:
- Wraps entire app at router level
- Exposes `setResult()`, `clearResult()`, `setUploads()`
- Persists nothing (single session, no localStorage)
- Clears on new analysis start

## Page Behavior Logic

### HomePage
- Static content, no business logic
- CTA navigates to `/upload`

### UploadPage
- Local state: `selectedFiles: File[]`
- Validation on file add:
  - Reject if not PDF (`application/pdf`)
  - Reject if file > 10MB
  - Reject if total files would exceed 5
  - Show toast with rejection reason
- "Analyze" button enabled only when ≥1 valid file selected
- On Analyze click: store file info in context, navigate to `/processing` with files

### ProcessingPage
- On mount: begin analysis pipeline
- Step progression: timed intervals (mock) or real progress events (future)
- On completion: store result in context, navigate to `/reveal`
- On error: display error with retry button, navigate back to `/upload` on retry

### RevealPage
- Read result from context
- Compute summary: total items = recurring + loans + insurance + investments + attention
- Display: "[total] financial items detected across [file count] documents"
- CTA navigates to `/dashboard`
- If no result in context: redirect to `/upload`

### DashboardPage
- Read result from context
- If no result: redirect to `/upload`
- Render in priority order:
  1. Executive Summary (from `result.executiveSummary`)
  2. Overview Cards (computed from result data)
  3. Needs Attention section (from `result.attentionItems`)
  4. Category sections (recurring, loans, insurance, investments)
  5. Search & filter controls (filter local state)
  6. AI Assistant (inline at bottom)

### AnalyticsPage
- Read result from context
- If no result: redirect to `/upload`
- Compute summary metrics from result data
- Display in placeholder cards

## Search & Filter Logic

```typescript
interface FilterState {
  searchQuery: string;
  categories: Category[];      // Active category filters
  minAmount: number | null;
  maxAmount: number | null;
  confidenceLevel: 'all' | 'high' | 'medium' | 'low';
  sortBy: 'amount-desc' | 'confidence-desc' | 'alphabetical';
}
```

**Filter application**:
1. Flatten all items from all categories into unified list
2. Apply text search (case-insensitive match on name/description)
3. Apply category filter (include only selected categories)
4. Apply amount range filter
5. Apply confidence filter (high ≥80, medium 50-79, low <50)
6. Apply sort
7. Re-group by category for display

## AI Assistant Logic (Mocked)

```typescript
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// Keyword-based response mapping (mock)
const responseMap = {
  'recurring': () => formatRecurringExpenses(result),
  'insurance': () => formatInsuranceItems(result),
  'attention': () => formatAttentionItems(result),
  'loan': () => formatLoanItems(result),
  'investment': () => formatInvestmentItems(result),
  'summary': () => result.executiveSummary,
  // Default fallback for unmatched queries
};
```

- Match user input against keywords
- Return formatted response from analysis data
- No AI/LLM calls in mock mode
- Future: POST to Bedrock AgentCore endpoint
