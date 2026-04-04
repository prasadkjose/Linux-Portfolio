import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { WidgetComponentProps } from "../config/taskbar.config";

// ── Animations ─────────────────────────────────────────────────────────

const fadeSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

// ── Styled Components ──────────────────────────────────────────────────

const Panel = styled.div`
  position: fixed;
  bottom: 56px;
  right: 12px;
  width: 280px;
  background: rgba(18, 18, 24, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 16px;
  z-index: 10000;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.5),
    0 2px 8px rgba(0, 0, 0, 0.3);
  animation: ${fadeSlideUp} 0.18s ease-out;
  user-select: none;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const MonthLabel = styled.span`
  color: #eceff4;
  font-size: 14px;
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    sans-serif;
  font-weight: 600;
  letter-spacing: 0.3px;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 14px;
  transition:
    background 0.15s ease,
    color 0.15s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #eceff4;
  }
  &:active {
    transform: scale(0.92);
  }
`;

const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`;

const WeekDay = styled.span`
  text-align: center;
  font-size: 10px;
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    sans-serif;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text[100]};
  padding: 2px 0 6px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

const DayCell = styled.button<{
  $isToday?: boolean;
  $isCurrentMonth?: boolean;
  $isEmpty?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  border: none;
  background: ${({ $isToday, theme }) =>
    $isToday ? theme.colors.primary : "transparent"};
  color: ${({ $isToday, $isCurrentMonth, theme }) =>
    $isToday
      ? theme.colors.text[100]
      : $isCurrentMonth
        ? theme.colors.text[100]
        : "rgba(236,239,244,0.25)"};
  font-size: 12px;
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    sans-serif;
  font-weight: ${({ $isToday }) => ($isToday ? "700" : "400")};
  cursor: ${({ $isEmpty }) => ($isEmpty ? "default" : "pointer")};
  transition:
    background 0.12s ease,
    color 0.12s ease;
  pointer-events: ${({ $isEmpty }) => ($isEmpty ? "none" : "auto")};
  box-shadow: ${({ $isToday, theme }) =>
    $isToday ? `0 0 10px ${theme.colors.primary}` : "none"};

  &:hover {
    background: ${({ $isToday, theme }) =>
      $isToday ? theme.colors.primary : "rgba(255, 255, 255, 0.1)"};
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 12px 0 10px;
`;

const TodayLabel = styled.div`
  text-align: center;
  font-size: 11px;
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    sans-serif;
  color: ${({ theme }) => theme.colors.text[100]};
  font-weight: 500;
  letter-spacing: 0.3px;
`;

// ── Helpers ────────────────────────────────────────────────────────────

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

// ── Component ──────────────────────────────────────────────────────────

const CalendarPanel: React.FC<WidgetComponentProps> = ({ isOpen, onClose }) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Check if click is on the clock element - ignore those clicks, let clock handle it
      const clockElement = document.querySelector(
        '[aria-label*="Current time"]'
      );
      if (clockElement && clockElement.contains(e.target as Node)) {
        return;
      }

      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKey);
  }, [onClose]);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  // Build grid cells: leading empty + day numbers
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  const isToday = (day: number) =>
    day === today.getDate() &&
    viewMonth === today.getMonth() &&
    viewYear === today.getFullYear();

  const todayFormatted = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!isOpen) return null;

  return (
    <Panel ref={panelRef} role="dialog" aria-label="Calendar">
      <Header>
        <NavButton
          onClick={prevMonth}
          aria-label="Previous month"
          title="Previous month"
        >
          ‹
        </NavButton>
        <MonthLabel>
          {MONTHS[viewMonth]} {viewYear}
        </MonthLabel>
        <NavButton
          onClick={nextMonth}
          aria-label="Next month"
          title="Next month"
        >
          ›
        </NavButton>
      </Header>

      <WeekRow>
        {WEEK_DAYS.map(d => (
          <WeekDay key={d}>{d}</WeekDay>
        ))}
      </WeekRow>

      <DaysGrid>
        {cells.map((day, idx) => (
          <DayCell
            key={idx}
            $isToday={day !== null && isToday(day)}
            $isCurrentMonth={day !== null}
            $isEmpty={day === null}
            aria-label={
              day !== null
                ? `${MONTHS[viewMonth]} ${day}, ${viewYear}${isToday(day) ? " (today)" : ""}`
                : undefined
            }
            aria-current={day !== null && isToday(day) ? "date" : undefined}
          >
            {day ?? ""}
          </DayCell>
        ))}
      </DaysGrid>

      <Divider />
      <TodayLabel>{todayFormatted}</TodayLabel>
    </Panel>
  );
};

export default CalendarPanel;
