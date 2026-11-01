import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { VscError } from 'react-icons/vsc';
import Prompt from './Prompt';
import PrintLines from './PrintLines';
import { runCommand, toResult } from './commands';
import { ShellContext } from './shellContext';
import { scrollTerminalToBottom } from './terminalScroll';

const MAX_INPUT = 100;

// A command's question, e.g. "are you a recruiter? y n". Before it's answered the choices are
// buttons with the selected one highlighted; afterwards it shows the picked choice.
const Question = ({ question, choices, picked, selected, status, onPick }) => (
  <div className="ide-line ide-prompt-line">
    {status === 'error' && <VscError className="ide-deco is-error" aria-label="failed" />}
    {question}{' '}
    {picked ? (
      <span className="shell-picked">{picked}</span>
    ) : (
      choices.map((choice, i) => (
        <button
          key={choice}
          type="button"
          tabIndex={-1}
          className={`shell-choice ${i === selected ? 'is-selected' : ''}`}
          onClick={() => onPick(choice)}
        >
          {choice}
        </button>
      ))
    )}
  </div>
);

// The live prompt at the bottom of a terminal. Typed text is shown inside the
// prompt line; the real <input> is invisible and only captures keystrokes.
// Touch devices get a static prompt (they will use tappable suggestions instead).
const ShellInput = ({ path }) => {
  const shell = useContext(ShellContext);
  const [isTouch] = useState(() => window.matchMedia('(pointer: coarse)').matches);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);

  // Ready to type on arrival, without jumping the page down to the prompt
  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  // Keep the live prompt in view as output piles up
  useEffect(() => {
    if (history.length) scrollTerminalToBottom(inputRef.current);
  }, [history]);

  // The last command's question, while it waits for an answer
  const last = history[history.length - 1];
  const pending = last?.result?.ask && !last.answer ? last.result.ask : null;

  const answer = (choice) => {
    const result = toResult(pending.answer(choice));
    setHistory([...history.slice(0, -1), { ...last, answer: { choice, result } }]);
    setSelected(0);
    inputRef.current?.focus({ preventScroll: true });
  };

  // Answers print line by line; keep up with them, then run the result's `after` action once
  const afterPrinted = (result, complete) => {
    scrollTerminalToBottom(inputRef.current);
    if (!complete || result.afterDone) return;
    result.afterDone = true;
    result.after?.();
  };

  // While a question is open: Tab / arrows move between choices, Enter picks, or type a choice's letter
  const handleAnswerKey = (e) => {
    const { choices } = pending;
    const key = e.key.toLowerCase();
    if (e.key === 'Tab' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const step = e.key === 'ArrowLeft' || e.shiftKey ? -1 : 1;
      setSelected((s) => (s + step + choices.length) % choices.length);
    } else if (e.key === 'Enter') {
      answer(choices[selected]);
    } else if (choices.includes(key)) {
      e.preventDefault();
      answer(key);
    }
  };

  const handleKeyDown = (e) => {
    if (pending) return handleAnswerKey(e);
    if (e.key !== 'Enter') return;
    const command = value.trim();
    setHistory([...history, { input: value, result: command ? runCommand(command, shell) : null }]);
    setValue('');
  };

  return (
    <>
      {history.map(({ input, result, answer: answered }, i) => (
        <Fragment key={i}>
          <Prompt path={path} cursor={false} status={result && (result.error ? 'error' : 'ok')}>
            {input}
          </Prompt>
          {result?.lines.map((line, j) => (
            <div key={j} className="ide-line">{line}</div>
          ))}
          {answered && (
            <>
              <Question {...result.ask} picked={answered.choice} status={answered.result.error ? 'error' : 'ok'} />
              <PrintLines
                lines={answered.result.lines}
                interval={120}
                lineClassName={`ide-line ${answered.result.error ? 'is-error' : ''}`}
                onProgress={(_, complete) => afterPrinted(answered.result, complete)}
              />
            </>
          )}
        </Fragment>
      ))}

      {isTouch ? (
        <Prompt path={path} />
      ) : (
        <label className="shell-input">
          {pending ? (
            <Question {...pending} selected={selected} onPick={answer} />
          ) : (
            <Prompt path={path}>{value}</Prompt>
          )}
          <input
            ref={inputRef}
            className="shell-field"
            value={value}
            onChange={(e) => !pending && setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={MAX_INPUT}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="terminal input"
          />
        </label>
      )}
    </>
  );
};

export default ShellInput;
