import test from 'node:test';
import assert from 'node:assert/strict';
import { getAssetUrl } from './assets.ts';

test('getAssetUrl returns empty string for empty input', () => {
  assert.equal(getAssetUrl(''), '');
  assert.equal(getAssetUrl(undefined), '');
  assert.equal(getAssetUrl(null), '');
});

test('getAssetUrl keeps remote http/https/data URLs unchanged', () => {
  const remoteHttp = 'http://example.com/image.jpg';
  const remoteHttps = 'https://images.unsplash.com/photo-123';
  const dataUri = 'data:image/png;base64,iVBORw0KGgo';
  assert.equal(getAssetUrl(remoteHttp), remoteHttp);
  assert.equal(getAssetUrl(remoteHttps), remoteHttps);
  assert.equal(getAssetUrl(dataUri), dataUri);
});

test('getAssetUrl normalizes /src/assets/images/ to assets/images/', () => {
  const result = getAssetUrl('/src/assets/images/hero.jpg');
  assert.ok(result.includes('assets/images/hero.jpg'));
  assert.ok(!result.includes('/src/assets/images/'));
});

test('getAssetUrl normalizes leading slash for public assets', () => {
  const result = getAssetUrl('/assets/hotel/real_rooms_grid.jpg');
  assert.ok(result.includes('assets/hotel/real_rooms_grid.jpg'));
  assert.ok(result.startsWith('./') || result.startsWith('/'));
});

test('getAssetUrl is idempotent when called multiple times on an already resolved path', () => {
  const first = getAssetUrl('/assets/hotel/real_rooms_grid.jpg');
  const second = getAssetUrl(first);
  assert.equal(first, second);
});
