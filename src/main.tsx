import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import posthog from "posthog-js";
import { PostHogProvider, PostHogErrorBoundary } from "@posthog/react";
import { getStoredConsent, enableAnalytics } from "@/lib/consent";

/* La analítica (PostHog + GTM) solo arranca si el visitante ya dio su
   consentimiento en una visita anterior. Si todavía no decidió, o si rechazó,
   no se inicializa nada: cero peticiones y cero cookies de analítica.
   El banner llama a enableAnalytics() cuando el visitante acepta. */
if (getStoredConsent() === "accepted") {
  enableAnalytics();
}

createRoot(document.getElementById("root")!).render(
  <PostHogProvider client={posthog}>
    <PostHogErrorBoundary>
      <App />
    </PostHogErrorBoundary>
  </PostHogProvider>
);
