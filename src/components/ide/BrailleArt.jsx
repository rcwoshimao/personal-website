import { useMemo } from 'react';

// Each braille character is a 2x4 grid of dots; bit -> [column, row]
const BRAILLE_DOTS = [
  [0x01, 0, 0], [0x02, 0, 1], [0x04, 0, 2], [0x40, 0, 3],
  [0x08, 1, 0], [0x10, 1, 1], [0x20, 1, 2], [0x80, 1, 3],
];

const CELL = 10;

// Normalizes art into lines of [char, colorIndex] pairs.
// Accepts plain braille text, or colored runs (a plain string is uncolored, [text, colorIndex] is colored).
const toCells = (art) =>
  typeof art === 'string'
    ? art.split('\n').filter((l) => l.length).map((l) => [...l].map((ch) => [ch, null]))
    : art.map((runs) =>
        runs.flatMap((run) =>
          typeof run === 'string' ? [...run].map((ch) => [ch, null]) : [...run[0]].map((ch) => [ch, run[1]])
        )
      );

const parse = (art) => {
  const lines = toCells(art);
  const dots = [];
  lines.forEach((line, row) =>
    line.forEach(([ch, color], col) => {
      const bits = ch.codePointAt(0) - 0x2800;
      if (bits <= 0 || bits > 0xff) return;
      BRAILLE_DOTS.forEach(([bit, dx, dy]) => {
        if (bits & bit) dots.push({ x: col * 2 + dx, y: row * 4 + dy, row, color });
      });
    })
  );
  const cols = Math.max(...lines.map((l) => l.length)) * 2;
  return { dots, cols, rows: lines.length * 4 };
};

// Renders braille text art as SVG dots so it looks the same in every font and scales to fit.
// `colors` maps color indexes to CSS colors; `shownRows` reveals only the first N text lines.
// `squash` scales the vertical dot spacing (fonts usually space braille dots wider than tall).
const BrailleArt = ({ art, colors, shownRows = Infinity, squash = 1, label, className = '' }) => {
  const { dots, cols, rows } = useMemo(() => parse(art), [art]);
  const cellY = CELL * squash;

  return (
    <svg
      className={`braille-art ${className}`}
      viewBox={`0 0 ${cols * CELL} ${rows * cellY}`}
      role="img"
      aria-label={label}
    >
      {dots.filter((d) => d.row < shownRows).map(({ x, y, color }) => (
        <circle
          key={`${x}-${y}`}
          cx={x * CELL + CELL / 2}
          cy={y * cellY + cellY / 2}
          r={Math.min(CELL, cellY) * 0.4}
          style={color != null ? { fill: colors[color] } : undefined}
        />
      ))}
    </svg>
  );
};

export default BrailleArt;
