import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { ConfidenceBadge } from './ConfidenceBadge';
import type { AttentionItem } from '@/types';
import { cn } from '@/lib/utils';

interface AttentionCardProps {
  item: AttentionItem;
}

export function AttentionCard({ item }: AttentionCardProps) {
  const severityColor = {
    high: 'border-l-destructive',
    medium: 'border-l-warning',
    low: 'border-l-muted-foreground',
  };

  const severityBadge = {
    high: 'destructive' as const,
    medium: 'warning' as const,
    low: 'secondary' as const,
  };

  return (
    <Card
      className={cn('border-l-4', severityColor[item.severity])}
      data-testid="attention-card"
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className={cn(
              'mt-0.5 h-4 w-4 shrink-0',
              item.severity === 'high' && 'text-destructive',
              item.severity === 'medium' && 'text-warning',
              item.severity === 'low' && 'text-muted-foreground'
            )} />
            <div>
              <p className="text-sm font-medium text-foreground">{item.name}</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <Badge variant={severityBadge[item.severity]}>
              {item.severity}
            </Badge>
            <ConfidenceBadge score={item.confidence} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
