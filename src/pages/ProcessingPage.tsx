import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { useAnalysisResult } from '@/hooks/useAnalysisResult';
import { analyzeDocuments } from '@/services/analyzer';
import { ProcessingSteps, type ProcessingStep } from '@/features/processing';

const STEP_LABELS = [
  'Uploading Documents',
  'Extracting Text',
  'AI Financial Analysis',
  'Building Financial Footprint',
  'Completed',
];

const STEP_DELAYS = [800, 1200, 1500, 1000, 500];

export function ProcessingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setResult, setError } = useAnalysisResult();
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setLocalError] = useState<string | null>(null);

  // Get files from navigation state
  const files: File[] = (location.state as { files?: File[] })?.files ?? [];

  useEffect(() => {
    if (files.length === 0) {
      navigate('/upload', { replace: true });
      return;
    }

    let cancelled = false;

    async function runAnalysis() {
      try {
        // Start step progression and analysis in parallel
        const analysisPromise = analyzeDocuments(files);

        // Simulate step-by-step progression
        for (let i = 0; i < STEP_LABELS.length - 1; i++) {
          console.log("Current step:", i);
          if (cancelled) return;
          setCurrentStep(i);
          await new Promise((resolve) => setTimeout(resolve, STEP_DELAYS[i]));
        }

        // Wait for actual analysis result
        const result = await analysisPromise;

        if (cancelled) return;

        // Final step: Completed
        setCurrentStep(STEP_LABELS.length - 1);
        setResult(result);

        // Brief pause on "Completed" before navigating
        await new Promise((resolve) => setTimeout(resolve, STEP_DELAYS[STEP_DELAYS.length - 1]));

        if (!cancelled) {
          navigate('/reveal', { replace: true });
        }
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : 'Analysis failed';
        setLocalError(message);
        setError(message);
      }
    }

    runAnalysis();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const steps: ProcessingStep[] = STEP_LABELS.map((label, index) => ({
    label,
    status: index < currentStep ? 'complete' : index === currentStep ? 'active' : 'pending',
  }));

  const handleRetry = () => {
    navigate('/upload', { replace: true });
  };

  return (
    <Container className="max-w-lg">
      <div className="flex flex-col items-center py-16">
        <h1 className="mb-2 text-2xl font-bold text-foreground">
          Analyzing Your Documents
        </h1>
        <p className="mb-10 text-center text-muted-foreground">
          Please wait while we process your financial documents
        </p>

        <ProcessingSteps steps={steps} />

        {error && (
          <div className="mt-8 text-center">
            <p className="text-sm text-destructive">{error}</p>
            <Button
              onClick={handleRetry}
              variant="outline"
              className="mt-4"
              data-testid="processing-retry-button"
            >
              Try Again
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
}
