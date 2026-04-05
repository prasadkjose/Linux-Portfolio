import React, { useEffect } from "react";

/**
 * Reusable hook for taskbar widget panels:
 * Handles automatic close on outside click and Escape key press
 * Extracted from CalendarPanel implementation - can be used by all widget panels
 */
export const useWidgetPanelCloseHandlers = <T extends HTMLElement>(
  isOpen: boolean,
  onClose: () => void,
  panelRef: React.RefObject<T | null>,
  ignoreElementSelector?: string
) => {
  // Close on outside mouse click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      // Ignore clicks on trigger element if specified
      if (ignoreElementSelector) {
        const ignoreTarget = document.querySelector(ignoreElementSelector);
        if (ignoreTarget && ignoreTarget.contains(e.target as Node)) {
          return;
        }
      }

      // Close if click is outside panel bounds
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose, panelRef, ignoreElementSelector]);

  // Close on Escape keyboard key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, onClose]);
};
