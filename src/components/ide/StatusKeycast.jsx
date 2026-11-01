import { useEffect, useRef, useState } from 'react';
import { VscRecordKeys } from 'react-icons/vsc';
import './StatusKeycast.css';

const MAX_KEYS = 8;
const LIFETIME = 1200; // ms; matches the keycast-life animation

// Short labels for special keys; letters and digits show as typed
const LABELS = {
  Enter: '⏎', Backspace: '⌫', ' ': '␣', Tab: '⇥', Escape: 'esc',
  Shift: '⇧', Meta: '⌘', Alt: '⌥', Control: '⌃', CapsLock: '⇪',
  ArrowLeft: '←', ArrowUp: '↑', ArrowRight: '→', ArrowDown: '↓',
};

const labelFor = (key) => LABELS[key] ?? (key.length === 1 ? key.toLowerCase() : key.toLowerCase().slice(0, 3));

// Status bar item that shows the last few keys pressed, each fading out after a moment.
const StatusKeycast = () => {
  const [keys, setKeys] = useState([]);
  const nextId = useRef(0);

  useEffect(() => {
    const timers = new Set();
    const onKeyDown = (e) => {
      const id = nextId.current++;
      setKeys((prev) => [...prev, { id, label: labelFor(e.key) }].slice(-MAX_KEYS));
      const t = setTimeout(() => {
        timers.delete(t);
        setKeys((prev) => prev.filter((k) => k.id !== id));
      }, LIFETIME);
      timers.add(t);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <span className="ide-status-item keycast">
      <VscRecordKeys className="keycast-icon" />
      {keys.map(({ id, label }) => (
        <span key={id} className="keycast-key">{label}</span>
      ))}
    </span>
  );
};

export default StatusKeycast;
