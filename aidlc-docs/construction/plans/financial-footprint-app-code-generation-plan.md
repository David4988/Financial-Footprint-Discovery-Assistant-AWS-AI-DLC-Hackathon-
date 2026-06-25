# Code Generation Plan — Financial Footprint Discovery Assistant

## Unit Context
- **Unit**: financial-footprint-app (single unit, greenfield)
- **Workspace Root**: /Users/crimsonvolkov/Projects/AWS
- **Code Location**: /Users/crimsonvolkov/Projects/AWS/ (application code at workspace root)
- **Tech Stack**: React 18, TypeScript, Vite, TailwindCSS, shadcn/ui, React Router v6

## Implementation Steps

---

### Step 1: Project Scaffolding & Configuration
- [ ] Initialize Vite + React + TypeScript project
- [ ] Configure TailwindCSS (tailwind.config.ts, postcss.config.js, index.css)
- [ ] Install and configure shadcn/ui (components.json, utility installs)
- [ ] Install React Router v6
- [ ] Configure TypeScript strict mode (tsconfig.json)
- [ ] Configure path aliases (@/ → src/)
- [ ] Set up folder structure (src/components, pages, features, services, hooks, types, mock, utils)
- [ ] Create basic App.tsx with React Router and route placeholders
- [ ] Create placeholder page components for all 6 routes
- [ ] Verify app runs with `npm run dev`

**References**: NFR-03 (Tech Stack), Application Design (Folder Structure)
**Produces**: Running app with navigation between empty pages

---

### Step 2: Domain Type Definitions
- [x] Create src/types/financial.ts with all interfaces:
  - FinancialFootprint
  - Overview
  - RecurringExpense
  - Loan
  - Insurance
  - Investment
  - AttentionItem
  - FinancialCategory (union type)
  - FinancialItem (unified filter type)
- [x] Export all types from src/types/index.ts barrel file

**References**: domain-entities.md (full type definitions)
**Produces**: Importable TypeScript interfaces for entire application

---

### Step 3: App Shell & Layout Components
- [x] Create src/components/layout/AppLayout.tsx (header + main + footer)
- [x] Create src/components/layout/Header.tsx (logo, navigation links)
- [x] Create src/components/layout/Footer.tsx (attribution)
- [x] Create src/components/layout/Container.tsx (max-width wrapper)
- [x] Create src/components/layout/PageTitle.tsx (consistent page headers)
- [x] Install shadcn/ui Button, Card, Badge, Input components
- [x] Create src/components/feedback/ErrorBoundary.tsx (global error boundary)
- [x] Create src/components/feedback/Toast provider (using shadcn/ui toast)
- [x] Style with professional enterprise SaaS aesthetic (clean, minimal)
- [x] Wire layout into App.tsx wrapping all routes

**References**: NFR-04 (Visual Design), frontend-components.md (Layout Components)
**Produces**: Consistent app shell visible on all pages

---

### Step 4: Mock Data & Analyzer Service
- [x] Create src/mock/financialFootprint.json with realistic data:
  - Executive summary text
  - Overview with computed totals
  - 6 recurring expenses (varying categories, confidence levels)
  - 3 loans (home, vehicle, personal)
  - 3 insurance items (life, health, vehicle)
  - 3 investments (SIP, mutual fund, FD)
  - 5 attention items (varying severity and reasons)
- [x] Create src/services/mockAnalyzer.ts
  - Import mock JSON
  - Return typed FinancialFootprint with simulated delay
- [x] Create src/services/analyzer.ts
  - Public function: analyzeDocuments(files: File[]): Promise<FinancialFootprint>
  - Current: calls mockAnalyzer
  - Comment showing future backend call
- [x] Create src/utils/delay.ts utility

**References**: business-logic-model.md (Service Layer Logic), FR-04 (mock data specs)
**Produces**: analyzeDocuments() returns realistic typed data

---

### Step 5: Analysis Result Context
- [x] Create src/hooks/useAnalysisResult.tsx
  - AnalysisContext with Provider
  - State: result, isAnalyzing, error, uploadedFiles
  - Actions: setResult, clearResult, setUploads, setAnalyzing, setError
- [x] Wrap App with AnalysisProvider
- [x] Export useAnalysisResult() hook

**References**: business-logic-model.md (State Management Logic)
**Produces**: Analysis results accessible from any page

