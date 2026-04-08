import { WindowConfig } from "../types/window";

export const WINDOW_CONFIGS: Record<string, WindowConfig> = {
  terminal: {
    id: "terminal",
    title: "Terminal",
    minWidth: 520,
    minHeight: 360,
    defaultWidth: 960,
    defaultHeight: 640,
  },
  landing: {
    id: "landing",
    title: "Landing",
    minWidth: 400,
    minHeight: 300,
    defaultWidth: 900,
    defaultHeight: 560,
  },
  resume: {
    id: "resume",
    title: "Resume",
    minWidth: 400,
    minHeight: 300,
    defaultWidth: 900,
    defaultHeight: 560,
  },
  email: {
    id: "email",
    title: "Email",
    minWidth: 450,
    minHeight: 500,
    defaultWidth: 700,
    defaultHeight: 600,
  },
};
