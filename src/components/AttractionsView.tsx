import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Clock,
  Sparkles,
  Car,
  Footprints,
  Phone,
  MessageCircle,
  Check,
  ChevronRight,
  Mountain,
  Waves,
} from 'lucide-react';
import { ATTRACTIONS_DATA, HOTEL_INFO } from '../data/hotelData.ts';
import { Attraction } from '../types/hotel.ts';

export const AttractionsView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'mountain' | 'river' | 'glacier' | 'culture'>('all');
  const [selectedItineraryDays, setSelectedItineraryDays] = useState<1 | 2 | 3>(2);

  const filteredAttractions = ATTRACTIONS_DATA.filter((att) => {
    if (activeCategory === 'all') return true;
    return att.category === activeCategory;
  });

  const itineraries = {
    1: {
      title: '1-Day Quick Sonamarg & Sindh River Escape',
      description: 'Ideal for short weekend getaways and road-trippers passing through the Ganderbal valley.',
      stops: [
        { time: '08:00 AM', text: 'Traditional Saffron Kahwa breakfast in Pahadon Ka Ghar garden' },
        { time: '09:30 AM', text: 'Scenic 40-minute drive up the Old Sonamarg Road through Gagangir gorge' },
        { time: '11:00 AM', text: 'Sonamarg Golden Meadows walk and photography along the Sindh riverbank' },
        { time: '02:00 PM', text: 'Lunch with hot Kashmiri Wazwan / packed garden picnic' },
        { time: '04:30 PM', text: 'Return to Hariganiwan for peaceful riverside sunset walk and evening bonfire' },
      ],
    },
    2: {
      title: '2-Day Glacier, Alpine Trek & Village Heritage',
      description: 'Our most popular itinerary for couples and families exploring Sonamarg and local Kashmiri culture.',
      stops: [
        { time: 'Day 1 Morning', text: 'Early check-in, scenic drive to Sonamarg, and pony ride to Thajiwas Glacier' },
        { time: 'Day 1 Afternoon', text: 'Snow sledging and photography near glacier streams; explore Nilagrad mineral spring' },
        { time: 'Day 1 Evening', text: 'Return to hotel, warm bath, royal multi-course Wazwan dinner in cedar wood dining hall' },
        { time: 'Day 2 Morning', text: 'Morning Noon Chai with fresh Girda bread; guided walking trail through Hariganiwan village' },
        { time: 'Day 2 Afternoon', text: 'Visit local walnut processing and handicraft artisans in Kangan township' },
      ],
    },
    3: {
      title: '3+ Day Complete Kashmir & Great Lakes Circuit',
      description: 'Comprehensive guided vacation including Sonamarg, Baltal valley, and seamless transfers.',
      stops: [
        { time: 'Day 1', text: 'Arrival from Srinagar Airport via scenic NH1 to Hariganiwan; river exploration & acclimatization' },
        { time: 'Day 2', text: 'Full day excursion to Sonamarg, Thajiwas Glacier, Zero Point, and Zoji La pass viewpoint' },
        { time: 'Day 3', text: 'Baltal mountain valley and Amarnath gateway tour, followed by trout fishing along Sindh River' },
        { time: 'Day 4+', text: 'Tailored onward transfers to Srinagar Dal Lake houseboats, Gulmarg gondola, or Pahalgam valley' },
      ],
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>Sindh Valley & Sonamarg Travel Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
          Place-Wise Attractions & Natural Wonders
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed">
          Pahadon Ka Ghar serves as a serene base for discovering the legendary beauty of Kashmir. Located at Hariganiwan on the Old Sonamarg Road, you are just minutes away from glacial peaks, golden meadows, rushing rivers, and authentic mountain hamlets.
        </p>

        {/* Category Filters */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Destinations' },
            { id: 'mountain', label: 'Peaks & Valleys' },
            { id: 'glacier', label: 'Glaciers & Snow' },
            { id: 'river', label: 'Rivers & Springs' },
            { id: 'culture', label: 'Towns & Culture' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-800 text-white font-semibold shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Attractions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAttractions.map((att) => (
          <div
            key={att.id}
            className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow"
          >
            <div>
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <img
                  src={att.image}
                  alt={att.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{att.distanceKm} km from hotel</span>
                </div>
                <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-stone-800 text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3 text-stone-500" />
                  <span>{att.travelTime}</span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-bold text-lg text-stone-900 font-serif group-hover:text-amber-800 transition-colors">
                  {att.name}
                </h3>
                <p className="text-xs font-semibold text-amber-900/80">
                  {att.highlight}
                </p>
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {att.description}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-stone-100 mt-2">
              <span className="text-[11px] text-stone-500 block">
                <span className="font-semibold text-stone-700">Recommended Season: </span>
                {att.bestSeason}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Tour & Itinerary Planner */}
      <div className="bg-stone-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Car className="w-4 h-4" />
              <span>Customized Domestic Tour Packages</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif mt-1">
              Curated Kashmir Travel Itineraries
            </h2>
            <p className="text-xs text-stone-300 mt-1">
              Select your travel duration to view recommended sightseeing schedules with private cabs and certified local guides.
            </p>
          </div>

          {/* Day Selector Buttons */}
          <div className="flex items-center gap-2 bg-stone-800 p-1.5 rounded-xl border border-stone-700 self-start md:self-auto">
            {([1, 2, 3] as const).map((days) => (
              <button
                key={days}
                onClick={() => setSelectedItineraryDays(days)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedItineraryDays === days
                    ? 'bg-amber-700 text-white shadow-xs'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {days === 3 ? '3+ Days' : `${days} Day`}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Itinerary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-bold font-serif text-amber-300">
              {itineraries[selectedItineraryDays].title}
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              {itineraries[selectedItineraryDays].description}
            </p>

            <div className="space-y-3 pt-2">
              {itineraries[selectedItineraryDays].stops.map((stop, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-stone-800/60 p-3.5 rounded-xl border border-stone-800"
                >
                  <div className="w-24 shrink-0 text-xs font-mono font-semibold text-amber-400">
                    {stop.time}
                  </div>
                  <div className="text-xs text-stone-200">
                    {stop.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Book / Request Assistance Card */}
          <div className="bg-stone-800 rounded-2xl p-6 border border-stone-700 space-y-4">
            <h4 className="font-bold text-sm text-white">Need Customized Travel Assistance?</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Our front desk arranges reliable local drivers, airport pickups from Srinagar (Sheikh ul-Alam Airport), pony rides for Thajiwas Glacier, and bespoke tours to Gulmarg, Pahalgam, and Dal Lake.
            </p>

            <div className="space-y-2 pt-2 border-t border-stone-700 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span>Verified mountain-experienced drivers</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span>Fixed regulated taxi fares without hidden charges</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span>Snow chain equipped vehicles in winter</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`tel:${HOTEL_INFO.phone1}`}
                className="w-full py-2.5 px-4 bg-amber-700 hover:bg-amber-600 text-white text-xs font-semibold rounded-xl text-center transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Travel Desk: {HOTEL_INFO.phone1}</span>
              </a>
              <a
                href={`https://wa.me/919469919558?text=Hi%20Pahadon%20Ka%20Ghar,%20I%20would%20like%20to%20inquire%20about%20your%20customized%20Kashmir%20tour%20packages.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl text-center transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
