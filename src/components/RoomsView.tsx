import React, { useState } from 'react';
import {
  BedDouble,
  Users,
  Maximize2,
  Check,
  Star,
  Eye,
  Sparkles,
  ArrowRight,
  Flame,
  Wifi,
  Coffee,
  X,
  ShieldAlert,
} from 'lucide-react';
import { ROOMS_DATA } from '../data/hotelData.ts';
import { RoomType, RoomCategory } from '../types/hotel.ts';
import { formatINR } from '../utils/booking.ts';

interface RoomsViewProps {
  onSelectRoomForBooking: (roomId: string) => void;
  selectedCategory: RoomCategory;
  setSelectedCategory: (cat: RoomCategory) => void;
}

export const RoomsView: React.FC<RoomsViewProps> = ({
  onSelectRoomForBooking,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [activeRoomDetail, setActiveRoomDetail] = useState<RoomType | null>(null);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string>('');

  const filteredRooms = ROOMS_DATA.filter((r) => {
    if (selectedCategory === 'all') return true;
    return r.category === selectedCategory;
  });

  const handleOpenDetailModal = (room: RoomType) => {
    setActiveRoomDetail(room);
    setSelectedGalleryImg(room.image);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
          <BedDouble className="w-4 h-4" />
          <span>Mountain-Side Accommodation & Homestay</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
          Rooms, Suites & Glamping Stays
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed">
          Clean, comfortable, and well-maintained rooms surrounded by the natural charm of Kashmir. Fitted with cedar wood warmth, electric bed warmers, 24/7 geyser hot water, and panoramic mountain balconies.
        </p>

        {/* Category Filters */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Stays' },
            { id: 'deluxe', label: 'Deluxe Rooms' },
            { id: 'suite', label: 'Balcony Suites' },
            { id: 'family', label: 'Family Suites' },
            { id: 'tent', label: 'Glamping Tents' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as RoomCategory)}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-800 text-white shadow-xs font-semibold'
                  : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Room Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
          >
            {/* Image Container with Badges */}
            <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
              <img
                src={room.image}
                alt={room.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                {room.view}
              </div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-stone-800 text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{room.rating}</span>
                <span className="text-stone-400 font-normal">({room.reviewsCount})</span>
              </div>
            </div>

            {/* Room Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 font-serif group-hover:text-amber-800 transition-colors">
                      {room.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                      {room.subtitle}
                    </p>
                  </div>
                </div>

                {/* Meta Attributes: Bed, Capacity, SqFt */}
                <div className="flex flex-wrap items-center gap-4 py-3 my-2 border-y border-stone-100 text-xs text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-700" />
                    <span>Up to {room.capacityAdults} Guests</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BedDouble className="w-3.5 h-3.5 text-amber-700" />
                    <span>{room.bedType}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>{room.sizeSqFt} sq. ft</span>
                  </div>
                </div>

                {/* Key Amenities */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {room.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Actions Row */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-stone-400 block uppercase tracking-wider">Tariff per night</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-stone-900 font-mono">
                      {formatINR(room.pricePerNight)}
                    </span>
                    <span className="text-xs text-stone-500">+ taxes</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenDetailModal(room)}
                    className="px-3 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onSelectRoomForBooking(room.id)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Direct Booking Inclusions Notice */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div className="w-12 h-12 rounded-xl bg-amber-800 text-white flex items-center justify-center shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-stone-900 text-sm">Direct Reservation Perks</h4>
          <p className="text-xs text-stone-600 mt-1">
            Complimentary morning Kashmiri saffron Kahwa on arrival, guaranteed best tariff rate, zero booking fees, flexible cancellation up to 48 hours prior, and dedicated local sightseeing guidance.
          </p>
        </div>
        <button
          onClick={() => onSelectRoomForBooking(ROOMS_DATA[0].id)}
          className="px-4.5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-xl shrink-0 cursor-pointer transition-colors"
        >
          Book Direct Now
        </button>
      </div>

      {/* Full Room Detail Modal */}
      {activeRoomDetail && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-stone-200 shadow-2xl flex flex-col">
            <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-bold text-lg font-serif">{activeRoomDetail.name}</h3>
                <p className="text-xs text-stone-400">{activeRoomDetail.subtitle}</p>
              </div>
              <button
                onClick={() => setActiveRoomDetail(null)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Main Image & Gallery Strip */}
              <div className="space-y-2">
                <div className="aspect-16/9 rounded-xl overflow-hidden bg-stone-100">
                  <img
                    src={selectedGalleryImg || activeRoomDetail.image}
                    alt={activeRoomDetail.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {activeRoomDetail.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedGalleryImg(img)}
                      className={`w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 cursor-pointer transition-all ${
                        selectedGalleryImg === img ? 'border-amber-700' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt="thumbnail"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-stone-900">About this accommodation</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {activeRoomDetail.description}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-2">
                <h4 className="font-bold text-sm text-stone-900">Room Highlights & Inclusions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeRoomDetail.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-stone-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Reserve */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500">Starting from</span>
                  <div className="text-2xl font-bold text-stone-900 font-mono">
                    {formatINR(activeRoomDetail.pricePerNight)}
                    <span className="text-xs font-normal text-stone-500"> / night</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveRoomDetail(null);
                    onSelectRoomForBooking(activeRoomDetail.id);
                  }}
                  className="px-6 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Reserve This Suite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
