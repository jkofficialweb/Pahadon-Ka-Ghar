/**
 * Pure validation and subscription helper for newsletter signups
 */

export interface NewsletterSubscription {
  email: string;
  name?: string;
  interests: string[];
  subscribedAt: string;
}

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  // Standard robust email validation pattern
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

export function formatSubscriptionConfirmation(email: string, interests: string[]): string {
  const count = interests.length;
  if (count === 0) {
    return `Thank you! You are now subscribed to Pahadon Ka Ghar Valley Notes at ${email}.`;
  }
  return `Welcome to the Pahadon Ka Ghar family! You'll receive seasonal Kashmir updates for: ${interests.join(', ')}.`;
}
