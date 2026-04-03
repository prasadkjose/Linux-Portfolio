import React from "react";
import styled from "styled-components";
import DesktopShortcut from "./DesktopShortcut";
import { IconKey, Icons } from "./DesktopIcons";
import { SHORTCUTS } from "./DesktopShortcuts.config";

type Props = {
  onOpenTerminal?: () => void;
  onOpenWelcome?: () => void;
  onOpenWelcomeWithUrl?: (url: string) => void;
  onOpenResume?: () => void;
  hidden?: boolean;
  activeTerminal?: boolean;
  activeBrowser?: boolean;
  activeResume?: boolean;
  mobileExpanded?: boolean;
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
    grid-template-columns: repeat(1, max-content);
    grid-auto-rows: max-content;
    gap: 18px;
  `}
`;

const DesktopShortcuts: React.FC<Props> = ({
  onOpenTerminal,
  onOpenWelcome,
  onOpenWelcomeWithUrl,
  onOpenResume,
  hidden,
  activeTerminal,
  activeBrowser,
  activeResume,
  mobileExpanded,
}) => {
  return (
    <Grid hidden={hidden} $mobileExpanded={mobileExpanded}>
      <DesktopShortcut
        label="Browser"
        onOpen={onOpenWelcome}
        icon={Icons.Browser}
        active={activeBrowser}
      />
      <DesktopShortcut
        label="Terminal"
        onOpen={onOpenTerminal}
        icon={Icons.Terminal}
        active={activeTerminal}
      />
      {SHORTCUTS.map((data, idx) => {
        // Type-safe access to Icons object
        const iconKey = data.value as IconKey;
        const icon = Icons[iconKey];
        return (
          <DesktopShortcut
            key={idx}
            label={data.value}
            href={data.href}
            onOpen={
              onOpenWelcomeWithUrl && data.href
                ? () => onOpenWelcomeWithUrl(data.href!)
                : undefined
            }
            icon={icon}
          />
        );
      })}
      <DesktopShortcut
        label="Resume"
        onOpen={onOpenResume}
        icon={Icons.PDF}
        active={activeResume}
      />
    </Grid>
  );
};

export default DesktopShortcuts;
