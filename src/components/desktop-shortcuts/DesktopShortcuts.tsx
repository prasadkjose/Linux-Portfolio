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
    grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
    grid-auto-rows: max-content;
    gap: 20px;
    justify-items: center;
    align-content: start;
    overflow: auto;
  `
      : `
    top: 24px; left: 24px; bottom: 60px;
    grid-auto-flow: column;
    grid-template-rows: repeat(auto-fill, 88px);
    grid-auto-columns: max-content;
    gap: 18px;
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
  return (
    <Grid hidden={hidden} $mobileExpanded={mobileExpanded}>
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
      {SHORTCUTS.map((data, idx) => {
        // Type-safe access to Icons object
        const iconKey = data.value as IconKey;
        const icon = Icons[iconKey];
        const shortcutKey = `shortcut-${idx}`;
        const openAction =
          data.href && !isInternalUrl(data.href)
            ? () => window.open(data.href, "_blank")
            : () => onOpenBrowserWithUrl?.(data.href as string);

        return (
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
        );
      })}
      <DesktopShortcut
        label="Resume"
        onOpen={onOpenResume}
        icon={Icons.PDF}
        active={activeResume}
        onContextMenu={resume ? e => handleContextMenu(e, "resume") : undefined}
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
    </Grid>
  );
};

export default DesktopShortcuts;
