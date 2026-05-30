'use client';

import { useEffect } from 'react';

/**
 * Apply split-text animation to all h1 & h2 elements on page load
 * Words slide in from left & right, meeting in center over 0.6s
 */
export default function SplitTextAnimator() {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Find all h1 and h2 elements
    const headings = document.querySelectorAll('h1, h2');

    headings.forEach((heading) => {
      if (heading.hasAttribute('data-split-animated')) return; // Skip if already processed

      const text = heading.textContent || '';
      const words = text.split(' ');

      // Only animate if we have at least 2 words
      if (words.length < 2) return;

      heading.setAttribute('data-split-animated', 'true');
      heading.innerHTML = '';

      // Alternate left/right for each word
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.setAttribute('data-split', index % 2 === 0 ? 'left' : 'right');
        heading.appendChild(span);

        // Add space between words (except last)
        if (index < words.length - 1) {
          heading.appendChild(document.createTextNode(' '));
        }
      });
    });
  }, []);

  return null;
}
