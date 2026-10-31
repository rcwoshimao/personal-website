// Every terminal command lives here.
//
// Each command is its own entry:
//   NAME: {
//     description: 'shown in HELP',
//     run: (args) => ['line 1', 'line 2'],   // returns the lines to print
//   },
//
// `args` is everything typed after the command name, split on spaces
// (e.g. "theme pink" -> run(['pink'])). Names are matched ignoring case.

export const COMMANDS = {
  HELP: {
    description: 'list available commands',
    run: () => {
      const width = Math.max(...Object.keys(COMMANDS).map((name) => name.length));
      return Object.entries(COMMANDS).map(
        ([name, { description = '' }]) => `${name.padEnd(width + 2)}${description}`
      );
    },
  },

  MIAO: {
    description: 'miao',
    run: () => ['miao'],
  },

  WHOAMI: {
    description: 'who am i',
    run: () => ['guest'],
  },

  WHOAREYOU: {
    description: 'who are you',
    run: () => ['NYA'],
  },
};

// Printed when nothing matches
export const fallback = (name) => [
  `Could not recognize command: ${name}. Type HELP for a list of allowed commands`,
];

// Finds the command for a line of input and runs it; returns the lines to print
export const runCommand = (input) => {
  const [name, ...args] = input.trim().split(/\s+/);
  const key = Object.keys(COMMANDS).find((k) => k.toLowerCase() === name.toLowerCase());
  return key ? COMMANDS[key].run(args) : fallback(name);
};
