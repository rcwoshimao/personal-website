// Scrolls the terminal that contains `el` all the way down (padding included),
// so the newest line never sits flush against the bottom edge.
export const scrollTerminalToBottom = (el) => {
  const terminal = el?.closest('.ide-terminal-body');
  if (terminal) terminal.scrollTop = terminal.scrollHeight;
};
