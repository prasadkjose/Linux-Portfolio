import React, { useState } from "react";
import styled from "styled-components";
import { WindowState } from "../types/window";
import { Icons } from "./desktop-shortcuts/DesktopIcons";
import { formatTime, formatDate } from "../utils/clock";

const Bar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: rgba(12, 12, 12, 0.82);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;
  padding: 0 12px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.35);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex: 2;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex: 1;
`;

const AppLauncher = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: transparent;
  border: none;
  color: #eceff4;
  cursor: pointer;
  transition: background 0.15s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const TaskItem = styled.button<{ $active?: boolean; $urgent?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 8px;
  background: ${({ $active }) =>
    $active ? "rgba(255, 255, 255, 0.12)" : "transparent"};
  border: none;
  color: #eceff4;
  cursor: pointer;
  font-size: 13px;
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    sans-serif;
  font-weight: 500;
  transition: background 0.15s ease;
  position: relative;
  max-width: 180px;
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
  &::after {
    content: "";
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ $active }) => ($active ? "100%" : "3px")};
    height: 3px;
    border-radius: 2px;
    background: ${({ theme, $urgent }) =>
      $urgent ? theme.colors.secondary : theme.colors.primary};
    transition: width 0.2s ease;
  }
  &:hover::after {
    width: 16px;
  }
`;

const Clock = styled.div`
  color: #eceff4;
  font-size: 13px;
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    sans-serif;
  font-weight: 500;
  text-align: right;
  line-height: 1.3;
  user-select: none;
`;

const Separator = styled.div`
  width: 1px;
  height: 24px;
  background: rgba(255, 255, 255, 0.12);
  margin: 0 4px;
`;

// ── Hook ───────────────────────────────────────────────────────────────

const useClock = () => {
  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return time;
};

// ── Component ──────────────────────────────────────────────────────────

const Taskbar: React.FC<Record<string, WindowState>> = ({
  terminal,
  welcome,
  resume,
}) => {
  const [, showDesktop] = useState<boolean>(false);
  const time = useClock();
  const handleTaskClick = (window: WindowState) => {
    if (!window.mounted) {
      window.open?.();
    } else if (!window.visible) {
      // Window is mounted but not visible (minimized state)
      window.bringToFront();
      window.open?.();
    } else {
      // If already visible and focused, minimize it
      window.minimize?.();
    }
  };
  const handleShowDesktop = () => {
    showDesktop(prev => {
      if (!prev) {
        terminal.minimize?.();
        welcome.minimize?.();
        resume.minimize?.();
        return true;
      }
      terminal.toggleMaximize?.();
      welcome.toggleMaximize?.();
      resume.toggleMaximize?.();
      return false;
    });
  };

  return (
    <Bar role="toolbar" aria-label="Application taskbar">
      {/* Left: App launcher */}
      <LeftSection>
        {/* TODO: App Launcher */}
        <AppLauncher
          onClick={handleShowDesktop}
          aria-label="Show applications"
          title="Show applications"
        >
          {Icons.AppsIcon}
        </AppLauncher>
      </LeftSection>

      {/* Center: Open windows / tasks */}
      <CenterSection>
        {terminal.mounted && (
          <TaskItem
            $active={terminal.visible}
            onClick={() => handleTaskClick(terminal)}
            title="Terminal"
            aria-label="Terminal window"
          >
            {Icons.Terminal}
            <span>Terminal</span>
          </TaskItem>
        )}
        {welcome.mounted && (
          <TaskItem
            $active={welcome.visible}
            onClick={() => handleTaskClick(welcome)}
            title="Browser"
            aria-label="Browser window"
          >
            {Icons.Browser}
            <span>Browser</span>
          </TaskItem>
        )}
        {resume.mounted && (
          <TaskItem
            $active={resume.visible}
            onClick={() => handleTaskClick(resume)}
            title="Resume"
            aria-label="Resume window"
          >
            {Icons.PDF}
            <span>Resume</span>
          </TaskItem>
        )}
      </CenterSection>

      {/* Right: Clock & date */}
      <RightSection>
        <Separator />
        <Clock aria-label={`Current time: ${formatTime(time)}`}>
          <div>{formatTime(time)}</div>
          <div style={{ fontSize: "11px", opacity: 0.7 }}>
            {formatDate(time)}
          </div>
        </Clock>
      </RightSection>
    </Bar>
  );
};

export default Taskbar;
