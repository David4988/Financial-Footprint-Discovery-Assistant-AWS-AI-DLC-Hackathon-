# Requirements Verification Questions

Please answer the following questions to help clarify the requirements for the Financial Footprint Discovery Assistant.

## Question 1
What is the primary deployment target for the frontend application?

A) Static hosting (S3 + CloudFront)

B) Containerized deployment (ECS/Fargate)

C) Serverless (Amplify Hosting)

D) Local development only for the hackathon, deployment strategy decided later

X) Other (please describe after [Answer]: tag below)

[Answer]: D - Local development only for the hackathon. Deployment strategy will be decided later after MVP completion.

## Question 2
For the Upload Module, what should be the maximum file size limit per PDF document?

A) 5 MB per file

B) 10 MB per file

C) 25 MB per file

D) 50 MB per file

X) Other (please describe after [Answer]: tag below)

[Answer]: B - Maximum file size: 10 MB per PDF. Large enough for most bank statements and financial documents. Keeps uploads responsive during the demo.

## Question 3
How many PDF documents should a user be able to upload in a single session?

A) Up to 5 documents

B) Up to 10 documents

C) Up to 20 documents

D) No hard limit

X) Other (please describe after [Answer]: tag below)

[Answer]: A - Up to 5 documents per analysis session. Supported examples: Bank Statement, Credit Card Statement, Insurance Premium Receipt, Loan Statement, Investment Statement. Sufficient for the MVP while keeping processing predictable.

## Question 4
For the AI Assistant UI (Phase 9), what interaction style do you want?

A) Slide-over panel from the right side of the screen

B) Full-page dedicated chat view

C) Floating chat bubble/widget (like Intercom-style)

D) Inline section on the dashboard page

X) Other (please describe after [Answer]: tag below)

[Answer]: D - Inline AI Assistant section on the Financial Footprint Dashboard. The assistant should have immediate access to the analysis results and feel like part of the workflow rather than a separate application.

## Question 5
Should the Financial Footprint Dashboard support viewing results from multiple analysis sessions (document history), or only the most recent analysis?

A) Only the most recent analysis (single session, no persistence)

B) Store multiple sessions in browser localStorage for the hackathon

C) Assume backend will handle session history later, UI shows only current results

X) Other (please describe after [Answer]: tag below)

[Answer]: C - Assume the backend will manage history in future versions. For the hackathon, the UI displays only the current analysis.

## Question 6
For the mock data, how realistic and comprehensive should it be?

A) Minimal — enough to demonstrate UI components (2-3 items per category)

B) Moderate — realistic variety showing different scenarios (5-8 items per category)

C) Comprehensive — large dataset that stress-tests the UI (15+ items per category)

X) Other (please describe after [Answer]: tag below)

[Answer]: B - Moderately realistic mock dataset. Approximately: 5–8 recurring expenses, 2–3 loans, 2–4 insurance items, 2–4 investments, 4–6 attention items. The dataset should resemble a real financial profile.

## Question 7
What confidence score visualization style do you prefer for financial items?

A) Simple text label (High / Medium / Low)

B) Percentage with color-coded badge (e.g., 95% green, 70% yellow, 40% red)

C) Progress bar with percentage

D) Star rating (1-5 stars)

X) Other (please describe after [Answer]: tag below)

[Answer]: B - Display confidence as Percentage with Color-coded badge. Examples: 95% — Green, 78% — Yellow, 45% — Red.

## Question 8
For the Analytics page (Phase 10), what chart library should be used for placeholder visualizations?

A) Recharts (popular, good React integration)

B) Chart.js with react-chartjs-2

C) Nivo (built on D3, beautiful defaults)

D) Simple CSS/Tailwind-based visual cards without a chart library (fastest to build)

X) Other (please describe after [Answer]: tag below)

[Answer]: D - Simple Tailwind/CSS dashboard cards. No chart library unless additional time remains. Charts can later be replaced by Amazon QuickSight.

## Question 9
What visual design tone are you targeting?

A) Professional and corporate (clean, minimal, business-like — think Stripe/Linear)

B) Friendly and approachable (rounded corners, warm colors, illustrations)

C) Data-dense and utilitarian (maximize information density, like Bloomberg terminal lite)

D) Modern SaaS (gradient accents, glass morphism, contemporary feel)

X) Other (please describe after [Answer]: tag below)

[Answer]: A - Professional, enterprise SaaS design. Design goals: Clean, Minimal, Trustworthy, Financial application aesthetic. Modern without excessive gradients or glassmorphism. Think: Stripe, Linear, AWS Console.

## Question 10
For error handling, what level of user feedback should the application provide during document processing?

A) Simple spinner with "Processing..." text

B) Multi-step progress indicator (Uploading → Analyzing → Extracting → Complete)

C) Detailed progress with per-document status and estimated time remaining

X) Other (please describe after [Answer]: tag below)

[Answer]: B - Multi-step processing indicator. Example: Uploading Documents → Extracting Text → AI Financial Analysis → Building Financial Footprint → Completed. No fake percentage progress.

## Question 11: Property-Based Testing Extension
Should property-based testing (PBT) rules be enforced for this project?

A) Yes — enforce all PBT rules as blocking constraints (recommended for projects with business logic, data transformations, serialization, or stateful components)

B) Partial — enforce PBT rules only for pure functions and serialization round-trips (suitable for projects with limited algorithmic complexity)

C) No — skip all PBT rules (suitable for simple CRUD applications, UI-only projects, or thin integration layers with no significant business logic)

X) Other (please describe after [Answer]: tag below)

[Answer]: B - Partial Property-Based Testing. Apply only to: Data transformations, FinancialFootprint JSON validation, Serialization/deserialization, Parser utilities. Do not spend hackathon time on exhaustive PBT.

## Question 12: Security Extensions
Should security extension rules be enforced for this project?

A) Yes — enforce all SECURITY rules as blocking constraints (recommended for production-grade applications)

B) No — skip all SECURITY rules (suitable for PoCs, prototypes, and experimental projects)

X) Other (please describe after [Answer]: tag below)

[Answer]: B - Skip production-grade security rules. Implement only basic safeguards: File type validation, File size validation, Basic input sanitization, No secrets committed to source control. Production security is outside MVP scope.

## Question 13: Resiliency Extensions
Should the resiliency baseline be applied to this project?

A) Yes — apply the resiliency baseline as directional best practices and design-time guidance (recommended for business-critical workloads)

B) No — skip the resiliency baseline (suitable for PoCs, prototypes, and experimental projects where rapid iteration matters more than reliability)

X) Other (please describe after [Answer]: tag below)

[Answer]: B - Skip resiliency baseline. Prioritize rapid feature delivery. Basic error handling is sufficient: Friendly error messages, Retry button, Graceful failure if AI analysis cannot complete. Advanced resiliency patterns are out of scope for the hackathon.
