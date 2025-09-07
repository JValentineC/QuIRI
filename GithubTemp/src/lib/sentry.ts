import * as Sentry from "@sentry/react";

export function initSentry() {
  // Only initialize in production
  if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.MODE,

      // Performance monitoring
      tracesSampleRate: 0.1, // 10% of transactions

      // Release tracking
      release: import.meta.env.VITE_APP_VERSION || "1.0.0",

      // Error filtering
      beforeSend(event) {
        // Don't send errors in development
        if (import.meta.env.DEV) {
          return null;
        }

        // Filter out network errors that users can't control
        if (event.exception?.values?.[0]?.type === "ChunkLoadError") {
          return null;
        }

        return event;
      },

      // Breadcrumb filtering
      beforeBreadcrumb(breadcrumb) {
        // Don't log console messages in production
        if (breadcrumb.category === "console") {
          return null;
        }

        return breadcrumb;
      },

      // User context
      initialScope: {
        tags: {
          component: "quiri-networking",
        },
      },
    });
  }
}

// Enhanced error boundary with Sentry
export const SentryErrorBoundary = Sentry.withErrorBoundary;

// Custom error reporting
export function reportError(error: Error, context?: Record<string, any>) {
  if (import.meta.env.PROD) {
    Sentry.withScope((scope) => {
      if (context) {
        scope.setContext("additional_info", context);
      }
      Sentry.captureException(error);
    });
  } else {
    console.error("Error:", error, context);
  }
}

// Performance monitoring
export function startTransaction(name: string, operation: string) {
  if (import.meta.env.PROD) {
    // Note: startTransaction is deprecated in newer Sentry versions
    // Use Sentry.startSpan for newer versions
    console.log(`Transaction started: ${name} (${operation})`);
    return null;
  }
  return null;
}
