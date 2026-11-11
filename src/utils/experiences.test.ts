import test from 'node:test';
import assert from 'node:assert/strict';
import { LOCAL_EXPERIENCES } from '../data/experiencesData.ts';
import {
  filterExperiences,
  getCategoryCounts,
  getCategoryLabel,
} from './experiencesHelper.ts';

test('getCategoryCounts correctly tallies experiences by category', () => {
  const counts = getCategoryCounts(LOCAL_EXPERIENCES);
  assert.equal(counts.all, 10);
  assert.equal(counts.trekking, 4);
  assert.equal(counts.cultural, 3);
  assert.equal(counts.birdwatching, 3);
  assert.equal(counts.trekking + counts.cultural + counts.birdwatching, counts.all);
});

test('filterExperiences filters by category correctly', () => {
  const treks = filterExperiences(LOCAL_EXPERIENCES, 'trekking');
  assert.equal(treks.length, 4);
  assert.ok(treks.every((t) => t.category === 'trekking'));

  const cultural = filterExperiences(LOCAL_EXPERIENCES, 'cultural');
  assert.equal(cultural.length, 3);
  assert.ok(cultural.every((c) => c.category === 'cultural'));

  const birding = filterExperiences(LOCAL_EXPERIENCES, 'birdwatching');
  assert.equal(birding.length, 3);
  assert.ok(birding.every((b) => b.category === 'birdwatching'));
});

test('filterExperiences performs keyword search across titles, sightings, and tips', () => {
  // Search for bird species
  const kingfisher = filterExperiences(LOCAL_EXPERIENCES, 'all', 'Kingfisher');
  assert.ok(kingfisher.length >= 1);
  assert.ok(kingfisher.some((e) => e.id === 'sindh-valley-riparian-birding'));

  // Search for ancient temple ruins
  const temple = filterExperiences(LOCAL_EXPERIENCES, 'all', 'Naranag');
  assert.equal(temple.length, 1);
  assert.equal(temple[0].id, 'naranag-wangath-temple-trail');

  // Search for village craft
  const walnut = filterExperiences(LOCAL_EXPERIENCES, 'all', 'walnut');
  assert.ok(walnut.length >= 2);
});

test('filterExperiences filters by difficulty level', () => {
  const gentle = filterExperiences(LOCAL_EXPERIENCES, 'all', '', 'Gentle / Family');
  assert.ok(gentle.length >= 5);
  assert.ok(gentle.every((g) => g.difficulty === 'Gentle / Family'));

  const challenging = filterExperiences(LOCAL_EXPERIENCES, 'all', '', 'Challenging');
  assert.equal(challenging.length, 1);
  assert.equal(challenging[0].id, 'nichnai-approach-meadow-trek');
});

test('getCategoryLabel returns appropriate human-readable titles', () => {
  assert.equal(getCategoryLabel('all'), 'All Experiences');
  assert.equal(getCategoryLabel('trekking'), 'Curated Treks & Hikes');
  assert.equal(getCategoryLabel('cultural'), 'Cultural Village Visits');
  assert.equal(getCategoryLabel('birdwatching'), 'Bird Watching & Flora');
});
