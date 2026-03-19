import { createContext, useEffect, useState } from "react";
import styled, { DefaultTheme, ThemeProvider } from "styled-components";
import { useTheme } from "./hooks/useTheme";
import { useWindowManager } from "./hooks/useWindowManager";
import { useFullscreenManager } from "./hooks/useFullscreenManger";
import GlobalStyle from "./styles/GlobalStyle";
import TerminalWindow from "./components/windows/terminal/TerminalWindow";
import DesktopShortcuts from "./components/desktop-shortcuts/DesktopShortcuts";
import ResumeWindow from "./components/windows/ResumeWindow";
import Landing from "./components/windows/welcome-tabs/Landing";
import FullscreenToggle from "./components/FullscreenToggle";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { FullscreenManager, WindowManager } from "./types/window";
import { isMobileDevice } from "./utils/typeGuards";

export const themeContext = createContext<ThemeSwitcher | null>(null);
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
  const { terminal, welcome, resume, initializeWindows }: WindowManager =
    useWindowManager();
  const { isFullscreen, toggleFullscreen }: FullscreenManager =
    useFullscreenManager();

  const [selectedTheme, setSelectedTheme] = useState(theme);

  // Device detection
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const update = () => setIsMobile(isMobileDevice());
    update();
  }, []);

  // Startup layout: mobile => browser only, maximized; desktop => browser only centered
  useEffect(() => {
    if (!themeLoaded) return;
    initializeWindows();
  }, [isMobile, themeLoaded]);

  // Disable browser's default behavior
  useEffect(() => {
    window.addEventListener(
      "keydown",
      e => {
        ["ArrowUp", "ArrowDown"].indexOf(e.code) > -1 && e.preventDefault();
      },
      false
    );
  }, []);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  // Update meta tag colors when switching themes
  useEffect(() => {
    const themeColor = theme.colors?.body;
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    const maskIcon = document.querySelector("link[rel='mask-icon']");
    const metaMsTileColor = document.querySelector(
      "meta[name='msapplication-TileColor']"
    );
    metaThemeColor && metaThemeColor.setAttribute("content", themeColor);
    metaMsTileColor && metaMsTileColor.setAttribute("content", themeColor);
    maskIcon && maskIcon.setAttribute("color", themeColor);
  }, [selectedTheme]);

  const themeSwitcher = (switchTheme: DefaultTheme) => {
    setSelectedTheme(switchTheme);
    setMode(switchTheme);
  };

  return (
    <>
      {/* Theme Switcher - 3-way toggle for Linux, Fedora, Kali themes */}
      <ThemeSwitcher
        themeSwitcher={themeSwitcher}
        currentTheme={selectedTheme}
      />
      {!themeLoaded ? (
        <Overlay />
      ) : (
        <ThemeProvider theme={selectedTheme}>
          <GlobalStyle />
          <h1 className="sr-only" aria-label="Prasad Koshy Jose">
            Prasad Koshy Jose
          </h1>
          <themeContext.Provider value={themeSwitcher}>
            {/* Desktop Icons - below windows, hidden when any window is maximized */}
            <DesktopShortcuts
              onOpenTerminal={terminal.open}
              onOpenWelcome={welcome.open}
              onOpenResume={resume.open}
              hidden={
                terminal.maximized || welcome.maximized || resume.maximized
              }
              activeTerminal={!isMobile && terminal.mounted && terminal.visible}
              activeBrowser={!isMobile && welcome.mounted && welcome.visible}
              activeResume={!isMobile && resume.mounted && resume.visible}
              mobileExpanded={isMobile && !terminal.mounted}
            />

            {/* Fullscreen toggle control: hide when any window maximized; allow windows to overlap due to low z-index */}
            <FullscreenToggle
              isFullscreen={isFullscreen}
              onToggle={toggleFullscreen}
              hidden={
                terminal.maximized || welcome.maximized || resume.maximized
              }
            />

            {/* Welcome Browser Window opens on start on desktop only */}
            {welcome.mounted && (
              <Landing
                close={welcome.close}
                // On mobile: only close button (omit minimize/maximize)
                minimize={!isMobile ? welcome.minimize : undefined}
                toggleMaximize={!isMobile ? welcome.toggleMaximize : undefined}
                maximized={welcome.maximized}
                visible={welcome.visible}
                mounted={welcome.mounted}
                x={welcome.x}
                y={welcome.y}
                z={welcome.z}
                width={welcome.width}
                height={welcome.height}
                move={welcome.move}
                resize={welcome.resize}
                bringToFront={welcome.bringToFront}
              />
            )}

            {/* Terminal Window */}
            {terminal.mounted && (
              <TerminalWindow
                close={terminal.close}
                // On mobile: only close button (omit minimize/maximize)
                minimize={!isMobile ? terminal.minimize : undefined}
                toggleMaximize={!isMobile ? terminal.toggleMaximize : undefined}
                maximized={terminal.maximized}
                visible={terminal.visible}
                mounted={terminal.mounted}
                x={terminal.x}
                y={terminal.y}
                z={terminal.z}
                width={terminal.width}
                height={terminal.height}
                move={terminal.move}
                resize={terminal.resize}
                bringToFront={terminal.bringToFront}
              />
            )}

            {/* Resume Window */}
            {resume.mounted && (
              <ResumeWindow
                close={resume.close}
                // On mobile: only close button (omit minimize/maximize)
                minimize={!isMobile ? resume.minimize : undefined}
                toggleMaximize={!isMobile ? resume.toggleMaximize : undefined}
                maximized={resume.maximized}
                visible={resume.visible}
                mounted={terminal.mounted}
                x={resume.x}
                y={resume.y}
                z={resume.z}
                width={resume.width}
                height={resume.height}
                move={resume.move}
                resize={resume.resize}
                bringToFront={resume.bringToFront}
              />
            )}
          </themeContext.Provider>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
