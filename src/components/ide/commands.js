// Every terminal command lives here.
//
// Each command is its own entry:
//   NAME: {
//     description: 'shown in HELP',
//     run: (args, shell) => ['line 1', 'line 2'],   // returns the lines to print
//   },
//
// To print an error (red mark next to the command), return fail('line 1', ...) instead.
//
// `args` is everything typed after the command name, split on spaces
// (e.g. "theme pink" -> run(['pink'])). Names are matched ignoring case.
// `shell` holds UI actions from shellContext.js (e.g. shell.open('projects')).

import { projectsData } from '../../personal-data';
import { tagSlug } from './tags';

// Marks a command's output as an error
export const fail = (...lines) => ({ error: true, lines });

// Folders `cd` can enter, mapped to the page they open
const CD_TARGETS = {
  '~': 'home',
  home: 'home',
  projects: 'projects',
  blog: 'blog',
  blogs: 'blog',
  misc: 'misc',
};

// Files in the explorer, so `cd` into one says "not a directory"
const FILES = new Set([
  'home.exe',
  'blog.md',
  ...projectsData.flatMap(({ name }) => [`${tagSlug(name)}.exe`, `projects/${tagSlug(name)}.exe`]),
]);

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

  CD: {
    description: 'go to a folder: home, projects, blog, misc',
    run: (args, shell) => {
      // "cd" alone goes home; "~/", a leading "./" and trailing "/" are ignored
      const target = (args[0] ?? '~').toLowerCase().replace(/^(~|\.)\//, '').replace(/\/$/, '');
      const page = CD_TARGETS[target];
      if (FILES.has(target)) return fail(`cd: not a directory: ${args[0]}`);
      if (!page) return fail(`cd: no such file or directory: ${args[0]}`);
      shell.open(page);
      return [];
    },
  },

  MIAO: {
    description: 'miao',
    run: () => ['HELLO NIAONAIAOAAOAOAO'],
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
export const fallback = (name) =>
  fail(`Could not recognize command: ${name}. Type HELP for a list of allowed commands`);

// Finds the command for a line of input and runs it; returns { lines, error }
export const runCommand = (input, shell) => {
  const [name, ...args] = input.trim().split(/\s+/);
  const key = Object.keys(COMMANDS).find((k) => k.toLowerCase() === name.toLowerCase());
  const result = key ? COMMANDS[key].run(args, shell) : fallback(name);
  return Array.isArray(result) ? { lines: result, error: false } : result;
};
