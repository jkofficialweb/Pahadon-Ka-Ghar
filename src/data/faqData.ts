export interface FAQItem {
  id: string;
  category: 'permits' | 'safety' | 'policies' | 'dining_travel';
  categoryLabel: string;
  question: string;
  answer: string;
  highlights?: string[];
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-permits-1',
    category: 'permits',
    categoryLabel: 'Permits & Travel Guidelines',
    question: 'Do Indian or foreign tourists require an Inner Line Permit (ILP) to visit Hariganiwan or Sonamarg?',
    answer:
      'No special permit or Inner Line Permit (ILP) is required for Indian citizens or international travelers to stay at Hotel Pahadon Ka Ghar or explore the Sindh Valley, Kangan, and Sonamarg. You only need a valid government-issued photo ID (Aadhaar card, Passport, Voter ID, or Driver’s License) for standard hotel check-in compliance.',
    highlights: [
      'No permit needed for Hariganiwan, Kangan, or Sonamarg',
      'Valid Government Photo ID required at check-in',
      'Foreign passport holders register standard C-Form at front desk',
    ],
  },
  {
    id: 'faq-permits-2',
    category: 'permits',
    categoryLabel: 'Permits & Travel Guidelines',
    question: 'Are there any restrictions for traveling onward to Zojila Pass, Baltal, or Ladakh?',
    answer:
      'The highway from Srinagar through Hariganiwan to Sonamarg is open for leisure tourism throughout the year (with winter snow-clearing operations). If traveling onwards past Baltal over the high-altitude Zojila Pass into Kargil/Ladakh, vehicle movement is regulated by one-way convoy timings issued daily by the traffic authorities. Our front desk concierge checks live traffic advisories each morning and advises you on the best departure window.',
    highlights: [
      'No inner line permit required for Baltal or Sindh valley excursions',
      'Daily morning traffic status updates for Zojila Pass',
      'Special route guidelines during the annual Amarnath Yatra season',
    ],
  },
  {
    id: 'faq-safety-1',
    category: 'safety',
    categoryLabel: 'Mountain Safety & Altitude',
    question: 'What is the altitude of Hariganiwan, and do we need to worry about altitude sickness (AMS)?',
    answer:
      'Pahadon Ka Ghar is located at an altitude of 2,100 meters (6,890 feet) in Hariganiwan. At this moderate elevation, Acute Mountain Sickness (AMS) is virtually nonexistent for most travelers. It offers a gentle stepping stone before visiting Sonamarg (2,740 m) or Thajiwas Glacier. We always recommend drinking plenty of fresh water and enjoying hot ginger-saffron Kahwa to stay comfortably hydrated.',
    highlights: [
      'Moderate 2,100 m elevation — safe and comfortable for all ages',
      'Ideal acclimatization stop between Srinagar (1,585m) and Ladakh (3,500m)',
      'First-aid kit and emergency medical support available 24/7',
    ],
  },
  {
    id: 'faq-safety-2',
    category: 'safety',
    categoryLabel: 'Mountain Safety & Altitude',
    question: 'How cold does it get at night, and what heating amenities are provided in the rooms?',
    answer:
      'Due to Himalayan katabatic winds and Sindh River breezes, temperatures drop substantially in the evening even during summer. To ensure supreme guest comfort, all rooms at Pahadon Ka Ghar are equipped with electric heated bed blankets, thick thermal quilts, insulated double-glazed windows, and 24/7 instant hot water geysers. During colder autumn and winter months, additional electric radiant heaters are activated.',
    highlights: [
      'Electric heated bed warmers in every suite & tent',
      'Instant 24/7 hot water geysers in all bathrooms',
      'Cozy pine & cedar wood acoustic wall insulation',
    ],
  },
  {
    id: 'faq-safety-3',
    category: 'safety',
    categoryLabel: 'Mountain Safety & Altitude',
    question: 'Is it safe to walk to the Sindh River, and can children play by the riverbank?',
    answer:
      'The Sindh River (Nallah Sindh) is just a 350-meter gentle walk through peaceful village paths and walnut groves. The riverside pebble banks are wonderful for photography, meditation, and picnics. However, because the glacial river flows rapidly with strong currents and freezing temperatures, stepping deep into the water, wading, or swimming is strictly prohibited. Children must always be accompanied by adults near the water.',
    highlights: [
      '350 meters easy walk through scenic village trails',
      'Beautiful pebble banks for morning photography',
      'Swift glacial current — swimming is strictly prohibited',
    ],
  },
  {
    id: 'faq-policies-1',
    category: 'policies',
    categoryLabel: 'Check-In & Stay Policies',
    question: 'What are the check-in and check-out times, and can we request early check-in or late check-out?',
    answer:
      'Standard check-in begins at 12:00 PM (Noon), and check-out is at 11:00 AM. If you arrive early from an early flight into Srinagar Airport (55 km away), complimentary early luggage storage is provided, and you are welcome to relax in our scenic garden tea lounge with fresh Saffron Kahwa. Early room check-in is granted free of charge subject to room availability.',
    highlights: [
      'Check-in: 12:00 PM | Check-out: 11:00 AM',
      'Complimentary early luggage storage & garden lounge access',
      'Priority room handover for early arrivals when available',
    ],
  },
  {
    id: 'faq-policies-2',
    category: 'policies',
    categoryLabel: 'Check-In & Stay Policies',
    question: 'What payment methods do you accept, and is direct booking guaranteed?',
    answer:
      'We accept all major UPI platforms (Google Pay, PhonePe, Paytm, BHIM), Indian & international credit/debit cards, and cash. When you book directly via our online booking engine or phone, you receive zero surcharge rates, instant voucher generation with SMS/WhatsApp confirmation, and a guaranteed best rate promise with no hidden OTA booking markups.',
    highlights: [
      'Zero booking surcharge on direct website reservations',
      'Accepts UPI, Credit/Debit Cards, Net Banking & Cash',
      'Flexible cancellation policy up to 48 hours before arrival',
    ],
  },
  {
    id: 'faq-policies-3',
    category: 'policies',
    categoryLabel: 'Check-In & Stay Policies',
    question: 'Is there on-site private parking for self-drive cars, SUVs, and traveler vans?',
    answer:
      'Yes! Pahadon Ka Ghar has a spacious, secure, gated private parking area on the property grounds directly off the Old Sonamarg Road. Parking is completely free for all staying guests and can easily accommodate sedans, 4x4 SUVs, and tempo traveler vans. There is also dedicated driver washroom facilities on site.',
    highlights: [
      'Free, secure on-site gated parking',
      'Direct easy driveway off Old Sonamarg Road',
      'Driver resting washroom amenities available',
    ],
  },
  {
    id: 'faq-dining-1',
    category: 'dining_travel',
    categoryLabel: 'Dining & Excursion Desk',
    question: 'Is authentic Kashmiri Wazwan available daily, and can you cater to pure vegetarians?',
    answer:
      'Yes! Our master Kashmiri waza prepares both traditional non-vegetarian Wazwan (Rogan Josh, Gushtaba, Royal Rista) and beloved vegetarian Kashmiri specialties (Dum Aloo, Kashmiri Pulao, Paneer Chaman, Nadru Yakhni, and fresh Girda/Lavasa breads). We maintain strictly segregated cooking cookware and utensils for vegetarian preparation. We recommend requesting specialty multi-course Wazwan 2 hours ahead so it can be slow-steamed to perfection.',
    highlights: [
      'Authentic Wazwan prepared by skilled local wazas',
      'Strictly segregated vegetarian cooking cookware',
      'Fresh Noon Chai, Saffron Kahwa, and tandoor bread daily',
    ],
  },
  {
    id: 'faq-dining-2',
    category: 'dining_travel',
    categoryLabel: 'Dining & Excursion Desk',
    question: 'Can the hotel arrange trusted cabs, airport pickup, and Thajiwas pony rides at honest rates?',
    answer:
      'Absolutely. One of the greatest benefits of staying at Pahadon Ka Ghar is our direct connection with verified local drivers and registered pony owners in Kangan and Sonamarg. We organize reliable airport pickups from Srinagar (55 km), day tours to Thajiwas Glacier and Baltal, and pony rides at official union-approved non-inflated prices, protecting you from aggressive commercial middlemen.',
    highlights: [
      'Fixed-rate Srinagar airport transfers and local cabs',
      'Licensed, trustworthy pony guides for Thajiwas Glacier',
      'Customized 1-day, 2-day, and 3-day Sindh valley itineraries',
    ],
  },
];
