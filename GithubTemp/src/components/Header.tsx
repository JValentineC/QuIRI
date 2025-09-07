import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FileText,
  Users,
  GraduationCap,
  Calendar,
  UserCheck,
} from "lucide-react";
import Logo from "../assets/QuIRI.png";
import NetworkBg from "../assets/network-4205698_1280.jpg";
import WallBg from "../assets/wall-8250672_1280.jpg";
import WomanBg from "../assets/woman-3597095_1280.jpg";
import PixnovaBg from "../assets/pixnova-2ecabc74cbcdf27de33c873f5e3f8e6a.jpg";
import BookBg from "../assets/book-4126483_1280.jpg";
import { useAuth } from "../contexts/AuthContext";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function Header() {
  const { isAuthenticated, user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const location = useLocation();

  const handleJoinNetwork = () => {
    if (isAuthenticated) {
      // Already logged in, maybe scroll to content or show dashboard
      return;
    }
    setShowRegisterModal(true);
  };

  const handleLearnMore = () => {
    // Scroll to about section or navigate
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Define content for different pages
  const getPageContent = () => {
    const path = location.pathname;

    if (path === "/" || path === "/about") {
      return {
        icon: null,
        title: "QuIRI",
        subtitle: "Quantum Innovation and Research Institute",
        description:
          "Connecting researchers, fostering innovation, and building the future of quantum science together.",
        showButtons: true,
        isHomePage: true,
      };
    } else if (path.startsWith("/research")) {
      return {
        icon: <FileText size={64} className="mx-auto mb-4" />,
        title: "Research",
        subtitle: "Cutting-Edge Quantum Science",
        description:
          "Explore groundbreaking research in quantum networks, secure communication, sensing enhancement, and quantum FinTech.",
        showButtons: false,
        isHomePage: false,
      };
    } else if (path.startsWith("/professors")) {
      return {
        icon: <UserCheck size={64} className="mx-auto mb-4" />,
        title: "Professors",
        subtitle: "Leading Quantum Researchers",
        description:
          "Connect with world-class faculty and researchers advancing the frontiers of quantum science and technology.",
        showButtons: false,
        isHomePage: false,
      };
    } else if (path.startsWith("/students")) {
      return {
        icon: <GraduationCap size={64} className="mx-auto mb-4" />,
        title: "Students",
        subtitle: "Next Generation Quantum Scientists",
        description:
          "Meet brilliant students and emerging researchers shaping the future of quantum innovation.",
        showButtons: false,
        isHomePage: false,
      };
    } else if (path.startsWith("/events")) {
      return {
        icon: <Calendar size={64} className="mx-auto mb-4" />,
        title: "Events",
        subtitle: "Quantum Community Gatherings",
        description:
          "Connect with the quantum community through conferences, workshops, seminars, and networking events.",
        showButtons: false,
        isHomePage: false,
      };
    } else if (path.startsWith("/collaborators")) {
      return {
        icon: <Users size={64} className="mx-auto mb-4" />,
        title: "Collaborations",
        subtitle: "Global Research Partnerships",
        description:
          "Join forces with researchers worldwide to advance quantum science through collaborative projects.",
        showButtons: false,
        isHomePage: false,
      };
    } else {
      // Default fallback
      return {
        icon: null,
        title: "QuIRI",
        subtitle: "Quantum Innovation and Research Institute",
        description:
          "Connecting researchers, fostering innovation, and building the future of quantum science together.",
        showButtons: false,
        isHomePage: false,
      };
    }
  };

  const pageContent = getPageContent();

  // Get the appropriate background image based on the current page
  const getBackgroundImage = () => {
    const path = location.pathname;
    if (path.startsWith("/professors")) {
      return WallBg;
    } else if (path.startsWith("/students")) {
      return WomanBg;
    } else if (path.startsWith("/events")) {
      return BookBg;
    } else if (path.startsWith("/collaborators")) {
      return PixnovaBg;
    }
    return NetworkBg; // Default for all other pages
  };

  const backgroundImage = getBackgroundImage();

  return (
    <>
      <div className="bg-gradient-to-br from-info via-primary to-accent -mt-16 relative overflow-hidden">
        {/* Dynamic background image based on page */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* Background pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div
          className={`hero ${
            pageContent.isHomePage ? "h-screen" : "h-[60vh]"
          } justify-end relative`}
          style={{
            backgroundImage: `url(${Logo})`,
            backgroundSize: "auto 90%",
            backgroundPosition: "left center",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
          }}
        >
          {/* Enhanced glass morphism overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-black/40"></div>
          <div className="hero-content text-neutral-content text-center relative z-10">
            <div>
              {pageContent.icon && (
                <div className="text-info-content mb-6 animate-pulse">
                  {pageContent.icon}
                </div>
              )}
              <h1 className="mb-6 text-7xl font-black tracking-tight drop-shadow-lg">
                {pageContent.title}
              </h1>
              <p className="mb-6 text-2xl font-medium text-info-content/90">
                {pageContent.subtitle}
              </p>
              <p className="mb-8 text-lg opacity-90 leading-relaxed max-w-xl mx-auto">
                {pageContent.description}
              </p>
              {pageContent.showButtons && (
                <>
                  {isAuthenticated ? (
                    <div className="text-center space-y-4">
                      <p className="mb-6 text-xl font-medium">
                        Welcome back,{" "}
                        <span className="text-info-content font-bold">
                          {user?.firstName}
                        </span>
                        !
                      </p>
                    </div>
                  ) : (
                    <div className="flex gap-6 justify-center flex-wrap">
                      <button
                        className="btn btn-primary btn-lg px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        onClick={handleJoinNetwork}
                      >
                        Join Our Network
                      </button>
                      <button
                        className="btn btn-outline btn-lg px-8 py-4 text-lg font-semibold rounded-full text-neutral-content border-neutral-content hover:bg-neutral-content hover:text-info hover:border-neutral-content shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        onClick={handleLearnMore}
                      >
                        Learn More
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
}

export default Header;
