# Hackathon Task Plan — Financial Footprint Discovery Assistant

## Task Legend

- **Effort**: S (Small, <1hr) | M (Medium, 1-3hr) | L (Large, 3-6hr)
- **Priority**: 🔴 Critical Path | 🟡 Important | 🟢 Optional (skip if time-limited)
- **Parallel Group**: Tasks in the same group can be developed simultaneously by different teammates

---

## PHASE 1: Foundation (Must complete first)

### Task 1: Project Scaffolding & Configuration
- **Priority**: 🔴 Critical Path
- **Effort**: S
- **Parallel Group**: —
- **Dependencies**: None
- **Description**: Initialize Vite + React + TypeScript project. Configure TailwindCSS, install shadcn/ui, set up React Router with all route placeholders, configure path aliases.
- **Visible Result**: App runs with working navigation between empty pages.

### Task 2: Domain Type Definitions
- **Priority**: 🔴 Critical Path
- **Effort**: S
- **Parallel Group**: A (with Task 3)
- **Dependencies**: Task 1
- **Description**: Create `src/types/financial.ts` with all domain interfaces: `FinancialFootprint`, `Overview`, `RecurringExpense`, `Loan`, `Insurance`, `Investment`, `AttentionItem`. Strong typing, no `any`.
- **Visible Result**: TypeScript interfaces importable across the application.

### Task 3: App Shell & Layout
- **Priority**: 🔴 Critical Path
- **Effort**: S
- **Parallel Group**: A (with Task 2)
- **Dependencies**: Task 1
- **Description**: Create shared layout with header (logo, nav links), main content area, and footer. Professional styling with Tailwind. Error boundary wrapper. Toast notification provider.
- **Visible Result**: Consistent app shell visible on all pages with navigation.

### Task 4: Mock Data & Analyzer Service
- **Priority**: 🔴 Critical Path
- **Effort**: M
- **Parallel Group**: B (with Task 5)
- **Dependencies**: Task 2
- **Description**: Create `mock/financialFootprint.json` with realistic mock data (5-8 recurring expenses, 2-3 loans, 2-4 insurance, 2-4 investments, 4-6 attention items). Create `services/mockAnalyzer.ts` and `services/analyzer.ts` abstraction. Include executive summary text in mock data.
- **Visible Result**: `analyzeDocuments()` returns realistic typed data when called.

### Task 5: Analysis Result Context
- **Priority**: 🔴 Critical Path
- **Effort**: S
- **Parallel Group**: B (with Task 4)
- **Dependencies**: Task 2
- **Description**: Create React Context to store `FinancialFootprint` result after analysis. Provider wraps app. Hook `useAnalysisResult()` for consuming components.
- **Visible Result**: Analysis results accessible from any page via context.

---

## PHASE 2: Core Flow (End-to-end MVP)

### Task 6: Upload Page
- **Priority**: 🔴 Critical Path
- **Effort**: M
- **Parallel Group**: C
- **Dependencies**: Tasks 3, 4
- **Description**: Drag-and-drop zone, file picker button, file list display, validation (PDF only, ≤10MB, ≤5 files), remove file button, "Analyze" CTA button. Store selected files in local state.
- **Visible Result**: User can select/drop PDFs, see validation errors, and click Analyze.

### Task 7: Processing Page
- **Priority**: 🔴 Critical Path
- **Effort**: M
- **Parallel Group**: —
- **Dependencies**: Tasks 4, 5, 6
- **Description**: Multi-step progress indicator (5 steps). On mount, call `analyzeDocuments(files)`. Simulate step progression with timed delays (mock mode). Store result in context on completion. Auto-navigate to Reveal page.
- **Visible Result**: Animated step-by-step processing screen that transitions to results.

### Task 8: Results Reveal Page
- **Priority**: 🔴 Critical Path
- **Effort**: S
- **Parallel Group**: —
- **Dependencies**: Task 7
- **Description**: "Financial Footprint Generated" success screen. Display summary count ("12 financial items detected across 5 documents"). "View Financial Footprint" CTA button navigating to dashboard.
- **Visible Result**: Brief celebratory transition screen before dashboard.

### Task 9: Dashboard — Executive Summary & Overview Cards
- **Priority**: 🔴 Critical Path
- **Effort**: M
- **Parallel Group**: D (with Task 10)
- **Dependencies**: Tasks 5, 8
- **Description**: Hero executive summary panel at top. Overview cards row: total items, recurring spend, loans, insurance, investments, attention items. Read from context. Professional card styling.
- **Visible Result**: Dashboard top section shows AI summary and key financial metrics.

### Task 10: Dashboard — Category Sections & Item Cards
- **Priority**: 🔴 Critical Path
- **Effort**: L
- **Parallel Group**: D (with Task 9)
- **Dependencies**: Tasks 5, 8
- **Description**: Five category sections (Needs Attention first, then Recurring, Loans, Insurance, Investments). Each section shows item cards with name, amount, confidence badge (color-coded), source document, category. Confidence badge: ≥80% green, 50-79% yellow, <50% red.
- **Visible Result**: Full financial footprint displayed with all categories and confidence indicators.

---

## PHASE 3: Enhancement Features

### Task 11: Home/Landing Page
- **Priority**: 🟡 Important
- **Effort**: M
- **Parallel Group**: E (with Tasks 12, 13)
- **Dependencies**: Task 3
- **Description**: Product introduction page. Hero section explaining what the app does. Key features list. "Get Started" CTA to upload page. Target persona messaging (surviving family members). Professional, trustworthy tone.
- **Visible Result**: Polished entry point that sets context for the demo.

