import { WindowState } from "../../types/window";
import BrowserWindow from "../window-container/BrowserWindow";
import BROWSER_ROUTER_CONFIG from "./browserRouter.config";
import Tabs, { TabData } from "../tabs/Tabs";
import { useEffect, useState } from "react";

const DEFAULT_ROUTE = "/home" as const;

const BrowserRouter: React.FC<WindowState> = props => {
  const { href: rawHref } = props;
  const href = (rawHref ?? DEFAULT_ROUTE) as keyof typeof BROWSER_ROUTER_CONFIG;

  const [tabs, setTabs] = useState<TabData[]>([]);
  // If route exists in config
  if (href in BROWSER_ROUTER_CONFIG) {
    const routeConfig = BROWSER_ROUTER_CONFIG[href];
    const Component = routeConfig.component;
    // Always initialize with home tab if empty
    if (tabs.length === 0) {
      const homeConfig = BROWSER_ROUTER_CONFIG["/home"];
      const homeTab: TabData = {
        id: href,
        label: homeConfig.title,
        content: () => (
          <Tabs
            {...props}
            tabs={homeConfig.tabs.welcome}
            activeTabId="about-me"
          />
        ),
      };
      setTabs(prev => [...prev, homeTab]);
    }

    useEffect(() => {
      // Create new tab from path
      const newTab: TabData = {
        id: href,
        label: BROWSER_ROUTER_CONFIG[href].title,
        content: () => <Component tabs={[]} {...props} />,
      };

      // Only add if tab doesn't already exist
      if (!tabs.find(tab => tab.id === href)) {
        setTabs(prev => [...prev, newTab]);
      }
    }, [href]);

    return (
      <BrowserWindow {...{ ...props, href }}>
        <Tabs
          tabs={tabs}
          activeTabId={href}
          onCloseTab={tabId => {
            setTabs(prev => {
              const newTabs = prev.filter(tab => tab.id !== tabId);
              // Close browser window when last tab is closed
              if (newTabs.length === 0) {
                props.close();
              }
              return newTabs;
            });
          }}
          {...props}
        />
      </BrowserWindow>
    );
  }

  return null;
};

export default BrowserRouter;
