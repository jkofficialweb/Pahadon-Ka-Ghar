import React, { useState } from 'react';
import {
  Mountain,
  Phone,
  Menu,
  X,
  CalendarCheck,
  Compass,
  UtensilsCrossed,
  GraduationCap,
  BedDouble,
  Home as HomeIcon,
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData.ts';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBookingModal: (roomTypeId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenBookingModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'rooms', label: 'Rooms & Stays', icon: BedDouble },
    { id: 'dining', label: 'Dining & Wazwan', icon: UtensilsCrossed },
    { id: 'attractions', label: 'Attractions', icon: Compass },
    { id: 'academy', label: 'Skill Academy', icon: GraduationCap },
    { id: 'management', label: 'Booking Desk', icon: CalendarCheck },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Emergency Contact & Notice Strip */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-stone-400">Hariganiwan, Old Sonamarg Road, Kashmir</span>
            <span className="text-stone-600">·</span>
            <span className="text-amber-400 font-medium">Altitude: 2,100m</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${HOTEL_INFO.phone1}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Reservations: {HOTEL_INFO.phone1}</span>
            </a>
            <span className="text-stone-600">·</span>
            <span className="text-emerald-400">Best Price Guarantee Direct</span>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, single line wordmark */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left shrink-0 cursor-pointer group"
          aria-label="Pahadon Ka Ghar Homepage"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-700/10 border border-amber-600/20 flex items-center justify-center text-amber-800 group-hover:bg-amber-700 group-hover:text-white transition-all">
            <Mountain className="w-5 h-5 transition-transform group-hover:scale-110" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap leading-none font-serif">
              Pahadon Ka Ghar
            </span>
            <span className="text-[11px] font-medium text-amber-800 tracking-wider uppercase mt-1 whitespace-nowrap">
              Mountain Retreat · Kashmir
            </span>
          </div>
        </button>

        {/* Zone 2: 4-6 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer relative ${
                  isActive
                    ? 'text-amber-800 font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => onOpenBookingModal()}
            className="hidden sm:inline-flex px-4 py-2 text-xs sm:text-sm font-medium text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-sm transition-all hover:shadow cursor-pointer whitespace-nowrap shrink-0"
          >
            Book Your Stay
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-150">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                  isActive
                    ? 'bg-amber-50 text-amber-900 font-semibold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-700' : 'text-stone-400'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}

          <div className="pt-4 mt-3 border-t border-stone-100 flex flex-col gap-2">
            <a
              href={`tel:${HOTEL_INFO.phone1}`}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-stone-100 text-stone-800 text-sm font-medium"
            >
              <Phone className="w-4 h-4 text-amber-700" />
              <span>Call: {HOTEL_INFO.phone1}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal();
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-amber-800 text-white text-sm font-medium shadow-sm hover:bg-amber-900"
            >
              Book Room Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
