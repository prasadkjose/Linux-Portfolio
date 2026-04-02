import React from "react";
import styled, { keyframes } from "styled-components";
import { CloseButton } from "../layout/window-container/BrowserWindow.styled";

const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const TooltipBubble = styled.div`
  position: absolute;
  bottom: 60px;
  display: flex;
  flex-direction: row-reverse;
  right: 0;
  width: 180px;
  padding: 10px;
  background: rgba(12, 12, 18, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #eceff4;
  font-size: 11px;
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    sans-serif;
  font-weight: 400;
  line-height: 1.4;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  z-index: 10001;
  animation: ${fadeSlideUp} 0.25s ease-out;

  &::after {
    content: "";
    position: absolute;
    bottom: -6px;
    right: 12px;
    width: 12px;
    height: 12px;
    background: rgba(12, 12, 18, 0.95);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transform: rotate(45deg);
  }
`;

interface TooltipProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Tooltip: React.FC<TooltipProps> = ({ children, onClose }) => {
  return (
    <TooltipBubble onClick={e => e.stopPropagation()}>
      <CloseButton
        onClick={e => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Dismiss tooltip"
      >
        ✕
      </CloseButton>
      {children}
    </TooltipBubble>
  );
};

export default Tooltip;
