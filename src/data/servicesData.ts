import { getAssetUrl } from '../utils/assets.ts';

export interface HotelServiceItem {
  id: 'hotel-reservations' | 'online-service' | 'travel-guides' | 'domestic-tours';
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  ctaLabel: string;
  primaryImage: string;
  galleryImages: { src: string; caption: string }[];
}

export const SERVICES_COMMITMENT =
  'At Pahadon Ka Ghar, we aim to provide quality hospitality, convenient booking services and memorable travel experiences, making every guest’s journey through Kashmir comfortable, enjoyable and unforgettable.';

export const SERVICES_DATA: HotelServiceItem[] = [
  {
    id: 'hotel-reservations',
    number: '01',
    title: 'Hotel Reservations',
    subtitle: 'Mountain-Side Accommodation for Families, Couples & Groups',
    description:
      'Easy and hassle-free room booking facilities for families, couples, tourists and business travellers. Enjoy clean, comfortable accommodation with beautiful mountain views, heated bedding, 24/7 hot water, and a peaceful atmosphere on the Old Sonamarg Road.',
    highlights: [
      'Deluxe Mountain View Rooms, Balcony Suites & Luxury Family Suites',
      'Outdoor lawn Glamping Tents with bonfire access',
      'Direct reservation best tariff with zero middleman fee',
      'Complimentary morning Kashmiri Saffron Kahwa on arrival',
    ],
    ctaLabel: 'Explore Rooms & Reserve',
    primaryImage: getAssetUrl('assets/aistudio/IMG-20261114-WA0092_b0bc1e1f.jpg'),
    galleryImages: [
      {
        src: getAssetUrl('assets/aistudio/IMG-20261114-WA0092_b0bc1e1f.jpg'),
        caption: 'Mountain-view room opening to wooden balcony',
      },
      {
        src: getAssetUrl('assets/aistudio/IMG-20261114-WA0039_786bbd99.jpg'),
        caption: 'Sindh Valley Glass-Wall Balcony Suite',
      },
      {
        src: getAssetUrl('assets/aistudio/IMG-20261114-WA0044_c9edac03.jpg'),
        caption: 'Luxury Dual-Bed Family Suite',
      },
      {
        src: getAssetUrl('assets/aistudio/IMG-20261114-WA0041_6fa8f2fa.jpg'),
        caption: 'Alpine Garden Glamping Stay',
      },
    ],
  },
  {
    id: 'online-service',
    number: '02',
    title: 'Online Service',
    subtitle: 'Instant Digital Reservations, Payment & 24/7 Concierge',
    description:
      'Convenient online booking assistance, instant reservation enquiries, flexible digital payment support (UPI, cards, netbanking, or pay at hotel), travel information, and responsive guest support to make your stay smooth from inquiry to check-out.',
    highlights: [
      'Instant printable booking vouchers & PKG confirmation code',
      'Digital UPI / Card / Pay-at-Check-In payment options',
      'Listed on Booking.com, MakeMyTrip, Goibibo & Google Hotels',
      '24/7 WhatsApp & Phone Front Desk Desk Assistance',
    ],
    ctaLabel: 'Book Online Instantly',
    primaryImage: getAssetUrl('assets/aistudio/IMG-20261114-WA0091_5462735f.jpg'),
    galleryImages: [
      {
        src: getAssetUrl('assets/aistudio/IMG-20261114-WA0091_5462735f.jpg'),
        caption: '24/7 Reception Desk & Online Reservation Terminal',
      },
      {
        src: getAssetUrl('assets/aistudio/IMG-20261114-WA0115_c0a9df9c.jpg'),
        caption: 'Pahadon Ka Ghar Main Mountain Lodge',
      },
      {
        src: getAssetUrl('assets/aistudio/IMG-20261114-WA0097_d662429d.jpg'),
        caption: 'Scenic arrival courtyard and green lawns',
      },
      {
        src: getAssetUrl('assets/aistudio/IMG-20261114-WA0114_0ffb00dd.jpg'),
        caption: 'Mountain-facing balcony veranda',
      },
    ],
  },
  {
    id: 'travel-guides',
    number: '03',
    title: 'Travel Guides',
    subtitle: 'Local Kashmir Sightseeing Guidance, Treks & Transfers',
    description:
      'Get reliable local travel guidance, curated sightseeing recommendations, up-to-date information about nearby attractions, regulated cab transportation assistance, and insider host suggestions to explore Kashmir’s natural beauty safely.',
    highlights: [
      'Day excursion plans for Sonamarg, Thajiwas Glacier & Baltal',
      'Guided Hariganiwan village heritage walks & Sindh River trails',
      'Verified pony rides, trekking poles & 8x42 birding binoculars',
      'Srinagar Airport transfers & snow-chain equipped winter cabs',
    ],
    ctaLabel: 'View Travel Guide & Attractions',
    primaryImage: getAssetUrl('assets/aistudio/IMG-20261114-WA0090_0fe9c3dc.jpg'),
    galleryImages: [
      {
        src: getAssetUrl('assets/aistudio/IMG-20261114-WA0090_0fe9c3dc.jpg'),
        caption: 'Guided valley footbridge & alpine river excursion',
      },
      {
        src: getAssetUrl('assets/aistudio/IMG-20261114-WA0077_663d2018.jpg'),
        caption: 'Guided mountain pony riding trails',
      },
      {
        src: getAssetUrl('assets/aistudio/IMG-20261114-WA0080_260a524a.jpg'),
        caption: 'Guided hiking along emerald mountain slopes',
      },
      {
        src: getAssetUrl('assets/aistudio/IMG-20261114-WA0087_92d8f443.jpg'),
        caption: 'Exploring crystal Sindh Valley streams',
      },
    ],
  },
  {
    id: 'domestic-tours',
    number: '04',
    title: 'Domestic Tours',
    subtitle: 'Customised Kashmir Tour Packages Across All Major Valleys',
    description:
      'Explore Kashmir through customised domestic tour packages covering Sonamarg, Srinagar, Dal Lake, Gulmarg, Pahalgam, Mughal Gardens, and Ganderbal. Thoughtfully planned itineraries suitable for families, couples, groups, and solo travellers.',
    highlights: [
      'Sonamarg, Thajiwas Glacier, Baltal & Zoji La snow excursions',
      'Srinagar Dal Lake Shikara rides, Pari Mahal & Mughal Gardens',
      'Gulmarg Gondola & Pahalgam Betaab Valley full circuits',
      'All-inclusive hotel stay, Wazwan dining & private vehicle options',
    ],
    ctaLabel: 'Inquire on Tour Package',
    primaryImage: getAssetUrl('assets/aistudio/IMG-20261114-WA0071_4b5683d7.jpg'),
    galleryImages: [
      {
        src: getAssetUrl('assets/aistudio/IMG-20261114-WA0071_4b5683d7.jpg'),
        caption: 'Sonamarg & Zoji La Pass towering snow walls',
      },
      {
        src: getAssetUrl('assets/aistudio/IMG-20261114-WA0068_1da37ff1.jpg'),
        caption: 'Emerald alpine meadows & snow-capped Pir Panjal',
      },
      {
        src: getAssetUrl('assets/aistudio/IMG-20261114-WA0079_d9d8c8ff.jpg'),
        caption: 'Dal Lake Shikara cruise in Srinagar',
      },
      {
        src: getAssetUrl('assets/aistudio/IMG-20261114-WA0065_82d01064.jpg'),
        caption: 'Pari Mahal heritage terraces, Srinagar',
      },
      {
        src: getAssetUrl('assets/aistudio/IMG-20261114-WA0074_da8a25e4.jpg'),
        caption: 'Shalimar Bagh Mughal Gardens',
      },
      {
        src: getAssetUrl('assets/aistudio/IMG-20261114-WA0110_427780c2.jpg'),
        caption: 'Thajiwas Glacier snow bowl',
      },
      {
        src: getAssetUrl('assets/aistudio/IMG-20261114-WA0075_f2190f81.jpg'),
        caption: 'Pahalgam pine gorge & mountain river',
      },
      {
        src: getAssetUrl('assets/aistudio/IMG-20261114-WA0076_d55c4826.jpg'),
        caption: 'Chashme Shahi royal spring garden',
      },
    ],
  },
];
