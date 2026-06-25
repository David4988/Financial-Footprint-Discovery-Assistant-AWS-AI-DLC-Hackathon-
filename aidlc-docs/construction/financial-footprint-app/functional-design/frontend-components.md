# Frontend Components — Financial Footprint Discovery Assistant

## Component Hierarchy

```
App
├── Layout (Header + Main + Footer)
│   ├── Header (Logo, Navigation)
│   └── Footer (Attribution)
│
├── Pages
│   ├── HomePage
│   │   └── HeroSection, FeatureList, CTAButton
│   │
│   ├── UploadPage
│   │   └── DropZone, FileList, FileItem, AnalyzeButton
│   │
│   ├── ProcessingPage
│   │   └── ProcessingSteps, StepIndicator
│   │
│   ├── RevealPage
│   │   └── RevealCard, SummaryCount, CTAButton
│   │
│   ├── DashboardPage
│   │   ├── ExecutiveSummary
│   │   ├── OverviewCards (OverviewCard x6)
│   │   ├── AttentionSection (AttentionCard[])
│   │   ├── CategorySection (repeated for each category)
│   │   │   └── CategoryHeader, ItemCard[]
│   │   ├── SearchFilterBar
│   │   │   └── SearchInput, CategoryFilter, ConfidenceFilter, SortSelect
│   │   └── AIAssistant
│   │       └── ChatMessages, MessageBubble, ChatInput, PromptChips
│   │
│   └── AnalyticsPage
│       └── MetricCard x4
```

## Shared UI Components (src/components/ui/)

| Component | Props | Purpose |
|---|---|---|
| Button | variant, size, disabled, onClick | Consistent button styles |
| Card | title, children, className | Content container |
| Badge | label, color (green/yellow/red) | Confidence/status indicator |
| Input | placeholder, value, onChange | Text input |
| Toast | message, type (success/error/info) | Transient notification |

## Shared Layout Components (src/components/layout/)

| Component | Props | Purpose |
|---|---|---|
| AppLayout | children | Header + main + footer wrapper |
| Header | — | Logo, nav links (Upload, Dashboard, Analytics) |
| Footer | — | Copyright, attribution |
| Container | children, className | Max-width centered content |
| PageTitle | title, subtitle | Consistent page headers |

## Feature Components

### Upload Feature (src/features/upload/)

| Component | Props | State | Behavior |
|---|---|---|---|
| DropZone | onFilesAdded | isDragging | Drag-over visual state, file drop handler, click to open picker |
| FileList | files, onRemove | — | Renders list of FileItem components |
| FileItem | file, onRemove | — | File name, size, remove button |
| AnalyzeButton | onClick, disabled | — | Primary CTA, disabled when no files |

### Processing Feature (src/features/processing/)

| Component | Props | State | Behavior |
|---|---|---|---|
| ProcessingSteps | steps, currentStep | — | Renders step list with active indicator |
| StepIndicator | label, status (pending/active/complete) | — | Single step with icon and label |

### Dashboard Feature (src/features/dashboard/)

| Component | Props | State | Behavior |
|---|---|---|---|
| ExecutiveSummary | summary (string) | — | Hero card with AI summary text |
| OverviewCards | overview (Overview) | — | Grid of 6 metric cards |
| OverviewCard | label, value, icon | — | Single metric display |
| CategorySection | title, items, category | — | Section header + item card list |
| ItemCard | item (any financial item) | — | Name, amount, confidence badge, source |
| ConfidenceBadge | score (number) | — | Color-coded percentage badge |
| AttentionCard | item (AttentionItem) | — | Highlighted attention item with severity |

### Search Feature (src/features/search/)

| Component | Props | State | Behavior |
|---|---|---|---|
| SearchFilterBar | onFilterChange | filterState | Container for all filter controls |
| SearchInput | value, onChange | — | Text search input with icon |
| CategoryFilter | selected[], onChange | — | Multi-select category buttons |
| ConfidenceFilter | selected, onChange | — | Dropdown: All/High/Medium/Low |
| SortSelect | selected, onChange | — | Dropdown: Amount/Confidence/Alpha |

### Assistant Feature (src/features/assistant/)

| Component | Props | State | Behavior |
|---|---|---|---|
| AIAssistant | result (FinancialFootprint) | messages[] | Chat container |
| ChatMessages | messages[] | — | Scrollable message list |
| MessageBubble | message (ChatMessage) | — | Single message display (user/assistant style) |
| ChatInput | onSend | inputValue | Text input + send button |
| PromptChips | prompts[], onSelect | — | Clickable example prompt suggestions |

### Analytics Feature (src/features/analytics/)

| Component | Props | State | Behavior |
|---|---|---|---|
| MetricCard | title, value, subtitle, icon | — | Simple stat card |

## Component Communication Patterns

1. **Pages ↔ Context**: Pages read `FinancialFootprint` from `useAnalysisResult()` hook
2. **Pages → Features**: Pages pass data slices as props to feature components
3. **Features → UI**: Feature components use shared UI primitives
4. **No cross-feature imports**: Features never import from other features
5. **No direct mock access**: Only `services/analyzer.ts` touches mock data

## Data Flow Per Page

### UploadPage
```
Local state (files[]) → DropZone/FileList
User action → validate → update local state
Analyze click → store files in context → navigate(/processing)
```

### ProcessingPage
```
On mount → call analyzeDocuments(files from context)
Timer progression → update currentStep state
On complete → setResult(data) in context → navigate(/reveal)
```

### DashboardPage
```
Context (result) → spread to child features:
  result.executiveSummary → ExecutiveSummary
  result.overview → OverviewCards
  result.attentionItems → AttentionSection
  result.[categories] → CategorySections
  filterState (local) → SearchFilterBar → filtered items
  result (full) → AIAssistant
```
