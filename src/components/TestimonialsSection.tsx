import React, { useState, useMemo, useEffect } from 'react';
import {
  Star,
  Quote,
  ShieldCheck,
  ThumbsUp,
  BedDouble,
  PenLine,
  X,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Testimonial } from '../types/hotel.ts';
import { TESTIMONIALS_DATA } from '../data/hotelData.ts';

const LOCAL_STORAGE_REVIEWS_KEY = 'pkg_custom_guest_reviews';

interface TestimonialsSectionProps {
  onOpenBookingModal?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onOpenBookingModal,
}) => {
  const [reviews, setReviews] = useState<Testimonial[]>(TESTIMONIALS_DATA);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [starFilter, setStarFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [helpfulLiked, setHelpfulLiked] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form state for writing a review
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newRole, setNewRole] = useState('Family Traveller');
  const [newCategory, setNewCategory] = useState<'family' | 'couple' | 'adventure' | 'solo'>('family');
  const [newRating, setNewRating] = useState<number>(5);
  const [newHoverRating, setNewHoverRating] = useState<number>(0);
  const [newRoom, setNewRoom] = useState('Deluxe Mountain View Room');
  const [newReviewText, setNewReviewText] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // Load any submitted reviews from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Testimonial[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge unique reviews
          const customIds = new Set(parsed.map((p) => p.id));
          const base = TESTIMONIALS_DATA.filter((t) => !customIds.has(t.id));
          setReviews([...parsed, ...base]);
        }
      }
    } catch {
      // fallback to initial
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleHelpful = (id: string) => {
    const isCurrentlyLiked = !!helpfulLiked[id];
    setHelpfulLiked((prev) => ({ ...prev, [id]: !isCurrentlyLiked }));

    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const currentCount = r.helpfulCount || 0;
          return {
            ...r,
            helpfulCount: isCurrentlyLiked ? Math.max(0, currentCount - 1) : currentCount + 1,
          };
        }
        return r;
      })
    );

    if (!isCurrentlyLiked) {
      showToast('Thank you! Marked this review as helpful.');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newCity.trim() || !newReviewText.trim()) {
      setFormError('Please fill in your name, city, and a few words about your stay.');
      return;
    }

    const createdReview: Testimonial = {
      id: `review-custom-${Date.now()}`,
      author: newAuthor.trim(),
      role: newRole,
      city: newCity.trim(),
      rating: newRating,
      date: 'Recent Guest (Verified)',
      reviewText: newReviewText.trim(),
      stayDetails: `Stayed in ${newRoom}`,
      verifiedStay: true,
      avatarColor: 'bg-amber-800',
      travelCategory: newCategory,
      helpfulCount: 1,
      subRatings: {
        cleanliness: newRating,
        hospitality: 5,
        location: 5,
        food: 5,
      },
    };

    const updated = [createdReview, ...reviews];
    setReviews(updated);

    try {
      const storedCustom = JSON.parse(localStorage.getItem(LOCAL_STORAGE_REVIEWS_KEY) || '[]');
      localStorage.setItem(
        LOCAL_STORAGE_REVIEWS_KEY,
        JSON.stringify([createdReview, ...storedCustom])
      );
    } catch {
      // Ignore storage errors
    }

    setIsModalOpen(false);
    setNewAuthor('');
    setNewCity('');
    setNewReviewText('');
    setNewRating(5);
    setFormError(null);
    showToast('Your review has been published! Thank you for sharing your experience.');
  };

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      // Category filter
      if (activeCategory !== 'all' && r.travelCategory !== activeCategory) {
        return false;
      }
      // Star filter
      if (starFilter !== 'all' && r.rating !== starFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesAuthor = r.author.toLowerCase().includes(q);
        const matchesCity = r.city.toLowerCase().includes(q);
        const matchesText = r.reviewText.toLowerCase().includes(q);
        const matchesStay = r.stayDetails.toLowerCase().includes(q);
        return matchesAuthor || matchesCity || matchesText || matchesStay;
      }
      return true;
    });
  }, [reviews, activeCategory, starFilter, searchQuery]);

  const ratingDescriptions: Record<number, string> = {
    5: 'Exceptional Mountain Stay (5/5)',
    4: 'Very Good Experience (4/5)',
    3: 'Average (3/5)',
    2: 'Needs Improvement (2/5)',
    1: 'Disappointing (1/5)',
  };

  return (
    <div className="space-y-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl border border-stone-700 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200/80 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
            <Quote className="w-3.5 h-3.5" />
            <span>Guest Experiences & Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif leading-tight">
            Loved by Travellers Across Kashmir
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
            Read honest feedback from couples, families, alpine trekkers, and photographers who made
            Pahadon Ka Ghar their serene sanctuary along the Sindh River.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <PenLine className="w-3.5 h-3.5" />
            <span>Write a Guest Review</span>
          </button>
        </div>
      </div>

      {/* Trust & Aggregate Rating Scorecard */}
      <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Score Block */}
          <div className="lg:col-span-4 text-center lg:text-left space-y-3 lg:border-r lg:border-stone-200 lg:pr-8">
            <div className="inline-flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-bold font-serif text-stone-900">4.9</span>
              <span className="text-stone-400 font-mono text-sm">/ 5.0</span>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <div className="space-y-0.5">
              <span className="font-semibold text-stone-900 text-sm block">
                Exceptional Guest Hospitality
              </span>
              <span className="text-xs text-stone-500 block">
                Based on 380+ verified direct, Google, and OTA guest reviews
              </span>
            </div>

            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-[11px] text-stone-600">
              <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-stone-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                100% Genuine Stays
              </span>
              <span className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-stone-200">
                <Sparkles className="w-3 h-3 text-amber-600" />
                Top Rated in Kangan
              </span>
            </div>
          </div>

          {/* Sub-Aspects Rating Grid */}
          <div className="lg:col-span-8 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Guest Experience Breakdown
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-stone-700">Kashmiri Hospitality & Warmth</span>
                  <span className="font-bold text-stone-900">5.0 / 5</span>
                </div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-800 h-full rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-stone-700">Mountain & River Views</span>
                  <span className="font-bold text-stone-900">5.0 / 5</span>
                </div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-800 h-full rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-stone-700">Room Cleanliness & Warmth</span>
                  <span className="font-bold text-stone-900">4.9 / 5</span>
                </div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-800 h-full rounded-full" style={{ width: '98%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-stone-700">Authentic Wazwan & Breakfast</span>
                  <span className="font-bold text-stone-900">4.9 / 5</span>
                </div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-800 h-full rounded-full" style={{ width: '97%' }} />
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs text-stone-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Electric bed warmers in all rooms
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                24/7 instant hot geysers
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Fresh Kahwa welcome
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'family', label: 'Families' },
            { id: 'couple', label: 'Couples' },
            { id: 'adventure', label: 'Trekkers & Explorers' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-800 text-white'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Star Filter & Search */}
        <div className="flex items-center gap-2">
          <select
            value={starFilter}
            onChange={(e) =>
              setStarFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
            aria-label="Filter reviews by star rating"
            className="px-3 py-1.5 bg-white border border-stone-200 text-xs rounded-lg text-stone-700 focus:outline-none focus:ring-1 focus:ring-amber-700 cursor-pointer"
          >
            <option value="all">All Star Ratings</option>
            <option value="5">5 Stars Only</option>
            <option value="4">4 Stars</option>
          </select>

          <input
            type="text"
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1.5 bg-white border border-stone-200 text-xs rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-700 w-36 sm:w-44"
          />
        </div>
      </div>

      {/* Reviews Cards Grid */}
      {filteredReviews.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
          <Quote className="w-8 h-8 text-stone-300 mx-auto" />
          <p className="text-sm text-stone-600 font-medium">No reviews match your current filter.</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setStarFilter('all');
              setSearchQuery('');
            }}
            className="text-xs text-amber-800 font-semibold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => {
            const isHelpful = !!helpfulLiked[rev.id];
            const authorInitials = rev.author
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase();

            return (
              <div
                key={rev.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Card Top: Rating Stars + Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= rev.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-stone-200 text-stone-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-stone-900 font-mono">
                        {rev.rating}.0
                      </span>
                    </div>

                    <span className="text-[11px] text-stone-400">{rev.date}</span>
                  </div>

                  {/* Review Text */}
                  <div className="relative">
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                      "{rev.reviewText}"
                    </p>
                  </div>

                  {/* Stay Details Chip */}
                  <div className="flex items-center gap-1.5 text-[11px] text-amber-900/90 bg-amber-50/80 px-2.5 py-1 rounded-md border border-amber-200/50">
                    <BedDouble className="w-3 h-3 text-amber-800 shrink-0" />
                    <span className="truncate">{rev.stayDetails}</span>
                  </div>

                  {/* Sub-ratings breakdown if present */}
                  {rev.subRatings && (
                    <div className="grid grid-cols-3 gap-1 pt-1 border-t border-stone-100 text-[10px] text-stone-500">
                      <div>
                        <span>Clean: </span>
                        <strong className="text-stone-700">{rev.subRatings.cleanliness}/5</strong>
                      </div>
                      <div>
                        <span>Host: </span>
                        <strong className="text-stone-700">{rev.subRatings.hospitality}/5</strong>
                      </div>
                      <div>
                        <span>Views: </span>
                        <strong className="text-stone-700">{rev.subRatings.location}/5</strong>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer: Author + Helpful Button */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-full ${
                        rev.avatarColor || 'bg-amber-800'
                      } text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs`}
                    >
                      {authorInitials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-xs text-stone-900 truncate">
                          {rev.author}
                        </span>
                        {rev.verifiedStay && (
                          <span title="Verified Stay" className="inline-flex">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-stone-500 block truncate">
                        {rev.city} · {rev.role}
                      </span>
                    </div>
                  </div>

                  {/* Helpful Button */}
                  <button
                    onClick={() => handleToggleHelpful(rev.id)}
                    className={`flex items-center gap-1 text-[11px] px-2 py-1 rounded-md transition-colors cursor-pointer shrink-0 ${
                      isHelpful
                        ? 'bg-amber-100 text-amber-900 font-semibold'
                        : 'text-stone-400 hover:text-stone-700 hover:bg-stone-50'
                    }`}
                    title="Mark review as helpful"
                  >
                    <ThumbsUp className={`w-3 h-3 ${isHelpful ? 'fill-amber-900' : ''}`} />
                    <span>{rev.helpfulCount || 0}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <h3 className="text-xl font-bold font-serif text-stone-900">
                  Share Your Kashmiri Stay Experience
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Your feedback helps other travelers find their mountain retreat.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddReview} className="space-y-4 text-xs">
              {/* Interactive Star Rating Selector */}
              <div className="space-y-1.5 bg-amber-50/60 p-4 rounded-2xl border border-amber-200/60">
                <label className="font-semibold text-stone-900 block">
                  Overall Star Rating:
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        onMouseEnter={() => setNewHoverRating(star)}
                        onMouseLeave={() => setNewHoverRating(0)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= (newHoverRating || newRating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-stone-200 text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="font-bold text-amber-900 ml-2">
                    {ratingDescriptions[newHoverRating || newRating]}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">Your City / Country *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bangalore, India"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">Travel Group / Role</label>
                  <select
                    value={newCategory}
                    onChange={(e) => {
                      const cat = e.target.value as 'family' | 'couple' | 'adventure' | 'solo';
                      setNewCategory(cat);
                      if (cat === 'family') setNewRole('Family Holiday');
                      else if (cat === 'couple') setNewRole('Couples Vacation');
                      else if (cat === 'adventure') setNewRole('Trekker / Explorer');
                      else setNewRole('Solo Traveler');
                    }}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs cursor-pointer"
                  >
                    <option value="family">Family Holiday</option>
                    <option value="couple">Couples / Honeymoon</option>
                    <option value="adventure">Trekkers / Adventure</option>
                    <option value="solo">Solo / Remote Work</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">Room Stayed In</label>
                  <select
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs cursor-pointer"
                  >
                    <option value="Deluxe Mountain View Room">Deluxe Mountain View Room</option>
                    <option value="Sindh Valley Balcony Suite">Sindh Valley Balcony Suite</option>
                    <option value="Luxury Family 2-Bedroom Suite">Luxury Family 2-Bedroom Suite</option>
                    <option value="Alpine Garden Glamping Stay">Alpine Garden Glamping Stay</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700">
                  Your Review & Mountain Memories *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details about the hosts, hospitality, food, Sindh river proximity, heating comfort, or views..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer"
                >
                  Publish Guest Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
