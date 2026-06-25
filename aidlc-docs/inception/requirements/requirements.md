# Requirements — Financial Footprint Discovery Assistant

## Intent Analysis

- **User Request**: Build a polished, production-like MVP for the AWS AI-DLC Hackathon that helps families understand the financial footprint of a loved one by analyzing uploaded financial documents.
- **Request Type**: New Project (Greenfield)
- **Scope Estimate**: System-wide — Full frontend application with multiple pages, domain layer, service abstraction, mock backend, and AWS integration readiness.
- **Complexity Estimate**: Moderate — Well-defined scope with clear boundaries, but multiple interconnected features and a strict integration contract.

---

## Problem Statement

When a loved one passes away or becomes incapacitated, surviving family members face an overwhelming challenge: understanding the full scope of that person's financial obligations. Bank statements, credit card bills, insurance policies, and investment accounts are scattered across multiple institutions. Without a clear picture, families risk missing critical payments, losing insurance coverage, or overlooking valuable assets.

The Financial Footprint Discovery Assistant helps families quickly surface evidence of financial obligations by analyzing uploaded financial documents. It does not claim certainty — it surfaces evidence and confidence levels, empowering families to take informed action.

## Primary Persona

- **Surviving Spouse** — Needs to understand household financial obligations after a partner's passing
- **Adult Child** — Managing finances for an elderly or deceased parent
- **Estate Executor** — Requires a comprehensive view of financial obligations for estate settlement

These users are typically under emotional stress, time pressure, and may have limited familiarity with the deceased's financial arrangements. The application must be trustworthy, clear, and actionable.

---

## Functional Requirements

### FR-01: Document Upload

The system shall provide a document upload interface supporting:
- Drag-and-drop file upload
- File picker dialog
- Upload of up to 5 PDF documents per analysis session
- Maximum file size of 10 MB per document
- Supported document types: Bank Statements, Credit Card Statements, Insurance Premium Receipts, Loan Statements, Investment Statements
- Client-side validation: file type (PDF only), file size (≤10 MB), file count (≤5)
- Visual feedback for validation errors
- Upload animation during file transfer

### FR-02: Document Processing Feedback

The system shall display a multi-step processing indicator with the following stages:
1. Uploading Documents
2. Extracting Text
3. AI Financial Analysis
4. Building Financial Footprint
5. Completed

No fake percentage progress shall be displayed. Each step transitions upon actual (or simulated) completion.

### FR-03: Results Reveal Screen

After processing completes, the system shall display a brief "Financial Footprint Generated" transition screen before navigating to the dashboard. This improves demo presentation quality and provides a clear moment of completion.

The reveal screen shall display:
- A success confirmation message
- High-level count of findings (e.g., "12 financial items detected across 5 documents")
- A "View Financial Footprint" call-to-action button

### FR-04: Financial Footprint Analysis

The system shall analyze uploaded documents and surface evidence of financial activity:
- **Recurring Expenses**: Evidence of regular monthly/periodic charges (subscriptions, utilities, memberships)
- **Loans & EMIs**: Evidence of recurring loan repayments (EMI amounts, tenure indicators)
- **Insurance Premiums**: Evidence of recurring insurance premium payments (premium amounts, frequency)
- **Investments**: Evidence of investment-related transactions (SIPs, mutual funds, fixed deposits, equity trades)
- **Attention Items**: Financial items requiring human review (unusual charges, expiring policies, missed payments)

Each detected item shall include:
- Name/description
- Amount (if available)
- Confidence score (percentage, 0–100%)
- Source document reference
- Category classification

The application surfaces evidence and confidence — it does not claim certainty about the existence or status of any financial product.

### FR-05: Financial Footprint Dashboard

The system shall display analysis results in a dashboard with the following layout priority:

1. **Executive Summary** (hero position — primary focus of the results page)
2. **Overview Cards**: Total detected financial items, Recurring monthly spend total, Total loans detected, Total insurance detected, Total investments detected, Total attention items
3. **Needs Attention Section**: Prominently displayed items requiring human review
4. **Financial Categories**: Grouped detail sections (Recurring Expenses, Loans & EMIs, Insurance, Investments)
5. **AI Assistant** (inline, supporting role — assists the dashboard, does not compete with it)

