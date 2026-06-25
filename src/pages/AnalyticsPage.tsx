import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Repeat, Landmark, Shield, PieChart } from 'lucide-react';
import { Container, PageTitle } from '@/components/layout';
import { useAnalysisResult } from '@/hooks/useAnalysisResult';
import { MetricCard } from '@/features/analytics';

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function AnalyticsPage() {
  const navigate = useNavigate();
  const { result } = useAnalysisResult();

  useEffect(() => {
    if (!result) {
      navigate('/upload', { replace: true });
    }
  }, [result, navigate]);

  if (!result) return null;

  const monthlySpend = result.recurringExpenses.reduce((sum, e) => sum + e.amount, 0) +
    result.loans.reduce((sum, l) => sum + l.emiAmount, 0);

  const totalInsurancePremiums = result.insurance.reduce((sum, i) => sum + i.premiumAmount, 0);
  const totalLoanEMI = result.loans.reduce((sum, l) => sum + l.emiAmount, 0);

  return (
    <Container>
      <PageTitle
        title="Analytics"
        subtitle="Financial insights and breakdowns"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <MetricCard
          title="Monthly Spend"
          value={formatCurrency(monthlySpend)}
          subtitle="Recurring expenses + loan EMIs"
          icon={PieChart}
          color="bg-blue-50 text-blue-600"
        />
        <MetricCard
          title="Category Distribution"
          value={`${result.overview.totalItemsDetected} items`}
          subtitle={`Across ${result.recurringExpenses.length} recurring, ${result.loans.length} loans, ${result.insurance.length} insurance, ${result.investments.length} investments`}
          icon={Repeat}
          color="bg-violet-50 text-violet-600"
        />
        <MetricCard
          title="Insurance Premiums"
          value={formatCurrency(totalInsurancePremiums)}
          subtitle={`${result.insurance.length} active policies detected`}
          icon={Shield}
          color="bg-emerald-50 text-emerald-600"
        />
        <MetricCard
          title="Loan EMIs"
          value={formatCurrency(totalLoanEMI)}
          subtitle={`${result.loans.length} loans with monthly obligations`}
          icon={Landmark}
          color="bg-orange-50 text-orange-600"
        />
      </div>

      <div className="mt-8 rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          📊 Advanced charts and visualizations will be powered by <span className="font-medium">Amazon QuickSight</span> in future versions.
        </p>
      </div>
    </Container>
  );
}
