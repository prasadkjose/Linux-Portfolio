import React from "react";
import styled from "styled-components";

type Props = {
  onOpen?: () => void;
  href?: string;
  target?: string;
  label: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  active?: boolean;
  onContextMenu?: (e: React.MouseEvent) => void;
  contextMenu?: React.ReactNode;
};

const ShortcutWrap = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  color: #eceff4;
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    sans-serif;
  z-index: 5; /* below windows */
`;

const IconTile = styled.div<{ $active?: boolean }>`
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.28);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08),
    0 6px 18px rgba(0, 0, 0, 0.3);
  transition:
    transform 0.12s ease,
    background 0.12s ease,
    box-shadow 0.12s ease;
  box-shadow: ${({ $active }) =>
    $active
      ? "0 0 0 2px rgba(0, 180, 255, 0.9), 0 6px 18px rgba(0, 0, 0, 0.3)"
      : "0 0 0 1px rgba(255, 255, 255, 0.08), 0 6px 18px rgba(0, 0, 0, 0.3)"};

  ${ShortcutWrap}:hover & {
    background: rgba(0, 0, 0, 0.36);
    transform: translateY(-1px);
  }
`;

const Label = styled.div`
  font-size: 12px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
`;

const DesktopShortcut: React.FC<Props> = ({
  onOpen,
  href,
  target = "_blank",
  label,
  icon,
  style,
  active,
  onContextMenu,
  contextMenu,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      return onOpen ? onOpen() : href && window.open(href, target);
    }
  };

  const handleClick = () => {
    return onOpen ? onOpen() : href && window.open(href, target);
  };

  return (
    <ShortcutWrap
      role="button"
      tabIndex={0}
      aria-label={`Open ${label}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onContextMenu={onContextMenu}
      style={style}
    >
      <IconTile $active={active}>{icon}</IconTile>
      <Label>{label}</Label>
      {contextMenu}
    </ShortcutWrap>
  );
};

export default DesktopShortcut;
