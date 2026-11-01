// Monkeytype profile, from the public API (no key needed).
export const MONKEYTYPE_USER = 'rc_woshimao';
export const MONKEYTYPE_URL = `https://monkeytype.com/profile/${MONKEYTYPE_USER}`;

const API = `https://api.monkeytype.com/users/${MONKEYTYPE_USER}/profile`;

// Fetched once per page load; reopening the tab reuses the same request
let request;

export const fetchMonkeytype = () => {
  request ??= fetch(API)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(({ data }) => data)
    .catch((err) => {
      request = undefined; // let the next visit try again
      throw err;
    });
  return request;
};

// Best plain-english result (no punctuation or numbers) for each mode, e.g. { 15: {wpm, acc}, 30: ... }
export const bestsFor = (results = {}) =>
  Object.entries(results).flatMap(([mode, runs]) => {
    const plain = runs.filter((r) => r.language === 'english' && !r.punctuation && !r.numbers);
    if (!plain.length) return [];
    const best = plain.reduce((a, b) => (b.wpm > a.wpm ? b : a));
    return [{ mode, wpm: best.wpm, acc: best.acc }];
  });

export const formatHours = (seconds) => `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
