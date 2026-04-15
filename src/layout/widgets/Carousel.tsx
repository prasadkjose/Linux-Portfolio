import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  MotionValue,
  PanInfo,
  useMotionValue,
  useTransform,
  type Transition,
} from "motion/react";
import styled from "styled-components";

import {
  FiCircle,
  FiCode,
  FiFileText,
  FiLayers,
  FiLayout,
} from "react-icons/fi";

export interface Item {
  title: string;
  description: string;
  id: number;
  icon: React.ReactElement;
}

export interface CarouselProps {
  items?: Item[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

// Styled Components
const CarouselContainer = styled.div<{ $round: boolean }>`
  position: relative;
  overflow: hidden;
  border: 1px solid #555;
  border-radius: ${props => (props.$round ? "50%" : "24px")};
  padding: 16px;
  --outer-r: 24px;
  --p-distance: 12px;

  ${props =>
    props.$round &&
    `
    border: 1px solid #555;
  `}
`;

const CarouselTrack = styled(motion.div)`
  display: flex;
`;

const CarouselItemWrapper = styled(motion.div)<{ $round: boolean }>`
  position: relative;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid #555;
  border-radius: calc(var(--outer-r) - var(--p-distance));
  background-color: #0d0716;
  overflow: hidden;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  ${props =>
    props.$round &&
    `
    background-color: #0d0716;
    position: relative;
    bottom: 0.1em;
    border: 1px solid #555;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 50%;
  `}
`;

const CarouselItemHeader = styled.div<{ $round: boolean }>`
  margin-bottom: 16px;
  padding: 20px;
  padding-top: 20px;

  ${props =>
    props.$round &&
    `
    padding: 0;
    margin: 0;
  `}
`;

const CarouselIconContainer = styled.span`
  display: flex;
  height: 28px;
  width: 28px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #fff;
`;

const CarouselItemContent = styled.div`
  padding: 20px;
  padding-bottom: 20px;
`;

const CarouselItemTitle = styled.div`
  margin-bottom: 4px;
  font-weight: 900;
  font-size: 18px;
  color: #fff;
`;

const CarouselItemDescription = styled.p`
  font-size: 14px;
  color: #fff;
`;

const CarouselIndicatorsContainer = styled.div<{ $round: boolean }>`
  display: flex;
  width: 100%;
  justify-content: center;

  ${props =>
    props.$round &&
    `
    position: absolute;
    z-index: 2;
    bottom: 3em;
    left: 50%;
    transform: translateX(-50%);
  `}
`;

const CarouselIndicators = styled.div`
  margin-top: 16px;
  display: flex;
  width: 150px;
  justify-content: space-between;
  padding: 0 32px;
`;

const CarouselIndicator = styled(motion.div)<{
  $active: boolean;
  $round?: boolean;
}>`
  height: 8px;
  width: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 150ms;

  ${props =>
    props.$active
      ? `
    background-color: ${props.$round ? "#333333" : props.theme.colors.primary};
  `
      : `
    background-color: ${props.$round ? "rgba(51, 51, 51, 0.4)" : props.theme.colors.text["100"]};
  `}
`;

const DEFAULT_ITEMS: Item[] = [
  {
    title: "Text Animations",
    description: "Cool text animations for your projects.",
    id: 1,
    icon: <FiFileText />,
  },
  {
    title: "Animations",
    description: "Smooth animations for your projects.",
    id: 2,
    icon: <FiCircle />,
  },
  {
    title: "Components",
    description: "Reusable components for your projects.",
    id: 3,
    icon: <FiLayers />,
  },
  {
    title: "Backgrounds",
    description: "Beautiful backgrounds and patterns for your projects.",
    id: 4,
    icon: <FiLayout />,
  },
  {
    title: "Common UI",
    description: "Common UI components are coming soon!",
    id: 5,
    icon: <FiCode />,
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring" as const, stiffness: 300, damping: 30 };

interface CarouselItemProps {
  item: Item;
  index: number;
  itemWidth: number;
  round: boolean;
  trackItemOffset: number;
  x: MotionValue<number>;
  transition: Transition;
}

function CarouselItem({
  item,
  index,
  itemWidth,
  round,
  trackItemOffset,
  x,
  transition,
}: CarouselItemProps) {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <CarouselItemWrapper
      key={`${item?.id ?? index}-${index}`}
      $round={round}
      style={{
        width: itemWidth,
        height: round ? itemWidth : "100%",
        rotateY: rotateY,
      }}
      transition={transition}
    >
      <CarouselItemHeader $round={round}>
        <CarouselIconContainer>{item.icon}</CarouselIconContainer>
      </CarouselItemHeader>
      <CarouselItemContent>
        <CarouselItemTitle>{item.title}</CarouselItemTitle>
        <CarouselItemDescription>{item.description}</CarouselItemDescription>
      </CarouselItemContent>
    </CarouselItemWrapper>
  );
}

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}: CarouselProps): React.JSX.Element {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;
  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState<number>(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;

    const timer = setInterval(() => {
      setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const startingPosition = loop ? 1 : 0;
    setPosition(startingPosition);
    x.set(-startingPosition * trackItemOffset);
  }, [items.length, loop, trackItemOffset, x]);

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, loop, position]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;

    if (direction === 0) return;

    setPosition(prev => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0,
        },
      };

  const activeIndex =
    items.length === 0
      ? 0
      : loop
        ? (position - 1 + items.length) % items.length
        : Math.min(position, items.length - 1);

  return (
    <CarouselContainer
      ref={containerRef}
      $round={round}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px` }),
      }}
    >
      <CarouselTrack
        drag={isAnimating ? false : "x"}
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItem
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            round={round}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </CarouselTrack>
      <CarouselIndicatorsContainer $round={round}>
        <CarouselIndicators>
          {items.map((_, index) => (
            <CarouselIndicator
              key={index}
              $active={activeIndex === index}
              $round={round}
              animate={{
                scale: activeIndex === index ? 1.2 : 1,
              }}
              onClick={() => setPosition(loop ? index + 1 : index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </CarouselIndicators>
      </CarouselIndicatorsContainer>
    </CarouselContainer>
  );
}
