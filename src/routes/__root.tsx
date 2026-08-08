import {
  Outlet,
  createRootRoute,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Toaster />
    </SmoothScrollProvider>
  );
}
