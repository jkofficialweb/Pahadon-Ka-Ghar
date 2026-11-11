export type RoomCategory = 'all' | 'deluxe' | 'suite' | 'family' | 'tent';

export interface RoomType {
  id: string;
  name: string;
  category: RoomCategory;
  subtitle: string;
  pricePerNight: number;
  capacityAdults: number;
  capacityChildren: number;
  bedType: string;
  sizeSqFt: number;
  view: string;
  description: string;
  features: string[];
  amenities: string[];
  image: string;
  galleryImages: string[];
  rating: number;
  reviewsCount: number;
  totalRooms: number;
}

export type MealPlanId = 'none' | 'breakfast_kahwa' | 'wazwan_half_board' | 'all_inclusive';

export interface MealPlan {
  id: MealPlanId;
  name: string;
  pricePerPersonPerDay: number;
  description: string;
}

export type BookingStatus = 'confirmed' | 'checked_in' | 'completed' | 'cancelled';
export type PaymentStatus = 'paid' | 'pending' | 'pay_at_hotel';

export interface Booking {
  id: string;
  reference: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guestsCount: number;
  roomTypeId: string;
  roomName: string;
  roomNumber?: string;
  mealPlan: MealPlanId;
  mealPlanName: string;
  baseAmount: number;
  mealAmount: number;
  taxAmount: number;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  specialRequests?: string;
  createdAt: string;
  notes?: string;
}

export interface Attraction {
  id: string;
  name: string;
  distanceKm: number;
  travelTime: string;
  category: 'mountain' | 'river' | 'glacier' | 'culture';
  highlight: string;
  description: string;
  image: string;
  bestSeason: string;
}

export interface WazwanDish {
  id: string;
  name: string;
  localName: string;
  category: 'wazwan' | 'tea_bread' | 'local_delicacy' | 'beverage';
  dietary: 'veg' | 'non_veg';
  description: string;
  ingredients: string;
  isSignature: boolean;
  image?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  city: string;
  rating: number;
  date: string;
  reviewText: string;
  stayDetails: string;
  verifiedStay?: boolean;
  avatarColor?: string;
  travelCategory?: 'family' | 'couple' | 'adventure' | 'solo';
  helpfulCount?: number;
  subRatings?: {
    cleanliness: number;
    hospitality: number;
    location: number;
    food: number;
  };
}

export interface TrainingCourse {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  topics: string[];
  intakeCapacity: number;
}
