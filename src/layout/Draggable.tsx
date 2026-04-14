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

const Draggable: React.FC<DraggableProps> = ({ children }) => {
  const [isDragged, setIsDragged] = useState(false);
  // Calculate initial position based on position prop if provided

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

  // Motion values for tracking position - initialize to 0 first
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Load saved position or use natural DOM position after mount
  React.useEffect(() => {
    const allSavedPositions = getFromLS<
      Record<string, { x: number; y: number }>
    >(STORAGE_KEY, {});
    const savedPosition = allSavedPositions[componentId];

    if (savedPosition) {
      // Use saved position from localStorage if available
      x.set(savedPosition.x);
      y.set(savedPosition.y);
    } else if (containerRef.current) {
      // No saved position - use actual natural position of element in DOM
      const rect = containerRef.current.getBoundingClientRect();
      x.set(rect.left);
      y.set(rect.top);
    }
  }, [componentId, x, y]);

  const bringToFront = () => {
    setIsDragged(true);
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
      style={isDragged ? { x, y, zIndex } : { zIndex }}
      onMouseDown={bringToFront}
      onDragEnd={handleDragEnd}
      dragConstraints={getDragConstraints()}
    >
      {children}
    </DraggableContainer>
  );
};

export default Draggable;
