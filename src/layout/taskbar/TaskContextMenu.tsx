import React from "react";
import styled from "styled-components";
import { WindowState } from "../../types/window";

const ContextMenu = styled.div`
  position: absolute;
  bottom: 52px;
  left: 0;
  min-width: 160px;
  background: rgba(18, 18, 18, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 6px;
  z-index: 10000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
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

interface TaskContextMenuProps {
  window: WindowState;
  onClose: () => void;
}

export const TaskContextMenu: React.FC<TaskContextMenuProps> = ({
  window,
  onClose,
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
    <ContextMenu onClick={handleContainerClick}>
      <MenuItem onClick={handleMaximize}>
        {window.maximized ? "🗗 Restore" : "⛶ Maximize"}
      </MenuItem>
      <MenuItem onClick={handleMinimize}>🗕 Minimize</MenuItem>
      <MenuItem onClick={handleClose}>✕ Close</MenuItem>
    </ContextMenu>
  );
};
