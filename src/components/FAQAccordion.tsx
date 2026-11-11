import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  HelpCircle,
  Search,
  CheckCircle2,
  FileText,
  Mountain,
  Clock,
  UtensilsCrossed,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { FAQ_ITEMS, FAQItem } from '../data/faqData.ts';
import { filterFAQs } from '../utils/faqHelper.ts';
import { HOTEL_INFO } from '../data/hotelData.ts';

const CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'permits', label: 'Permits & Travel Guidelines' },
  { id: 'safety', label: 'Mountain Safety & Altitude' },
  { id: 'policies', label: 'Check-In & Stay Policies' },
  { id: 'dining_travel', label: 'Dining & Excursion Desk' },
];

export const FAQAccordion: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  // Set initial open items: first permit item and first safety item open by default
  const [openItemIds, setOpenItemIds] = useState<Set<string>>(
    new Set(['faq-permits-1', 'faq-safety-2'])
  );

  const toggleItem = (id: string) => {
    setOpenItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenItemIds(new Set(FAQ_ITEMS.map((item) => item.id)));
  };

  const collapseAll = () => {
    setOpenItemIds(new Set());
  };

  const filteredItems = useMemo(() => {
    return filterFAQs(FAQ_ITEMS, activeCategory, searchQuery);
  }, [activeCategory, searchQuery]);

  const getCategoryIcon = (category: FAQItem['category']) => {
    switch (category) {
      case 'permits':
        return <FileText className="w-3.5 h-3.5 text-amber-700" />;
      case 'safety':
        return <Mountain className="w-3.5 h-3.5 text-emerald-700" />;
      case 'policies':
        return <Clock className="w-3.5 h-3.5 text-blue-700" />;
      case 'dining_travel':
        return <UtensilsCrossed className="w-3.5 h-3.5 text-amber-800" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200/80 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Essential Guest Information</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
            Clear guidelines on Kashmir travel permits, mountain altitude comfort, heating
            provisions, river safety, and hassle-free hotel check-in policies.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs shrink-0">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-lg transition-colors cursor-pointer"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-lg transition-colors cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative shrink-0">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search permits, heating, safety..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-3.5 py-1.5 bg-white border border-stone-200 text-xs rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-700 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Accordion List */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
          <HelpCircle className="w-8 h-8 text-stone-300 mx-auto" />
          <p className="text-sm text-stone-600 font-medium">
            No questions match "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="text-xs text-amber-800 font-semibold hover:underline cursor-pointer"
          >
            Clear Search & Show All FAQs
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const isOpen = openItemIds.has(item.id);
            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-amber-700/40 shadow-xs'
                    : 'border-stone-200/90 hover:border-stone-300'
                }`}
              >
                {/* Accordion Trigger Button */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="space-y-1.5 pr-2">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-stone-500">
                      {getCategoryIcon(item.category)}
                      <span>{item.categoryLabel}</span>
                    </div>
                    <h3
                      className={`text-sm sm:text-base font-bold font-serif transition-colors ${
                        isOpen ? 'text-amber-900' : 'text-stone-900'
                      }`}
                    >
                      {item.question}
                    </h3>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-amber-100 text-amber-900 rotate-180'
                        : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs text-stone-700 space-y-3 border-t border-stone-100 bg-stone-50/40">
                    <p className="leading-relaxed text-xs sm:text-sm text-stone-600">
                      {item.answer}
                    </p>

                    {item.highlights && item.highlights.length > 0 && (
                      <div className="bg-white p-3.5 rounded-xl border border-stone-200/70 space-y-1.5">
                        <span className="font-bold text-[11px] text-stone-800 uppercase tracking-wider block">
                          Key Takeaways
                        </span>
                        <ul className="space-y-1">
                          {item.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2 text-stone-600">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Direct Contact Banner */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-bold text-amber-900 block">
            Have a Specific Travel Query?
          </span>
          <p className="text-xs text-stone-600">
            Our Kashmiri hosts are on-site 24/7 to answer road status, cab bookings, or Wazwan
            dietary needs.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <a
            href={`tel:${HOTEL_INFO.phone1}`}
            className="px-4 py-2.5 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-700" />
            <span>Call: {HOTEL_INFO.phone1}</span>
          </a>
          <a
            href="https://wa.me/919469919558?text=Hello%20Pahadon%20Ka%20Ghar%20Team,%20I%20have%20a%20question%20about%20travel%20permits%20and%20stay."
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Concierge</span>
          </a>
        </div>
      </div>
    </div>
  );
};
