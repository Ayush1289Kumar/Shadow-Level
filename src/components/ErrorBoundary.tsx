// ─────────────────────────────────────────────────────────────────────────────
// ErrorBoundary.tsx — Solo Leveling-themed React Error Boundary
// Catches any unhandled render error and shows a full-screen "Gate" fallback.
// ─────────────────────────────────────────────────────────────────────────────
import { Component, type ErrorInfo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { STRINGS } from "@/lib/strings";

interface Props {
  children: ReactNode;
  /** Optional custom fallback — defaults to the SYSTEM FATAL ERROR gate screen */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log to console — can be wired to Sentry/etc. in the future
    console.error("[SYSTEM ERROR]", error, info.componentStack);
  }

  handleRetry = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex min-h-screen items-center justify-center bg-monarch-radial px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass-strong w-full max-w-lg p-10 text-center"
          >
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-destructive/20 ring-1 ring-destructive/40">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>

            {/* Title */}
            <h1 className="font-display text-2xl font-bold tracking-widest text-destructive mb-3">
              {STRINGS.errors.boundary_title}
            </h1>

            {/* System voice description */}
            <p className="text-muted-foreground text-sm mb-2">
              {STRINGS.errors.boundary_desc}
            </p>
            <p className="text-muted-foreground/60 text-xs mb-8">
              {STRINGS.errors.boundary_detail}
            </p>

            {/* Error detail (collapsed) */}
            {this.state.error && (
              <details className="mb-8 text-left">
                <summary className="cursor-pointer text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                  View anomaly trace
                </summary>
                <pre className="mt-2 rounded-md bg-muted/20 p-3 text-xs text-destructive/80 overflow-auto max-h-32 whitespace-pre-wrap">
                  {this.state.error.message}
                </pre>
              </details>
            )}

            {/* ARISE button */}
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-display text-sm font-bold tracking-widest text-primary-foreground text-glow-primary transition-all hover:bg-primary/80 hover:scale-105 active:scale-95"
            >
              {STRINGS.errors.boundary_cta}
            </button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
