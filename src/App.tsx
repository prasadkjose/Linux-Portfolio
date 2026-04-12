import { DefaultTheme } from "styled-components";
import { Suspense, lazy } from "react";

import { useTheme } from "./hooks/useTheme";
import SplashScreen from "./components/SplashScreen";
import ThemeSwitcher from "./layout/widgets/ThemeSwitcher";
import { ThemeSwitcherProps } from "./types/window";
import { preloadResources } from "./utils/resource-utils";
import ShapeGrid from "./components/Antigravity";
import LoadingStatusBar from "./components/LoadingStatusBar";

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
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            background: "#ffffff",
            backgroundImage:
              "radial-gradient(circle, hsl(240, 5%, 65%, 0.15) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          <ShapeGrid
            speed={0.1}
            squareSize={10}
            hoverTrailAmount={18} // number of trailing hovered shapes (0 = no trail)
            direction="diagonal"
            borderColor="#998ead21"
            hoverFillColor="#2b2b2b"
            shape="hexagon"
          />

          <LoadingStatusBar />
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
