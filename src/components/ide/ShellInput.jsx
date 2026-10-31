import { Fragment, useEffect, useRef, useState } from 'react';
import Prompt from './Prompt';
import commandTable from './commandTable.json';

const MAX_INPUT = 100;

const { commands, fallback } = commandTable;

// `help` is generated from the table so it always matches the real command list
const helpLines = () => {
  const width = Math.max(...Object.keys(commands).map((name) => name.length));
  return Object.entries(commands).map(
    ([name, { description = '' }]) => `${name.padEnd(width + 2)}${description}`
  );
};

// Exact match only (case and extra spaces ignored); returns the lines to print
const run = (input) => {
  const name = input.toLowerCase().replace(/\s+/g, ' ');
  if (name === 'help') return helpLines();
  return commands[name]?.output ?? fallback;
};

// The live prompt at the bottom of a terminal. Typed text is shown inside the
// prompt line; the real <input> is invisible and only captures keystrokes.
// Touch devices get a static prompt (they will use tappable suggestions instead).
const ShellInput = ({ path }) => {
  const [isTouch] = useState(() => window.matchMedia('(pointer: coarse)').matches);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  // Ready to type on arrival, without jumping the page down to the prompt
  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  // Keep the live prompt in view as output piles up
  useEffect(() => {
    if (history.length) inputRef.current?.scrollIntoView({ block: 'nearest' });
  }, [history]);

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    const command = value.trim();
    setHistory([...history, { input: value, output: command ? run(command) : null }]);
    setValue('');
  };

  return (
    <>
      {history.map(({ input, output }, i) => (
        <Fragment key={i}>
          <Prompt path={path} cursor={false}>{input}</Prompt>
          {output?.map((line, j) => (
            <div key={j} className="ide-line">{line}</div>
          ))}
        </Fragment>
      ))}

      {isTouch ? (
        <Prompt path={path} />
      ) : (
        <label className="shell-input">
          <Prompt path={path}>{value}</Prompt>
          <input
            ref={inputRef}
            className="shell-field"
            value={value}
            onChange={(e) => setValue(e.target.value)}
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
