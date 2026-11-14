import React, { useState, useEffect, useMemo } from 'react';
import {
  Camera,
  MapPin,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Image as ImageIcon,
} from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/galleryData.ts';
import {
  filterGalleryPhotos,
  getGalleryCategoryCounts,
  GalleryFilterCategory,
} from '../utils/galleryHelper.ts';

export const GalleryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryFilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const counts = useMemo(() => getGalleryCategoryCounts(GALLERY_PHOTOS), []);

  const filteredPhotos = useMemo(() => {
    const base = filterGalleryPhotos(GALLERY_PHOTOS, selectedCategory, searchQuery);
    if (selectedCategory !== 'all' || searchQuery.trim() !== '') {
      return base;
    }
    // Round-robin interleave categories so "All Photos" showcases all facets of the retreat first
    const order = ['resort', 'rooms', 'dining', 'tours', 'academy'] as const;
    const buckets = order.map((cat) => base.filter((p) => p.category === cat));
    const interleaved: typeof base = [];
    const maxLen = Math.max(...buckets.map((b) => b.length));
    for (let i = 0; i < maxLen; i++) {
      for (const b of buckets) {
        if (i < b.length) interleaved.push(b[i]);
      }
    }
    return interleaved;
  }, [selectedCategory, searchQuery]);

  const categoryTabs: { id: GalleryFilterCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Photos', count: counts.all },
    { id: 'resort', label: 'Resort & Lawns', count: counts.resort },
    { id: 'rooms', label: 'Rooms & Glamping', count: counts.rooms },
    { id: 'dining', label: 'Dining & Wazwan', count: counts.dining },
    { id: 'tours', label: 'Kashmir Tours & Nature', count: counts.tours },
    { id: 'academy', label: 'Skill Academy', count: counts.academy },
  ];

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredPhotos.length
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + filteredPhotos.length) % filteredPhotos.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  const handleCategoryChange = (cat: GalleryFilterCategory) => {
    setSelectedCategory(cat);
    setLightboxIndex(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
          <Camera className="w-4 h-4" />
          <span>Authentic Property & Kashmir Valley Photography</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif text-balance">
          Pahadon Ka Ghar Photo Gallery
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed">
          Browse genuine on-site photographs of our Hariganiwan resort grounds, mountain-view rooms, glamping tents, traditional Kashmiri Wazwan meals, Youth Skill Academy workshops, and scenic excursions across Sonamarg, Sindh River, and Srinagar.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-y border-stone-200/80 py-4">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200/80">
          {categoryTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleCategoryChange(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-800 text-white shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`font-mono tabular-nums text-[11px] ${
                    isActive ? 'text-amber-200' : 'text-stone-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72 shrink-0">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rooms, Wazwan, Sonamarg..."
            aria-label="Search gallery photos"
            className="w-full pl-9 pr-8 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear photo search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Count Line */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-amber-700" />
          <span>
            Showing <strong className="text-stone-900 font-mono tabular-nums">{filteredPhotos.length}</strong> of{' '}
            <strong className="text-stone-900 font-mono tabular-nums">{GALLERY_PHOTOS.length}</strong> real photographs
          </span>
        </div>
        <span className="hidden sm:inline text-stone-400">
          Click any photo to view full screen
        </span>
      </div>

      {/* Gallery Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
          <Camera className="w-8 h-8 text-stone-300 mx-auto" />
          <h3 className="text-base font-bold text-stone-900 font-serif">
            No Photos Match Your Search
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Try clearing your search keyword or switching to &ldquo;All Photos&rdquo; to inspect the full gallery.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-lg cursor-pointer"
          >
            Reset Gallery Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPhotos.map((item, idx) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative text-left rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-200">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/25 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-lg bg-stone-950/60 border border-white/15 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5 text-white space-y-1">
                  <div className="text-[11px] text-amber-300 font-medium flex items-center gap-1.5 min-w-0">
                    <span className="whitespace-nowrap shrink-0">{item.categoryLabel}</span>
                    <span aria-hidden="true" className="shrink-0">·</span>
                    <span className="truncate text-stone-300">{item.location}</span>
                  </div>
                  <h3 className="font-bold text-sm text-white font-serif leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl flex flex-col max-h-[92vh]"
          >
            {/* Top Bar */}
            <div className="px-5 py-3.5 bg-stone-950/80 border-b border-stone-800 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-amber-400 font-semibold">
                  {filteredPhotos[lightboxIndex].categoryLabel}
                </span>
                <span className="text-stone-600">·</span>
                <span className="text-stone-400 font-mono tabular-nums text-[11px]">
                  {lightboxIndex + 1} of {filteredPhotos.length}
                </span>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Display */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px]">
              <img
                src={filteredPhotos[lightboxIndex].image}
                alt={filteredPhotos[lightboxIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto max-w-full object-contain select-none"
              />

              {filteredPhotos.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(
                        (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length
                      );
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-stone-900/75 border border-white/20 text-white flex items-center justify-center hover:bg-stone-900 transition-colors cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-stone-900/75 border border-white/20 text-white flex items-center justify-center hover:bg-stone-900 transition-colors cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Caption Footer */}
            <div className="p-5 bg-stone-950 text-white space-y-1.5 shrink-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h3 className="font-bold text-base sm:text-lg font-serif text-white">
                  {filteredPhotos[lightboxIndex].title}
                </h3>
                <span className="text-xs text-amber-300 shrink-0 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{filteredPhotos[lightboxIndex].location}</span>
                </span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed max-w-3xl">
                {filteredPhotos[lightboxIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
