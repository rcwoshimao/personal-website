import { useEffect, useState } from 'react';
import Prompt from './Prompt';
import DotClock from './DotClock';
import BrailleArt from './BrailleArt';
import catAlien from './art/catAlien';
import './HomeTerminal.css';

const COMMAND = './home.exe';

const BOOT_LINES = [
  { status: 'ok', text: 'mounting /dev/brain' },
  { status: 'ok', text: 'loading coffee.dll' },
  { status: 'ok', text: 'untangling headphones' },
  { status: 'ok', text: 'calibrating vibes', progress: true },
  { status: '>>', text: 'starting home.exe' },
];

const PROGRESS_DOTS = 5;

// The boot animation plays once per page load, not every time the tab is reopened.
let hasBooted = false;

const HomeTerminal = () => {
  // Decided once on mount; re-reading hasBooted on later renders would cancel the animation midway
  const [skip] = useState(
    () => hasBooted || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [typed, setTyped] = useState(skip ? COMMAND.length : 0);
  const [lines, setLines] = useState(skip ? BOOT_LINES.length : 0);
  const [progress, setProgress] = useState(skip ? PROGRESS_DOTS : 0);

  useEffect(() => {
    if (skip) return;
    hasBooted = true;

    const timers = [];
    let t = 300;
    for (let i = 1; i <= COMMAND.length; i++) {
      t += 45;
      timers.push(setTimeout(() => setTyped(i), t));
    }
    t += 250;
    for (let i = 1; i <= BOOT_LINES.length; i++) {
      t += 110;
      timers.push(setTimeout(() => setLines(i), t));
      // Progress line: print dots one by one at an uneven pace before moving on
      if (BOOT_LINES[i - 1].progress) {
        for (let p = 1; p <= PROGRESS_DOTS; p++) {
          t += 30 + Math.random() * 60;
          timers.push(setTimeout(() => setProgress(p), t));
        }
      }
    }
    return () => timers.forEach(clearTimeout);
  }, [skip]);

  const typing = typed < COMMAND.length;
  const done = lines === BOOT_LINES.length;

  return (
    <>
      <Prompt path="home" cursor={typing || (!done && lines === 0)}>
        {COMMAND.slice(0, typed)}
      </Prompt>

      {BOOT_LINES.slice(0, lines).map(({ status, text, progress: isProgress }) => {
        const loading = isProgress && progress < PROGRESS_DOTS;
        return (
          <div key={text} className="ide-line">
            <span className="boot-status">[{loading ? '..' : status}]</span> {text}
            {isProgress && ` ${'.'.repeat(progress)} ${Math.round((progress / PROGRESS_DOTS) * 100)}%`}
          </div>
        );
      })}

      {done && (
        <>
          <DotClock />
          <figure className="home-art">
            <BrailleArt art={catAlien} label="cat alien" />
            <figcaption>art by STATlover12</figcaption>
          </figure>
          <Prompt path="home" />
        </>
      )}
    </>
  );
};

export default HomeTerminal;
