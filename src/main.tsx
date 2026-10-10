import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initializeAnalytics } from "./utils/analytics.ts";

initializeAnalytics("G-ZYPK58954X");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