Each category section shall display individual items with their metadata (name, amount, confidence, source).

### FR-06: Executive Summary

The Executive Summary shall be the hero element at the top of the dashboard. Example format:
> "We analyzed 4 financial documents and detected evidence of 9 recurring financial obligations, 2 insurance premium payments, 1 home loan EMI and 3 investment-related transactions."

This summary shall be generated from mock data for the hackathon and designed to accept a Bedrock-generated summary in the future.

### FR-07: Search and Filtering

The system shall support:
- **Text search**: Filter items by name/description
- **Category filter**: Filter by financial category (Recurring, Loans, Insurance, Investments, Attention)
- **Amount filter**: Filter by amount range
- **Confidence filter**: Filter by confidence level
- **Sorting options**: Highest Amount, Highest Confidence, Alphabetical

### FR-08: AI Assistant Interface

The system shall provide an inline AI assistant section on the Financial Footprint Dashboard (below the financial categories) with:
- Chat-style message display
- User text input field
- Example prompt suggestions: "What recurring expenses did you detect?", "Show all insurance premiums.", "Which transactions require attention?"
- Mocked responses for the hackathon (pre-defined answers based on analysis data)
- Designed to connect to Bedrock AgentCore in the future

The AI Assistant supports the dashboard experience — it does not replace or compete with the structured data display above it.

### FR-09: Analytics Page

The system shall provide a lightweight Analytics page with simple placeholder cards:
- Monthly Spend summary card
- Category Distribution breakdown card
- Insurance Breakdown card
- Loan Breakdown card

Implementation shall be minimal Tailwind/CSS cards only. No chart library, no complex visualizations. This page exists primarily as a future integration point for Amazon QuickSight.

### FR-10: Navigation and Routing

The system shall implement the following page flow:
1. **Home/Landing** — Application introduction
2. **Upload Documents** — Document upload interface
3. **Processing Screen** — Multi-step processing indicator
4. **Results Reveal** — "Financial Footprint Generated" transition
5. **Financial Footprint Dashboard** — Analysis results with AI Assistant inline
6. **Analytics** — Placeholder analytics page

React Router shall manage all navigation between pages.

---

## Non-Functional Requirements

### NFR-01: Backend Independence (Hard Requirement)

- Every UI component shall consume ONLY the `FinancialFootprint` interface from the service layer.
- The frontend shall NEVER reference: AWS SDKs, Bedrock, Textract, Lambda, or mock JSON directly.
- Only `services/analyzer.ts` is allowed to know where the data originates.
- A single service abstraction layer (`services/analyzer.ts`) shall be the ONLY integration point with the backend.
- Current implementation calls `mockAnalyzer()` which returns mock data.
- Future implementation replaces the body of `analyzer()` with a `POST /api/analyze` call.
- **No React component shall import or reference mock data directly.**
- **No React component shall know whether data is mocked or real.**

### NFR-02: Backend Contract

The backend contract is:
- **Endpoint**: `POST /api/analyze`
- **Input**: Multipart form data with PDF file uploads
- **Output**: `FinancialFootprint` JSON response conforming to the domain type interfaces

The frontend assumes the backend performs: Upload → OCR → AI Extraction → Normalization.

### NFR-03: Technology Stack

- **Framework**: React 18+ with TypeScript (strict mode)
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Component Library**: shadcn/ui (or similar)
- **Routing**: React Router v6+
- **State Management**: TanStack Query (optional, for async state)
- **Testing**: Vitest + React Testing Library + fast-check (partial PBT)

### NFR-04: Visual Design

- Professional, enterprise SaaS aesthetic (Stripe, Linear, AWS Console style)
- Clean, minimal, and trustworthy appearance
- No excessive gradients or glassmorphism
- Confidence scores displayed as percentage with color-coded badges:
  - ≥80%: Green
  - 50–79%: Yellow/Amber
  - <50%: Red

### NFR-05: Responsive Design

- The application shall be responsive and functional on desktop and tablet viewports
- Mobile improvements are a nice-to-have (out of MVP core scope)

