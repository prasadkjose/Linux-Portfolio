import { useState, useRef, useEffect, ReactNode, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import styled from "styled-components";

type Position =
  | "top-left"
  | "top"
  | "top-right"
  | "left"
  | "center"
  | "right"
  | "bottom-left"
  | "bottom"
  | "bottom-right";

interface MobileWidgetButtonProps {
  /** Button content (icon, text etc.) */
  children: ReactNode;
  isMobile: boolean;
  /** Widget content to display when opened */
  widget: ReactNode;
  /** Preferred position, will auto fallback if out of viewport */
  preferredPosition?: Position;
  /** Optional click handler before opening */
  onClick?: () => void;
  /** Close widget when clicking outside */
  closeOnOutsideClick?: boolean;
  /** Disable button */
  disabled?: boolean;
  /** Custom className for button */
  className?: string;
  /** Custom className for widget container */
  widgetClassName?: string;
  /** Widget estimated dimensions for boundary calculation */
  widgetDimensions?: { width: number; height: number };
}

const ButtonWrapper = styled.button<{ disabled?: boolean }>`
  position: relative;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  opacity: ${props => (props.disabled ? 0.5 : 1)};

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.95);
    transition: transform 100ms ease;
  }
`;

const WidgetContainer = styled(motion.div)<{
  $position: Position;
  $offsetX: number;
  $offsetY: number;
}>`
  position: absolute;
  z-index: 9999;
  background-color: rgba(15, 15, 15, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

  ${props => {
    const gap = 12;
    switch (props.$position) {
      case "top-left":
        return `
          bottom: calc(100% + ${gap}px);
          right: 0;
          transform-origin: bottom right;
        `;
      case "top":
        return `
          bottom: calc(100% + ${gap}px);
          left: 50%;
          transform-origin: bottom center;
          transform: translateX(${props.$offsetX}px);
        `;
      case "top-right":
        return `
          bottom: calc(100% + ${gap}px);
          left: 0;
          transform-origin: bottom left;
        `;
      case "left":
        return `
          right: calc(100% + ${gap}px);
          top: 50%;
          transform-origin: right center;
          transform: translateY(${props.$offsetY}px);
        `;
      case "center":
        return `
          top: 50%;
          left: 50%;
          transform-origin: center;
        `;
      case "right":
        return `
          left: calc(100% + ${gap}px);
          top: 50%;
          transform-origin: left center;
          transform: translateY(${props.$offsetY}px);
        `;
      case "bottom-left":
        return `
          top: calc(100% + ${gap}px);
          right: 0;
          transform-origin: top right;
        `;
      case "bottom":
        return `
          top: calc(100% + ${gap}px);
          left: 50%;
          transform-origin: top center;
          transform: translateX(${props.$offsetX}px);
        `;
      case "bottom-right":
      default:
        return `
          top: calc(100% + ${gap}px);
          left: 0;
          transform-origin: top left;
        `;
    }
  }}
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: transparent;
`;

export default function MobileWidgetButton({
  children,
  isMobile,
  widget,
  preferredPosition = "top",
  onClick,
  closeOnOutsideClick = true,
  disabled = false,
  className,
  widgetClassName,
  widgetDimensions = { width: 320, height: 400 },
}: MobileWidgetButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [calculatedPosition, setCalculatedPosition] =
    useState<Position>(preferredPosition);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const calculateOptimalPosition = useCallback(() => {
    if (!buttonRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const gap = 12;

    // Check each position for available space
    const space = {
      top: buttonRect.top - gap,
      bottom: viewportHeight - buttonRect.bottom - gap,
      left: buttonRect.left - gap,
      right: viewportWidth - buttonRect.right - gap,
    };

    // Find best position that fits widget
    let bestPosition = preferredPosition;
    const positions: Position[] = ["top", "bottom", "right", "left"];

    for (const pos of positions) {
      const fitsVertical =
        pos === "top" || pos === "bottom"
          ? space[pos] >= widgetDimensions.height
          : true;
      const fitsHorizontal =
        pos === "left" || pos === "right"
          ? space[pos] >= widgetDimensions.width
          : true;

      if (fitsVertical && fitsHorizontal) {
        bestPosition = pos;
        break;
      }
    }

    // Calculate offset to keep widget inside viewport
    let newOffsetX = 0;
    let newOffsetY = 0;

    if (bestPosition === "top" || bestPosition === "bottom") {
      const widgetLeft =
        buttonRect.left + buttonRect.width / 2 - widgetDimensions.width / 2;
      const widgetRight = widgetLeft + widgetDimensions.width;

      if (widgetLeft < 0) newOffsetX = Math.abs(widgetLeft) + 16;
      if (widgetRight > viewportWidth)
        newOffsetX = -(widgetRight - viewportWidth) - 16;
    }

    if (bestPosition === "left" || bestPosition === "right") {
      const widgetTop =
        buttonRect.top + buttonRect.height / 2 - widgetDimensions.height / 2;
      const widgetBottom = widgetTop + widgetDimensions.height;

      if (widgetTop < 0) newOffsetY = Math.abs(widgetTop) + 16;
      if (widgetBottom > viewportHeight)
        newOffsetY = -(widgetBottom - viewportHeight) - 16;
    }

    setCalculatedPosition(bestPosition);
    setOffsetX(newOffsetX);
    setOffsetY(newOffsetY);
  }, [preferredPosition, widgetDimensions]);

  const handleClick = () => {
    if (disabled) return;

    onClick?.();
    calculateOptimalPosition();
    setIsOpen(prev => !prev);
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (closeOnOutsideClick && isOpen) {
      e.stopPropagation();
      setIsOpen(false);
    }
  };

  // Close widget on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  if (isMobile)
    return (
      <>
        <AnimatePresence>
          {isOpen && closeOnOutsideClick && (
            <Backdrop onClick={handleOutsideClick} />
          )}
        </AnimatePresence>

        <ButtonWrapper
          ref={buttonRef}
          onClick={handleClick}
          disabled={disabled}
          className={className}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {children}

          <AnimatePresence>
            {isOpen && (
              <WidgetContainer
                className={widgetClassName}
                $position={calculatedPosition}
                $offsetX={offsetX}
                $offsetY={offsetY}
                initial={{
                  opacity: 0,
                  scale: 0.85,
                  translateY:
                    calculatedPosition === "top"
                      ? 10
                      : calculatedPosition === "bottom"
                        ? -10
                        : 0,
                  translateX:
                    calculatedPosition === "left"
                      ? 10
                      : calculatedPosition === "right"
                        ? -10
                        : 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  translateY: 0,
                  translateX: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.85,
                  translateY:
                    calculatedPosition === "top"
                      ? 10
                      : calculatedPosition === "bottom"
                        ? -10
                        : 0,
                  translateX:
                    calculatedPosition === "left"
                      ? 10
                      : calculatedPosition === "right"
                        ? -10
                        : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  duration: 0.2,
                }}
                onClick={e => e.stopPropagation()}
              >
                {widget}
              </WidgetContainer>
            )}
          </AnimatePresence>
        </ButtonWrapper>
      </>
    );
}
