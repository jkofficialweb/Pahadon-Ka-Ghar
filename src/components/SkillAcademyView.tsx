import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  CheckCircle2,
  Send,
  Target,
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  TRAINING_COURSES,
  SKILL_OBJECTIVES,
  SKILL_VISION,
} from '../data/hotelData.ts';
import { TRAINING_PHOTOS } from '../data/galleryData.ts';
import { getAssetUrl } from '../utils/assets.ts';

export const SkillAcademyView: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<'student' | 'institute' | 'partner'>('student');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % TRAINING_PHOTOS.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + TRAINING_PHOTOS.length) % TRAINING_PHOTOS.length
        );
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          <span>Social Mission & Youth Empowerment in J&K</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
          Hospitality Skill Development & Training Center
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed">
          Pahadon Ka Ghar is dedicated to developing sustainable tourism in Jammu & Kashmir. We provide practical, industry-based hospitality training, job placements, and homestay entrepreneurship mentoring for local youth and women.
        </p>
      </div>

      {/* Vision & Objectives Split Banner */}
      <div className="bg-amber-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="text-xs text-amber-300 uppercase tracking-wider font-semibold">
            Our Core Vision
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif leading-tight">
            &ldquo;{SKILL_VISION}&rdquo;
          </h2>
          <p className="text-amber-100 text-xs sm:text-sm leading-relaxed">
            By connecting real hotel operations with practical classroom instruction, trainees gain direct hands-on experience in cooking, customer service, housekeeping, and mountain tour management.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-amber-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Industry-Based Training</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Local Youth Employment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Women Empowerment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Homestay Business Incubation</span>
            </div>
          </div>
        </div>

        {/* Real Classroom & Trainees Photos */}
        <div className="space-y-3">
          <div className="aspect-16/10 rounded-2xl overflow-hidden bg-amber-950 border border-amber-800 shadow-md">
            <img
              src={getAssetUrl('assets/aistudio/IMG-20261114-WA0022_a79d0f9f.jpg')}
              alt="Practical hospitality training batch at Pahadon Ka Ghar"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-[11px] text-amber-200 text-center italic">
            Real practical hospitality & culinary sessions hosted at Pahadon Ka Ghar
          </div>
        </div>
      </div>

      {/* Our Objectives Section */}
      <section aria-labelledby="skill-objectives-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
              <Target className="w-4 h-4" />
              <span>Training & Empowerment Charter</span>
            </div>
            <h2
              id="skill-objectives-heading"
              className="text-2xl font-bold text-stone-900 font-serif mt-1"
            >
              Our Objectives
            </h2>
          </div>
          <span className="text-xs text-stone-500">
            Hospitality Skill Development & Sustainable Tourism
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_OBJECTIVES.map((obj) => (
            <div
              key={obj.number}
              className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-xs space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-xs font-bold font-mono tabular-nums text-amber-800 tracking-wider block">
                  OBJECTIVE {obj.number}
                </span>
                <h3 className="font-bold text-base text-stone-900 font-serif leading-snug">
                  {obj.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {obj.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Training Courses Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-stone-900 font-serif">
            Vocational Training Curricula
          </h2>
          <span className="text-xs text-stone-500">Government & Industry Aligned</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TRAINING_COURSES.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-6 space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
                    {course.category}
                  </span>
                  <h3 className="font-bold text-lg text-stone-900 font-serif mt-1">
                    {course.title}
                  </h3>
                </div>
                <span className="text-xs font-mono font-medium text-stone-600 bg-stone-100 px-2.5 py-1 rounded-md shrink-0">
                  {course.duration}
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {course.description}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-stone-100">
                <span className="text-[11px] font-semibold text-stone-700 block">Core Modules Covered:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-600">
                  {course.topics.map((topic, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Intake: {course.intakeCapacity} Students per batch</span>
                <span className="font-semibold text-emerald-700">100% Practical Internship</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real Training Photos Gallery (All 13 authentic Skill Academy photos) */}
      <section aria-labelledby="training-photos-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
              <Camera className="w-4 h-4" />
              <span>Hands-On Hospitality Workshops</span>
            </div>
            <h2
              id="training-photos-heading"
              className="text-2xl font-bold text-stone-900 font-serif mt-1"
            >
              Practical Training &amp; Workshop Gallery
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-mono tabular-nums">
            {TRAINING_PHOTOS.length} authentic training photographs
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {TRAINING_PHOTOS.map((photo, idx) => (
            <button
              type="button"
              key={photo.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative text-left rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-2xs hover:shadow-lg transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-200">
                <img
                  src={photo.image}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/15 to-transparent" />
                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-stone-950/60 border border-white/15 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
                <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                  <span className="text-[11px] font-medium text-amber-300 block truncate">
                    {photo.location}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold font-serif leading-snug line-clamp-2">
                    {photo.title}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Inquiry & Partnership Form */}
      <div className="bg-stone-50 rounded-3xl p-8 sm:p-10 border border-stone-200 max-w-3xl mx-auto shadow-xs">
        <div className="text-center space-y-2 mb-6">
          <h3 className="text-xl font-bold text-stone-900 font-serif">
            Student Admissions & Institutional Partnerships
          </h3>
          <p className="text-xs text-stone-600">
            Interested in enrolling, conducting group training, or partnering as a tour operator or government skill partner? Send us your inquiry.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-stone-900 text-base">Inquiry Submitted Successfully</h4>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Thank you, {inquiryName}. Our skill program coordinator will contact you at {inquiryPhone} with course details and admission requirements.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  value={inquiryPhone}
                  onChange={(e) => setInquiryPhone(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">I am a...</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'student', label: 'Local Youth / Student' },
                  { id: 'institute', label: 'Training Institute / College' },
                  { id: 'partner', label: 'Tour Partner / NGO' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setInquiryType(item.id as 'student' | 'institute' | 'partner')}
                    className={`py-2 px-2 text-[11px] rounded-xl border text-center font-medium cursor-pointer transition-colors ${
                      inquiryType === item.id
                        ? 'bg-amber-800 text-white border-amber-800'
                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Message or Course of Interest</label>
              <textarea
                rows={3}
                placeholder="Let us know what course or collaboration you are seeking..."
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            <div className="pt-2 text-center">
              <button
                type="submit"
                className="px-6 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Training Inquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Training Gallery Lightbox */}
      {lightboxIndex !== null && TRAINING_PHOTOS[lightboxIndex] && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl flex flex-col max-h-[92vh]"
          >
            <div className="px-5 py-3.5 bg-stone-950/80 border-b border-stone-800 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-amber-400 font-semibold">Skill Academy Training</span>
                <span className="text-stone-600">·</span>
                <span className="text-stone-400 font-mono tabular-nums text-[11px]">
                  {lightboxIndex + 1} of {TRAINING_PHOTOS.length}
                </span>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                aria-label="Close training photo preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px]">
              <img
                src={TRAINING_PHOTOS[lightboxIndex].image}
                alt={TRAINING_PHOTOS[lightboxIndex].title}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto max-w-full object-contain select-none"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (lightboxIndex - 1 + TRAINING_PHOTOS.length) % TRAINING_PHOTOS.length
                  );
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-stone-900/75 border border-white/20 text-white flex items-center justify-center hover:bg-stone-900 transition-colors cursor-pointer"
                aria-label="Previous training photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex + 1) % TRAINING_PHOTOS.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-stone-900/75 border border-white/20 text-white flex items-center justify-center hover:bg-stone-900 transition-colors cursor-pointer"
                aria-label="Next training photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 bg-stone-950 text-white space-y-1 shrink-0">
              <h3 className="font-bold text-base font-serif text-white">
                {TRAINING_PHOTOS[lightboxIndex].title}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {TRAINING_PHOTOS[lightboxIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
