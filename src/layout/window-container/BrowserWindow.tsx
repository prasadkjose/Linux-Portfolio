import React from "react";
import { WindowState } from "../../types/window";
import WindowContainer from "./WindowContainer";

import { Toolbar, LocationBar, Content } from "./BrowserWindow.styled";
import { PERSONAL_DATA } from "../../config/personalData.config";
import { isInternalUrl } from "../../utils/funcs";

interface BrowserWindowProps extends WindowState {
  children?: React.ReactNode;
  href?: string;
}

const BrowserWindow: React.FC<BrowserWindowProps> = ({
  close,
  minimize,
  maximized = false,
  toggleMaximize,
  x = 140,
  y = 60,
  width = 900,
  height = 560,
  move,
  resize,
  visible = true,
  bringToFront,
  z,
  children,
  mounted,
  href,
}) => {
  const openExternal = () => {
    if (href) {
      window.open(href, "_blank");
    }
  };
  return (
    <WindowContainer
      mounted={mounted}
      close={close}
      minimize={minimize}
      maximized={maximized}
      toggleMaximize={toggleMaximize}
      x={x}
      y={y}
      width={width}
      height={height}
      move={move}
      resize={resize}
      visible={visible}
      bringToFront={bringToFront}
      z={z}
      title="Browser"
    >
      <Toolbar>
        <LocationBar>{PERSONAL_DATA.personalInfo.website + href}</LocationBar>
      </Toolbar>

      <Content $maximized={maximized}>
        {href && !isInternalUrl(href) ? (
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <iframe
              src={href}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                backgroundColor: "white",
              }}
              title={`Browser - ${href}`}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              referrerPolicy="no-referrer"
            />
            <div
              style={{
                position: "absolute",
                bottom: 16,
                right: 16,
              }}
            >
              <button
                onClick={openExternal}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#2e3440",
                  color: "#eceff4",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                Open in new tab ↗
              </button>
            </div>
          </div>
        ) : (
          children
        )}
      </Content>
    </WindowContainer>
  );
};

export default BrowserWindow;
