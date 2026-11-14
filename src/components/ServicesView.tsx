import React, { useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageCircle,
  Mail,
  BedDouble,
  Laptop,
  Compass,
  Map,
  ShieldCheck,
} from 'lucide-react';
import { SERVICES_DATA, SERVICES_COMMITMENT, HotelServiceItem } from '../data/servicesData.ts';
import { HOTEL_INFO } from '../data/hotelData.ts';

interface ServicesViewProps {
  onOpenBookingModal: (roomTypeId?: string) => void;
  onNavigateToRooms: () => void;
  onNavigateToAttractions: () => void;
  onNavigateToGallery: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  onOpenBookingModal,
  onNavigateToRooms,
  onNavigateToAttractions,
  onNavigateToGallery,
}) => {
  // Track active preview image per service card
  const [activeImages, setActiveImages] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const s of SERVICES_DATA) {
      initial[s.id] = s.primaryImage;
    }
    return initial;
  });

  const getServiceIcon = (id: HotelServiceItem['id']) => {
    switch (id) {
      case 'hotel-reservations':
        return BedDouble;
      case 'online-service':
        return Laptop;
      case 'travel-guides':
        return Compass;
      case 'domestic-tours':
        return Map;
    }
  };

  const handleServiceAction = (id: HotelServiceItem['id']) => {
    switch (id) {
      case 'hotel-reservations':
        onNavigateToRooms();
        break;
      case 'online-service':
        onOpenBookingModal();
        break;
      case 'travel-guides':
        onNavigateToAttractions();
        break;
      case 'domestic-tours':
        onOpenBookingModal();
        break;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
          <Briefcase className="w-4 h-4" />
          <span>Hospitality, Travel Assistance & Kashmir Tours</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif text-balance">
          Our Services at Hotel Pahadon Ka Ghar
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed">
          Hotel Pahadon Ka Ghar, located at Hariganiwan, Kangan, Ganderbal on the Old Sonamarg Road, offers comfortable accommodation, seamless online reservations, local travel guidance, and customised domestic tour packages for visitors exploring the Kashmir Valley.
        </p>

        {/* Quick Jump Anchors */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
          {SERVICES_DATA.map((service) => (
            <button
              key={service.id}
              onClick={() => {
                const el = document.getElementById(`service-${service.id}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="px-3.5 py-2 text-xs font-medium bg-white border border-stone-200 hover:border-amber-700 hover:text-amber-800 text-stone-700 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {service.number}. {service.title}
            </button>
          ))}
        </div>
      </div>

      {/* The 4 Core Services */}
      <div className="space-y-10">
        {SERVICES_DATA.map((service, index) => {
          const Icon = getServiceIcon(service.id);
          const currentImg = activeImages[service.id] || service.primaryImage;
          const activeCaption =
            service.galleryImages.find((g) => g.src === currentImg)?.caption || service.title;
          const isReversed = index % 2 === 1;

          return (
            <section
              id={`service-${service.id}`}
              key={service.id}
              className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden scroll-mt-24"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Media Showcase Column */}
                <div
                  className={`lg:col-span-6 p-5 sm:p-6 bg-stone-50/70 flex flex-col justify-between gap-3 ${
                    isReversed ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-stone-200 border border-stone-200/80">
                    <img
                      src={currentImg}
                      alt={activeCaption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent p-3.5 text-white">
                      <span className="text-xs font-medium text-stone-100">{activeCaption}</span>
                    </div>
                  </div>

                  {/* Interactive Thumbnail Strip */}
                  <div className="grid grid-cols-4 gap-2">
                    {service.galleryImages.slice(0, 8).map((img, i) => {
                      const isSelected = currentImg === img.src;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() =>
                            setActiveImages((prev) => ({ ...prev, [service.id]: img.src }))
                          }
                          aria-label={`View ${img.caption}`}
                          className={`aspect-4/3 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-stone-200 ${
                            isSelected
                              ? 'border-amber-700 shadow-xs'
                              : 'border-transparent opacity-75 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={img.src}
                            alt={img.caption}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Editorial Details Column */}
                <div
                  className={`lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 ${
                    isReversed ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5 text-xs font-semibold text-amber-800 uppercase tracking-wider">
                      <Icon className="w-4 h-4" />
                      <span>{service.number}. {service.title}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif leading-tight">
                      {service.subtitle}
                    </h2>

                    <p className="text-sm text-stone-600 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-2.5 pt-2 border-t border-stone-100">
                      {service.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleServiceAction(service.id)}
                      className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0"
                    >
                      <span>{service.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`https://wa.me/919469919558?text=${encodeURIComponent(
                        `Hello Pahadon Ka Ghar Team, I would like to inquire about ${service.title}.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp Desk</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Our Commitment & Direct Contact Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Our Commitment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif leading-tight text-balance">
            Comfortable Stays & Customised Kashmir Journeys
          </h2>
          <p className="text-sm text-stone-300 leading-relaxed">
            {SERVICES_COMMITMENT}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-stone-300">
            <span className="font-semibold text-amber-300">Booking Partners:</span>
            <span>Booking.com</span>
            <span aria-hidden="true">·</span>
            <span>MakeMyTrip</span>
            <span aria-hidden="true">·</span>
            <span>Goibibo</span>
            <span aria-hidden="true">·</span>
            <span>Google Hotels</span>
          </div>
        </div>

        <div className="lg:col-span-5 bg-stone-800/80 border border-stone-700 rounded-2xl p-6 space-y-4 text-xs">
          <h3 className="font-bold text-sm text-white font-serif">
            Direct Reservations & Custom Enquiries
          </h3>
          <div className="space-y-2.5 text-stone-300">
            <a
              href={`tel:${HOTEL_INFO.phone1}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{HOTEL_INFO.phone1} / {HOTEL_INFO.phone2}</span>
            </a>
            <a
              href={`mailto:${HOTEL_INFO.email}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{HOTEL_INFO.email}</span>
            </a>
            <a
              href={`mailto:${HOTEL_INFO.secondaryEmail}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{HOTEL_INFO.secondaryEmail}</span>
            </a>
          </div>
          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={() => onOpenBookingModal()}
              className="flex-1 py-2.5 px-4 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap"
            >
              Book Room Direct
            </button>
            <button
              onClick={onNavigateToGallery}
              className="py-2.5 px-4 bg-stone-700 hover:bg-stone-600 text-white font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap"
            >
              View Photo Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
