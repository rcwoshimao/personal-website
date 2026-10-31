import { useEffect, useState } from 'react';
import './DotClock.css';

// 5x7 dot-matrix glyphs ("1" = lit dot)
const GLYPHS = {
  0: ['01110', '10001', '10011', '10101', '11001', '10001', '01110'],
  1: ['00100', '01100', '10100', '00100', '00100', '00100', '11111'],
  2: ['01110', '10001', '00001', '00010', '00100', '01000', '11111'],
  3: ['11110', '00001', '00001', '01110', '00001', '00001', '11110'],
  4: ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
  5: ['11111', '10000', '11110', '00001', '00001', '10001', '01110'],
  6: ['00110', '01000', '10000', '11110', '10001', '10001', '01110'],
  7: ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  8: ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
  9: ['01110', '10001', '10001', '01111', '00001', '00010', '01100'],
  ':': ['010', '111', '010', '000', '010', '111', '010'],
};

const CELL = 10;
const ROWS = 7;
const PAD = 1; // empty grid cells around the digits

const pad2 = (n) => String(n).padStart(2, '0');

const isoWeek = (d) => {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return Math.ceil(((t - yearStart) / 86400000 + 1) / 7);
};

const useNow = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
};

const DotClock = () => {
  const now = useNow();
  const chars = [...`${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`];

  // Lay glyphs out left to right with a one-column gap between them
  const lit = [];
  let col = PAD;
  chars.forEach((ch) => {
    const glyph = GLYPHS[ch];
    glyph.forEach((row, r) =>
      [...row].forEach((bit, c) => {
        if (bit === '1') lit.push({ x: col + c, y: PAD + r });
      })
    );
    col += glyph[0].length + 1;
  });

  const cols = col - 1 + PAD;
  const rows = ROWS + PAD * 2;
  const grid = [];
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) grid.push({ x, y });

  const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });
  const month = now.toLocaleDateString('en-US', { month: 'long' });

  return (
    <div className="dot-clock">
      <svg
        viewBox={`0 0 ${cols * CELL} ${rows * CELL}`}
        role="img"
        aria-label={`${chars.join('')}`}
      >
        {grid.map(({ x, y }) => (
          <circle key={`g${x}-${y}`} className="dot-bg" cx={x * CELL + CELL / 2} cy={y * CELL + CELL / 2} r={0.8} />
        ))}
        {lit.map(({ x, y }) => (
          <circle
            key={`d${x}-${y}`}
            className="dot-on"
            cx={x * CELL + CELL / 2}
            cy={y * CELL + CELL / 2}
            r={4.3}
          />
        ))}
      </svg>
      <div className="dot-clock-date">
        {weekday} · {now.getDate()} {month} · week {isoWeek(now)}
      </div>
    </div>
  );
};

export default DotClock;
