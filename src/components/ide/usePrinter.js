import { useEffect, useState } from 'react';

// Reveals `count` items one at a time, like terminal output.
// `onProgress(shown, done)` fires after each step so the parent can scroll or chain the next part.
export const usePrinter = (count, { interval = 25, animate = true, onProgress } = {}) => {
  const [shown, setShown] = useState(animate ? 0 : count);

  useEffect(() => {
    onProgress?.(shown, shown >= count);
  }, [shown]);

  useEffect(() => {
    if (shown >= count) return;
    const id = setTimeout(() => setShown(shown + 1), interval);
    return () => clearTimeout(id);
  }, [shown, count, interval]);

  return shown;
};
