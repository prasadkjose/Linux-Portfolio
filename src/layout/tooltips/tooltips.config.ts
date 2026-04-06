import { isMobileDevice } from "../../utils/typeGuards";
import type { TooltipProps } from "./Tooltip";

export interface TooltipConfigItem extends Pick<TooltipProps, "id"> {
  content: string;
  position: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  showAfter?: number;
}

export const TOOLTIPS_CONFIG: TooltipConfigItem[] = [
  {
    id: "fullscreen-hint",
    showAfter: 1000,
    position: "top-right",
    content: "💡 For best experience tap here to use fullscreen mode",
  },
  {
    id: "theme-switcher-hint",
    showAfter: 60000,
    position: `${isMobileDevice() ? "top-left" : "bottom-right"}`,
    content: "⚙️ Try out a different Linux here.",
  },
];
