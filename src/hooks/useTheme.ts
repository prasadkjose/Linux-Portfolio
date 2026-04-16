import { createContext, useState } from "react";
import themes from "../styles/themes";
import { DefaultTheme } from "styled-components";
import { ThemeSwitcherProps } from "../types/window";
import logger from "../utils/logger";
import { RESUME_OS_MAP } from "../config/personalData.config";
import { getFromLS, setToLS } from "../utils/storage";

interface UseThemeResult {
  theme: DefaultTheme;
  themeLoaded: boolean;
  setMode: (theme: DefaultTheme) => void;
  resumePath: string;
}
export const themeContext = createContext<ThemeSwitcherProps | null>(null);

export const useTheme = (): UseThemeResult => {
  const [theme, setTheme] = useState<DefaultTheme>(themes.empty);
  const [themeLoaded, setThemeLoaded] = useState<boolean>(false);
  // Add OS Specific resume to global themeContext
  const [resumePath, setResume] = useState<string>(RESUME_OS_MAP.ubuntu);

  const setMode = (newTheme: DefaultTheme) => {
    logger.info(`Setting theme ${newTheme.name}.`);
    setTheme(newTheme);
    setThemeLoaded(true);
    setResume(RESUME_OS_MAP[newTheme.id]);

    // Persist selected background image when it's present
    if (newTheme.newBackgroundImage) {
      setToLS("selected-background-image", newTheme.newBackgroundImage);
      logger.info(`Background image saved to localStorage.`);
    }

    const savedBackgroundImage = getFromLS<string | null>(
      "selected-background-image",
      null
    );
    if (savedBackgroundImage) {
      logger.info(`Restoring saved background image from localStorage.`);
      setTheme(prevTheme => ({
        ...prevTheme,
        newBackgroundImage: savedBackgroundImage,
      }));
    }
    logger.info(`Theme sucessfully changed to ${newTheme.name}.`);
  };

  return { theme, themeLoaded, setMode, resumePath };
};
