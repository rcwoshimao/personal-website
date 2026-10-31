import { createContext } from 'react';

// What terminal commands can do to the UI; provided by IdeLayout.
//   open(id): open a page as a tab (e.g. 'projects')
export const ShellContext = createContext({ open: () => {} });
