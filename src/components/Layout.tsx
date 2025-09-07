import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastProvider } from "../contexts/ToastContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { QueryProvider } from "../providers/QueryProvider";
import { SkipLink } from "./SkipLink";
import { PWAUpdateBanner } from "./PWAUpdateBanner";
import { SEO } from "./SEO";
import Header from "./Header";
import NavBar from "./NavBar";
import TabNav from "./TabNav";
import Footer from "./Footer";

function Layout() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <QueryProvider>
            <ToastProvider>
              <SEO />
              <PWAUpdateBanner />
              <SkipLink href="#main-content">Skip to main content</SkipLink>
              <NavBar />
              <Header />
              <TabNav />
              <main
                id="main-content"
                className="min-h-screen bg-gradient-to-b from-base-100 to-base-200/50"
                role="main"
              >
                <div className="container mx-auto px-4 py-8">
                  <Outlet />
                </div>
              </main>
              <Footer />
            </ToastProvider>
          </QueryProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default Layout;
