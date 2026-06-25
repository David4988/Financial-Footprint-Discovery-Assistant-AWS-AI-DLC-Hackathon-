import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { ConfidenceBadge } from './ConfidenceBadge';

interface ItemCardProps {
  name: string;
  amount: number | null;
  confidence: number;
  sourceDocument: string;
  subtitle?: string;
  currency?: string;
}

function formatAmount(amount: number | null, currency: string): string {
  if (amount === null) return '—';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function ItemCard({ name, amount, confidence, sourceDocument, subtitle, currency = 'INR' }: ItemCardProps) {
  return (
    <Card data-testid="item-card" className="transition-shadow hover:shadow-md">
      <CardContent className="flex items-center gap-4 p-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">{name}</p>
          {subtitle && (
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{subtitle}</p>
          )}
          <div className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
            <FileText className="h-3 w-3" />
            <span className="truncate">{sourceDocument}</span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <span className="text-sm font-semibold text-foreground">
            {formatAmount(amount, currency)}
          </span>
          <ConfidenceBadge score={confidence} />
        </div>
      </CardContent>
    </Card>
  );
}
