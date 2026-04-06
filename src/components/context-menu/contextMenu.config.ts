import { WindowState } from "../../types/window";
import { ContextMenuItem } from "./ContextMenu";
import {
  MaximizeIcon,
  RestoreIcon,
  MinimizeIcon,
  CloseIcon,
  OpenIcon,
} from "./contextMenu.icons";

/**
 * Generates standard window context menu items with proper icon support
 *
 * @param window - Window state object with control methods
 * @returns Grouped context menu items for different UI contexts
 */
export const getWindowContextMenuItems = (
  window: WindowState
): { taskbar: ContextMenuItem[]; "desktop-shortcuts": ContextMenuItem[] } => {
  const { visible, maximized, toggleMaximize, minimize, close, open } = window;

  const taskbarItems: ContextMenuItem[] = [
    {
      icon: maximized ? RestoreIcon : MaximizeIcon,
      label: maximized ? "Restore" : "Maximize",
      onClick: () => toggleMaximize?.(),
      disabled: !toggleMaximize,
    },
  ];

  // Only show Minimize option when window is not already minimized (visible)
  if (visible && minimize) {
    taskbarItems.push({
      icon: MinimizeIcon,
      label: "Minimize",
      onClick: () => minimize?.(),
      disabled: !minimize,
    });
  }

  taskbarItems.push({
    icon: CloseIcon,
    label: "Close",
    onClick: () => close?.(),
    disabled: !close,
  });

  return {
    taskbar: taskbarItems,
    "desktop-shortcuts": [
      {
        icon: OpenIcon,
        label: "Open",
        onClick: () => open?.(),
        disabled: !open,
      },
    ],
  };
};
