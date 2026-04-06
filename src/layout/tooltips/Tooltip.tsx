import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { CloseButton } from "../window-container/BrowserWindow.styled";

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

const TooltipBubble = styled.div<{ $position: string }>`
  position: absolute;
  width: 180px;
  padding: 10px;
  background: rgba(12, 12, 18, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #eceff4;
  font-size: 11px;
  text-transform: none;
  font-family:
    system-ui,
    Segoe UI,
    Roboto,
    sans-serif;
  font-weight: 400;
  line-height: 1.4;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  z-index: 10001;
  animation: ${fadeSlideUp} 0.25s ease-out;
  display: flex;
  flex-direction: row-reverse;
  &::after {
    width: 12px;
    height: 12px;
    background: rgba(12, 12, 18, 0.95);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transform: rotate(45deg);
  }

  ${({ $position }) => {
    switch ($position) {
      case "top-left":
        return `
          top: -60px;
          left: 0;
          &::after {
            content: "";
            position: absolute;
            bottom: -6px;
            left: 12px;
          }
        `;
      case "top-right":
        return `
          top: -60px;
          right: 0;
          &::after {
            content: "";
            position: absolute;
            bottom: -6px;
            right: 12px;
          }
        `;
      case "bottom-left":
        return `
          top: 60px;
          left: 0;
          &::after {
            content: "";
            position: absolute;
            top: -6px;
            left: 12px;
          }
        `;
      case "bottom-right":
      default:
        return `
          top: 60px;
          right: 0;
          &::after {
            content: "";
            position: absolute;
            top: -6px;
            right: 12px;
          }
        `;
    }
  }}
`;

interface TooltipProps {
  children: React.ReactNode;
  showAfter?: number;
  showCondition?: boolean;
  onClose?: () => void;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  showAfter = 3000,
  showCondition = true,
  onClose,
  position = "bottom-right",
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showCondition) {
      const timer = setTimeout(() => setVisible(true), showAfter);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [showCondition, showAfter]);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  if (!visible) return null;

  return (
    <TooltipBubble $position={position} onClick={e => e.stopPropagation()}>
      <CloseButton
        onClick={e => {
          e.stopPropagation();
          handleClose();
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
