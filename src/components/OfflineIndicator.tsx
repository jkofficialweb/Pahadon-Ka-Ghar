import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus.ts';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl bg-amber-900/95 border border-amber-600/40 px-3.5 py-2 text-xs font-medium text-amber-100 shadow-xl backdrop-blur-md animate-fade-in no-print">
      <div className="relative flex items-center justify-center">
        <WifiOff className="w-3.5 h-3.5 text-amber-300" />
        <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
      </div>
      <span>Offline Mode — All retreat stays, menus & guides cached</span>
    </div>
  );
};
