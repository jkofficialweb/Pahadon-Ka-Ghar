import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidEmail, formatSubscriptionConfirmation } from './newsletter.ts';

test('isValidEmail accepts valid email formats and rejects invalid ones', () => {
  assert.equal(isValidEmail('guest@example.com'), true);
  assert.equal(isValidEmail('traveler.kashmir+hotel@gmail.co.in'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail('test@'), false);
  assert.equal(isValidEmail('@example.com'), false);
  assert.equal(isValidEmail(''), false);
});

test('formatSubscriptionConfirmation formats customized feedback', () => {
  const result = formatSubscriptionConfirmation('guest@valley.com', ['Seasonal Offers', 'Trek Tips']);
  assert.match(result, /Seasonal Offers/);
  assert.match(result, /Trek Tips/);
});
