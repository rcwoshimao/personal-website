import { Fragment, useEffect, useRef, useState } from 'react';
import Prompt from './Prompt';
import { runCommand } from './commands';
import { scrollTerminalToBottom } from './terminalScroll';

const MAX_INPUT = 100;

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
    if (history.length) scrollTerminalToBottom(inputRef.current);
  }, [history]);

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    const command = value.trim();
    setHistory([...history, { input: value, output: command ? runCommand(command) : null }]);
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
