import styled, { css } from "styled-components";

export const Frame = styled.div<{
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  maximized?: boolean;
  hidden?: boolean;
  isTransforming?: boolean;
  z?: number;
}>`
  position: fixed;
  box-sizing: border-box;
  ${({ theme }) =>
    theme.backgroundImage &&
    `
    background: rgba(0, 0, 0, 0.35);
    border-radius: 12px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  `}
  ${({ hidden }) =>
    hidden &&
    css`
      display: none;
    `}
  ${({ maximized, theme }) =>
    maximized &&
    theme.backgroundImage &&
    css`
      inset: 0;
      margin: 0;
      max-width: none;
      width: 100vw;
      height: 100vh;
      border-radius: 0;
    `}
  ${({ maximized, x, y, width, height }) =>
    !maximized &&
    css`
      left: ${x ?? 140}px;
      top: ${y ?? 60}px;
      width: ${width ?? 900}px;
      height: ${height ?? 560}px;
    `}
  z-index: ${({ z }) => z ?? 200}; /* above desktop icons but below modals */
  transition: ${({ isTransforming }) =>
    isTransforming
      ? "left 180ms ease, top 180ms ease, width 180ms ease, height 180ms ease, border-radius 180ms ease"
      : "none"};
`;

export const TitleBar = styled.div`
  ${({ theme }) =>
    theme.backgroundImage &&
    `
    background: linear-gradient(to bottom, rgba(32, 32, 32, 0.9), rgba(24, 24, 24, 0.9));
    height: 32px; display: flex; align-items: center; justify-content: center;
    padding: 0 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); position: relative; cursor: move;
  `}
`;

export const WindowTitle = styled.div`
  ${({ theme }) =>
    theme.backgroundImage &&
    `
    font-size: 13px; color: #ECEFF4; font-weight: 500; flex: 1; text-align: center; font-family: system-ui, -apple-system, sans-serif;
  `}
`;

export const WindowControls = styled.div`
  ${({ theme }) =>
    theme.backgroundImage &&
    `
    position: absolute; right: 12px; top: 0; height: 100%; display: flex; align-items: center; gap: 0;
  `}
`;

export const ControlButton = styled.button<{
  variant?: "min" | "max" | "close";
}>`
  ${({ theme, variant }) =>
    theme.backgroundImage &&
    `
    width: 46px; height: 100%; cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: background 0.15s ease; border: none; background: transparent; color: #d9d9d9;
    &:hover { background: ${
      variant === "close" ? "#E81123" : "rgba(0,0,0,0.08)"
    }; }
    &:active { background: ${
      variant === "close" ? "#F1707A" : "rgba(0,0,0,0.12)"
    }; }
    svg { width: 12px; height: 12px; fill: currentColor; }
    ${
      variant === "close"
        ? `&:hover svg { color: #fff; } &:active svg { color: #fff; }`
        : ""
    }
  `}
`;

export const Toolbar = styled.div`
  ${({ theme }) =>
    theme.backgroundImage &&
    `
    height: 36px; display:flex; align-items:center; padding: 0 16px;
    background: rgba(24, 24, 24, 0.85);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    font-family: system-ui, -apple-system, sans-serif;
  `}
`;

export const LocationBar = styled.div`
  flex: 1;
  height: 24px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  padding: 0 12px;
  color: #eceff4;
  font-size: 13px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-weight: 400;
`;

export const Content = styled.div<{ maximized?: boolean }>`
  height: ${({ maximized }) =>
    maximized ? "calc(100vh - 32px - 36px)" : "calc(100% - 32px - 36px)"};
  padding: 22px 24px;
  color: #eceff4;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  overflow: auto;
`;

export const Handle = styled.div<{
  pos: "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";
}>`
  position: absolute;
  z-index: 5;
  ${({ pos }) =>
    pos === "n" &&
    css`
      top: -2px;
      left: 6px;
      right: 6px;
      height: 6px;
      cursor: ns-resize;
    `}
  ${({ pos }) =>
    pos === "s" &&
    css`
      bottom: -2px;
      left: 6px;
      right: 6px;
      height: 6px;
      cursor: ns-resize;
    `}
  ${({ pos }) =>
    pos === "e" &&
    css`
      top: 6px;
      right: -2px;
      bottom: 6px;
      width: 6px;
      cursor: ew-resize;
    `}
  ${({ pos }) =>
    pos === "w" &&
    css`
      top: 6px;
      left: -2px;
      bottom: 6px;
      width: 6px;
      cursor: ew-resize;
    `}
  ${({ pos }) =>
    pos === "ne" &&
    css`
      top: -2px;
      right: -2px;
      width: 10px;
      height: 10px;
      cursor: nesw-resize;
    `}
  ${({ pos }) =>
    pos === "nw" &&
    css`
      top: -2px;
      left: -2px;
      width: 10px;
      height: 10px;
      cursor: nwse-resize;
    `}
  ${({ pos }) =>
    pos === "se" &&
    css`
      bottom: -2px;
      right: -2px;
      width: 10px;
      height: 10px;
      cursor: nwse-resize;
    `}
  ${({ pos }) =>
    pos === "sw" &&
    css`
      bottom: -2px;
      left: -2px;
      width: 10px;
      height: 10px;
      cursor: nesw-resize;
    `}
`;
