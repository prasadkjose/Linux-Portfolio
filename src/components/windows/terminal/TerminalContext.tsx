import { createContext } from "react";

type Term = {
  arg: string[];
  history: string[];
  rerender: boolean;
  index: number;
  clearHistory?: () => void;
  executeCommand?: (cmd: string) => void;
  setRerender?: (rerender: boolean) => void;
};

export const termContext = createContext<Term>({
  arg: [],
  history: [],
  rerender: false,
  index: 0,
});
