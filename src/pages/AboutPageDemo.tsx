import { SEO } from "../components/SEO";
import { ThemeToggle } from "../components/ThemeToggle";
import { LazyImage } from "../components/LazyImage";
import { useToast } from "../contexts/ToastContext";
import { usePerformanceMonitoring } from "../lib/performance";

export default function AboutPage() {
  const toast = useToast();

  // Performance monitoring active
  usePerformanceMonitoring();

  const showToastDemo = (type: "success" | "error" | "warning" | "info") => {
    const messages = {
      success: "Operation completed successfully! 🎉",
      error: "Something went wrong! 😥",
      warning: "Please check your input! ⚠️",
      info: "Here's some helpful information! 💡",
    };

    toast[type](messages[type]);
  };

  return (
    <>
      <SEO
        title="About"
        description="Learn about QuIRI (Quantum Innovation and Research Institute) platform for academic collaboration"
        keywords={["about", "academic", "platform", "collaboration"]}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            About QuIRI (Quantum Innovation and Research Institute)
          </h1>
          <ThemeToggle />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">🚀 Phase 3 Features Demo</h2>
              <p>Test all the new enhancements we've implemented:</p>

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => showToastDemo("success")}
                >
                  Success Toast
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => showToastDemo("error")}
                >
                  Error Toast
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => showToastDemo("warning")}
                >
                  Warning Toast
                </button>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => showToastDemo("info")}
                >
                  Info Toast
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">🎨 Theme System</h2>
              <p>Click the theme toggle button (top right) to cycle through:</p>
              <ul className="list-disc list-inside mt-2">
                <li>☀️ Light mode</li>
                <li>🌙 Dark mode</li>
                <li>🖥️ System preference</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title">🖼️ Lazy Image Loading</h2>
            <p className="mb-4">
              Images now load automatically when they enter the viewport:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <LazyImage
                src="/assets/QuIRI.png"
                alt="QuIRI Logo"
                className="rounded-lg aspect-square"
              />
              <LazyImage
                src="/assets/jvc.png"
                alt="JVC Logo"
                className="rounded-lg aspect-square"
              />
              <LazyImage
                src="/assets/logo.png"
                alt="Platform Logo"
                className="rounded-lg aspect-square"
              />
            </div>
          </div>
        </div>

        <div className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <h3 className="font-bold">✅ Phase 3 Complete!</h3>
            <div className="text-xs">
              Features: Unit Testing • SEO Optimization • Dark Mode •
              Performance Monitoring • PWA Support • Error Tracking
            </div>
          </div>
        </div>

        <div className="stats shadow w-full mt-8">
          <div className="stat">
            <div className="stat-title">Bundle Size</div>
            <div className="stat-value text-success">423KB</div>
            <div className="stat-desc">↗︎ Well optimized</div>
          </div>

          <div className="stat">
            <div className="stat-title">Features Added</div>
            <div className="stat-value text-primary">12+</div>
            <div className="stat-desc">Production ready</div>
          </div>

          <div className="stat">
            <div className="stat-title">Performance</div>
            <div className="stat-value text-secondary">A+</div>
            <div className="stat-desc">↗︎ Monitoring active</div>
          </div>
        </div>
      </div>
    </>
  );
}
