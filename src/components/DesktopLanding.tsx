import { ThemeProvider } from "styled-components";
import { PERSONAL_DATA } from "../config/personalData.config";
import { themeContext } from "../hooks/useTheme";
import GlobalStyle from "../styles/GlobalStyle";
import theme from "../styles/themes";
import DesktopShortcuts from "./desktop-shortcuts/DesktopShortcuts";
import Taskbar from "../layout/taskbar/Taskbar";
import ResumeWindow from "./windows/ResumeWindow";
import TerminalWindow from "./windows/terminal/TerminalWindow";
import BrowserRouter from "../layout/browser/BrowserRouter";
import { useState, useEffect } from "react";
import { useWindowManager } from "../hooks/useWindowManager";
import { ThemeSwitcherProps, WindowManager } from "../types/window";
import { isMobileDevice } from "../utils/typeGuards";
import Carousel from "../layout/widgets/Carousel";
import Draggable from "../layout/Draggable";

const DesktopLanding: React.FC<ThemeSwitcherProps> = ({
  currentTheme,
  themeSwitcher,
  themeLoaded,
  resumePath,
}) => {
  const { terminal, welcome, resume }: WindowManager = useWindowManager();

  // Device detection
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const update = () => setIsMobile(isMobileDevice());
    update();
  }, []);

  // Disable browser's default behavior
  useEffect(() => {
    window.addEventListener(
      "keydown",
      e => {
        return (
          ["ArrowUp", "ArrowDown"].indexOf(e.code) > -1 && e.preventDefault()
        );
      },
      false
    );
  }, []);

  // Update meta tag colors when switching themes
  useEffect(() => {
    const themeColor = currentTheme.colors?.body;
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    const maskIcon = document.querySelector("link[rel='mask-icon']");
    const metaMsTileColor = document.querySelector(
      "meta[name='msapplication-TileColor']"
    );
    metaThemeColor?.setAttribute("content", themeColor);
    metaMsTileColor?.setAttribute("content", themeColor);
    maskIcon?.setAttribute("color", themeColor);
  }, [theme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle theme={currentTheme} />
      <h1 className="sr-only" aria-label={PERSONAL_DATA.personalInfo.name}>
        {PERSONAL_DATA.personalInfo.name}
      </h1>
      <themeContext.Provider
        value={{ themeSwitcher, currentTheme, themeLoaded, resumePath }}
      >
        {/* Desktop Icons - below windows, hidden when any window is maximized */}
        <DesktopShortcuts
          onOpenTerminal={terminal.open}
          onOpenWelcome={welcome.open}
          onOpenBrowserWithUrl={welcome.openWithUrl}
          onOpenResume={resume.open}
          hidden={terminal.maximized || welcome.maximized || resume.maximized}
          activeTerminal={!isMobile && terminal.mounted && terminal.visible}
          activeBrowser={!isMobile && welcome.mounted && welcome.visible}
          activeResume={!isMobile && resume.mounted && resume.visible}
          mobileExpanded={isMobile}
          terminal={terminal}
          welcome={welcome}
          resume={resume}
        />

        {/* Linux-style taskbar fixed at the bottom */}
        <Taskbar {...{ terminal, welcome, resume }} />

        {/* Welcome Browser Window opens on start on desktop only */}
        {welcome.mounted && (
          <BrowserRouter
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
            href={welcome.href}
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
        <Draggable>
          <Carousel />
        </Draggable>
      </themeContext.Provider>
    </ThemeProvider>
  );
};

export default DesktopLanding;
