import { useEffect, useState } from "react";
import themes from "../styles/themes";
import { DefaultTheme } from "styled-components";

interface UseThemeResult {
  theme: DefaultTheme;
  themeLoaded: boolean;
  setMode: (theme: DefaultTheme) => void;
}

export const useTheme = (): UseThemeResult => {
  const [theme, setTheme] = useState<DefaultTheme>(themes.tech);
  const [themeLoaded, setThemeLoaded] = useState(false);

  const setMode = () => {
    setTheme(themes.tech);
  };

  useEffect(() => {
    // Immediately mark as loaded with tech theme
    setTheme(themes.tech);
    setThemeLoaded(true);
  }, []);

  return { theme, themeLoaded, setMode };
};
