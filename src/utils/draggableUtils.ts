import React from "react";

export const DRAGGABLE_STORAGE_KEY = `draggable_positions`;

/**
 * Extracts a unique component identifier from a React child element
 * Uses component name + optional label prop for uniqueness
 */
export const getComponentId = (children: React.ReactNode): string => {
  if (React.isValidElement(children)) {
    const childType = children.type;
    const componentName =
      typeof childType === "function" ? childType.name : String(childType);

    if (typeof childType === "function") {
      if (children?.props) {
        const props = children.props as { label?: string };
        if (props.label) {
          return `${componentName}_${props.label}`;
        }
        return componentName;
      }
      return componentName;
    }

    if (typeof childType === "string") {
      return childType;
    }
  }

  return "default";
};

/**
 * Format for storage keys - consistent key pattern for draggable positions
 */
export type DraggablePosition = {
  x: number;
  y: number;
};

export type DraggablePositionsMap = Record<string, DraggablePosition>;
