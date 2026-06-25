# Business Rules — Financial Footprint Discovery Assistant

## Upload Validation Rules

| Rule | Condition | Action |
|---|---|---|
| BR-U01 | File type is not `application/pdf` | Reject file, show toast: "Only PDF files are supported" |
| BR-U02 | File size exceeds 10 MB | Reject file, show toast: "File exceeds 10 MB limit" |
| BR-U03 | Total file count would exceed 5 | Reject file, show toast: "Maximum 5 documents per session" |
| BR-U04 | Duplicate file name already in list | Reject file, show toast: "This file is already selected" |
| BR-U05 | No files selected and Analyze clicked | Disable Analyze button (prevent click) |

## Processing Rules

| Rule | Condition | Action |
|---|---|---|
| BR-P01 | Processing starts | Disable back navigation, show processing indicator |
| BR-P02 | Processing completes successfully | Store result in context, navigate to reveal |
| BR-P03 | Processing fails (future: network error) | Show error message with retry button |
| BR-P04 | User navigates away during processing | Cancel analysis (mock: clear timers) |

## Dashboard Display Rules

| Rule | Condition | Action |
|---|---|---|
| BR-D01 | No analysis result in context | Redirect to upload page |
| BR-D02 | Executive summary is empty/null | Show fallback text: "Analysis complete. Review your financial footprint below." |
| BR-D03 | A category has 0 items | Hide that category section entirely |
| BR-D04 | Attention items exist | Display "Needs Attention" section prominently after overview cards |
| BR-D05 | Amount is null/undefined | Display "—" instead of amount |
| BR-D06 | Confidence ≥ 80 | Green badge |
| BR-D07 | Confidence 50-79 | Yellow/Amber badge |
| BR-D08 | Confidence < 50 | Red badge |

## Search & Filter Rules

| Rule | Condition | Action |
|---|---|---|
| BR-F01 | Search query is empty | Show all items (no text filter applied) |
| BR-F02 | No category filters selected | Show all categories |
| BR-F03 | Amount filter min > max | Ignore amount filter (treat as no filter) |
| BR-F04 | Filter results in 0 items | Show "No items match your filters" message |
| BR-F05 | Sort by amount, item has null amount | Sort null amounts to bottom |

## AI Assistant Rules

| Rule | Condition | Action |
|---|---|---|
| BR-A01 | User sends empty message | Ignore (don't send) |
| BR-A02 | User message matches keyword | Return mapped response from analysis data |
| BR-A03 | User message matches no keywords | Return fallback: "I can help you explore your financial footprint. Try asking about recurring expenses, insurance, loans, or investments." |
| BR-A04 | No analysis result available | Return: "Please upload and analyze documents first to get insights." |

## Navigation Guards

| Rule | Condition | Action |
|---|---|---|
| BR-N01 | User navigates to /dashboard without result | Redirect to /upload |
| BR-N02 | User navigates to /reveal without result | Redirect to /upload |
| BR-N03 | User navigates to /analytics without result | Redirect to /upload |
| BR-N04 | User navigates to /processing without files | Redirect to /upload |

## Data Integrity Rules

| Rule | Condition | Action |
|---|---|---|
| BR-I01 | FinancialFootprint JSON missing required fields | Throw validation error (future: show error page) |
| BR-I02 | Confidence value outside 0-100 range | Clamp to 0-100 |
| BR-I03 | Negative amount values | Display absolute value with note |
| BR-I04 | Empty arrays in response | Valid — category section hidden per BR-D03 |
