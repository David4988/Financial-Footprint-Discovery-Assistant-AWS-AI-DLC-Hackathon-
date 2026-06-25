# Financial Footprint Discovery Assistant

> Helping families uncover the full financial picture of a loved one through AI-powered document analysis.

Built for the **AWS AI-DLC Hackathon** — a production-like MVP that surfaces evidence of financial obligations from uploaded documents, presenting findings with confidence levels to empower informed decisions.

---

## The Problem

When a loved one passes away or becomes incapacitated, surviving family members face an overwhelming challenge: understanding the full scope of that person's financial obligations. Bank statements, credit card bills, insurance policies, and investment accounts are scattered across institutions. Without a clear picture, families risk missing critical payments, losing insurance coverage, or overlooking valuable assets.

## The Solution

The Financial Footprint Discovery Assistant analyzes uploaded financial documents and surfaces evidence of:

- **Recurring Expenses** — subscriptions, utilities, memberships
- **Loans & EMIs** — home loans, personal loans, vehicle financing
- **Insurance Premiums** — life, health, vehicle, home coverage
- **Investments** — SIPs, mutual funds, fixed deposits, equity
- **Attention Items** — unusual charges, missed payments, expiring policies

Each detected item includes a confidence score (0–100%), source document reference, and category classification. The application surfaces evidence — it does not claim certainty.

---

## Demo Flow

```
Home → Upload Documents → Processing → Results Reveal → Financial Footprint Dashboard → Analytics
```

1. **Upload** — Drag-and-drop up to 5 PDF documents (10 MB each)
2. **Processing** — Multi-step progress indicator (Upload → Extract → Analyze → Build → Complete)
3. **Reveal** — "Financial Footprint Generated" confirmation with findings count
4. **Dashboard** — Executive summary, overview cards, categorized findings, search/filter, AI assistant
5. **Analytics** — Placeholder cards for future QuickSight integration

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript (strict) |
| Build | Vite 8 |
| Styling | TailwindCSS 4 |
| Routing | React Router 7 |
| Icons | Lucide React |
| Utilities | clsx, tailwind-merge, class-variance-authority |
| Linting | Oxlint |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
git clone https://github.com/your-username/Financial-Footprint-Discovery-Assistant-AWS-AI-DLC-Hackathon-.git
cd Financial-Footprint-Discovery-Assistant-AWS-AI-DLC-Hackathon-
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Build

```bash
npm run build
```

Output goes to `dist/`.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```
src/
├── components/          # Shared UI components
│   ├── ui/              # Primitives (Button, Card, Badge, Input, etc.)
│   ├── layout/          # App shell, Header, Footer, Container
│   └── feedback/        # Toast, ErrorBoundary, Skeleton
├── pages/               # Route-level page components
│   ├── HomePage.tsx
│   ├── UploadPage.tsx
│   ├── ProcessingPage.tsx
│   ├── RevealPage.tsx
│   ├── DashboardPage.tsx
│   ├── AnalyticsPage.tsx
│   └── NotFoundPage.tsx
├── features/            # Self-contained feature modules
│   ├── upload/          # Drag-drop, file picker, validation
│   ├── processing/      # Multi-step progress indicator
│   ├── dashboard/       # Overview cards, categories, executive summary
│   ├── search/          # Search bar, filters, sorting
│   ├── assistant/       # Inline AI chat interface
│   └── analytics/       # Placeholder analytics cards
├── services/            # Backend abstraction layer
│   ├── analyzer.ts      # Public API — ONLY integration point
│   └── mockAnalyzer.ts  # Mock implementation (hackathon)
├── hooks/               # Shared custom hooks
├── types/               # Domain TypeScript interfaces
│   └── financial.ts     # FinancialFootprint, Loan, Insurance, etc.
├── mock/                # Mock data (JSON)
├── utils/               # Pure utility functions
├── lib/                 # Third-party utility wrappers
├── App.tsx              # Router + providers
├── main.tsx             # Entry point
└── index.css            # Tailwind imports + global styles
```

