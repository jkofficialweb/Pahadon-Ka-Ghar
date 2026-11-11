import test from 'node:test';
import assert from 'node:assert/strict';
import {
  decodeWeatherCode,
  getPackingRecommendation,
  getMountainActivityAdvisory,
} from './weather.ts';

test('decodeWeatherCode identifies clear skies and rain correctly', () => {
  const clearDay = decodeWeatherCode(0, 1);
  assert.equal(clearDay.conditionGroup, 'clear');
  assert.match(clearDay.description, /Clear/);

  const rain = decodeWeatherCode(61, 1);
  assert.equal(rain.conditionGroup, 'rain');
  assert.match(rain.description, /Rain/);

  const snow = decodeWeatherCode(71, 1);
  assert.equal(snow.conditionGroup, 'snow');
  assert.match(snow.description, /Snow/);
});

test('getPackingRecommendation provides thermal advice for cold temperatures', () => {
  const subZeroPacking = getPackingRecommendation(1, 10, 0);
  assert.match(subZeroPacking, /Thermal layers/i);

  const snowPacking = getPackingRecommendation(-2, 3, 73);
  assert.match(snowPacking, /Heavy down jacket/i);

  const pleasantPacking = getPackingRecommendation(14, 25, 0);
  assert.match(pleasantPacking, /cotton/i);
});

test('getMountainActivityAdvisory gives appropriate activity recommendations', () => {
  const rainAdvisory = getMountainActivityAdvisory(63, 12);
  assert.match(rainAdvisory, /Kahwa/i);

  const glacierAdvisory = getMountainActivityAdvisory(0, 22);
  assert.match(glacierAdvisory, /Thajiwas/i);
});
