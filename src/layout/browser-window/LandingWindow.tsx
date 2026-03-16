import React, { useCallback, useEffect, useRef, useState } from "react";
import { WindowState } from "../../types/window";
import Tabs from "../tabs/Tabs";
import HomeTab from "../../components/welcome-tabs/HomeTab";
import ExperienceTab from "../../components/welcome-tabs/ExperienceTab";
import EducationTab from "../../components/welcome-tabs/EducationTab";
import {
  Handle,
  Frame,
  TitleBar,
  WindowTitle,
  WindowControls,
  ControlButton,
  Toolbar,
  LocationBar,
  Content,
} from "./BrowserWindow.styled";

const MIN_W = 520;
const MIN_H = 340;
const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const LandingWindow: React.FC<WindowState> = ({
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
}) => {
  const posRef = useRef({ x, y });
  const sizeRef = useRef({ width, height });
  useEffect(() => {
    posRef.current = { x, y };
  }, [x, y]);
  useEffect(() => {
    sizeRef.current = { width, height };
  }, [width, height]);

  const dragging = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, sx: 0, sy: 0 });
  const [, setIsTransforming] = useState(false);
  const resizing = useRef<null | {
    dir: React.ComponentProps<typeof Handle>["pos"];
    mx: number;
    my: number;
    sx: number;
    sy: number;
    sw: number;
    sh: number;
  }>(null);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (maximized) return;
      if (dragging.current) {
        const dx = e.clientX - dragStart.current.mx;
        const dy = e.clientY - dragStart.current.my;
        const ww = window.innerWidth;
        const wh = window.innerHeight;
        const nx = clamp(
          dragStart.current.sx + dx,
          0,
          Math.max(0, ww - sizeRef.current.width)
        );
        const ny = clamp(
          dragStart.current.sy + dy,
          0,
          Math.max(0, wh - sizeRef.current.height)
        );
        move && move(nx, ny);
      } else if (resizing.current) {
        const { dir, mx, my, sx, sy, sw, sh } = resizing.current;
        let nw = sw,
          nh = sh,
          nx = sx,
          ny = sy;
        const dx = e.clientX - mx;
        const dy = e.clientY - my;
        if (dir.includes("e")) nw = sw + dx;
        if (dir.includes("s")) nh = sh + dy;
        if (dir.includes("w")) {
          nw = sw - dx;
          nx = sx + dx;
        }
        if (dir.includes("n")) {
          nh = sh - dy;
          ny = sy + dy;
        }
        nw = Math.max(MIN_W, nw);
        nh = Math.max(MIN_H, nh);
        const ww = window.innerWidth;
        const wh = window.innerHeight;
        nx = clamp(nx, 0, Math.max(0, ww - nw));
        ny = clamp(ny, 0, Math.max(0, wh - nh));
        resize && resize(nw, nh, nx, ny);
      }
    },
    [maximized, move, resize]
  );

  const onMouseUp = useCallback(() => {
    dragging.current = false;
    resizing.current = null;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    const t = setTimeout(() => setIsTransforming(false), 0);
    return () => clearTimeout(t);
  }, [onMouseMove]);

  const startDrag = (e: React.MouseEvent) => {
    if (maximized) return;
    dragging.current = true;
    setIsTransforming(false);
    dragStart.current = {
      mx: e.clientX,
      my: e.clientY,
      sx: posRef.current.x,
      sy: posRef.current.y,
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const startResize =
    (dir: React.ComponentProps<typeof Handle>["pos"]) =>
    (e: React.MouseEvent) => {
      if (maximized) return;
      e.stopPropagation();
      resizing.current = {
        dir,
        mx: e.clientX,
        my: e.clientY,
        sx: posRef.current.x,
        sy: posRef.current.y,
        sw: sizeRef.current.width,
        sh: sizeRef.current.height,
      };
      setIsTransforming(false);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    };

  return (
    <Frame
      x={x}
      y={y}
      width={width}
      height={height}
      maximized={maximized}
      hidden={!visible}
      isTransforming={!dragging.current && !resizing.current}
      z={z}
      onClick={bringToFront}
    >
      <TitleBar
        onMouseDown={e => {
          startDrag(e);
          bringToFront && bringToFront();
        }}
      >
        <WindowTitle>Browser</WindowTitle>
        <WindowControls aria-label="Window controls">
          {minimize && (
            <ControlButton
              variant="min"
              title="Minimize"
              aria-label="Minimize"
              onClick={minimize}
            >
              <svg viewBox="0 0 10 10" aria-hidden="true">
                <rect x="1" y="5" width="8" height="1" rx="0.5" />
              </svg>
            </ControlButton>
          )}
          {toggleMaximize && (
            <ControlButton
              variant="max"
              title="Maximize"
              aria-label="Maximize"
              onClick={toggleMaximize}
            >
              <svg viewBox="0 0 10 10" aria-hidden="true">
                <rect
                  x="2"
                  y="2"
                  width="6"
                  height="6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </ControlButton>
          )}
          <ControlButton
            variant="close"
            title="Close"
            aria-label="Close"
            onClick={close}
          >
            <svg viewBox="0 0 10 10" aria-hidden="true">
              <path
                d="M2 2 L8 8 M8 2 L2 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </ControlButton>
        </WindowControls>
      </TitleBar>

      {!maximized && (
        <>
          <Handle pos="n" onMouseDown={startResize("n")} />
          <Handle pos="s" onMouseDown={startResize("s")} />
          <Handle pos="e" onMouseDown={startResize("e")} />
          <Handle pos="w" onMouseDown={startResize("w")} />
          <Handle pos="ne" onMouseDown={startResize("ne")} />
          <Handle pos="nw" onMouseDown={startResize("nw")} />
          <Handle pos="se" onMouseDown={startResize("se")} />
          <Handle pos="sw" onMouseDown={startResize("sw")} />
        </>
      )}

      <Toolbar>
        <LocationBar>https://prasadkjose.com</LocationBar>
      </Toolbar>

      <Content maximized={maximized}>
        <Tabs
          tabs={[
            {
              id: "home",
              label: "Home",
              content: <HomeTab />,
            },
            {
              id: "experience",
              label: "Experience",
              content: <ExperienceTab />,
            },
            {
              id: "education",
              label: "Education & Certifications",
              content: <EducationTab />,
            },
          ]}
          activeTabId="home"
        />
      </Content>
    </Frame>
  );
};

export default LandingWindow;
