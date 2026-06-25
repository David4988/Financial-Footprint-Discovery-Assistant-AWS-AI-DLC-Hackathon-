import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileSearch, Shield, TrendingUp, AlertCircle } from 'lucide-react';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: FileSearch,
    title: 'Document Analysis',
    description: 'Upload bank statements, credit card bills, and financial documents for AI-powered analysis.',
  },
  {
    icon: Shield,
    title: 'Insurance & Loans',
    description: 'Detect evidence of active insurance premiums and recurring loan repayments.',
  },
  {
    icon: TrendingUp,
    title: 'Investments',
    description: 'Surface evidence of SIPs, mutual funds, fixed deposits, and equity transactions.',
  },
  {
    icon: AlertCircle,
    title: 'Attention Items',
    description: 'Flag missed payments, unusual charges, and expiring policies that need review.',
  },
];

export function HomePage() {
  const navigate = useNavigate();

  return (
    <Container>
      {/* Hero */}
      <div className="flex flex-col items-center py-16 text-center lg:py-24">
        <div className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          AWS AI-DLC Hackathon 2026
        </div>

        <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Understand the financial footprint of a loved one
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          When managing finances for a family member, clarity is everything. Upload their financial
          documents and get an instant overview of recurring obligations, loans, insurance, and
          investments — all in one place.
        </p>

        <Button
          size="lg"
          onClick={() => navigate('/upload')}
          className="mt-8"
          data-testid="home-get-started"
        >
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Button>

        <p className="mt-4 text-sm text-muted-foreground">
          No sign-up required · Your documents stay private
        </p>
      </div>

      {/* Features */}
      <div className="pb-16">
        <h2 className="mb-8 text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          What we help you discover
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardContent className="p-6">
                <feature.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-sm font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Persona messaging */}
      <div className="border-t border-border py-12 text-center">
        <p className="text-sm text-muted-foreground">
          Built for <span className="font-medium text-foreground">surviving spouses</span>,{' '}
          <span className="font-medium text-foreground">adult children</span>, and{' '}
          <span className="font-medium text-foreground">estate executors</span> who need
          clarity during difficult times.
        </p>
      </div>
    </Container>
  );
}
