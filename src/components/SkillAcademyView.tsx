import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Briefcase,
  HeartHandshake,
  CheckCircle2,
  Send,
  Building,
} from 'lucide-react';
import { TRAINING_COURSES, HOTEL_INFO } from '../data/hotelData.ts';

export const SkillAcademyView: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<'student' | 'institute' | 'partner'>('student');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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
            "To develop Hotel Pahadon Ka Ghar as a centre for hospitality learning, practical training and sustainable tourism development in Jammu & Kashmir."
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
              src="/assets/hotel/real_training_class.jpg"
              alt="Practical hospitality training at Pahadon Ka Ghar"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-[11px] text-amber-200 text-center italic">
            Real practical hospitality & culinary sessions hosted at Pahadon Ka Ghar
          </div>
        </div>
      </div>

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
                    onClick={() => setInquiryType(item.id as any)}
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
    </div>
  );
};
