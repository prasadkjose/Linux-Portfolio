import React from "react";
import { Data } from "../types/personalData";

const HighlightCard: React.FC<Data> = ({
  href,
  style,
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

  return (
    <div
      style={{
        ...style,
        borderRadius: "14px",
        padding: "18px",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
      }}
      onClick={() => window.open(href, "_blank")}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow =
          "0 14px 30px rgba(136, 192, 208, 0.18)";
      }}
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
    </div>
  );
};

export default HighlightCard;