---

### Step 6: Upload Page
- [x] Create src/features/upload/DropZone.tsx
  - Drag-and-drop area with visual states (idle, drag-over, invalid)
  - Click to open file picker
  - data-testid attributes for automation
- [x] Create src/features/upload/FileList.tsx + FileItem.tsx
  - Display selected files with name, size
  - Remove button per file
- [x] Create src/features/upload/UploadValidation.ts
  - Validate: PDF type, ≤10MB, ≤5 files, no duplicates
  - Return validation error messages
- [x] Create src/pages/UploadPage.tsx
  - Compose DropZone + FileList + AnalyzeButton
  - Local state for selectedFiles
  - Validation on file add (toast on rejection)
  - Analyze button navigates to /processing with files in context
- [x] Style to match professional design

**References**: FR-01 (Upload), business-rules.md (BR-U01 through BR-U05), frontend-components.md (Upload Feature)
**Produces**: Functional upload interface with validation

---

### Step 7: Processing Page
- [x] Create src/features/processing/ProcessingSteps.tsx
  - 5 steps with status: pending/active/complete
  - Visual step indicator (icon + label + connector line)
- [x] Create src/features/processing/StepIndicator.tsx
  - Single step display component
- [x] Create src/pages/ProcessingPage.tsx
  - On mount: start step progression (timed intervals)
  - Call analyzeDocuments() from context files
  - Update step as each "completes" (800ms, 1200ms, 1500ms, 1000ms, 500ms)
  - On complete: store result, navigate to /reveal
  - On error: show error with retry button
- [x] Style with centered layout, clean step visualization

**References**: FR-02 (Processing Feedback), business-logic-model.md (Processing Flow), business-rules.md (BR-P01 through BR-P04)
**Produces**: Animated multi-step processing screen

---

### Step 8: Results Reveal Page
- [x] Create src/pages/RevealPage.tsx
  - Success icon/animation
  - "Financial Footprint Generated" heading
  - Summary: "[X] financial items detected across [Y] documents"
  - "View Financial Footprint" CTA button → navigate to /dashboard
  - Guard: redirect to /upload if no result in context
- [x] Style with celebration/completion aesthetic (subtle, professional)

**References**: FR-03 (Results Reveal), business-rules.md (BR-N02)
**Produces**: Brief transition screen between processing and dashboard

---

### Step 9: Dashboard — Executive Summary & Overview Cards
- [x] Create src/features/dashboard/ExecutiveSummary.tsx
  - Hero card with large text displaying executiveSummary string
  - Prominent position, distinct visual weight
- [x] Create src/features/dashboard/OverviewCards.tsx + OverviewCard.tsx
  - Grid of 6 metric cards from Overview data
  - Each card: label, formatted value, subtle icon
- [x] Begin src/pages/DashboardPage.tsx
  - Read result from context (guard: redirect if null)
  - Render ExecutiveSummary at top
  - Render OverviewCards below
  - (Category sections added in Step 10)

**References**: FR-05 (Dashboard), FR-06 (Executive Summary), frontend-components.md (Dashboard Feature)
**Produces**: Dashboard top section with AI summary and metrics

---

### Step 10: Dashboard — Category Sections & Item Cards
- [x] Create src/features/dashboard/CategorySection.tsx
  - Section header with title and item count
  - List of ItemCard components
- [x] Create src/features/dashboard/ItemCard.tsx
  - Name, amount (formatted), confidence badge, source document, category tag
- [x] Create src/features/dashboard/ConfidenceBadge.tsx
  - Percentage + color: green ≥80, yellow 50-79, red <50
- [x] Create src/features/dashboard/AttentionCard.tsx
  - Special styling for attention items (severity-colored border)
  - Description and reason displayed
- [x] Update DashboardPage.tsx:
  - Render AttentionSection (Needs Attention) after overview cards
  - Render category sections: Recurring, Loans, Insurance, Investments
  - Hide empty categories (BR-D03)

**References**: FR-04 (Analysis categories), FR-05 (Dashboard layout), business-rules.md (BR-D01 through BR-D08)
**Produces**: Full financial footprint display with all categories

---

