import { MealPlanId } from '../types/hotel.ts';

export const MEAL_PLAN_RATES: Record<MealPlanId, { name: string; rate: number }> = {
  none: { name: 'Room Only (EP)', rate: 0 },
  breakfast_kahwa: { name: 'Kashmiri Kahwa & Breakfast (CP)', rate: 350 },
  wazwan_half_board: { name: 'Breakfast & Traditional Wazwan Dinner (MAP)', rate: 950 },
  all_inclusive: { name: 'Full Board (All Meals & Afternoon Tea)', rate: 1600 },
};

/**
 * Calculates number of nights between two date strings (YYYY-MM-DD).
 * Minimum output is 1 night.
 */
export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

/**
 * Validates whether check-out date is strictly after check-in date.
 */
export function isValidDateRange(checkIn: string, checkOut: string): boolean {
  if (!checkIn || !checkOut) return false;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  return end.getTime() > start.getTime();
}

/**
 * Calculates itemized totals including base room rate, meal plans, and 12% GST hospitality tax.
 */
export function calculateBookingTotals(
  pricePerNight: number,
  nights: number,
  mealPlan: MealPlanId,
  guests: number
): {
  baseAmount: number;
  mealAmount: number;
  taxAmount: number;
  totalAmount: number;
} {
  const safeNights = Math.max(1, nights);
  const safeGuests = Math.max(1, guests);
  const baseAmount = pricePerNight * safeNights;
  const mealRatePerPerson = MEAL_PLAN_RATES[mealPlan]?.rate || 0;
  const mealAmount = mealRatePerPerson * safeGuests * safeNights;
  const subtotal = baseAmount + mealAmount;
  const taxAmount = Math.round(subtotal * 0.12);
  const totalAmount = subtotal + taxAmount;

  return {
    baseAmount,
    mealAmount,
    taxAmount,
    totalAmount,
  };
}

/**
 * Generates a unique, branded reservation confirmation code (e.g. PKG-2026-7842).
 */
export function generateBookingReference(): string {
  const randomChars = Math.floor(1000 + Math.random() * 9000).toString();
  return `PKG-2026-${randomChars}`;
}

/**
 * Formats a number into Indian Rupee currency string.
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
