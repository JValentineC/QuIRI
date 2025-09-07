import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastProvider } from "../contexts/ToastContext";
import { SkipLink } from "./SkipLink";
import Header from "./Header";
import NavBar from "./NavBar";
import TabNav from "./TabNav";
import Footer from "./Footer";

function Layout() {
  return (
    <AuthProvider>
      <ToastProvider>
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        <Header />
        <NavBar />
        <TabNav />
        <main id="main-content" className="min-h-screen" role="main">
          <Outlet />
        </main>
        <Footer />
      </ToastProvider>
    </AuthProvider>
  );
}

export default Layout;
