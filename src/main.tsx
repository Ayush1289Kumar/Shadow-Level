import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getRouter } from "./router";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AudioBridge, sound } from "@/lib/audio";
import "./styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // localStorage reads are synchronous — no network retries needed
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
const router = getRouter();

// Bootstrap audio: probe which files exist, then warm the critical clips.
sound.init();
sound.preload(["arise", "levelUp", "habitComplete", "rewardClaim", "buttonClick"]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AudioBridge />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);