### Step 11: Home/Landing Page
- [x] Create src/pages/HomePage.tsx
  - Hero section: headline, subtitle explaining product
  - Target persona messaging (families managing financial footprint)
  - Key features list (3-4 bullet points with icons)
  - "Get Started" CTA button → navigate to /upload
- [x] Style with professional trust-building aesthetic

**References**: FR-10 (Navigation), Problem Statement, Primary Persona
**Produces**: Polished entry point for demo

---

### Step 12: Search & Filters
- [x] Create src/features/search/SearchFilterBar.tsx (container)
- [x] Create src/features/search/SearchInput.tsx (text search with icon)
- [x] Create src/features/search/CategoryFilter.tsx (multi-select buttons)
- [x] Create src/features/search/ConfidenceFilter.tsx (dropdown)
- [x] Create src/features/search/SortSelect.tsx (dropdown)
- [x] Create src/utils/filterItems.ts
  - Flatten all items into FinancialItem[]
  - Apply text search, category, amount, confidence filters
  - Apply sorting
  - Re-group by category
- [x] Integrate into DashboardPage between overview and categories
- [x] Local filter state in DashboardPage

**References**: FR-07 (Search & Filtering), business-rules.md (BR-F01 through BR-F05), business-logic-model.md (Filter Logic)
**Produces**: Interactive filtering and sorting on dashboard

---

### Step 13: AI Assistant (Mocked)
- [x] Create src/features/assistant/AIAssistant.tsx (container)
- [x] Create src/features/assistant/ChatMessages.tsx + MessageBubble.tsx
- [x] Create src/features/assistant/ChatInput.tsx (text input + send)
- [x] Create src/features/assistant/PromptChips.tsx (3 example prompts)
- [x] Create src/features/assistant/mockResponses.ts
  - Keyword-based response mapping
  - Format responses from FinancialFootprint data
  - Fallback response for unmatched queries
- [x] Integrate as inline section at bottom of DashboardPage
- [x] Local state for messages[]

**References**: FR-08 (AI Assistant), business-rules.md (BR-A01 through BR-A04), business-logic-model.md (AI Assistant Logic)
**Produces**: Interactive chat interface with contextual mock answers

---

### Step 14: Analytics Placeholder Page
- [x] Create src/features/analytics/MetricCard.tsx
  - Title, value, subtitle, optional icon
- [x] Create src/pages/AnalyticsPage.tsx
  - Read result from context (guard: redirect if null)
  - 4 MetricCard instances: Monthly Spend, Category Distribution, Insurance Breakdown, Loan Breakdown
  - Compute values from FinancialFootprint data
  - "Future: Powered by Amazon QuickSight" footer note
- [x] Style with clean card grid layout

**References**: FR-09 (Analytics), NFR-04 (Visual Design)
**Produces**: Analytics page with data-populated summary cards

---

### Step 15: Error States & Loading (Optional)
- [x] Add skeleton loading components for dashboard cards
- [x] Enhance ErrorBoundary with friendly message + retry button
- [x] Add toast notifications for file validation in UploadPage
- [x] Handle edge case: navigate to dashboard with cleared context

**References**: NFR-06 (Error Handling), business-rules.md (BR-N01 through BR-N04)
**Produces**: Professional edge case handling

---

### Step 16: Responsive Refinements (Optional)
- [x] Dashboard card grid: responsive columns (1 on mobile, 2 on tablet, 3 on desktop)
- [x] Navigation: collapsible on small screens
- [x] Upload DropZone: adaptive sizing
- [x] Category sections: stack cleanly on narrow viewports

**References**: NFR-05 (Responsive Design)
**Produces**: Tablet-friendly layout

---

### Step 17: Animations & Micro-interactions (Optional)
- [x] Processing step transitions (fade/slide)
- [x] Reveal page entrance animation
- [x] Card hover states on dashboard
- [x] File list item entrance animation
- [x] Smooth page transitions (optional: framer-motion or CSS)

**References**: NFR-07 (Performance — no layout shifts)
**Produces**: Polished interaction quality

---

## Code Generation Summary

- **Total Steps**: 17
- **Critical Path (MVP)**: Steps 1-10
- **Enhancement**: Steps 11-14
- **Optional Polish**: Steps 15-17
- **Target Code Location**: /Users/crimsonvolkov/Projects/AWS/src/
- **Entry Point**: /Users/crimsonvolkov/Projects/AWS/src/main.tsx
