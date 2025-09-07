// Web Vitals measurement and reporting
export interface WebVitalsMetric {
  name: "CLS" | "FID" | "FCP" | "LCP" | "TTFB";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
}

export function measureWebVitals(onMetric?: (metric: WebVitalsMetric) => void) {
  if (!onMetric) return;

  // Measure First Contentful Paint (FCP)
  const fcpObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === "first-contentful-paint") {
        const value = entry.startTime;
        onMetric({
          name: "FCP",
          value,
          rating:
            value <= 1800
              ? "good"
              : value <= 3000
              ? "needs-improvement"
              : "poor",
          delta: value,
          id: generateId(),
        });
      }
    }
  });

  // Measure Largest Contentful Paint (LCP)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    const value = lastEntry.startTime;

    onMetric({
      name: "LCP",
      value,
      rating:
        value <= 2500 ? "good" : value <= 4000 ? "needs-improvement" : "poor",
      delta: value,
      id: generateId(),
    });
  });

  // Measure Cumulative Layout Shift (CLS)
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
      }
    }
  });

  // Report CLS on page unload
  const reportCLS = () => {
    onMetric({
      name: "CLS",
      value: clsValue,
      rating:
        clsValue <= 0.1
          ? "good"
          : clsValue <= 0.25
          ? "needs-improvement"
          : "poor",
      delta: clsValue,
      id: generateId(),
    });
  };

  try {
    fcpObserver.observe({ entryTypes: ["paint"] });
    lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
    clsObserver.observe({ entryTypes: ["layout-shift"] });

    // Report CLS when page visibility changes or on beforeunload
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        reportCLS();
      }
    });

    window.addEventListener("beforeunload", reportCLS);
  } catch (error) {
    console.warn("Performance measurement not supported:", error);
  }
}

// Generate unique ID for metrics
function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Performance monitoring hook
export function usePerformanceMonitoring() {
  const reportMetric = (metric: WebVitalsMetric) => {
    // Log in development
    if (import.meta.env.DEV) {
      console.log(`📊 Web Vital: ${metric.name}`, {
        value: Math.round(metric.value),
        rating: metric.rating,
      });
    }

    // Send to analytics in production
    if (import.meta.env.PROD) {
      // You can send to Google Analytics, Sentry, or custom endpoint
      if (window.gtag) {
        window.gtag("event", metric.name, {
          event_category: "Web Vitals",
          event_label: metric.id,
          value: Math.round(metric.value),
          custom_map: { metric_rating: metric.rating },
        });
      }
    }
  };

  // Start measuring when hook is used
  if (typeof window !== "undefined") {
    measureWebVitals(reportMetric);
  }
}

// Resource timing analyzer
export function analyzeResourceTiming() {
  const resources = performance.getEntriesByType(
    "resource"
  ) as PerformanceResourceTiming[];

  const analysis = {
    totalResources: resources.length,
    slowResources: resources.filter((r) => r.duration > 1000),
    largeResources: resources.filter((r) => r.transferSize > 100000),
    cacheHitRate:
      resources.filter((r) => r.transferSize === 0).length / resources.length,
  };

  if (import.meta.env.DEV) {
    console.log("📈 Resource Analysis:", analysis);
  }

  return analysis;
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
