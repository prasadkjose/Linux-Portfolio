import { TAB_CONFIGS } from "../../components/windows/welcome-tabs/welcomeTabs.config";
import EmailWindow from "../../components/windows/Email";
import Tabs from "../tabs/Tabs";

/**
 * Browser Router Configuration
 * Registers all browser-based window contents and tab configurations
 */

export const BROWSER_ROUTER_CONFIG = {
  "/home": {
    title: "Home",
    component: Tabs,
    tabs: TAB_CONFIGS,
  },
  "/email": {
    title: "Email",
    component: EmailWindow,
  },
} as const;

export type BrowserRouterConfig = typeof BROWSER_ROUTER_CONFIG;

export default BROWSER_ROUTER_CONFIG;
