import React from 'react';
import {
  Mountain,
  ArrowRight,
  Sparkles,
  MapPin,
  Phone,
  Wind,
} from 'lucide-react';
import { HOTEL_INFO, ROOMS_DATA } from '../data/hotelData.ts';
import { HeroSection } from './HeroSection.tsx';
import { SceneryMasonryGallery } from './SceneryMasonryGallery.tsx';
import { TestimonialsSection } from './TestimonialsSection.tsx';
import { WeatherWidget } from './WeatherWidget.tsx';
import { FAQAccordion } from './FAQAccordion.tsx';
import { LocalExperiencesSection } from './LocalExperiencesSection.tsx';
import { RoomCategory } from '../types/hotel.ts';
import { formatINR } from '../utils/booking.ts';

interface HomeOverviewProps {
  onOpenBookingModal: (roomTypeId?: string) => void;
  onNavigateToRooms: () => void;
  onNavigateToDining: () => void;
  onNavigateToAttractions: () => void;
  onNavigateToAcademy: () => void;
  checkIn: string;
  setCheckIn: (val: string) => void;
  checkOut: string;
  setCheckOut: (val: string) => void;
  guests: number;
  setGuests: (val: number) => void;
  selectedCategory: RoomCategory;
  setSelectedCategory: (val: RoomCategory) => void;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  onOpenBookingModal,
  onNavigateToRooms,
  onNavigateToDining,
  onNavigateToAttractions,
  onNavigateToAcademy,
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
    <div className="space-y-16 pb-12">
      {/* 1. Cinematic Hero with Integrated Quick Booking */}
      <HeroSection
        onOpenBookingModal={onOpenBookingModal}
        onExploreRooms={onNavigateToRooms}
        onExploreDining={onNavigateToDining}
        checkIn={checkIn}
        setCheckIn={setCheckIn}
        checkOut={checkOut}
        setCheckOut={setCheckOut}
        guests={guests}
        setGuests={setGuests}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* 2. Key Geography & Trust Markers Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-stone-500 block">Location</span>
              <span className="font-bold text-stone-900 text-sm">Hariganiwan, Kangan</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
              <Mountain className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-stone-500 block">Distance to Sonamarg</span>
              <span className="font-bold text-stone-900 text-sm">32 km (45 mins)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-stone-500 block">Sindh River Trail</span>
              <span className="font-bold text-stone-900 text-sm">350 meters walk</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-stone-500 block">Guest Rating</span>
              <span className="font-bold text-stone-900 text-sm">4.9 / 5.0 (Google & OTAs)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. About Pahadon Ka Ghar Split Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
              <span>About Hotel Pahadon Ka Ghar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif leading-tight">
              A Scenic Mountain Sanctuary in Kashmir
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Located at Hariganiwan, Kangan, Ganderbal, on the historic Old Sonamarg Road in Jammu & Kashmir. Surrounded by dramatic mountains, lush green landscapes, fresh mountain air, and the genuine charm of Kashmiri village hospitality.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Pahadon Ka Ghar offers a calm mountain-side experience away from the noise and rush of crowded tourist centers, serving as the perfect peaceful base for tourists, families, and couples visiting Sonamarg and the Sindh Valley.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-stone-700">
              {HOTEL_INFO.features.slice(0, 6).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onNavigateToRooms}
                className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>View Stays & Availability</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onNavigateToAttractions}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Nearby Attractions
              </button>
            </div>
          </div>

          {/* Genuine Hotel Photo Bento Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="rounded-2xl overflow-hidden aspect-4/3 bg-stone-100 shadow-xs">
              <img
                src="/assets/hotel/real_exterior_lawns.jpg"
                alt="Hotel exterior and lush lawns"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-4/3 bg-stone-100 shadow-xs">
              <img
                src="/src/assets/images/room_kashmiri_wood_suite_1794390221069.jpg"
                alt="Cozy cedar wood bedroom suite"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-4/3 bg-stone-100 shadow-xs">
              <img
                src="/src/assets/images/kashmiri_kahwa_tea_table_1794390222933.jpg"
                alt="Kashmiri Kahwa tea in garden"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-4/3 bg-stone-100 shadow-xs">
              <img
                src="/assets/hotel/real_sindh_river.jpg"
                alt="Sindh river flowing in Kashmir"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Featured Rooms Carousel / Grid Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block">
              Accommodations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif mt-1">
              Handcrafted Mountain Stays
            </h2>
          </div>
          <button
            onClick={onNavigateToRooms}
            className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
          >
            <span>View All 4 Accommodation Options</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ROOMS_DATA.slice(0, 3).map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                  <img
                    src={room.image}
                    alt={room.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
                    {room.view}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-base text-stone-900 font-serif group-hover:text-amber-800 transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2">
                    {room.subtitle}
                  </p>
                  <div className="pt-2 flex items-center gap-3 text-xs text-stone-600">
                    <span>Up to {room.capacityAdults} Guests</span>
                    <span>·</span>
                    <span>{room.bedType}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase">Nightly Tariff</span>
                  <span className="text-base font-bold text-stone-900 font-mono">
                    {formatINR(room.pricePerNight)}
                  </span>
                </div>
                <button
                  onClick={() => onOpenBookingModal(room.id)}
                  className="px-3.5 py-1.5 bg-amber-800 hover:bg-amber-900 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Scenery & Property Masonry Photo Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SceneryMasonryGallery />
      </div>

      {/* 6. Curated Local Experiences (Trekking, Villages & Bird Watching) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LocalExperiencesSection onOpenBookingModal={onOpenBookingModal} />
      </div>

      {/* 7. Real-Time Alpine Weather Widget (Kangan / Ganderbal / Sonamarg) */}
      <div id="resort-weather" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WeatherWidget />
      </div>

      {/* 7. Four Seasons in Kashmir */}
      <div className="bg-stone-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Year-Round Splendor
            </span>
            <h2 className="text-3xl font-bold font-serif">
              Season-Wise Beauty of Pahadon Ka Ghar
            </h2>
            <p className="text-xs text-stone-300">
              Each season brings a distinct charm to our valley. Experience changing colors and mountain atmospheres across all four seasons.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOTEL_INFO.seasons.map((season, idx) => (
              <div
                key={idx}
                className="bg-stone-800/80 p-5 rounded-2xl border border-stone-700/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 font-serif">
                    {season.name}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {season.months}
                  </span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {season.description}
                </p>
                <div className="text-[11px] text-amber-400/90 font-mono pt-2 border-t border-stone-700">
                  Avg: {season.temperature}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Enriched Customer Testimonials Section with Star Rating System */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TestimonialsSection onOpenBookingModal={onOpenBookingModal} />
      </div>

      {/* 7. Frequently Asked Questions Accordion (Permits, Mountain Safety & Policies) */}
      <div id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQAccordion />
      </div>

      {/* 8. Online Booking Partners & Direct Reservation Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-8 sm:p-10 text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-stone-900 font-serif">
              Book Direct for the Guaranteed Best Experience
            </h3>
            <p className="text-xs text-stone-600">
              Also listed on Booking.com, MakeMyTrip, Goibibo, and Google Hotels. Direct bookings receive complimentary morning Saffron Kahwa, zero booking surcharges, and priority room allocation.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-3.5 py-1.5 bg-white rounded-lg text-xs font-semibold text-stone-700 shadow-2xs border border-stone-200">
              Booking.com
            </span>
            <span className="px-3.5 py-1.5 bg-white rounded-lg text-xs font-semibold text-stone-700 shadow-2xs border border-stone-200">
              MakeMyTrip
            </span>
            <span className="px-3.5 py-1.5 bg-white rounded-lg text-xs font-semibold text-stone-700 shadow-2xs border border-stone-200">
              Goibibo
            </span>
            <span className="px-3.5 py-1.5 bg-white rounded-lg text-xs font-semibold text-stone-700 shadow-2xs border border-stone-200">
              Google Hotels
            </span>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onOpenBookingModal()}
              className="px-6 py-3 bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              Reserve Directly Online
            </button>
            <a
              href={`tel:${HOTEL_INFO.phone1}`}
              className="px-5 py-3 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs font-semibold rounded-xl transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-amber-700" />
              <span>Call: {HOTEL_INFO.phone1}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
