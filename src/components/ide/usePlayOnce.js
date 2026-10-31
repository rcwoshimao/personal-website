import { useEffect, useState } from 'react';

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const played = new Set();

// For intro animations that play once per page load, not every time a tab is reopened.
// Returns true when animation `name` should be skipped: it already played, or the user prefers reduced motion.
// Decided once on mount; re-checking on later renders would cancel the animation midway.
export const usePlayOnce = (name) => {
  const [skip] = useState(() => played.has(name) || prefersReducedMotion());
  useEffect(() => {
    played.add(name);
  }, [name]);
  return skip;
};
