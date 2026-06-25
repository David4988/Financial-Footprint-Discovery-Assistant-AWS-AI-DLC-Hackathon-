import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface ExecutiveSummaryProps {
  summary: string;
}

export function ExecutiveSummary({ summary }: ExecutiveSummaryProps) {
  return (
    <Card className="border-primary/20 bg-primary/[0.02]" data-testid="executive-summary">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Executive Summary
            </h2>
            <p className="mt-2 text-base leading-relaxed text-foreground">
              {summary}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
