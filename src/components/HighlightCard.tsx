import React, { useRef } from "react";
import styled from "styled-components";
import { Data } from "../types/personalData";

const CardSpotlight = styled.div`
  position: relative;
  background-color: "linear-gradient(135deg, rgba(136, 192, 208, 0.10) 0%, rgba(94, 129, 172, 0.10) 100%)";
  padding: 2rem;
  cursor: pointer;
  border-radius: 14px;
  border: 1px solid rgba(136, 192, 208, 0.25);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  overflow: hidden;
  --mouse-x: 50%;
  --mouse-y: 50%;
  --spotlight-color: ${props => props.theme.colors.primary}1A;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at var(--mouse-x) var(--mouse-y),
      var(--spotlight-color),
      transparent 80%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  &:hover::before,
  &:focus-within::before {
    opacity: 0.6;
  }

  &::before,
  &::after,
  > :first-child::before,
  > :first-child::after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #99ddcc6a;
    opacity: 0.7;
    pointer-events: none;
  }

  &::before {
    top: 12px;
    left: 14px;
  }
  &::after {
    top: 12px;
    right: 14px;
  }
  > :first-child::before {
    bottom: 12px;
    left: 14px;
  }
  > :first-child::after {
    bottom: 12px;
    right: 14px;
  }
`;

const HighlightCard: React.FC<Data> = ({
  style,
  href,
  value,
  icon,
  iconSize,
  description,
}) => {
  // Highlight card icons should be strings to local resource
  if (icon !== undefined && typeof icon !== "string") {
    throw TypeError(
      "Highlight card icons should be strings to local resource or CDN"
    );
  }

  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty(
      "--spotlight-color",
      "rgba(221, 221, 221, 0.11)"
    );
  };

  return (
    <CardSpotlight
      ref={divRef}
      onMouseMove={handleMouseMove}
      style={{
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow =
          "0 14px 30px rgba(136, 192, 208, 0.05)";
      }}
      onClick={() => window.open(href, "_blank")}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          gap: "10px",
        }}
      >
        {icon && <img src={icon} alt={value} height={iconSize || "24"}></img>}
        <h3 style={{ margin: 0, color: "#99ddcc", fontSize: "1.05rem" }}>
          {value}
        </h3>
      </div>
      <p style={{ margin: 0, lineHeight: 1.6, color: "#D8DEE9" }}>
        {description}
      </p>
    </CardSpotlight>
  );
};

export default HighlightCard;
