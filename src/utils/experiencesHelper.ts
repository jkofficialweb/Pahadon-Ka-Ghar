import { LocalExperience, ExperienceCategory, ExperienceDifficulty } from '../types/experience.ts';

export interface CategorySummary {
  all: number;
  trekking: number;
  cultural: number;
  birdwatching: number;
}

/**
 * Filter experiences by category, text query, and difficulty level
 */
export function filterExperiences(
  items: LocalExperience[],
  category: ExperienceCategory = 'all',
  searchQuery = '',
  difficulty: 'all' | ExperienceDifficulty = 'all'
): LocalExperience[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    // 1. Category match
    if (category !== 'all' && item.category !== category) {
      return false;
    }

    // 2. Difficulty match
    if (difficulty !== 'all' && item.difficulty !== difficulty) {
      return false;
    }

    // 3. Search query match
    if (!normalizedQuery) {
      return true;
    }

    const matchesTitle = item.title.toLowerCase().includes(normalizedQuery);
    const matchesSubtitle = item.subtitle.toLowerCase().includes(normalizedQuery);
    const matchesLocation = item.location.toLowerCase().includes(normalizedQuery);
    const matchesDesc = item.description.toLowerCase().includes(normalizedQuery);
    const matchesTip = item.localHostTip.toLowerCase().includes(normalizedQuery);
    const matchesHighlights = item.highlights.some((h) =>
      h.toLowerCase().includes(normalizedQuery)
    );
    const matchesSightings = item.keySightingsOrCrafts.some((s) =>
      s.toLowerCase().includes(normalizedQuery)
    );

    return (
      matchesTitle ||
      matchesSubtitle ||
      matchesLocation ||
      matchesDesc ||
      matchesTip ||
      matchesHighlights ||
      matchesSightings
    );
  });
}

/**
 * Compute counts per category
 */
export function getCategoryCounts(items: LocalExperience[]): CategorySummary {
  return {
    all: items.length,
    trekking: items.filter((x) => x.category === 'trekking').length,
    cultural: items.filter((x) => x.category === 'cultural').length,
    birdwatching: items.filter((x) => x.category === 'birdwatching').length,
  };
}

/**
 * Format category label nicely
 */
export function getCategoryLabel(category: ExperienceCategory): string {
  switch (category) {
    case 'trekking':
      return 'Curated Treks & Hikes';
    case 'cultural':
      return 'Cultural Village Visits';
    case 'birdwatching':
      return 'Bird Watching & Flora';
    default:
      return 'All Experiences';
  }
}