### Task 12: Search & Filters
- **Priority**: 🟡 Important
- **Effort**: M
- **Parallel Group**: E (with Tasks 11, 13)
- **Dependencies**: Task 10
- **Description**: Search bar filtering items by name/description. Category filter buttons/dropdown. Confidence filter (High/Medium/Low). Sort options (Amount, Confidence, Alphabetical). Filters apply across all category sections.
- **Visible Result**: Interactive filtering and sorting on the dashboard.

### Task 13: AI Assistant (Mocked)
- **Priority**: 🟡 Important
- **Effort**: M
- **Parallel Group**: E (with Tasks 11, 12)
- **Dependencies**: Task 10
- **Description**: Inline chat section below financial categories on dashboard. Message display area. Text input with send button. 3 example prompt chips. Pre-defined mocked responses mapped to keywords (recurring, insurance, attention). Typing indicator animation.
- **Visible Result**: Interactive chat interface that responds with contextual mock answers.

### Task 14: Analytics Placeholder Page
- **Priority**: 🟡 Important
- **Effort**: S
- **Parallel Group**: E (with Tasks 11, 12, 13)
- **Dependencies**: Tasks 3, 5
- **Description**: Four simple Tailwind cards: Monthly Spend, Category Distribution, Insurance Breakdown, Loan Breakdown. Display summary numbers from context data. No chart library. "Powered by Amazon QuickSight" placeholder text.
- **Visible Result**: Analytics page with data-populated summary cards.

---

## PHASE 4: Polish (Only if time permits)

### Task 15: Loading & Error States
- **Priority**: 🟢 Optional
- **Effort**: S
- **Parallel Group**: F (with Tasks 16, 17)
- **Dependencies**: Tasks 7, 10
- **Description**: Skeleton loading states for dashboard. Error boundary with friendly message and retry button. Toast notifications for file validation errors. Graceful fallback if analysis context is empty.
- **Visible Result**: Professional handling of edge cases and loading states.

### Task 16: Responsive Refinements
- **Priority**: 🟢 Optional
- **Effort**: M
- **Parallel Group**: F (with Tasks 15, 17)
- **Dependencies**: Task 10
- **Description**: Tablet-friendly card grid layouts. Responsive navigation (hamburger menu on small screens). Dashboard cards stack vertically on narrow viewports. Upload zone adapts to screen size.
- **Visible Result**: Application works cleanly on tablet-sized viewports.

### Task 17: Animation & Micro-interactions
- **Priority**: 🟢 Optional
- **Effort**: S
- **Parallel Group**: F (with Tasks 15, 16)
- **Dependencies**: Tasks 7, 8, 10
- **Description**: Smooth page transitions. Upload file list entrance animations. Processing step transitions with subtle motion. Card hover states. Confidence badge pulse on low-confidence items.
- **Visible Result**: Polished, fluid interactions that elevate demo quality.

### Task 18: Dark Mode
- **Priority**: 🟢 Optional
- **Effort**: S
- **Parallel Group**: F
- **Dependencies**: Task 3
- **Description**: Tailwind dark mode configuration. Toggle in header. Consistent dark theme across all components. Respect system preference.
- **Visible Result**: Full dark mode support with toggle.

---

## Parallel Development Guide

```
Timeline (2-day hackathon):

DAY 1 Morning:
  All teammates → Task 1 (together, 30min)
  Then split:
    Dev A: Task 2 → Task 4 → Task 7 → Task 8
    Dev B: Task 3 → Task 5 → Task 6

DAY 1 Afternoon:
    Dev A: Task 9 (Executive Summary + Overview)
    Dev B: Task 10 (Category Sections + Item Cards)

DAY 2 Morning:
    Dev A: Task 11 (Landing) + Task 13 (AI Assistant)
    Dev B: Task 12 (Search & Filters) + Task 14 (Analytics)

DAY 2 Afternoon:
    All: Phase 4 polish tasks (15-18) as time permits
    Final: Integration testing, demo preparation
```

## Solo Developer Path

If working alone, follow this strict order:
1. Task 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10
   (This gives you a complete end-to-end flow)
2. Task 11 → 12 → 13 → 14
   (Enhancement features)
3. Tasks 15-18
   (Polish — skip if time runs out)

---

## Task Dependency Graph

```
Task 1 (Scaffolding)
├── Task 2 (Types) ──────────── Task 4 (Mock Data) ──┐
│   └── Task 5 (Context) ───────────────────────────  │
└── Task 3 (Layout) ────────────────────────────────  │
                                                      │
Task 6 (Upload) ← Tasks 3, 4                         │
Task 7 (Processing) ← Tasks 4, 5, 6                  │
Task 8 (Reveal) ← Task 7                             │
Task 9 (Summary+Cards) ← Tasks 5, 8    ┐             │
Task 10 (Categories) ← Tasks 5, 8      ┘ parallel    │
                                                      │
Task 11 (Landing) ← Task 3             ┐             │
Task 12 (Search) ← Task 10             │ parallel    │
Task 13 (AI Chat) ← Task 10            │             │
Task 14 (Analytics) ← Tasks 3, 5       ┘             │

Phase 4: Tasks 15-18 (independent, all optional)
```

---

## Summary

| Phase | Tasks | Effort | Result |
|---|---|---|---|
| Foundation | 1-5 | ~4-5 hours | App runs, types defined, mock data ready |
| Core Flow | 6-10 | ~8-10 hours | Complete upload → dashboard MVP |
| Enhancement | 11-14 | ~5-7 hours | Landing, search, AI chat, analytics |
| Polish | 15-18 | ~3-4 hours | Loading states, responsive, animations |

**Minimum Viable Demo**: Complete Phase 1 + Phase 2 (Tasks 1-10)
**Full Demo**: Add Phase 3 (Tasks 11-14)
**Polished Demo**: Add Phase 4 (Tasks 15-18)