### NFR-06: Error Handling

- Friendly, human-readable error messages
- Retry button for failed operations
- Graceful degradation if AI analysis fails
- Global error boundary for unhandled errors
- Toast notifications for transient feedback

### NFR-07: Performance

- Application shall load and render within 2 seconds on modern hardware
- Processing screen transitions shall feel immediate (mock mode)
- No unnecessary re-renders or layout shifts

### NFR-08: Code Quality

- Strong TypeScript typing throughout (no `any` types in production code)
- All domain entities defined as TypeScript interfaces in `src/types/`
- Modular feature-based folder structure
- Reusable UI components separated from feature logic

### NFR-09: Testing (Partial PBT — Deferred)

Testing is deferred until after the MVP user flow is complete. When implemented:
- Unit tests for utility functions and data transformations
- Property-based tests (fast-check) for:
  - FinancialFootprint JSON serialization/deserialization round-trips
  - Data transformation functions (filtering, sorting, aggregation)
  - Parser utilities
- Component tests for key UI components using React Testing Library

---

## Domain Model (Simplified)

The following TypeScript interfaces constitute the domain layer. Only interfaces representing actual business entities are included — no unnecessary abstractions:

- `FinancialFootprint` — Top-level response containing all analysis results, executive summary, and overview
- `Overview` — Summary statistics (counts, totals)
- `RecurringExpense` — Name, amount, frequency, category, confidence, source
- `Loan` — Name, amount, EMI, tenure, remaining, confidence, source
- `Insurance` — Name, premium, frequency, type, confidence, source
- `Investment` — Name, amount, type, confidence, source
- `AttentionItem` — Name, description, reason, severity, confidence, source

Additional interfaces (DocumentMetadata, ProcessingStatus) shall only be introduced if they provide real implementation value during development.

---

## Implementation Priority

Build in this exact order to minimize integration risk and maximize hackathon demo probability:

1. **Project foundation** — Vite, React, TypeScript, Tailwind, routing, global layout, error boundary
2. **Domain models** — TypeScript interfaces in `src/types/`
3. **Mock analyzer** — `services/mockAnalyzer.ts` + `services/analyzer.ts` abstraction + mock JSON data
4. **Upload flow** — Drag-and-drop, validation, file management
5. **Processing screen** — Multi-step indicator with simulated progression
6. **Results reveal** — "Financial Footprint Generated" transition screen
7. **Dashboard** — Overview cards, category sections, item display with confidence badges
8. **Executive Summary** — Hero panel with AI-generated summary text
9. **Search & Filters** — Text search, category/amount/confidence filters, sorting
10. **AI Assistant (mocked)** — Inline chat interface with pre-defined responses
11. **Analytics placeholder** — Simple Tailwind cards, no chart library
12. **UI polish** — Responsive refinements, animations, final visual pass

Only after the frontend is complete should the mocked analyzer be replaced with the AWS backend.

---

## Constraints and Boundaries

### In Scope
- Complete frontend application with mocked backend
- Professional UI matching enterprise SaaS standards
- Service abstraction enabling one-line backend swap
- End-to-end user flow from upload to dashboard
- Clean architecture with strict backend independence

### Out of Scope
- Authentication / User Accounts
- Payment processing
- Subscription cancellation actions
- Email / SMS integration
- Legal or financial advice
- Financial recommendations
- Multi-user collaboration
- Production security hardening
- Resiliency patterns
- Deployment infrastructure
- Advanced testing (deferred to post-MVP)
- Performance optimization (deferred to post-MVP)

### Success Criteria
1. Application looks fully functional using mocked data
2. Replacing `mockAnalyzer()` with AWS backend requires changing ONLY `services/analyzer.ts`
3. No React components need modification for backend integration
4. Clean, professional visual appearance suitable for hackathon demo
5. End-to-end flow works smoothly: Upload → Processing → Reveal → Dashboard → Analytics

---

## Nice-to-Have (Only if MVP Complete)

- Download PDF Summary
- Export JSON
- Dark Mode
- Document History
- Collapsible Sections
- Mobile Responsive Improvements
