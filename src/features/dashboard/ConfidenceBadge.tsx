import { Badge } from '@/components/ui/badge';
import { getConfidenceLevel } from '@/types';

interface ConfidenceBadgeProps {
  score: number;
}

export function ConfidenceBadge({ score }: ConfidenceBadgeProps) {
  const level = getConfidenceLevel(score);

  const variant = level === 'high' ? 'success' : level === 'medium' ? 'warning' : 'destructive';

  return (
    <Badge variant={variant} data-testid="confidence-badge">
      {score}%
    </Badge>
  );
}
