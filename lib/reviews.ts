'use client';

import { type Review, REVIEWS_SEED } from './site-data';

const STORAGE_KEY = 'creavix_user_reviews';

/**
 * Seed reviews — hardcoded, never duplicated or modified
 */
export const SEED_REVIEWS = REVIEWS_SEED;

/**
 * Get stored user reviews from localStorage
 */
export function getStoredReviews(): Review[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Save a new review to localStorage
 */
export function saveReview(review: Review): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredReviews();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, review]));
  } catch (err) {
    console.error('[v0] Failed to save review:', err);
  }
}

/**
 * Get all reviews (seed + user-submitted)
 */
export function getAllReviews(): Review[] {
  return [...SEED_REVIEWS, ...getStoredReviews()];
}

/**
 * Calculate review stats (average rating, count)
 */
export function getReviewStats(): { count: number; average: number } {
  const reviews = getAllReviews();
  const count = reviews.length;
  const average = count > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 5;
  return { count, average };
}
