import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function TabNav() {
  const location = useLocation();
  const { user } = useAuth();

  const allTabs = [
    { id: "about", label: "About", path: "/" },
    { id: "research", label: "Research", path: "/research" },
    { id: "professors", label: "Professors", path: "/professors" },
    { id: "students", label: "Students", path: "/students" },
    { id: "events", label: "Events", path: "/events" },
    { id: "collaborators", label: "QuIN", path: "/collaborators" },
  ] as const;

  // Filter out About tab when user is signed in
  const tabs = user ? allTabs.filter((tab) => tab.id !== "about") : allTabs;

  // Determine active tab based on current pathname
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/" || path === "/about") return "about";
    if (path.startsWith("/research")) return "research";
    if (path.startsWith("/professors")) return "professors";
    if (path.startsWith("/students")) return "students";
    if (path.startsWith("/events")) return "events";
    if (path.startsWith("/collaborations")) return "collaborations";
    return "";
  };

  const activeTab = getActiveTab();

  // Don't show TabNav on profile page
  if (location.pathname === "/profile") {
    return null;
  }

  return (
    <div className="sticky top-16 z-40 bg-base-100/90 backdrop-blur-md border-b border-base-300/50">
      <div className="container mx-auto">
        <div
          role="tablist"
          className="tabs tabs-lifted w-full flex justify-center lg:justify-around overflow-x-auto scrollbar-hide"
        >
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.path}
              role="tab"
              className={`tab tab-lg font-medium transition-all duration-300 whitespace-nowrap px-6 py-4 ${
                activeTab === tab.id
                  ? "tab-active bg-primary text-primary-content shadow-lg border-t-4 border-t-accent"
                  : "hover:bg-primary/5 hover:text-primary border-b-2 border-transparent hover:border-primary/20"
              }`}
            >
              <span className="flex items-center gap-2">
                {tab.id === "about" && "🏠"}
                {tab.id === "research" && "🔬"}
                {tab.id === "professors" && "👨‍🏫"}
                {tab.id === "students" && "🎓"}
                {tab.id === "events" && "📅"}
                {tab.id === "collaborators" && "🤝"}
                {tab.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TabNav;
