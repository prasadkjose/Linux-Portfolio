import { WindowState } from "../../types/window";
import { ContextMenuItem } from "./ContextMenu";

/**
 * Generates standard window context menu items (Maximize/Restore, Minimize, Close)
 * Use this helper function to create context menu items from WindowState
 */
export const getWindowContextMenuItems = (
  window: WindowState
): Record<string, ContextMenuItem[]> => ({
  taskbar: [
    {
      label: window.maximized ? "🗗 Restore" : "⛶ Maximize",
      onClick: () => window.toggleMaximize?.(),
    },
    {
      label: "🗕 Minimize",
      onClick: () => window.minimize?.(),
    },
    {
      label: "✕ Close",
      onClick: () => window.close?.(),
    },
  ],
  "desktop-shortcuts": [
    {
      label: "Open",
      onClick: () => window.open?.(),
    },
  ],
});
