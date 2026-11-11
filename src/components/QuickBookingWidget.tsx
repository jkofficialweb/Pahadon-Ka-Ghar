import React from 'react';
import { Calendar, Users, BedDouble, Search } from 'lucide-react';
import { RoomCategory } from '../types/hotel.ts';

interface QuickBookingWidgetProps {
  checkIn: string;
  setCheckIn: (val: string) => void;
  checkOut: string;
  setCheckOut: (val: string) => void;
  guests: number;
  setGuests: (val: number) => void;
  selectedCategory: RoomCategory;
  setSelectedCategory: (val: RoomCategory) => void;
  onSearch: () => void;
}

export const QuickBookingWidget: React.FC<QuickBookingWidgetProps> = ({
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  setGuests,
  selectedCategory,
  setSelectedCategory,
  onSearch,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-stone-200/80 p-4 sm:p-5 max-w-5xl mx-auto">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
        {/* Check-In */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider">
            Check-In
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-700">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm font-medium focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none"
              required
            />
          </div>
        </div>

        {/* Check-Out */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider">
            Check-Out
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-700">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm font-medium focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none"
              required
            />
          </div>
        </div>

        {/* Room Category */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider">
            Stay Type
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-700">
              <BedDouble className="w-4 h-4" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as RoomCategory)}
              className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm font-medium focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none cursor-pointer"
            >
              <option value="all">All Room Types</option>
              <option value="deluxe">Deluxe Mountain View</option>
              <option value="suite">Sindh Valley Balcony Suite</option>
              <option value="family">Luxury Family Suite</option>
              <option value="tent">Alpine Glamping Tent</option>
            </select>
          </div>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase tracking-wider">
            Guests
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-700">
              <Users className="w-4 h-4" />
            </div>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-sm font-medium focus:ring-2 focus:ring-amber-700 focus:border-amber-700 outline-none cursor-pointer"
            >
              <option value={1}>1 Guest (Solo)</option>
              <option value={2}>2 Guests (Couple / Pair)</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4 Guests (Family)</option>
              <option value={5}>5+ Guests (Group)</option>
            </select>
          </div>
        </div>

        {/* Search CTA Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-amber-800 hover:bg-amber-900 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer h-10.5"
          >
            <Search className="w-4 h-4" />
            <span>Check Rates</span>
          </button>
        </div>
      </form>
    </div>
  );
};
