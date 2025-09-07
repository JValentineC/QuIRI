import { useState } from "react";

// Inline PWA hook to avoid import issues during build
function usePWA() {
  const [updateAvailable] = useState(false);

  // Simplified version for now
  const updateApp = () => {
    window.location.reload();
  };

  return {
    updateAvailable,
    updateApp,
  };
}

// PWA Update Banner Component
export function PWAUpdateBanner() {
  const [dismissed, setDismissed] = useState(false);
  const { updateAvailable, updateApp } = usePWA();

  if (!updateAvailable || dismissed) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-content p-3 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <span className="text-sm font-medium">
            A new version is available!
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={updateApp} className="btn btn-sm btn-secondary">
            Update Now
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="btn btn-sm btn-ghost"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
