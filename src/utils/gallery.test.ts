import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { GALLERY_PHOTOS, TRAINING_PHOTOS } from '../data/galleryData.ts';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { ROOMS_DATA, ATTRACTIONS_DATA, WAZWAN_DISHES, HOTEL_INFO } from '../data/hotelData.ts';
import { LOCAL_EXPERIENCES } from '../data/experiencesData.ts';
import { filterGalleryPhotos, getGalleryCategoryCounts } from './galleryHelper.ts';

test('GALLERY_PHOTOS includes every single uploaded photo from public/assets/aistudio', () => {
  const aistudioDir = path.resolve(process.cwd(), 'public/assets/aistudio');
  const diskImages = fs
    .readdirSync(aistudioDir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();

  const galleryFilenames = GALLERY_PHOTOS.map((p) => p.filename).sort();

  assert.equal(galleryFilenames.length, diskImages.length);
  assert.deepEqual(galleryFilenames, diskImages);
});

test('TRAINING_PHOTOS contains all 13 hospitality training photographs', () => {
  assert.equal(TRAINING_PHOTOS.length, 13);
  assert.ok(TRAINING_PHOTOS.every((p) => p.category === 'academy'));
});

test('filterGalleryPhotos and getGalleryCategoryCounts behave accurately', () => {
  const counts = getGalleryCategoryCounts(GALLERY_PHOTOS);
  assert.equal(
    counts.all,
    counts.resort + counts.rooms + counts.dining + counts.tours + counts.academy
  );

  const dining = filterGalleryPhotos(GALLERY_PHOTOS, 'dining');
  assert.equal(dining.length, counts.dining);
  assert.ok(dining.every((p) => p.category === 'dining'));

  const searchMatches = filterGalleryPhotos(GALLERY_PHOTOS, 'all', 'Sonamarg');
  assert.ok(searchMatches.length > 0);
  assert.ok(
    searchMatches.every((p) =>
      `${p.title} ${p.location} ${p.description}`.toLowerCase().includes('sonamarg')
    )
  );
});

test('SERVICES_DATA covers all 4 requested services with real aistudio photos', () => {
  const ids = SERVICES_DATA.map((s) => s.id);
  assert.deepEqual(ids, ['hotel-reservations', 'online-service', 'travel-guides', 'domestic-tours']);

  for (const service of SERVICES_DATA) {
    assert.ok(service.primaryImage.includes('assets/aistudio/'));
    assert.ok(service.galleryImages.length >= 4);
    for (const img of service.galleryImages) {
      assert.ok(img.src.includes('assets/aistudio/'));
    }
  }
});

test('All website data modules use genuine aistudio photos and updated emails', () => {
  assert.equal(HOTEL_INFO.email, 'info@pahadonkaghar.com');
  assert.equal(HOTEL_INFO.secondaryEmail, 'pahadonkaghar@gmail.com');

  const allUrls: string[] = [
    ...ROOMS_DATA.flatMap((r) => [r.image, ...r.galleryImages]),
    ...ATTRACTIONS_DATA.map((a) => a.image),
    ...WAZWAN_DISHES.map((d) => d.image || ''),
    ...LOCAL_EXPERIENCES.map((e) => e.image),
  ];

  for (const url of allUrls) {
    assert.ok(url.includes('assets/aistudio/'), `Expected real aistudio asset, got: ${url}`);
    assert.ok(!url.includes('assets/images/'), `Disallowed synthetic image path: ${url}`);
    assert.ok(!url.includes('assets/hotel/'), `Disallowed legacy hotel image path: ${url}`);
  }
});
