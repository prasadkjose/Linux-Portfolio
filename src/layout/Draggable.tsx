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
  initialX?: number;
  initialY?: number;
}

const STORAGE_KEY = "draggable-carousel-position";

const Draggable: React.FC<DraggableProps> = ({
  children,
  initialX = window.innerWidth - 360,
  initialY = 80,
}) => {
  const [zIndex, setZIndex] = useState(10);

  // Load saved position from localStorage on mount
  const savedPosition = getFromLS(STORAGE_KEY, { x: initialX, y: initialY });

  // Motion values for tracking position
  const x = useMotionValue(savedPosition.x);
  const y = useMotionValue(savedPosition.y);

  const bringToFront = () => {
    setZIndex(100);
    // Reset z-index after short delay if another element is clicked
    setTimeout(() => setZIndex(10), 300);
  };

  // Save position to localStorage when drag ends
  const handleDragEnd = useCallback(() => {
    setToLS(STORAGE_KEY, {
      x: x.get(),
      y: y.get(),
    });
  }, [x, y]);

  return (
    <DraggableContainer
      drag
      dragMomentum={false}
      dragElastic={0}
      style={{ x, y, zIndex }}
      onMouseDown={bringToFront}
      onDragEnd={handleDragEnd}
      dragConstraints={{
        left: -20,
        right: window.innerWidth - 280,
        top: -20,
        bottom: window.innerHeight - 280,
      }}
    >
      {children}
    </DraggableContainer>
  );
};

export default Draggable;