---

## Architecture

### Backend Independence (Key Design Decision)

The frontend is fully decoupled from any backend implementation. A single service abstraction layer acts as the firewall:

```typescript
// services/analyzer.ts — THE ONLY INTEGRATION POINT
export async function analyzeDocuments(files: File[]): Promise<FinancialFootprint> {
  return mockAnalyzer(files); // Current: mock data
  // Future: POST /api/analyze with multipart form data
}
```

**Rules enforced throughout the codebase:**
- No React component imports mock data directly
- No component knows whether data is mocked or real
- No AWS SDK, Bedrock, Textract, or Lambda references outside the service layer
- Replacing `mockAnalyzer()` with a real API call requires changing **only** `services/analyzer.ts`

### Backend Contract

When the AWS backend is connected:

```
POST /api/analyze
Content-Type: multipart/form-data
Body: { documents: File[] }
Response: FinancialFootprint (JSON)
```

The backend pipeline: **Upload → OCR (Textract) → AI Extraction (Bedrock) → Normalization → Response**

### State Management

- **File state** — local component state in UploadPage
- **Analysis results** — React Context (`AnalysisProvider`) shared across pages
- **No global state library** — React Context + local state sufficient for MVP

---

## Domain Model

Core TypeScript interfaces in `src/types/financial.ts`:

| Interface | Description |
|-----------|-------------|
| `FinancialFootprint` | Top-level response with all analysis results |
| `Overview` | Summary statistics (counts, totals, currency) |
| `RecurringExpense` | Regular charges with frequency and category |
| `Loan` | Loan repayments with EMI, tenure, outstanding amount |
| `Insurance` | Premium payments with type and frequency |
| `Investment` | Investment transactions with type (SIP, FD, equity, etc.) |
| `AttentionItem` | Items requiring human review with severity levels |

### Confidence Scoring

Every detected item carries a confidence score (0–100%):

| Score | Level | Color |
|-------|-------|-------|
| ≥ 80% | High | Green |
| 50–79% | Medium | Amber |
| < 50% | Low | Red |

---

## Features

### Document Upload
- Drag-and-drop or file picker
- Client-side validation (PDF only, ≤10 MB, max 5 files)
- Visual feedback for errors and upload progress

### Processing Indicator
- Multi-step progress visualization
- No fake percentages — step transitions on completion

### Financial Footprint Dashboard
- Executive summary (hero panel)
- Overview cards with key metrics
- Categorized findings with confidence badges
- "Needs Attention" section for high-priority items

### Search & Filtering
- Text search across all findings
- Category, amount range, and confidence filters
- Sort by amount, confidence, or alphabetically

### AI Assistant (Mocked)
- Inline chat interface on the dashboard
- Pre-defined responses based on analysis data
- Designed for future Bedrock AgentCore integration

### Analytics
- Placeholder cards for monthly spend, category distribution
- Future integration point for Amazon QuickSight

---

## AWS Integration Roadmap

The application is designed for seamless AWS backend integration:

| Service | Purpose |
|---------|---------|
| Amazon Textract | OCR extraction from uploaded PDFs |
| Amazon Bedrock | AI-powered financial entity extraction and summarization |
| Bedrock AgentCore | Conversational AI assistant |
| AWS Lambda | Serverless document processing pipeline |
| Amazon S3 | Document storage |
| Amazon QuickSight | Analytics dashboards (future) |

**Integration requires changing only `services/analyzer.ts`** — no UI components need modification.

---

## Development Methodology

This project was built using the **AI-DLC (AI-Driven Development Life Cycle)** methodology:

1. **Inception** — Requirements analysis, application design, workflow planning
2. **Construction** — Functional design, code generation, build and test

Design artifacts are documented in `aidlc-docs/` for full traceability of architectural decisions.

---

## License

This project was created for the AWS AI-DLC Hackathon.

---

## Team

Built with ❤️ using AI-DLC methodology and AWS AI services.
