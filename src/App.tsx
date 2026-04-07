import { DefaultTheme } from "styled-components";
import { Suspense, lazy } from "react";

import { useTheme } from "./hooks/useTheme";
import SplashScreen from "./components/SplashScreen";
import ThemeSwitcher from "./layout/widgets/ThemeSwitcher";
import { ThemeSwitcherProps } from "./types/window";
import { preloadResources } from "./utils/resource-utils";
import Antigravity from "./components/Antigravity";

function App() {
  // themes
  const { theme, themeLoaded, setMode, resumePath } = useTheme();
  const DesktopLanding = lazy(() => {
    return new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
      preloadResources(theme);
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
    resumePath,
  };

  return (
    <>
      {/* Theme Switcher - 3-way toggle for Linux, Fedora, Kali themes */}
      <ThemeSwitcher {...themeProps} />
      {!themeLoaded ? (
        <div style={{ width: "100%", height: "100%", position: "absolute" }}>
          <Antigravity
            count={600}
            magnetRadius={50}
            ringRadius={7}
            waveSpeed={4.8}
            waveAmplitude={0.2}
            particleSize={0.8}
            lerpSpeed={0.2}
            color="#D9DDDC"
            autoAnimate={false}
            particleVariance={0.2}
            rotationSpeed={0.8}
            depthFactor={3.1}
            pulseSpeed={5.3}
            particleShape="sphere"
            fieldStrength={20}
          />
        </div>
      ) : (
        <Suspense fallback={<SplashScreen {...themeProps} />}>
          <DesktopLanding {...themeProps} />
        </Suspense>
      )}
    </>
  );
}

export default App;
