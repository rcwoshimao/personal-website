import { VscCircleFilled, VscError } from 'react-icons/vsc';

// A single shell prompt line, optionally followed by a typed command.
// `status` ('ok' | 'error') adds VS Code's command mark in the gutter: blue dot or red cross.
const Prompt = ({ path, children, cursor = true, status }) => (
  <div className="ide-line ide-prompt-line">
    {status === 'ok' && <VscCircleFilled className="ide-deco is-ok" aria-label="succeeded" />}
    {status === 'error' && <VscError className="ide-deco is-error" aria-label="failed" />}
    <span className="ide-prompt">(based) jiayingchen.dev</span>
    <span className="ide-path">:~{path ? `/${path}` : ''}</span>
    <span>$ </span>
    {children}
    {cursor && <span className="ide-cursor" />}
  </div>
);

export default Prompt;
