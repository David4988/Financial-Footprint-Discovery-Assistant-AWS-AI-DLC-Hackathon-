import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-6xl font-bold text-muted-foreground/30">404</p>
        <h1 className="mt-4 text-2xl font-bold text-foreground">Page not found</h1>
        <p className="mt-2 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          onClick={() => navigate('/')}
          className="mt-6"
          data-testid="not-found-home"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Button>
      </div>
    </Container>
  );
}
