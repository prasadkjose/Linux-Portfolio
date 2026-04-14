import React from "react";
import styled from "styled-components";
import DesktopShortcut from "./DesktopShortcut";
import { IconKey, Icons } from "./DesktopIcons";
import { SHORTCUTS } from "./DesktopShortcuts.config";
import { useTaskMenu } from "../../hooks/useContextMenu";
import ContextMenu from "../context-menu/ContextMenu";
import { WindowState } from "../../types/window";
import { getWindowContextMenuItems } from "../context-menu/contextMenu.config";
import { OpenIcon } from "../context-menu/contextMenu.icons";
import { isInternalUrl } from "../../utils/funcs";
import Draggable from "../../layout/Draggable";

type Props = {
  onOpenTerminal?: () => void;
  onOpenWelcome?: () => void;
  onOpenBrowserWithUrl?: (url: string) => void;
  onOpenResume?: () => void;
  hidden?: boolean;
  activeTerminal?: boolean;
  activeBrowser?: boolean;
  activeResume?: boolean;
  mobileExpanded?: boolean;
  terminal?: WindowState;
  welcome?: WindowState;
  resume?: WindowState;
};

const Grid = styled.div<{ hidden?: boolean; $mobileExpanded?: boolean }>`
  position: fixed;
  display: grid;
  z-index: 10; /* below windows */
  ${({ hidden }) => hidden && "display:none;"}

  ${({ $mobileExpanded }) =>
    $mobileExpanded
      ? `
    top: 12px; left: 12px; right: 12px; bottom: 60px;
    overflow: auto;
  `
      : `
    top: 24px; left: 24px; bottom: 60px;
  `}
`;

const DesktopShortcuts: React.FC<Props> = ({
  onOpenTerminal,
  onOpenWelcome,
  onOpenResume,
  hidden,
  activeTerminal,
  activeBrowser,
  activeResume,
  mobileExpanded,
  terminal,
  welcome,
  resume,
  onOpenBrowserWithUrl,
}) => {
  const { contextMenu, handleContextMenu, closeContextMenu } = useTaskMenu();

  // Calculate responsive initial positions based on layout mode
  const getInitialPosition = (index: number) => {
    if (mobileExpanded) {
      // Mobile horizontal grid layout with proper wrapping - full left aligned
      const colWidth = 96 + 20;
      const rowHeight = 96 + 20;
      const availableWidth = window.innerWidth;
      const itemsPerRow = Math.max(1, Math.floor(availableWidth / colWidth));

      const col = index % itemsPerRow;
      const row = Math.floor(index / itemsPerRow);

      return {
        x: col * colWidth,
        y: 12 + row * rowHeight,
      };
    }
    // Desktop vertical grid layout with column wrapping
    const rowHeight = 88 + 18;
    const colWidth = 88 + 18;
    const availableHeight = window.innerHeight - 60 - 24; // Account for bottom taskbar and top padding
    const itemsPerColumn = Math.max(1, Math.floor(availableHeight / rowHeight));

    const row = index % itemsPerColumn;
    const col = Math.floor(index / itemsPerColumn);

    return {
      x: 24 + col * colWidth,
      y: 24 + row * rowHeight,
    };
  };

  const browserPos = getInitialPosition(0);
  const terminalPos = getInitialPosition(1);
  const firstShortcutIndex = 2;
  const resumeIndex = firstShortcutIndex + SHORTCUTS.length;

  return (
    <Grid hidden={hidden} $mobileExpanded={mobileExpanded}>
      <Draggable initialX={browserPos.x} initialY={browserPos.y}>
        <DesktopShortcut
          label="Browser"
          onOpen={onOpenWelcome}
          icon={Icons.Browser}
          active={activeBrowser}
          onContextMenu={
            welcome ? e => handleContextMenu(e, "welcome") : undefined
          }
          contextMenu={
            contextMenu.visible &&
            contextMenu.windowKey === "welcome" &&
            welcome ? (
              <ContextMenu
                items={getWindowContextMenuItems(welcome)["desktop-shortcuts"]}
                onClose={closeContextMenu}
                position={"bottom-right"}
              />
            ) : undefined
          }
        />
      </Draggable>
      <Draggable initialX={terminalPos.x} initialY={terminalPos.y}>
        <DesktopShortcut
          label="Terminal"
          onOpen={onOpenTerminal}
          icon={Icons.Terminal}
          active={activeTerminal}
          onContextMenu={
            terminal ? e => handleContextMenu(e, "terminal") : undefined
          }
          contextMenu={
            contextMenu.visible &&
            contextMenu.windowKey === "terminal" &&
            terminal ? (
              <ContextMenu
                items={getWindowContextMenuItems(terminal)["desktop-shortcuts"]}
                onClose={closeContextMenu}
                position={"bottom-right"}
              />
            ) : undefined
          }
        />
      </Draggable>
      {SHORTCUTS.map((data, idx) => {
        // Type-safe access to Icons object
        const iconKey = data.value as IconKey;
        const icon = Icons[iconKey];
        const shortcutKey = `shortcut-${idx}`;
        const openAction =
          data.href && !isInternalUrl(data.href)
            ? () => window.open(data.href, "_blank")
            : () => onOpenBrowserWithUrl?.(data.href as string);

        const shortcutPos = getInitialPosition(firstShortcutIndex + idx);

        return (
          <Draggable initialX={shortcutPos.x} initialY={shortcutPos.y}>
            <DesktopShortcut
              key={idx}
              label={data.value}
              href={data.href}
              onOpen={openAction}
              icon={icon}
              onContextMenu={e => handleContextMenu(e, shortcutKey)}
              contextMenu={
                contextMenu.visible && contextMenu.windowKey === shortcutKey ? (
                  <ContextMenu
                    items={[
                      {
                        icon: OpenIcon,
                        label: "Open",
                        onClick: () => {
                          openAction?.();
                          closeContextMenu();
                        },
                        disabled: !openAction,
                      },
                    ]}
                    onClose={closeContextMenu}
                    position={"bottom-right"}
                  />
                ) : undefined
              }
            />
          </Draggable>
        );
      })}
      <Draggable
        initialX={getInitialPosition(resumeIndex).x}
        initialY={getInitialPosition(resumeIndex).y}
      >
        <DesktopShortcut
          label="Resume"
          onOpen={onOpenResume}
          icon={Icons.PDF}
          active={activeResume}
          onContextMenu={
            resume ? e => handleContextMenu(e, "resume") : undefined
          }
          contextMenu={
            contextMenu.visible &&
            contextMenu.windowKey === "resume" &&
            resume ? (
              <ContextMenu
                items={getWindowContextMenuItems(resume)["desktop-shortcuts"]}
                onClose={closeContextMenu}
                position={"bottom-right"}
              />
            ) : undefined
          }
        />
      </Draggable>
    </Grid>
  );
};

export default DesktopShortcuts;
