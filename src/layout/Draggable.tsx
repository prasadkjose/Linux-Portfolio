import React, { useState, useCallback } from "react";
import { motion, useMotionValue } from "motion/react";
import styled from "styled-components";
import { getFromLS, setToLS } from "../utils/storage";

const DraggableContainer = styled(motion.div)`
  position: absolute;
  cursor: grab;
  user-select: none;
  z-index: 10;

  &:active {
    cursor: grabbing;
  }

  /* Add shadow while dragging */
  &:active > * {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
`;

interface DraggableProps {
  children: React.ReactNode;
  position?: "left" | "right";
  initialX?: number;
  initialY?: number;
}

const Draggable: React.FC<DraggableProps> = ({
  children,
  initialX,
  initialY,
}) => {
  // Auto-detect unique id from child component type name
  const getComponentId = () => {
    if (React.isValidElement(children)) {
      const childType = children.type;
      const componentName =
        typeof childType === "function" ? childType.name : String(childType);
      if (typeof childType === "function") {
        if (children?.props) {
          const props = children.props as { label?: string };
          return `${componentName}_${props.label}`;
        }
        return componentName;
      }
      if (typeof childType === "string") {
        return childType;
      }
    }
    return "default";
  };

  const componentId = getComponentId();
  const STORAGE_KEY = `draggable_positions`;
  const [zIndex, setZIndex] = useState(10);

  const containerRef = React.useRef<HTMLDivElement>(null);
  // Initialize motion values with null - will be set before first paint
  const x = useMotionValue<number | null>(null);
  const y = useMotionValue<number | null>(null);

  // Use useLayoutEffect to set position BEFORE browser paints anything (prevents flicker)
  React.useLayoutEffect(() => {
    const allSavedPositions = getFromLS<
      Record<string, { x: number; y: number }>
    >(STORAGE_KEY, {});
    const savedPosition = allSavedPositions[componentId];

    if (savedPosition) {
      // Use saved position from localStorage if available
      x.set(savedPosition.x);
      y.set(savedPosition.y);
    } else if (initialX !== undefined && initialY !== undefined) {
      // Use explicit initial coordinates if provided via props
      x.set(initialX);
      y.set(initialY);
    } else if (containerRef.current) {
      // No saved position or override - use actual natural DOM position as initial value
      const rect = containerRef.current.getBoundingClientRect();
      x.set(rect.left);
      y.set(rect.top);
    }
  }, [componentId, x, y, initialX, initialY]);

  const bringToFront = () => {
    setZIndex(100);
    // Reset z-index after short delay if another element is clicked
    setTimeout(() => setZIndex(10), 300);
  };

  // Calculate dynamic drag constraints based on actual component size
  const getDragConstraints = useCallback(() => {
    const elementWidth = containerRef.current?.offsetWidth || 280;
    const elementHeight = containerRef.current?.offsetHeight || 280;

    return {
      left: -20,
      right: window.innerWidth - elementWidth + 20,
      top: -20,
      bottom: window.innerHeight - elementHeight + 20,
    };
  }, []);

  // Save position to localStorage when drag ends (store all components in single object)
  const handleDragEnd = useCallback(() => {
    // Get current positions, update only this component's position
    const currentPositions = getFromLS<
      Record<string, { x: number; y: number }>
    >(STORAGE_KEY, {});
    const updatedPositions = {
      ...currentPositions,
      [componentId]: {
        x: x.get(),
        y: y.get(),
      },
    };
    setToLS(STORAGE_KEY, updatedPositions);
  }, [componentId, x, y]);

  return (
    <DraggableContainer
      ref={containerRef}
      drag
      dragMomentum={false}
      dragElastic={0}
      style={(() => {
        const baseStyles = { zIndex };
        // Only apply transform positioning if we have explicit values set
        // This preserves original CSS grid/flex positioning until first drag!
        const currentX = x.get();
        const currentY = y.get();

        if (currentX !== null && currentY !== null) {
          return {
            ...baseStyles,
            x: currentX,
            y: currentY,
          };
        }

        return baseStyles;
      })()}
      onMouseDown={bringToFront}
      onDragEnd={handleDragEnd}
      dragConstraints={getDragConstraints()}
    >
      {children}
    </DraggableContainer>
  );
};

export default Draggable;
