import { Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ProcessingStep {
  label: string;
  status: 'pending' | 'active' | 'complete';
}

interface ProcessingStepsProps {
  steps: ProcessingStep[];
}

export function ProcessingSteps({ steps }: ProcessingStepsProps) {
  return (
    <div className="flex flex-col gap-4" data-testid="processing-steps">
      {steps.map((step, index) => (
        <div
          key={step.label}
          className="flex items-center gap-4"
          data-testid={`processing-step-${index}`}
        >
          {/* Step indicator */}
          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300',
              step.status === 'complete' && 'border-success bg-success text-white',
              step.status === 'active' && 'border-primary bg-primary/5',
              step.status === 'pending' && 'border-border bg-muted'
            )}
          >
            {step.status === 'complete' && <Check className="h-5 w-5" />}
            {step.status === 'active' && (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            )}
            {step.status === 'pending' && (
              <span className="text-sm font-medium text-muted-foreground">
                {index + 1}
              </span>
            )}
          </div>

          {/* Step label */}
          <span
            className={cn(
              'text-sm font-medium transition-colors duration-300',
              step.status === 'complete' && 'text-success',
              step.status === 'active' && 'text-foreground',
              step.status === 'pending' && 'text-muted-foreground'
            )}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}
