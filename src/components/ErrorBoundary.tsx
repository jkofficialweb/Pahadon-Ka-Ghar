import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, Home, Phone, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Pahadon Ka Ghar - Uncaught application error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      window.location.hash = '';
      window.location.reload();
    } catch {
      window.location.href = './';
    }
  };

  private handleClearStorageAndReload = () => {
    try {
      localStorage.removeItem('pkg_hotel_reservations');
      window.location.hash = '';
      window.location.reload();
    } catch {
      window.location.href = './';
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-900 text-stone-100 flex items-center justify-center p-6 selection:bg-amber-500 selection:text-stone-900">
          <div className="max-w-xl w-full bg-stone-800/90 border border-stone-700/80 rounded-3xl p-8 shadow-2xl backdrop-blur-md text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
              Pahadon Ka Ghar · Mountain Retreat Kashmir
            </span>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 mt-2 mb-3">
              We Encountered an Unexpected Trail Obstacle
            </h1>

            <p className="text-sm text-stone-300 leading-relaxed mb-6">
              The mountain app caught an unexpected runtime error. Your reservations and data are safe.
              Click below to refresh the page or return to the main retreat sanctuary.
            </p>

            {this.state.error?.message && (
              <div className="bg-stone-950/60 border border-stone-800 rounded-xl p-3 mb-6 text-left overflow-x-auto text-xs text-amber-300/90 font-mono">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <button
                onClick={this.handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-sm transition-colors cursor-pointer shadow-lg"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Retreat
              </button>

              <button
                onClick={this.handleClearStorageAndReload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-700 hover:bg-stone-600 text-stone-200 text-sm font-medium transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
                Reset & Return Home
              </button>
            </div>

            <div className="pt-6 border-t border-stone-800 text-xs text-stone-400 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>Hariganiwan, Kangan, Ganderbal, Kashmir</span>
              <a
                href="tel:+919469919558"
                className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium"
              >
                <Phone className="w-3.5 h-3.5" />
                Host Direct: +91 94699 19558
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
