import { useEffect, useRef, useState } from 'react';
import { scrollTerminalToBottom } from './terminalScroll';
import Prompt from './Prompt';
import ShellInput from './ShellInput';
import DotClock from './DotClock';
import AsciiArt from './AsciiArt';
import catAlien from './art/catAlien';
import { LINES as rcLogo, COLORS as rcColors } from './art/rcLogo2';
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

// One run per line, so the cat prints line by line like the logo
const CAT_LINES = catAlien.split('\n').filter((l) => l.length).map((l) => [l]);

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
  const [logo, setLogo] = useState({ lines: 0, done: skip });
  const [cat, setCat] = useState({ lines: 0, done: skip });

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

  // Follow the boot output down like a real terminal, ending at the live prompt
  const endRef = useRef(null);
  useEffect(() => {
    scrollTerminalToBottom(endRef.current);
  }, [typed, lines, progress, done, logo, cat]);

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
          <AsciiArt
            lines={rcLogo}
            colors={rcColors}
            label="RC logo"
            braille
            squash={0.83}
            animate={!skip}
            onProgress={(n, complete) => setLogo({ lines: n, done: complete })}
          />
          {logo.done && (
            <>
              <DotClock />
              <figure className="home-art">
                <AsciiArt
                  lines={CAT_LINES}
                  label="cat alien"
                  braille
                  animate={!skip}
                  onProgress={(n, complete) => setCat({ lines: n, done: complete })}
                />
                {cat.done && <figcaption>art by STATlover12</figcaption>}
              </figure>
              {cat.done && <ShellInput path="home" />}
            </>
          )}
        </>
      )}
      <div ref={endRef} />
    </>
  );
};

export default HomeTerminal;
