import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initSentry } from "./lib/sentry.ts";
import "./App.css";
import "./theme-override.css";
import App from "./App.tsx";

// Initialize Sentry before app starts
initSentry();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
