export type ExperienceCategory = 'all' | 'trekking' | 'cultural' | 'birdwatching';

export type ExperienceDifficulty = 'Gentle / Family' | 'Moderate' | 'Challenging';

export interface LocalExperience {
  id: string;
  title: string;
  subtitle: string;
  category: 'trekking' | 'cultural' | 'birdwatching';
  location: string;
  distanceFromResort: string;
  duration: string;
  elevationGain?: string;
  difficulty: ExperienceDifficulty;
  bestTimeOfDay: string;
  bestSeason: string;
  highlights: string[];
  keySightingsOrCrafts: string[];
  description: string;
  localHostTip: string;
  image: string;
  guideAvailable: boolean;
  gearProvided: string[];
  recommendedWear: string;
}

export interface ExperienceFilterOptions {
  category: ExperienceCategory;
  searchQuery: string;
  difficulty: 'all' | ExperienceDifficulty;
}
