import { useEffect, useState } from 'react';

// Reveals `count` items `step` at a time, like terminal output.
// `onProgress(shown, done)` fires after each step so the parent can scroll or chain the next part.
export const usePrinter = (count, { interval = 25, step = 1, animate = true, onProgress } = {}) => {
  const [shown, setShown] = useState(animate ? 0 : count);

  useEffect(() => {
    onProgress?.(shown, shown >= count);
  }, [shown]);

  useEffect(() => {
    if (shown >= count) return;
    const id = setTimeout(() => setShown(Math.min(count, shown + step)), interval);
    return () => clearTimeout(id);
  }, [shown, count, interval, step]);

  return shown;
};
