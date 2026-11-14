import { getAssetUrl } from '../utils/assets.ts';

export type GalleryPhotoCategory = 'resort' | 'rooms' | 'dining' | 'tours' | 'academy';

export interface GalleryPhoto {
  id: string;
  filename: string;
  title: string;
  category: GalleryPhotoCategory;
  categoryLabel: string;
  location: string;
  description: string;
  image: string;
}

const photo = (
  id: string,
  filename: string,
  title: string,
  category: GalleryPhotoCategory,
  location: string,
  description: string
): GalleryPhoto => {
  const categoryLabels: Record<GalleryPhotoCategory, string> = {
    resort: 'Resort & Lawns',
    rooms: 'Rooms & Glamping',
    dining: 'Dining & Wazwan',
    tours: 'Kashmir Tours & Nature',
    academy: 'Skill Academy',
  };

  return {
    id,
    filename,
    title,
    category,
    categoryLabel: categoryLabels[category],
    location,
    description,
    image: getAssetUrl(`assets/aistudio/${filename}`),
  };
};

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  // --- RESORT GROUNDS, EXTERIORS & BALCONY VIEWS ---
  photo(
    'wa0115',
    'IMG-20261114-WA0115_c0a9df9c.jpg',
    'Pahadon Ka Ghar Mountain Chalet & Front Lawn',
    'resort',
    'Hariganiwan, Old Sonamarg Road',
    'Wide view of our sunlit mountain chalet, stone-trimmed flower garden, and lush emerald front lawn.'
  ),
  photo(
    'wa0097',
    'IMG-20261114-WA0097_d662429d.jpg',
    'Resort Chalet Facade & Green Meadow Lawn',
    'resort',
    'Pahadon Ka Ghar Grounds, Hariganiwan',
    'Bright morning sunshine across the resort facade and open green grounds framed by Himalayan ridges.'
  ),
  photo(
    'wa0099',
    'IMG-20261114-WA0099_430ba837.jpg',
    'Swiss-Style Mountain Lodge & Cypress Garden',
    'resort',
    'Pahadon Ka Ghar Exterior',
    'Elevated view of the wooden lodge exterior rising behind manicured evergreens and blooming roses.'
  ),
  photo(
    'wa0119',
    'IMG-20261114-WA0119_356e16e5.jpg',
    'Emerald Resort Lawn & Pine Valley Backdrop',
    'resort',
    'Pahadon Ka Ghar Front Lawn',
    'Expansive green lawn ideal for family picnics, morning tea, and evening bonfire gatherings.'
  ),
  photo(
    'wa0093',
    'IMG-20261114-WA0093_7af93250.jpg',
    'Blooming Kashmiri Rose & Mountain Lodge',
    'resort',
    'Resort Flower Garden',
    'Vibrant crimson mountain roses blossoming right outside the cottage entrance.'
  ),
  photo(
    'wa0118',
    'IMG-20261114-WA0118_3c78d91b.jpg',
    'Rose Bush Patio & Mountain Sanctuary',
    'resort',
    'Pahadon Ka Ghar Garden',
    'Fresh garden roses framed against the deep blue sky and timber lodge roof.'
  ),
  photo(
    'wa0114',
    'IMG-20261114-WA0114_0ffb00dd.jpg',
    'Carved Wooden Balcony Overlooking the Valley',
    'resort',
    'Upper Balcony Suite, Pahadon Ka Ghar',
    'Handcrafted timber eaves and wrought-iron balcony railing opening onto the sunlit lawn and hills.'
  ),
  photo(
    'wa0117',
    'IMG-20261114-WA0117_b4e8eeeb.jpg',
    'Morning Panorama from Private Suite Balcony',
    'resort',
    'Balcony Suite, Hariganiwan',
    'Warm wooden ceiling veranda offering sweeping views of the green lawn and mountain ridges.'
  ),
  photo(
    'wa0034',
    'IMG-20261114-WA0034_226afe4c.jpg',
    'Sunlit Sit-Out Veranda & Mountain Peaks',
    'resort',
    'Pahadon Ka Ghar Upper Floor',
    'Quiet private sit-out terrace ideal for morning saffron Kahwa and sunrise photography.'
  ),
  photo(
    'wa0094',
    'IMG-20261114-WA0094_35754765.jpg',
    'View Beneath Traditional Timber Roof Eaves',
    'resort',
    'Hariganiwan Village Horizon',
    'Lush green orchard canopy and distant peaks viewed directly beneath our carved wood eaves.'
  ),
  photo(
    'wa0095',
    'IMG-20261114-WA0095_de840f90.jpg',
    'Open Outdoor Lawn Seating & Garden Trees',
    'resort',
    'Pahadon Ka Ghar Courtyard',
    'Peaceful outdoor courtyard with red-and-blue lawn chairs under shady walnut and chinar trees.'
  ),
  photo(
    'wa0096',
    'IMG-20261114-WA0096_cc0f9e94.jpg',
    'Ornamental Cypress & Golden Shrub Pathway',
    'resort',
    'Garden Walkway, Pahadon Ka Ghar',
    'Tended ornamental shrubs and cypress line bordering the resort open recreation lawn.'
  ),
  photo(
    'wa0098',
    'IMG-20261114-WA0098_31c95b3d.jpg',
    'Panoramic View of the Front Lawn & Hills',
    'resort',
    'Pahadon Ka Ghar Perimeter',
    'Sun-drenched mountain valley horizon visible across the manicured green grounds.'
  ),
  photo(
    'wa0100',
    'IMG-20261114-WA0100_b0d7085a.jpg',
    'Sunny Garden Border & Floral Bushes',
    'resort',
    'Resort Lawn Border',
    'Fresh alpine air and colourful seasonal shrubbery encircling the resort grounds.'
  ),
  photo(
    'wa0102',
    'IMG-20261114-WA0102_9ca70da0.jpg',
    'Stone-Edged Walkway & Resort Lawn Terrace',
    'resort',
    'Hariganiwan Resort Terrace',
    'Elevated view down the green garden terrace toward the surrounding Ganderbal mountains.'
  ),
  photo(
    'wa0091',
    'IMG-20261114-WA0091_5462735f.jpg',
    '24/7 Front Desk Reception & Online Reservation System',
    'resort',
    'Front Office Desk, Pahadon Ka Ghar',
    'Dedicated reception desk handling online booking inquiries, digital check-ins, and guest travel support.'
  ),

  // --- ROOMS, SUITES, BATHROOMS & GLAMPING ---
  photo(
    'wa0092',
    'IMG-20261114-WA0092_b0bc1e1f.jpg',
    'Mountain-View Guest Room with Open Glass Balcony',
    'rooms',
    'Pahadon Ka Ghar Main Lodge',
    'Bright guest bedroom opening onto a private wooden mountain balcony with fresh white linens.'
  ),
  photo(
    'wa0039',
    'IMG-20261114-WA0039_786bbd99.jpg',
    'Sindh Valley Glass-Wall Balcony Suite',
    'rooms',
    'Valley View Wing',
    'Corner suite featuring floor-to-ceiling timber-framed windows and ornate Kashmiri ceiling work.'
  ),
  photo(
    'wa0045',
    'IMG-20261114-WA0045_4bf519e2.jpg',
    'Corner Panoramic Balcony Room',
    'rooms',
    'Upper Floor Mountain Wing',
    'Rose-tinted suite with wrap-around balcony glass doors overlooking the lush Hariganiwan hills.'
  ),
  photo(
    'wa0040',
    'IMG-20261114-WA0040_c85f51de.jpg',
    'Spacious Balcony Suite & Heavy Thermal Curtains',
    'rooms',
    'Upper Floor Suite',
    'Insulated rooms fitted with blackout thermal drapes, electric kettle, and scenic valley windows.'
  ),
  photo(
    'wa0036',
    'IMG-20261114-WA0036_e42cb459.jpg',
    'Bedside View Straight Out to the Mountain Balcony',
    'rooms',
    'Deluxe Balcony Room',
    'Wake up to misty mountain silhouettes right from the comfort of warm quilted bedding.'
  ),
  photo(
    'wa0033',
    'IMG-20261114-WA0033_ff5948f3.jpg',
    'Arched Window & Balcony Veranda Corner',
    'rooms',
    'Suite Balcony Transition',
    'Clean indoor-outdoor flow connecting cozy rooms with crisp Himalayan mountain air.'
  ),
  photo(
    'wa0028',
    'IMG-20261114-WA0028_6f98380d.jpg',
    'Deluxe King Room with Warm Polished Timber Floor',
    'rooms',
    'Deluxe Wing, Ground & First Floor',
    'Glossy wood flooring, upholstered geometric headboard, electric tea kettle, and crisp linens.'
  ),
  photo(
    'wa0037',
    'IMG-20261114-WA0037_68c16cf1.jpg',
    'Mint & Lavender Deluxe Mountain Room',
    'rooms',
    'Deluxe Wing',
    'Spacious double bedroom featuring cool pastel walls, ambient cove ceiling lighting, and dark wood floor.'
  ),
  photo(
    'wa0042',
    'IMG-20261114-WA0042_84fdeb3d.jpg',
    'Sunlit Olive Deluxe Room',
    'rooms',
    'Deluxe Wing',
    'Bright, spotless double room equipped with warm quilts and high-efficiency room heating.'
  ),
  photo(
    'wa0043',
    'IMG-20261114-WA0043_34b4dc3f.jpg',
    'Handcrafted Pine Door & Deluxe King Bedroom',
    'rooms',
    'Mountain Retreat Wing',
    'Solid timber entry door and warm wood-floored interior designed for restful sleep.'
  ),
  photo(
    'wa0038',
    'IMG-20261114-WA0038_49d03cc0.jpg',
    'Warm Amber Deluxe Headboard & Plush Bedding',
    'rooms',
    'Deluxe Wing',
    'Freshly pressed pillows, bedside power outlets, and acoustic thermal curtains.'
  ),
  photo(
    'wa0032',
    'IMG-20261114-WA0032_c6e75909.jpg',
    'Crimson Rose Room with Kashmiri Ceiling Art',
    'rooms',
    'Heritage Wing',
    'Detailed Khatamband-inspired illuminated ceiling above a cozy double bed and wooden entry door.'
  ),
  photo(
    'wa0044',
    'IMG-20261114-WA0044_c9edac03.jpg',
    'Luxury Family Dual-Bed Suite with Ornate Ceiling',
    'rooms',
    'Family Suite Wing',
    'Expansive family suite housing two full king beds under vibrant glowing Kashmiri ceiling panels.'
  ),
  photo(
    'wa0030',
    'IMG-20261114-WA0030_46d132c6.jpg',
    'Family Quadruple-Occupancy Mountain Suite',
    'rooms',
    'Family Wing',
    'Two plush double beds with generous floor space ideal for parents travelling with children.'
  ),
  photo(
    'wa0035',
    'IMG-20261114-WA0035_8ccba239.jpg',
    'Spacious Family Double-King Suite Interior',
    'rooms',
    'Family Wing',
    'Clean wooden laminate floors, dual tall windows, and extra warm quilts for winter comfort.'
  ),
  photo(
    'wa0029',
    'IMG-20261114-WA0029_de870698.jpg',
    'Modern Marble-Tiled Bathroom with Hot Water Geyser',
    'rooms',
    'En-Suite Guest Washroom',
    'Spotless stone-tiled washroom stocked with fresh bath towels, shower fittings, and 24/7 hot water.'
  ),
  photo(
    'wa0031',
    'IMG-20261114-WA0031_3111c663.jpg',
    'En-Suite Hygienic Bath & Instant Hot Water',
    'rooms',
    'En-Suite Guest Washroom',
    'Clean modern fittings, fresh towel service, and reliable instant hot water geyser.'
  ),
  photo(
    'wa0041',
    'IMG-20261114-WA0041_6fa8f2fa.jpg',
    'Alpine Garden Glamping Tent & Evening Barbecue Grill',
    'rooms',
    'Pahadon Ka Ghar Lawn Camp',
    'Insulated waterproof camping tent pitched on soft garden grass with portable charcoal grill.'
  ),
  photo(
    'wa0046',
    'IMG-20261114-WA0046_8177dfac.jpg',
    'Cozy Glamping Tent Interior with Quilted Bedding',
    'rooms',
    'Resort Lawn Camp',
    'Elevated insulated mattress, plush fleece blankets, and decorative towel swan inside the camp tent.'
  ),

  // --- DINING, KASHMIRI WAZWAN & GARDEN TEA ---
  photo(
    'wa0063',
    'IMG-20261114-WA0063_415d5162.jpg',
    'Royal Kashmiri Wazwan Copper Trami Feast',
    'dining',
    'Pahadon Ka Ghar Kitchen',
    'Traditional Wazwan platter featuring Rogan Josh, Seekh Kabab, Rista, Gushtaba, and steamed rice.'
  ),
  photo(
    'wa0049',
    'IMG-20261114-WA0049_645bfcf4.jpg',
    'Steaming Wazwan Banquet Spread in Mountain Dining Hall',
    'dining',
    'Resort Dining Room',
    'Rich multi-course feast served piping hot beside brass vessels in our mountain dining room.'
  ),
  photo(
    'wa0054',
    'IMG-20261114-WA0054_b186b23d.jpg',
    'Traditional Hand-Hammered Copper Wazwan Service',
    'dining',
    'Pahadon Ka Ghar Dining',
    'Authentic Kashmiri lamb delicacies presented on ornate engraved copper ware with saffron curries.'
  ),
  photo(
    'wa0056',
    'IMG-20261114-WA0056_b1c02bf9.jpg',
    'Engraved Samovar Pouring Hot Shahi Kahwa',
    'dining',
    'Garden Tea Service',
    'Pure Pampore saffron green tea poured from an heirloom brass samovar with walnut & almond pastries.'
  ),
  photo(
    'wa0047',
    'IMG-20261114-WA0047_2399a106.jpg',
    'Copper Samovar Kahwa & Kashmiri Bakery Basket',
    'dining',
    'Main Dining Hall',
    'Steaming saffron Kahwa served alongside crisp Kashmiri kulchas, biscuits, and baked snacks.'
  ),
  photo(
    'wa0048',
    'IMG-20261114-WA0048_09ef1763.jpg',
    'Iconic Pink Noon Chai with Fresh Girda Bread',
    'dining',
    'Morning Breakfast Service',
    'Traditional salted pink tea served steaming hot with clay-tandoor baked Girda bread and butter.'
  ),
  photo(
    'wa0057',
    'IMG-20261114-WA0057_cf3461bf.jpg',
    'Morning Kahwa, Kashmiri Kulcha & Slow-Cooked Stew',
    'dining',
    'Pahadon Ka Ghar Breakfast',
    'Hearty morning spread pairing golden herbal Kahwa with soft breads and mountain delicacies.'
  ),
  photo(
    'wa0055',
    'IMG-20261114-WA0055_31d8d2dd.jpg',
    'Homely Kashmiri Dinner Table Spread',
    'dining',
    'Guest Dining Area',
    'Freshly steamed basmati rice, rich meat & vegetarian curries, pickles, and curd served warm.'
  ),
  photo(
    'wa0051',
    'IMG-20261114-WA0051_28fbcf12.jpg',
    'Family Enjoying Authentic Wazwan Dinner Together',
    'dining',
    'Pahadon Ka Ghar Dining Hall',
    'Travelling families sharing freshly prepared Kashmiri curries, kebabs, and fragrant pulao.'
  ),
  photo(
    'wa0052',
    'IMG-20261114-WA0052_112dfc15.jpg',
    'Joyful Group Wazwan Meal at Pahadon Ka Ghar',
    'dining',
    'Pahadon Ka Ghar Dining Hall',
    'Warm hospitality and generous family-style dining after a day exploring Sonamarg.'
  ),
  photo(
    'wa0058',
    'IMG-20261114-WA0058_8ebd8a02.jpg',
    'Hygienic Freshly Prepared Group Feast',
    'dining',
    'Pahadon Ka Ghar Dining Hall',
    'Guests savouring home-style dishes cooked fresh with local Himalayan spices.'
  ),
  photo(
    'wa0050',
    'IMG-20261114-WA0050_796d4998.jpg',
    'Open-Air Lawn Snacks & Evening Tea Seating',
    'dining',
    'Resort Lawn Patio',
    'Enjoying fresh parathas, snacks, and hot tea outdoors surrounded by green mountain grass.'
  ),
  photo(
    'wa0053',
    'IMG-20261114-WA0053_aa9e6396.jpg',
    'Garden Breakfast Setting Under Clear Skies',
    'dining',
    'Hariganiwan Lawn Seating',
    'Sunny morning garden table set for refreshing open-air breakfasts.'
  ),
  photo(
    'wa0059',
    'IMG-20261114-WA0059_e8cf9631.jpg',
    'Fresh Morning Refreshments on the Green Lawn',
    'dining',
    'Resort Garden',
    'Relaxed outdoor seating bathed in crisp mountain morning sunshine.'
  ),
  photo(
    'wa0060',
    'IMG-20261114-WA0060_e1cd4959.jpg',
    'Served Hot Breakfast Platters in the Garden',
    'dining',
    'Resort Lawn Patio',
    'Freshly cooked breakfast platters served straight to guests lounging on the front lawn.'
  ),
  photo(
    'wa0061',
    'IMG-20261114-WA0061_88efbf52.jpg',
    'Peaceful Garden Tea Corner',
    'dining',
    'Resort Lawn Patio',
    'Quiet outdoor seating flanked by ornamental garden borders for relaxed conversations.'
  ),
  photo(
    'wa0062',
    'IMG-20261114-WA0062_9fb03943.jpg',
    'Late Afternoon Tea & Snacks Amidst Flowers',
    'dining',
    'Resort Lawn Patio',
    'Warm afternoon light over garden seating after returning from Sindh River walks.'
  ),

  // --- KASHMIR TOURS, SINDH RIVER, SONAMARG & NATURAL ATTRACTIONS ---
  photo(
    'wa0104',
    'IMG-20261114-WA0104_de27b9e3.jpg',
    'Turquoise Sindh River & Towering Himalayan Peaks',
    'tours',
    'Sindh Valley, Ganderbal',
    'Crystal-clear glacial waters of Nallah Sindh winding below dense pine ridges and rocky peaks.'
  ),
  photo(
    'wa0113',
    'IMG-20261114-WA0113_188e2417.jpg',
    'Golden Sunset Glow Over Hariganiwan Sindh River',
    'tours',
    'Hariganiwan Riverbank (350m walk)',
    'Warm golden twilight clouds reflecting on calm boulder-strewn waters just steps from the hotel.'
  ),
  photo(
    'wa0112',
    'IMG-20261114-WA0112_2297db8b.jpg',
    'Aromatic Conifer Canopy & Flowing River Rapids',
    'tours',
    'Old Sonamarg Road River Trail',
    'Towering Himalayan firs shading vibrant blue-green glacial rapids along the Kangan corridor.'
  ),
  photo(
    'wa0103',
    'IMG-20261114-WA0103_0297e237.jpg',
    'Rushing Sindh River Bend & Riverside Hut',
    'tours',
    'Gagangir–Hariganiwan Stretch',
    'Scenic riverside meadow and boulders carved by fast-flowing glacial meltwater.'
  ),
  photo(
    'wa0105',
    'IMG-20261114-WA0105_16c233b5.jpg',
    'Historic Iron Suspension Bridge Over Sindh River',
    'tours',
    'Kangan–Sonamarg Route',
    'Iconic valley bridge spanning glacial boulders with snow peaks rising in the mist.'
  ),
  photo(
    'wa0106',
    'IMG-20261114-WA0106_43f4a568.jpg',
    'Wide Braided Riverbed in Ganderbal Valley',
    'tours',
    'Sindh River Plain',
    'Broad pebble riverbed framed by green village terraces and towering valley slopes.'
  ),
  photo(
    'wa0107',
    'IMG-20261114-WA0107_41283de0.jpg',
    'Sweeping Curve of the Sindh Valley Corridor',
    'tours',
    'Hariganiwan Overlook',
    'Bird-eye valley vista showing the winding river bordered by orchards and pine hillsides.'
  ),
  photo(
    'wa0101',
    'IMG-20261114-WA0101_969e3a51.jpg',
    'Clear Mountain Stream Under Brilliant Blue Skies',
    'tours',
    'Hariganiwan Foothills',
    'Gentle sparkling stream lined with alpine boulders and wildflowers near the resort.'
  ),
  photo(
    'wa0116',
    'IMG-20261114-WA0116_f38fa73d.jpg',
    'Crisp Summer Stream & Cotton Clouds in Kashmir',
    'tours',
    'Kangan Stream Trail',
    'Refreshing cold mountain brook flowing peacefully alongside walking trails.'
  ),
  photo(
    'wa0110',
    'IMG-20261114-WA0110_427780c2.jpg',
    'Thajiwas Glacier Snow Basin & Pony Trails',
    'tours',
    'Sonamarg (34 km from resort)',
    'Perennial summer snowfields surrounded by jagged granite cliffs and horse riding trails.'
  ),
  photo(
    'wa0111',
    'IMG-20261114-WA0111_42f55134.jpg',
    'Winter Snow Wonderland in Sonamarg',
    'tours',
    'Sonamarg Meadow (32 km)',
    'Blanket of pristine powdery winter snow beneath towering frosted Himalayan ridges.'
  ),
  photo(
    'wa0064',
    'IMG-20261114-WA0064_5654e0c7.jpg',
    'High-Altitude Glacier Amphitheater',
    'tours',
    'Upper Sonamarg / Zoji La Axis',
    'Dramatic snow-draped peaks and glacial bowl accessible on guided day excursions.'
  ),
  photo(
    'wa0071',
    'IMG-20261114-WA0071_4b5683d7.jpg',
    'Towering Snow Walls Along Zoji La Mountain Pass',
    'tours',
    'Zoji La Pass Excursion',
    'Thrilling drive carved between monumental spring snow walls above Sonamarg and Baltal.'
  ),
  photo(
    'wa0072',
    'IMG-20261114-WA0072_bfed9aa6.jpg',
    'Snow-Cleared Highway Through Deep Alpine Drifts',
    'tours',
    'High-Altitude Pass Route',
    'Iconic winter-spring Kashmir mountain pass adventure arranged with experienced drivers.'
  ),
  photo(
    'wa0109',
    'IMG-20261114-WA0109_6b737613.jpg',
    'Frost-Capped Pir Panjal & Himalayan Ridge Horizon',
    'tours',
    'Ganderbal High Trails',
    'Distant white peaks glowing above emerald coniferous forest slopes.'
  ),
  photo(
    'wa0108',
    'IMG-20261114-WA0108_4a38c2e6.jpg',
    'Shady Pine Glade & Quiet Woodland Brook',
    'tours',
    'Kangan–Pahalgam Wilderness',
    'Serene forest clearing beside a crystal mountain stream bordered by ancient pines.'
  ),
  photo(
    'wa0068',
    'IMG-20261114-WA0068_1da37ff1.jpg',
    'Endless Green Meadow & Distant Snow Peaks',
    'tours',
    'Gulmarg & Yusmarg Tour Circuit',
    'Rolling emerald pastures under panoramic snow-covered peaks on custom domestic tours.'
  ),
  photo(
    'wa0070',
    'IMG-20261114-WA0070_6430005d.jpg',
    'Emerald Highland Valley & Winding River',
    'tours',
    'Upper Kashmir Valley',
    'Untouched golden-green pastures split by a glistening ribbon of mountain water.'
  ),
  photo(
    'wa0075',
    'IMG-20261114-WA0075_f2190f81.jpg',
    'Deep Evergreen Gorge & Crystal River',
    'tours',
    'Betaab & Pahalgam Excursion',
    'Thick cedar-cloaked mountainside dropping down to a tranquil emerald stream.'
  ),
  photo(
    'wa0090',
    'IMG-20261114-WA0090_0fe9c3dc.jpg',
    'Wooden Bridge Trail Through Glacial Valley',
    'tours',
    'Guided Kashmir Valley Walk',
    'Traveller crossing a scenic timber bridge spanning snow-fed streams beneath high mountain peaks.'
  ),
  photo(
    'wa0077',
    'IMG-20261114-WA0077_663d2018.jpg',
    'Guided Pony Riding Expedition Across Alpine Meadows',
    'tours',
    'Sonamarg & Baisaran Trails',
    'Guests enjoying memorable horseback rides escorted by experienced local mountain horsemen.'
  ),
  photo(
    'wa0080',
    'IMG-20261114-WA0080_260a524a.jpg',
    'Travellers Exploring Lush Green Mountain Foothills',
    'tours',
    'Hariganiwan & Sonamarg Walks',
    'Guided daytime walking tours tailored for friends, families, and small adventure groups.'
  ),
  photo(
    'wa0087',
    'IMG-20261114-WA0087_92d8f443.jpg',
    'Pine Log Crossing Over Crystal Mountain Stream',
    'tours',
    'Sindh Valley Nature Trail',
    'Adventurous forest crossing over cool glacial river pools surrounded by dense foliage.'
  ),
  photo(
    'wa0084',
    'IMG-20261114-WA0084_82e805b4.jpg',
    'Mossy Rock Waterfall in Lush Forest Ravine',
    'tours',
    'Aharbal & Valley Waterfalls',
    'Pure white cascade tumbling down mossy limestone ledges inside cool mountain woods.'
  ),
  photo(
    'wa0085',
    'IMG-20261114-WA0085_171e4630.jpg',
    'Tall Deodar Grove & Countryside Trail',
    'tours',
    'Kangan Forest Belt',
    'Restful shade beneath centuries-old Himalayan cedar trees near the resort.'
  ),
  photo(
    'wa0088',
    'IMG-20261114-WA0088_84fbc5e8.jpg',
    'Traditional Green-Domed Hillside Shrine',
    'tours',
    'Kashmiri Cultural Heritage Trail',
    'Resplendent green mountain shrine nestled harmoniously within pine-covered slopes.'
  ),
  photo(
    'wa0065',
    'IMG-20261114-WA0065_82d01064.jpg',
    'Pari Mahal Seven-Terraced Historic Monument',
    'tours',
    'Zabarwan Hills, Srinagar Tour',
    'Iconic stone arches overlooking Dal Lake and Srinagar city on curated heritage tours.'
  ),
  photo(
    'wa0074',
    'IMG-20261114-WA0074_da8a25e4.jpg',
    'Shalimar Bagh Mughal Pavilion & Fountain Cascade',
    'tours',
    'Srinagar Mughal Gardens',
    'Carved black marble pavilion reflected in gentle fountain pools framed by red & purple blooms.'
  ),
  photo(
    'wa0076',
    'IMG-20261114-WA0076_d55c4826.jpg',
    'Chashme Shahi Axial Garden Terrace & Pavilion',
    'tours',
    'Srinagar Mughal Gardens',
    'Symmetrical cypress-lined water channel leading to the royal spring garden pavilion.'
  ),
  photo(
    'wa0067',
    'IMG-20261114-WA0067_5321e068.jpg',
    'Mughal Garden Terraced Cascade & Ancient Chinars',
    'tours',
    'Nishat Bagh, Srinagar',
    'Majestic Chinar trees flanking crystal garden fountains flowing toward Dal Lake.'
  ),
  photo(
    'wa0069',
    'IMG-20261114-WA0069_7938df38.jpg',
    'Shaded Chinar Stream Canal & Waterfall Garden',
    'tours',
    'Kokernag / Verinag Tour',
    'Cool turquoise spring waters stepping down sunlit stone terraces in southern Kashmir.'
  ),
  photo(
    'wa0086',
    'IMG-20261114-WA0086_fb678a5c.jpg',
    'Vibrant Spring Canal Framed by Maple Foliage',
    'tours',
    'Verinag & Mughal Springs',
    'Glass-clear mountain spring channel lined with emerald lawns and tall shade trees.'
  ),
  photo(
    'wa0073',
    'IMG-20261114-WA0073_07119805.jpg',
    'Indira Gandhi Memorial Tulip & Fountain Gardens',
    'tours',
    'Srinagar Spring Circuit',
    'Burst of colorful spring blossoms encircling grand symmetrical garden fountains.'
  ),
  photo(
    'wa0078',
    'IMG-20261114-WA0078_5d1a0457.jpg',
    'Blossoming Dahlias & Royal Fountain Pools',
    'tours',
    'Srinagar Botanical Gardens',
    'Sun-kissed floral borders blooming in vivid crimson, gold, and ivory.'
  ),
  photo(
    'wa0081',
    'IMG-20261114-WA0081_2e075656.jpg',
    'Heritage Stone Courtyard & Cypress Topiary',
    'tours',
    'Srinagar Architectural Tour',
    'Carved stone masonry archways beside lush green lawns and flowerbeds.'
  ),
  photo(
    'wa0082',
    'IMG-20261114-WA0082_f300170a.jpg',
    'Ancient Stone Pavilion in the Foothills',
    'tours',
    'Kashmir Heritage Circuit',
    'Historic terracotta-toned stone structure backed by soaring forested mountains.'
  ),
  photo(
    'wa0083',
    'IMG-20261114-WA0083_cdf064cd.jpg',
    'Royal Mughal Stone Arcade & Garden Lawns',
    'tours',
    'Pari Mahal & Heritage Gardens',
    'Classic arched stone galleries overlooking manicured mountain terraces.'
  ),
  photo(
    'wa0079',
    'IMG-20261114-WA0079_d9d8c8ff.jpg',
    'Relaxing Inside a Cushioned Dal Lake Shikara',
    'tours',
    'Dal Lake, Srinagar',
    'Guests gliding peacefully across Dal Lake on ornate Kashmiri embroidered wooden Shikaras.'
  ),
  photo(
    'wa0089',
    'IMG-20261114-WA0089_f51d7c8c.jpg',
    'Golden Light Shimmering Across Dal Lake',
    'tours',
    'Dal Lake, Srinagar',
    'Tranquil twilight sunbeams breaking through clouds above quiet floating Shikaras.'
  ),
  photo(
    'wa0066',
    'IMG-20261114-WA0066_b7253e24.jpg',
    'Shikara Ghat & Waterfront Boulevard View',
    'tours',
    'Dal Lake Waterfront, Srinagar',
    'Lively boat landing along the sparkling lake edge included in Srinagar tour packages.'
  ),

  // --- SKILL ACADEMY: HOSPITALITY, CULINARY & HOUSEKEEPING TRAINING ---
  photo(
    'wa0022',
    'IMG-20261114-WA0022_a79d0f9f.jpg',
    'Certified Youth Hospitality Training Batch Portrait',
    'academy',
    'Pahadon Ka Ghar Skill Academy',
    'Graduating cohort of aspiring local hospitality professionals in crisp hotel management uniforms.'
  ),
  photo(
    'wa0006',
    'IMG-20261114-WA0006_5593624b.jpg',
    'Room Readiness & Housekeeping Supervision Class',
    'academy',
    'Practical Training Suite',
    'Instructor demonstrating crisp bed styling, guest room inspection, and international hygiene standards.'
  ),
  photo(
    'wa0007',
    'IMG-20261114-WA0007_229c9bb1.jpg',
    'F&B Dining Etiquette & Table Service Mentoring',
    'academy',
    'Srinagar–Ganderbal Training Hall',
    'Hands-on instruction in formal table placement, cutlery alignment, and attentive guest service.'
  ),
  photo(
    'wa0008',
    'IMG-20261114-WA0008_82210894.jpg',
    'Team Housekeeping & Room Maintenance Drill',
    'academy',
    'Hospitality Training Wing',
    'Trainees practicing coordinated bed linen tucking, sanitization, and fixture polishing.'
  ),
  photo(
    'wa0009',
    'IMG-20261114-WA0009_78cad56b.jpg',
    'Guest Room Quality Assurance Demonstration',
    'academy',
    'Practical Training Suite',
    'Senior hospitality mentor guiding uniformed trainees through luxury room turnaround checklists.'
  ),
  photo(
    'wa0010',
    'IMG-20261114-WA0010_0305cda9.jpg',
    'Restaurant Hall Floor Management & Banquet Setup',
    'academy',
    'F&B Service Lab',
    'Trainees setting formal dining tables, napkin folds, and guest service stations in unison.'
  ),
  photo(
    'wa0020',
    'IMG-20261114-WA0020_11839fb6.jpg',
    'Live Culinary Carving & Garnish Demonstration',
    'academy',
    'Culinary Training Kitchen',
    'Chef mentor demonstrating precision fruit and vegetable carving to uniformed culinary students.'
  ),
  photo(
    'wa0021',
    'IMG-20261114-WA0021_ca084b44.jpg',
    'Commercial Kitchen Prep & Hygienic Knife Skills',
    'academy',
    'Culinary Arts Workshop',
    'Trainees preparing fresh ingredients side by side on stainless commercial prep tables.'
  ),
  photo(
    'wa0023',
    'IMG-20261114-WA0023_c0f618e6.jpg',
    'Women Empowerment & Culinary Service Assessment',
    'academy',
    'Skill Development Center',
    'Inclusive hospitality workshop empowering local young women with plated service skills.'
  ),
  photo(
    'wa0024',
    'IMG-20261114-WA0024_97487d14.jpg',
    'Interactive Hospitality Seminar & Career Guidance',
    'academy',
    'Academy Classroom',
    'Group orientation session introducing tourism careers, customer care, and internship pathways.'
  ),
  photo(
    'wa0025',
    'IMG-20261114-WA0025_ec887c83.jpg',
    'Youth Tourism & Homestay Operations Briefing',
    'academy',
    'Academy Classroom',
    'Educators and industry mentors discussing sustainable local homestay entrepreneurship.'
  ),
  photo(
    'wa0026',
    'IMG-20261114-WA0026_f49e160e.jpg',
    'Plating Presentation & Quality Evaluation Lab',
    'academy',
    'F&B Practical Room',
    'Trainees presenting freshly plated dishes for hygiene, flavour, and visual presentation review.'
  ),
  photo(
    'wa0027',
    'IMG-20261114-WA0027_3e53ee75.jpg',
    'Hands-On F&B Service & Hospitality Practical',
    'academy',
    'Skill Development Center',
    'On-the-job practical evaluation preparing youth for immediate placement across Kashmir hotels.'
  ),
];

export const TRAINING_PHOTOS = GALLERY_PHOTOS.filter((item) => item.category === 'academy');
