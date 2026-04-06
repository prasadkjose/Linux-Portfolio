import React from "react";
import styled from "styled-components";
import { WindowState } from "../types/window";

const ContextMenuContainer = styled.div<{
  $position?:
    | "top"
    | "bottom"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
}>`
  position: absolute;
  min-width: 160px;
  background: rgba(18, 18, 18, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: ${({ theme }) => `1px solid ${theme.colors?.scrollHandle}`};
  border-radius: 10px;
  padding: 6px;
  z-index: 10000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

  ${({ $position = "bottom" }) => {
    switch ($position) {
      case "top":
        return `
          /* Position above element centered */
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 8px;
        `;
      case "top-left":
        return `
          /* Position above element aligned left */
          bottom: 100%;
          right: 0;
          margin-bottom: 8px;
        `;
      case "top-right":
        return `
          /* Position above element aligned right */
          bottom: 100%;
          left: 0;
          margin-bottom: 8px;
        `;
      case "bottom-left":
        return `
          /* Position below element aligned left */
          top: 100%;
          right: 0;
          margin-top: 8px;
        `;
      case "bottom-right":
        return `
          /* Position below element aligned right */
          top: 100%;
          left: 0;
          margin-top: 8px;
        `;
      case "bottom":
      default:
        return `
          /* Position below element centered (default) */
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 8px;
        `;
    }
  }}

  /* Keep inside screen boundaries */
  max-width: calc(100vw - 24px);
  @media (max-height: 600px) {
    top: auto;
    bottom: 100%;
    margin-top: 0;
    margin-bottom: 8px;
  }
`;

const MenuItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: transparent;
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
  text-align: left;
  border-radius: 6px;
  transition: all 0.1s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  &:active {
    background: rgba(255, 255, 255, 0.12);
  }
`;

interface ContextMenuProps {
  window: WindowState;
  onClose: () => void;
  position?:
    | "top"
    | "bottom"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  window,
  onClose,
  position = "bottom",
}) => {
  const handleMaximize = () => {
    window.toggleMaximize?.();
    onClose();
  };

  const handleMinimize = () => {
    window.minimize?.();
    onClose();
  };

  const handleClose = () => {
    window.close?.();
    onClose();
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ContextMenuContainer $position={position} onClick={handleContainerClick}>
      <MenuItem onClick={handleMaximize}>
        {window.maximized ? "🗗 Restore" : "⛶ Maximize"}
      </MenuItem>
      <MenuItem onClick={handleMinimize}>🗕 Minimize</MenuItem>
      <MenuItem onClick={handleClose}>✕ Close</MenuItem>
    </ContextMenuContainer>
  );
};

export default ContextMenu;
