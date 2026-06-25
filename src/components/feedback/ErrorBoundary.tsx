import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">
              Something went wrong
            </h2>
            <p className="mt-2 text-muted-foreground">
              An unexpected error occurred. Please try again.
            </p>
            {this.state.error && (
              <p className="mt-4 rounded-md bg-muted p-3 text-sm text-muted-foreground font-mono">
                {this.state.error.message}
              </p>
            )}
            <Button
              onClick={this.handleReset}
              className="mt-6"
              data-testid="error-boundary-retry"
            >
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
