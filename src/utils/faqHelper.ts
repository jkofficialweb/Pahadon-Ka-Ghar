import { FAQItem } from '../data/faqData.ts';

export function filterFAQs(
  items: FAQItem[],
  category: string,
  searchQuery: string
): FAQItem[] {
  const query = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    // Category match
    if (category !== 'all' && item.category !== category) {
      return false;
    }

    // Search query match across question, answer, and highlights
    if (query) {
      const matchQuestion = item.question.toLowerCase().includes(query);
      const matchAnswer = item.answer.toLowerCase().includes(query);
      const matchHighlights =
        item.highlights?.some((h) => h.toLowerCase().includes(query)) ?? false;
      return matchQuestion || matchAnswer || matchHighlights;
    }

    return true;
  });
}
