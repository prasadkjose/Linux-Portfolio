import React, { useState } from "react";
import styled from "styled-components";
import { FullscreenManager, WindowState } from "../../types/window";
import { Icons } from "../../components/desktop-shortcuts/DesktopIcons";
import { isMobileDevice } from "../../utils/typeGuards";
import FullscreenToggle from "../../components/FullscreenToggle";
import { taskbarWidgets, WidgetState } from "./config/taskbar.config";
import { useFullscreenManager } from "../../hooks/useFullscreenManger";
import ContextMenu from "../../components/ContextMenu";
import { useTaskMenu } from "../../hooks/useContextMenu";

const Bar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: rgba(12, 12, 12, 0.43);
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

const TaskItem = styled.button<{ $active?: boolean }>`
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
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.2s ease;
  }
  &:hover::after {
    width: 16px;
  }
`;

const Separator = styled.div`
  width: 1px;
  height: 24px;
  background: rgba(255, 255, 255, 0.12);
  margin: 0 4px;
`;

// ── Component ──────────────────────────────────────────────────────────

const Taskbar: React.FC<Record<string, WindowState>> = ({
  terminal,
  welcome,
  resume,
}) => {
  const [, showDesktop] = useState<boolean>(false);
  const isMobile = isMobileDevice();
  const [widgetState, setWidgetState] = useState<WidgetState>({
    calendar: false,
    announcement: false,
  });

  const { contextMenu, setContextMenu, handleContextMenu, closeContextMenu } =
    useTaskMenu();

  const { isFullscreen, toggleFullscreen }: FullscreenManager =
    useFullscreenManager();

  const handleTaskClick = (window: WindowState) => {
    setContextMenu({ visible: false, windowKey: null });
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

  // Get right section widgets from config
  const rightWidgets = taskbarWidgets
    .filter(widget => widget.position === "right" && widget.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <Bar role="toolbar" aria-label="Application taskbar">
      {/* Left: App launcher */}
      {!isMobile && (
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
      )}

      {/* Center: Open windows / tasks */}
      <CenterSection>
        {terminal.mounted && (
          <>
            <TaskItem
              $active={terminal.visible}
              onClick={() => handleTaskClick(terminal)}
              onContextMenu={e => handleContextMenu(e, "terminal")}
              title="Terminal"
              aria-label="Terminal window"
            >
              {Icons.Terminal}
              {!isMobile && <span>Terminal</span>}
            </TaskItem>
            {contextMenu.visible && contextMenu.windowKey === "terminal" && (
              <ContextMenu
                window={terminal}
                onClose={closeContextMenu}
                position="top"
              />
            )}
          </>
        )}
        {welcome.mounted && (
          <TaskItem
            $active={welcome.visible}
            onClick={() => handleTaskClick(welcome)}
            onContextMenu={e => handleContextMenu(e, "welcome")}
            title="Browser"
            aria-label="Browser window"
          >
            {Icons.Browser}
            {!isMobile && <span>Browser</span>}
            {contextMenu.visible && contextMenu.windowKey === "welcome" && (
              <ContextMenu
                window={welcome}
                onClose={closeContextMenu}
                position="top"
              />
            )}
          </TaskItem>
        )}
        {resume.mounted && (
          <>
            <TaskItem
              $active={resume.visible}
              onClick={() => handleTaskClick(resume)}
              onContextMenu={e => handleContextMenu(e, "resume")}
              title="Resume"
              aria-label="Resume window"
            >
              {Icons.PDF}
              {!isMobile && <span>Resume</span>}
            </TaskItem>
            {contextMenu.visible && contextMenu.windowKey === "resume" && (
              <ContextMenu
                window={resume}
                onClose={closeContextMenu}
                position="top"
              />
            )}
          </>
        )}
      </CenterSection>

      {/* Right: Widgets from config */}
      <RightSection>
        {rightWidgets.map(widget => {
          const params = widget.getProps({
            widgetState,
            setWidgetState,
          });
          return (
            <widget.component
              key={widget.id}
              {...{ ...params, id: widget.id }}
            />
          );
        })}
        <Separator />

        {/* Fullscreen toggle control: hide when any window maximized; allow windows to overlap due to low z-index */}
        <FullscreenToggle
          isFullscreen={isFullscreen}
          onToggle={toggleFullscreen}
        />
      </RightSection>
    </Bar>
  );
};

export default Taskbar;
