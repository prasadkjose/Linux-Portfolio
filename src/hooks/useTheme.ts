import { useState } from "react";
import themes from "../styles/themes";
import { DefaultTheme } from "styled-components";

interface UseThemeResult {
  theme: DefaultTheme;
  themeLoaded: boolean;
  setMode: (theme: DefaultTheme) => void;
}

export const useTheme = (): UseThemeResult => {
  const [theme, setTheme] = useState<DefaultTheme>(themes.empty);
  const [themeLoaded, setThemeLoaded] = useState(false);

  const setMode = (newTheme: DefaultTheme) => {
    setTheme(newTheme);
    setThemeLoaded(true);
  };

  return { theme, themeLoaded, setMode };
};
