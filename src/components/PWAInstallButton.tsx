import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall.ts';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'compact',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  // If already installed or opened in standalone app mode
  if (isInstalled && !justInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setJustInstalled(true);
        setTimeout(() => setJustInstalled(false), 4000);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      // In Chromium when prompt isn't fired yet, show a helpful instruction
      setShowIOSGuide(true);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border shadow-2xs ${
          justInstalled
            ? 'bg-emerald-800/80 text-emerald-100 border-emerald-600'
            : 'bg-amber-950/40 hover:bg-amber-900/60 text-amber-200 border-amber-700/50 hover:border-amber-500'
        } ${className}`}
        aria-label="Install Pahadon Ka Ghar App for Offline Access"
        title="Install as Offline App on Phone or PC"
      >
        {justInstalled ? (
          <>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Installed</span>
          </>
        ) : (
          <>
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>{variant === 'full' ? 'Install Offline App' : 'Offline App'}</span>
          </>
        )}
      </button>

      {/* Guide Dialog for iOS and Desktop Manual Install */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 p-4 backdrop-blur-xs animate-fade-in no-print">
          <div className="w-full max-w-sm rounded-2xl bg-stone-900 border border-stone-700 p-6 shadow-2xl text-stone-100 relative">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close installation guide"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <Smartphone className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-stone-100 mb-1">
              Use Pahadon Ka Ghar Offline
            </h3>
            <p className="text-xs text-stone-400 mb-4">
              Install the app to access rooms, restaurant menus, trek routes, and booking details without an internet connection in the mountains.
            </p>

            <div className="space-y-3 bg-stone-950/60 border border-stone-800 rounded-xl p-3.5 text-xs text-stone-300">
              {isIOS ? (
                <>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-[10px]">
                      1
                    </span>
                    <span>Tap the <strong>Share</strong> button at the bottom of Safari.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-[10px]">
                      2
                    </span>
                    <span>Scroll down and select <strong>Add to Home Screen</strong>.</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-[10px]">
                      1
                    </span>
                    <span>In Chrome / Edge, click the <strong>Install</strong> icon in the address bar.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-[10px]">
                      2
                    </span>
                    <span>On Android, tap the three dots (⋮) menu and tap <strong>Install App</strong>.</span>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full rounded-xl bg-amber-600 hover:bg-amber-500 py-2.5 text-xs font-semibold text-stone-950 transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
