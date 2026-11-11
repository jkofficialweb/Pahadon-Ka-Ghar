import React, { useState } from 'react';
import {
  Compass,
  Footprints,
  Users,
  Binoculars,
  Search,
  Clock,
  MapPin,
  Check,
  Phone,
  MessageCircle,
  Sparkles,
  ChevronRight,
  X,
  Shield,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { LOCAL_EXPERIENCES } from '../data/experiencesData.ts';
import {
  LocalExperience,
  ExperienceCategory,
  ExperienceDifficulty,
} from '../types/experience.ts';
import { filterExperiences, getCategoryCounts } from '../utils/experiencesHelper.ts';
import { HOTEL_INFO } from '../data/hotelData.ts';

interface LocalExperiencesSectionProps {
  onOpenBookingModal?: (roomTypeId?: string) => void;
}

export const LocalExperiencesSection: React.FC<LocalExperiencesSectionProps> = ({
  onOpenBookingModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ExperienceCategory>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | ExperienceDifficulty>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalExperience, setActiveModalExperience] = useState<LocalExperience | null>(null);

  const counts = getCategoryCounts(LOCAL_EXPERIENCES);
  const filteredList = filterExperiences(
    LOCAL_EXPERIENCES,
    selectedCategory,
    searchQuery,
    selectedDifficulty
  );

  const categoryTabs: { id: ExperienceCategory; label: string; count: number; icon: React.ElementType }[] = [
    { id: 'all', label: 'All Experiences', count: counts.all, icon: Compass },
    { id: 'trekking', label: 'Curated Treks & Hikes', count: counts.trekking, icon: Footprints },
    { id: 'cultural', label: 'Cultural Village Visits', count: counts.cultural, icon: Users },
    { id: 'birdwatching', label: 'Bird Watching & Flora', count: counts.birdwatching, icon: Binoculars },
  ];

  const handleInquireExperience = (experience: LocalExperience) => {
    const text = encodeURIComponent(
      `Hello Pahadon Ka Ghar Team, I am interested in planning the local experience: "${experience.title}" in ${experience.location}. Please share availability and guide details.`
    );
    window.open(`https://wa.me/919469919558?text=${text}`, '_blank');
  };

  return (
    <section id="experiences" className="space-y-10 scroll-mt-24">
      {/* 1. Section Header & Purpose */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200/80 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-amber-700" />
            <span>Kangan, Ganderbal & Sindh Valley</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif leading-tight">
            Curated Local Experiences
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Discover the raw, authentic beauty of Kashmir right from our doorstep in Hariganiwan.
            Explore scenic riverside trails, ancient 8th-century temple ruins, peaceful village walnut orchards,
            and prime Himalayan bird-watching sanctuaries with personalized host guidance.
          </p>
        </div>

        {/* Quick Highlights Summary Pill-Free */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center gap-4 text-xs text-stone-600 shrink-0 bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
            <span className="font-medium text-stone-800">Local Kashmiri Escorts</span>
          </div>
          <span className="hidden sm:inline lg:inline text-stone-300">·</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />
            <span className="font-medium text-stone-800">Free Binoculars & Sticks</span>
          </div>
          <span className="hidden sm:inline lg:inline text-stone-300">·</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0" />
            <span className="font-medium text-stone-800">Direct Riverbank Access</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Category Tabs & Filter Toolbar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Category Tabs (Segmented control) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-stone-100/90 rounded-2xl overflow-x-auto scrollbar-none">
            {categoryTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-800' : 'text-stone-500'}`} />
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                      isActive ? 'bg-amber-100 text-amber-900 font-mono' : 'text-stone-400 font-mono'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Difficulty & Search Controls */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                aria-label="Filter experiences by difficulty level"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as 'all' | ExperienceDifficulty)}
                className="text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-xl px-3 py-2 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-amber-800 cursor-pointer shadow-2xs"
              >
                <option value="all">All Difficulties</option>
                <option value="Gentle / Family">Gentle / Family</option>
                <option value="Moderate">Moderate</option>
                <option value="Challenging">Challenging</option>
              </select>
              <Layers className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Search trail, bird, village..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-stone-300 rounded-xl placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-800 shadow-2xs"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear experience search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Context Filter Feedback */}
        {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
          <div className="flex items-center justify-between text-xs text-stone-500 bg-amber-50/60 border border-amber-200/60 px-3.5 py-2 rounded-xl">
            <div className="flex items-center gap-2">
              <span>Showing {filteredList.length} of {LOCAL_EXPERIENCES.length} experiences</span>
              {searchQuery && (
                <>
                  <span>·</span>
                  <span>Query: &ldquo;{searchQuery}&rdquo;</span>
                </>
              )}
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDifficulty('all');
                setSearchQuery('');
              }}
              className="text-amber-800 hover:text-amber-950 font-semibold cursor-pointer underline text-[11px]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* 3. Experiences Cards Grid */}
      {filteredList.length === 0 ? (
        <div className="bg-stone-50 rounded-2xl border border-dashed border-stone-300 p-12 text-center space-y-3">
          <Compass className="w-8 h-8 text-stone-400 mx-auto" />
          <h3 className="text-base font-bold text-stone-800 font-serif">No Experiences Match Your Filter</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Try adjusting your search terms or clearing the category and difficulty filter to view all 10 curated local adventures.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedDifficulty('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
          >
            Show All Experiences
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map((exp) => {
            const isTrekking = exp.category === 'trekking';
            const isCultural = exp.category === 'cultural';

            return (
              <div
                key={exp.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-300"
              >
                <div>
                  {/* Card Visual Hero */}
                  <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    />
                    {/* Top overlay unboxed metadata bar */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      <span className="bg-stone-900/85 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-2xs">
                        {isTrekking ? 'Curated Trek' : isCultural ? 'Cultural Village' : 'Bird Sanctuary'}
                      </span>
                      <span className="bg-white/95 backdrop-blur-xs text-stone-900 text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-2xs font-mono">
                        {exp.difficulty}
                      </span>
                    </div>

                    {/* Bottom distance anchor */}
                    <div className="absolute bottom-2 left-2.5 bg-stone-900/80 backdrop-blur-xs text-stone-200 text-[11px] px-2 py-0.5 rounded-md flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>{exp.distanceFromResort}</span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-5 space-y-3">
                    {/* Clean unboxed metadata: Duration · Time of Day */}
                    <div className="flex items-center gap-2 text-[11px] text-stone-500 font-mono">
                      <Clock className="w-3 h-3 text-amber-700" />
                      <span>{exp.duration}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{exp.bestSeason}</span>
                    </div>

                    <div>
                      <h3 className="font-bold text-base text-stone-900 font-serif leading-snug group-hover:text-amber-800 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                        {exp.subtitle}
                      </p>
                    </div>

                    {/* Key Highlights Checklist (Max 2 for compact card presentation) */}
                    <div className="space-y-1.5 pt-1 text-xs text-stone-700 border-t border-stone-100">
                      {exp.highlights.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Key Sightings or Crafts Tags (quiet unboxed tags) */}
                    <div className="pt-2 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] text-stone-400 uppercase font-semibold block mr-1">
                        {isCultural ? 'Crafts & Life:' : isTrekking ? 'Highlights:' : 'Key Species:'}
                      </span>
                      {exp.keySightingsOrCrafts.slice(0, 3).map((item, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 bg-stone-100 text-stone-700 rounded-md border border-stone-200/60"
                        >
                          {item}
                        </span>
                      ))}
                      {exp.keySightingsOrCrafts.length > 3 && (
                        <span className="text-[10px] text-stone-400">
                          +{exp.keySightingsOrCrafts.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0 border-t border-stone-100 mt-3 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveModalExperience(exp)}
                    className="text-xs font-semibold text-stone-700 hover:text-amber-800 transition-colors cursor-pointer flex items-center gap-1 py-1"
                  >
                    <span>View Itinerary</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleInquireExperience(exp)}
                    className="px-3.5 py-1.5 bg-amber-800 hover:bg-amber-900 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>Plan with Host</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Complimentary Gear Station & Host Concierge Card */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Complimentary Guest Field Equipment</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif">
              Everything You Need for River & Mountain Discovery
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
              Guests staying at Pahadon Ka Ghar receive complimentary access to our outdoor activity desk.
              Borrow 8x42 birding binoculars, handcrafted Kashmiri walnut walking canes, insulated samovar Kahwa flasks,
              and detailed trail maps. Our team can also arrange trusted local guides from Hariganiwan village.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2 text-stone-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>8x42 Binoculars</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>Walnut Canes</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>Kahwa Flasks</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>Local Guides</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center shrink-0">
            <a
              href={`tel:${HOTEL_INFO.phone1}`}
              className="px-5 py-3 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-center"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Guide Desk ({HOTEL_INFO.phone1})</span>
            </a>

            <a
              href="https://wa.me/919469919558?text=Hello%20Pahadon%20Ka%20Ghar%20Team,%20I%20would%20like%20to%20inquire%20about%20booking%20guided%20treks%20and%20village%20tours."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-center"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Trek Coordinator</span>
            </a>
          </div>
        </div>
      </div>

      {/* 5. Detailed Experience Modal (When user clicks 'View Itinerary') */}
      {activeModalExperience && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative aspect-16/9 overflow-hidden bg-stone-100">
              <img
                src={activeModalExperience.image}
                alt={activeModalExperience.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveModalExperience(null)}
                aria-label="Close details"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                <span className="bg-stone-900/80 px-2.5 py-1 rounded-md">
                  {activeModalExperience.location}
                </span>
                <span className="bg-amber-800/90 px-2.5 py-1 rounded-md font-semibold">
                  {activeModalExperience.difficulty}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block">
                  {activeModalExperience.category === 'trekking'
                    ? 'Curated Himalayan Trek'
                    : activeModalExperience.category === 'cultural'
                    ? 'Kashmiri Village Heritage'
                    : 'Sindh Bio-Corridor'}
                </span>
                <h3 className="text-2xl font-bold text-stone-900 font-serif mt-1">
                  {activeModalExperience.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  {activeModalExperience.subtitle}
                </p>
              </div>

              {/* Trip Key Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase font-mono">Distance</span>
                  <span className="font-semibold text-stone-800">{activeModalExperience.distanceFromResort}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase font-mono">Duration</span>
                  <span className="font-semibold text-stone-800">{activeModalExperience.duration}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase font-mono">Best Time</span>
                  <span className="font-semibold text-stone-800">{activeModalExperience.bestTimeOfDay}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase font-mono">Best Season</span>
                  <span className="font-semibold text-stone-800">{activeModalExperience.bestSeason}</span>
                </div>
              </div>

              {/* Full Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Experience Overview
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {activeModalExperience.description}
                </p>
              </div>

              {/* Highlights & Sightings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Key Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {activeModalExperience.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Gear & Amenities Included
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {activeModalExperience.gearProvided.map((g, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Shield className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Local Host Tip Box */}
              <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 text-xs space-y-1">
                <span className="font-bold text-amber-900 block font-serif">
                  Kashmiri Host Insider Advice:
                </span>
                <p className="text-amber-800 leading-relaxed">
                  {activeModalExperience.localHostTip}
                </p>
              </div>

              {/* Recommended Attire */}
              <div className="text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200/80">
                <span className="font-semibold text-stone-800">Recommended Attire: </span>
                <span>{activeModalExperience.recommendedWear}</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-stone-100">
                <button
                  onClick={() => setActiveModalExperience(null)}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => handleInquireExperience(activeModalExperience)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Reserve / Inquire with Host</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
