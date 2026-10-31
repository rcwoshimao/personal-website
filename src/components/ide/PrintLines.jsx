import { usePrinter } from './usePrinter';

// Prints a list of lines (any React content) one at a time.
const PrintLines = ({ lines, interval = 60, animate = true, onProgress, className = '', lineClassName = 'ide-line' }) => {
  const shown = usePrinter(lines.length, { interval, animate, onProgress });

  return (
    <div className={className}>
      {lines.slice(0, shown).map((line, i) => (
        <div key={i} className={lineClassName}>{line}</div>
      ))}
    </div>
  );
};

export default PrintLines;
