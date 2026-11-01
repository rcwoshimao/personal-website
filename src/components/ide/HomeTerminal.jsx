import { useEffect, useRef, useState } from 'react';
import { usePlayOnce } from './usePlayOnce';
import { scrollTerminalToBottom } from './terminalScroll';
import Prompt from './Prompt';
import ShellInput from './ShellInput';
import DotClock from './DotClock';
import BrailleArt from './BrailleArt';
import SymbolBox, { BOX_ACCENTS } from './SymbolBox';
import PrintLines from './PrintLines';
import { INFO, INTRO, SOCIALS } from './profile';
import { CAT_LINES } from './art/catAlien';
import { LINES as rcLogo, COLORS as rcColors } from './art/rcLogo';
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

const INFO_LINES = [
  ...INFO.map(([key, value]) => <><span className="tile-key">{key}</span> {value}</>),
  '',
  // neofetch-style color swatches: every color in the logo
  <span className="tile-palette" aria-hidden="true">
    {rcColors.map((c) => <span key={c} style={{ background: c }} />)}
  </span>,
];

const SOCIAL_LINES = SOCIALS.map(({ label, href }) => (
  <a className="term-link" href={href} target="_blank" rel="noopener noreferrer">→ {label}</a>
));

// Dashboard parts print in order: logo, info, intro, clock + cat, links, then the prompt
const LAST_STAGE = 5;

const HomeTerminal = () => {
  const skip = usePlayOnce('home');
  const [typed, setTyped] = useState(skip ? COMMAND.length : 0);
  const [lines, setLines] = useState(skip ? BOOT_LINES.length : 0);
  const [progress, setProgress] = useState(skip ? PROGRESS_DOTS : 0);
  const [stage, setStage] = useState(skip ? LAST_STAGE : 0);
  const [printed, setPrinted] = useState(0);

  // Progress handler for stage n: counts printed lines (for scrolling) and moves on when complete
  const advance = (n) => (_, complete) => {
    setPrinted((p) => p + 1);
    if (complete) setStage((s) => Math.max(s, n + 1));
  };

  useEffect(() => {
    if (skip) return;

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
  }, [typed, lines, progress, done, stage, printed]);

  return (
    <>
      <Prompt path="home" cursor={typing || (!done && lines === 0)} status={done ? 'ok' : undefined}>
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
        <div className="tiles">
          <SymbolBox className="tile tile-wide tile-about" accent={BOX_ACCENTS[0]} title={<h2 className="pbox-title">whoami</h2>}>
            <BrailleArt
              art={rcLogo}
              colors={rcColors}
              label="RC logo"
              squash={0.83}
              animate={!skip}
              className="tile-logo"
              onProgress={advance(0)}
            />
            <div className="tile-about-text">
              {stage >= 1 && <PrintLines lines={INFO_LINES} animate={!skip} onProgress={advance(1)} />}
              {stage >= 2 && (
                <PrintLines className="tile-intro" lines={INTRO} animate={!skip} onProgress={advance(2)} />
              )}
            </div>
            {/* Right column: clock above the cat */}
            {stage >= 3 && (
              <div className="tile-side">
                <DotClock />
                <figure className="tile-cat">
                  <BrailleArt art={CAT_LINES} label="cat alien" animate={!skip} onProgress={advance(3)} />
                  {stage >= 4 && <figcaption>art by STATlover12</figcaption>}
                </figure>
              </div>
            )}
          </SymbolBox>

          {stage >= 4 && (
            <SymbolBox className="tile tile-wide" accent={BOX_ACCENTS[2]} title={<h2 className="pbox-title">links</h2>}>
              <PrintLines lines={SOCIAL_LINES} interval={120} animate={!skip} onProgress={advance(4)} />
            </SymbolBox>
          )}
        </div>
      )}
      {stage >= 5 && <ShellInput path="home" />}
      <div ref={endRef} />
    </>
  );
};

export default HomeTerminal;
