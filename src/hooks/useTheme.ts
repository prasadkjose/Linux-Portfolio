import { createContext, useState } from "react";
import themes from "../styles/themes";
import { DefaultTheme } from "styled-components";
import { ThemeSwitcherProps } from "../types/window";

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
    setTheme(newTheme);
    setThemeLoaded(true);
  };

  return { theme, themeLoaded, setMode };
};
