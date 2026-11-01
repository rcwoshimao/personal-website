import { useEffect, useRef, useState } from 'react';
import { usePlayOnce } from './usePlayOnce';
import { scrollTerminalToBottom } from './terminalScroll';
import Prompt from './Prompt';
import ShellInput from './ShellInput';
import SymbolBox, { BOX_ACCENTS } from './SymbolBox';
import PrintLines from './PrintLines';
import { MONKEYTYPE_USER, MONKEYTYPE_URL, fetchMonkeytype, bestsFor, formatHours } from './monkeytype';
import './MiscTerminal.css';

const COMMAND = `./monkeytype.exe --user ${MONKEYTYPE_USER}`;

// WPM that fills a bar completely
const BAR_MAX = 160;

const topPercent = ({ rank, count }) => `top ${((rank / count) * 100).toFixed(2)}%`;

const summaryLines = (data) => {
  const { typingStats: stats, streak, maxStreak, allTimeLbs } = data;
  const ranks = Object.entries(allTimeLbs?.time ?? {})
    .filter(([, lb]) => lb.english)
    .map(([mode, lb]) => `${mode}s ${topPercent(lb.english)}`);
  return [
    <><span className="tile-key">tests</span> {stats.completedTests.toLocaleString()} completed</>,
    <><span className="tile-key">typing</span> {formatHours(stats.timeTyping)}</>,
    <><span className="tile-key">streak</span> {streak} days (best {maxStreak})</>,
    ...(ranks.length ? [<><span className="tile-key">rank</span> {ranks.join(' · ')}</>] : []),
    '',
    <a className="term-link" href={MONKEYTYPE_URL} target="_blank" rel="noopener noreferrer">→ full profile</a>,
  ];
};

// One personal best per line: mode, wpm bar, wpm, accuracy
const bestLines = (bests, unit) =>
  bests.map(({ mode, wpm, acc }) => (
    <span className="mt-row">
      <span className="mt-mode">{mode}{unit}</span>
      <span className="mt-bar" aria-hidden="true">
        <span style={{ width: `${Math.min(100, (wpm / BAR_MAX) * 100)}%` }} />
      </span>
      <span className="mt-wpm">{Math.round(wpm)} wpm</span>
      <span className="mt-acc">{Math.round(acc)}%</span>
    </span>
  ));

// Boxes print in order: summary, time, words, then the prompt
const LAST_STAGE = 3;

const MiscTerminal = () => {
  const skip = usePlayOnce('misc');
  const [typed, setTyped] = useState(skip ? COMMAND.length : 0);
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const [stage, setStage] = useState(0);
  const [printed, setPrinted] = useState(0);
  const typing = typed < COMMAND.length;

  const advance = (n) => (_, complete) => {
    setPrinted((p) => p + 1);
    if (complete) setStage((s) => Math.max(s, n + 1));
  };

  // Type the command one character at a time
  useEffect(() => {
    if (!typing) return;
    const id = setTimeout(() => setTyped(typed + 1), typed === 0 ? 200 : 35);
    return () => clearTimeout(id);
  }, [typed, typing]);

  // Start fetching right away so the stats are usually ready once typing ends
  useEffect(() => {
    let live = true;
    fetchMonkeytype()
      .then((d) => live && setData(d))
      .catch(() => live && setFailed(true));
    return () => { live = false; };
  }, []);

  const ready = !typing && data;
  const shownStage = skip && ready ? LAST_STAGE : stage;

  const endRef = useRef(null);
  useEffect(() => {
    scrollTerminalToBottom(endRef.current);
  }, [typed, ready, failed, stage, printed]);

  const status = typing ? undefined : failed ? 'error' : ready ? 'ok' : undefined;

  return (
    <>
      <Prompt path="misc" cursor={typing} status={status}>
        {COMMAND.slice(0, typed)}
      </Prompt>

      {!typing && !data && !failed && (
        <div className="ide-line"><span className="boot-status">[..]</span> fetching profile from api.monkeytype.com</div>
      )}

      {!typing && failed && (
        <div className="ide-line mt-error">monkeytype: could not reach api.monkeytype.com, try again later</div>
      )}

      {ready && (
        <div className="tiles mt-tiles">
          <SymbolBox className="tile tile-wide" accent={BOX_ACCENTS[3]} title={<h2 className="pbox-title">monkeytype</h2>}>
            <PrintLines lines={summaryLines(data)} animate={!skip} onProgress={advance(0)} />
          </SymbolBox>

          {shownStage >= 1 && (
            <SymbolBox className="tile" accent={BOX_ACCENTS[4]} footer="english" title={<h2 className="pbox-title">time</h2>}>
              <PrintLines lines={bestLines(bestsFor(data.personalBests?.time), 's')} interval={120} animate={!skip} onProgress={advance(1)} />
            </SymbolBox>
          )}

          {shownStage >= 2 && (
            <SymbolBox className="tile" accent={BOX_ACCENTS[5]} footer="english" title={<h2 className="pbox-title">words</h2>}>
              <PrintLines lines={bestLines(bestsFor(data.personalBests?.words), 'w')} interval={120} animate={!skip} onProgress={advance(2)} />
            </SymbolBox>
          )}
        </div>
      )}

      {(failed || shownStage >= LAST_STAGE) && <ShellInput path="misc" />}
      <div ref={endRef} />
    </>
  );
};

export default MiscTerminal;
