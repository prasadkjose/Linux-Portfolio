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
  const [currentTab, setCurrentTab] = useState<string>(DEFAULT_ROUTE);
  // If route exists in config
  if (href in BROWSER_ROUTER_CONFIG) {
    const routeConfig = BROWSER_ROUTER_CONFIG[href];
    const Component = routeConfig.component;
    useEffect(() => {
      // Create new tab from path
      const newTab: TabData = {
        id: href,
        label: routeConfig.title,
        content: () => {
          // Only pass tabs prop if the route config actually has tabs property
          let tabs: TabData[] = [];
          if ("tabs" in routeConfig) {
            tabs = routeConfig.tabs;
          }
          return <Component tabs={tabs} {...props} />;
        },
      };

      // Only add if tab doesn't already exist - use functional update to check previous state
      setTabs(prev => {
        setCurrentTab(newTab.id);
        if (!prev.find(tab => tab.id === href)) {
          return [...prev, newTab];
        }
        return prev;
      });
    }, [href]);

    return (
      <BrowserWindow {...{ ...props, href }}>
        <Tabs
          tabs={tabs}
          activeTabId={currentTab}
          onCloseTab={tabId => {
            setTabs(prev => {
              const newTabs = prev.filter(tab => tab.id !== tabId);
              // Close browser window when last tab is closed
              if (newTabs.length === 0) {
                props.close();
              }
              setCurrentTab(newTabs[0].id);
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
