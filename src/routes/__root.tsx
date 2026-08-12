import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/components/ThemeProvider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="shadow" storageKey="shadow-level-theme">
      <SmoothScrollProvider>
        <div className="min-h-screen">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>
        <Toaster />
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
