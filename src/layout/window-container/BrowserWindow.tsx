import React from "react";
import { WindowState } from "../../types/window";
import WindowContainer from "./WindowContainer";

import { Toolbar, LocationBar, Content } from "./BrowserWindow.styled";

interface BrowserWindowProps extends WindowState {
  children?: React.ReactNode;
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
}) => {
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
        <LocationBar>https://prasadkjose.com</LocationBar>
      </Toolbar>

      <Content maximized={maximized}>{children}</Content>
    </WindowContainer>
  );
};

export default BrowserWindow;
