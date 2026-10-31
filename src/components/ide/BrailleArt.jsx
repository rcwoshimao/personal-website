import { useMemo } from 'react';

// Each braille character is a 2x4 grid of dots; bit -> [column, row]
const BRAILLE_DOTS = [
  [0x01, 0, 0], [0x02, 0, 1], [0x04, 0, 2], [0x40, 0, 3],
  [0x08, 1, 0], [0x10, 1, 1], [0x20, 1, 2], [0x80, 1, 3],
];

const CELL = 10;

const parse = (art) => {
  const lines = art.split('\n').filter((l) => l.length);
  const dots = [];
  lines.forEach((line, row) =>
    [...line].forEach((ch, col) => {
      const bits = ch.codePointAt(0) - 0x2800;
      if (bits <= 0 || bits > 0xff) return;
      BRAILLE_DOTS.forEach(([bit, dx, dy]) => {
        if (bits & bit) dots.push({ x: col * 2 + dx, y: row * 4 + dy });
      });
    })
  );
  const cols = Math.max(...lines.map((l) => [...l].length)) * 2;
  return { dots, cols, rows: lines.length * 4 };
};

// Renders braille text art as SVG dots so it looks the same in every font and scales to fit.
const BrailleArt = ({ art, label, className = '' }) => {
  const { dots, cols, rows } = useMemo(() => parse(art), [art]);

  return (
    <svg
      className={`braille-art ${className}`}
      viewBox={`0 0 ${cols * CELL} ${rows * CELL}`}
      role="img"
      aria-label={label}
    >
      {dots.map(({ x, y }) => (
        <circle key={`${x}-${y}`} cx={x * CELL + CELL / 2} cy={y * CELL + CELL / 2} r={CELL * 0.4} />
      ))}
    </svg>
  );
};

export default BrailleArt;
