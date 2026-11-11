import React, { useState } from 'react';
import {
  Camera,
  MapPin,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TreePine,
  Waves,
  Home,
  SunMedium,
} from 'lucide-react';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'resort' | 'river' | 'village';
  categoryLabel: string;
  location: string;
  description: string;
  image: string;
  aspectClass: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'resort-patio-flowers',
    title: 'Manicured Lawn & Mountain Rose Patio',
    category: 'resort',
    categoryLabel: 'Resort Grounds',
    location: 'Pahadon Ka Ghar Garden, Hariganiwan',
    description:
      'Charming outdoor seating framed by blooming climbing roses, morning tea tables, and an unobstructed panorama of the snowy Himalayan peaks.',
    image: '/src/assets/images/resort_garden_flower_patio_1794396328547.jpg',
    aspectClass: 'aspect-3/4',
  },
  {
    id: 'hariganiwan-river-morning',
    title: 'Crystal Sindh Riverbed & Alpine Wildflowers',
    category: 'river',
    categoryLabel: 'River & Trails',
    location: 'Sindh River Trail (350m from resort)',
    description:
      'Glacial torrents meandering over smooth riverbed stones, surrounded by aromatic fir forests, wild lupines, and fresh morning Himalayan mist.',
    image: '/src/assets/images/hariganiwan_morning_river_1794396327876.jpg',
    aspectClass: 'aspect-4/3',
  },
  {
    id: 'kashmiri-village-orchard',
    title: 'Traditional Terraced Orchards & Wood Cottages',
    category: 'village',
    categoryLabel: 'Village Life',
    location: 'Hariganiwan Mountain Hamlet, Kangan',
    description:
      'Centuries-old Kashmiri wooden houses with sloping slate roofs nestled among terraced walnut groves and wooden bridges over mountain streams.',
    image: '/src/assets/images/kashmiri_village_orchard_1794396329655.jpg',
    aspectClass: 'aspect-16/9',
  },
  {
    id: 'resort-evening-bonfire',
    title: 'Starry Alpine Twilight & Garden Bonfire',
    category: 'resort',
    categoryLabel: 'Resort Grounds',
    location: 'Evening Bonfire Circle, Resort Lawn',
    description:
      'Warm wood-fired campfire gathering under clear star-filled mountain skies with fairy-lit gazebos, warm blankets, and hot saffron Kahwa.',
    image: '/src/assets/images/resort_evening_bonfire_lawn_1794396330027.jpg',
    aspectClass: 'aspect-4/3',
  },
  {
    id: 'resort-cottage-peaks',
    title: 'Wooden Chalet Retreat Nestled in Pines',
    category: 'resort',
    categoryLabel: 'Resort Grounds',
    location: 'Old Sonamarg Road, Hariganiwan',
    description:
      'The scenic timber facade of Pahadon Ka Ghar surrounded by flower beds, stone paths, and pine-clad mountain amphitheater.',
    image: '/src/assets/images/hero_kashmir_mountain_resort_1794390221174.jpg',
    aspectClass: 'aspect-16/10',
  },
  {
    id: 'kahwa-samovar-table',
    title: 'Traditional Saffron Kahwa in the Garden',
    category: 'resort',
    categoryLabel: 'Resort Grounds',
    location: 'Outdoor Tea Patio, Pahadon Ka Ghar',
    description:
      'Handcrafted brass samovar pouring steaming golden saffron tea garnished with almonds and fresh Kashmiri Girda bread against the mountains.',
    image: '/src/assets/images/kashmiri_kahwa_tea_table_1794390222933.jpg',
    aspectClass: 'aspect-4/3',
  },
  {
    id: 'real-exterior-lawns',
    title: 'Sunlit Balconies & Open Village Vista',
    category: 'resort',
    categoryLabel: 'Resort Grounds',
    location: 'Resort Front Balconies & Green Lawns',
    description:
      'Direct on-site snapshot of our peaceful green lawns, flower beds, and wooden sit-out balconies facing the valley.',
    image: '/assets/hotel/real_exterior_lawns.jpg',
    aspectClass: 'aspect-16/10',
  },
  {
    id: 'sonamarg-golden-valley',
    title: 'Sonamarg Alpine Meadows & River Course',
    category: 'river',
    categoryLabel: 'River & Trails',
    location: 'Upper Sindh Valley (32 km excursion)',
    description:
      'Breathtaking turquoise mountain river sweeping through golden alpine meadows with horse riders under jagged snow walls.',
    image: '/src/assets/images/sonamarg_thajiwas_glacier_1794390222847.jpg',
    aspectClass: 'aspect-16/9',
  },
];

export const SceneryMasonryGallery: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'resort' | 'river' | 'village'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const prevLightbox = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section className="space-y-8">
      {/* Header and Filter Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
            <Camera className="w-4 h-4" />
            <span>Visual Journey · Hariganiwan & Pahadon Ka Ghar</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif mt-1">
            Scenery & Property Photo Gallery
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            Explore the tranquil riverside trails, colorful landscaped lawns, traditional village settlements, and cozy twilight bonfires at our mountain retreat.
          </p>
        </div>

        {/* Clean Filter Tabs (Buttons with handlers) */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 self-start md:self-auto overflow-x-auto max-w-full">
          {[
            { id: 'all', label: 'All Scenery' },
            { id: 'resort', label: 'Resort & Lawns' },
            { id: 'river', label: 'Sindh River' },
            { id: 'village', label: 'Village Heritage' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as any)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-amber-800 text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5 [column-fill:_balance]">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => openLightbox(idx)}
            className="group relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 break-inside-avoid cursor-pointer"
          >
            {/* Image */}
            <div className={`w-full overflow-hidden ${item.aspectClass}`}>
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
              />
            </div>

            {/* Gradient Scrim & Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4.5 text-white">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-amber-300 backdrop-blur-xs bg-stone-900/60 px-2.5 py-1 rounded-md border border-white/10">
                  {item.categoryLabel}
                </span>
                <div className="w-8 h-8 rounded-lg bg-stone-900/60 border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-sm sm:text-base text-white font-serif leading-snug drop-shadow-xs">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-stone-300">
                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
                <p className="text-[11px] text-stone-300/90 line-clamp-2 pt-1 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl flex flex-col max-h-[92vh]"
          >
            {/* Top Bar */}
            <div className="px-5 py-3.5 bg-stone-950/80 border-b border-stone-800 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-amber-400 font-semibold">
                  {filteredItems[lightboxIndex].categoryLabel}
                </span>
                <span className="text-stone-600">·</span>
                <span className="text-stone-400 font-mono text-[11px]">
                  {lightboxIndex + 1} of {filteredItems.length}
                </span>
              </div>
              <button
                onClick={closeLightbox}
                className="p-1 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Area */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px]">
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto max-w-full object-contain select-none"
              />

              {/* Prev/Next Navigation Controls */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={prevLightbox}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-stone-900/70 border border-white/20 text-white flex items-center justify-center hover:bg-stone-900 transition-colors cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextLightbox}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-stone-900/70 border border-white/20 text-white flex items-center justify-center hover:bg-stone-900 transition-colors cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Caption & Metadata Footer */}
            <div className="p-5 bg-stone-950 text-white space-y-1 shrink-0">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-bold text-base sm:text-lg font-serif text-white">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <span className="text-xs text-amber-300 shrink-0 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{filteredItems[lightboxIndex].location}</span>
                </span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed max-w-3xl">
                {filteredItems[lightboxIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
