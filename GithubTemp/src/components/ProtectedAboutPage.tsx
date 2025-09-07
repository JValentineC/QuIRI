import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AboutPage from "../pages/AboutPage";

function ProtectedAboutPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is signed in, redirect to research page
    if (user) {
      navigate("/research", { replace: true });
    }
  }, [user, navigate]);

  // If not signed in, show the About page
  if (!user) {
    return <AboutPage />;
  }

  // While redirecting, show loading
  return (
    <div className="flex justify-center items-center min-h-96">
      <span className="loading loading-spinner loading-lg"></span>
      <span className="ml-2 text-lg">Redirecting...</span>
    </div>
  );
}

export default ProtectedAboutPage;
