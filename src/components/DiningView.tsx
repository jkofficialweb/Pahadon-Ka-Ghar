import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Coffee,
  Sparkles,
  Flame,
  Leaf,
  Drumstick,
  Heart,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { WAZWAN_DISHES, HOTEL_INFO } from '../data/hotelData.ts';
import { WazwanDish } from '../types/hotel.ts';
import { getAssetUrl } from '../utils/assets.ts';

export const DiningView: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'wazwan' | 'tea_bread' | 'veg' | 'non_veg'>('all');
  const [selectedDish, setSelectedDish] = useState<WazwanDish | null>(null);

  const filteredDishes = WAZWAN_DISHES.filter((dish) => {
    if (filter === 'all') return true;
    if (filter === 'veg') return dish.dietary === 'veg';
    if (filter === 'non_veg') return dish.dietary === 'non_veg';
    if (filter === 'wazwan') return dish.category === 'wazwan';
    if (filter === 'tea_bread') return dish.category === 'tea_bread' || dish.category === 'beverage';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
          <UtensilsCrossed className="w-4 h-4" />
          <span>Authentic Kashmiri Gastronomy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
          Traditional Wazwan & Garden Dining
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed">
          Prepared freshly with mountain herbs, pure ghee, and century-old Kashmiri traditions. Savor steaming saffron Kahwa poured from a copper samovar, pink Noon Chai with crisp Girda, and royal Wazwan slow-cooked to perfection.
        </p>

        {/* Filters */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'Complete Menu' },
            { id: 'wazwan', label: 'Royal Wazwan Feasts' },
            { id: 'tea_bread', label: 'Kahwa, Teas & Breads' },
            { id: 'veg', label: 'Vegetarian Specialties' },
            { id: 'non_veg', label: 'Non-Vegetarian Curries' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-amber-800 text-white font-semibold shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feature Split: The Kashmiri Samovar Ceremony */}
      <div className="bg-stone-900 rounded-3xl overflow-hidden text-white shadow-xl grid grid-cols-1 lg:grid-cols-2 items-stretch">
        <div className="p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-amber-300 tracking-wide font-medium">
              <span>Signature Hospitality Tradition</span>
              <span aria-hidden="true">·</span>
              <span>Complimentary on Arrival</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif leading-tight">
              The Saffron Kahwa & Garden Tea Experience
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed">
              In Kashmir, tea is an embrace. We brew our Shahi Kahwa in an authentic engraved brass samovar using crushed cardamom, cinnamon, and whole strands of pure saffron from Pampore. Sip it out on our lawn chairs facing the snowcapped peaks, accompanied by fresh crusty Girda bread baked that morning in local clay tandoors.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Pampore Grade-A Saffron</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Crushed Almond Garnish</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Served Hot in Garden</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Special Diet Options</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
            <span className="text-xs text-stone-400">Available all day for hotel guests & visitors</span>
            <a
              href={`tel:${HOTEL_INFO.phone1}`}
              className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Order Tea Tray
            </a>
          </div>
        </div>

        <div className="relative min-h-[320px] bg-stone-800">
          <img
            src={getAssetUrl('assets/images/kashmiri_kahwa_tea_table_1794390222933.jpg')}
            alt="Traditional Kashmiri Kahwa samovar poured into cups"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Menu Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-stone-900 font-serif">
            Traditional Kashmiri Dishes & Homely Delicacies
          </h2>
          <span className="text-xs text-stone-500">
            {filteredDishes.length} specialt{filteredDishes.length === 1 ? 'y' : 'ies'} listed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow"
            >
              <div>
                {dish.image && (
                  <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-stone-900/80 text-white text-[11px] backdrop-blur-xs font-medium">
                      {dish.dietary === 'veg' ? (
                        <Leaf className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Drumstick className="w-3 h-3 text-amber-400" />
                      )}
                      <span className="capitalize">{dish.dietary.replace('_', ' ')}</span>
                    </div>
                    {dish.isSignature && (
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-amber-700 text-white text-[10px] font-semibold">
                        Signature Dish
                      </div>
                    )}
                  </div>
                )}

                <div className="p-5 space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-bold text-base text-stone-900 font-serif group-hover:text-amber-800 transition-colors">
                      {dish.name}
                    </h3>
                  </div>
                  <div className="text-xs font-medium text-amber-900/70 font-mono">
                    {dish.localName}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {dish.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-stone-100 mt-2">
                <span className="text-[11px] text-stone-500 block">
                  <span className="font-semibold text-stone-700">Key spices: </span>
                  {dish.ingredients}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real Photos Strip from Hotel Kitchen & Garden */}
      <div className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-xl font-bold text-stone-900 font-serif">
            Authentic On-Site Culinary Gallery
          </h3>
          <p className="text-xs text-stone-600">
            Real snapshots from our kitchen, dining halls, and outdoor lawn seating in Hariganiwan.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl overflow-hidden aspect-4/3 bg-stone-200 shadow-xs">
            <img
              src={getAssetUrl('assets/hotel/real_wazwan_thali.jpg')}
              alt="Traditional Kashmiri Wazwan Thali"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="rounded-xl overflow-hidden aspect-4/3 bg-stone-200 shadow-xs">
            <img
              src={getAssetUrl('assets/hotel/real_noon_chai_bread.jpg')}
              alt="Noon Chai with Kashmiri bread"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="rounded-xl overflow-hidden aspect-4/3 bg-stone-200 shadow-xs">
            <img
              src={getAssetUrl('assets/hotel/real_lawn_sitting.jpg')}
              alt="Outdoor lawn dining"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="rounded-xl overflow-hidden aspect-4/3 bg-stone-200 shadow-xs">
            <img
              src={getAssetUrl('assets/hotel/real_family_dining.jpg')}
              alt="Family dining at Pahadon Ka Ghar"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
