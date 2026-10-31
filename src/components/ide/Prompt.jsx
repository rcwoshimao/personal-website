// A single shell prompt line, optionally followed by a typed command.
const Prompt = ({ path, children, cursor = true }) => (
  <div className="ide-line">
    <span className="ide-prompt">(based) jiayingchen.dev</span>
    <span className="ide-path">:~{path ? `/${path}` : ''}</span>
    <span>$ </span>
    {children}
    {cursor && <span className="ide-cursor" />}
  </div>
);

export default Prompt;
