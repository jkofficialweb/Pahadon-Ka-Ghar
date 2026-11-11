import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateNights,
  calculateBookingTotals,
  generateBookingReference,
  isValidDateRange,
  formatINR,
  MEAL_PLAN_RATES,
} from './booking.ts';

test('calculateNights correctly computes difference in days', () => {
  assert.equal(calculateNights('2026-05-10', '2026-05-13'), 3);
  assert.equal(calculateNights('2026-05-10', '2026-05-11'), 1);
  assert.equal(calculateNights('2026-05-10', '2026-05-10'), 1); // minimum fallback
});

test('isValidDateRange validates forward booking sequences', () => {
  assert.equal(isValidDateRange('2026-06-01', '2026-06-04'), true);
  assert.equal(isValidDateRange('2026-06-04', '2026-06-01'), false);
  assert.equal(isValidDateRange('2026-06-01', '2026-06-01'), false);
  assert.equal(isValidDateRange('', '2026-06-01'), false);
});

test('calculateBookingTotals computes room, meals and 12% tax accurately', () => {
  // 2 nights, room price 3800, meal plan breakfast_kahwa (350/person/day), 2 guests
  // base = 3800 * 2 = 7600
  // meals = 350 * 2 * 2 = 1400
  // subtotal = 9000
  // tax = round(9000 * 0.12) = 1080
  // total = 10080
  const totals = calculateBookingTotals(3800, 2, 'breakfast_kahwa', 2);
  assert.equal(totals.baseAmount, 7600);
  assert.equal(totals.mealAmount, 1400);
  assert.equal(totals.taxAmount, 1080);
  assert.equal(totals.totalAmount, 10080);
});

test('calculateBookingTotals handles room-only plan with zero meal cost', () => {
  const totals = calculateBookingTotals(5000, 1, 'none', 1);
  assert.equal(totals.baseAmount, 5000);
  assert.equal(totals.mealAmount, 0);
  assert.equal(totals.taxAmount, 600);
  assert.equal(totals.totalAmount, 5600);
});

test('generateBookingReference produces valid branded PKG format', () => {
  const ref = generateBookingReference();
  assert.match(ref, /^PKG-2026-\d{4}$/);
});

test('formatINR formats currency with rupee symbol', () => {
  const formatted = formatINR(5200);
  assert.match(formatted, /5,200/);
});
