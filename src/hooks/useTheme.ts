import { createContext, useState } from "react";
import themes from "../styles/themes";
import { DefaultTheme } from "styled-components";
import { ThemeSwitcherProps } from "../types/window";
import logger from "../utils/logger";

interface UseThemeResult {
  theme: DefaultTheme;
  themeLoaded: boolean;
  setMode: (theme: DefaultTheme) => void;
}
export const themeContext = createContext<ThemeSwitcherProps | null>(null);

export const useTheme = (): UseThemeResult => {
  const [theme, setTheme] = useState<DefaultTheme>(themes.empty);
  const [themeLoaded, setThemeLoaded] = useState(false);

  const setMode = (newTheme: DefaultTheme) => {
    logger.info(`Setting theme ${newTheme.name}.`);
    setTheme(newTheme);
    setThemeLoaded(true);
    logger.info(`Theme sucessfully changed to ${newTheme.name}.`);
  };

  return { theme, themeLoaded, setMode };
};
