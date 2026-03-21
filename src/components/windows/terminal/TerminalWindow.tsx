import React from "react";
import styled from "styled-components";
import Terminal from "./Terminal";
import { WindowState } from "../../../types/window";
import WindowContainer from "../../../layout/window-container/WindowContainer";

const MenuBar = styled.div`
  ${({ theme }) =>
    theme.backgroundImage &&
    `
    background: rgba(24, 24, 24, 0.85);
    height: 28px; display: flex; align-items: center; padding: 0 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-family: system-ui, -apple-system, sans-serif;
  `}
`;

const MenuItem = styled.span`
  ${({ theme }) =>
    theme.backgroundImage &&
    `
    font-size: 12px; color: #ECEFF4; padding: 4px 8px; cursor: pointer; border-radius: 4px; transition: all 0.2s ease;
    &:hover { background: rgba(255, 255, 255, 0.08); transform: translateY(-1px); }
  `}
`;

const TerminalContent = styled.div<{ $maximized?: boolean }>`
  ${({ theme }) =>
    theme.backgroundImage &&
    `
    font-size: 0.8rem; background: transparent; display: flex; flex-direction: column; align-items: stretch; overflow: hidden;
  `}
  height: ${({ $maximized }) =>
    $maximized ? "calc(100vh - 32px - 28px)" : "calc(100% - 32px - 28px)"};
  & > * {
    flex: 1 1 auto;
    min-height: 0;
  }
`;

const TerminalWindow: React.FC<WindowState> = props => {
  return (
    <WindowContainer {...props} title="Terminal">
      <MenuBar>
        <MenuItem>File</MenuItem>
        <MenuItem>Edit</MenuItem>
        <MenuItem>View</MenuItem>
        <MenuItem>Search</MenuItem>
        <MenuItem>Terminal</MenuItem>
        <MenuItem>Help</MenuItem>
      </MenuBar>

      <TerminalContent $maximized={props.maximized}>
        <Terminal />
      </TerminalContent>
    </WindowContainer>
  );
};

export default TerminalWindow;
