import React, { useState } from "react";
import styled, { css, DefaultTheme } from "styled-components";
import themes from "../../styles/themes";
import type { ThemeSwitcherProps } from "../../types/window";
import { useTheme } from "../../hooks/useTheme";
import { PERSONAL_DATA } from "../../config/personalData.config";
import Tooltip from "../tooltips/Tooltip";
import { getFromSS, setToSS } from "../../utils/storage";
import { createVisit } from "../../services/databaseService";
import { TOOLTIP_IDS } from "../tooltips/tooltips.config";
import logger from "../../utils/logger";

interface ThemeButtonProps {
  $isActive: boolean;
  $theme: DefaultTheme;
}

const Container = styled.div<{ $themeLoaded: boolean }>`
  position: fixed;
  top: ${props => (!props.$themeLoaded ? "50%" : "60px")};
  left: ${props => (!props.$themeLoaded ? "50%" : "")};
  right: ${props => (!props.$themeLoaded ? null : "16px")};
  transform: ${props => (!props.$themeLoaded ? "translate(-50%, -50%)" : "")};

  z-index: ${props => (!props.$themeLoaded ? 1000 : 100)};
  display: grid;
  grid-template-columns: 3fr 3fr 3fr;
  background: rgba(0, 0, 0, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  width: auto;

  // isMobile
  ${props =>
    props.$themeLoaded &&
    `@media (max-width: 550px) {
    width: 100%;
    right: 0;
    top: calc(100% - 86px);
  }`}
`;

const ThemeButton = styled.button<ThemeButtonProps>`
  position: relative;
  padding: 10px 16px;
  border: none;
  background: transparent;
  color: white;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:nth-last-child(2) {
    border-right: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
    color: white;
  }

  ${props =>
    props.$isActive &&
    css`
      background: ${props.$theme.colors.body};
      color: ${props.$theme.colors.text[100]};
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);

      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 2px;
        background: ${props.$theme.colors.text[300]};
        box-shadow: 0 0 10px ${props.$theme.colors.body};
      }
    `}

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }

  /* Terminal-style cursor for active button */
  ${props =>
    props.$isActive &&
    css`
      &::before {
        content: "|";
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        animation: blink 1s infinite;
        font-weight: bold;
      }

      @keyframes blink {
        0%,
        50% {
          opacity: 1;
        }
        51%,
        100% {
          opacity: 0;
        }
      }
    `}
`;

const TypingText = styled.div`
  font-family: "Courier New", Courier, monospace;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  padding: 8px 16px 12px 16px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  letter-spacing: 0.5px;
  grid-column: 1 / 3;

  /* Typing effect container */
  span {
    color: white;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    animation: typing 2s steps(18, end);
    position: relative;
  }

  p {
    margin: 0;
  }

  /* Cursor that blinks during the typing animation */
  span::after {
    content: "|";
    position: absolute;
    right: -1px;
    bottom: 2px;
    width: 4px;
    height: 12px;
    background: white;
    animation: blink 0.8s infinite;
    opacity: 1;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }
`;

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  themeSwitcher,
  currentTheme,
  setIsBGChange,
}) => {
  const { themeLoaded } = useTheme();
  const [$themeLoaded, set$themeLoaded] = useState(themeLoaded);
  const [showTooltip, setShowTooltip] = useState(true);

  const themesList = Object.keys(themes)
    .map((key: string) => {
      return {
        key: themes[key].id,
        label: themes[key].name,
        theme: themes[key],
      };
    })
    .filter(({ key }) => key !== "empty");

  const handleThemeChange = (newTheme: DefaultTheme) => {
    if ($themeLoaded) {
      setShowTooltip(false);
    }
    if (newTheme.id !== currentTheme.id) {
      // Play theme startup sound
      const audio = new Audio(newTheme.startupSound);
      audio.volume = 1;
      audio.play().catch(err => logger.log(`Startup sound failed: ${err}`));

      themeSwitcher(newTheme);
      set$themeLoaded(!themeLoaded);
      setIsBGChange(false);
      const isFirstVisit = getFromSS("first_visit", true);

      // Log visit to database when theme loads
      if (isFirstVisit) {
        createVisit({ path: window.location.pathname }).catch(err =>
          logger.log(`Visit tracking skipped: ${err}`)
        );
        setToSS("first_visit", false);
      }
    }
  };

  return (
    <Container $themeLoaded={$themeLoaded}>
      {themesList.map(({ key, label, theme }) => (
        <ThemeButton
          key={key}
          $isActive={currentTheme.id === theme.id}
          $theme={theme}
          onClick={() => handleThemeChange(theme)}
          aria-label={`Switch to ${label} theme`}
          title={`Switch to ${label} theme`}
        >
          {label}
        </ThemeButton>
      ))}
      {
        <Tooltip
          id={TOOLTIP_IDS.THEME_SWITCHER_HINT}
          showCondition={showTooltip && $themeLoaded}
          onClose={() => setShowTooltip(false)}
        />
      }
      {!$themeLoaded && (
        <TypingText>
          <span>Wecome to {PERSONAL_DATA.personalInfo.shortName}'s PC</span>
          <p>Choose an OS view</p>
        </TypingText>
      )}
    </Container>
  );
};

export default ThemeSwitcher;
