import styled, { DefaultTheme } from "styled-components";
import { Suspense, lazy } from "react";

import { useTheme } from "./hooks/useTheme";
import SplashScreen from "./components/SplashScreen";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { ThemeSwitcherProps } from "./types/window";
import { preloadResources } from "./utils/resource-utils";

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: rgba(220, 220, 220, 0.8);
  z-index: 999;
  margin: -8px;
`;
function App() {
  // themes
  const { theme, themeLoaded, setMode } = useTheme();
  const DesktopLanding = lazy(() => {
    return new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
      preloadResources();
      return import("./components/DesktopLanding");
    });
  });

  const themeSwitcher = (switchTheme: DefaultTheme) => {
    setMode(switchTheme);
  };
  const themeProps: ThemeSwitcherProps = {
    themeSwitcher,
    currentTheme: theme,
    themeLoaded,
  };

  return (
    <>
      {/* Theme Switcher - 3-way toggle for Linux, Fedora, Kali themes */}
      <ThemeSwitcher {...themeProps} />
      {!themeLoaded ? (
        <Overlay />
      ) : (
        <Suspense fallback={<SplashScreen {...themeProps} />}>
          <DesktopLanding {...themeProps} />
        </Suspense>
      )}
    </>
  );
}

export default App;
