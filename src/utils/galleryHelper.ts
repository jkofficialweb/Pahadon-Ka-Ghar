import { GalleryPhoto, GalleryPhotoCategory } from '../data/galleryData.ts';

export type GalleryFilterCategory = 'all' | GalleryPhotoCategory;

export function getGalleryCategoryCounts(
  photos: GalleryPhoto[]
): Record<GalleryFilterCategory, number> {
  const counts: Record<GalleryFilterCategory, number> = {
    all: photos.length,
    resort: 0,
    rooms: 0,
    dining: 0,
    tours: 0,
    academy: 0,
  };

  for (const photo of photos) {
    counts[photo.category] += 1;
  }

  return counts;
}

export function filterGalleryPhotos(
  photos: GalleryPhoto[],
  category: GalleryFilterCategory,
  searchQuery: string = ''
): GalleryPhoto[] {
  const q = searchQuery.trim().toLowerCase();

  return photos.filter((photo) => {
    if (category !== 'all' && photo.category !== category) {
      return false;
    }

    if (!q) return true;

    return (
      photo.title.toLowerCase().includes(q) ||
      photo.location.toLowerCase().includes(q) ||
      photo.description.toLowerCase().includes(q) ||
      photo.categoryLabel.toLowerCase().includes(q)
    );
  });
}
