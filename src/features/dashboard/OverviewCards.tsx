import { Card, CardContent } from '@/components/ui/card';
import { Repeat, Landmark, Shield, TrendingUp, AlertTriangle, Layers } from 'lucide-react';
import type { Overview } from '@/types';

interface OverviewCardsProps {
  overview: Overview;
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function OverviewCards({ overview }: OverviewCardsProps) {
  const cards = [
    {
      label: 'Total Items Detected',
      value: overview.totalItemsDetected.toString(),
      icon: Layers,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Recurring Monthly Spend',
      value: formatCurrency(overview.totalRecurringMonthlySpend, overview.currency),
      icon: Repeat,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Loans Detected',
      value: overview.totalLoans.toString(),
      icon: Landmark,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
    {
      label: 'Insurance Policies',
      value: overview.totalInsurance.toString(),
      icon: Shield,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Investments',
      value: overview.totalInvestments.toString(),
      icon: TrendingUp,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
    {
      label: 'Attention Items',
      value: overview.totalAttentionItems.toString(),
      icon: AlertTriangle,
      color: 'text-destructive',
      bg: 'bg-destructive/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6" data-testid="overview-cards">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardContent className="flex flex-col items-center p-4 text-center">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.bg}`}>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <p className="mt-3 text-xl font-bold text-foreground">{card.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{card.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
