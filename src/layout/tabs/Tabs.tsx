import React, { useState, useEffect } from "react";
import {
  TabBar,
  TabButton,
  TabCloseButton,
  TabContainer,
  TabContent,
} from "./Tabs.styled";

// Tab data interface
export interface TabData {
  id: string;
  label: string;
  content: React.FC;
}

// Tab component props
interface TabsProps {
  tabs: TabData[];
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
  allowClose?: boolean;
  onCloseTab?: (tabId: string) => void;
}

// Tabs component
const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  allowClose = false,
  onCloseTab,
}) => {
  const [internalActiveTabId, setInternalActiveTabId] = useState<string>(
    activeTabId || tabs[0]?.id || ""
  );

  // Update internal state when prop changes
  useEffect(() => {
    if (activeTabId && activeTabId !== internalActiveTabId) {
      setInternalActiveTabId(activeTabId);
    }
  }, [activeTabId]);

  const handleTabClick = (tabId: string) => {
    setInternalActiveTabId(tabId);
    onTabChange?.(tabId);
  };

  const handleTabClose = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onCloseTab?.(tabId);
  };

  const currentTab = tabs.find(tab => tab.id === internalActiveTabId);

  return (
    <TabContainer>
      <TabBar role="tablist" aria-label="Navigation tabs">
        {tabs.map(tab => (
          <TabButton
            key={tab.id}
            $isActive={internalActiveTabId === tab.id}
            onClick={() => handleTabClick(tab.id)}
            role="tab"
            aria-selected={internalActiveTabId === tab.id}
            aria-controls={`tab-panel-${tab.id}`}
            id={`tab-${tab.id}`}
          >
            {tab.label}
            {allowClose && tabs.length > 1 && (
              <TabCloseButton
                onClick={e => handleTabClose(tab.id, e)}
                aria-label={`Close ${tab.label} tab`}
                title="Close tab"
              >
                <svg viewBox="0 0 10 10" aria-hidden="true">
                  <path
                    d="M2 2 L8 8 M8 2 L2 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </TabCloseButton>
            )}
          </TabButton>
        ))}
      </TabBar>

      <TabContent
        role="tabpanel"
        id={`tab-panel-${currentTab?.id}`}
        aria-labelledby={`tab-${currentTab?.id}`}
      >
        {currentTab?.content
          ? React.createElement(currentTab.content, {})
          : null}
      </TabContent>
    </TabContainer>
  );
};

export default Tabs;
