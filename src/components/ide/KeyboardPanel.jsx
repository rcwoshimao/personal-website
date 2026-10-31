import { useEffect, useState } from 'react';
import './KeyboardPanel.css';

// [event.code, label, width in key units]
const letters = (chars) => [...chars].map((c) => [`Key${c}`, c, 1]);

const ROWS = [
  [
    ['Backquote', '`', 1],
    ...[...'1234567890'].map((d) => [`Digit${d}`, d, 1]),
    ['Minus', '-', 1], ['Equal', '=', 1], ['Backspace', 'BACK', 2],
  ],
  [
    ['Tab', 'TAB', 1.5], ...letters('QWERTYUIOP'),
    ['BracketLeft', '[', 1], ['BracketRight', ']', 1], ['Backslash', '\\', 1.5],
  ],
  [
    ['CapsLock', 'CAPS', 1.75], ...letters('ASDFGHJKL'),
    ['Semicolon', ';', 1], ['Quote', "'", 1], ['Enter', 'ENTER', 2.25],
  ],
  [
    ['ShiftLeft', 'SHIFT', 2.25], ...letters('ZXCVBNM'),
    ['Comma', ',', 1], ['Period', '.', 1], ['Slash', '/', 1], ['ShiftRight', 'SHIFT', 2.75],
  ],
  [
    ['ControlLeft', 'CTRL', 1.25], ['AltLeft', 'ALT', 1.25], ['MetaLeft', 'CMD', 1.25],
    ['Space', '', 6.25],
    ['MetaRight', 'CMD', 1.25], ['AltRight', 'ALT', 1.25],
    ['ArrowLeft', '←', 1], ['ArrowDown', '↓', 1], ['ArrowUp', '↑', 1], ['ArrowRight', '→', 1],
  ],
];

// Decorative keyboard that lights up the keys the visitor is pressing
const KeyboardPanel = () => {
  const [pressed, setPressed] = useState(() => new Set());

  useEffect(() => {
    const down = (e) =>
      setPressed((prev) => (prev.has(e.code) ? prev : new Set(prev).add(e.code)));

    const up = (e) => {
      // macOS swallows keyups while Cmd is held, so releasing Cmd clears everything
      if (e.key === 'Meta') return setPressed(new Set());
      setPressed((prev) => {
        if (!prev.has(e.code)) return prev;
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
    };

    const clear = () => setPressed(new Set());

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', clear);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', clear);
    };
  }, []);

  return (
    <div className="kb" aria-hidden="true">
      {ROWS.map((row, i) => (
        <div key={i} className="kb-row">
          {row.map(([code, label, width]) => (
            <span
              key={code}
              className={`kb-key ${pressed.has(code) ? 'is-pressed' : ''} ${
                code === 'Space' || code === 'Enter' || code.startsWith('Arrow') ? 'is-boxed' : ''
              }`}
              style={{ flexGrow: width }}
            >
              {label}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default KeyboardPanel;
