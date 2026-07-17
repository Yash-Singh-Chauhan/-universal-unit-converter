import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button, Card } from "@/components/ui";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card variant="default" padding="lg" className="mx-auto max-w-md mt-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-error)]/10">
              <AlertTriangle size={24} className="text-[var(--color-error)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text)]">
              Something went wrong
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {this.state.error?.message ?? "An unexpected error occurred."}
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={this.handleRetry}
              icon={<RefreshCw size={16} />}
            >
              Try again
            </Button>
          </div>
        </Card>
      );
    }

    return this.props.children;
  }
}
