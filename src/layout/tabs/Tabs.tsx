import React, { useState, useEffect } from "react";
import {
  TabBar,
  TabButton,
  TabContainer,
  TabContent,
  MobileMenuButton,
  MobileMenuIcon,
  MobileMenu,
} from "./Tabs.styled";
import { isMobileDevice } from "../../utils/typeGuards";
import { CloseButton } from "../../layout/window-container/BrowserWindow.styled";

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
  onCloseTab?: (tabId: string) => void;
}

// Tabs component
const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTabId,
  onTabChange,
  onCloseTab,
}) => {
  const [internalActiveTabId, setInternalActiveTabId] = useState<string>(
    activeTabId || tabs[0]?.id || ""
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Device detection
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const update = () => setIsMobile(isMobileDevice());
    update();
  }, []);
  const isBrowserTabs = !!onCloseTab;

  // Update internal state when prop changes
  useEffect(() => {
    if (activeTabId && activeTabId !== internalActiveTabId) {
      setInternalActiveTabId(activeTabId);
    }
  }, [activeTabId]);

  const handleTabClick = (tabId: string) => {
    setInternalActiveTabId(tabId);
    onTabChange?.(tabId);
    setIsMobileMenuOpen(false);
  };

  const handleTabClose = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onCloseTab?.(tabId);
  };

  const currentTab = tabs.find(tab => tab.id === internalActiveTabId);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const tabsComponent = tabs.map(tab => (
    <TabButton
      key={tab.id}
      $isActive={internalActiveTabId === tab.id}
      $isBrowserTabs={isBrowserTabs}
      onClick={() => handleTabClick(tab.id)}
      role="tab"
      aria-selected={internalActiveTabId === tab.id}
      aria-controls={`tab-panel-${tab.id}`}
      id={`tab-${tab.id}`}
    >
      {tab.label}
      {onCloseTab && (
        <CloseButton
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
        </CloseButton>
      )}
    </TabButton>
  ));

  return (
    <TabContainer>
      <TabBar role="tablist" aria-label="Navigation tabs">
        {isMobile ? (
          <>
            <MobileMenuButton
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
            >
              <span>{currentTab?.label || tabs[0]?.label}</span>
              <MobileMenuIcon $isOpen={isMobileMenuOpen}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </MobileMenuIcon>
            </MobileMenuButton>
            {isMobileMenuOpen && <MobileMenu>{tabsComponent}</MobileMenu>}
          </>
        ) : (
          tabsComponent
        )}
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
