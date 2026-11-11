import test from 'node:test';
import assert from 'node:assert/strict';
import { FAQ_ITEMS } from '../data/faqData.ts';
import { filterFAQs } from './faqHelper.ts';

test('filterFAQs filters by category correctly', () => {
  const permitItems = filterFAQs(FAQ_ITEMS, 'permits', '');
  assert.equal(permitItems.length, 2);
  assert.ok(permitItems.every((item) => item.category === 'permits'));

  const safetyItems = filterFAQs(FAQ_ITEMS, 'safety', '');
  assert.equal(safetyItems.length, 3);
  assert.ok(safetyItems.every((item) => item.category === 'safety'));

  const policyItems = filterFAQs(FAQ_ITEMS, 'policies', '');
  assert.equal(policyItems.length, 3);
  assert.ok(policyItems.every((item) => item.category === 'policies'));
});

test('filterFAQs performs case-insensitive keyword searches', () => {
  const permitSearch = filterFAQs(FAQ_ITEMS, 'all', 'permit');
  assert.ok(permitSearch.length >= 2);

  const parkingSearch = filterFAQs(FAQ_ITEMS, 'all', 'parking');
  assert.equal(parkingSearch.length, 1);
  assert.match(parkingSearch[0].question, /parking/i);

  const heatedSearch = filterFAQs(FAQ_ITEMS, 'all', 'heated');
  assert.ok(heatedSearch.length >= 1);
});

test('filterFAQs returns empty array when no query matches', () => {
  const nonExistent = filterFAQs(FAQ_ITEMS, 'all', 'xyzunlikelyquery999');
  assert.equal(nonExistent.length, 0);
});
