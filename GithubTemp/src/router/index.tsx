import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../components/Layout";
import ErrorBoundary from "../components/ErrorBoundary";
import NotFoundPage from "../pages/NotFoundPage";
import HomePageRouter from "../components/HomePageRouter";
import ProtectedAboutPage from "../components/ProtectedAboutPage";

// Lazy load heavy pages for better performance
const ResearchPage = lazy(() => import("../pages/ResearchPageNew"));
const ProfessorsPage = lazy(() => import("../pages/ProfessorsPageNew"));
const StudentsPage = lazy(() => import("../pages/StudentsPageNew"));
const EventsPage = lazy(() => import("../pages/EventsPageNew"));
const CollaboratorsPage = lazy(() => import("../pages/CollaboratorsPageNew"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));

// Loading component
const PageLoader = () => (
  <div className="flex justify-center items-center min-h-96">
    <span className="loading loading-spinner loading-lg"></span>
    <span className="ml-2 text-lg">Loading...</span>
  </div>
);

// Enhanced error boundary wrapper with suspense
const withErrorBoundary = (Component: React.ComponentType<any>) => {
  return () => (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: withErrorBoundary(() => <HomePageRouter />)(),
      },
      {
        path: "about",
        element: withErrorBoundary(() => <ProtectedAboutPage />)(),
      },
      {
        path: "research",
        element: withErrorBoundary(ResearchPage)(),
      },
      {
        path: "professors",
        element: withErrorBoundary(ProfessorsPage)(),
      },
      {
        path: "students",
        element: withErrorBoundary(StudentsPage)(),
      },
      {
        path: "events",
        element: withErrorBoundary(EventsPage)(),
      },
      {
        path: "collaborators",
        element: withErrorBoundary(CollaboratorsPage)(),
      },
      {
        path: "profile",
        element: withErrorBoundary(ProfilePage)(),
      },
    ],
  },
  {
    path: "*",
    element: withErrorBoundary(NotFoundPage)(),
  },
];

export const router = createBrowserRouter(routes);
