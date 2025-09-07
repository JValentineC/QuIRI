import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
          <div className="card bg-base-100 shadow-xl max-w-md w-full">
            <div className="card-body text-center">
              <div className="text-error mb-4">
                <AlertTriangle size={64} className="mx-auto" />
              </div>
              <h2 className="card-title justify-center text-2xl mb-4">
                Oops! Something went wrong
              </h2>
              <p className="text-base-content/70 mb-6">
                We apologize for the inconvenience. An unexpected error occurred
                while loading this page.
              </p>

              {/* Show error details in development */}
              {process.env.NODE_ENV === "development" && this.state.error && (
                <div className="alert alert-error text-left mb-4">
                  <div>
                    <h3 className="font-semibold">Error Details:</h3>
                    <p className="text-sm mt-1 font-mono">
                      {this.state.error.message}
                    </p>
                    {this.state.errorInfo && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-sm">
                          Stack Trace
                        </summary>
                        <pre className="text-xs mt-2 overflow-auto max-h-32">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              )}

              <div className="card-actions justify-center gap-4">
                <button onClick={this.handleRetry} className="btn btn-primary">
                  <RefreshCw size={16} />
                  Try Again
                </button>
                <button onClick={this.handleGoHome} className="btn btn-outline">
                  <Home size={16} />
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
