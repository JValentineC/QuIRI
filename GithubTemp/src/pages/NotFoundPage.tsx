import { Link } from "react-router-dom";
import { Home, Search, ArrowLeft } from "lucide-react";

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-primary mb-6">
          <Search size={120} className="mx-auto" />
        </div>

        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>

        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>

        <p className="text-base-content/70 mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary">
            <Home size={16} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>

        <div className="mt-8">
          <p className="text-sm text-base-content/60">
            If you believe this is an error, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
