// "Data Analysis" -> "data-analysis"
export const tagSlug = (s) => s.toLowerCase().replace(/\s+/g, '-');

// Unique tags across projects, most used first
export const collectTags = (projects) => {
  const counts = new Map();
  projects.forEach(({ keywords = [] }) =>
    keywords.forEach((k) => counts.set(k, (counts.get(k) ?? 0) + 1))
  );
  return [...counts.keys()].sort((a, b) => counts.get(b) - counts.get(a));
};
