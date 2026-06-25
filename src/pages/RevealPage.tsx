import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { useAnalysisResult } from '@/hooks/useAnalysisResult';

export function RevealPage() {
  const navigate = useNavigate();
  const { result, uploadedFiles } = useAnalysisResult();

  // Guard: redirect if no result
  useEffect(() => {
    if (!result) {
      navigate('/upload', { replace: true });
    }
  }, [result, navigate]);

  if (!result) return null;

  const totalItems =
    result.recurringExpenses.length +
    result.loans.length +
    result.insurance.length +
    result.investments.length +
    result.attentionItems.length;

  return (
    <Container className="max-w-lg">
      <div className="flex flex-col items-center py-20 text-center animate-fade-in">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-12 w-12 text-success" />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-foreground">
          Financial Footprint Generated
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          <span className="font-semibold text-foreground">{totalItems}</span>{' '}
          financial items detected across{' '}
          <span className="font-semibold text-foreground">
            {uploadedFiles.length || result.analyzedDocuments}
          </span>{' '}
          documents
        </p>

        <Button
          size="lg"
          onClick={() => navigate('/dashboard')}
          className="mt-8"
          data-testid="reveal-view-dashboard"
        >
          View Financial Footprint
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Container>
  );
}
