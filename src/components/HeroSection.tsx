import React from 'react';
import {
  Mountain,
  Compass,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  MapPin,
  Calendar,
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData.ts';
import { QuickBookingWidget } from './QuickBookingWidget.tsx';
import { RoomCategory } from '../types/hotel.ts';
import { getAssetUrl } from '../utils/assets.ts';

interface HeroSectionProps {
  onOpenBookingModal: (roomTypeId?: string) => void;
  onExploreRooms: () => void;
  onExploreDining: () => void;
  checkIn: string;
  setCheckIn: (val: string) => void;
  checkOut: string;
  setCheckOut: (val: string) => void;
  guests: number;
  setGuests: (val: number) => void;
  selectedCategory: RoomCategory;
  setSelectedCategory: (val: RoomCategory) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBookingModal,
  onExploreRooms,
  onExploreDining,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  setGuests,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <section className="relative overflow-hidden bg-stone-900 text-white">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0">
        <img
          src={getAssetUrl('assets/aistudio/IMG-20261114-WA0115_c0a9df9c.jpg')}
          alt="Pahadon Ka Ghar Kashmir mountain chalet retreat"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        {/* Measured dark scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/92 via-stone-900/65 to-stone-950/55" />
      </div>

      {/* Hero Content Area */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-18 pb-12 lg:pt-24 lg:pb-16 min-h-[640px] flex flex-col justify-between">
        <div className="max-w-3xl space-y-4">
          {/* Unboxed Metadata Tagline (No pill badges) */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-amber-300 tracking-wide">
            <span>Hariganiwan, Kangan</span>
            <span aria-hidden="true">·</span>
            <span>Old Sonamarg Road</span>
            <span aria-hidden="true">·</span>
            <span>Jammu & Kashmir</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-serif text-balance leading-tight">
            Your Peaceful Mountain Retreat in Kashmir
          </h1>

          <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl font-normal">
            Nestled between pine-covered Himalayan ridges and the crystal waters of the Sindh River. Wake up to fresh mountain air, birdsong, authentic Kashmiri Wazwan, and warm heartfelt hospitality away from crowded tourist hubs.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenBookingModal()}
              className="px-6 py-3 bg-amber-700 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Reserve Room Direct</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreRooms}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-medium rounded-xl backdrop-blur-xs transition-all cursor-pointer"
            >
              Explore Rooms & Suites
            </button>
            <a
              href={`tel:${HOTEL_INFO.phone1}`}
              className="px-4 py-3 text-stone-300 hover:text-white text-sm font-medium flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>{HOTEL_INFO.phone1}</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-stone-300 border-t border-white/15">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>32 km from Sonamarg Golden Meadows</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>350m walk to Sindh River banks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Traditional Kashmiri Wazwan on site</span>
            </div>
          </div>
        </div>

        {/* Quick Booking Bar Floating Strip */}
        <div className="mt-8 pt-4">
          <QuickBookingWidget
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            guests={guests}
            setGuests={setGuests}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSearch={onExploreRooms}
          />
        </div>
      </div>
    </section>
  );
};
