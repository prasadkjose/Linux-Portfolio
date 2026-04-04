import React from "react";
import styled from "styled-components";
import { formatTime, formatDate } from "../../../utils/clock";
import { isMobileDevice } from "../../../utils/typeGuards";
import { WidgetComponentProps } from "../../../config/taskbar.config";

const Clock = styled.div`
  color: #eceff4;
  font-size: 13px;
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    sans-serif;
  font-weight: 500;
  text-align: right;
  line-height: 1.3;
  user-select: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.15s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
  &:active {
    background: rgba(255, 255, 255, 0.13);
  }
`;

const ClockComponent: React.FC<WidgetComponentProps> = ({ onClick }) => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Clock
      onClick={onClick}
      aria-label={`Current time: ${formatTime(time)}. Click to open calendar.`}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div>{formatTime(time, isMobileDevice())}</div>
      {!isMobileDevice() && (
        <div style={{ fontSize: "11px", opacity: 0.7 }}>{formatDate(time)}</div>
      )}
    </Clock>
  );
};

export default ClockComponent;
