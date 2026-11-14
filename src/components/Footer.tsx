import React from 'react';
import {
  Mountain,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData.ts';
import { NewsletterSection } from './NewsletterSection.tsx';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenBookingModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenBookingModal }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Newsletter Subscription Component */}
        <NewsletterSection />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-700/20 border border-amber-600/30 flex items-center justify-center text-amber-400">
                <Mountain className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white font-serif tracking-tight">
                Pahadon Ka Ghar
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              {HOTEL_INFO.motto}
            </p>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              A scenic hotel, homestay and youth skill training center nestled at Hariganiwan, Kangan, Ganderbal on the Old Sonamarg Road in Jammu & Kashmir.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider">
              Explore Retreat
            </h4>
            <ul className="space-y-2">
              {[
                { id: 'home', label: 'Home Overview' },
                { id: 'rooms', label: 'Rooms, Suites & Tents' },
                { id: 'services', label: 'Our Services' },
                { id: 'dining', label: 'Kashmiri Wazwan & Kahwa' },
                { id: 'experiences', label: 'Local Experiences & Treks' },
                { id: 'attractions', label: 'Sonamarg & Sindh River' },
                { id: 'gallery', label: 'Photo Gallery' },
                { id: 'academy', label: 'Youth Skill Academy' },
                { id: 'management', label: 'Reservation Front Desk' },
                { id: 'faq', label: 'Guest FAQs & Permits' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      if (link.id === 'faq' || link.id === 'experiences') {
                        setActiveTab('home');
                        setTimeout(() => {
                          const el = document.getElementById(link.id);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      } else {
                        setActiveTab(link.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="text-stone-400 hover:text-white transition-colors cursor-pointer text-xs"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Dialers */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider">
              Direct Contact
            </h4>
            <div className="space-y-2 text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{HOTEL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`tel:${HOTEL_INFO.phone1}`} className="hover:text-white transition-colors">
                  {HOTEL_INFO.phone1}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`tel:${HOTEL_INFO.phone2}`} className="hover:text-white transition-colors">
                  {HOTEL_INFO.phone2}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-white transition-colors truncate">
                  {HOTEL_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`mailto:${HOTEL_INFO.secondaryEmail}`} className="hover:text-white transition-colors truncate">
                  {HOTEL_INFO.secondaryEmail}
                </a>
              </div>
              <div className="pt-1">
                <a
                  href={HOTEL_INFO.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-xs font-medium"
                >
                  <span>Google Maps Location Pin</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Booking & Hours */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase text-[11px] tracking-wider">
              Reservations & Hours
            </h4>
            <div className="space-y-2 text-stone-400 text-xs">
              <p>Check-in: <span className="text-white">12:00 PM</span></p>
              <p>Check-out: <span className="text-white">11:00 AM</span></p>
              <p>Front Desk: <span className="text-white">24/7 Available</span></p>
              <p>Dining Hall: <span className="text-white">7:00 AM – 10:30 PM</span></p>
              <div className="pt-2">
                <button
                  onClick={onOpenBookingModal}
                  className="w-full py-2 bg-amber-800 hover:bg-amber-700 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Instant Direct Booking
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 mt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Hotel Pahadon Ka Ghar. All rights reserved.</span>
            <span>·</span>
            <span>Ganderbal, Kashmir</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/919469919558"
              target="_blank"
              rel="noreferrer"
              className="hover:text-stone-300 flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp Concierge</span>
            </a>
            <button
              onClick={() => {
                setActiveTab('management');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-stone-300 cursor-pointer"
            >
              Staff Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
