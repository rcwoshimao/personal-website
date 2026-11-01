// Every terminal command lives here.
//
// Each command is its own entry:
//   NAME: {
//     description: 'shown in HELP',
//     run: (args, shell) => ['line 1', 'line 2'],   // returns the lines to print
//   },
//
// To print an error (red mark next to the command), return fail('line 1', ...) instead.
// To ask a question first, return ask(question, ['y', 'n'], (choice) => lines) instead.
// An answer can also return { lines, after: () => ... } to do something once its lines finish printing.
// Add `hidden: true` to show the command as *** with description ??? in HELP.
//
// `args` is everything typed after the command name, split on spaces
// (e.g. "theme pink" -> run(['pink'])). Names are matched ignoring case.
// `shell` holds UI actions from shellContext.js (e.g. shell.open('projects')).

import { projectsData } from '../../personal-data';
import { tagSlug } from './tags';

// Marks a command's output as an error
export const fail = (...lines) => ({ error: true, lines });

// Asks a question; the shell waits for one of `choices`, then prints answer(choice)
export const ask = (question, choices, answer) => ({ lines: [], ask: { question, choices, answer } });

// Turns what a command returns (a list of lines, fail(...) or ask(...)) into { lines, error, ask? }
export const toResult = (result) => (Array.isArray(result) ? { lines: result, error: false } : { lines: [], error: false, ...result });

const ART_PORTFOLIO = 'https://rcwoshimao.xyz/';

// Opened after the banner prints. Browsers may block a tab opened this late after the
// key press; the printed link is the fallback.
const openPortfolio = () => {
  const tab = window.open(ART_PORTFOLIO, '_blank');
  if (tab) tab.opener = null;
};

const ACCESS_DENIED = [
  'Exception in thread "main" java.lang.SecurityException: access denied',
  '    ◤◢◤◢◤╭(°A°`)╮◢◤◢◤◢',
  '    at dev.jiayingchen.security.AccessGuard.check(AccessGuard.java:42)',
  '    at dev.jiayingchen.security.AccessGuard.require(AccessGuard.java:27)',
  '    at dev.jiayingchen.shell.commands.Discombobulate.run(Discombobulate.java:17)',
  '    at dev.jiayingchen.shell.CommandRunner.execute(CommandRunner.java:88)',
  '    at dev.jiayingchen.shell.CommandRunner.lambda$dispatch$0(CommandRunner.java:61)',
  '    at java.base/java.util.Optional.ifPresent(Optional.java:178)',
  '    at dev.jiayingchen.shell.Terminal.handleInput(Terminal.java:213)',
  '    at dev.jiayingchen.shell.Terminal.lambda$start$1(Terminal.java:96)',
  '    at java.base/java.lang.Thread.run(Thread.java:1583)',
  'Caused by: dev.jiayingchen.security.RecruiterDetectedException: user answered "y" to "are you a recruiter?"',
  '    at dev.jiayingchen.security.RecruiterFilter.screen(RecruiterFilter.java:7)',
  '    at dev.jiayingchen.security.AccessGuard.check(AccessGuard.java:39)',
  '    ... 9 more',
];

// Printed one block per line
const HIGH_ENERGY = '◢◤◢◤◢◤◢◤◢◤◢◤ ◢◤◢◤◢◤前方高能！前方高能！◢◤◢◤◢◤ ◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤ ◢◤◢◤◢◤挡住屏幕◢◤◢◤◢◤ ◢◤◢◤◢◤◢◤◢◤◢◤◢◤◢◤ ◢◤◢◤◢'.split(' ');

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
      return Object.entries(COMMANDS).map(([name, { description = '', hidden }]) =>
        hidden ? `${'*'.repeat(name.length).padEnd(width + 2)}???` : `${name.padEnd(width + 2)}${description}`
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

  DISCOMBOBULATE: {
    description: 'open my art portfolio',
    hidden: true,
    run: () =>
      ask('are you a recruiter?', ['y', 'n'], (choice) => {
        if (choice === 'y') return fail(...ACCESS_DENIED);
        return {
          lines: [
            ...HIGH_ENERGY,
            '',
            <>opening <a className="term-link" href={ART_PORTFOLIO} target="_blank" rel="noopener noreferrer">{ART_PORTFOLIO}</a> ...</>,
          ],
          after: openPortfolio,
        };
      }),
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

// Finds the command for a line of input and runs it; returns { lines, error, ask? }
export const runCommand = (input, shell) => {
  const [name, ...args] = input.trim().split(/\s+/);
  const key = Object.keys(COMMANDS).find((k) => k.toLowerCase() === name.toLowerCase());
  return toResult(key ? COMMANDS[key].run(args, shell) : fallback(name));
};
